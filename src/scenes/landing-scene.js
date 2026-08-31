import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import BaseThreeJS from '../core/threejs-scene-module';
import { createGridMaterial, createLatticeRevealMaterial } from "../materials/materials.js";
import { PALETTE } from "../materials/palette.js";
import { LATTICE_SRC, LATTICE_LUMINANCE } from './lattice-portrait-data.js';
import { isMobileViewport, GYRO_DEBUG, gyroDebugLog } from '../core/gyro-controls.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';


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
// Each split-wall half's height (see createSplitWall's halfGeom) - also
// chapter four's shared "cube module" size: the third wall's halves grow to
// this in width/depth too (so each half reads as an actual cube), the hero
// cube grows to match it, and the hidden grid's tiles are cut to the same
// size, per main.js's chapter four choreography.
const WALL_HALF_HEIGHT = 500;

// Chapter six's shapes swarm (see buildShapesSwarm/enterShapesSwarm/
// exitShapesSwarm): 3D die-cut shapes held in a constantly-attracting,
// physically-collided cluster. These constants were tuned standalone in
// prototype/shapes-attraction.html, in a small "local" unit scale (cluster
// settles to roughly SWARM_REFERENCE_CLUSTER_RADIUS) - rather than retune them
// to this scene's own much larger world units, the whole swarm is built in that
// same local scale and wrapped in a group whose position/scale places it
// correctly on screen (see buildShapesSwarm), so the tuned feel carries over
// exactly.
const SWARM_SHAPE_COUNT = 50;
const SWARM_ATTRACT_K = 6;
const SWARM_LINEAR_DAMPING = 0.88;
const SWARM_ANGULAR_DAMPING = 1;
const SWARM_REPEL_RADIUS = 15;
const SWARM_REPEL_STRENGTH = 600; // 2x - mouse push should read as a much harder shove
const SWARM_REFERENCE_CLUSTER_RADIUS = 7;
// Individual shape size range, in the swarm's own local units (same scale as
// SWARM_REFERENCE_CLUSTER_RADIUS above) - "dot" is its own smaller range since
// it's meant to read as the reference image's tiny scattered accents, not a
// shape on par with the rest.
const SWARM_SHAPE_SIZE_MIN = 1.6;
const SWARM_SHAPE_SIZE_MAX = 4.2;
const SWARM_DOT_SIZE_MIN = 0.7;
const SWARM_DOT_SIZE_MAX = 1.3;
// How long, in seconds, a scroll-back retreat takes to lerp every shape from
// wherever it currently is back out to its own spawn position. Exported so
// main.js can time a scroll-driven exitShapesSwarm() call (e.g. before the
// closing wipe) far enough ahead for the retreat to actually finish.
export const SWARM_RETREAT_DURATION = 1.3;
// Screen placement: fraction of viewport width/height (0..1, top-left origin)
// the cluster's own local origin should project to once placed.
const SWARM_SCREEN_X = 0.6;
const SWARM_SCREEN_Y = 0.5;
// Fraction of the visible frame height, at the swarm's own placement depth, its
// settled radius should occupy on screen.
const SWARM_SCREEN_RADIUS_FRACTION = 0.4;

// Lattice reveal chapter (see buildLatticeReveal/enterLatticeReveal/
// exitLatticeReveal/setLatticeProgress): a grid of thin rotating marks, one
// per cell, that unwinds a turbulence flow and brightens/thins toward a
// hidden portrait's own per-cell luminance as the chapter's own scroll
// progress goes 0->1 (see main.js's LATTICE_START). Ported from
// prototype/three-lattice-reveal.html - see that file for the original
// standalone demo (own renderer/camera/UI controls, none of which carry
// over: here the marks are one InstancedMesh living in this scene, driven
// by the shared timeline instead of the page's own raw scroll fraction).
// Default (index 0) plus the higher densities the resolution buttons in
// main.js let a visitor step up to - see setLatticeResolution. Scrolling
// through without touching them only ever sees the default.
const LATTICE_N_STEPS = [24, 48, 72, 96];
// Whether the grid starts swirled/turbulent (true - the "let the turbulence
// unwind" look, marks curling and drifting before settling) or starts with
// every mark already straight/at rest, no curl (false) - see the `curled`
// param on createLatticeRevealMaterial, which this feeds uFlow.
const LATTICE_CURLED_INTRO = false;
// Screen placement, same convention as the shapes swarm's SWARM_SCREEN_*
// below: fraction of viewport width/height (0..1, top-left origin) the
// grid's own local origin (its center) should project to.
const LATTICE_SCREEN_X = 0.62;
const LATTICE_SCREEN_Y = 0.48;
// Desktop offsets the grid right of center since the wide aspect leaves room
// to spare; on portrait the grid's own width now nearly fills the frame (see
// LATTICE_SCALE_FRACTION_PORTRAIT), so that same offset just shoves it past
// the right edge instead of reading as "placed to the right" - center it.
const LATTICE_SCREEN_X_PORTRAIT = 0.5;
// Portrait stacks the chapter's text above the grid rather than beside it, so the
// grid sits further down the frame (Y is top-left origin - larger means lower) to
// clear the text instead of overlapping it.
const LATTICE_SCREEN_Y_PORTRAIT = 0.6;
// The grid spans local [-1,1] on both axes (a 2-unit square) - this scales
// that unit square so its own height covers roughly this fraction of the
// visible frame's height at the placement depth (worldScale = halfHeight *
// this, and world height = 2 * worldScale).
const LATTICE_SCALE_FRACTION = .8;
// On a portrait screen halfWidth < halfHeight, so a square scaled off height
// alone overflows past the left/right edges - see buildLatticeReveal, which
// scales off whichever half-extent is smaller instead. Slightly larger since
// width, not height, ends up the limiting dimension there, leaving the same
// kind of breathing room desktop gets from its own height-based fraction.
const LATTICE_SCALE_FRACTION_PORTRAIT = .85;
// Real-time (not scroll-scrubbed) length of the per-mark pop-in wavefront
// that plays once, from the diagonal aData.w delay, the first time this
// chapter is scrolled into.
const LATTICE_INTRO_DURATION = 1;

const SWARM_COLORS = [
	// PALETTE.brick,
  // PALETTE.slate,
  // PALETTE.ochre,
  // PALETTE.clay,
	PALETTE.ink, 
	PALETTE.ink, 
	PALETTE.ink, 
	PALETTE.ink, 
	PALETTE.signalRed, // rare saturated accent
];

