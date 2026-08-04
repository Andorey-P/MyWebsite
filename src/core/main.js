import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type'

import { LoadingManager } from "three";
import LandingScene from "../scenes/landing-scene";
import SecondScene from '../scenes/second-scene';
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
		history.scrollRestoration = "manual";
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
	loadingTL.to('.loading-screen-bg', {
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
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.domElement.classList.add('threejs-canvas');


// initialize all threejs scene ************TO DO: Manage the fact that the renderer takes the size of the cointainer, but we also want to pin the container and make it super large so we casn scroll
const landingScene = new LandingScene('landing-scene',loadingManager, renderer);
const secondScene = new SecondScene('second-scene',loadingManager, renderer);
setActiveScene(landingScene);

window.addEventListener('load', onload);


function setActiveScene(scene) {
  activeScene = scene;
  const activeContainer = document.getElementById(activeScene.containerId);
  activeContainer.appendChild(renderer.domElement)
  renderer.setClearAlpha(activeScene.clearAlpha);
  resizeToDisplaySize();
  renderActiveScene();
}

// Renders the active scene through its composer when it has one, otherwise directly
function renderActiveScene() {
	if (activeScene.composer) {
		activeScene.composer.render();
	} else {
		renderer.render(activeScene.scene, activeScene.camera);
	}
}

// Render loop animation
function animate() {
	setTimeout(() => {
		requestAnimationFrame(animate);
		if (activeScene) {
			resizeToDisplaySize();
			activeScene.update();
			renderActiveScene();
		  }
	}, 1000 / fps);

}

// Timeline for events in the landing section
const landingSceneTimeline = gsap.timeline({
	scrollTrigger: {
		trigger: '#landing-scene',
		pin: true, // pin the trigger element while active
		start: 'top top', // when the top of the trigger hits the top of the viewport
		end: 'bottom top', // shorter scroll range makes the movement feel faster
		scrub: 1, // lower scrub means the camera reacts more directly to scrolling
		markers: true
	}
})

// Resizes the renderer's drawing buffer to match the canvas's CSS-driven
// display size (per https://threejs.org/manual/#en/responsive). Reading
// clientWidth/clientHeight instead of window.innerWidth means this stays
// correct no matter why the canvas's box changed size - window resize,
// container/layout change, GSAP pin-spacer, orientation change, etc. - and
// since it's called every frame, no resize event listener is needed.
function resizeRendererToDisplaySize() {
	const canvas = renderer.domElement;
	const pixelRatio = Math.min(window.devicePixelRatio, 2);
	const width = Math.floor(canvas.clientWidth * pixelRatio);
	const height = Math.floor(canvas.clientHeight * pixelRatio);
	const needsResize = canvas.width !== width || canvas.height !== height;
	if (needsResize) {
		renderer.setSize(width, height, false);
		if (activeScene.composer) {
			activeScene.composer.setSize(width, height);
		}
	}
	return needsResize;
}

function resizeToDisplaySize() {
	if (!activeScene) return;
	const canvas = renderer.domElement;
	if (resizeRendererToDisplaySize() && canvas.clientHeight > 0) {
		activeScene.camera.aspect = canvas.clientWidth / canvas.clientHeight;
		activeScene.camera.updateProjectionMatrix();
	}
}

// onload function
function onload(){
	
	// set gsap timeline for landing scene
	landingSceneTimeline.to(activeScene.camera.position, {
		z: 0,
		ease: 'power3.inOut',
		duration: 1,
	})

	landingSceneTimeline.to(activeScene.directionalLight.position, { 
		x:0,
		y:300,
		ease: 'power3.inOut',
		duration: 1 }); 


};

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


