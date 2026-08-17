import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import BaseThreeJS from '../core/threejs-scene-module';
import { createGridMaterial } from "../materials/materials.js";
import { PALETTE } from "../materials/palette.js";

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


// Vertical FOV the scene was hand-tuned against, on a 16:9 desktop viewport.
// FOV in three.js is vertical, so horizontal framing is a function of
// (fov, aspect) - a portrait phone (aspect ~0.5) shows roughly a third of
// the horizontal scene a 16:9 desktop does at the same BASE_FOV.
const BASE_FOV = 40;
const DESIGN_REFERENCE_ASPECT = 16 / 9;
// How far FOV is allowed to widen to claw back that lost horizontal frame.
// Past this, widening further reads as fisheye distortion rather than "more
// visible scene" - narrower aspects than this clamp can reach stay cropped
// until the scene's own layout (box/wall spacing) is made aspect-aware.
const MAX_FOV = 65;
// Idle-shot camera height (see update()). Lower on portrait screens so the
// establishing shot doesn't read as mostly floor - tune to taste.
const TARGET_Y_FINAL = 2500;
const TARGET_Y_FINAL_PORTRAIT = 1700;

export default class LandingScene extends BaseThreeJS{
  constructor(containerId, loadingManager, renderer){
    super(containerId, loadingManager, renderer);
    this.clearAlpha = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.camera.fov = this.getResponsiveFov(this.camera.aspect);
    // Drives the mobile-only Phase 6 layout swap (see createSplitWall/main.js):
    // on a portrait screen the wall-break sequence runs top-to-bottom instead
    // of left-to-right, since portrait framing has almost no horizontal room
    // to roll a sphere across but plenty of vertical scroll room to drop it
    // through. Read once at construction (aspect doesn't change often enough
    // mid-session to warrant recomputing it on resize).
    this.isPortrait = this.camera.aspect < 1;
    this.floor = null;
    this.composer = null;
		this.windowHalfX = window.innerWidth / 2;
		this.windowHalfY = window.innerHeight / 2;
    this.lookAtTarget = new THREE.Vector3(0, 0, 0);
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    document.addEventListener( 'mousemove', this.onDocumentMouseMove );

    this.init();
  }

