import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type'

import { LoadingManager } from "three";
import LandingScene from "../scenes/landing-scene";
import SecondScene from '../scenes/second-scene';
import Lenis from 'lenis'
import { PALETTE } from '../materials/palette.js';
import { decodeFinalFrame, replaceImgWithCanvas } from './gifScrubber.js';


let activeScene = null;
let fps = 60;
const title = new SplitType(".split");
// Chapter two's headline/body split separately from '.split' above so its
// chars are excluded from loadingTL's page-load '.split .char' reveal -
// chapter two stays hidden until the scroll-driven reveal in onload() below.
const chapterTwoTitle = new SplitType(".split-reveal");
gsap.set('.split-reveal .char', { yPercent: 100 });
// Chapter three gets its own split class for the same reason - keeps its
// chars out of both the page-load '.split .char' reveal and chapter two's
// '.split-reveal .char' trigger, since it's triggered independently later.
const chapterThreeTitle = new SplitType(".split-reveal-three");
gsap.set('.split-reveal-three .char', { yPercent: 100 });

// SplitType measures line/word wrapping once at split time, so a viewport
// resize (or orientation change) that reflows the text leaves the old line
// groupings stale until the text is re-split against the new layout.
// Debounced so rapid resize events don't thrash the DOM - and, on mobile,
// so a scroll-driven address-bar collapse (which also fires `resize`) only
// triggers this once things settle, not every frame of the scroll.
let splitResizeTimeout;
window.addEventListener('resize', () => {
	clearTimeout(splitResizeTimeout);
	splitResizeTimeout = setTimeout(() => {
		title.split();
		// chapterTwoTitle/chapterThreeTitle deliberately aren't re-split here:
		// SplitType.split() tears down and recreates the .char elements, which
		// would orphan the GSAP tweens in chapterTwoTimeline/chapterThreeTimeline
		// (see onload() in this file) that are bound to the old nodes - those
		// tweens live for the whole session, unlike '.split .char' above which
		// only plays once at load and is never referenced again. The reveal
		// doesn't depend on line-wrap grouping, so skipping the re-split is safe.
		// Only scenes that opt in (LandingScene) define this. Deliberately not
		// done in the per-frame resizeToDisplaySize() below: that fires on every
		// canvas size change, which on mobile includes the address bar
		// collapsing/expanding mid-scroll - reassigning fov there would fight
		// the scroll-driven fov:12 tween in the landing timeline every frame.
		// Here it only runs once per settled resize, then ScrollTrigger.refresh()
		// (with invalidateOnRefresh: true on that timeline) re-captures the
		// tween's "from" value against the new fov and re-renders at the
		// current scroll progress, instead of racing it.
		if (activeScene && typeof activeScene.getResponsiveFov === 'function') {
			activeScene.camera.fov = activeScene.getResponsiveFov(activeScene.camera.aspect);
			activeScene.camera.updateProjectionMatrix();
		}
		ScrollTrigger.refresh();
	}, 200);
});

const loadingManager = new LoadingManager();
gsap.registerPlugin(ScrollTrigger);