export default class LandingScene extends BaseThreeJS{
  constructor(containerId, loadingManager, renderer){
    super(containerId, loadingManager, renderer);
    this.clearAlpha = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    // Set on the first 'deviceorientation' reading and never touched again -
    // see onDeviceOrientation()'s use of it as the "phone held naturally"
    // pose to measure tilt against.
    this.gyroBaseline = null;
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
    // When true, update()'s mouse-driven idle look is skipped entirely so a
    // scroll-timeline tween (e.g. chapter four's camera orbit in main.js) can
    // drive camera.position/up directly without update() lerping it back
    // toward the idle target every frame right behind it.
    this.lockIdleLook = false;
    // Shapes swarm (see buildShapesSwarm/enterShapesSwarm/exitShapesSwarm):
    // 'hidden' (not built yet, or fully retreated) | 'active' (flying in/settled,
    // simulating normally) | 'retreating' (lerping back out to spawn positions).
    this.shapesSwarmBuilt = false;
    this.shapesSwarmState = 'hidden';
    // Lattice reveal chapter (see buildLatticeReveal/enterLatticeReveal/
    // exitLatticeReveal): built lazily on first entrance, same reasoning as
    // the swarm above.
    this.latticeBuilt = false;
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    document.addEventListener( 'mousemove', this.onDocumentMouseMove );
    // Mobile substitute for the mousemove drift above - see
    // onDeviceOrientation(). Registered eagerly regardless of platform/
    // permission state: iOS just won't deliver anything until the
    // gesture-gated permission prompt (see gyro-controls.js) resolves.
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    window.addEventListener( 'deviceorientation', this.onDeviceOrientation );

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

    // Chapter four's "sphere morphs into a cube" beat is one continuously-
    // deforming mesh, not two objects crossfading (a separate sphere shrinking
    // as an unrelated cube grew read as two things, not one thing changing
    // shape). Built from a subdivided BoxGeometry - its topology is already a
    // clean, regular cube grid, so normalizing each vertex's direction from
    // center and scaling it out to morphSphereRadius turns that same grid
    // into a sphere. Lerping between "original box position" and that
    // normalized-and-scaled position morphs cleanly between an exact sphere
    // and an exact cube using the same vertices throughout, with no seams or
    // uneven density. (A per-vertex projection of the *floor's* sphere wrap
    // onto a cube was tried first, reusing that mesh directly - but that
    // wrap's density is tuned for a smooth round shape wrapped from a flat
    // plane, dense near the plane's center and sparse toward its edges, and
    // projecting that onto a cube's flat faces put a visible zigzag where the
    // uneven sampling crossed each face boundary. Starting from a mesh whose
    // topology is already a cube's own grid avoids that entirely.)
    const morphSegments = 12;
    const cubeSize = 40;
    // Exposed so main.js can size chapter four's further "grow past base
    // size" tween relative to this, instead of hardcoding a second number
    // that has to be kept in sync with this one by hand.
    this.cubeBaseSize = cubeSize;
    // Matches computeFloorSphereTargets' own radius exactly, so the instant
    // this mesh swaps in for the floor (see revealMorphCube) it's already the
    // same size/shape as what it's replacing - no crossfade animation needed,
    // just a visibility swap.
    const morphSphereRadius = 25;
    const morphGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, morphSegments, morphSegments, morphSegments);
    this.morphCubePositions = Float32Array.from(morphGeometry.attributes.position.array);
    this.morphSpherePositions = this.computeNormalizedSphereTargets(this.morphCubePositions, morphSphereRadius);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: PALETTE.signalRed, roughness: 0.85 });
    this.cube = new THREE.Mesh(morphGeometry, cubeMaterial);
    this.cube.visible = false;
    this.cube.castShadow = true;
    this.scene.add(this.cube);



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

    const box2 = new THREE.Mesh(boxGeom, makeBoxMaterials(PALETTE.brick));
    box2.position.set(0, 50, 400);
    this.scene.add( box2 );
    box2.castShadow = true;
    this.box2 = box2;

    const box3 = new THREE.Mesh(boxGeom, makeBoxMaterials(PALETTE.brick));
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
    box4SideMaterial.uniforms.uBaseColor.value.set(PALETTE.paper);
    box4SideMaterial.uniforms.uTile.value.set(8, 4);

    const box4CapMaterial = boxMaterial.clone();
    box4CapMaterial.uniforms.uBaseColor.value.set(PALETTE.paper);
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

    // Chapter four's final beat: a field of dark cube "tiles" behind the
    // third (never-hit) wall, sharing that wall's own rotation and local
    // coordinate frame (see createSplitWall) - columns across its local X
    // (width), rows up its local Y (height, the same axis its topHalf/
    // bottomHalf are stacked on), offset back along its local Z (depth).
    // Genuinely hidden behind wall three's own bulk at start - no artificial
    // reveal-from-scale-0 needed - because it starts at that same small
    // scale (see main.js, which grows both together) and sits behind it in
    // actual 3D space; it only becomes visible once the chapter four orbit
    // changes the viewing angle enough to see past wall three's edge. One
    // InstancedMesh instead of one mesh per tile, since this is dozens of
    // identical cubes sharing a material - a single draw call, not dozens.
    this.cubeModuleSize = WALL_HALF_HEIGHT;
    // Base tile size matches the wall halves' own pre-scale width/depth (see
    // createSplitWall's halfGeom) - main.js grows this mesh's scale in
    // lockstep with wall three's own group.scale, so a tile ends up exactly
    // cubeModuleSize once wall three has fully grown into a cube (100 * the
    // same scale factor wall three reaches = cubeModuleSize).
    const gridTileSize = 100;
    // Center-to-center spacing between tiles - wider than gridTileSize so a
    // visible gap separates each cube from its neighbors (a paper-color sliver
    // showing through), reading as a checkerboard of distinct tiles rather
    // than one solid slab of touching boxes. In the same pre-scale units as
    // gridTileSize, so the gap stays proportional as the whole mesh grows.
    const gridSpacing = gridTileSize * 1.4;
    const gridColumns = 6; // across, matching the wall's own width axis
    const gridRows = 7; // up, matching the wall's own height axis
    const gridGeometry = new THREE.BoxGeometry(gridTileSize, gridTileSize, gridTileSize);
    const gridMaterial = new THREE.MeshStandardMaterial({ color: PALETTE.ink, roughness: 0.85 });
    this.hiddenGrid = new THREE.InstancedMesh(gridGeometry, gridMaterial, gridColumns * gridRows);
    // Stays hidden until the floor finishes morphing into a sphere (see
    // main.js's floorMorph tween) - revealing it only then, rather than at
    // construction, keeps it out of the frame for the earlier chapters it
    // has no part in.
    this.hiddenGrid.visible = false;
    this.hiddenGrid.castShadow = true;
    // this.hiddenGrid.receiveShadow = true;
    this.hiddenGrid.position.copy(this.walls[2].group.position);
    // Uniform scale (not wall three's own (0.4, 1, 0.4) group.scale) so each
    // tile renders as an actual cube matching the hero cube's size exactly,
    // rather than a 40x100x40 slab stretched along wall three's height axis.
    const gridToCubeScale = this.cubeBaseSize / gridTileSize;
    this.hiddenGrid.scale.set(gridToCubeScale, gridToCubeScale, gridToCubeScale);
    // Exposed so main.js can shrink the wall halves' width/depth to this same
    // ratio in chapter four - true on desktop already (createSplitWall's
    // rest scale is (0.4, 1, 0.4), and 0.4 is exactly this ratio), but
    // portrait's own rest scale is (0.4, 1, 0.25) - tuned for how a whole
    // wall reads on a narrow screen, not for the width/depth match a cube
    // tile needs, so portrait's halves need their X/Z scale actually moved
    // to this value in chapter four rather than assumed already-there.
    this.gridToCubeScale = gridToCubeScale;
    // World-space center-to-center tile spacing, exposed so main.js can line
    // up wall three's halves and the hero cube with this same rhythm (see
    // chapter four's wall3OpenGap, which spaces them apart by exactly this
    // much so they read as the grid's own next row/column instead of a
    // separately-scaled cluster).
    this.gridWorldSpacing = gridSpacing * gridToCubeScale;
    if (this.isPortrait) {
      this.hiddenGrid.rotation.x = Math.PI / 2;
      this.hiddenGrid.rotation.z = Math.PI / 2;
    } else {
      this.hiddenGrid.rotation.x = Math.PI / 2;
    }

    // Shifts the grid over from wall three's own column axis so wall three's
    // own column - formed later by its topHalf/cube-gap/bottomHalf once
    // chapter four opens it up (see main.js) - lands exactly one more
    // gridWorldSpacing beyond the grid's own nearest column, continuing the
    // same column rhythm rather than sitting close to but not quite aligned
    // with it. Rows need no such offset either way, since gridRows was
    // chosen so its middle three rows already coincide exactly with wall
    // three's bottomHalf/cube/topHalf positions.
    //
    // Which world axis is "columns" vs "rows" flips with the rotation above:
    // desktop's rotation.x alone lands columns (loop's local X) on world X
    // and rows (local Y) on world Z. Portrait's extra rotation.z - needed so
    // the grid stays flat on world Y (matching wall three's own Y, and the
    // idle camera's top-down look) instead of standing up facing world Z
    // edge-on to that camera - swaps that pairing: rows land on world X
    // (matching wall three's own rotation.z, the same axis its
    // topHalf/bottomHalf split on), columns land on world Z.
    const gridDepthOffset = this.gridWorldSpacing * (1 + (gridColumns - 1) / 2);
    if (this.isPortrait) {
      this.hiddenGrid.position.z += gridDepthOffset;
    } else {
      this.hiddenGrid.position.x += gridDepthOffset;
    }

    // The position landed on above is the grid's real resting spot - where it
    // ends up once chapter four settles. Captured here, before the extra
    // starting nudge below, so main.js can animate the grid back to this
    // exact spot without redoing the offset math itself.
    this.hiddenGridRestPosition = this.hiddenGrid.position.clone();

    // Extra rightward nudge on top of the column-rhythm offset above, for the
    // grid's actual starting pose only - on some aspect ratios the grid's own
    // edge tiles sat close enough to wall three to peek out from behind it as
    // soon as it's revealed (see main.js's floorMorph tween), before chapter
    // four's camera orbit has turned enough to legitimately show them. main.js
    // eases the grid from here back to hiddenGridRestPosition over chapter
    // four's own timeline, so it settles into the same spot as before by the
    // time that sequence finishes. Tune to taste.
    const gridExtraRightShift = this.gridWorldSpacing * 1.5;
    if (this.isPortrait) {
      this.hiddenGrid.position.z += gridExtraRightShift;
    } else {
      this.hiddenGrid.position.x += gridExtraRightShift;
    }

    // Each instance's own local (pre-group-scale) rest position, in the same
    // index order as setMatrixAt below - exposed so main.js's chapter five
    // sequence can rebuild each instance's matrix directly (for a per-tile
    // staggered flatten/spread) without re-deriving this column/row layout
    // itself.
    this.hiddenGridBasePositions = [];
    const instanceMatrix = new THREE.Matrix4();
    const instancePosition = new THREE.Vector3();
    let instanceIndex = 0;
    for (let col = 0; col < gridColumns; col++) {
      for (let row = 0; row < gridRows; row++) {
        instancePosition.set(
          (col - (gridColumns - 1) / 2) * gridSpacing,
          (row - (gridRows - 1) / 2) * gridSpacing,
          0
        );
        this.hiddenGridBasePositions.push(instancePosition.clone());
        instanceMatrix.setPosition(instancePosition);
        this.hiddenGrid.setMatrixAt(instanceIndex, instanceMatrix);
        instanceIndex++;
      }
    }
    this.hiddenGrid.instanceMatrix.needsUpdate = true;
    this.scene.add(this.hiddenGrid);

    // Chapter four's ground shadow catcher - a plane sitting just below the
    // hidden grid's own tile bottoms, invisible everywhere except where a
    // shadow actually falls on it (THREE.ShadowMaterial renders nothing but
    // the shadow itself), so the tiles/hero cube read as resting on real
    // ground once the chapter four camera tilt (see main.js) brings the
    // scene off top-down enough to actually see a shadow, rather than
    // floating in space. Sized well past the grid/hero-cube footprint so it
    // still reads as "ground" rather than a shadow-shaped cutout, and offset
    // a fraction below the tiles' own bottom face to keep the shadow clear
    // of acne from sitting exactly coplanar with them. Stays hidden until
    // chapter four begins, and starts at opacity 0 - both the visibility
    // toggle and the opacity fade from there up to full strength are driven
    // by main.js's chapter four timeline, alongside the camera/light orbit.
    const shadowCatcherGeometry = new THREE.PlaneGeometry(4000, 4000);
    const shadowCatcherMaterial = new THREE.ShadowMaterial({ opacity: 0 });
    this.shadowCatcher = new THREE.Mesh(shadowCatcherGeometry, shadowCatcherMaterial);
    this.shadowCatcher.rotation.x = -Math.PI / 2;
    // Anchored to the grid's rest position, not its current (starting-nudged)
    // position - this is static ground, not something that should slide in
    // step with the grid's own entrance tween in main.js.
    this.shadowCatcher.position.copy(this.hiddenGridRestPosition);
    this.shadowCatcher.position.y -= this.cubeBaseSize / 2 + 0.5;
    this.shadowCatcher.receiveShadow = true;
    this.shadowCatcher.visible = false;
    this.scene.add(this.shadowCatcher);

    // Add some lighting. Warm-tinted instead of neutral white so shadows read
    // as soft warm umber (like ink on cream paper) rather than harsh digital
    // black, and the "sun" reads like late-afternoon light, not a studio key.
    this.ambientLight = new THREE.AmbientLight(0xfff1da, .25);
    this.scene.add(this.ambientLight);

    this.directionalLight.color.set('#fff1da');
    const isMobileLayout = window.innerWidth <= 767;
    this.directionalLight.position.set(isMobileLayout ? -330 : -800, 1000, 2100)
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

    this.addWorldAxesGizmo();
  }

  // Persistent world-space orientation widget, pinned to the bottom-right
  // corner of the viewport (ViewHelper's own fixed spot - see its render())
  // rather than sitting somewhere in the 3D scene, so it's always in frame
  // and always shows the *camera's current* read on world X/Y/Z, however far
  // the chapter's own camera move has rotated/dollied by that point - a
  // gizmo placed in world space would just go out of frame or behind fog
  // once the camera moves on.
  addWorldAxesGizmo() {
    this.viewHelper = new ViewHelper(this.camera, this.renderer.domElement);
    this.viewHelper.setLabels('X', 'Y', 'Z');
    this.recolorWorldAxesGizmo(PALETTE.clay); // replacing ViewHelper's default RGB axis colors with the site's muted orange accent
  }

  // ViewHelper hardcodes red/green/blue per-axis with no public color API - the
  // axis meshes take a plain material.color set, but the labeled sprites bake
  // their color into a canvas texture at construction time, so those need a
  // freshly drawn texture rather than a property update.
  recolorWorldAxesGizmo(hexColor) {
    const color = new THREE.Color(hexColor);

    for (const child of this.viewHelper.children) {
      if (child.isMesh) {
        child.material.color.set(color);
      } else if (child.isSprite && child.userData.type?.startsWith('pos')) {
        const label = child.userData.type.slice(-1); // 'posX' -> 'X'
        child.material.map.dispose();
        child.material.dispose();
        child.material = this.buildAxisLabelSpriteMaterial(color, label);
      }
    }
  }

  buildAxisLabelSpriteMaterial(color, text) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;

    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(32, 32, 14, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = color.getStyle();
    context.fill();

    context.font = '24px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.fillText(text, 32, 41);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return new THREE.SpriteMaterial({ map: texture, toneMapped: false });
  }

  update() {
    // Runs every frame regardless of lockIdleLook - the swarm is scroll-driven
    // (activated once, then just keeps simulating), not part of the mouse-driven
    // idle look this early-return below gates.
    this.updateShapesSwarm(Math.min(this.clock.getDelta(), 1 / 30));

    // Same reasoning - the lattice's turbulence keeps drifting and its intro
    // pop-in plays in real time regardless of the idle look. Uses its own
    // performance.now()-based clock (set in buildLatticeReveal/
    // enterLatticeReveal) rather than this.clock, since that Clock's own
    // getDelta() is already being consumed above this frame.
    if (this.latticeGroup && this.latticeGroup.visible) {
      const now = performance.now();
      this.latticeMaterial.uniforms.uTime.value = (now - this.latticeStartTime) / 1000;
      this.latticeMaterial.uniforms.uIntro.value = Math.min(1, (now - this.latticeIntroStart) / (LATTICE_INTRO_DURATION * 1000));
    }

    if (this.lockIdleLook) return;

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

  // Tilt-driven substitute for onDocumentMouseMove on mobile, feeding the
  // same this.mouseX/this.mouseY that update()'s idle look already reads -
  // gated to isMobileViewport so a desktop/tablet with orientation sensors
  // can't hijack the mouse-driven look. Baselined against the first reading
  // rather than raw angles, since "phone held naturally" is rarely flat -
  // only the tilt *away* from that starting pose should move the camera.
  // gamma (left-right tilt) drives X, beta (forward-back tilt) drives Y,
  // mirroring the "tilt the phone" gesture the mouse's left/right + up/down
  // movement stood in for on desktop.
  onDeviceOrientation( event ) {
    if ( GYRO_DEBUG ) {
      gyroDebugLog( `ch1 raw: a=${event.alpha} b=${event.beta} g=${event.gamma}\nmobile=${isMobileViewport.matches} innerW=${window.innerWidth}` );
    }
    if ( !isMobileViewport.matches ) return;
    if ( event.gamma === null || event.beta === null ) return;
    if ( !this.gyroBaseline ) {
      this.gyroBaseline = { beta: event.beta, gamma: event.gamma };
    }
    const GYRO_SENSITIVITY = 20; // pixel-equivalents per degree of tilt off baseline - tune to taste
    // NOT windowHalfX/Y - those are how far a real mouse can physically get
    // from screen center, which on a phone is only ~150-220px, so reusing
    // them here capped the tilt-driven swing far below the desktop mouse
    // sweep no matter how high GYRO_SENSITIVITY went. These instead target
    // roughly the swing a full desktop mouse sweep produces.
    const GYRO_MAX_X = 900;
    const GYRO_MAX_Y = 500;
    const deltaGamma = event.gamma - this.gyroBaseline.gamma;
    const deltaBeta = event.beta - this.gyroBaseline.beta;
    this.mouseX = THREE.MathUtils.clamp( deltaGamma * GYRO_SENSITIVITY, -GYRO_MAX_X, GYRO_MAX_X );
    this.mouseY = THREE.MathUtils.clamp( -deltaBeta * GYRO_SENSITIVITY, -GYRO_MAX_Y, GYRO_MAX_Y );
    if ( GYRO_DEBUG ) {
      gyroDebugLog( `ch1: dG=${deltaGamma.toFixed(1)} dB=${deltaBeta.toFixed(1)}\nmouseX=${this.mouseX.toFixed(0)} mouseY=${this.mouseY.toFixed(0)}` );
    }
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
    const halfGeom = new THREE.BoxGeometry(100, WALL_HALF_HEIGHT, 100);
    const wallMaterial = material.clone();
    wallMaterial.uniforms.uBaseColor.value.set(PALETTE.ink);

    const group = new THREE.Group();
    if (this.isPortrait) {
      group.position.set(z, y, x);
      group.rotation.z = Math.PI / 2;
      group.scale.set(0.4, 1, 0.25);

    } else {
      group.position.set(x, y, z);
      group.rotation.x = Math.PI / 2;
      group.scale.set(0.4, 1, 0.4);

    }
    this.scene.add(group);

    const topHalf = new THREE.Mesh(halfGeom, wallMaterial);
    topHalf.position.y = WALL_HALF_HEIGHT / 2;
    topHalf.castShadow = true;
    group.add(topHalf);

    const bottomHalf = new THREE.Mesh(halfGeom, wallMaterial);
    bottomHalf.position.y = -WALL_HALF_HEIGHT / 2;
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

  // Crossfades the sphere (this.floor, already fully morphed) into the real
  // cube mesh by scaling one down as the other scales up. Called from the
  // scroll timeline with u in 0..1, right after setFloorMorphAmount has
  // already fully morphed the floor into the sphere; u is allowed to keep
  // rising past 1 so the same driver also covers the cube growing beyond its
  // base size once fully crossfaded in (the floor's own scale just clamps at
  // 0 and stays there). Cube position is handled separately in main.js - it
  // needs to detach from the floor's position and move toward wall three, and
  // this method doesn't know about that.
  // One-shot handoff from the floor (still shaped like a sphere at this
  // point, radius 25 - see setFloorMorphAmount) to the dedicated morph-cube
  // mesh below, which starts at that exact same sphere shape and size (see
  // morphSphereRadius in init()) - the swap is invisible, no crossfade
  // needed, since the two coincide at this instant.
  revealMorphCube() {
    this.floor.visible = false;
    this.cube.visible = true;
  }

  hideMorphCube() {
    this.floor.visible = true;
    this.cube.visible = false;
  }

  // Projects each vertex of a box-shaped position buffer outward to a sphere
  // of the given radius, by normalizing its direction from center - used to
  // derive the morph-cube's sphere target from its own (already box-shaped)
  // geometry, so both ends of the morph share the same vertices/topology.
  computeNormalizedSphereTargets(boxPositions, radius) {
    const target = new Float32Array(boxPositions.length);
    for (let i = 0; i < boxPositions.length; i += 3) {
      const x = boxPositions[i];
      const y = boxPositions[i + 1];
      const z = boxPositions[i + 2];
      const scale = radius / Math.sqrt(x * x + y * y + z * z);
      target[i] = x * scale;
      target[i + 1] = y * scale;
      target[i + 2] = z * scale;
    }
    return target;
  }

  // Lerps the morph-cube's vertices between the sphere target and its own
  // native box shape. Called from the scroll timeline with t in 0..1.
  setMorphCubeAmount(t) {
    const posAttr = this.cube.geometry.attributes.position;
    const sphere = this.morphSpherePositions;
    const cubeShape = this.morphCubePositions;

    for (let i = 0; i < sphere.length; i++) {
      posAttr.array[i] = THREE.MathUtils.lerp(sphere[i], cubeShape[i], t);
    }
    posAttr.needsUpdate = true;
    this.cube.geometry.computeVertexNormals();
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

  // Builds the shapes swarm's physics bodies and instanced meshes the first time
  // it's needed (see enterShapesSwarm, which calls this lazily then drives the
  // actual show/hide). Placed relative to the camera's own current position/
  // orientation rather than a hardcoded world position - by the time this fires
  // (right after chapter five's dominoes clear the frame) chapter four/five's own
  // camera orbit has already finished moving, so the camera is fixed and this
  // placement holds for the rest of the scene.
  buildShapesSwarm() {
    this.shapesSwarmBuilt = true;

    this.camera.updateMatrixWorld();
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
    const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
    // Distance to the world origin, where the scene's own action (grid/cube/walls)
    // sits by this point - used as the swarm's own placement depth.
    const depth = this.camera.position.length();

    const halfHeight = Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * depth;
    const halfWidth = halfHeight * this.camera.aspect;
    const offsetX = (SWARM_SCREEN_X - 0.5) * 2 * halfWidth;
    const offsetY = (0.5 - SWARM_SCREEN_Y) * 2 * halfHeight; // screen Y grows downward, world "up" grows upward

    const anchor = new THREE.Vector3()
      .copy(this.camera.position)
      .addScaledVector(forward, depth)
      .addScaledVector(right, offsetX)
      .addScaledVector(up, offsetY);

    // Solves for the group scale that makes the swarm's own tuned settle radius
    // (SWARM_REFERENCE_CLUSTER_RADIUS, in its local unit scale) occupy the desired
    // fraction of the visible frame at this depth.
    const worldScale = (halfHeight * SWARM_SCREEN_RADIUS_FRACTION) / SWARM_REFERENCE_CLUSTER_RADIUS;

    this.shapesSwarmGroup = new THREE.Group();
    this.shapesSwarmGroup.visible = false; // enterShapesSwarm shows it once spawn positions are set
    this.shapesSwarmGroup.position.copy(anchor);
    this.shapesSwarmGroup.quaternion.copy(this.camera.quaternion);
    this.shapesSwarmGroup.scale.setScalar(worldScale);
    this.scene.add(this.shapesSwarmGroup);
    this.shapesSwarmGroup.updateMatrixWorld(true);
    // Cached once - the group never moves again after this, so re-deriving this
    // every frame in applyShapesSwarmPointerRepulsion would be wasted work.
    this.shapesSwarmInverseMatrix = new THREE.Matrix4().copy(this.shapesSwarmGroup.matrixWorld).invert();

    // Spawn shell sized off the actual visible frame (converted into local units
    // via worldScale) rather than a fixed constant, so shapes always start past
    // the frame's own corner-to-corner diagonal, comfortably outside the
    // viewport, regardless of how large SWARM_SCREEN_RADIUS_FRACTION makes the
    // settled cluster itself.
    const frameDiagonal = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
    // 3x the frame's own corner-to-corner diagonal, not just barely past it - with
    // SWARM_ATTRACT_K tuned strong (shapes cover a lot of distance fast), a merely
    // "just outside" margin gets crossed back into frame within a fraction of a
    // second, reading as shapes popping in rather than flying in. This buys real
    // travel time before that happens, regardless of how fast the pull is tuned.
    const spawnRadiusLocal = (frameDiagonal * 3) / worldScale;

    this.shapesWorld = new CANNON.World();
    this.shapesWorld.gravity.set(0, 0, 0); // no fall - shapes are held only by central attraction
    this.shapesWorld.broadphase = new CANNON.SAPBroadphase(this.shapesWorld);
    this.shapesWorld.allowSleep = false;

    const contactMaterial = new CANNON.Material('shape');
    this.shapesWorld.defaultContactMaterial = new CANNON.ContactMaterial(contactMaterial, contactMaterial, {
      friction: 0.3,
      restitution: 0.15, // low bounce - contact energy bleeds off instead of feeding spin/velocity back in
    });

    // Each type: how to build its Three geometry (unit-scale, actual size applied
    // via instance matrix) and its cannon-es collision shape at a given size.
    // smooth:true keeps that type's curved surface smoothly shaded rather than
    // faceted - only genuinely flat-faced primitives default to flat shading.
    const TYPES = {
      sphere: { weight: 3, geometry: new THREE.SphereGeometry(0.5, 32, 24), smooth: true, makeShape: (s) => new CANNON.Sphere(s * 0.5) },
      dot: { weight: 2, geometry: new THREE.SphereGeometry(0.5, 20, 16), smooth: true, makeShape: (s) => new CANNON.Sphere(s * 0.5) },
      box: { weight: 2, geometry: new THREE.BoxGeometry(1, 1, 1), makeShape: (s) => new CANNON.Box(new CANNON.Vec3(s * 0.5, s * 0.5, s * 0.5)) },
      octahedron: { weight: 1.5, geometry: new THREE.OctahedronGeometry(0.65), makeShape: (s) => this.buildOctahedronHull(s * 0.65) },
      tetrahedron: { weight: 1.2, geometry: new THREE.TetrahedronGeometry(0.65), makeShape: (s) => this.buildTetrahedronHull(s * 0.4) },
    };
    const typeKeys = Object.keys(TYPES);
    const pickWeighted = () => {
      const total = typeKeys.reduce((sum, k) => sum + TYPES[k].weight, 0);
      let r = Math.random() * total;
      for (const k of typeKeys) {
        r -= TYPES[k].weight;
        if (r <= 0) return k;
      }
      return typeKeys[typeKeys.length - 1];
    };

    // Each shape's type is picked exactly once, into this list - both the
    // per-type InstancedMesh capacity below and the body/instance creation loop
    // read from it, so the two stay in sync (picking independently twice would
    // let the random draws disagree and overflow a mesh's allocated instance
    // count).
    const pickedTypes = Array.from({ length: SWARM_SHAPE_COUNT }, pickWeighted);
    const countByType = {};
    for (const type of pickedTypes) countByType[type] = (countByType[type] || 0) + 1;

    this.shapesSwarmShapes = [];
    this.shapesSwarmMeshes = {};
    const nextIndexByType = {};
    for (const type of typeKeys) {
      const count = countByType[type] || 0;
      if (count === 0) continue;
      const material = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0, flatShading: !TYPES[type].smooth });
      const mesh = new THREE.InstancedMesh(TYPES[type].geometry, material, count);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.castShadow = true;
      this.shapesSwarmGroup.add(mesh);
      this.shapesSwarmMeshes[type] = mesh;
      nextIndexByType[type] = 0;
    }

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < SWARM_SHAPE_COUNT; i++) {
      const type = pickedTypes[i];
      const size = type === 'dot'
        ? SWARM_DOT_SIZE_MIN + Math.random() * (SWARM_DOT_SIZE_MAX - SWARM_DOT_SIZE_MIN)
        : SWARM_SHAPE_SIZE_MIN + Math.random() * (SWARM_SHAPE_SIZE_MAX - SWARM_SHAPE_SIZE_MIN);
      const c = SWARM_COLORS[(Math.random() * SWARM_COLORS.length) | 0];

      // Spawn on a ring in the group's own local XY plane (screen-plane, since
      // the group's quaternion matches the camera's), not a full 3D sphere - a
      // uniformly-random 3D direction spends most of its radius on local Z
      // (camera depth), which barely moves a point's on-screen position at all
      // (perspective projection only cares about X/Y over depth), so shapes could
      // land with most of their "distance" invisible to the viewer and pop in
      // within frame despite technically being spawnRadiusLocal away in 3D. A
      // small Z jitter (relative to the settled cluster's own size, not the huge
      // spawn radius) still gives spawn depth some variety without undermining
      // the guarantee.
      const angle = Math.random() * Math.PI * 2;
      const ringRadius = spawnRadiusLocal * (1 + Math.random() * 0.5);
      const depthJitter = (Math.random() * 2 - 1) * SWARM_REFERENCE_CLUSTER_RADIUS * 3;
      const spawnPosition = new THREE.Vector3(Math.cos(angle) * ringRadius, Math.sin(angle) * ringRadius, depthJitter);
      const spawnQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      );

      const body = new CANNON.Body({
        mass: size,
        shape: TYPES[type].makeShape(size),
        position: new CANNON.Vec3(spawnPosition.x, spawnPosition.y, spawnPosition.z),
        material: contactMaterial,
        linearDamping: SWARM_LINEAR_DAMPING,
        angularDamping: SWARM_ANGULAR_DAMPING,
      });
      body.quaternion.set(spawnQuaternion.x, spawnQuaternion.y, spawnQuaternion.z, spawnQuaternion.w);
      this.shapesWorld.addBody(body);

      const instanceIndex = nextIndexByType[type]++;
      const mesh = this.shapesSwarmMeshes[type];
      dummy.position.copy(spawnPosition);
      dummy.scale.setScalar(size);
      dummy.updateMatrix();
      mesh.setMatrixAt(instanceIndex, dummy.matrix);
      mesh.setColorAt(instanceIndex, color.set(c));

      this.shapesSwarmShapes.push({
        type, size, body, instanceIndex, spawnPosition, spawnQuaternion,
        retreatFrom: new THREE.Vector3(),
        retreatFromQuat: new THREE.Quaternion(),
      });
    }
    for (const mesh of Object.values(this.shapesSwarmMeshes)) {
      mesh.instanceColor.needsUpdate = true;
    }

    // Scratch objects reused every frame in updateShapesSwarm/
    // applyShapesSwarmPointerRepulsion, to avoid allocating per-shape per-frame.
    this.shapesSwarmDummy = dummy;
    this.shapesSwarmCenterForce = new CANNON.Vec3();
    this.shapesSwarmRaycaster = new THREE.Raycaster();
    this.shapesSwarmPointerNDC = new THREE.Vector2(-10, -10);
    this.shapesSwarmPointerActive = false;
    this.shapesSwarmRayOriginLocal = new THREE.Vector3();
    this.shapesSwarmRayFarLocal = new THREE.Vector3();
    this.shapesSwarmToBody = new THREE.Vector3();
    this.shapesSwarmClosestPoint = new THREE.Vector3();
    this.shapesSwarmPushDir = new THREE.Vector3();
    this.shapesSwarmRetreatQuat = new THREE.Quaternion();

    this.onShapesSwarmPointerMove = this.onShapesSwarmPointerMove.bind(this);
    this.onShapesSwarmPointerLeave = this.onShapesSwarmPointerLeave.bind(this);
    window.addEventListener('pointermove', this.onShapesSwarmPointerMove);
    window.addEventListener('pointerleave', this.onShapesSwarmPointerLeave);
  }

  // Scroll forward past the trigger: builds the swarm on first call, then resets
  // every shape back to its own spawn position/orientation outside the viewport
  // and lets it fly inward under normal attraction physics - so crossing this
  // point always replays the same entrance, even on a second pass after a
  // scroll-back retreat.
  enterShapesSwarm() {
    if (!this.shapesSwarmBuilt) this.buildShapesSwarm();
    this.shapesSwarmGroup.visible = true;
    this.shapesSwarmState = 'active';
    for (const s of this.shapesSwarmShapes) {
      s.body.position.set(s.spawnPosition.x, s.spawnPosition.y, s.spawnPosition.z);
      s.body.velocity.set(0, 0, 0);
      s.body.angularVelocity.set(0, 0, 0);
      s.body.quaternion.set(s.spawnQuaternion.x, s.spawnQuaternion.y, s.spawnQuaternion.z, s.spawnQuaternion.w);
    }
  }

  // Scroll back past the trigger: instead of just vanishing, every shape lerps
  // from wherever it currently is back out to its own spawn position (the same
  // outside-the-viewport shell it flew in from) - see updateShapesSwarm's
  // 'retreating' branch, which drives the actual interpolation and hides the
  // group once it finishes.
  exitShapesSwarm() {
    if (!this.shapesSwarmBuilt || this.shapesSwarmState === 'hidden') return;
    this.shapesSwarmState = 'retreating';
    this.shapesSwarmRetreatT = 0;
    for (const s of this.shapesSwarmShapes) {
      s.retreatFrom.copy(s.body.position);
      s.retreatFromQuat.copy(s.body.quaternion);
    }
  }

  // Convex hulls for the platonic solids cannon-es has no built-in primitive for.
  buildOctahedronHull(r) {
    const v = [
      new CANNON.Vec3(r, 0, 0), new CANNON.Vec3(-r, 0, 0),
      new CANNON.Vec3(0, r, 0), new CANNON.Vec3(0, -r, 0),
      new CANNON.Vec3(0, 0, r), new CANNON.Vec3(0, 0, -r),
    ];
    const faces = [
      [0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
      [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5],
    ];
    return new CANNON.ConvexPolyhedron({ vertices: v, faces });
  }

  buildTetrahedronHull(r) {
    const v = [
      new CANNON.Vec3(r, r, r), new CANNON.Vec3(r, -r, -r),
      new CANNON.Vec3(-r, r, -r), new CANNON.Vec3(-r, -r, r),
    ];
    const faces = [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]];
    return new CANNON.ConvexPolyhedron({ vertices: v, faces });
  }

  onShapesSwarmPointerMove(event) {
    this.shapesSwarmPointerNDC.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.shapesSwarmPointerNDC.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.shapesSwarmPointerActive = true;
  }

  onShapesSwarmPointerLeave() {
    this.shapesSwarmPointerActive = false;
  }

  // Pushes any body whose position falls within SWARM_REPEL_RADIUS of the mouse's
  // 3D sightline (not just its depth-plane projection), so the repulsion reads as
  // a beam through the scene rather than a flat disc at one fixed depth. The ray
  // is transformed into the swarm group's own local space (via the inverse matrix
  // cached in buildShapesSwarm) so this still compares against
  // SWARM_REPEL_RADIUS in the physics' own originally-tuned unit scale, regardless
  // of how large the group actually is in the scene.
  applyShapesSwarmPointerRepulsion() {
    if (!this.shapesSwarmPointerActive) return;
    this.shapesSwarmRaycaster.setFromCamera(this.shapesSwarmPointerNDC, this.camera);
    const worldOrigin = this.shapesSwarmRaycaster.ray.origin;
    const worldFar = this.shapesSwarmRayFarLocal.copy(worldOrigin).addScaledVector(this.shapesSwarmRaycaster.ray.direction, 1000);

    const rayOrigin = this.shapesSwarmRayOriginLocal.copy(worldOrigin).applyMatrix4(this.shapesSwarmInverseMatrix);
    const rayDir = worldFar.applyMatrix4(this.shapesSwarmInverseMatrix).sub(rayOrigin).normalize();

    for (const s of this.shapesSwarmShapes) {
      const p = s.body.position;
      this.shapesSwarmToBody.set(p.x, p.y, p.z).sub(rayOrigin);
      const t = Math.max(0, this.shapesSwarmToBody.dot(rayDir));
      this.shapesSwarmClosestPoint.copy(rayOrigin).addScaledVector(rayDir, t);
      this.shapesSwarmPushDir.set(p.x, p.y, p.z).sub(this.shapesSwarmClosestPoint);
      const dist = this.shapesSwarmPushDir.length();
      if (dist < SWARM_REPEL_RADIUS && dist > 0.0001) {
        const falloff = 1 - dist / SWARM_REPEL_RADIUS;
        const force = SWARM_REPEL_STRENGTH * falloff * falloff;
        this.shapesSwarmPushDir.multiplyScalar(force / dist);
        s.body.applyForce(new CANNON.Vec3(this.shapesSwarmPushDir.x, this.shapesSwarmPushDir.y, this.shapesSwarmPushDir.z), s.body.position);
      }
    }
  }

  updateShapesSwarm(dt) {
    if (this.shapesSwarmState === 'hidden') return;

    if (this.shapesSwarmState === 'retreating') {
      this.shapesSwarmRetreatT = Math.min(this.shapesSwarmRetreatT + dt / SWARM_RETREAT_DURATION, 1);
      const eased = this.shapesSwarmRetreatT * this.shapesSwarmRetreatT * (3 - 2 * this.shapesSwarmRetreatT); // smoothstep
      for (const s of this.shapesSwarmShapes) {
        s.body.position.set(
          THREE.MathUtils.lerp(s.retreatFrom.x, s.spawnPosition.x, eased),
          THREE.MathUtils.lerp(s.retreatFrom.y, s.spawnPosition.y, eased),
          THREE.MathUtils.lerp(s.retreatFrom.z, s.spawnPosition.z, eased),
        );
        s.body.velocity.set(0, 0, 0);
        s.body.angularVelocity.set(0, 0, 0);
        this.shapesSwarmRetreatQuat.slerpQuaternions(s.retreatFromQuat, s.spawnQuaternion, eased);
        s.body.quaternion.set(this.shapesSwarmRetreatQuat.x, this.shapesSwarmRetreatQuat.y, this.shapesSwarmRetreatQuat.z, this.shapesSwarmRetreatQuat.w);
      }
      if (this.shapesSwarmRetreatT >= 1) {
        this.shapesSwarmState = 'hidden';
        this.shapesSwarmGroup.visible = false;
      }
    } else {
      for (const s of this.shapesSwarmShapes) {
        const p = s.body.position;
        this.shapesSwarmCenterForce.set(-p.x, -p.y, -p.z).scale(SWARM_ATTRACT_K * s.body.mass, this.shapesSwarmCenterForce);
        s.body.applyForce(this.shapesSwarmCenterForce, s.body.position);
      }
      this.applyShapesSwarmPointerRepulsion();
      this.shapesWorld.step(1 / 60, dt, 5);
    }

    for (const s of this.shapesSwarmShapes) {
      const mesh = this.shapesSwarmMeshes[s.type];
      const p = s.body.position;
      const q = s.body.quaternion;
      this.shapesSwarmDummy.position.set(p.x, p.y, p.z);
      this.shapesSwarmDummy.quaternion.set(q.x, q.y, q.z, q.w);
      this.shapesSwarmDummy.scale.setScalar(s.size);
      this.shapesSwarmDummy.updateMatrix();
      mesh.setMatrixAt(s.instanceIndex, this.shapesSwarmDummy.matrix);
    }
    for (const mesh of Object.values(this.shapesSwarmMeshes)) {
      mesh.instanceMatrix.needsUpdate = true;
    }
  }

  // Builds one resolution's InstancedBufferGeometry: the per-cell downsample
  // of LATTICE_LUMINANCE plus the swirl/entrance-timing data every mark reads
  // in the shader (see createLatticeRevealMaterial). Pulled out of
  // buildLatticeReveal so setLatticeResolution can call it again lazily for
  // any of the higher densities in LATTICE_N_STEPS, cached per n afterward.
  buildLatticeGeometry(n) {
    const count = n * n;
    const cells = new Float32Array(count * 2);
    const data = new Float32Array(count * 4);
    const raw = new Float32Array(count);

    // Downsamples the 128x128 source into this grid's own resolution by
    // averaging each cell's own block of source pixels.
    const step = LATTICE_SRC / n, c = (n - 1) / 2, maxR = Math.hypot(c, c);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const x0 = Math.floor(i * step), x1 = Math.max(x0 + 1, Math.floor((i + 1) * step));
        const y0 = Math.floor(j * step), y1 = Math.max(y0 + 1, Math.floor((j + 1) * step));
        let s = 0, k = 0;
        for (let y = y0; y < y1; y++)
          for (let x = x0; x < x1; x++) { s += LATTICE_LUMINANCE[y * LATTICE_SRC + x]; k++; }
        raw[j * n + i] = s / k / 255;
      }
    }

    // Averaging washes out contrast by a different amount depending on grid
    // resolution, so stretch to this grid's own tonal range (3rd-97th
    // percentile) rather than assume the source's own 0-1 range still holds.
    const sorted = Float32Array.from(raw).sort();
    const lo = sorted[Math.floor(count * 0.03)], hi = sorted[Math.floor(count * 0.97)];
    const span = Math.max(hi - lo, 0.01);

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        const idx = j * n + i;
        cells[idx * 2] = i;
        cells[idx * 2 + 1] = j;
        data[idx * 4] = THREE.MathUtils.clamp((raw[idx] - lo) / span, 0, 1);
        data[idx * 4 + 1] = 0.28 * Math.hypot(i - c, j - c) / maxR;
        data[idx * 4 + 2] = (Math.abs(Math.sin(i * 127.1 + j * 311.7) * 43758.5453) % 1) - 0.5;
        data[idx * 4 + 3] = (i + j) / (2 * (n - 1));
      }
    }

    const base = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index.clone();
    geo.setAttribute('position', base.attributes.position.clone());
    geo.setAttribute('normal', base.attributes.normal.clone());
    geo.setAttribute('uv', base.attributes.uv.clone());
    geo.setAttribute('aCell', new THREE.InstancedBufferAttribute(cells, 2));
    geo.setAttribute('aData', new THREE.InstancedBufferAttribute(data, 4));
    geo.instanceCount = count;
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 2);
    base.dispose();
    return geo;
  }

  // Builds the lattice reveal's InstancedMesh the first time it's needed (see
  // enterLatticeReveal). Placed relative to the camera's own current
  // position/orientation, same technique and same reasoning as
  // buildShapesSwarm: by the time this fires the camera is done moving for
  // the rest of the scene, so a placement derived from its live matrix holds.
  buildLatticeReveal() {
    this.latticeBuilt = true;

    const n = LATTICE_N_STEPS[0];
    this.latticeGeometries = { [n]: this.buildLatticeGeometry(n) };
    this.latticeActiveN = n;

    this.latticeMaterial = createLatticeRevealMaterial(n, LATTICE_CURLED_INTRO);

    this.camera.updateMatrixWorld();
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
    const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
    const depth = this.camera.position.length();
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * depth;
    const halfWidth = halfHeight * this.camera.aspect;
    const latticeScreenX = this.isPortrait ? LATTICE_SCREEN_X_PORTRAIT : LATTICE_SCREEN_X;
    const latticeScreenY = this.isPortrait ? LATTICE_SCREEN_Y_PORTRAIT : LATTICE_SCREEN_Y;
    const offsetX = (latticeScreenX - 0.5) * 2 * halfWidth;
    const offsetY = (0.5 - latticeScreenY) * 2 * halfHeight;
    const anchor = new THREE.Vector3()
      .copy(this.camera.position)
      .addScaledVector(forward, depth)
      .addScaledVector(right, offsetX)
      .addScaledVector(up, offsetY);

    this.latticeGroup = new THREE.Group();
    this.latticeGroup.visible = false; // enterLatticeReveal shows it
    this.latticeGroup.position.copy(anchor);
    this.latticeGroup.quaternion.copy(this.camera.quaternion);
    const latticeScaleBasis = this.isPortrait ? Math.min(halfWidth, halfHeight) : halfHeight;
    const latticeScaleFraction = this.isPortrait ? LATTICE_SCALE_FRACTION_PORTRAIT : LATTICE_SCALE_FRACTION;
    this.latticeGroup.scale.setScalar(latticeScaleBasis * latticeScaleFraction);
    this.scene.add(this.latticeGroup);

    this.latticeMesh = new THREE.Mesh(this.latticeGeometries[n], this.latticeMaterial);
    this.latticeMesh.frustumCulled = false;
    this.latticeGroup.add(this.latticeMesh);

    this.latticeStartTime = performance.now();
    this.latticeIntroStart = this.latticeStartTime;
  }

  // Scroll forward into the chapter: builds the grid on first call, then
  // replays the real-time pop-in wavefront every time (so scrolling back out
  // and forward in again still reads as an entrance, not silence). Also
  // resets back to the default resolution on every entrance, so a visitor
  // who stepped it up, scrolled away, and scrolled back down again meets the
  // same default the first-time visitor sees - the resolution buttons are a
  // side feature, not a sticky preference.
  enterLatticeReveal() {
    if (!this.latticeBuilt) this.buildLatticeReveal();
    else this.setLatticeResolution(LATTICE_N_STEPS[0]);
    this.latticeGroup.visible = true;
    this.latticeIntroStart = performance.now();
  }

  // Scroll back out of the chapter: no retreat animation needed (unlike the
  // shapes swarm, nothing here is flying anywhere) - uProgress unwinding back
  // toward 0 already reads as the marks returning to their at-rest state, so
  // this just stops rendering them.
  exitLatticeReveal() {
    if (!this.latticeBuilt) return;
    this.latticeGroup.visible = false;
  }

  // Driven by main.js's own scroll-scrubbed proxy tween across the chapter's
  // scroll span - see LATTICE_START in main.js.
  setLatticeProgress(p) {
    if (this.latticeMaterial) this.latticeMaterial.uniforms.uProgress.value = p;
  }

  // Swaps in a different resolution's geometry (built lazily and cached the
  // first time it's requested) and replays the diagonal wavefront pop-in at
  // the new density - reuses the exact entrance the chapter's default 24x24
  // reveal already trained the eye on, rather than a hard cut or crossfade.
  // Driven by the resolution buttons in main.js: hover previews a density on
  // pointer/keyboard, click commits it as the fallback for touch, where
  // hover doesn't fire. Purely a side feature layered on top of the
  // scroll-scrubbed reveal itself (setLatticeProgress), which this never
  // touches.
  setLatticeResolution(n) {
    if (!this.latticeBuilt || n === this.latticeActiveN) return;
    if (!this.latticeGeometries[n]) this.latticeGeometries[n] = this.buildLatticeGeometry(n);
    this.latticeMesh.geometry = this.latticeGeometries[n];
    this.latticeMaterial.uniforms.uN.value = n;
    this.latticeActiveN = n;
    this.latticeIntroStart = performance.now();
  }

}

