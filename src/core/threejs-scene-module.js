import * as THREE from 'three';

export default class BaseThreeJS {
    constructor(containerId = null, loadingManager = null, renderer = null){
    this.containerId = containerId;
    this.loadingManager = loadingManager;
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.fov = 75;
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 0.1, 5000);
    this.camera.position.z = 5;
    this.clock = new THREE.Clock();
    this.mesh = null;
    this.directionalLight = new THREE.DirectionalLight(0xffffff  , 3);
    
  }

  init() {
    throw new Error("init() must be implemented in child class");
  }

  update() {
    throw new Error("update() must be implemented in child class");
  }
}