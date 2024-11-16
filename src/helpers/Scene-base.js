import * as THREE from 'three';

class Scene {
  constructor(loadingManager) {
    this.scene = new THREE.Scene();
    this.fov = 75;
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.container = null;

    // Example mesh with loaded texture
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.clock = new THREE.Clock();
  }

  update() {
    const delta = this.clock.getDelta();
    this.mesh.rotation.x += delta;
    this.mesh.rotation.y += delta;
  }
}

export default Scene;