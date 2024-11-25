import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type'

import { LoadingManager } from "three";
import FirstScene from "./first-scene";
import SecondScene from './second-scene';
import Lenis from 'lenis'


let activeScene = null;
let fps = 60;
const title = new SplitType(".split");

const loadingManager = new LoadingManager();
gsap.registerPlugin(ScrollTrigger);

//Restart Gif animation
const loadingGif = document.getElementById('loadingHeadGif');
loadingGif.setAttribute('src', "./gifs/LoadingHead3.gif");

// Hide the loading screen when all assets are loaded
loadingManager.onLoad = () => {
	
	setTimeout(function() {

		window.scrollTo(0, 0);
		document.body.style.overflow = 'auto'
		
		// Initialize Lenis
		const lenis = new Lenis();

		// Use requestAnimationFrame to continuously update the scroll
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
	
		requestAnimationFrame(raf);
	}, 0);

	// Loading page transition animation
	const loadingTL = gsap.timeline();
	loadingTL.to('.bg-div', {
		opacity:0, ease:'power1.in', duration:.8
	})
	.to('#loading-screen', {
		yPercent:-100,
		ease:'power3.inOut',
		duration:1
	}).from('.split .char', {
		yPercent:100,
		ease: 'power1.inOut',
		duration:1,
		stagger:.001
	})

	//Start threejs animation loops
	animate();
  };

// Renderer setup
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional for softer shadows

// initialize all threejs scene
const firstScene = new FirstScene('first-scene',loadingManager, renderer);
const secondScene = new SecondScene('second-scene',loadingManager, renderer);
setActiveScene(firstScene);

// Handle scroll events and resize events
window.addEventListener('resize', windowResize);

function windowResize() {
	if (activeScene) {
		const activeContainer = document.getElementById(activeScene.containerId);
		renderer.setSize(activeContainer.offsetWidth, activeContainer.offsetHeight);
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setClearAlpha( activeScene.clearAlpha );
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

// // Setup gsap animations
// gsap.to('#second-scene', {
// 	backgroundColor: 'red',
// 	duration:.1,
// 	ease:'power1.inOut',
// 	scrollTrigger: {
// 		trigger:'#second-scene',
// 		start: 'top center',
// 		toggleActions: 'play none none reverse'
// 	},
// 	onStart: ()=> {
// 		setActiveScene(secondScene);
// 	},
// 	onReverseComplete: ()=> {
// 		setActiveScene(firstScene);

// 	}
// })

const mainTimeline = gsap.timeline({
	scrollTrigger: {
		trigger: '#first-scene',
		pin: true, // pin the trigger element while active
		start: 'top top', // when the top of the trigger hits the top of the viewport
		end: '+=1000', // end after scrolling 500px beyond the start
		scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	}
})


window.addEventListener('load', function () {
	mainTimeline.to(activeScene.camera.position, {
		z: 0,
	}).to(activeScene.scene.getObjectByName("floor").rotation, {
		z: 0, // Set a default value here
		onUpdate: () => {
			const floorRotation = activeScene.scene.getObjectByName("floor").rotation;
			floorRotation.z = activeScene.camera.position.x > 0? -Math.PI / 4 : 3 * Math.PI / 4 ;
		},
		onComplete: () => {
			walkCycleAnim.play();
		},
		onReverseComplete: () => {
			walkCycleAnim.pause();

		}
	}).from('.walk', {
		opacity: 0,
	});

	let walkCycleAnim = gsap.to(activeScene.scene.getObjectByName("floor").material.map.offset, {
		x: -100, // Target value for the x offset
		y: -100, // Target value for the y offset
		duration: 1100, // Duration over which the offset will slowly increment
		ease: "none", // Linear (no easing)
		paused: true,
		repeat:-1
	});
});