  init() {

    this.camera.position.z = 1500;

    this.camera.near = 1;
    this.camera.far = 20000;
    this.camera.updateProjectionMatrix();
    this.scene.fog = new THREE.Fog( PALETTE.paper, 3500, 5700 );
    // Real background instead of relying on canvas transparency: BokehPass's
    // shader always writes alpha=1, so anything left transparent (e.g. past
    // camera.far, where the floor gets culled) turns opaque black once the
    // composer is active. Match it to the fog color so it's seamless either way.
    this.scene.background = new THREE.Color( PALETTE.paper );
      
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 1024;

    const tileSize = 64; // Size of each square
    for (let y = 0; y < canvas.height / tileSize; y++) {
      for (let x = 0; x < canvas.width / tileSize; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#ffe2ac' : '#FAD287'; // Alternate colors
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    // Convert canvas to a texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(12, 12); // Adjust repeat for larger patterns if needed
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    // Create the floor plane
    const planeGeometry = new THREE.PlaneGeometry(10000, 10000, 30, 30); // Width and height of the plane
    const planeMaterial = new THREE.MeshStandardMaterial({ map: texture });
    this.floor = new THREE.Mesh(planeGeometry, planeMaterial);
    this.floor.name = "floor";
    this.floor.rotation.x = -Math.PI / 2; // Rotate the plane to make it horizontal
    this.floor.position.y = -0.05;
    this.floor.receiveShadow = true;
    this.floor.material.polygonOffset = true;
    this.floor.material.polygonOffsetFactor = 1;
    this.floor.material.polygonOffsetUnits = 1;
    this.scene.add(this.floor);

    // Precompute a UV-sphere target for every floor vertex so the end-of-scroll
    // "floor becomes a small sphere" beat can just lerp positions each frame
    // instead of swapping geometry (keeps one buffer, one draw call, no popping).
    this.floorMorphAmount = 0;
    this.floorOriginalPositions = Float32Array.from(planeGeometry.attributes.position.array);
    this.floorSpherePositions = this.computeFloorSphereTargets(this.floorOriginalPositions, 25);



    // load a texture for the stairs
    const texLoader = new THREE.TextureLoader(this.loadingManager);
    const mytex = texLoader.load( './textures/tiles3.jpg' );
    mytex.wrapS = THREE.RepeatWrapping;
    mytex.wrapT = THREE.RepeatWrapping;
    mytex.needsUpdate = true;


    // load a glb model
    const gltfloader = new GLTFLoader(this.loadingManager);
    const tillesBlackMat = new THREE.MeshStandardMaterial({ color: 'white', map:mytex});


    // The directional light's shadow camera aims at `target.matrixWorld`, which
    // is only refreshed by the renderer for objects that are part of the scene
    // graph. `sphere` above is intentionally never added to the scene, so using
    // it directly as the light target left matrixWorld stuck at identity (i.e.
    // the shadow camera aimed at the world origin instead of (0,70,600)) - a
    // fixed misaim between the light and the boxes that showed up as a gap
    // between each box and its own shadow, no amount of bias tuning fixes a
    // wrong aim point. A dedicated Object3D actually in the scene graph fixes it.
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 70, 600);
    this.scene.add(lightTarget);

    const boxGeom = new THREE.BoxGeometry( 100, 1000, 100 );
    // Master material: never applied to a mesh directly, just a template.
    // Each box below gets its own clone() so its tiling/colors can be tweaked
    // independently through material.uniforms without touching the others.
    // High roughness (matte, no specular highlight) and warm ink line color
    // are what actually sell "printed textbook plate" over "glossy render" -
    // the old roughness:0.0 put a hard digital highlight on every edge.
    const boxMaterial = createGridMaterial({
      color: PALETTE.paper,
      lineWidth: 0.012,
      lineOpacity: 0.55,
      roughness: 0.85,
      tileY: 36,
      tileX: 4,
      lineColor: new THREE.Color(PALETTE.ink)
    });

    // Separate cap material for the box's top/bottom (+y/-y) faces. BoxGeometry
    // applies whatever material it's given to every face, so the side material's
    // tileY:36 - tuned for the 1000-tall sides - was also landing on the 100x100
    // cap, packing 36 lines into a face a tenth the height. tileY:4 here matches
    // the cap's actual depth to the side material's tileX:4 (both span 100 units),
    // keeping line density consistent across the whole box.
    const boxCapMaterial = createGridMaterial({
      color: PALETTE.paper,
      lineWidth: 0.012,
      lineOpacity: 0.55,
      roughness: 0.85,
      tileY: 4,
      tileX: 4,
      lineColor: new THREE.Color(PALETTE.ink)
    });

    // BoxGeometry's default face groups are ordered [+x, -x, +y, -y, +z, -z],
    // so index 2/3 (top/bottom) get the cap material and the rest get the side one.
    const makeBoxMaterials = (color) => {
      const sides = boxMaterial.clone();
      const caps = boxCapMaterial.clone();
      sides.uniforms.uBaseColor.value.set(color);
      caps.uniforms.uBaseColor.value.set(color);
      return [sides, sides, caps, caps, sides, sides];
    };

    const box = new THREE.Mesh( boxGeom, makeBoxMaterials(PALETTE.brick) );
    box.position.set(300, 50, 400);
    this.scene.add( box );
    box.castShadow = true;
    this.box1 = box;

    const box2 = new THREE.Mesh(boxGeom, makeBoxMaterials(PALETTE.ochre));
    box2.position.set(0, 50, 400);
    this.scene.add( box2 );
    box2.castShadow = true;
    this.box2 = box2;

    const box3 = new THREE.Mesh(boxGeom, makeBoxMaterials(PALETTE.slate));
    box3.position.set(-300, 50, 400);
    this.scene.add( box3 );
    box3.castShadow = true;
    this.box3 = box3;

    // box4 is squashed into a horizontal beam via scale (3, 0.1, .2), which
    // compresses local Z (the cap's v-axis) 5x harder than local Y (the side
    // faces' v-axis). A single shared tileY:4 divides pre-scale Z the same as
    // pre-scale Y, so after scaling those 4 lines land in a strip a fifth the
    // width - dense cross-hatching on the cap even though the sides look fine.
    // Same fix as box1-3: split cap from sides so the cap's Z-axis tile count
    // can be tuned down independently instead of inheriting the sides' value.
    const box4SideMaterial = boxMaterial.clone();
    box4SideMaterial.uniforms.uBaseColor.value.set(PALETTE.sage);
    box4SideMaterial.uniforms.uTile.value.set(8, 4);

    const box4CapMaterial = boxMaterial.clone();
    box4CapMaterial.uniforms.uBaseColor.value.set(PALETTE.sage);
    box4CapMaterial.uniforms.uTile.value.set(8, 1);

    const box4 = new THREE.Mesh(boxGeom, [
      box4SideMaterial, box4SideMaterial,
      box4CapMaterial, box4CapMaterial,
      box4SideMaterial, box4SideMaterial
    ]);
    box4.scale.set(3, 0.1, .2);
    box4.position.set(0, 0, 0);
    this.scene.add(box4);
    box4.castShadow = true;
    this.box4 = box4;
    // Exposed as this.boxN (rather than kept as function-local consts) so the
    // scroll timeline in main.js can hand these transforms straight to GSAP.
    this.verticalBoxes = [this.box1, this.box2, this.box3];
    
    
    // Three break-able walls for the post-sphere sequence: the ball rolls
    // right (or, on portrait screens, drops down - see createSplitWall) and
    // cracks them open one at a time, Teorema-poster style. Each wall is
    // built as two stacked halves sharing one invisible seam rather than a
    // single mesh, so "breaking" is just kicking the two halves apart - no
    // runtime geometry slicing needed. Spacing is small (100 apart on
    // desktop, not the 400-1200 range other props use) because by this point
    // in the timeline the camera sits close to the origin with fov:12 - the
    // visible frame at that distance only spans roughly +-350 world units on
    // a 16:9 desktop, not the thousands the earlier phases operate at.
    //
    // Portrait uses a much tighter 60/110/160 spacing instead of just
    // reusing the desktop numbers on the rotated axis, for two reasons:
    // fov:12 is the *vertical* FOV and applies unchanged regardless of
    // aspect, so the vertical frame at this camera distance is only
    // ~+-170 world units - the desktop spacing (up to 450) would place
    // every wall below the bottom edge, off-screen, for the entire
    // sequence. And each wall's on-screen-vertical thickness here is a
    // fixed 40 world units (BoxGeometry's 100 * group.scale's 0.4) -
    // packing them closer than that (e.g. the first attempt's 90/125/160,
    // 35 apart) makes adjacent bars overlap into one solid mass instead of
    // three distinct lines, which read as a single dark band.
    // Spaced along the direction the sphere will travel, so they're hit in
    // this array's order.
    const wallCoords = this.isPortrait ? [60, 110, 160] : [250, 350, 450];
    this.walls = wallCoords.map((x) => this.createSplitWall(boxMaterial, x));
    this.horizontalBoxes = [this.box1, this.box2, this.box3];



    // Create a cone geometry and apply the grid material
    const coneGeom = new THREE.ConeGeometry( 30, 75, 32 );
    const cone = new THREE.Mesh( coneGeom, createGridMaterial({color: '#fff5de',lineWidth: 0.012, roughness:0.0, tileY:10, lineColor: new THREE.Color(0x000000)}) );
    cone.position.set(-200, 75, 800);
    cone.scale.set(2, 2, 2); // Adjust the scale as needed
    // this.scene.add( cone );
    cone.castShadow = true;

    // create a torus geometry and apply the grid material
    const torusGeom = new THREE.TorusGeometry( 50, 20, 32, 100 );
    const torus = new THREE.Mesh( torusGeom, createGridMaterial({color: '#fff5de',lineWidth: 0.001, roughness:0.6, tileY:30 ,tileX:30, lineColor: new THREE.Color(0x000000)}) );
    torus.position.set(200, 30, 900);
    torus.scale.set(1.5, 1.5, 1.5);
    torus.rotation.x = Math.PI / 2; // Rotate the torus to stand upright
    // this.scene.add( torus );
    torus.castShadow = true; 

    // Add some lighting. Warm-tinted instead of neutral white so shadows read
    // as soft warm umber (like ink on cream paper) rather than harsh digital
    // black, and the "sun" reads like late-afternoon light, not a studio key.
    this.ambientLight = new THREE.AmbientLight(0xfff1da, .25);
    this.scene.add(this.ambientLight);

    this.directionalLight.color.set('#fff1da');
    this.directionalLight.position.set(-800,1000,2100)
    this.directionalLight.castShadow = true;

    // Sharper, cleaner shadows
    this.directionalLight.shadow.mapSize.set(2048, 2048);
    this.directionalLight.shadow.camera.left = -1200;
    this.directionalLight.shadow.camera.right = 1200;
    this.directionalLight.shadow.camera.top = 1200;
    this.directionalLight.shadow.camera.bottom = -1200;
    this.directionalLight.shadow.camera.near = 1;
    this.directionalLight.shadow.camera.far = 8000;
    this.directionalLight.shadow.bias = 0.0006;
    this.directionalLight.shadow.normalBias = 0.025;
    this.directionalLight.shadow.radius = 2;
    this.directionalLight.target = lightTarget;
    this.scene.add(this.directionalLight);
    this.renderer.shadowMap.needsUpdate = true;

    const helper = new THREE.DirectionalLightHelper( this.directionalLight, 4 );
    //this.scene.add( helper );

    // Add a CameraHelper for the shadow camera
    const shadowCameraHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);
    // this.scene.add(shadowCameraHelper);

    // this.initPostprocessing();
  }

