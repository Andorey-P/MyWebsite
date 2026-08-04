import * as THREE from 'three';
import BaseThreeJS from '../core/threejs-scene-module';

export default class SecondScene extends BaseThreeJS{
    constructor(containerId, loadingManager, renderer){
      super(containerId, loadingManager, renderer);
      this.clearAlpha = 1;

      this.init();
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
      const delta = this.clock.getDelta();
      this.mesh.rotation.x += delta;
      this.mesh.rotation.y += delta;
    }

}


