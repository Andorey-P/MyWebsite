import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

class FirstScene {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.scene = new THREE.Scene();
    this.fov = 75;
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.containerId = 'first-scene';
    this.clock = new THREE.Clock();
    this.mesh = null;
    
    
    this.init();
  }

  init() {
    const rgbeLoader = new RGBELoader(this.loadingManager);
      rgbeLoader.load('./texture.hdr', (tex)=> {
	    //this.scene.background = tex;
    });

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    const texLoader = new THREE.TextureLoader(this.loadingManager);
    texLoader.load('./checker.jpg', (tex)=>{
     material.map = tex;
      material.needsUpdate = true;  // Ensure the texture is applied

    })

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add( this.mesh );
    
    this.camera.position.z = 5;
  }

  update() {
    console.log("first")
    this.mesh.rotation.x += this.clock.getDelta();
    this.mesh.rotation.y += this.clock.getDelta();
  }
}

export default FirstScene;