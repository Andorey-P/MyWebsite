import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

export default class BaseThreeJS {
    constructor(containerId = 'null', loadingManager = null){    
    this.containerId = containerId;
    this.loadingManager = loadingManager;
    this.scene = new THREE.Scene();
    this.fov = 75;
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.clock = new THREE.Clock();
    this.mesh = null;
    
    this.init();
  }

  init() {
  alert("INIT CLASS MUST BE INITIALIZED IN CHILD CLASS")
  }

  update() {
    alert("UPDATE CLASS MUST BE INITIALIZED IN CHILD CLASS")

  }
}