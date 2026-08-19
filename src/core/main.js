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
// Same breathing-room gap as CHAPTER_STOPPAGE, held after the sphere finishes
// rolling and before chapter four's transition (fov/cube-morph/walls/orbit)
// begins - see PHASE4_START below. PHASE4_DURATION is that transition's own
// scrubbed length. Both need to be known up front (not just inside onload())
// since the scrollTrigger `end` below adds scroll room for them.
const CHAPTER_FOUR_STOPPAGE = 1.5;
// Bumped up from the original 1.5 once chapter four grew a second beat (cube
// growth/relocation into wall three's gap, that wall opening, the hidden
// grid reveal) stacked on top of the fov/cube-morph/wall-exit/orbit beats it
// already had - all of it still shares this one window, so it needed more
// scrubbed scroll room to stay readable rather than feeling rushed.
const PHASE4_DURATION = 2.5;

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
		end: () => '+=' + (window.innerHeight * 2 + window.innerHeight * CHAPTER_STOPPAGE_PX_PER_UNIT * (CHAPTER_STOPPAGE + CHAPTER_FOUR_STOPPAGE + PHASE4_DURATION)),
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
	let hiddenGridRevealed = false;
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

			// The hidden cube grid (chapter four's final beat) has no part in
			// chapters before this - stays invisible until the floor is fully a
			// sphere, then reveals right as chapter four's own beats take over,
			// rather than sitting in the scene (out of frame or not) the whole time.
			const shouldRevealGrid = floorMorph.t >= 1;
			if (shouldRevealGrid !== hiddenGridRevealed) {
				hiddenGridRevealed = shouldRevealGrid;
				landingScene.hiddenGrid.visible = shouldRevealGrid;
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
	// Portrait screens have almost no horizontal frame to roll the sphere
	// across (see LandingScene.createSplitWall), so the walls are laid out
	// along world Z there instead of world X, and the sphere drops through
	// them via floor.position.z instead of rolling into them via .x - over a
	// much shorter distance, matching the tighter portrait wall spacing.
	const rollAxis = landingScene.isPortrait ? 'z' : 'x';
	const sphereTravelDistance = landingScene.isPortrait ? 65 : 260; // stops just past wall 1, short of wall 2
	landingSceneTimeline.to(landingScene.floor.position, {
		[rollAxis]: sphereTravelDistance,
		ease: 'none', // linear, so the wall-position -> timeline-time math below stays accurate
		duration: sphereMoveDuration,
	}, sphereMoveStart);

	// Break severity drops off per wall - first impact takes the hardest hit,
	// second is glancing, third entry is omitted entirely (never hit, stays intact).
	const breakSeverity = [1, 0.4];
	// This kick is applied in the half's LOCAL y, which - via createSplitWall's
	// rotation - lands on world Z (screen-vertical) on desktop but world X
	// (screen-horizontal) on portrait. Desktop's vertical frame is ~+-197
	// world units at this camera distance, so a 220 kick landing there was
	// already about as far as it could go before running off-frame. Portrait's
	// horizontal frame is much narrower still (~+-80), so the same 220 kick
	// sent the broken halves flying well past the edges instead of just
	// cracking open in place - scaled down here to stay roughly in-frame.
	const breakKickDistance = landingScene.isPortrait ? 70 : 220;

	landingScene.walls.forEach((wall, i) => {
		const severity = breakSeverity[i];
		if (!severity) return; // third wall: sphere doesn't reach it, leave it standing

		const hitTime = sphereMoveStart + (wall.group.position[rollAxis] / sphereTravelDistance) * sphereMoveDuration - .8;

		landingSceneTimeline.to(wall.topHalf.position, {
			y: `+=${breakKickDistance * severity}`,
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
			y: `-=${breakKickDistance * severity}`,
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

	// Chapter 4 - held back by CHAPTER_FOUR_STOPPAGE past where the sphere
	// finishes rolling, same "give the reader scroll room" reasoning as
	// PHASE3_START's own gap above.
	const PHASE4_START = sphereMoveStart + sphereMoveDuration + CHAPTER_FOUR_STOPPAGE;

	// The chapter 0/1 vertical boxes (already slid off to the side back in
	// Phase 3) are fully removed from the scene once chapter four starts -
	// the camera's wide-open orbit below would otherwise bring them back
	// into view sitting in the distance. Re-added the instant scroll reverses
	// back past this point, same call+direction-check pattern used for the
	// chapter two/three text reveals above.
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			landingScene.verticalBoxes.forEach(box => landingScene.scene.remove(box));
		} else {
			landingScene.verticalBoxes.forEach(box => landingScene.scene.add(box));
		}
	}, null, PHASE4_START);

	// FOV grows back from the near-orthographic 12 to the scene's normal
	// responsive FOV, restoring real perspective depth for chapter four.
	landingSceneTimeline.to(landingScene.camera, {
		fov: landingScene.getResponsiveFov(landingScene.camera.aspect),
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
		onUpdate: () => landingScene.camera.updateProjectionMatrix(),
	}, PHASE4_START);
	

	// The red sphere morphs into a cube as one continuously-deforming mesh
	// (see LandingScene's morph-cube geometry) rather than two objects
	// crossfading - a separate sphere shrinking as an unrelated cube grew
	// read as two things swapping places, not one thing changing shape. The
	// swap from the floor (still sphere-shaped here) to the dedicated
	// morph-cube mesh is a plain visibility toggle - both are the same
	// sphere, same size, at this exact instant, so there's nothing to
	// crossfade.
	const wall3 = landingScene.walls[2];
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			landingScene.revealMorphCube();
		} else {
			landingScene.hideMorphCube();
		}
	}, null, PHASE4_START);

	// Sphere -> cube shape, then flat-shaded the instant it fully lands on
	// the cube (same reasoning as the old approach: smoothed vertex normals
	// read as a soft bevel right at the edges even though the geometry itself
	// is genuinely flat by then).
	const shapeMorph = { t: 0 };
	let cubeFlatShadingActive = false;
	landingSceneTimeline.to(shapeMorph, {
		t: 1,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
		onUpdate: () => {
			landingScene.setMorphCubeAmount(shapeMorph.t);
			const shouldBeFlat = shapeMorph.t >= 1;
			if (shouldBeFlat !== cubeFlatShadingActive) {
				cubeFlatShadingActive = shouldBeFlat;
				landingScene.cube.material.flatShading = shouldBeFlat;
				landingScene.cube.material.needsUpdate = true;
			}
		},
	}, PHASE4_START);

	// The hero cube stays at its own base size - already an exact match for
	// the hidden grid's current tile size (cubeBaseSize:40 == gridTileSize:100
	// * wall three's own resting scale:0.4), so nothing needs to grow here.
	// Wall three's halves shrink their height down to that same size instead
	// (below), so all three end up identical: 2 black, 1 red.
	const heroCubeSize = landingScene.cubeBaseSize;

	// Wall three's halves shrink in height down to heroCubeSize - their
	// width/depth already sit at that size at rest on desktop (halfGeom's 100
	// units * createSplitWall's 0.4 scale = 40), so only height needs to move
	// to turn each half into a cube matching the hero cube and the hidden
	// grid's own tiles exactly. Portrait's own rest scale is (0.4, 1, 0.25)
	// though - its Z isn't at that size at rest, so X/Z both animate to
	// landingScene.gridToCubeScale explicitly too rather than assuming
	// desktop's "already there". A no-op on desktop, where they're at that
	// value already. The grid itself is left untouched - it's already at the
	// size everything else is shrinking/staying to meet.
	const wall3ShrinkScaleY = heroCubeSize / landingScene.cubeModuleSize; // cubeModuleSize == WALL_HALF_HEIGHT
	landingSceneTimeline.to(wall3.group.scale, {
		x: landingScene.gridToCubeScale,
		y: wall3ShrinkScaleY,
		z: landingScene.gridToCubeScale,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// The cube detaches from the sphere's resting spot and slides over to
	// wall three's gap - captured with the same threshold-latch pattern as
	// the camera orbit below (rather than a plain .to() on cube.position)
	// because a scrubbed .to() would freeze its "from" at cube.position's
	// value when this timeline was first built (page load), not at wherever
	// the sphere actually ends up after Phase 6's roll.
	const cubeMove = { t: 0 };
	let cubeMoveActive = false;
	let cubeMoveFrom = null;
	landingSceneTimeline.to(cubeMove, {
		t: 1,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
		onUpdate: () => {
			const shouldBeActive = cubeMove.t > 0;
			if (shouldBeActive !== cubeMoveActive) {
				cubeMoveActive = shouldBeActive;
				if (shouldBeActive) {
					cubeMoveFrom = landingScene.floor.position.clone();
				}
			}
			if (!cubeMoveActive) {
				landingScene.cube.position.copy(landingScene.floor.position);
				return;
			}
			landingScene.cube.position.lerpVectors(cubeMoveFrom, wall3.group.position, cubeMove.t);
		},
	}, PHASE4_START);

	// Wall three (never hit by the sphere, still standing) opens to make room
	// for the cube arriving in its gap - a plain slide-apart rather than the
	// dramatic kick+rotation the two hit walls got, since this one isn't
	// breaking, just making way. Sized so each half ends up exactly one
	// landingScene.gridWorldSpacing from the cube (not just clear of it) -
	// createSplitWall's own rotation.x turns this local-Y opening into a
	// world-Z separation, which is the same axis the hidden grid's own
	// columns are spaced along, so the opened halves land squarely on the
	// grid's own column slots either side of the cube's, reading as a
	// continuation of the grid's rhythm rather than an ad-hoc gap. This
	// offset is applied in the half's LOCAL space, which wall3.group.scale.y
	// above is simultaneously shrinking down to wall3ShrinkScaleY - so it has
	// to be inflated by 1/wall3ShrinkScaleY up front to still land on that
	// real-world spacing once the shrink has crushed it back down.
	const wall3OpenGap = landingScene.gridWorldSpacing / wall3ShrinkScaleY - landingScene.cubeModuleSize / 2;
	landingSceneTimeline.to(wall3.topHalf.position, {
		y: `+=${wall3OpenGap}`,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);
	landingSceneTimeline.to(wall3.bottomHalf.position, {
		y: `-=${wall3OpenGap}`,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// The two walls that already broke open join the grid too, instead of
	// flying off and clearing the frame - each shrinks into cube-tiles the
	// same way wall three did above, and slides over to share wall three's
	// own position on the grid's column axis (the same column the cube lands
	// in), rather than forming separate columns of their own. Height is
	// where they differ: wall three's own halves already claim the row
	// immediately above/below the cube (+-1 gridWorldSpacing); these two
	// walls' four halves each claim one of the four rows further out still
	// (+-2 and +-3 spacings), so all four plus wall three's own three fill
	// every row in that column - a complete 7-row column matching the grid's
	// own height. Wall two (index 1, the nearer/less-broken wall) takes the
	// rows adjacent to wall three's own (+-2); wall one (index 0, the
	// farther/harder-hit wall) takes the outermost rows (+-3).
	//
	// The column axis itself flips with LandingScene's own portrait/desktop
	// rotation branch (see hiddenGrid's setup): desktop's columns land on
	// world X, portrait's on world Z - matching wall three's group.position
	// on whichever axis that is keeps this wall sliding to the right column
	// instead of onto wall three's own row axis.
	const brokenWallRowSteps = [3, 2];
	const columnMatchAxis = landingScene.isPortrait ? 'z' : 'x';
	landingScene.walls.forEach((wall, i) => {
		const severity = breakSeverity[i];
		if (!severity) return; // third wall was never hit, handled above

		landingSceneTimeline.to(wall.group.scale, {
			x: landingScene.gridToCubeScale,
			y: wall3ShrinkScaleY,
			z: landingScene.gridToCubeScale,
			ease: 'power3.inOut',
			duration: PHASE4_DURATION,
		}, PHASE4_START);
		landingSceneTimeline.to(wall.group.position, {
			[columnMatchAxis]: wall3.group.position[columnMatchAxis],
			ease: 'power3.inOut',
			duration: PHASE4_DURATION,
		}, PHASE4_START);

		// Straightens the break's kick and tilt back out: position returns to
		// an absolute target (not relative - these halves are animating back
		// from wherever the break's kick left them, not from their original
		// rest position) sized the same way wall3OpenGap sizes wall three's
		// own halves, but stepped out by this wall's own row count instead of
		// 1, landing it in its own dedicated row. rotation.z (the break's
		// tilt) unwinds back to 0 so each half reads as a flat, upright tile.
		const rowSteps = brokenWallRowSteps[i];
		const rowOffset = (rowSteps * landingScene.gridWorldSpacing) / wall3ShrinkScaleY;
		landingSceneTimeline.to(wall.topHalf.position, {
			x: 0,
			y: rowOffset,
			ease: 'power3.inOut',
			duration: PHASE4_DURATION,
		}, PHASE4_START);
		landingSceneTimeline.to(wall.topHalf.rotation, {
			z: 0,
			ease: 'power3.inOut',
			duration: PHASE4_DURATION,
		}, PHASE4_START);
		landingSceneTimeline.to(wall.bottomHalf.position, {
			x: 0,
			y: -rowOffset,
			ease: 'power3.inOut',
			duration: PHASE4_DURATION,
		}, PHASE4_START);
		landingSceneTimeline.to(wall.bottomHalf.rotation, {
			z: 0,
			ease: 'power3.inOut',
			duration: PHASE4_DURATION,
		}, PHASE4_START);
	});

	// Camera dollies straight forward along whatever direction it's already
	// facing - a plain push, not an orbit or pan, so the grid/hero-cube read
	// closer and larger without any change in viewing angle. Direction and
	// distance are both captured live the instant this phase activates (not
	// fixed constants), same "no jump at the handoff" reasoning as the rest
	// of this timeline's threshold-latched tweens: this is exactly the idle
	// look's own forward vector, and the distance closed is a fraction of
	// however far the camera actually was from the subject at that moment,
	// so it scales correctly whether that's desktop's or portrait's own
	// idle-look height instead of assuming a fixed one.
	// update()'s idle mouse-look would otherwise fight this every frame (it
	// lerps camera position back toward its own idle target), so it's locked
	// via landingScene.lockIdleLook for the duration.
	const dollyForwardFactor = .6;
	const dolly = { t: 0 };
	let dollyActive = false;
	const dollyStartPosition = new THREE.Vector3();
	const dollyDirection = new THREE.Vector3();
	let dollyDistance = 0;
	landingSceneTimeline.to(dolly, {
		t: 1,
		ease: 'power2.inOut',
		duration: PHASE4_DURATION,
		onUpdate: () => {
			const shouldBeActive = dolly.t > 0;
			if (shouldBeActive !== dollyActive) {
				dollyActive = shouldBeActive;
				landingScene.lockIdleLook = shouldBeActive;
				if (shouldBeActive) {
					dollyStartPosition.copy(landingScene.camera.position);
					landingScene.camera.getWorldDirection(dollyDirection);
					dollyDistance = dollyStartPosition.distanceTo(landingScene.lookAtTarget) * dollyForwardFactor;
				}
			}
			if (!dollyActive) return;

			landingScene.camera.position
				.copy(dollyStartPosition)
				.addScaledVector(dollyDirection, dollyDistance * dolly.t);
		},
	}, PHASE4_START);

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


