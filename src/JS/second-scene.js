import * as THREE from 'three';
import BaseThreeJS from '../helpers/threejs-scene-module';

export default class SecondScene extends BaseThreeJS{
    constructor(containerId, loadingManager){
      super(containerId, loadingManager);
      this.clearAlpha = 1;

    }

    init() {
  
      const geometry = new THREE.SphereGeometry( 1, 32, 32 );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  
      const texLoader = new THREE.TextureLoader(this.loadingManager);
      texLoader.load('./textures/checker.jpg', (tex)=>{
       material.map = tex;
       material.needsUpdate = true;
  
      })
  
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add( this.mesh );
      
      this.camera.position.z = 5;
    }
  
    update() {  
      this.mesh.rotation.x += this.clock.getDelta();
      this.mesh.rotation.y += this.clock.getDelta();
    }

}