// Loading gif - left as a normal autoplaying <img> (same as before, so it
// plays at its own steady authored pace with zero added latency) for the
// whole loading phase. Decoding its final frame happens quietly in the
// background in parallel so it's ready the moment loading finishes.
const loadingGifImg = document.getElementById('loadingHeadGif');
const finalGifFramePromise = decodeFinalFrame('./gifs/LoadingHead3.gif');

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

	// Freeze the gif exactly where it happens to be and dissolve into its
	// final frame over half a second, instead of cutting away mid-loop or
	// forcing it to visibly jump/skip ahead to the end.
	finalGifFramePromise.then((finalFrame) => {
		const frozen = document.createElement('canvas');
		frozen.width = finalFrame.width;
		frozen.height = finalFrame.height;
		frozen.getContext('2d').drawImage(loadingGifImg, 0, 0, frozen.width, frozen.height);

		const canvas = replaceImgWithCanvas(loadingGifImg, finalFrame.width, finalFrame.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(frozen, 0, 0);

		// Deferred one extra frame so gsap's ticker clock (driven by
		// requestAnimationFrame) is definitely fresh before the tween below
		// is created - otherwise, with lagSmoothing disabled for Lenis (see
		// gsap.ticker.lagSmoothing(0) above), a stale ticker timestamp can
		// make the tween's very first tick jump most of the way to
		// completion instead of animating smoothly.
		requestAnimationFrame(() => {
			const crossfade = { alpha: 0 };
			gsap.to(crossfade, {
				alpha: 1,
				duration: 0.5,
				ease: 'power2.inOut',
				onUpdate: () => {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(frozen, 0, 0);
					ctx.globalAlpha = crossfade.alpha;
					ctx.drawImage(finalFrame, 0, 0);
					ctx.globalAlpha = 1;
				},
				onComplete: () => {
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
				}
			});
		});
	});
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

// Extra "dead air" held in the scroll-scrubbed landing timeline right after a
// chapter's text reveal, before the scene resumes transforming - gives the
// reader scroll room so a fast scroll doesn't blow straight past newly
// revealed text. Expressed in the same position-units used throughout
// landingSceneTimeline (e.g. 1 == one original phase's width); bump this to
// give chapters more or less breathing room. The original phases ran at
// roughly innerHeight/3 px per unit (6ish units over the 2-viewport pin
// below), so that same rate is used here to pad the pin's scroll distance to
// match - otherwise the extra unit would just be squeezed out of the other
// phases' existing scroll budget instead of adding real room.
const CHAPTER_STOPPAGE = 1.5;
const CHAPTER_STOPPAGE_PX_PER_UNIT = 1 / 3;

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
		// original 4 phases keep their original px-per-unit scroll pace. A
		// further CHAPTER_STOPPAGE-driven pad is added on top so the chapter
		// reveal below gets genuine extra scroll room, not room borrowed from
		// later phases. Recomputed on resize since it reads window.innerHeight.
		end: () => '+=' + (window.innerHeight * 2 + window.innerHeight * CHAPTER_STOPPAGE_PX_PER_UNIT * CHAPTER_STOPPAGE),
		invalidateOnRefresh: true,
		scrub: 1, // lower scrub means the camera reacts more directly to scrolling
		markers: false
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
// The landing timeline is split into equal-length quarters via explicit
// start-time positions, so each scroll quarter drives one phase:
//   0-1  Phase 1: idle - free mouse-driven look (LandingScene.update() default)
//   1-2  Phase 2: camera dives from z:1500 to z:0 and tilts to look down.
//        Chapter two's text swap triggers partway through, at 1.7.
//   PHASE3_START (2 + CHAPTER_STOPPAGE) to +1:
//        Phase 3: sun swings low, camera flattens toward orthographic, the
//        vertical boxes slide out of frame, the horizontal box collapses
//        away. Held back past the original position 2 by CHAPTER_STOPPAGE so
//        the chapter reveal above has scroll room to finish before this starts.
//   PHASE3_START + 1 to +2: Phase 4: the floor morphs into a small sphere
function onload(){

	// Phase 2
	landingSceneTimeline.to(activeScene.camera.position, {
		z: 0,
		ease: 'power3.inOut',
		duration: 1,
	}, 1);

	// Chapter two's text swap fires at this timeline position - before z:0
	// lands at 2 and well before Phase 3 (pushed out to PHASE3_START below)
	// starts moving box4, so the reveal is fully resolved before anything
	// else in the scene moves.
	const CHAPTER_TWO_TRIGGER = 1.7;

	// Chapter one fades out gradually as the user scrolls through the dive -
	// scrubbed (tied to scroll position, like the rest of Phase 2) rather
	// than trigger-based, so it reads as a slow dissolve tracking the scroll
	// itself, fully gone right as CHAPTER_TWO_TRIGGER fires below.
	landingSceneTimeline.to('.landing-scene-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: CHAPTER_TWO_TRIGGER - 1,
	}, 1);

	// Chapter two slides in with the same char-stagger treatment as the
	// landing page-load intro (yPercent 100 -> 0, power1.inOut, stagger
	// .001), just slower. This runs as its own paused, fixed-duration
	// timeline rather than living inside the scrubbed landingSceneTimeline,
	// so the reveal always takes the same real time regardless of how fast
	// the user scrolls - .play()/.reverse() below just fire it, they don't
	// scrub it frame-by-frame with scroll position.
	const chapterTwoTimeline = gsap.timeline({ paused: true })
		.to('.chapter-two-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	// Scrolling back doesn't reverse the slide-in (chars sliding back down
	// would still be mid-animation by the time chapter one's scrubbed
	// fade-back-in catches up, since that one snaps in almost instantly on a
	// fast scroll-back). Instead it's just a quick opacity fade-out - once
	// that's done and invisible, the chars are silently reset to their
	// hidden yPercent:100 starting position (pause(0) rewinds the whole
	// reveal timeline) so the next forward trigger slides them in fresh.
	const CHAPTER_TWO_HIDE_DURATION = .2;

	// Fires once as the scrub crosses CHAPTER_TWO_TRIGGER in either direction
	// (GSAP timelines process crossed callbacks correctly even when scrub
	// jumps straight over them on a fast scroll) - triggers the reveal/hide
	// above rather than scrubbing it.
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			chapterTwoTimeline.play();
		} else {
			chapterTwoTimeline.pause();
			gsap.to('.chapter-two-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_TWO_HIDE_DURATION,
				onComplete: () => chapterTwoTimeline.pause(0),
			});
		}
	}, null, CHAPTER_TWO_TRIGGER);

	// Phase 3 - held back by CHAPTER_STOPPAGE past where it originally started
	// (position 2, i.e. right when the Phase 2 dive above lands on z:0) so the
	// chapter reveal has scroll room to breathe before the scene continues.
	const PHASE3_START = 2 + CHAPTER_STOPPAGE;

	landingSceneTimeline.to(activeScene.directionalLight.position, {
		x: 0,
		y:400,
		ease: 'power3.inOut',
		duration: 1,
	}, PHASE3_START);

	landingSceneTimeline.to(landingScene.camera, {
		fov: 12, // low FOV flattens perspective toward an orthographic look
		ease: 'power3.inOut',
		duration: 1,
		onUpdate: () => landingScene.camera.updateProjectionMatrix(),
	}, PHASE3_START + 1);

	landingSceneTimeline.to(landingScene.verticalBoxes.map(box => box.position), {
		x: (i, target) => target.x + 125 * (i + 1), // box1 +300, box2 +600, box3 +900
		z:1200,
		ease: 'power3.out',
		duration: 1,
	}, PHASE3_START);

	landingSceneTimeline.to(landingScene.box4.scale, {
		x: 0,
		y: 0,
		z: 0,
		ease: 'power3.out',
		duration: .5,
	}, PHASE3_START);

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
	}, PHASE3_START + 1);

	// Same window as the morph above, so the floor reddens exactly as it
	// rounds into a sphere rather than before or after.
	const signalRed = new THREE.Color(PALETTE.signalRed);
	landingSceneTimeline.to(landingScene.floor.material.color, {
		r: signalRed.r,
		g: signalRed.g,
		b: signalRed.b,
		ease: 'power3.inOut',
		duration: 1,
	}, PHASE3_START + 1);

	// Chapter two fades out over the same scrubbed window as the sphere morph
	// above, so "Perspective" dissolves in step with the floor rounding into a
	// sphere and is fully gone right as CHAPTER_THREE_TRIGGER fires below -
	// mirroring how chapter one fades out ahead of CHAPTER_TWO_TRIGGER.
	landingSceneTimeline.to('.chapter-two-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: 1,
	}, PHASE3_START + 1);

	// Chapter three appears right as the floor finishes morphing into a
	// sphere (the morph tween above ends at PHASE3_START + 2).
	const CHAPTER_THREE_TRIGGER = PHASE3_START + 2;

	const chapterThreeTimeline = gsap.timeline({ paused: true })
		.to('.chapter-three-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-three .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_THREE_HIDE_DURATION = .2;

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			chapterThreeTimeline.play();
		} else {
			chapterThreeTimeline.pause();
			gsap.to('.chapter-three-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_THREE_HIDE_DURATION,
				onComplete: () => chapterThreeTimeline.pause(0),
			});
		}
	}, null, CHAPTER_THREE_TRIGGER);

	// Phase 6 (5-8): the sphere rolls right but stops short of the third wall
	// (per the reference image, the ball never reaches it, so it stays whole).
	// Each hit wall's break is placed at the timeline position where the
	// sphere's x would line up with that wall's x, given the move below runs
	// x:0->sphereTravelDistance over exactly this 5-8 window - not a runtime
	// collision check, but since scrub timelines are just deterministic
	// position->progress mappings, lining the two up by math reads as a real
	// hit and stays scrubbable (and reversible) in both scroll directions.
	const sphereMoveStart = PHASE3_START + 3;
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


