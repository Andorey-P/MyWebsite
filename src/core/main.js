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
	// World-axes gizmo widget (see LandingScene's addWorldAxesGizmo) drawn
	// on top, in its own small viewport.
	// ViewHelper.render() calls renderer.render() internally, which clears
	// the FULL canvas by default (autoClear only restricts what gets drawn,
	// not what gets cleared, and there's no scissor test around its own
	// setViewport) - without disabling autoClear just for this call, that
	// second render wipes the scene render just above it, leaving only the
	// gizmo's own small corner visible.
	if (activeScene.viewHelper) {
		const prevAutoClear = renderer.autoClear;
		renderer.autoClear = false;
		activeScene.viewHelper.render(renderer);
		renderer.autoClear = prevAutoClear;
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
// Small pause after chapter five's own row finishes assembling and its title
// reveals - same "give the reader scroll room" pattern as
// CHAPTER_STOPPAGE/CHAPTER_FOUR_STOPPAGE/CHAPTER_FIVE_STOPPAGE above - held
// before the hero cube tips over and starts the domino fall below (see
// DOMINO_FALL_START in onload()).
const DOMINO_FALL_STOPPAGE = 1;
// Scrubbed length of the domino fall's own scroll-driven cascade below -
// needs enough room that 43 pieces (hero cube + 42 grid tiles) toppling in a
// staggered wave still reads as individual events, not a blur. Declared up
// here for the same reason as PHASE4_DURATION above - the scrollTrigger
// `end` needs it before onload() ever runs.
const DOMINO_FALL_DURATION = 3;
// Chapter six opens with every fallen piece (hero cube + 42 grid tiles) -
// still lying where DOMINO_FALL_DURATION's topple above left them -
// scattering downward out of frame before chapter six's own content
// appears. Each piece gets its own randomized start offset within this span
// rather than DOMINO_FALL_DURATION's index-ordered wave, so the clearing
// reads as loose debris settling out of view, not another synced cascade.
// Declared up here for the same reason as DOMINO_FALL_DURATION above - the
// scrollTrigger `end` needs it before onload() ever runs.
const DOMINO_CLEAR_DURATION = 2;

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
		end: () => '+=' + (window.innerHeight * 2 + window.innerHeight * CHAPTER_STOPPAGE_PX_PER_UNIT * (CHAPTER_STOPPAGE + CHAPTER_FOUR_STOPPAGE + PHASE4_DURATION + sphereMoveDuration + CHAPTER_FIVE_STOPPAGE + CHAPTER_FIVE_DURATION + DOMINO_FALL_STOPPAGE + DOMINO_FALL_DURATION + CHAPTER_FIVE_TAIL + DOMINO_CLEAR_DURATION)),
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
			// Mirrors the forward branch's handoff above: leaving chapter three's
			// zone on a scroll-back re-enters chapter two's zone, but chapter two
			// only ever gets shown by a forward crossing of its own
			// CHAPTER_TWO_TRIGGER - if the scroll-back stops before reaching that
			// (still within chapter two's zone), that trigger never fires and
			// chapter two's text never reappears. Playing it here instead, right
			// as chapter three's zone is left, guarantees the zone the scroll
			// lands in always has its own text showing regardless of scroll speed.
			chapterTwoTimeline.play();
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

	// On top of the whole-group slide-in above, each individual tile starts
	// scattered out from the grid's own center and converges into its exact
	// resting slot (hiddenGridBasePositions, untouched) by the time this
	// window ends - loosely the reverse of chapter five's own per-tile move
	// into a row (see its domino* tweens below), and position-only: unlike
	// that later move, no scale change is layered on here, so a tile's own
	// size never changes, only how far its local position sits from the
	// grid's center.
	const gridAssembleSpreadGrowth = 2; // how many multiples of a tile's own base offset it starts scattered out to - tune to taste
	const gridAssembleStaggerSpan = PHASE4_DURATION * 0.5;
	const gridAssembleInstanceCount = landingScene.hiddenGridBasePositions.length;
	const gridAssembleInstanceDuration = PHASE4_DURATION - gridAssembleStaggerSpan;
	const gridAssemblePosition = new THREE.Vector3();
	const gridAssembleScale = new THREE.Vector3(1, 1, 1); // never touched - this pass is position-only
	const gridAssembleQuaternion = new THREE.Quaternion(); // instances never rotate individually - stays identity
	const gridAssembleMatrix = new THREE.Matrix4();
	landingScene.hiddenGridBasePositions.forEach((basePosition, i) => {
		// Same index-order stagger as chapter five's own per-tile tween below,
		// so both passes sweep across the grid the same way.
		const offset = gridAssembleInstanceCount > 1 ? (i / (gridAssembleInstanceCount - 1)) * gridAssembleStaggerSpan : 0;
		const proxy = { t: 0 };
		// Explicit fromTo (not a plain .to()) for the same reason as this
		// timeline's directionalLight tween above: a plain .to() lazily
		// captures its start value from whatever proxy.t currently holds the
		// first time it renders, and invalidateOnRefresh (this timeline's own
		// ScrollTrigger config) can force that capture to happen again later -
		// mid-scroll, on whatever partial t a refresh happens to land on -
		// instead of the tile's true starting (fully scattered) pose. That
		// showed up as a one-time pop to a wrong position on the very first
		// scroll through this section (refresh landing mid-transition, before
		// the timeline had ever settled) which then never recurred once the
		// bad "from" had already been baked in. Pinning t:0 explicitly removes
		// the dependency on lazy capture entirely.
		landingSceneTimeline.fromTo(proxy, {
			t: 0,
		}, {
			t: 1,
			ease: 'power3.inOut',
			duration: gridAssembleInstanceDuration,
			onUpdate: () => {
				gridAssemblePosition.set(
					THREE.MathUtils.lerp(basePosition.x * gridAssembleSpreadGrowth, basePosition.x, proxy.t),
					THREE.MathUtils.lerp(basePosition.y * gridAssembleSpreadGrowth, basePosition.y, proxy.t),
					basePosition.z,
				);
				gridAssembleMatrix.compose(gridAssemblePosition, gridAssembleQuaternion, gridAssembleScale);
				landingScene.hiddenGrid.setMatrixAt(i, gridAssembleMatrix);
				landingScene.hiddenGrid.instanceMatrix.needsUpdate = true;
			},
		}, PHASE4_START + offset);
	});

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
	const orbitRadiusCloseFactor = .65; // fraction of the starting distance-to-pivot closed by the end
	const orbitAngle = -Math.PI / 2; // sweep direction - flip the sign if the grid ends up rotating the wrong way
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
	const orbitTiltAngle = THREE.MathUtils.degToRad(0); // flip the sign if this tilts toward more top-down instead of less
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
	// The directional light swings over the same span as the camera orbit
	// above, so the shadows the grid casts on the shadow catcher (see
	// LandingScene) visibly sweep around too rather than staying static
	// while everything else moves. Both ends of that swing are fixed
	// constants computed once, up front, NOT live-captured the way the
	// camera's orbitStartOffset/orbitStartUp are:
	// - lightStartOffset is derived from where Phase 3's own x:0/y:400
	//   tween on directionalLight.position actually leaves the light (it
	//   holds there, untouched, through the rest of chapter three) - an
	//   earlier version derived it from the light's true pre-Phase-3
	//   position instead, which visibly snapped against what chapter three
	//   actually displays right at the chapter 3/4 boundary, in both
	//   scroll directions.
	// - lightEndOffset is still derived from that true pre-Phase-3 position
	//   (directionalLightInitialPosition, also fixed, see Phase 3 above)
	//   rotated by the originally-tuned lightOrbitAngle - preserving
	//   chapter four's tuned end-of-orbit lighting exactly as designed,
	//   regardless of where the start moved to above.
	// Position is lerped linearly between these two fixed offsets (rather
	// than rotated, as the camera orbit above is) since the two no longer
	// share a common radius/rotation relationship - a rotation formula
	// can't hit both a chapter-3-matching start and the pre-tuned end at
	// once, while a lerp guarantees both endpoints exactly. Only the
	// offset's direction from lightTargetPosition matters for a
	// directional light, so the straight-line (rather than arced) path
	// between them isn't visually meaningful.
	const lightOrbitAngle = Math.PI / 2; // "to the right" - flip the sign if it swings the wrong way
	const lightTargetPosition = landingScene.directionalLight.target.position;
	const chapterFourLightStartPosition = new THREE.Vector3(0, 400, directionalLightInitialPosition.z);
	const lightStartOffset = chapterFourLightStartPosition.clone().sub(lightTargetPosition);
	const lightEndOffset = directionalLightInitialPosition.clone()
		.sub(lightTargetPosition)
		.applyAxisAngle(orbitAxis, lightOrbitAngle * 0.8);
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

			lightOffset.lerpVectors(lightStartOffset, lightEndOffset, orbit.t);
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
			// Same fast-scroll handoff guard as CHAPTER_THREE_TRIGGER above -
			// without snapping chapter three straight to its hidden end state
			// first, a scroll fast enough to cross both triggers within less
			// real time than chapterThreeTimeline's own reveal/fade-out takes
			// leaves it still mid-animation here, fighting chapter four's
			// fade-in over the same window and reading as overlapping text.
			chapterThreeTimeline.pause(0);
			gsap.set('.chapter-three-description', { autoAlpha: 0 });
			chapterFourTimeline.play();
		} else {
			chapterFourTimeline.pause();
			gsap.to('.chapter-four-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_FOUR_HIDE_DURATION,
				onComplete: () => chapterFourTimeline.pause(0),
			});
			// Same re-entry guard as CHAPTER_THREE_TRIGGER's reverse branch above.
			chapterThreeTimeline.play();
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
	const orbit2CameraLift = 2000;
	// The domino row's own finished position has nothing to do with
	// orbitPivotEnd (roughly wall three/hiddenGrid's own spot, which is all
	// this pivot otherwise tracks) - the hero cube's slide plus every
	// tile's own spacing walks the whole assembly well off to one screen
	// side, and lower in frame than the pivot's own height, so framing on
	// the pivot alone left the row pinned low and off-center instead of
	// composed in the shot. This pans the pivot itself (which drags BOTH
	// the camera's orbit position and its lookAt target the same amount,
	// since both are built from it below - a true pan, not just a turn)
	// toward the row's actual center - ramped in via orbit2.t so it doesn't
	// jump at the chapter four/five boundary. Tune to taste; recenterUp is
	// deliberately well short of what would put the row at true screen
	// center - "up a little, not too much" per the brief.
	const chapterFiveRecenterRight = 200;
	const chapterFiveRecenterUp = -150;
	const chapterFiveScreenRight = new THREE.Vector3();
	const chapterFiveScreenUp = new THREE.Vector3();
	const orbit2Pivot = new THREE.Vector3();
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

			// One-frame-stale screen directions (last frame's camera matrix,
			// since this frame's position/lookAt haven't been set yet below) -
			// same trade-off the domino tiles' own dominoCameraRight makes,
			// and just as imperceptible here given how gradually orbit2 turns.
			landingScene.camera.updateMatrixWorld();
			chapterFiveScreenRight.setFromMatrixColumn(landingScene.camera.matrixWorld, 0).normalize();
			chapterFiveScreenUp.setFromMatrixColumn(landingScene.camera.matrixWorld, 1).normalize();
			orbit2Pivot.copy(orbitPivot)
				.addScaledVector(chapterFiveScreenRight, chapterFiveRecenterRight * orbit2.t)
				.addScaledVector(chapterFiveScreenUp, chapterFiveRecenterUp * orbit2.t);

			landingScene.camera.position
				.copy(orbitOffset)
				.multiplyScalar(orbit2RadiusFactor)
				.add(orbit2Pivot);
			landingScene.camera.position.y += orbit2CameraLift * orbit2.t;
			landingScene.camera.up.copy(orbitUp);
			landingScene.camera.lookAt(orbit2Pivot);

		},
	}, PHASE6_START);

	// The grid tiles and the hero cube no longer just flatten and spread in
	// place - they line up into a single row of thin, tall bars standing on
	// end, like a row of dominoes (see the reference poster). The hero cube
	// (below) leads the row after sliding left; each grid tile then falls
	// into line behind it, one by one, at the cube's own height.
	//
	// The row's own direction isn't a fixed world axis, though: chapter
	// four's own orbit above leaves the camera's pitch still drifting all the
	// way through chapter five (orbit2's own lift keeps rising while looking
	// at a fixed pivot, so its tilt keeps changing even though angle/tilt
	// themselves don't tween anywhere - confirmed empirically, an earlier
	// version of this pinned to a fixed world axis and it read as vertical
	// motion, not horizontal). So "screen-right" is derived straight from the
	// camera's own live matrixWorld each frame instead - a camera looking
	// down -Z with a given up has its local +X column pointing exactly at
	// screen-right in world space, whatever its current pitch happens to be.
	const dominoCameraRight = new THREE.Vector3();
	// hiddenGrid's own rotation.x/z (see LandingScene's init()) is fixed
	// through this whole phase, so its inverse only needs computing once -
	// pre-rotating a world direction (dominoCameraRight above) by this turns
	// it into the equivalent direction in the group's own local space, which
	// is what instance position actually needs (setMatrixAt works in local
	// space; the group's own transform is applied on top at render time).
	const dominoGroupQuaternionInverse = landingScene.hiddenGrid.quaternion.clone().invert();
	// Each tile keeps this orientation throughout - no per-instance rotation,
	// just position and scale (see the per-tile loop below), so this is
	// always the matrix's rotation component, not just a starting value.
	const dominoIdentityQuaternion = new THREE.Quaternion();
	const dominoSign = 1; // flip to -1 if the hero cube ends up on the row's own side instead of opposite it
	const dominoThickness = 0.2; // fraction of a tile's native width the bars shrink to on their thinned axes - tune to taste
	const dominoHeightScale = 3.5; // how many tiles' worth of length the bars stretch to - tune to taste
	// The grid's own native (pre hiddenGrid-scale) tile size - matches
	// LandingScene's own gridTileSize without needing a new export, since
	// cubeBaseSize is exactly gridTileSize*gridToCubeScale there. Also used
	// by the domino-fall hinge math further below.
	const gridTileSize = heroCubeSize / landingScene.gridToCubeScale;
	// Center-to-center spacing along the finished row, in the same local
	// space as hiddenGridBasePositions. Deliberately NOT the grid's own
	// original gridWorldSpacing - that rhythm was tuned for 6 columns, and 42
	// tiles spaced that far apart would sprawl roughly 7x wider than the grid
	// ever was. Instead scaled off the bars' own flattened width (not tied to
	// the original grid's own 1.4x width-to-spacing ratio - that shrank the
	// gap in lockstep with dominoThickness, packing the now-thinner bars in
	// too tight) via its own ratio, so the row reads as one continuous chain
	// with a clearly visible gap between each bar, independent of how thin
	// the bars themselves are.
	const dominoSpacingRatio = 2.6; // tune to taste
	const dominoSpacing = gridTileSize * dominoThickness * dominoSpacingRatio;

	// Hero cube leads the row: slides toward screen-left, a plain relative
	// offset from wherever it already is (not anchored to the grid the way
	// an earlier version had it - the row below now chases the cube's
	// height instead, so the cube's own motion can stay simple). Rotation
	// fully unwinds Phase 5's own 50deg roll (same y axis) so the cube ends
	// up dead straight rather than the full camera-billboard alignment an
	// earlier version used, which spun the cube through multiple axes at
	// once - a plain, single-axis turn reads as a much simpler motion. Any
	// leftover y-rotation here would read as an actual on-screen roll once
	// the near-top-down camera above has world x standing in for screen-up,
	// so this has to land on exactly 0, not just close to it.
	//
	// Scale is a plain axis-aligned tween for the same reason, but the tall
	// axis is x, not y: the cube only ever rotates about y here (this tween
	// plus Phase 5's own roll, both above), which leaves local y pinned to
	// world y regardless of angle - and world y is this near-top-down
	// camera's own view axis (confirmed empirically: camera.up read back as
	// (1,0,0), i.e. world x is screen-up here, not y), so stretching y reads
	// as the bar pointing into/out of the screen instead of standing upright
	// on it. x stays close to world x through this small a y-rotation (a
	// full quarter turn would mix it into world z instead), so it's what
	// actually reads as "tall, upright" on screen.
	const dominoCubeUnrollAngle = cubeRollAngle;
	const dominoSlideDistance = heroCubeSize * 6; // how far the hero cube travels to lead the row - tune to taste

	landingSceneTimeline.to(landingScene.cube.rotation, {
		y: `-=${dominoCubeUnrollAngle}`,
		ease: 'power3.inOut',
		duration: CHAPTER_FIVE_DURATION,
	}, PHASE6_START);

	landingSceneTimeline.to(landingScene.cube.scale, {
		x: dominoHeightScale,
		y: dominoThickness,
		z: dominoThickness,
		ease: 'power3.inOut',
		duration: CHAPTER_FIVE_DURATION,
	}, PHASE6_START);

	// Position still needs the live camera-right direction above (a fixed
	// world axis won't stay "screen-left" through this phase, same reasoning
	// as the row below), so it keeps the small proxy-tween pattern rather
	// than a plain gsap .to(). Runs before the grid tiles' own tween below
	// (added later to this same timeline) so their onUpdate can read this
	// frame's already-updated cube.position, not last frame's.
	const dominoCubeStart = new THREE.Vector3();
	let dominoCubeActive = false;
	const dominoCubeProxy = { t: 0 };
	landingSceneTimeline.to(dominoCubeProxy, {
		t: 1,
		ease: 'power3.inOut',
		duration: CHAPTER_FIVE_DURATION,
		onUpdate: () => {
			const shouldBeActive = dominoCubeProxy.t > 0;
			if (shouldBeActive !== dominoCubeActive) {
				dominoCubeActive = shouldBeActive;
				if (shouldBeActive) {
					dominoCubeStart.copy(landingScene.cube.position);
				}
			}
			if (!dominoCubeActive) return;

			landingScene.camera.updateMatrixWorld();
			dominoCameraRight.setFromMatrixColumn(landingScene.camera.matrixWorld, 0).normalize();
			landingScene.cube.position
				.copy(dominoCubeStart)
				.addScaledVector(dominoCameraRight, -dominoSlideDistance * dominoSign * dominoCubeProxy.t);
		},
	}, PHASE6_START);

	// Total time spread, across the whole row assembly, over which each
	// hiddenGrid instance's own move into line is staggered - see the
	// per-instance loop below.
	const chapterFiveStaggerSpan = CHAPTER_FIVE_DURATION * 0.5;

	// Each hiddenGrid instance gets its own small proxy tween (rather than
	// one tween driving the mesh's shared object-level scale, the way
	// chapter four's own grow/shrink tweens do) so both the stagger and each
	// tile's own row position/scale can vary per-instance - group-level scale
	// can't do either, since it applies identically, and at the same instant,
	// to every instance at once.
	const gridInstanceCount = landingScene.hiddenGridBasePositions.length;
	const gridInstanceDuration = CHAPTER_FIVE_DURATION - chapterFiveStaggerSpan;

	// The stagger below sweeps by rank in this order, not by raw index: the
	// bottom screen row goes first, right to left across it, then the sweep
	// moves up to the next screen row and repeats right to left - reversed
	// from init()'s own col-major construction order (which went left-to-
	// right across columns, top row first). Sorting on basePosition itself,
	// rather than reconstructing column/row indices from i, avoids needing
	// gridColumns/gridRows here at all. This only changes the ORDER tiles
	// fall into line, not where each one ends up (rowStep below still
	// follows the original index, so the finished row is unchanged).
	//
	// Confirmed empirically (screenshotting the sweep mid-transition):
	// hiddenGrid's rotation.x setup (see LandingScene's init()) lands local
	// row (basePosition.y) on the screen's horizontal axis and local column
	// (basePosition.x) on its vertical axis at this camera angle - the
	// opposite of the "column = across, row = up" naming basePosition's own
	// col/row loop uses for the wall it's built from. So each screen row is
	// a fixed local column - sorting on that (ascending, so the lowest/
	// bottommost column goes first) is the primary key, and within it,
	// local row descending sweeps right to left.
	const dominoSweepRank = new Array(gridInstanceCount);
	landingScene.hiddenGridBasePositions
		.map((_, i) => i)
		.sort((a, b) => {
			const posA = landingScene.hiddenGridBasePositions[a];
			const posB = landingScene.hiddenGridBasePositions[b];
			if (posA.x !== posB.x) return posA.x - posB.x; // column ascending: bottom screen row first
			return posB.y - posA.y; // row descending: screen right to left within that row
		})
		.forEach((originalIndex, rank) => {
			dominoSweepRank[originalIndex] = rank;
		});

	const dominoPosition = new THREE.Vector3();
	const dominoRowTarget = new THREE.Vector3();
	const dominoLocalFileDirection = new THREE.Vector3();
	const dominoLocalCubeOffset = new THREE.Vector3();
	const dominoRowBaseline = new THREE.Vector3();
	const dominoScale = new THREE.Vector3();
	const dominoMatrix = new THREE.Matrix4();
	landingScene.hiddenGridBasePositions.forEach((basePosition, i) => {
		// See dominoSweepRank above - this is this tile's place in the fall-
		// into-line sweep, not its raw construction index.
		const offset = gridInstanceCount > 1 ? (dominoSweepRank[i] / (gridInstanceCount - 1)) * chapterFiveStaggerSpan : 0;
		// Starts one spacing out from the cube (index 0 lands immediately
		// next to it, not on top of it) and counts up from there, rather than
		// centering the row the way init()'s own column offset did - the cube
		// leads, so the row should trail off to one side of it, not straddle
		// it symmetrically. Opposite sign from the cube's own slide above so
		// the two end up on opposite sides of that shared reference
		// direction, whichever way it actually points. Still keyed to the
		// original index (not dominoSweepRank), so the finished row's own
		// left-to-right order is untouched by the sweep-direction change.
		const rowStep = (i + 1) * dominoSign;
		const proxy = { t: 0 };
		// Runs all the way to the end of the phase, not just this tile's own
		// gridInstanceDuration - fallT below re-derives the tile's actual
		// (short, eased) fall-into-line progress from that longer span, so
		// this keeps calling onUpdate for the rest of chapter five even after
		// the tile has visually landed. That's necessary because the hero
		// cube's own slide and the camera's own orbit2 sweep both keep moving
		// for the full CHAPTER_FIVE_DURATION - an earlier version tied `t`
		// (and therefore the update callback's own lifetime) directly to
		// gridInstanceDuration, so once an early-ranked tile finished, GSAP
		// simply stopped calling its onUpdate, freezing that tile's row
		// position on wherever the cube and camera happened to be at that
		// (often well before the cube's slide actually finished) moment -
		// which is exactly what left a gap between the hero cube and the
		// row's own first tile once the cube kept sliding past it.
		const proxyDuration = CHAPTER_FIVE_DURATION - offset;
		const fallEase = gsap.parseEase('power3.inOut');
		landingSceneTimeline.to(proxy, {
			t: 1,
			ease: 'none',
			duration: proxyDuration,
			onUpdate: () => {
				const fallT = fallEase(Math.min(proxy.t * proxyDuration / gridInstanceDuration, 1));

				landingScene.camera.updateMatrixWorld();
				dominoCameraRight.setFromMatrixColumn(landingScene.camera.matrixWorld, 0).normalize();
				dominoLocalFileDirection.copy(dominoCameraRight).applyQuaternion(dominoGroupQuaternionInverse);

				// The row's own baseline tracks the hero cube's current
				// position outright (not just its across-the-file component,
				// projecting out how far it's actually slid - an earlier
				// version of this did that, which left the row starting from
				// the cube's pre-slide reference line while the cube itself
				// slid dominoSlideDistance away, opening a gap between the
				// two) - see dominoCubeStart/dominoSlideDistance above, which
				// now leave the cube free to end up anywhere. rowStep below
				// then only has to cover one tile's own spacing, not the
				// cube's slide too, so the row picks up right where the cube
				// leaves off.
				dominoLocalCubeOffset
					.copy(landingScene.cube.position)
					.sub(landingScene.hiddenGrid.position)
					.applyQuaternion(dominoGroupQuaternionInverse)
					.divideScalar(landingScene.gridToCubeScale);
				dominoRowBaseline.copy(dominoLocalCubeOffset);

				dominoRowTarget.copy(dominoLocalFileDirection).multiplyScalar(rowStep * dominoSpacing).add(dominoRowBaseline);
				dominoPosition.copy(basePosition).lerp(dominoRowTarget, fallT);

				// Tall axis is local X, not Z: confirmed against the world-axes
				// gizmo (see LandingScene's addWorldAxesGizmo) that the tiles
				// need to grow along world -X here, not world Y - hiddenGrid's
				// own fixed rotation.x (see LandingScene's init()) leaves local
				// X untouched (rotating about X doesn't move the X axis itself),
				// so growing local X here is what grows world X, with no
				// per-instance rotation needed to counteract the camera the way
				// an earlier, camera-billboarded version of this required.
				dominoScale.set(
					THREE.MathUtils.lerp(1, dominoHeightScale, fallT),
					THREE.MathUtils.lerp(1, dominoThickness, fallT),
					THREE.MathUtils.lerp(1, dominoThickness, fallT),
				);
				dominoMatrix.compose(dominoPosition, dominoIdentityQuaternion, dominoScale);
				landingScene.hiddenGrid.setMatrixAt(i, dominoMatrix);
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
	// grid/cube's own move into the row (a fraction of CHAPTER_FIVE_DURATION)
	// so the walls are gone early, out of the way before the domino row
	// finishes assembling.
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
			// Same fast-scroll handoff guard as CHAPTER_THREE_TRIGGER/
			// CHAPTER_FOUR_TRIGGER above.
			chapterFourTimeline.pause(0);
			gsap.set('.chapter-four-description', { autoAlpha: 0 });
			chapterFiveTimeline.play();
		} else {
			chapterFiveTimeline.pause();
			gsap.to('.chapter-five-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_FIVE_HIDE_DURATION,
				onComplete: () => chapterFiveTimeline.pause(0),
			});
			// Same re-entry guard as CHAPTER_THREE_TRIGGER/CHAPTER_FOUR_TRIGGER's
			// reverse branches above.
			chapterFourTimeline.play();
		}
	}, null, CHAPTER_FIVE_TRIGGER);

	// Chapter five's own close: once the row's had a moment to settle (and its
	// title's had a moment to read - DOMINO_FALL_STOPPAGE, same "give the
	// reader scroll room" pattern as every other chapter's own stoppage), the
	// hero cube leading the row tips over first, and the rest of the row
	// follows in order, one after another - the reference "domino effect"
	// pictogram.
	//
	// Nothing here needs live camera tracking the way every phase above did:
	// the whole rig (orbit2, the cube's own slide) is done moving by
	// CHAPTER_FIVE_TRIGGER, so the camera is simply fixed for the rest of the
	// timeline, and a fall built directly on fixed world/local axes is both
	// correct and far simpler than re-deriving screen-relative directions
	// every frame.
	//
	// The topple itself rotates about world Y. That reads as the standing
	// bar tipping from screen-vertical over to screen-horizontal precisely
	// because world Y is this camera's own near-top-down view axis: the
	// "tall" dimension the assembly loop above built is world X - a
	// HORIZONTAL world axis (see that loop's own tall-axis comment) that
	// only reads as "standing up" because this camera's up vector happens to
	// be world X, not because anything is actually standing up out of the
	// ground in true 3D. So there's no real gravity-driven hinge to
	// simulate here - rotating about the camera's own view axis (world Y) is
	// exactly the screen-space equivalent of "tip over and lie flat", which
	// is the only thing that has to read correctly.
	const DOMINO_FALL_START = CHAPTER_FIVE_TRIGGER + DOMINO_FALL_STOPPAGE;
	const dominoFallAngle = THREE.MathUtils.degToRad(-85); // negative reads as "falls to the right" on screen - flip the sign if a later tweak makes it read the other way
	const dominoFallWorldAxis = new THREE.Vector3(0, 1, 0);
	// hiddenGrid's own fixed rotation (dominoGroupQuaternionInverse, captured
	// above) turns that same world axis into the grid instances' own local
	// space, exactly like dominoLocalFileDirection did for position earlier.
	const dominoFallLocalAxis = dominoFallWorldAxis.clone().applyQuaternion(dominoGroupQuaternionInverse).normalize();
	// Each piece hinges at its own trailing edge (the -X end of its "tall"
	// axis) rather than rotating about its own center, so the fall reads as
	// toppling from a fixed base rather than spinning in place - same
	// reasoning a real domino's own base staying planted while its top
	// swings over.
	const dominoFallHingeAxis = new THREE.Vector3(1, 0, 0);

	// Small per-piece variance so the fallen row doesn't read as one
	// perfectly uniform, mechanically identical wave - real dominoes never
	// land quite parallel to their neighbors. Both the fall's own angle
	// (some land a touch short of, or past, "flat") and its axis (tilted a
	// little off the pure topple axis, so pieces don't all point the exact
	// same way once down) get a small random nudge, generated once per piece
	// at the moment it starts falling (see each capture block below) rather
	// than live, so it's a fixed per-piece "personality" instead of
	// jittering every frame.
	const dominoFallAngleVarianceMax = THREE.MathUtils.degToRad(8);
	const dominoFallAxisVarianceMax = 0.12; // small off-axis component before renormalizing - tune to taste
	const randomFallAngle = () => dominoFallAngle + (Math.random() * 2 - 1) * dominoFallAngleVarianceMax;
	// dominoFallWorldAxis/dominoFallLocalAxis are the topple axis in each
	// object's own space (world for the cube, local for the grid tiles) -
	// nudging it by a small random amount in the two directions
	// perpendicular to it, then renormalizing, tilts the axis itself a
	// little rather than just scaling the angle, so pieces don't all fall
	// toward the exact same compass heading either.
	const randomAxisVariance = (baseAxis, perpA, perpB) => baseAxis.clone()
		.addScaledVector(perpA, (Math.random() * 2 - 1) * dominoFallAxisVarianceMax)
		.addScaledVector(perpB, (Math.random() * 2 - 1) * dominoFallAxisVarianceMax)
		.normalize();
	// Perpendicular to dominoFallWorldAxis (world Y) - for the cube, which
	// works directly in world space.
	const worldAxisPerpA = new THREE.Vector3(1, 0, 0);
	const worldAxisPerpB = new THREE.Vector3(0, 0, 1);
	// Perpendicular to dominoFallLocalAxis (local -Z, world Y's own local
	// equivalent - see that axis's own comment above) - for the grid tiles,
	// which work in hiddenGrid's local space.
	const localAxisPerpA = new THREE.Vector3(1, 0, 0);
	const localAxisPerpB = new THREE.Vector3(0, 1, 0);

	// Hero cube first.
	const cubeFallHalfHeight = (heroCubeSize / 2) * dominoHeightScale;
	const cubeFallRestPosition = new THREE.Vector3();
	const cubeFallRestQuaternion = new THREE.Quaternion();
	const cubeFallHinge = new THREE.Vector3();
	const cubeFallOffset = new THREE.Vector3();
	const cubeFallDelta = new THREE.Quaternion();
	const cubeFallOwnAxis = new THREE.Vector3();
	let cubeFallOwnAngle = dominoFallAngle;
	let cubeFallCaptured = false;
	const cubeFallProxy = { t: 0 };

	// Grid tiles then follow, one by one in the row's own order (the same
	// index order rowStep already used above, so index 0 - right next to the
	// cube - falls first and the wave runs outward from there). Reading the
	// tile's CURRENT matrix (rather than recomputing the assembly's own
	// position formula again) keeps this in lockstep with whatever the
	// assembly loop above actually landed each tile on.
	const gridFallHalfHeight = (gridTileSize / 2) * dominoHeightScale;
	// Purely per-frame scratch (fully consumed within a single synchronous
	// onUpdate call, never read back on a later frame) - safe to share across
	// every tile's own tween, same as the assembly loop's own dominoPosition
	// etc. above.
	const gridFallOffset = new THREE.Vector3();
	const gridFallDelta = new THREE.Quaternion();
	const gridFallPosition = new THREE.Vector3();
	const gridFallQuaternion = new THREE.Quaternion();
	const gridFallMatrix = new THREE.Matrix4();

	// Every piece (cube + 42 tiles) shares one even cascade across
	// DOMINO_FALL_DURATION - k=0 is the cube, k=1..gridInstanceCount are the
	// tiles in row order - rather than the assembly loop's own two-tier
	// stagger/duration split, since there's no separate "settle" motion here
	// to budget for, just each piece's own quick tip.
	const dominoFallPieceCount = gridInstanceCount + 1;
	const dominoFallStaggerSpan = DOMINO_FALL_DURATION * 0.7;
	const dominoFallTipDuration = DOMINO_FALL_DURATION - dominoFallStaggerSpan;

	landingSceneTimeline.to(cubeFallProxy, {
		t: 1,
		ease: 'power2.inOut',
		duration: dominoFallTipDuration,
		onUpdate: () => {
			if (!cubeFallCaptured) {
				cubeFallCaptured = true;
				cubeFallRestPosition.copy(landingScene.cube.position);
				cubeFallRestQuaternion.copy(landingScene.cube.quaternion);
				cubeFallHinge.copy(cubeFallRestPosition).addScaledVector(dominoFallHingeAxis, -cubeFallHalfHeight);
				cubeFallOwnAngle = randomFallAngle();
				cubeFallOwnAxis.copy(randomAxisVariance(dominoFallWorldAxis, worldAxisPerpA, worldAxisPerpB));
			}
			cubeFallDelta.setFromAxisAngle(cubeFallOwnAxis, cubeFallOwnAngle * cubeFallProxy.t);
			cubeFallOffset.copy(cubeFallRestPosition).sub(cubeFallHinge).applyQuaternion(cubeFallDelta);
			landingScene.cube.position.copy(cubeFallHinge).add(cubeFallOffset);
			landingScene.cube.quaternion.copy(cubeFallDelta).multiply(cubeFallRestQuaternion);
		},
	}, DOMINO_FALL_START);

	landingScene.hiddenGridBasePositions.forEach((_, i) => {
		const offset = (i + 1) / (dominoFallPieceCount - 1) * dominoFallStaggerSpan;
		let captured = false;
		// Unlike the per-frame scratch above, these have to persist as this
		// specific tile's own rest state across every frame for the rest of
		// the fall, not just the one onUpdate call that captures them - each
		// tile needs its own (an earlier version shared one set across all
		// 42 tiles the way the per-frame scratch above safely does, but since
		// neighboring tiles' fall windows overlap in time, a later tile's own
		// capture clobbered an earlier tile's rest position mid-fall, which
		// is what was pulling tiles away from the hero cube's own landing
		// spot instead of continuing its line).
		const restPosition = new THREE.Vector3();
		const restQuaternion = new THREE.Quaternion();
		const scale = new THREE.Vector3();
		const hinge = new THREE.Vector3();
		const ownAxis = new THREE.Vector3();
		let ownAngle = dominoFallAngle;
		const proxy = { t: 0 };
		landingSceneTimeline.to(proxy, {
			t: 1,
			ease: 'power2.inOut',
			duration: dominoFallTipDuration,
			onUpdate: () => {
				if (!captured) {
					captured = true;
					landingScene.hiddenGrid.getMatrixAt(i, gridFallMatrix);
					gridFallMatrix.decompose(restPosition, restQuaternion, scale);
					hinge.copy(restPosition).addScaledVector(dominoFallHingeAxis, -gridFallHalfHeight);
					ownAngle = randomFallAngle();
					ownAxis.copy(randomAxisVariance(dominoFallLocalAxis, localAxisPerpA, localAxisPerpB));
				}
				gridFallDelta.setFromAxisAngle(ownAxis, ownAngle * proxy.t);
				gridFallOffset.copy(restPosition).sub(hinge).applyQuaternion(gridFallDelta);
				gridFallPosition.copy(hinge).add(gridFallOffset);
				gridFallQuaternion.copy(gridFallDelta).multiply(restQuaternion);
				gridFallMatrix.compose(gridFallPosition, gridFallQuaternion, scale);
				landingScene.hiddenGrid.setMatrixAt(i, gridFallMatrix);
				landingScene.hiddenGrid.instanceMatrix.needsUpdate = true;
			},
		}, DOMINO_FALL_START + offset);
	});

	// See CHAPTER_FIVE_TAIL's own comment above - this dummy tween is the
	// scroll room that constant reserves, giving the reader a beat after the
	// domino topple above before chapter six's own opening beat (the scatter
	// below) begins.
	landingSceneTimeline.to({}, { duration: CHAPTER_FIVE_TAIL }, DOMINO_FALL_START + DOMINO_FALL_DURATION);

	// Chapter six opens: every fallen piece (hero cube + 42 grid tiles),
	// still lying flat where the topple above left it, scatters downward out
	// of frame - disorganized rather than the topple's own ordered wave, so
	// this reads as debris clearing away rather than another choreographed
	// domino beat. Each piece independently randomizes its own start offset,
	// fall distance and spin, rather than sharing the topple's index-ordered
	// rowStep/dominoSweepRank.
	//
	// The camera is fixed for the whole rest of the timeline by this point
	// (see DOMINO_FALL's own comment above), so the "down" direction and the
	// spin axis only need deriving once, the first time any piece's own
	// onUpdate below actually runs - NOT here at setup time, since setup
	// runs synchronously on page load, before orbit2 has ever rendered a
	// frame. chapterFiveScreenUp is only live-correct once orbit2 has
	// actually run (it's mutated in place by orbit2's own onUpdate above);
	// cloning it here would freeze in its unset (0,0,0) starting value
	// instead of the camera-up direction it holds by the time this phase
	// plays.
	const DOMINO_CLEAR_START = DOMINO_FALL_START + DOMINO_FALL_DURATION + CHAPTER_FIVE_TAIL;

	// "Down" on screen is the negative of the camera's own local up axis in
	// world space - chapterFiveScreenUp holds exactly that once orbit2 has
	// run. Populated by dominoClearCaptureDirection() below, the first time
	// any piece's onUpdate actually fires past DOMINO_CLEAR_START.
	const dominoClearScreenDown = new THREE.Vector3();
	// hiddenGrid's own fixed rotation turns that same world direction into
	// the grid instances' own local space, exactly like dominoLocalFileDirection
	// did for the assembly loop's position math above.
	const dominoClearScreenDownLocal = new THREE.Vector3();
	let dominoClearDirectionCaptured = false;
	function dominoClearCaptureDirection() {
		if (dominoClearDirectionCaptured) return;
		dominoClearDirectionCaptured = true;
		dominoClearScreenDown.copy(chapterFiveScreenUp).negate();
		dominoClearScreenDownLocal.copy(dominoClearScreenDown).applyQuaternion(dominoGroupQuaternionInverse).normalize();
	}

	// Spin axis: same world-Y-reads-as-screen-plane-spin logic the topple's
	// own dominoFallWorldAxis/dominoFallLocalAxis used above (see that
	// comment) - world Y directly for the cube, hiddenGrid's local
	// equivalent for the grid tiles.
	const dominoClearWorldAxis = new THREE.Vector3(0, 1, 0);
	const dominoClearLocalAxis = dominoClearWorldAxis.clone().applyQuaternion(dominoGroupQuaternionInverse).normalize();

	// Fall distance, in world units, generous enough to carry even the
	// shortest-variance piece past the bottom edge of frame - tune to taste
	// against the actual camera framing at this point in the timeline.
	const dominoClearDistance = heroCubeSize * 60;
	const dominoClearDistanceVariance = 0.35; // +/- fraction of dominoClearDistance, randomized per piece
	// hiddenGrid's tiles work in local space, where distances read
	// gridToCubeScale times larger once hiddenGrid's own scale is applied -
	// same conversion gridTileSize above already relies on.
	const dominoClearDistanceLocal = dominoClearDistance / landingScene.gridToCubeScale;
	// Spin amount: a few full turns so the tumbling reads clearly even over
	// a piece's own short remaining duration - randomized in both magnitude
	// and direction per piece so they don't all spin the same way.
	const dominoClearSpinTurnsMin = 1.5;
	const dominoClearSpinTurnsMax = 3;
	const randomClearAngle = () => THREE.MathUtils.lerp(dominoClearSpinTurnsMin, dominoClearSpinTurnsMax, Math.random())
		* Math.PI * 2 * (Math.random() < 0.5 ? -1 : 1);
	const randomClearDistance = (base) => base * (1 + (Math.random() * 2 - 1) * dominoClearDistanceVariance);

	// Every piece gets its own random start offset across most of
	// DOMINO_CLEAR_DURATION (rather than the topple's index-ordered offset),
	// each then falling over whatever duration remains to it - same
	// "proxyDuration" pattern the topple above uses so every piece still
	// finishes exactly at DOMINO_CLEAR_START + DOMINO_CLEAR_DURATION
	// regardless of its own random offset, keeping the scrubbed timeline's
	// end state clean.
	const dominoClearStaggerSpan = DOMINO_CLEAR_DURATION * 0.6;

	// Hero cube first.
	const cubeClearStart = new THREE.Vector3();
	const cubeClearRestQuaternion = new THREE.Quaternion();
	const cubeClearOffset = new THREE.Vector3();
	const cubeClearDelta = new THREE.Quaternion();
	let cubeClearDistanceOwn = dominoClearDistance;
	let cubeClearAngleOwn = 0;
	let cubeClearCaptured = false;
	const cubeClearProxy = { t: 0 };
	const cubeClearOffsetTime = Math.random() * dominoClearStaggerSpan;
	landingSceneTimeline.to(cubeClearProxy, {
		t: 1,
		ease: 'power2.in', // accelerating fall reads as gravity, not a glide
		duration: DOMINO_CLEAR_DURATION - cubeClearOffsetTime,
		onUpdate: () => {
			if (!cubeClearCaptured) {
				cubeClearCaptured = true;
				dominoClearCaptureDirection();
				cubeClearStart.copy(landingScene.cube.position);
				cubeClearRestQuaternion.copy(landingScene.cube.quaternion);
				cubeClearDistanceOwn = randomClearDistance(dominoClearDistance);
				cubeClearAngleOwn = randomClearAngle();
			}
			cubeClearOffset.copy(dominoClearScreenDown).multiplyScalar(cubeClearDistanceOwn * cubeClearProxy.t);
			landingScene.cube.position.copy(cubeClearStart).add(cubeClearOffset);
			cubeClearDelta.setFromAxisAngle(dominoClearWorldAxis, cubeClearAngleOwn * cubeClearProxy.t);
			landingScene.cube.quaternion.copy(cubeClearDelta).multiply(cubeClearRestQuaternion);
		},
	}, DOMINO_CLEAR_START + cubeClearOffsetTime);

	// Grid tiles then follow, each independently timed rather than in the
	// topple's row order - reading the tile's CURRENT matrix (its landed,
	// post-topple state) rather than recomputing any earlier phase's own
	// position formula, same as the topple loop above.
	landingScene.hiddenGridBasePositions.forEach((_, i) => {
		const offsetTime = Math.random() * dominoClearStaggerSpan;
		// Persists as this tile's own rest state across every frame of its
		// fall - see the topple loop's own comment above for why this can't
		// be shared per-frame scratch the way the assembly loop's variables
		// are (overlapping per-tile fall windows would clobber each other).
		const restPosition = new THREE.Vector3();
		const restQuaternion = new THREE.Quaternion();
		const scale = new THREE.Vector3();
		const fallOffset = new THREE.Vector3();
		const spinDelta = new THREE.Quaternion();
		const finalPosition = new THREE.Vector3();
		const finalQuaternion = new THREE.Quaternion();
		const matrix = new THREE.Matrix4();
		let distanceOwn = dominoClearDistanceLocal;
		let angleOwn = 0;
		let captured = false;
		const proxy = { t: 0 };
		landingSceneTimeline.to(proxy, {
			t: 1,
			ease: 'power2.in',
			duration: DOMINO_CLEAR_DURATION - offsetTime,
			onUpdate: () => {
				if (!captured) {
					captured = true;
					dominoClearCaptureDirection();
					landingScene.hiddenGrid.getMatrixAt(i, matrix);
					matrix.decompose(restPosition, restQuaternion, scale);
					distanceOwn = randomClearDistance(dominoClearDistanceLocal);
					angleOwn = randomClearAngle();
				}
				fallOffset.copy(dominoClearScreenDownLocal).multiplyScalar(distanceOwn * proxy.t);
				finalPosition.copy(restPosition).add(fallOffset);
				spinDelta.setFromAxisAngle(dominoClearLocalAxis, angleOwn * proxy.t);
				finalQuaternion.copy(spinDelta).multiply(restQuaternion);
				matrix.compose(finalPosition, finalQuaternion, scale);
				landingScene.hiddenGrid.setMatrixAt(i, matrix);
				landingScene.hiddenGrid.instanceMatrix.needsUpdate = true;
			},
		}, DOMINO_CLEAR_START + offsetTime);
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