  update() {
    // Calculate a scale factor for movement and lerping based on the camera's z position
    const zMin = 0;   // Closest z position
    const zMax = 1500; // Farthest z position
    const zFactor = THREE.MathUtils.clamp((this.camera.position.z - zMin) / (zMax - zMin), 0, 1);

    // Target positions for x and y as z approaches 0
    const targetX = 0;
    const targetYFinal = this.camera.aspect < 1 ? TARGET_Y_FINAL_PORTRAIT : TARGET_Y_FINAL;

    // Smoothly interpolate the X position of the camera
    const desiredX = THREE.MathUtils.lerp(targetX, this.mouseX, zFactor) * 0.4; // Adjust the multiplier to control the influence of mouse movement (location)
    this.camera.position.x += (desiredX - this.camera.position.x) * 0.05; // Smoothly interpolate the camera's X position (speed)
    // Calculate the desired Y position based on mouse movement
    const mouseTargetY = -(this.mouseY - 200);
    const clampedMouseY = THREE.MathUtils.clamp(mouseTargetY, 50, 200);
    const desiredY = THREE.MathUtils.lerp(targetYFinal, clampedMouseY, zFactor);
    this.camera.position.y += (desiredY - this.camera.position.y) * 0.05;

    // As zFactor -> 0 the camera's look direction rotates toward straight down,
    // which becomes parallel to a fixed (0,1,0) up vector. That makes lookAt's
    // internal up x forward cross product degenerate, so tiny mouse-driven sign
    // flips in camera x snap the roll +-90 degrees. Rotating up in step with the
    // tilt keeps it perpendicular to the look direction the whole way through,
    // so there's never a singularity for the roll to flip around.
    const tiltAngle = (1 - zFactor) * (Math.PI / 2);
    this.camera.up.set(0, Math.cos(tiltAngle), -Math.sin(tiltAngle));
    this.camera.rotation.order = 'YXZ';
    this.camera.lookAt(this.lookAtTarget);
  }

