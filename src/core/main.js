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
// Chapter four gets its own split class for the same reason as chapter
// three above - kept out of every earlier chapter's char reveal, since it's
// triggered independently once chapter four's own animation finishes.
const chapterFourTitle = new SplitType(".split-reveal-four");
gsap.set('.split-reveal-four .char', { yPercent: 100 });
// Chapter five gets its own split class for the same reason as chapters
// three/four above - kept out of every earlier chapter's char reveal, since
// it's triggered independently once chapter five's own camera move finishes.
const chapterFiveTitle = new SplitType(".split-reveal-five");
gsap.set('.split-reveal-five .char', { yPercent: 100 });

// SplitType measures line/word wrapping once at split time, so a viewport
// resize (or orientation change) that reflows the text leaves the old line
// groupings stale until the text is re-split against the new layout.
// Debounced so rapid resize events don't thrash the DOM - and, on mobile,
// so a scroll-driven address-bar collapse (which also fires `resize`) only
// triggers this once things settle, not every frame of the scroll.
let splitResizeTimeout;
// Same mobile-address-bar guard as ScrollTrigger.config's ignoreMobileResize
// above, but for this listener's own explicit ScrollTrigger.refresh() call
// below, which that config option doesn't cover - a height-only resize
// (width unchanged) is assumed to be the address bar, not a real layout
// change, and skipped so it can't yank the timeline mid-scroll.
let lastResizeWidth = window.innerWidth;
window.addEventListener('resize', () => {
	if (window.innerWidth === lastResizeWidth) return;
	lastResizeWidth = window.innerWidth;
	clearTimeout(splitResizeTimeout);
	splitResizeTimeout = setTimeout(() => {
		title.split();
		// chapterTwoTitle/chapterThreeTitle/chapterFourTitle deliberately aren't
		// re-split here: SplitType.split() tears down and recreates the .char
		// elements, which would orphan the GSAP tweens in
		// chapterTwoTimeline/chapterThreeTimeline/chapterFourTimeline
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
// Mobile browsers fire `resize` when the address bar collapses/expands
// during scroll (height changes, width doesn't) - without this,
// ScrollTrigger's own internal refresh-on-resize would recalculate the
// landing timeline's pinned start/end against the new window.innerHeight
// mid-scroll (its `end` above reads window.innerHeight, and
// invalidateOnRefresh:true is set on it), remapping scroll position to a
// different timeline progress and yanking every scroll-driven tween
// (camera included) to wherever that new progress lands - read as a sudden
// camera jump, most commonly hit scrolling back up (which is exactly when
// the address bar reappears). This only covers ScrollTrigger's own
// resize listener - the app's own listener below needs the same guard.
ScrollTrigger.config({ ignoreMobileResize: true });

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
// Also doubles as the hold once Phase 2's camera dive lands on z:0 (see
// onload() below) - the dive itself only eats the first 2 of these units,
// leaving the rest as a genuine stop before Phase 3 resumes moving anything.
const CHAPTER_STOPPAGE = 2.5;
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
// Shared by the sphere's own roll into the walls (Phase 6) and the hero
// cube's post-chapter-four roll (Phase 5 extension) below - both read as the
// same "roll" beat, so they share one scrubbed length. Declared up here
// (not inside onload()) for the same reason as PHASE4_DURATION above: the
// scrollTrigger `end` needs it before onload() ever runs.
const sphereMoveDuration = 1;
// Small pause after the hero cube's final post-orbit roll (Phase 5 extension,
// see PHASE5_START below) finishes and before chapter five's own camera move
// begins - shorter than CHAPTER_FOUR_STOPPAGE since chapter four's text is
// already up and settled by this point, so this only needs to be a brief
// breath before the camera starts moving again, not a full reveal pause.
const CHAPTER_FIVE_STOPPAGE = 1;
// Scrubbed length of chapter five's own camera move: the fov lerp back down
// to 12 and the orbit continuing its sweep/tilt from where chapter four's
// orbit left it (see PHASE6_START below). Declared up here for the same
// reason as PHASE4_DURATION above - the scrollTrigger `end` needs it before
// onload() ever runs.
const CHAPTER_FIVE_DURATION = 1.5;
// Trailing scroll room held past chapter five's own reveal trigger (see
// CHAPTER_FIVE_TRIGGER in onload() below) - without this, that trigger sits
// at the exact end of the timeline (chapter five being the last chapter,
// nothing scrubs after it), and a GSAP .call() positioned exactly at a
// timeline's own end never gets a genuine "crossing" to fire its reverse
// branch when scrolling back from the very end: the playhead starts already
// sitting on top of it instead of arriving from past it. This tail gives
// scrolling back something real to cross through.
const CHAPTER_FIVE_TAIL = 0.5;

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
		end: () => '+=' + (window.innerHeight * 2 + window.innerHeight * CHAPTER_STOPPAGE_PX_PER_UNIT * (CHAPTER_STOPPAGE + CHAPTER_FOUR_STOPPAGE + PHASE4_DURATION + sphereMoveDuration + CHAPTER_FIVE_STOPPAGE + CHAPTER_FIVE_DURATION + CHAPTER_FIVE_TAIL)),
		invalidateOnRefresh: true,
		scrub: 1, // lower scrub means the camera reacts more directly to scrolling
		markers: false
	}
})
window.__debug = { ScrollTrigger, landingScene, landingSceneTimeline, activeScene: () => activeScene, gsap };

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
//   1-3  Phase 2: camera dives from z:1500 to z:0 and tilts to look down.
//        Stretched to a 2-unit duration (rather than matching the other
//        phases' 1-unit width) so the dive reads as a slow descent instead of
//        a fast drop - it borrows into the CHAPTER_STOPPAGE gap below, which
//        was sitting idle over that same span anyway (nothing else runs
//        there until PHASE3_START), so this doesn't cost any extra scroll
//        budget. Chapter two's text swap triggers partway through, at 1.7.
//   3 to PHASE3_START (2 + CHAPTER_STOPPAGE): a genuine held stop once the
//        dive lands on z:0 - the camera sits still here (not just settling
//        into place) before Phase 3 picks the scene back up.
//   PHASE3_START to +1:
//        Phase 3: sun swings low, camera flattens toward orthographic, the
//        vertical boxes slide out of frame, the horizontal box collapses
//        away. Held back past the original position 2 by CHAPTER_STOPPAGE so
//        the chapter reveal above (and now the z:0 stop above) has scroll
//        room to finish before this starts.
//   PHASE3_START + 1 to +2: Phase 4: the floor morphs into a small sphere
function onload(){

	// Phase 2 - a 2-unit duration (not the usual 1) so the dive to z:0 reads
	// as a slow, controlled descent rather than a fast drop. See the phase
	// table above for why this doesn't need any extra scroll budget.
	landingSceneTimeline.to(activeScene.camera.position, {
		z: 0,
		ease: 'power3.inOut',
		duration: 2,
	}, 1);

	// Chapter two's text swap fires at this timeline position - while the
	// dive above is still settling toward z:0 (which now lands at 3) but
	// well before Phase 3 (pushed out to PHASE3_START below) starts moving
	// box4, so the reveal is fully resolved before anything else in the
	// scene moves.
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

	// Explicit fromTo (not a plain .to()) so this doesn't depend on GSAP's
	// implicit "from" - a plain .to() lazily captures its start value from
	// whatever directionalLight.position currently holds the first time it
	// renders, which invalidateOnRefresh (see this timeline's ScrollTrigger
	// config) can force to happen again later, against whatever chapter
	// four's own light orbit (further down in this function) last left the
	// light at instead of its true original spot - the light would then
	// reverse back toward that wrong, rotated position through chapters 3/2/1
	// instead of its real starting point. Pinning both ends explicitly (z
	// included, which this tween otherwise never touches and so would
	// otherwise silently inherit whatever the orbit left it at) removes that
	// dependency entirely.
	const directionalLightInitialPosition = activeScene.directionalLight.position.clone();
	landingSceneTimeline.fromTo(activeScene.directionalLight.position, {
		x: directionalLightInitialPosition.x,
		y: directionalLightInitialPosition.y,
		z: directionalLightInitialPosition.z,
	}, {
		x: 0,
		y: 400,
		z: directionalLightInitialPosition.z,
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
			// chapterTwoTimeline's reveal (and the scrubbed fade-out just above)
			// both run over roughly a real second - a fast enough scroll can
			// cross CHAPTER_TWO_TRIGGER and this trigger within less real time
			// than that, so chapterTwoTimeline can still be mid-reveal here,
			// fighting the fade-out tween over the same
			// '.chapter-two-description' opacity and reading as chapter two
			// and three's text overlapping. Snapping chapter two straight to
			// its fully-hidden end state first guarantees a clean handoff
			// into chapter three no matter how fast the scroll was.
			chapterTwoTimeline.pause(0);
			gsap.set('.chapter-two-description', { autoAlpha: 0 });
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

	// Fog thickens in as chapter four's wide orbit opens the view up. The
	// default fog (near:3500, far:5700) never actually kicks in anywhere in
	// this scene - everything from here through chapter five sits at most a
	// couple thousand units from the camera (the only thing ever big enough
	// to reach that band, the 10000-unit floor plane, has already morphed
	// into a small sphere and hidden itself by PHASE4_START, see
	// revealMorphCube). orbitStartOffset (captured above) is ~TARGET_Y_FINAL
	// (2500 desktop / 1700 portrait) at the start of this orbit and closes to
	// 0.28x that (~700/475) by its end, so near/far need to sit well inside
	// that couple-thousand-unit range to read as anything: near below the
	// orbit's closest approach so it's active for the whole chapter, far
	// close enough above the orbit's starting distance that the reveal
	// actually starts hazy and clears as the camera swoops in.
	landingSceneTimeline.to(landingScene.scene.fog, {
		near: 600,
		far: 2500,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
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

	// Ground shadow catcher (see LandingScene's own construction of it)
	// switches on right alongside the morph-cube reveal above - same
	// direction-checked one-shot toggle pattern as the rest of this
	// timeline's chapter four handoffs.
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			landingScene.shadowCatcher.visible = true;
		} else {
			landingScene.shadowCatcher.visible = false;
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

	// The hidden grid eases in from its extra-nudged starting position (see
	// LandingScene's own hiddenGridRestPosition) to its real resting spot,
	// over the same PHASE4_START/PHASE4_DURATION window as wall three's
	// growth and the camera orbit below - so it settles into place alongside
	// everything else, ending up at the exact same spot it always has by the
	// time chapter four's sequence finishes.
	landingSceneTimeline.to(landingScene.hiddenGrid.position, {
		x: landingScene.hiddenGridRestPosition.x,
		y: landingScene.hiddenGridRestPosition.y,
		z: landingScene.hiddenGridRestPosition.z,
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

	// Camera orbits while closing in, rather than a plain straight-ahead push
	// - a pure dolly changed apparent size only, competing with the FOV tween
	// above (which is also changing apparent size, in the opposite direction)
	// for no real payoff. Orbiting instead sweeps the viewing angle ~90
	// degrees around the vertical axis as it closes in, which reads as the
	// whole grid/cube arrangement rotating under the camera rather than a
	// digital zoom. That rotation matters here specifically because the
	// camera is looking almost straight down by this point in the sequence
	// (see update()'s tiltAngle, which has already rotated camera.up to
	// roughly (0,0,-1), making world Z the screen-vertical axis and world X
	// the screen-horizontal one) - the hero cube, which currently reads as
	// sitting beside the grid (the two differ along world X, today's
	// screen-horizontal axis), ends up reading as sitting below it instead
	// (differing along world Z, screen-vertical) once a quarter-turn has
	// swapped the axes' screen roles.
	// The pivot orbits around is NOT landingScene.lookAtTarget (the world
	// origin) - the grid/cube sit hundreds of units off-axis from there, so
	// swinging the camera around that distant a point swept the subject
	// wildly across the frame and off the edge. It's instead the midpoint
	// between the grid and the cube's landing spot (wall3's own position),
	// which keeps both comfortably framed through the whole turn. To still
	// avoid a snap at the handoff (the camera was looking at lookAtTarget the
	// instant before this phase locks idle-look off), the pivot itself lerps
	// from lookAtTarget to that midpoint over the same eased progress the
	// orbit/dolly uses, rather than jumping straight to it at t=0.
	// Start offset/up are captured live off the actual camera the instant
	// this phase activates (not fixed constants), same "no jump at the
	// handoff" reasoning as the rest of this timeline's threshold-latched
	// tweens, and the up vector orbits together with the position (instead
	// of staying fixed) so the roll stays consistent through the turn rather
	// than snapping - the same reason update()'s own tiltAngle rotates up in
	// step with the tilt instead of leaving it at a constant (0,1,0).
	// update()'s idle mouse-look would otherwise fight this every frame (it
	// lerps camera position back toward its own idle target), so it's locked
	// via landingScene.lockIdleLook for the duration.
	const orbitRadiusCloseFactor = .72; // fraction of the starting distance-to-pivot closed by the end
	const orbitAngle = -Math.PI / 2.5; // sweep direction - flip the sign if the grid ends up rotating the wrong way
	const orbitAxis = new THREE.Vector3(0, 1, 0);
	// The orbit above only changes azimuth (rotation around the vertical
	// axis), which keeps the camera at whatever elevation the idle look
	// happened to be at going in - a near-top-down angle by this point in
	// the scroll (see update()'s tiltAngle), so the end of the move read as
	// a flat, orthographic-looking grid instead of a dimensional one. This
	// tilts the camera down off that top-down angle, but only over the back
	// end of the move (from 60% progress) - layering it in earlier fought
	// the pivot recentering above and made the whole move read messy - so it
	// resolves into a 3/4 view with real depth (cube's side faces visible)
	// right as the orbit/dolly settle, rather than fighting them mid-swing.
	const orbitTiltAngle = THREE.MathUtils.degToRad(-45); // flip the sign if this tilts toward more top-down instead of less
	const orbitPivotEnd = new THREE.Vector3()
		.addVectors(landingScene.hiddenGrid.position, wall3.group.position)
		.multiplyScalar(0.5);
	const orbit = { t: 0 };
	let orbitActive = false;
	const orbitStartOffset = new THREE.Vector3();
	const orbitStartUp = new THREE.Vector3();
	const orbitPivot = new THREE.Vector3();
	const orbitOffset = new THREE.Vector3();
	const orbitUp = new THREE.Vector3();
	const orbitTiltAxis = new THREE.Vector3();
	// The directional light swings 90 degrees over the same span as the
	// camera orbit above, so the shadows the grid casts on the shadow
	// catcher (see LandingScene) visibly sweep around too rather than
	// staying static while everything else moves. lightStartOffset is
	// deliberately a fixed constant captured once, up front, from the
	// light's true initial position (before Phase 3's own x:0/y:400 tween on
	// directionalLight.position ever runs) - NOT live-captured the way the
	// camera's orbitStartOffset/orbitStartUp are. That means this orbit
	// always rotates from, and (scrolling back) resets straight to, the
	// light's original initial position rather than wherever Phase 3 last
	// left it - a deliberate hard reset right at the chapter 3/4 boundary
	// (matching the other one-shot resets that happen at PHASE4_START, like
	// the vertical boxes' removal and the hidden grid's reveal), not a bug -
	// so chapter four's end lighting stays exactly as tuned regardless of
	// what Phase 3 did to the light on the way in.
	const lightOrbitAngle = Math.PI / 2; // "to the right" - flip the sign if it swings the wrong way
	const lightTargetPosition = landingScene.directionalLight.target.position;
	const lightStartOffset = landingScene.directionalLight.position.clone().sub(lightTargetPosition);
	const lightOffset = new THREE.Vector3();
	landingSceneTimeline.to(orbit, {
		t: 1,
		ease: 'power2.inOut',
		duration: PHASE4_DURATION,
		onUpdate: () => {
			const shouldBeActive = orbit.t > 0;
			if (shouldBeActive !== orbitActive) {
				orbitActive = shouldBeActive;
				landingScene.lockIdleLook = shouldBeActive;
				if (shouldBeActive) {
					orbitStartOffset.copy(landingScene.camera.position).sub(landingScene.lookAtTarget);
					orbitStartUp.copy(landingScene.camera.up);
				}
			}
			if (!orbitActive) return;

			// Pivot reaches orbitPivotEnd well before the sweep/dolly finish
			// (by 40% progress, not 100%) - blending it in at the same rate as
			// the turn itself left the camera orbiting a point still close to
			// the distant lookAtTarget for most of the move, which swung the
			// actual off-to-the-side grid/cube through a much wider arc than
			// intended and carried it past the frame edges before the pivot
			// finally caught up near the very end. Position stays continuous
			// either way (it's built fresh from pivot/angle/radius every
			// frame, all of them smooth in orbit.t), so front-loading this is
			// just a path-shape choice, not a source of a jump.
			const pivotBlend = Math.min(orbit.t / 0.4, 1);
			orbitPivot.lerpVectors(landingScene.lookAtTarget, orbitPivotEnd, pivotBlend);
			const angle = orbitAngle * orbit.t;
			const radiusFactor = 1 - orbitRadiusCloseFactor * orbit.t;
			const tailBlend = Math.max(0, (orbit.t - 0.6) / 0.4);
			const tiltAmount = orbitTiltAngle * tailBlend;

			orbitOffset.copy(orbitStartOffset).applyAxisAngle(orbitAxis, angle);
			orbitUp.copy(orbitStartUp).applyAxisAngle(orbitAxis, angle);
			if (tiltAmount !== 0) {
				// Deriving this from orbitOffset (as an earlier version did)
				// was the actual bug behind "sometimes the grid rolls left,
				// sometimes right, sometimes there's no tilt at all": by this
				// point in the scroll the idle look's camera position sits
				// exactly above lookAtTarget (update()'s targetX/zFactor both
				// converge to exactly 0 here, not just approximately), so
				// orbitOffset is a purely vertical vector with zero
				// horizontal component - crossing it with the vertical
				// orbitAxis gave an exact (0,0,0), and normalizing that zero
				// vector left applyAxisAngle rotating around a meaningless
				// axis, which is either a no-op or genuinely undefined
				// depending on tiny floating-point residue, not real mouse
				// noise. orbitUp has no such degeneracy - it starts
				// genuinely horizontal ((0,~0,-1), see update()'s tiltAngle)
				// and is exactly what the sweep above actually rotates to
				// produce the "grid turning" look (since position stays
				// pinned directly over the pivot the whole time, the turn is
				// entirely the up vector rolling under lookAt) - so it's the
				// only live vector that reliably still has a real horizontal
				// component to build a tilt axis from.
				orbitTiltAxis.crossVectors(orbitAxis, orbitUp).normalize();
				orbitOffset.applyAxisAngle(orbitTiltAxis, tiltAmount);
				orbitUp.applyAxisAngle(orbitTiltAxis, tiltAmount);
			}

			landingScene.camera.position
				.copy(orbitOffset)
				.multiplyScalar(radiusFactor)
				.add(orbitPivot);
			landingScene.camera.up.copy(orbitUp);
			landingScene.camera.lookAt(orbitPivot);

			lightOffset.copy(lightStartOffset).applyAxisAngle(orbitAxis, lightOrbitAngle * orbit.t * 0.8);
			landingScene.directionalLight.position.copy(lightTargetPosition).add(lightOffset);

			// Shadow catcher fades in over the same span instead of popping
			// straight to full strength the instant it's toggled visible
			// (see main.js's earlier PHASE4_START call) - so the ground reads
			// as gradually settling in under the grid rather than snapping on.
			landingScene.shadowCatcher.material.opacity = orbit.t * 0.35;
		},
	}, PHASE4_START);

	// Phase 5 (extension) - once chapter four's transition settles, the hero
	// cube gets one final roll: dropping down a bit, rolling 50deg, and
	// growing to 1.5x, all over the same scrubbed length as the sphere's own
	// roll into the walls back in Phase 6 (sphereMoveDuration) so the two
	// "roll" beats read as the same gesture.
	const PHASE5_START = PHASE4_START + PHASE4_DURATION;
	const cubeDropDistance = heroCubeSize * 2; // "a bit" - half the cube's own size
	const cubeRollAngle = THREE.MathUtils.degToRad(50);

	landingSceneTimeline.to(landingScene.cube.position, {
		[rollAxis]: `-=${cubeDropDistance}`,
		ease: 'power2.inOut',
		duration: sphereMoveDuration,
	}, PHASE5_START);

	landingSceneTimeline.to(landingScene.cube.rotation, {
		y: `+=${cubeRollAngle}`,
		ease: 'power2.inOut',
		duration: sphereMoveDuration,
	}, PHASE5_START);

	landingSceneTimeline.to(landingScene.cube.scale, {
		x: 1.5,
		y: 1.5,
		z: 1.5,
		ease: 'power2.inOut',
		duration: sphereMoveDuration,
	}, PHASE5_START);

	// Chapter three fades out over the same scrubbed window as the camera
	// orbit above, so "Exploration" is fully gone by the time that orbit
	// settles at PHASE5_START - mirroring how chapter two fades out ahead of
	// CHAPTER_THREE_TRIGGER, just against the orbit instead of a roll.
	landingSceneTimeline.to('.chapter-three-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// Chapter four appears the instant the camera orbit above settles, right
	// before the hero cube's own final roll (just below) kicks off - not
	// after it, so the text is already up as that last beat plays out.
	const CHAPTER_FOUR_TRIGGER = PHASE5_START;

	const chapterFourTimeline = gsap.timeline({ paused: true })
		.to('.chapter-four-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-four .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_FOUR_HIDE_DURATION = .2;

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			chapterFourTimeline.play();
		} else {
			chapterFourTimeline.pause();
			gsap.to('.chapter-four-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_FOUR_HIDE_DURATION,
				onComplete: () => chapterFourTimeline.pause(0),
			});
		}
	}, null, CHAPTER_FOUR_TRIGGER);

	// Chapter 5 - held back by CHAPTER_FIVE_STOPPAGE past where the hero
	// cube's final roll (Phase 5 extension above) finishes, same "give the
	// reader scroll room" reasoning as PHASE3_START/PHASE4_START's own gaps.
	const PHASE6_START = PHASE5_START + sphereMoveDuration + CHAPTER_FIVE_STOPPAGE;

	// FOV lerps back down to the near-orthographic 12 it held earlier in
	// Phase 3, flattening the perspective again for chapter five's close.
	landingSceneTimeline.to(landingScene.camera, {
		fov: 12,
		ease: 'power3.inOut',
		duration: CHAPTER_FIVE_DURATION,
		onUpdate: () => landingScene.camera.updateProjectionMatrix(),
	}, PHASE6_START);

	// Fog pulls back out for chapter five's close - the orbit's own camera
	// lift (orbit2CameraLift, below) pushes the camera much farther from the
	// grid, so easing the fog back out too keeps the pulled-back finale
	// reading clearer than chapter four's thicker atmosphere, not hazier.
	landingSceneTimeline.to(landingScene.scene.fog, {
		near: 6000,
		far: 11000,
		ease: 'power2.inOut',
		duration: CHAPTER_FIVE_DURATION,
	}, PHASE6_START);

	// The orbit continues its sweep from exactly where chapter four's own
	// orbit (above) left off, rather than restarting from a fresh base -
	// orbitStartOffset/orbitStartUp are the same vectors chapter four's orbit
	// captured at its own start, so re-applying angle/tilt to them here picks
	// the motion back up seamlessly. Pivot and radius stay put at chapter
	// four's final values (orbitPivot already sits on orbitPivotEnd, and
	// orbit2RadiusFactor matches the first orbit's own t:1 radiusFactor) -
	// only angle and tilt keep moving, sweeping the remaining stretch from
	// orbitAngle to -Math.PI/2 while the tilt eases back out from
	// orbitTiltAngle to a flatter, more top-down 0.
	const orbit2AngleStart = orbitAngle;
	const orbit2AngleEnd = -Math.PI / 2;
	const orbit2TiltStart = orbitTiltAngle;
	const orbit2TiltEnd = 0;
	const orbit2RadiusFactor = 1 - orbitRadiusCloseFactor;
	// Extra world units the camera climbs straight up along Y on top of the
	// orbit/tilt above, so the grid pulls back and reads much smaller in
	// frame rather than just rotating in place - added directly to the
	// orbit's own computed position (not folded into orbitOffset/radiusFactor)
	// since it's a plain vertical pull-back, not part of the pivot-relative
	// sweep. Tune to taste.
	const orbit2CameraLift = 4000;
	const orbit2 = { t: 0 };
	landingSceneTimeline.to(orbit2, {
		t: 1,
		ease: 'power2.inOut',
		duration: CHAPTER_FIVE_DURATION,
		onUpdate: () => {
			const angle = THREE.MathUtils.lerp(orbit2AngleStart, orbit2AngleEnd, orbit2.t);
			const tiltAmount = THREE.MathUtils.lerp(orbit2TiltStart, orbit2TiltEnd, orbit2.t);

			orbitOffset.copy(orbitStartOffset).applyAxisAngle(orbitAxis, angle);
			orbitUp.copy(orbitStartUp).applyAxisAngle(orbitAxis, angle);
			// orbitUp is never degenerate here the way it could be at chapter
			// four's own orbit's t:0 (see that tween's own comment) - angle is
			// already offset by orbit2AngleStart (orbitAngle), so orbitUp
			// always carries a real horizontal component to build a tilt axis
			// from, no zero-vector guard needed.
			orbitTiltAxis.crossVectors(orbitAxis, orbitUp).normalize();
			orbitOffset.applyAxisAngle(orbitTiltAxis, tiltAmount);
			orbitUp.applyAxisAngle(orbitTiltAxis, tiltAmount);

			landingScene.camera.position
				.copy(orbitOffset)
				.multiplyScalar(orbit2RadiusFactor)
				.add(orbitPivot);
			landingScene.camera.position.y += orbit2CameraLift * orbit2.t;
			landingScene.camera.up.copy(orbitUp);
			landingScene.camera.lookAt(orbitPivot);
		},
	}, PHASE6_START);

	// The grid tiles, the three walls (now cube-tile rows themselves, see
	// chapter four above) and the hero cube all flatten into thin bars, read
	// nearly straight-down through the pull-back above - solid cubes
	// collapsing into a field of flat cards/lines rather than staying
	// volumetric as the camera recedes. This squashes local X: the
	// hiddenGrid/wall groups carry a rotation.x of PI/2 (see LandingScene's
	// init()/createSplitWall) that swaps their local Y onto world Z and
	// local Z onto world Y (straight up, invisible to this near-top-down
	// camera) but leaves local X alone, so it's the one axis that actually
	// reads as bar-width on screen from this angle.
	const chapterFiveSquash = 0.08; // fraction of a tile's native width the flattened bars shrink to
	// How much further apart (from the grid's own local center) each tile's
	// position spreads as it flattens, so the bars read as distinct marks
	// with real gaps rather than drawing together into a denser cluster. Split
	// per axis rather than one shared factor: local X is init()'s column
	// offset (col loop) and, per the squash comment above, is also the axis
	// that reads as screen-horizontal - kept close to native spacing (1, no
	// extra growth) so columns stay tight, while local Y (row offset, reads
	// as screen-vertical) still spreads further apart.
	const chapterFiveColumnSpacingGrowth = 1;
	const chapterFiveRowSpacingGrowth = 1.6;
	// Total time spread, across the whole squash, over which each
	// hiddenGrid instance's own flatten is staggered - see the per-instance
	// loop below.
	const chapterFiveStaggerSpan = CHAPTER_FIVE_DURATION * 0.5;

	// Each hiddenGrid instance gets its own small proxy tween (rather than
	// one tween driving the mesh's shared object-level scale, the way
	// chapter four's own grow/shrink tweens do) so both the stagger and the
	// spacing growth above can vary per-tile - group-level scale can't do
	// either, since it applies identically, and at the same instant, to
	// every instance at once. Position is scaled directly here too (instead
	// of being left to hiddenGrid's own group scale, which never changes
	// through this phase), so the spread-apart above can move independently
	// of the tiles' own shrinking width.
	const gridInstanceCount = landingScene.hiddenGridBasePositions.length;
	const gridInstanceDuration = CHAPTER_FIVE_DURATION - chapterFiveStaggerSpan;
	const gridSquashPosition = new THREE.Vector3();
	const gridSquashScale = new THREE.Vector3();
	const gridSquashQuaternion = new THREE.Quaternion(); // instances never rotate individually - stays identity
	const gridSquashMatrix = new THREE.Matrix4();
	landingScene.hiddenGridBasePositions.forEach((basePosition, i) => {
		// Staggered by index (construction's column-major col/row loop - see
		// LandingScene's init()), so the flatten sweeps across the grid
		// column by column rather than every tile moving in lockstep.
		const offset = gridInstanceCount > 1 ? (i / (gridInstanceCount - 1)) * chapterFiveStaggerSpan : 0;
		const proxy = { t: 0 };
		landingSceneTimeline.to(proxy, {
			t: 1,
			ease: 'power3.inOut',
			duration: gridInstanceDuration,
			onUpdate: () => {
				gridSquashPosition.set(
					basePosition.x * THREE.MathUtils.lerp(1, chapterFiveColumnSpacingGrowth, proxy.t),
					basePosition.y * THREE.MathUtils.lerp(1, chapterFiveRowSpacingGrowth, proxy.t),
					basePosition.z,
				);
				gridSquashScale.set(THREE.MathUtils.lerp(1, chapterFiveSquash, proxy.t), 1, 1);
				gridSquashMatrix.compose(gridSquashPosition, gridSquashQuaternion, gridSquashScale);
				landingScene.hiddenGrid.setMatrixAt(i, gridSquashMatrix);
				landingScene.hiddenGrid.instanceMatrix.needsUpdate = true;
			},
		}, PHASE6_START + offset);
	});

	// Rather than aligning the three walls' own flatten/spread with the
	// grid's own per-tile rhythm above (fiddly, given they're three separate
	// groups rather than one instanced set), they instead just collapse away
	// entirely - scaling each wall's group down to nothing on X, which
	// crushes its own geometry down to a flat plane. Scale alone isn't
	// enough to actually hide it, though: collapsing a single axis leaves a
	// plane, not a point, and whether that plane still reads as visible
	// depends entirely on how edge-on it happens to be to the camera at this
	// exact moment in the orbit - here it still faces the camera rather than
	// hiding edge-on to it, so it's backed by an explicit visibility toggle
	// below rather than counting on the collapse alone. Quicker than the
	// grid/cube's own squash (a fraction of CHAPTER_FIVE_DURATION) so the
	// walls are gone early, out of the way before the grid/cube's own
	// flatten finishes.
	const chapterFiveWallVanishDuration = CHAPTER_FIVE_DURATION * 0.2;
	landingScene.walls.forEach((wall) => {
		let wallHidden = false;
		landingSceneTimeline.to(wall.group.scale, {
			x: 0,
			ease: 'power2.in',
			duration: chapterFiveWallVanishDuration,
			onUpdate: () => {
				// Explicit visibility toggle (see comment above) rather than
				// trusting the collapsed scale alone to hide it - also drops
				// castShadow, so PCF shadow-map filtering can't smear a faint
				// shadow off the now-degenerate geometry either. Restored the
				// instant scale ticks back up on a reverse scroll.
				const shouldHide = wall.group.scale.x <= 0.001;
				if (shouldHide !== wallHidden) {
					wallHidden = shouldHide;
					wall.group.visible = !shouldHide;
					wall.topHalf.castShadow = !shouldHide;
					wall.bottomHalf.castShadow = !shouldHide;
				}
			},
		}, PHASE6_START);
	});

	// Hero cube flattens on the same local X, landing on the exact same
	// absolute world-unit thickness as the grid/wall tiles above rather than
	// just chapterFiveSquash's own fraction. Its own Phase 5 growth (scale
	// 1.5, see above) means it can't just reuse chapterFiveSquash directly
	// the way the grid tiles do (whose pre-squash scale, gridToCubeScale,
	// already nets out to exactly cubeBaseSize) - dividing by that same 1.5
	// here cancels Phase 5's growth back out first, so this also lands on
	// cubeBaseSize * chapterFiveSquash, matching the grid/wall tiles' own
	// final size instead of ending up 1.5x thicker than them.
	landingSceneTimeline.to(landingScene.cube.scale, {
		x: chapterFiveSquash / 1.5,
		ease: 'power3.inOut',
		duration: CHAPTER_FIVE_DURATION,
	}, PHASE6_START);

	// Chapter four fades out over the same window as chapter five's camera
	// move above, mirroring how each earlier chapter fades out ahead of the
	// next one's own trigger.
	landingSceneTimeline.to('.chapter-four-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: CHAPTER_FIVE_DURATION,
	}, PHASE6_START);

	// Chapter five appears once its own camera move above settles.
	const CHAPTER_FIVE_TRIGGER = PHASE6_START + CHAPTER_FIVE_DURATION;

	const chapterFiveTimeline = gsap.timeline({ paused: true })
		.to('.chapter-five-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-five .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_FIVE_HIDE_DURATION = .2;

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			chapterFiveTimeline.play();
		} else {
			chapterFiveTimeline.pause();
			gsap.to('.chapter-five-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_FIVE_HIDE_DURATION,
				onComplete: () => chapterFiveTimeline.pause(0),
			});
		}
	}, null, CHAPTER_FIVE_TRIGGER);

	// See CHAPTER_FIVE_TAIL's own comment above - this dummy tween is the
	// scroll room that constant reserves, keeping CHAPTER_FIVE_TRIGGER a
	// genuine interior point instead of the timeline's own last moment.
	landingSceneTimeline.to({}, { duration: CHAPTER_FIVE_TAIL }, CHAPTER_FIVE_TRIGGER);

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


