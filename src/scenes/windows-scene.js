import * as THREE from 'three';
import BaseThreeJS from '../core/threejs-scene-module';

export default class WindowsScene extends BaseThreeJS {
  constructor(containerId, loadingManager, renderer) {
    super(containerId, loadingManager, renderer);
    // Transparent - no scene background/clear color of its own, so whatever
    // sits behind the canvas (the dot-wipe backdrop - see .windows-scene's
    // z-index in style.css) shows through wherever this scene doesn't draw.
    this.clearAlpha = 0;
    this.composer = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseOffset = new THREE.Vector2(0, 0);
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    // The scroll timeline in main.js tweens this directly; update() layers
    // the mouse-parallax offset on top each frame rather than the two fighting.
    this.scrollCameraBase = {
      position: new THREE.Vector3(0, 0, 9),
      lookAt: new THREE.Vector3(0, 0, 0),
    };

    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    document.addEventListener('mousemove', this.onDocumentMouseMove);

    this.init();
  }

  init() {
    this.camera.position.copy(this.scrollCameraBase.position);
    this.camera.near = 0.1;
    this.camera.far = 200;
    this.camera.updateProjectionMatrix();
  }

  update() {
    const targetOffsetX = THREE.MathUtils.clamp(this.mouseX * 0.008, -1, 1);
    const targetOffsetY = THREE.MathUtils.clamp(-this.mouseY * 0.005, -0.5, 0.5);
    this.mouseOffset.x += (targetOffsetX - this.mouseOffset.x) * 0.05;
    this.mouseOffset.y += (targetOffsetY - this.mouseOffset.y) * 0.05;

    this.camera.position.set(
      this.scrollCameraBase.position.x + this.mouseOffset.x,
      this.scrollCameraBase.position.y + this.mouseOffset.y,
      this.scrollCameraBase.position.z,
    );
    this.camera.lookAt(this.scrollCameraBase.lookAt);
  }

  onDocumentMouseMove(event) {
    this.mouseX = event.clientX - this.windowHalfX;
    this.mouseY = event.clientY - this.windowHalfY;
  }
}