  // Solves for the vertical FOV that reproduces BASE_FOV's horizontal frame
  // at a different aspect ratio, clamped to MAX_FOV so narrow aspects widen
  // toward "see more of the scene" without tipping into fisheye distortion.
  // At/above the design reference aspect this returns exactly BASE_FOV, so
  // desktop framing is unchanged.
  getResponsiveFov(aspect) {
    const baseFovRad = THREE.MathUtils.degToRad(BASE_FOV);
    const targetHorizontalFovRad = 2 * Math.atan(Math.tan(baseFovRad / 2) * DESIGN_REFERENCE_ASPECT);
    const fittedFovRad = 2 * Math.atan(Math.tan(targetHorizontalFovRad / 2) / aspect);
    const fittedFovDeg = THREE.MathUtils.radToDeg(fittedFovRad);
    return THREE.MathUtils.clamp(fittedFovDeg, BASE_FOV, MAX_FOV);
  }

  onDocumentMouseMove( event ) {
    this.mouseX = ( event.clientX - this.windowHalfX );
    this.mouseY = ( event.clientY - this.windowHalfY );

  }

  // Builds one "wall" as a group holding two half-height meshes stacked flush
  // against each other (no visible seam at rest). rotateX(PI/2) on the group
  // puts the bar's long axis on world Z rather than Y - by the time this
  // wall matters (post floor-morph), the camera's up vector has already
  // flipped to (0,0,-1) (see update()'s tiltAngle), so world Z is what
  // actually reads as "vertical" on screen, and the walls spaced along world
  // X (the `x` param) read as vertical bars laid out left-to-right, which is
  // what the sphere then rolls into.
  //
  // On portrait screens that's flipped: rotateZ(PI/2) instead puts the bar's
  // long axis on world X (reads as a horizontal bar), and `x` is placed on
  // world Z instead of world X - so the bars stack top-to-bottom on screen
  // and the sphere drops through them via floor.position.z instead of
  // rolling into them via floor.position.x (see main.js's Phase 6). Portrait
  // has almost no horizontal frame to roll a ball across, but plenty of
  // vertical scroll room, so this reads as the same beat instead of the
  // ball just running out of frame.
  createSplitWall(material, x, z = 0, y = -100) {
    const halfGeom = new THREE.BoxGeometry(100, 500, 100);
    const wallMaterial = material.clone();
    wallMaterial.uniforms.uBaseColor.value.set(PALETTE.ink);

    const group = new THREE.Group();
    if (this.isPortrait) {
      group.position.set(z, y, x);
      group.rotation.z = Math.PI / 2;
    } else {
      group.position.set(x, y, z);
      group.rotation.x = Math.PI / 2;
    }
    group.scale.set(0.4, 1, 0.4);
    this.scene.add(group);

    const topHalf = new THREE.Mesh(halfGeom, wallMaterial);
    topHalf.position.y = 250;
    topHalf.castShadow = true;
    group.add(topHalf);

    const bottomHalf = new THREE.Mesh(halfGeom, wallMaterial);
    bottomHalf.position.y = -250;
    bottomHalf.castShadow = true;
    group.add(bottomHalf);

    return { group, topHalf, bottomHalf };
  }

