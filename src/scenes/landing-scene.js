import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import BaseThreeJS from '../core/threejs-scene-module';
import { createGridMaterial } from "../materials/materials.js";

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


export default class LandingScene extends BaseThreeJS{
  constructor(containerId, loadingManager, renderer){
    super(containerId, loadingManager, renderer);
    this.clearAlpha = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.camera.fov = 40;
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
    this.scene.fog = new THREE.Fog( 0xded9c3, 3500, 5700 );
    // Real background instead of relying on canvas transparency: BokehPass's
    // shader always writes alpha=1, so anything left transparent (e.g. past
    // camera.far, where the floor gets culled) turns opaque black once the
    // composer is active. Match it to the fog color so it's seamless either way.
    this.scene.background = new THREE.Color( 0xded9c3 );

    // const loader = new RGBELoader();
    // loader.load('./HDRI/dusk.hdr', (tex)=>{
    //   tex.mapping = THREE.EquirectangularReflectionMapping;    
    //   sphereMat.envMap = tex;
    // });
      
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 1024;

    const tileSize = 64; // Size of each square
    for (let y = 0; y < canvas.height / tileSize; y++) {
      for (let x = 0; x < canvas.width / tileSize; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#ffe3a6' : '#111111'; // Alternate colors
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    // Convert canvas to a texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100); // Adjust repeat for larger patterns if needed
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    // Create the floor plane
    const planeGeometry = new THREE.PlaneGeometry(60000, 60000, 200, 200); // Width and height of the plane
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

    
    

    // load a texture for the stairs
    const texLoader = new THREE.TextureLoader(this.loadingManager);
    const mytex = texLoader.load( './textures/tiles3.jpg' );
    mytex.wrapS = THREE.RepeatWrapping;
    mytex.wrapT = THREE.RepeatWrapping;
    mytex.needsUpdate = true;


    // load a glb model
    const gltfloader = new GLTFLoader(this.loadingManager);
    const tillesBlackMat = new THREE.MeshStandardMaterial({ color: 'white', map:mytex});

    gltfloader.load('./models/HELLO2.glb', (gltf) => {
      const model = gltf.scene;

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      // model.children[0].children[0].children[2].material = tillesBlackMat; // Set the color of the second child to black
      // model.children[0].children[0].children[0].material.color.set('#fff5de');
      // model.children[0].children[0].children[1].material.color.set('#6683a3');
      // model.children[0].children[0].children[3].material.color.set('#ffde84');

      // model.scale.set(60, 60, 60);
      // model.rotation.y = Math.PI/4; // Rotate the model 180 degrees around the Y-axis
      // model.position.set(1500, 2, 700);
      model.scale.set(50, 50, 50);
            model.rotation.z = Math.PI/4; // Rotate the model 180 degrees around the Y-axis
            model.rotation.x = Math.PI/2; // Rotate the model 180 degrees around the Y-axis
            model.position.set(0, 10, 0);



      // this.scene.add(model);
    });

    //create geometry
    const sphereGeom = new THREE.SphereGeometry(70,64,64);
    const sphere = new THREE.Mesh(sphereGeom, createGridMaterial({roughness:0.5, metalness:.0, tileY:10}));
    sphere.position.set(0,70,600)
    // this.scene.add(sphere);
    sphere.castShadow = true;

    const boxGeom = new THREE.BoxGeometry( 100, 1000, 100 );
    const box = new THREE.Mesh( boxGeom, createGridMaterial({color: '#fae9c2',lineWidth: 0.012, roughness:0.0, tileY:35, tileX:4, lineColor: new THREE.Color(0x000000)}) );
    box.position.set(0, 50, 400);
    this.scene.add( box );
    box.castShadow = true;

    const box2 = box.clone();
    box2.position.set(400, 50, 400);
    this.scene.add( box2 );
    box2.castShadow = true;

    const box3 = box.clone();
    box3.position.set(-400, 50, 400);
    this.scene.add( box3 );
    box3.castShadow = true;

    const box4 = box.clone();
    box4.scale.set(3, 0.1, .2);
    box4.position.set(0, 0, 0);
    this.scene.add( box4 );
    box4.castShadow = true;

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

    // Add some lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, .1);
    this.scene.add(ambientLight);

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
    this.directionalLight.shadow.bias = -0.0004;
    this.directionalLight.shadow.normalBias = 0.02;
    this.directionalLight.shadow.radius = 2;
    this.directionalLight.target = sphere;
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
    const targetYFinal = 2500;

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

  onDocumentMouseMove( event ) {
    this.mouseX = ( event.clientX - this.windowHalfX );
    this.mouseY = ( event.clientY - this.windowHalfY );

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

