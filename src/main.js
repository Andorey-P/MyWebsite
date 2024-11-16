import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

import { LoadingManager } from "three";
import FirstScene from "./first-scene";
import SecondScene from './second-scene';

let activeScene = null;
let fps = 60;

const loadingManager = new LoadingManager();
gsap.registerPlugin(ScrollTrigger);

// initialize all threejs scene
const firstScene = new FirstScene(loadingManager);
const secondScene = new SecondScene('second-scene',loadingManager);

// Hide the loading screen when all assets are loaded
loadingManager.onLoad = () => {
	document.getElementById('loading-screen').style.display = 'none';
	console.log('All assets loaded');
	animate();
  };

// Renderer setup
const renderer = new THREE.WebGLRenderer({antialias:true});

// Handle scroll events and resize events
window.addEventListener('resize', windowResize);

function windowResize() {
	if (activeScene) {
		const activeContainer = document.getElementById(activeScene.containerId);
		renderer.setSize(activeContainer.offsetWidth, activeContainer.offsetHeight);
		activeScene.camera.aspect = activeContainer.offsetWidth / activeContainer.offsetHeight;
		activeScene.camera.updateProjectionMatrix();
	}
}

function setActiveScene(scene) {
  activeScene = scene;
  const activeContainer = document.getElementById(activeScene.containerId);
  windowResize()
  activeContainer.appendChild(renderer.domElement)
  renderer.render(activeScene.scene, activeScene.camera);
}

// Render loop animation
function animate() {
	setTimeout(() => {
		requestAnimationFrame(animate);
		if (activeScene) {
			activeScene.update();
			renderer.render(activeScene.scene, activeScene.camera);
		  }
	}, 1000 / fps);
 
}


// Setup gsap animations
gsap.to('#second-scene', {
	backgroundColor: 'red',
	duration:.1,
	ease:'power1.inOut',
	scrollTrigger: {
		trigger:'#second-scene',
		start: 'top center',
		markers:true,
		toggleActions: 'play none none reverse'
	},
	onStart: ()=> {
		setActiveScene(secondScene);
	},
	onReverseComplete: ()=> {
		setActiveScene(firstScene);

	}
})

  