  // Maps each flat-plane vertex to a point on a sphere by wrapping it radially
  // outward from the plane's center, like wrapping paper around a ball: the
  // center becomes the top pole (phi=0) and points curl backward and under as
  // their distance from center grows, reaching the bottom pole (phi=PI) at
  // the plane's far corners. Unlike a UV-grid mapping (which collapses whole
  // rows of vertices onto a single pole and creates a hard seam), this only
  // degenerates at isolated corner points, so the curl reads as a smooth wrap
  // instead of a pinched starburst.
  computeFloorSphereTargets(positions, radius) {
    const geomParams = this.floor.geometry.parameters;
    const maxR = Math.sqrt(geomParams.width ** 2 + geomParams.height ** 2) / 2; // center-to-corner distance
    const target = new Float32Array(positions.length);

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const r = Math.sqrt(x * x + y * y);
      const theta = Math.atan2(y, x);
      const phi = (r / maxR) * Math.PI;

      target[i] = radius * Math.sin(phi) * Math.cos(theta);
      target[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      target[i + 2] = radius * Math.cos(phi);
    }

    return target;
  }

  // Lerps the floor's vertices between its flat resting shape and the
  // precomputed sphere target. Called from the scroll timeline with t in 0..1.
  setFloorMorphAmount(t) {
    this.floorMorphAmount = t;
    const posAttr = this.floor.geometry.attributes.position;
    const original = this.floorOriginalPositions;
    const target = this.floorSpherePositions;

    for (let i = 0; i < original.length; i++) {
      posAttr.array[i] = THREE.MathUtils.lerp(original[i], target[i], t);
    }
    posAttr.needsUpdate = true;
    this.floor.geometry.computeVertexNormals();
  }

  initPostprocessing() {

    this.composer = new EffectComposer( this.renderer );

    const renderPass = new RenderPass( this.scene, this.camera );
    this.composer.addPass( renderPass );

    // Temporary minor depth of field - remove pass (and this.composer entirely)
    // once a final look is decided. focus/aperture are in the same world units
    // as the scene (not 0-1): focus ~= camera-to-subject distance (sphere/cone/
    // torus sit around z 600-900), so retune this if the camera path changes.
    // Note: focus is a fixed value, but the GSAP scroll timeline moves the
    // camera from z=1500 to z=0, so the sharp band will drift out of alignment
    // with the objects partway through the scroll - fine for now since this is
    // meant to be temporary, but worth knowing if you keep it.
    const bokehPass = new BokehPass( this.scene, this.camera, {
      focus: 800,
      aperture: 0.000012,
      maxblur: 0.006
    } );
    this.composer.addPass( bokehPass );

    const outputPass = new OutputPass();
    this.composer.addPass( outputPass );

  }

}

