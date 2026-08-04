import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type'

import { LoadingManager } from "three";
import LandingScene from "../scenes/landing-scene";
import SecondScene from '../scenes/second-scene';
import Lenis from 'lenis'
import { PALETTE } from '../materials/palette.js';


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

		// ScrollTrigger normally reads native scroll events, but Lenis virtualizes
		// scrolling and doesn't fire those on its own - wire it up explicitly so
		// ScrollTrigger's cached scroll position never drifts from Lenis's actual
		// one. Driving Lenis from gsap's own ticker instead of a separate rAF loop
		// keeps every scroll-driven update on the same clock.
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);
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
// Lower than the previous 1.2: less exposure keeps highlights from blowing
// out to white, which read as a glossy digital render rather than flat,
// matte print colors (shared across scenes, but SecondScene's unlit
// MeshBasicMaterial placeholder is untouched by tone mapping either way).
renderer.toneMappingExposure = 1.0;
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
		// #landing-scene is 100vh, so 'bottom top' alone (the original 4-phase
		// intro) is exactly one viewport-height of scroll. Adding one more
		// viewport-height of room here gives the new wall-reveal/break sequence
		// a full extra viewport's worth of scroll to play out in, while the
		// total timeline duration also doubles below (4 units -> 8), so the
		// original 4 phases keep their original px-per-unit scroll pace.
		// Recomputed on resize since it reads window.innerHeight.
		end: () => '+=' + (window.innerHeight * 2),
		invalidateOnRefresh: true,
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
// The landing timeline is split into 4 equal-length quarters via explicit
// start-time positions (0, 1, 2, 3), so each scroll quarter drives one phase:
//   0-1  Phase 1: idle - free mouse-driven look (LandingScene.update() default)
//   1-2  Phase 2: camera dives from z:1500 to z:0 and tilts to look down
//   2-3  Phase 3: sun swings low, camera flattens toward orthographic, the
//        vertical boxes slide out of frame, the horizontal box collapses away
//   3-4  Phase 4: the floor morphs into a small sphere
function onload(){

	// Phase 2
	landingSceneTimeline.to(activeScene.camera.position, {
		z: 0,
		ease: 'power3.inOut',
		duration: 1,
	}, 1);

	// Phase 3
	landingSceneTimeline.to(activeScene.directionalLight.position, {
		x: 0,
		y:400,
		ease: 'power3.inOut',
		duration: 1,
	}, 2);

	landingSceneTimeline.to(landingScene.camera, {
		fov: 12, // low FOV flattens perspective toward an orthographic look
		ease: 'power3.inOut',
		duration: 1,
		onUpdate: () => landingScene.camera.updateProjectionMatrix(),
	}, 3);

	landingSceneTimeline.to(landingScene.verticalBoxes.map(box => box.position), {
		x: (i, target) => target.x + 200 * (i + 1), // box1 +300, box2 +600, box3 +900
		z:1200,
		ease: 'power3.out',
		duration: 1,
	}, 2);

	landingSceneTimeline.to(landingScene.box4.scale, {
		x: 0,
		y: 0,
		z: 0,
		ease: 'power3.out',
		duration: .5,
	}, 2);

	// Phase 4
	const floorMorph = { t: 0 };
	let verticalBoxesShadowsHidden = false;
	// Ambient light lifts from its base 0.25 to 1 only in the final stretch of
	// the morph, flattening out the directional light's shadow on the sphere
	// without having to fight the shadow-casting geometry directly. Stays flat
	// at the base intensity until t crosses ambientRampStart, then ramps to
	// full by ambientRampEnd (rather than ramping across the whole 0-1 range),
	// so it visibly kicks in late instead of the moment the morph begins.
	const ambientStartIntensity = landingScene.ambientLight.intensity;
	const ambientEndIntensity = 1;
	const ambientRampStart = 0.99;
	const ambientRampEnd = 1;
	landingSceneTimeline.to(floorMorph, {
		t: 1,
		ease: 'power3.inOut',
		duration: 1,
		onUpdate: () => {
			landingScene.setFloorMorphAmount(floorMorph.t);

			const ambientT = THREE.MathUtils.clamp(
				(floorMorph.t - ambientRampStart) / (ambientRampEnd - ambientRampStart), 0, 1
			);
			landingScene.ambientLight.intensity = THREE.MathUtils.lerp(ambientStartIntensity, ambientEndIntensity, ambientT);

			// Toggled off exactly when the morph is fully complete (t hits 1), and
			// back on the instant scrolling reverses off of that (t drops below 1) -
			// not on onReverseComplete, which would wait until the morph fully
			// unwinds back to t=0 before restoring shadows.
			const shouldHide = floorMorph.t >= 1;
			if (shouldHide !== verticalBoxesShadowsHidden) {
				verticalBoxesShadowsHidden = shouldHide;
				landingScene.verticalBoxes.forEach(box => { box.castShadow = !shouldHide; });
			}
		},
	}, 3);

	// Same window as the morph above, so the floor reddens exactly as it
	// rounds into a sphere rather than before or after.
	const signalRed = new THREE.Color(PALETTE.signalRed);
	landingSceneTimeline.to(landingScene.floor.material.color, {
		r: signalRed.r,
		g: signalRed.g,
		b: signalRed.b,
		ease: 'power3.inOut',
		duration: 1,
	}, 3);

	// Phase 6 (5-8): the sphere rolls right but stops short of the third wall
	// (per the reference image, the ball never reaches it, so it stays whole).
	// Each hit wall's break is placed at the timeline position where the
	// sphere's x would line up with that wall's x, given the move below runs
	// x:0->sphereTravelDistance over exactly this 5-8 window - not a runtime
	// collision check, but since scrub timelines are just deterministic
	// position->progress mappings, lining the two up by math reads as a real
	// hit and stays scrubbable (and reversible) in both scroll directions.
	const sphereMoveStart = 5;
	const sphereMoveDuration = 1;
	const sphereTravelDistance = 260; // stops between wall 2 (220) and wall 3 (320) - wall 3 never gets hit
	landingSceneTimeline.to(landingScene.floor.position, {
		x: sphereTravelDistance,
		ease: 'none', // linear, so the wall-x -> timeline-time math below stays accurate
		duration: sphereMoveDuration,
	}, sphereMoveStart);

	// Break severity drops off per wall - first impact takes the hardest hit,
	// second is glancing, third entry is omitted entirely (never hit, stays intact).
	const breakSeverity = [1, 0.4];

	landingScene.walls.forEach((wall, i) => {
		const severity = breakSeverity[i];
		if (!severity) return; // third wall: sphere doesn't reach it, leave it standing

		const hitTime = sphereMoveStart + (wall.group.position.x / sphereTravelDistance) * sphereMoveDuration - .8;

		landingSceneTimeline.to(wall.topHalf.position, {
			y: `+=${220 * severity}`,
			x: `+=${40 * severity}`,
			ease: 'power2.out',
			duration: 0.3,
		}, hitTime);
		landingSceneTimeline.to(wall.topHalf.rotation, {
			z: 0.25 * severity,
			ease: 'power2.out',
			duration: 0.3,
		}, hitTime);

		landingSceneTimeline.to(wall.bottomHalf.position, {
			y: `-=${220 * severity}`,
			x: `-=${40 * severity}`,
			ease: 'power2.out',
			duration: 0.3,
		}, hitTime);
		landingSceneTimeline.to(wall.bottomHalf.rotation, {
			z: -0.25 * severity,
			ease: 'power2.out',
			duration: 0.3,
		}, hitTime);
	});

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


