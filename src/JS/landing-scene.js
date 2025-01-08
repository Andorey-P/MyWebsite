import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import BaseThreeJS from '../helpers/threejs-scene-module';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


export default class LandingScene extends BaseThreeJS{
  constructor(containerId, loadingManager){
    super(containerId, loadingManager);
    this.clearAlpha = 0;
    this.mouseX = 0; 
    this.mouseY = 0;
    this.camera.fov = 35;
    this.floor = null;
    this.composer = null;
		this.windowHalfX = window.innerWidth / 2;
		this.windowHalfY = window.innerHeight / 2;
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    document.addEventListener( 'mousemove', this.onDocumentMouseMove );

  }

  init() {

    this.camera.position.z = 1500;
    this.scene.fog = new THREE.Fog( 0xded9c3, 3500, 4000 );

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 1024;

    const tileSize = 64; // Size of each square
    for (let y = 0; y < canvas.height / tileSize; y++) {
      for (let x = 0; x < canvas.width / tileSize; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#ffe3a6' : '#030200'; // Alternate colors
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    const loader = new RGBELoader();
    loader.load('./HDRI/dusk.hdr', (tex)=>{
      tex.mapping = THREE.EquirectangularReflectionMapping;    
      sphereMat.envMap = tex;
    });

    // Convert canvas to a texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100); // Adjust repeat for larger patterns if needed
    texture.encoding = THREE.sRGBEncoding;
    texture.needsUpdate = true;

    // Create the floor plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100); // Width and height of the plane
    const planeMaterial = new THREE.MeshStandardMaterial({ map: texture });
    this.floor = new THREE.Mesh(planeGeometry, planeMaterial);
    this.floor.name = "floor";
    this.floor.rotation.x = -Math.PI / 2; // Rotate the plane to make it horizontal
    this.floor.scale.set(1000,1000,1000);
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    // Create the outer rectangle shape
    const outerWidth = 100;
    const outerHeight = 160;
    const shape = new THREE.Shape();
    shape.moveTo(-outerWidth / 2, -outerHeight / 2);
    shape.lineTo(outerWidth / 2, -outerHeight / 2);
    shape.lineTo(outerWidth / 2, outerHeight / 2);
    shape.lineTo(-outerWidth / 2, outerHeight / 2);
    shape.lineTo(-outerWidth / 2, -outerHeight / 2);

    // Create the inner rectangle (hole)
    const innerWidth = 80;
    const innerHeight = 140;
    const hole = new THREE.Path();
    hole.moveTo(-innerWidth / 2, -innerHeight / 2);
    hole.lineTo(innerWidth / 2, -innerHeight / 2);
    hole.lineTo(innerWidth / 2, innerHeight / 2);
    hole.lineTo(-innerWidth / 2, innerHeight / 2);
    hole.lineTo(-innerWidth / 2, -innerHeight / 2);
    shape.holes.push(hole);

    // Extrude settings
    const extrudeSettings = {
      depth: 2, // Extrusion depth
      bevelEnabled: true, // Bevel the edges
      bevelThickness: 0.2,
      bevelSize: 0.2,
      bevelSegments: 2,
    };

    //create geometry
    const frameGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const frameMat = new THREE.MeshStandardMaterial({color:'green'});
    const frame = new THREE.Mesh(frameGeometry, frameMat);
    frame.position.set(0,100,1000)
    this.scene.add(frame);
    frame.castShadow = true;

    //create geometry
    const sphereGeom = new THREE.SphereGeometry(70,64,64);
    const sphereMat = new THREE.MeshStandardMaterial({color:'blue', roughness:0, metalness:1, flatShading:true});
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.set(400,100,800)
    this.scene.add(sphere);
    sphere.castShadow = true;


    // Add some lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0,1000,1100)
    directionalLight.castShadow = true;

    // Adjust shadow camera frustum (optional)
    directionalLight.shadow.camera.left = -1000;
    directionalLight.shadow.camera.right = 1000;
    directionalLight.shadow.camera.top = 1000;
    directionalLight.shadow.camera.bottom = -1000;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 3000;
    directionalLight.target = sphere;
    this.scene.add(directionalLight);

    const helper = new THREE.DirectionalLightHelper( directionalLight, 1 );
    //this.scene.add( helper );

    // Add a CameraHelper for the shadow camera
    const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    //this.scene.add(shadowCameraHelper);

    this.initPostprocessing();
  }

  update() {
    // Calculate a scale factor for movement and lerping based on the camera's z position
    const zMin = 0;   // Closest z position
    const zMax = 1500; // Farthest z position
    const zFactor = THREE.MathUtils.clamp((this.camera.position.z - zMin) / (zMax - zMin), 0, 1);

    // Target positions for x and y as z approaches 0
    const targetX = 0;
    const targetYFinal = 3000;

    // Smoothly interpolate the X position
    const desiredX = THREE.MathUtils.lerp(targetX, this.mouseX, zFactor);
    this.camera.position.x += (desiredX - this.camera.position.x) * 0.05;
    // Calculate the desired Y position based on mouse movement
    const mouseTargetY = -(this.mouseY - 200);
    const clampedMouseY = THREE.MathUtils.clamp(mouseTargetY, 50, 200);
    const desiredY = THREE.MathUtils.lerp(targetYFinal, clampedMouseY, zFactor);
    this.camera.position.y += (desiredY - this.camera.position.y) * 0.05;

    const rightVector = new THREE.Vector3();
this.camera.getWorldDirection(rightVector);
    // Keep the camera looking at the origin
    const lookAtTarget = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(lookAtTarget);
  }

  onDocumentMouseMove( event ) {
    this.mouseX = ( event.clientX - this.windowHalfX );
    this.mouseY = ( event.clientY - this.windowHalfY );

  }

  initPostprocessing() {

    const renderPass = new RenderPass( this.scene, this.camera );

    const bokehPass = new BokehPass( this.scene, this.camera, {
      focus: 1.0,
      aperture: 0.025,
      maxblur: 0.01
    } );

    const outputPass = new OutputPass();

    // this.composer = new EffectComposer( renderer );

    // composer.addPass( renderPass );
    // composer.addPass( bokehPass );
    // composer.addPass( outputPass );

    // postprocessing.composer = composer;
    // postprocessing.bokeh = bokehPass;

  }

}

