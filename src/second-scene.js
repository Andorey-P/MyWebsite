import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import BaseThreeJS from './threejs-scene-module';

export default class SecondScene extends BaseThreeJS{
    constructor(containerId, loadingManager){
      super(containerId, loadingManager);
    }

    init() {
      const rgbeLoader = new RGBELoader(this.loadingManager);
        rgbeLoader.load('./texture.hdr', (tex)=> {
        this.scene.background = tex;
      });
  
      const geometry = new THREE.SphereGeometry( 1, 32, 32 );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  
      const texLoader = new THREE.TextureLoader(this.loadingManager);
      texLoader.load('./checker.jpg', (tex)=>{
       material.map = tex;
       material.needsUpdate = true;
  
      })
  
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add( this.mesh );
      
      this.camera.position.z = 5;
    }
  
    update() {
      console.log("second")
  
      this.mesh.rotation.x += this.clock.getDelta();
      this.mesh.rotation.y += this.clock.getDelta();
    }
}


