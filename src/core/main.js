import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type'

import { LoadingManager } from "three";
import LandingScene, { SWARM_RETREAT_DURATION } from "../scenes/landing-scene";
import WindowsScene, { DOOR_STAIRS_DURATION } from '../scenes/windows-scene';
import Lenis from 'lenis'
import { PALETTE } from '../materials/palette.js';
import { decodeFinalFrame, replaceImgWithCanvas } from './gifScrubber.js';
import { isMobileViewport, initGyroPermissionButton } from './gyro-controls.js';


let activeScene = null;
let fps = 60;
// Shows the "tap to enable tilt controls" button (see index.html/style.css)
// only where iOS actually gates deviceorientation behind it - see
// gyro-controls.js. No-op everywhere else.
initGyroPermissionButton();
const title = new SplitType(".split");
// Chapter two's text, split separately so it's excluded from the page-load reveal below.
const chapterTwoTitle = new SplitType(".split-reveal");
gsap.set('.split-reveal .char', { yPercent: 100 });
// Chapter three's text, split separately for the same reason.
const chapterThreeTitle = new SplitType(".split-reveal-three");
gsap.set('.split-reveal-three .char', { yPercent: 100 });
// Chapter four's text, split separately for the same reason.
const chapterFourTitle = new SplitType(".split-reveal-four");
gsap.set('.split-reveal-four .char', { yPercent: 100 });
// Chapter five's text, split separately for the same reason.
const chapterFiveTitle = new SplitType(".split-reveal-five");
gsap.set('.split-reveal-five .char', { yPercent: 100 });
// Chapter six's text, split separately for the same reason. Chapter six
// itself (the shapes swarm) is currently commented out below in favor of the
// lattice reveal chapter inserted in its place - left in place, unused,
// rather than torn out, so it's a one-step revert.
const chapterSixTitle = new SplitType(".split-reveal-six");
gsap.set('.split-reveal-six .char', { yPercent: 100 });
// Lattice reveal chapter's text (currently occupying chapter six's numbered
// slot - see LATTICE_START below), split separately for the same reason.
const chapterLatticeTitle = new SplitType(".split-reveal-lattice");
gsap.set('.split-reveal-lattice .char', { yPercent: 100 });
// Chapter seven's text, split separately for the same reason.
const chapterSevenTitle = new SplitType(".split-reveal-seven");
gsap.set('.split-reveal-seven .char', { yPercent: 100 });

// Re-splits the hero text and refreshes ScrollTrigger after a resize settles.
let splitResizeTimeout;
// Ignores height-only resizes (mobile address bar collapsing), only real width changes count.
let lastResizeWidth = window.innerWidth;
window.addEventListener('resize', () => {
	if (window.innerWidth === lastResizeWidth) return;
	lastResizeWidth = window.innerWidth;
	clearTimeout(splitResizeTimeout);
	splitResizeTimeout = setTimeout(() => {
		title.split();
		// Chapter two/three/four/five titles aren't re-split - doing so would orphan the
		// GSAP tweens already bound to their characters.
		// Recomputes the landing camera's responsive FOV for the new viewport.
		if (activeScene && typeof activeScene.getResponsiveFov === 'function') {
			activeScene.camera.fov = activeScene.getResponsiveFov(activeScene.camera.aspect);
			activeScene.camera.updateProjectionMatrix();
		}
		ScrollTrigger.refresh();
	}, 200);
});

const loadingManager = new LoadingManager();
gsap.registerPlugin(ScrollTrigger);
// Prevents the mobile address bar collapsing/expanding mid-scroll from triggering a
// ScrollTrigger refresh (which would jump the pinned camera to a different position).
ScrollTrigger.config({ ignoreMobileResize: true });

// Loading gif plays normally while assets load; its final frame decodes in the background.
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

		// Drives Lenis and ScrollTrigger off the same gsap ticker clock.
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);
	}, 0);

	// Freezes the gif on its current frame and crossfades it into the decoded final frame.
	finalGifFramePromise.then((finalFrame) => {
		const frozen = document.createElement('canvas');
		frozen.width = finalFrame.width;
		frozen.height = finalFrame.height;
		frozen.getContext('2d').drawImage(loadingGifImg, 0, 0, frozen.width, frozen.height);

		const canvas = replaceImgWithCanvas(loadingGifImg, finalFrame.width, finalFrame.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(frozen, 0, 0);

		// Waits one extra frame so gsap's ticker clock is fresh before the crossfade starts.
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
// Keeps highlights from blowing out to white, for flatter, matte print colors.
renderer.toneMappingExposure = 1.0;
renderer.domElement.classList.add('threejs-canvas');


// initialize all threejs scene ************TO DO: Manage the fact that the renderer takes the size of the cointainer, but we also want to pin the container and make it super large so we casn scroll
const landingScene = new LandingScene('landing-scene',loadingManager, renderer);
const windowsScene = new WindowsScene('windows-scene', loadingManager, renderer);
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
	// Draws the world-axes gizmo on top, in its own viewport, without wiping the scene render.
	if (activeScene.viewHelper && !isMobileViewport.matches) {
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

// Extra scroll room held after a chapter's text reveals, before the scene continues -
// gives the reader time to read. Also doubles as the hold after Phase 2's camera dive.
const CHAPTER_STOPPAGE = 2.5;
const CHAPTER_STOPPAGE_PX_PER_UNIT = 1 / 3;
// Same breathing-room gap as CHAPTER_STOPPAGE, held before chapter four's transition begins.
const CHAPTER_FOUR_STOPPAGE = 1.5;
// Scrubbed length of chapter four's transition (fov / cube morph / walls / orbit).
const PHASE4_DURATION = 2.5;
// Scrubbed length shared by the sphere's roll into the walls (Phase 6) and the hero
// cube's post-chapter-four roll (Phase 5 extension).
const sphereMoveDuration = 1;
// Pause after the hero cube's final roll, before chapter five's camera move begins.
const CHAPTER_FIVE_STOPPAGE = 1;
// Scrubbed length of chapter five's own camera move.
const CHAPTER_FIVE_DURATION = 1.5;
// Trailing scroll room past chapter five's reveal trigger, so scrolling back up has
// something to cross before it re-fires.
const CHAPTER_FIVE_TAIL = 0.5;
// Pause after chapter five's row finishes assembling, before the domino fall starts.
const DOMINO_FALL_STOPPAGE = 1;
// Scrubbed length of the domino fall - 43 pieces toppling in a staggered wave.
const DOMINO_FALL_DURATION = 3;
// Scrubbed length of chapter six's opening beat: every fallen piece scatters out of frame.
const DOMINO_CLEAR_DURATION = 2;
// Kept only for the (currently shelved - see LATTICE_START below) shapes
// swarm chapter's own constants, so re-enabling it later doesn't need these
// re-derived. Not folded into the `end` calc while shelved.
const SHAPES_SWARM_STOPPAGE = -0.5;
const SHAPES_SWARM_TAIL = 4;
// Breathing room after the domino clear, before the lattice reveal chapter
// (currently occupying chapter six's numbered slot) begins.
const LATTICE_STOPPAGE = 0.5;
// Scrubbed length of the lattice's own reveal: how long scrolling through
// this chapter takes to unwind the turbulence and resolve the hidden portrait.
const LATTICE_DURATION = 3;
// Trailing scroll room past the lattice's own reveal, so scrolling back up
// has something to cross before LATTICE_START's reverse branch re-fires -
// same reasoning as CHAPTER_FIVE_TAIL/the swarm's own SHAPES_SWARM_TAIL above.
const LATTICE_TAIL = 1;
// Closing wipe: a halftone-style wave of growing dark dots (Bauhaus exhibition
// poster reference) that merges into a solid field, covering the screen at the
// very end of the current scrollable range (right after the shapes swarm's own
// tail) - was originally positioned right after the domino clear instead (see
// git history), but that slot now belongs to the shapes swarm/chapter six text.
const CHAPTER_SIX_REVEAL_STOPPAGE = 0;
// Scrubbed length of the circle-grid reveal.
const CHAPTER_SIX_REVEAL_DURATION = 2;
// Small scroll-only pause after the door/stairs cascade finishes, before the
// camera starts swinging toward the door - lets the finished structure
// register for a beat first, same idiom as every other chapter's own
// _STOPPAGE/_GAP constant above.
const DOOR_APPROACH_GAP = 0.4;
// Scrubbed length of the windows scene's post-stairs camera move: an arcing
// dolly-in that swings the camera from the door/stairs chapter's angled
// framing around to face the door head-on (see updateDoorApproachCamera() in
// windows-scene.js and its use below).
const DOOR_APPROACH_DURATION = 2;

// Scroll progress bar fill (see .scroll-progress-fill in style.css) - scaled
// directly off this same ScrollTrigger's own progress below, so it's tied to
// the exact same scroll-distance `end` calc every chapter above is scrubbed
// against, rather than a separately-tracked distance. Whatever gets added to
// that `end` calc later (more chapters/sections) automatically stretches or
// shrinks the bar's own 0-1 range along with it - nothing here needs updating.
const scrollProgressFill = document.querySelector('.scroll-progress-fill');

// Timeline for events in the landing section
const landingSceneTimeline = gsap.timeline({
	scrollTrigger: {
		trigger: '#landing-scene',
		pin: true, // pin the trigger element while active
		start: 'top top', // when the top of the trigger hits the top of the viewport
		// Scroll length: two viewport heights for the original phases, plus room for
		// every chapter's stoppage/duration above. Recomputed on resize.
		// The shapes swarm chapter's own terms (SHAPES_SWARM_STOPPAGE + SHAPES_SWARM_TAIL)
		// are left out while it's shelved in favor of the lattice reveal chapter
		// (LATTICE_STOPPAGE + LATTICE_DURATION + LATTICE_TAIL) below - swap them back
		// in alongside re-enabling that section.
		end: () => '+=' + (window.innerHeight * 2 + window.innerHeight * CHAPTER_STOPPAGE_PX_PER_UNIT * (CHAPTER_STOPPAGE + CHAPTER_FOUR_STOPPAGE + PHASE4_DURATION + sphereMoveDuration + CHAPTER_FIVE_STOPPAGE + CHAPTER_FIVE_DURATION + DOMINO_FALL_STOPPAGE + DOMINO_FALL_DURATION + CHAPTER_FIVE_TAIL + DOMINO_CLEAR_DURATION + LATTICE_STOPPAGE + LATTICE_DURATION + LATTICE_TAIL + CHAPTER_SIX_REVEAL_STOPPAGE + CHAPTER_SIX_REVEAL_DURATION + DOOR_STAIRS_DURATION + DOOR_APPROACH_GAP + DOOR_APPROACH_DURATION)),
		invalidateOnRefresh: true,
		scrub: 1, // lower scrub means the camera reacts more directly to scrolling
		markers: false,
		// self.progress is the trigger's raw immediate scroll-through-range value
		// (0-1) - unlike the timeline's own playhead above, it isn't smoothed by
		// `scrub`, so the bar tracks the actual scroll position 1:1 rather than
		// lagging half a beat behind it.
		onUpdate: (self) => {
			scrollProgressFill.style.transform = `scaleX(${self.progress})`;
		},
	}
})
window.__debug = { ScrollTrigger, landingScene, landingSceneTimeline, activeScene: () => activeScene, gsap };

// Resizes the renderer's drawing buffer to match the canvas's CSS display
// size. Device-pixel scaling is already handled by renderer.setPixelRatio()
// (set once, at renderer creation above) - both renderer.setSize() and
// composer.setSize() multiply by that internally, so the width/height
// passed in here need to be plain CSS pixels (canvas.clientWidth/Height),
// not pre-multiplied by pixelRatio. This used to multiply by pixelRatio a
// second time here, which applied the device-pixel scale twice - hugely
// over-allocating the actual drawing buffer (canvas.width/height), and
// throwing off anything that reads the canvas's own CSS size to position
// itself in device-pixel space, notably ViewHelper's corner gizmo (it uses
// domElement.offsetWidth directly - see LandingScene's addWorldAxesGizmo).
// It also meant canvas.width could never converge with the target size, so
// this was resizing (reallocating the whole drawing buffer) every frame.
function resizeRendererToDisplaySize() {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const pixelRatio = renderer.getPixelRatio();
	const needsResize = canvas.width !== Math.floor(width * pixelRatio) || canvas.height !== Math.floor(height * pixelRatio);
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
// Splits the landing timeline into scroll-driven phases:
//   0-1  Phase 1: idle, free mouse-driven look
//   1-3  Phase 2: camera dives from z:1500 to z:0 and tilts to look down
//   3 to PHASE3_START: held stop once the dive lands on z:0
//   PHASE3_START to +1: Phase 3: sun swings low, camera flattens, boxes slide away
//   PHASE3_START+1 to +2: Phase 4: floor morphs into a small sphere
function onload(){

	// Phase 2: camera dive to z:0, stretched to a 2-unit duration so it reads as a slow descent.
	landingSceneTimeline.to(activeScene.camera.position, {
		z: 0,
		ease: 'power3.inOut',
		duration: 2,
	}, 1);

	// Chapter two's text swap fires here, before Phase 3 starts moving anything else.
	const CHAPTER_TWO_TRIGGER = 1.7;

	// Chapter one fades out as the user scrolls through the dive, fully gone by CHAPTER_TWO_TRIGGER.
	landingSceneTimeline.to('.landing-scene-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: CHAPTER_TWO_TRIGGER - 1,
	}, 1);

	// Chapter two's text slide-in, same char-stagger as the page-load intro. Runs as its
	// own fixed-duration timeline so the reveal always takes the same real time regardless
	// of scroll speed.
	const chapterTwoTimeline = gsap.timeline({ paused: true })
		.to('.chapter-two-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	// Scrolling back just fades chapter two out quickly, then resets its chars for next time.
	const CHAPTER_TWO_HIDE_DURATION = .2;

	// Plays chapter two's reveal forward, or fades it out and resets it on scroll-back.
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

	// Phase 3 starts after CHAPTER_STOPPAGE gives the chapter reveal room to breathe.
	const PHASE3_START = 2 + CHAPTER_STOPPAGE;

	// Directional light swings from its true starting position to (0, 400, z). Uses an
	// explicit fromTo so it doesn't inherit a stale position from chapter four's own
	// light orbit if a refresh forces this tween to re-capture its start.
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

	// Phase 4: floor morphs into a sphere.
	const floorMorph = { t: 0 };
	let verticalBoxesShadowsHidden = false;
	let hiddenGridRevealed = false;
	// Ambient light ramps up only in the final stretch of the morph, to flatten the
	// directional light's shadow on the sphere.
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

			// Hides the vertical boxes' shadows once the morph completes, restores them on scroll-back.
			const shouldHide = floorMorph.t >= 1;
			if (shouldHide !== verticalBoxesShadowsHidden) {
				verticalBoxesShadowsHidden = shouldHide;
				landingScene.verticalBoxes.forEach(box => { box.castShadow = !shouldHide; });
			}

			// Reveals the hidden cube grid once the floor is fully a sphere.
			const shouldRevealGrid = floorMorph.t >= 1;
			if (shouldRevealGrid !== hiddenGridRevealed) {
				hiddenGridRevealed = shouldRevealGrid;
				landingScene.hiddenGrid.visible = shouldRevealGrid;
				// Starts at half its resting scale on reveal - on some aspect ratios
				// the grid's edge tiles still peek past wall three despite the
				// starting-position nudge in landing-scene.js (gridExtraRightShift),
				// and at half size that peek reads as far less noticeable through
				// chapter three. Grown back to full scale alongside the position
				// ease-in below, once chapter four's own timeline starts.
				if (shouldRevealGrid) {
					landingScene.hiddenGrid.scale.setScalar(landingScene.gridToCubeScale * 0.5);
				}
			}
		},
	}, PHASE3_START + 1);

	// Floor reddens as it rounds into a sphere.
	const signalRed = new THREE.Color(PALETTE.signalRed);
	landingSceneTimeline.to(landingScene.floor.material.color, {
		r: signalRed.r,
		g: signalRed.g,
		b: signalRed.b,
		ease: 'power3.inOut',
		duration: 1,
	}, PHASE3_START + 1);

	// Chapter two fades out in step with the sphere morph above.
	landingSceneTimeline.to('.chapter-two-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: 1,
	}, PHASE3_START + 1);

	// Chapter three appears as the floor finishes morphing into a sphere.
	const CHAPTER_THREE_TRIGGER = PHASE3_START + 2;

	const chapterThreeTimeline = gsap.timeline({ paused: true })
		.to('.chapter-three-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-three .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_THREE_HIDE_DURATION = .2;

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			// Snaps chapter two to its hidden end state first so a fast scroll can't
			// leave the two chapters' text overlapping.
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
			// Re-shows chapter two when scrolling back into its zone.
			chapterTwoTimeline.play();
		}
	}, null, CHAPTER_THREE_TRIGGER);

	// Phase 6: the sphere rolls right but stops short of the third wall.
	const sphereMoveStart = PHASE3_START + 3;
	// Portrait screens roll the sphere along Z (through the walls) instead of X, since
	// there's little horizontal frame to work with there.
	const rollAxis = landingScene.isPortrait ? 'z' : 'x';

	const sphereTravelDistance = landingScene.isPortrait ? 65 : 260; // stops just past wall 1, short of wall 2
	landingSceneTimeline.to(landingScene.floor.position, {
		[rollAxis]: sphereTravelDistance,
		ease: 'none', // linear, so the wall-position -> timeline-time math below stays accurate
		duration: sphereMoveDuration,
	}, sphereMoveStart);

	// Break severity drops off per wall - first hit hardest, second glancing, third
	// (never reached) stays intact.
	const breakSeverity = [1, 0.4];
	// Scaled down on portrait, whose horizontal frame is much narrower than desktop's.
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

	// Chapter 4 starts after CHAPTER_FOUR_STOPPAGE gives the reader room to breathe.
	const PHASE4_START = sphereMoveStart + sphereMoveDuration + CHAPTER_FOUR_STOPPAGE;

	// Removes the vertical boxes from the scene so chapter four's wide orbit doesn't
	// bring them back into view; re-added on scroll-back.
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			landingScene.verticalBoxes.forEach(box => landingScene.scene.remove(box));
		} else {
			landingScene.verticalBoxes.forEach(box => landingScene.scene.add(box));
		}
	}, null, PHASE4_START);

	// FOV grows back from the near-orthographic 12 to normal, restoring depth for chapter four.
	landingSceneTimeline.to(landingScene.camera, {
		fov: landingScene.getResponsiveFov(landingScene.camera.aspect),
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
		onUpdate: () => landingScene.camera.updateProjectionMatrix(),
	}, PHASE4_START);

	// Fog thickens in as chapter four's wide orbit opens up the view.
	landingSceneTimeline.to(landingScene.scene.fog, {
		near: 600,
		far: 2500,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// The red sphere morphs into a cube as one continuous mesh, rather than two objects
	// crossfading, so it reads as one thing changing shape.
	const wall3 = landingScene.walls[2];
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			landingScene.revealMorphCube();
		} else {
			landingScene.hideMorphCube();
		}
	}, null, PHASE4_START);

	// Ground shadow catcher switches on alongside the morph-cube reveal above.
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			landingScene.shadowCatcher.visible = true;
		} else {
			landingScene.shadowCatcher.visible = false;
		}
	}, null, PHASE4_START);

	// Sphere morphs into a cube shape, then flat-shaded once it fully lands on the cube.
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

	// The hero cube already matches the hidden grid's tile size, so it stays at its base size.
	const heroCubeSize = landingScene.cubeBaseSize;

	// Wall three's halves shrink down to that same size, turning them into matching cube tiles.
	const wall3ShrinkScaleY = heroCubeSize / landingScene.cubeModuleSize; // cubeModuleSize == WALL_HALF_HEIGHT
	landingSceneTimeline.to(wall3.group.scale, {
		x: landingScene.gridToCubeScale,
		y: wall3ShrinkScaleY,
		z: landingScene.gridToCubeScale,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// The hidden grid eases in from its scattered starting position to its resting spot.
	landingSceneTimeline.to(landingScene.hiddenGrid.position, {
		x: landingScene.hiddenGridRestPosition.x,
		y: landingScene.hiddenGridRestPosition.y,
		z: landingScene.hiddenGridRestPosition.z,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// ...and grows from the half scale it was revealed at (see the floorMorph
	// tween's onUpdate above) back up to its true resting scale, alongside that
	// same position ease-in.
	landingSceneTimeline.to(landingScene.hiddenGrid.scale, {
		x: landingScene.gridToCubeScale,
		y: landingScene.gridToCubeScale,
		z: landingScene.gridToCubeScale,
		ease: 'power3.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// Each tile also converges from its own scattered offset into its exact resting slot.
	const gridAssembleSpreadGrowth = 2; // how many multiples of a tile's own base offset it starts scattered out to - tune to taste
	const gridAssembleStaggerSpan = PHASE4_DURATION * 0.5;
	const gridAssembleInstanceCount = landingScene.hiddenGridBasePositions.length;
	const gridAssembleInstanceDuration = PHASE4_DURATION - gridAssembleStaggerSpan;
	const gridAssemblePosition = new THREE.Vector3();
	const gridAssembleScale = new THREE.Vector3(1, 1, 1); // position-only - scale never changes here
	const gridAssembleQuaternion = new THREE.Quaternion(); // instances never rotate individually
	const gridAssembleMatrix = new THREE.Matrix4();
	landingScene.hiddenGridBasePositions.forEach((basePosition, i) => {
		const offset = gridAssembleInstanceCount > 1 ? (i / (gridAssembleInstanceCount - 1)) * gridAssembleStaggerSpan : 0;
		const proxy = { t: 0 };
		// Explicit fromTo so a resize-triggered refresh can't re-capture a stale mid-scroll
		// position as this tile's "from".
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

	// The cube detaches from the sphere's resting spot and slides over to wall three's gap.
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

	// Wall three (never hit, still standing) opens to make room for the cube in its gap.
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

	// The two broken walls also shrink into cube-tiles and slide to join wall three's
	// column, filling the rows above/below it to complete a 7-row column matching the grid.
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

		// Straightens each half back out to flat and upright, undoing the break's kick and tilt.
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

	// Camera orbits ~90deg around the vertical axis while closing in on the grid/cube,
	// rather than a plain dolly, so the whole arrangement reads as turning under the
	// camera. Pivots around the midpoint between the grid and the cube's landing spot
	// (not the world origin) so both stay framed through the turn. Idle mouse-look is
	// locked for the duration so it doesn't fight this every frame.
	// Fraction of the starting distance-to-pivot closed by the end. Dollying in this much
	// crops the grid's width on a narrow mobile viewport, so mobile closes in less, which
	// (since the same factor scales the camera's height too, per the Y-axis-only rotation
	// below) also leaves the camera sitting higher at the end of the move.
	const orbitRadiusCloseFactor = isMobileViewport.matches ? .40 : .65;
	// On mobile the narrower viewport reads the same sweep as roughly half the rotation
	// (the cube settles off to the side instead of under the camera), so it gets double
	// the angle here to actually land in the top-down view.
	const orbitAngle = (isMobileViewport.matches ? -Math.PI : -Math.PI / 2); // sweep direction - flip the sign if the grid rotates the wrong way
	const orbitAxis = new THREE.Vector3(0, 1, 0);
	// Tilts the camera down off its top-down idle angle over the back end of the move,
	// resolving into a 3/4 view with real depth as the orbit settles.
	const orbitTiltAngle = THREE.MathUtils.degToRad(0); // flip the sign if this tilts the wrong way
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
	// The directional light swings over the same span as the camera orbit, so the
	// grid's shadow sweeps around too. Start/end are fixed constants (not live-captured)
	// so the light doesn't snap against chapter three's own lighting at the boundary.
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

			// Pivot reaches orbitPivotEnd by 40% progress, ahead of the sweep/dolly finishing,
			// so the grid/cube don't swing through too wide an arc early on.
			const pivotBlend = Math.min(orbit.t / 0.4, 1);
			orbitPivot.lerpVectors(landingScene.lookAtTarget, orbitPivotEnd, pivotBlend);
			const angle = orbitAngle * orbit.t;
			const radiusFactor = 1 - orbitRadiusCloseFactor * orbit.t;
			const tailBlend = Math.max(0, (orbit.t - 0.6) / 0.4);
			const tiltAmount = orbitTiltAngle * tailBlend;

			orbitOffset.copy(orbitStartOffset).applyAxisAngle(orbitAxis, angle);
			orbitUp.copy(orbitStartUp).applyAxisAngle(orbitAxis, angle);
			if (tiltAmount !== 0) {
				// Built from orbitUp, not orbitOffset - at this point in the scroll orbitOffset
				// is purely vertical, which would give a degenerate (zero) tilt axis.
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

			// Shadow catcher fades in over the same span instead of popping on instantly.
			landingScene.shadowCatcher.material.opacity = orbit.t * 0.35;
		},
	}, PHASE4_START);

	// Phase 5 (extension): once chapter four settles, the hero cube gets one final roll -
	// dropping down, rolling 50deg, and growing to 1.5x.
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

	// Chapter three fades out over the camera orbit above, gone by PHASE5_START.
	landingSceneTimeline.to('.chapter-three-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: PHASE4_DURATION,
	}, PHASE4_START);

	// Chapter four appears as the camera orbit settles, before the hero cube's final roll.
	const CHAPTER_FOUR_TRIGGER = PHASE5_START;

	const chapterFourTimeline = gsap.timeline({ paused: true })
		.to('.chapter-four-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-four .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_FOUR_HIDE_DURATION = .2;

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			// Same fast-scroll handoff guard as CHAPTER_THREE_TRIGGER above.
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

	// Chapter 5 starts after CHAPTER_FIVE_STOPPAGE gives the reader room to breathe.
	const PHASE6_START = PHASE5_START + sphereMoveDuration + CHAPTER_FIVE_STOPPAGE;

	// FOV lerps back down to near-orthographic for chapter five's close.
	landingSceneTimeline.to(landingScene.camera, {
		fov: 12,
		ease: 'power3.inOut',
		duration: CHAPTER_FIVE_DURATION,
		onUpdate: () => landingScene.camera.updateProjectionMatrix(),
	}, PHASE6_START);

	// Fog pulls back out as the camera lifts away for chapter five's finale.
	landingSceneTimeline.to(landingScene.scene.fog, {
		near: 6000,
		far: 11000,
		ease: 'power2.inOut',
		duration: CHAPTER_FIVE_DURATION,
	}, PHASE6_START);

	// The orbit continues sweeping from where chapter four's own orbit left off, while
	// the camera also climbs and pans toward the domino row's own center. Angle end matches
	// angle start (rather than a fixed value) so this phase never adds further rotation on
	// top of chapter four's own orbit - the domino row direction is read live off the
	// camera's screen-right each frame (see dominoLocalFileDirection below), so any extra
	// rotation here would visibly swing the row's axis mid-fall.
	const orbit2AngleStart = orbitAngle;
	const orbit2AngleEnd = orbitAngle;
	const orbit2TiltStart = orbitTiltAngle;
	const orbit2TiltEnd = 0;
	const orbit2RadiusFactor = 1 - orbitRadiusCloseFactor;
	// Extra world units the camera climbs, so the grid pulls back and reads smaller in frame.
	const orbit2CameraLift = 2000;
	// Pans the pivot toward the domino row's actual screen position - "up a little, not too much".
	// Mobile's text sits closer to the top of a portrait screen, so it gets a stronger
	// upward pan to bring the scene up toward it.
	const chapterFiveRecenterRight = 200;
	const chapterFiveRecenterUp = isMobileViewport.matches ? -220 : -150;
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
			orbitTiltAxis.crossVectors(orbitAxis, orbitUp).normalize();
			orbitOffset.applyAxisAngle(orbitTiltAxis, tiltAmount);
			orbitUp.applyAxisAngle(orbitTiltAxis, tiltAmount);

			// Screen-right/up read straight off the camera's live matrix, one frame stale.
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

	// The grid tiles and hero cube line up into a single row of thin, tall bars standing
	// on end, like dominoes. The hero cube leads the row; each tile falls into line behind it.
	//
	// "Screen-right" is derived from the camera's own live matrix each frame, since its
	// pitch keeps drifting through this phase.
	const dominoCameraRight = new THREE.Vector3();
	// hiddenGrid's rotation is fixed here, so its inverse is only computed once, to convert
	// world directions into the group's local space.
	const dominoGroupQuaternionInverse = landingScene.hiddenGrid.quaternion.clone().invert();
	const dominoIdentityQuaternion = new THREE.Quaternion(); // tiles never rotate individually
	const dominoSign = 1; // flip to -1 if the hero cube ends up on the wrong side of the row
	const dominoThickness = 0.2; // fraction of a tile's width the bars shrink to - tune to taste
	const dominoHeightScale = 3.5; // how many tiles' worth of length the bars stretch to - tune to taste
	const gridTileSize = heroCubeSize / landingScene.gridToCubeScale;
	// Spacing along the row, scaled off the bars' own flattened width so the row reads as
	// one continuous chain regardless of how thin the bars are.
	const dominoSpacingRatio = 2.6; // tune to taste
	const dominoSpacing = gridTileSize * dominoThickness * dominoSpacingRatio;

	// Hero cube leads the row: slides to screen-left and unrolls Phase 5's own roll so it
	// ends up straight.
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

	// Slides the cube along the camera's live screen-left direction. Runs before the grid
	// tiles' own tween below so they can read this frame's already-updated cube position.
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

	const chapterFiveStaggerSpan = CHAPTER_FIVE_DURATION * 0.5;

	// Each grid tile gets its own proxy tween, so its stagger and row position/scale can
	// vary individually.
	const gridInstanceCount = landingScene.hiddenGridBasePositions.length;
	const gridInstanceDuration = CHAPTER_FIVE_DURATION - chapterFiveStaggerSpan;

	// The fall-into-line sweep runs bottom screen row first, right to left, then up to
	// the next row - sorted by position rather than raw construction index.
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
		const offset = gridInstanceCount > 1 ? (dominoSweepRank[i] / (gridInstanceCount - 1)) * chapterFiveStaggerSpan : 0;
		// Starts one spacing from the cube and counts outward, trailing off to one side
		// rather than centering symmetrically.
		const rowStep = (i + 1) * dominoSign;
		const proxy = { t: 0 };
		// Runs to the end of the phase (not just this tile's own duration) so its onUpdate
		// keeps firing while the cube/camera keep moving, instead of freezing early.
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

				// The row's baseline tracks the hero cube's current position, so the row
				// always picks up right where the cube leaves off.
				dominoLocalCubeOffset
					.copy(landingScene.cube.position)
					.sub(landingScene.hiddenGrid.position)
					.applyQuaternion(dominoGroupQuaternionInverse)
					.divideScalar(landingScene.gridToCubeScale);
				dominoRowBaseline.copy(dominoLocalCubeOffset);

				dominoRowTarget.copy(dominoLocalFileDirection).multiplyScalar(rowStep * dominoSpacing).add(dominoRowBaseline);
				dominoPosition.copy(basePosition).lerp(dominoRowTarget, fallT);

				// Tall axis is local X - hiddenGrid's own rotation leaves local X untouched,
				// so growing it here grows world X, with no per-instance rotation needed.
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

	// The three walls collapse away (rather than joining the row's rhythm) - scaled to
	// nothing and explicitly hidden, quicker than the row assembly so they're gone early.
	const chapterFiveWallVanishDuration = CHAPTER_FIVE_DURATION * 0.2;
	landingScene.walls.forEach((wall) => {
		let wallHidden = false;
		landingSceneTimeline.to(wall.group.scale, {
			x: 0,
			ease: 'power2.in',
			duration: chapterFiveWallVanishDuration,
			onUpdate: () => {
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

	// Chapter four fades out over chapter five's camera move above.
	landingSceneTimeline.to('.chapter-four-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: CHAPTER_FIVE_DURATION,
	}, PHASE6_START);

	// Chapter five appears once its own camera move settles.
	const CHAPTER_FIVE_TRIGGER = PHASE6_START + CHAPTER_FIVE_DURATION;

	const chapterFiveTimeline = gsap.timeline({ paused: true })
		.to('.chapter-five-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-five .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_FIVE_HIDE_DURATION = .2;

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			// Same fast-scroll handoff guard as CHAPTER_THREE_TRIGGER/CHAPTER_FOUR_TRIGGER above.
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
			// Same re-entry guard as CHAPTER_THREE_TRIGGER/CHAPTER_FOUR_TRIGGER's reverse branches above.
			chapterFourTimeline.play();
		}
	}, null, CHAPTER_FIVE_TRIGGER);

	// Chapter five's close: after a moment to settle, the hero cube tips over first and
	// the rest of the row follows in order - the "domino effect".
	//
	// The camera is fixed for the rest of the timeline by now, so the fall uses plain
	// world/local axes instead of live screen directions.
	//
	// The topple rotates about world Y, which is this camera's own near-top-down view
	// axis - so it reads on screen as the standing bar tipping over to lie flat.
	const DOMINO_FALL_START = CHAPTER_FIVE_TRIGGER + DOMINO_FALL_STOPPAGE;
	const dominoFallAngle = THREE.MathUtils.degToRad(-85); // negative reads as "falls to the right" - flip the sign if needed
	const dominoFallWorldAxis = new THREE.Vector3(0, 1, 0);
	const dominoFallLocalAxis = dominoFallWorldAxis.clone().applyQuaternion(dominoGroupQuaternionInverse).normalize();
	// Each piece hinges at its trailing edge rather than its center, so it reads as
	// toppling from a fixed base.
	const dominoFallHingeAxis = new THREE.Vector3(1, 0, 0);

	// Small per-piece random variance in fall angle and axis, so the row doesn't land in
	// a perfectly uniform wave - generated once per piece as it starts falling.
	const dominoFallAngleVarianceMax = THREE.MathUtils.degToRad(8);
	const dominoFallAxisVarianceMax = 0.12; // small off-axis component before renormalizing - tune to taste
	const randomFallAngle = () => dominoFallAngle + (Math.random() * 2 - 1) * dominoFallAngleVarianceMax;
	const randomAxisVariance = (baseAxis, perpA, perpB) => baseAxis.clone()
		.addScaledVector(perpA, (Math.random() * 2 - 1) * dominoFallAxisVarianceMax)
		.addScaledVector(perpB, (Math.random() * 2 - 1) * dominoFallAxisVarianceMax)
		.normalize();
	const worldAxisPerpA = new THREE.Vector3(1, 0, 0);
	const worldAxisPerpB = new THREE.Vector3(0, 0, 1);
	const localAxisPerpA = new THREE.Vector3(1, 0, 0);
	const localAxisPerpB = new THREE.Vector3(0, 1, 0);

	// Hero cube falls first.
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

	// Grid tiles follow one by one in row order (index 0, next to the cube, falls first).
	const gridFallHalfHeight = (gridTileSize / 2) * dominoHeightScale;
	const gridFallOffset = new THREE.Vector3();
	const gridFallDelta = new THREE.Quaternion();
	const gridFallPosition = new THREE.Vector3();
	const gridFallQuaternion = new THREE.Quaternion();
	const gridFallMatrix = new THREE.Matrix4();

	// Every piece (cube + 42 tiles) shares one even cascade across DOMINO_FALL_DURATION.
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
		// Each tile needs its own rest state (not shared scratch) since neighboring
		// tiles' fall windows overlap in time.
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

	// Scroll room after the domino topple, before chapter six's opening beat.
	landingSceneTimeline.to({}, { duration: CHAPTER_FIVE_TAIL }, DOMINO_FALL_START + DOMINO_FALL_DURATION);

	// Chapter six opens: every fallen piece scatters downward out of frame, in a
	// disorganized (not ordered) wave, so it reads as debris clearing away.
	const DOMINO_CLEAR_START = DOMINO_FALL_START + DOMINO_FALL_DURATION + CHAPTER_FIVE_TAIL;

	// Chapter five's text recedes as the fallen pieces start scattering out of
	// frame (not the earlier topple, while they're still lying in view) - clears
	// the way for the clear/swarm beat and foreshadows the handoff to chapter
	// six. A plain fire-and-forget fade (not baked into the scrubbed timeline
	// itself), same idiom as CHAPTER_FIVE_TRIGGER's own reverse-branch fade
	// above, so it always takes the same real time regardless of scroll speed.
	const CHAPTER_FIVE_FADE_OUT_DURATION = 1;
	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			gsap.to('.chapter-five-description', {
				autoAlpha: 0,
				ease: 'power1.inOut',
				duration: CHAPTER_FIVE_FADE_OUT_DURATION,
			});
		} else {
			gsap.to('.chapter-five-description', {
				autoAlpha: 1,
				ease: 'power1.inOut',
				duration: CHAPTER_FIVE_FADE_OUT_DURATION,
			});
		}
	}, null, DOMINO_CLEAR_START);

	// "Down" on screen is the negative of the camera's own live up axis, captured once
	// the first time any piece's onUpdate runs past DOMINO_CLEAR_START.
	const dominoClearScreenDown = new THREE.Vector3();
	const dominoClearScreenDownLocal = new THREE.Vector3();
	let dominoClearDirectionCaptured = false;
	function dominoClearCaptureDirection() {
		if (dominoClearDirectionCaptured) return;
		dominoClearDirectionCaptured = true;
		dominoClearScreenDown.copy(chapterFiveScreenUp).negate();
		dominoClearScreenDownLocal.copy(dominoClearScreenDown).applyQuaternion(dominoGroupQuaternionInverse).normalize();
	}

	// Spin axis: same world-Y-as-screen-spin logic as the topple above.
	const dominoClearWorldAxis = new THREE.Vector3(0, 1, 0);
	const dominoClearLocalAxis = dominoClearWorldAxis.clone().applyQuaternion(dominoGroupQuaternionInverse).normalize();

	// Fall distance generous enough to carry every piece past the bottom of frame.
	const dominoClearDistance = heroCubeSize * 60;
	const dominoClearDistanceVariance = 0.35; // +/- fraction of dominoClearDistance, randomized per piece
	const dominoClearDistanceLocal = dominoClearDistance / landingScene.gridToCubeScale;
	// A few full spins, randomized in magnitude and direction per piece.
	const dominoClearSpinTurnsMin = 1.5;
	const dominoClearSpinTurnsMax = 3;
	const randomClearAngle = () => THREE.MathUtils.lerp(dominoClearSpinTurnsMin, dominoClearSpinTurnsMax, Math.random())
		* Math.PI * 2 * (Math.random() < 0.5 ? -1 : 1);
	const randomClearDistance = (base) => base * (1 + (Math.random() * 2 - 1) * dominoClearDistanceVariance);

	// Every piece gets its own random start offset and falls over whatever duration
	// remains, so all pieces still finish together at the end of the phase.
	const dominoClearStaggerSpan = DOMINO_CLEAR_DURATION * 0.6;

	// Hero cube clears first.
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

	// Grid tiles follow, each independently timed rather than in row order.
	landingScene.hiddenGridBasePositions.forEach((_, i) => {
		const offsetTime = Math.random() * dominoClearStaggerSpan;
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

	// Chapter six's shapes swarm - SHELVED for now in favor of the lattice
	// reveal chapter just below, which occupies chapter six's numbered slot
	// (see index.html/style.css's chapter-six-description, still intact and
	// unused). Re-enable by uncommenting this block, swapping
	// SHAPES_SWARM_STOPPAGE/SHAPES_SWARM_TAIL back into the `end` calc above,
	// and re-basing LATTICE_START (or removing the lattice chapter) below.
	//
	// // Once the dominoes have cleared the frame, a swarm of 3D die-cut shapes
	// // flies in from outside the frame and settles into a physically-collided
	// // cluster toward screen-right, with constant central attraction so it
	// // keeps drifting instead of freezing solid once settled. Built lazily on
	// // first entrance (see enterShapesSwarm) since the camera is fixed by this
	// // point in the timeline, which is what its own placement is derived from.
	// // Scrolling back past this point lerps every shape back out to where it
	// // flew in from, rather than just leaving it sitting there while earlier
	// // chapters' own camera moves play out underneath it.
	// const SHAPES_SWARM_START = DOMINO_CLEAR_START + DOMINO_CLEAR_DURATION + SHAPES_SWARM_STOPPAGE;
	//
	// // Chapter six's text, same slide-in-and-fade reveal as every other chapter,
	// // played alongside the swarm's own entrance below.
	// const chapterSixTimeline = gsap.timeline({ paused: true })
	// 	.to('.chapter-six-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
	// 	.to('.split-reveal-six .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);
	//
	// const CHAPTER_SIX_HIDE_DURATION = .2;
	//
	// landingSceneTimeline.call(() => {
	// 	if (landingSceneTimeline.scrollTrigger.direction === 1) {
	// 		landingScene.enterShapesSwarm();
	// 		chapterSixTimeline.play();
	// 	} else {
	// 		landingScene.exitShapesSwarm();
	// 		chapterSixTimeline.pause();
	// 		gsap.to('.chapter-six-description', {
	// 			autoAlpha: 0,
	// 			ease: 'power1.in',
	// 			duration: CHAPTER_SIX_HIDE_DURATION,
	// 			onComplete: () => chapterSixTimeline.pause(0),
	// 		});
	// 	}
	// }, null, SHAPES_SWARM_START);
	// // Consumes SHAPES_SWARM_TAIL's own span so the timeline's real duration extends
	// // past SHAPES_SWARM_START by that much (see its declaration) - without this the
	// // trigger above sits exactly at the pinned range's end, with no scroll distance
	// // left to cross back through to re-fire the reverse (exit) branch.
	// landingSceneTimeline.to({}, { duration: SHAPES_SWARM_TAIL }, SHAPES_SWARM_START);

	// Lattice reveal chapter: a field of thin marks, one per grid cell, each
	// holding one brightness value of a hidden portrait it hasn't shown yet.
	// As the chapter's own scroll progress goes 0->1, a turbulence flow
	// unwinds and every mark widens/turns/brightens toward its own value,
	// resolving the portrait out of the noise. Built lazily on first entrance
	// (see enterLatticeReveal), camera-relative like the swarm above.
	const LATTICE_START = DOMINO_CLEAR_START + DOMINO_CLEAR_DURATION + LATTICE_STOPPAGE;

	// Reuses chapter six's numbered slot/title styling (split-reveal-lattice/
	// chapter-lattice-description - see index.html), since chapter six itself
	// is shelved above.
	const chapterLatticeTimeline = gsap.timeline({ paused: true })
		.to('.chapter-lattice-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-lattice .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_LATTICE_HIDE_DURATION = .2;

	// Resolution buttons (see index.html's .chapter-lattice-resolution):
	// hover previews a density - mirrors the pointer-driven feel the swarm
	// chapter above already established - while click commits it as the
	// fallback for touch, where hover never fires. Entirely a side feature
	// layered on top of the scroll-scrubbed reveal below; landingScene's own
	// setLatticeResolution never touches uProgress.
	const LATTICE_DEFAULT_N = 24;
	const latticeResolutionButtons = Array.from(document.querySelectorAll('.chapter-lattice-resolution-btn'));
	const setActiveLatticeResolutionButton = (n) => {
		latticeResolutionButtons.forEach((btn) => {
			btn.setAttribute('aria-pressed', String(Number(btn.dataset.latticeN) === n));
		});
	};
	latticeResolutionButtons.forEach((btn) => {
		const n = Number(btn.dataset.latticeN);
		const activate = () => {
			landingScene.setLatticeResolution(n);
			setActiveLatticeResolutionButton(n);
		};
		btn.addEventListener('pointerenter', activate);
		btn.addEventListener('focus', activate);
		btn.addEventListener('click', activate);
	});

	// "Lenna" cursor-follow tooltip while hovering the lattice grid - the
	// classic test image the grid resolves into on scroll. Purely DOM/CSS:
	// the hover region (.chapter-lattice-hover-zone) is a plain
	// absolutely-positioned div approximating the grid's own screen
	// footprint rather than a 3D raycast, so this needs nothing from
	// landingScene itself - see the CSS comment on that class for the math.
	const latticeHoverZone = document.querySelector('.chapter-lattice-hover-zone');
	const latticeTooltip = document.querySelector('.lattice-hover-tooltip');
	let latticeTooltipActive = false;
	// Force-hides the tooltip immediately regardless of pointer state - used
	// below (and from the LATTICE_START/CHAPTER_SIX_REVEAL_START .call()s
	// further down) wherever the grid itself disappears or starts being
	// covered, so it can't get stuck floating on screen mid-scroll with
	// nothing left under it to hover - a pointerleave on the hover zone
	// alone only fires if the cursor actually moves off it, not when the
	// grid vanishes out from under a stationary cursor.
	const hideLatticeTooltip = () => {
		if (!latticeTooltip) return;
		latticeTooltip.classList.remove('is-visible');
		latticeTooltipActive = false;
	};
	if (latticeHoverZone && latticeTooltip) {
		const LATTICE_TOOLTIP_OFFSET_X = 18;
		const LATTICE_TOOLTIP_OFFSET_Y = -18;
		const LATTICE_TOOLTIP_LERP = 0.22;
		const latticeTooltipPos = { x: 0, y: 0 };
		const latticeTooltipTarget = { x: 0, y: 0 };

		const setLatticeTooltipTarget = (e) => {
			latticeTooltipTarget.x = e.clientX + LATTICE_TOOLTIP_OFFSET_X;
			latticeTooltipTarget.y = e.clientY + LATTICE_TOOLTIP_OFFSET_Y;
		};

		latticeHoverZone.addEventListener('pointerenter', (e) => {
			setLatticeTooltipTarget(e);
			// Snap on entry instead of easing in from (0,0) - only the ongoing
			// follow should feel like it's trailing, not the first appearance.
			latticeTooltipPos.x = latticeTooltipTarget.x;
			latticeTooltipPos.y = latticeTooltipTarget.y;
			latticeTooltip.style.transform = `translate3d(${latticeTooltipPos.x}px, ${latticeTooltipPos.y}px, 0)`;
			latticeTooltip.classList.add('is-visible');
			latticeTooltipActive = true;
		});
		latticeHoverZone.addEventListener('pointermove', setLatticeTooltipTarget);
		latticeHoverZone.addEventListener('pointerleave', hideLatticeTooltip);

		// Reuses GSAP's own ticker rather than a second requestAnimationFrame
		// loop, since one is already driving every other animated thing on
		// this site. Soft-trailing follow (lerp toward the cursor, not a 1:1
		// snap) to match that same eased feel.
		gsap.ticker.add(() => {
			if (!latticeTooltipActive) return;
			latticeTooltipPos.x += (latticeTooltipTarget.x - latticeTooltipPos.x) * LATTICE_TOOLTIP_LERP;
			latticeTooltipPos.y += (latticeTooltipTarget.y - latticeTooltipPos.y) * LATTICE_TOOLTIP_LERP;
			latticeTooltip.style.transform = `translate3d(${latticeTooltipPos.x}px, ${latticeTooltipPos.y}px, 0)`;
		});
	}

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			landingScene.enterLatticeReveal();
			chapterLatticeTimeline.play();
			// enterLatticeReveal resets the scene itself back to the default
			// resolution on every (re-)entrance - keep the buttons' own active
			// state in sync so a visitor who stepped it up, scrolled away, and
			// scrolled back down doesn't see a stale button lit.
			setActiveLatticeResolutionButton(LATTICE_DEFAULT_N);
		} else {
			landingScene.exitLatticeReveal();
			hideLatticeTooltip();
			chapterLatticeTimeline.pause();
			gsap.to('.chapter-lattice-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_LATTICE_HIDE_DURATION,
				onComplete: () => chapterLatticeTimeline.pause(0),
			});
		}
	}, null, LATTICE_START);

	// The actual reveal: scroll-scrubbed, not real-time, so it unwinds and
	// re-tangles at scroll speed exactly like every other beat in this
	// timeline - see LandingScene.setLatticeProgress, which just forwards
	// this proxy's own value straight to the shader's uProgress uniform.
	const latticeProxy = { p: 0 };
	landingSceneTimeline.to(latticeProxy, {
		p: 1,
		ease: 'none',
		duration: LATTICE_DURATION,
		onUpdate: () => landingScene.setLatticeProgress(latticeProxy.p),
	}, LATTICE_START);

	// Consumes LATTICE_TAIL's own span so the timeline's real duration extends
	// past the reveal's own end by that much - same reasoning as
	// SHAPES_SWARM_TAIL above: without it, scrolling back up from the
	// following chapter would have no distance to cross before re-entering
	// this one's own scrubbed range.
	landingSceneTimeline.to({}, { duration: LATTICE_TAIL }, LATTICE_START + LATTICE_DURATION);

	// Closing wipe: a grid of dark dots grows from a seed point near the
	// bottom-left corner - the growing-circle device from the Bauhaus
	// exhibition poster reference - staggered outward by distance so it washes
	// across the screen as one continuous wave rather than popping in all at
	// once. Neighboring dots overlap once fully grown, so the wave reads as the
	// dark background being revealed underneath rather than a field of separate
	// circles. Built once here, against the viewport at setup time, and not
	// rebuilt on resize - same reasoning as chapters two-five's text above:
	// rebuilding would orphan the tweens already bound to these elements.
	//
	// Timed off the lattice chapter's own end (LATTICE_START + LATTICE_DURATION
	// + LATTICE_TAIL) now that it occupies chapter six's slot in place of the
	// shelved shapes swarm - was SHAPES_SWARM_START + SHAPES_SWARM_TAIL before.
	const CHAPTER_SIX_REVEAL_START = LATTICE_START + LATTICE_DURATION + LATTICE_TAIL + CHAPTER_SIX_REVEAL_STOPPAGE;

	// The dot wipe is about to start covering the grid - the tooltip has
	// nothing left to hover once it does, in either scroll direction (this
	// point can also be crossed scrolling back up from chapter seven).
	landingSceneTimeline.call(hideLatticeTooltip, null, CHAPTER_SIX_REVEAL_START);

	const revealContainer = document.querySelector('.chapter-six-reveal');
	const REVEAL_DOT_SPACING = 90; // grid pitch in px - tune to taste
	// Grown diameter vs. spacing - comfortably past sqrt(2) (~1.42) so a fully grown
	// dot's own circle covers the diagonal gap to its neighbors, with no seams.
	const REVEAL_DOT_MAX_SCALE = 1.6;
	// One extra column/row of overscan on every side so dots centered mid-cell still
	// cover the viewport's own corners once grown.
	const revealCols = Math.ceil(window.innerWidth / REVEAL_DOT_SPACING) + 2;
	const revealRows = Math.ceil(window.innerHeight / REVEAL_DOT_SPACING) + 2;
	const revealOffsetX = -REVEAL_DOT_SPACING;
	const revealOffsetY = -REVEAL_DOT_SPACING;
	// Off-center toward the bottom-left, echoing the reference poster's own
	// off-center circle rather than a dead-center ripple.
	const revealSeedX = window.innerWidth * 0.2;
	const revealSeedY = window.innerHeight * 0.85;

	const revealDots = [];
	let revealMaxDistance = 0;
	for (let row = 0; row < revealRows; row++) {
		for (let col = 0; col < revealCols; col++) {
			const cx = revealOffsetX + col * REVEAL_DOT_SPACING + REVEAL_DOT_SPACING / 2;
			const cy = revealOffsetY + row * REVEAL_DOT_SPACING + REVEAL_DOT_SPACING / 2;
			const distance = Math.hypot(cx - revealSeedX, cy - revealSeedY);
			revealMaxDistance = Math.max(revealMaxDistance, distance);

			const dot = document.createElement('div');
			dot.className = 'chapter-six-reveal-dot';
			dot.style.width = `${REVEAL_DOT_SPACING}px`;
			dot.style.height = `${REVEAL_DOT_SPACING}px`;
			dot.style.left = `${cx - REVEAL_DOT_SPACING / 2}px`;
			dot.style.top = `${cy - REVEAL_DOT_SPACING / 2}px`;
			revealContainer.appendChild(dot);
			revealDots.push({ el: dot, distance });
		}
	}

	// SHELVED alongside the swarm chapter above: retreated it before the wipe
	// started covering the screen, since (unlike the lattice reveal) it's a
	// physically-animated cluster that shouldn't just freeze or vanish. Re-add
	// alongside re-enabling that chapter.
	//
	// // How long, after exitShapesSwarm() is called, its retreat animation
	// // actually takes to finish (see SWARM_RETREAT_DURATION) plus a small
	// // safety margin - used to position SHAPES_SWARM_EXIT_START far enough
	// // ahead of CHAPTER_SIX_REVEAL_START for the retreat to (at a normal
	// // scroll pace) finish before the wipe starts.
	// const SHAPES_SWARM_EXIT_BUFFER = 0.2;
	// const SHAPES_SWARM_EXIT_START = CHAPTER_SIX_REVEAL_START - SWARM_RETREAT_DURATION - SHAPES_SWARM_EXIT_BUFFER;
	// landingSceneTimeline.call(() => {
	// 	if (landingSceneTimeline.scrollTrigger.direction === 1) {
	// 		landingScene.exitShapesSwarm();
	// 	} else {
	// 		landingScene.enterShapesSwarm();
	// 	}
	// }, null, SHAPES_SWARM_EXIT_START);

	// Every dot's own start delay is proportional to its distance from the seed, so
	// the wave washes outward continuously; every dot still finishes growing by
	// CHAPTER_SIX_REVEAL_START + CHAPTER_SIX_REVEAL_DURATION regardless of how far
	// out it sits, same "stagger span + own duration" split used throughout above.
	// Scroll-scrubbed, like every other beat in this timeline, rather than
	// real-time-driven - the wipe's own pace follows scroll speed the same way
	// the camera moves and phase transitions earlier in the timeline do.
	const revealStaggerSpan = CHAPTER_SIX_REVEAL_DURATION * 0.6;
	const revealDotDuration = CHAPTER_SIX_REVEAL_DURATION - revealStaggerSpan;
	revealDots.forEach(({ el, distance }) => {
		const offset = revealMaxDistance > 0 ? (distance / revealMaxDistance) * revealStaggerSpan : 0;
		landingSceneTimeline.fromTo(el, {
			scale: 0,
		}, {
			scale: REVEAL_DOT_MAX_SCALE,
			ease: 'power2.out', // accelerating-then-settling growth reads as an ink blot, not a linear scale
			duration: revealDotDuration,
		}, CHAPTER_SIX_REVEAL_START + offset);
	});

	// Right as the dots finish covering the screen, swap the renderer's active
	// scene to the windows scene - it sits ABOVE .chapter-six-reveal (see
	// #windows-scene's z-index in style.css), so once the canvas lands there
	// it renders on top of the dots rather than under them. The dots
	// themselves aren't touched here: they just stay fully grown as the
	// dark backdrop, and WindowsScene's own transparent background (its
	// clearAlpha = 0) is what lets that backdrop show through around the
	// 3D wall. Scrolling back up past this point swaps back to the landing
	// scene, and continuing further up shrinks the dots away as normal.
	const WINDOWS_SWAP_START = CHAPTER_SIX_REVEAL_START + CHAPTER_SIX_REVEAL_DURATION;

	// The bottom meta bar (studio signature + "Scroll to continue") is static -
	// never faded or hidden - so it's still sitting there once the dot wipe
	// below turns the backdrop black, where its ink color/track line read as
	// nearly invisible. Scroll-scrubbed over the same span the wipe itself
	// covers the screen, so both flip to the palette's cream tone right as the
	// backdrop does (and back on scroll-back), same idiom as the
	// chapter-six-description fade below. The falling accent drop
	// (.landing-scene-scroll-line::after) is left on its brick color - a
	// pseudo-element, not tweenable directly, and just a decorative dot rather
	// than text needing AA contrast.
	landingSceneTimeline.to('.landing-scene-meta', {
		color: '#f8e0ad',
		ease: 'power1.inOut',
		duration: WINDOWS_SWAP_START - CHAPTER_SIX_REVEAL_START,
	}, CHAPTER_SIX_REVEAL_START);
	landingSceneTimeline.to('.landing-scene-scroll-line', {
		backgroundColor: 'rgba(248, 224, 173, 0.3)',
		ease: 'power1.inOut',
		duration: WINDOWS_SWAP_START - CHAPTER_SIX_REVEAL_START,
	}, CHAPTER_SIX_REVEAL_START);

	// The lattice chapter's own text has nothing left to fade it out on its own
	// (the dot wipe is the true finale before chapter seven) - scroll-scrubbed
	// straight against the timeline, same as the dot wipe itself, rather than a
	// fixed real-time tween, so it tracks scroll speed exactly: starts fading
	// the moment the wipe begins and is fully gone right as it finishes
	// covering the screen.
	landingSceneTimeline.to('.chapter-lattice-description', {
		autoAlpha: 0,
		ease: 'power1.inOut',
		duration: WINDOWS_SWAP_START - CHAPTER_SIX_REVEAL_START,
	}, CHAPTER_SIX_REVEAL_START);

	// Chapter seven's text, same slide-in-and-fade reveal as every other
	// chapter, played once the dot wipe has fully covered the screen and the
	// windows scene has swapped in underneath it.
	const chapterSevenTimeline = gsap.timeline({ paused: true })
		.to('.chapter-seven-description', { autoAlpha: 1, ease: 'power1.inOut', duration: 1 }, 0)
		.to('.split-reveal-seven .char', { yPercent: 0, ease: 'power1.inOut', duration: 1, stagger: .001 }, 0);

	const CHAPTER_SEVEN_HIDE_DURATION = .2;

	landingSceneTimeline.call(() => {
		if (landingSceneTimeline.scrollTrigger.direction === 1) {
			setActiveScene(windowsScene);
			chapterSevenTimeline.play();
		} else {
			chapterSevenTimeline.pause();
			gsap.to('.chapter-seven-description', {
				autoAlpha: 0,
				ease: 'power1.in',
				duration: CHAPTER_SEVEN_HIDE_DURATION,
				onComplete: () => chapterSevenTimeline.pause(0),
			});
			setActiveScene(landingScene);
		}
	}, null, WINDOWS_SWAP_START);

	// Door opens and both stair flights cascade, scrubbed continuously
	// against scroll (reversible on scroll-back) exactly like the
	// standalone prototype - nested directly rather than call()-triggered
	// like chapterTwoTimeline etc., since those play once at a fixed real-
	// time pace and this needs to stay tied to scroll position instead. See
	// DOOR_STAIRS_DURATION in windows-scene.js, folded into this timeline's
	// own `end` calc above so there's actual scroll room for it to play out.
	landingSceneTimeline.add(windowsScene.doorStairsTimeline, WINDOWS_SWAP_START);

	// See DOOR_APPROACH_GAP above.
	const DOOR_APPROACH_START = WINDOWS_SWAP_START + DOOR_STAIRS_DURATION + DOOR_APPROACH_GAP;

	// Camera swings from the door/stairs chapter's angled framing around to
	// look straight down the door's own central axis while dollying in -
	// an arcing approach rather than a straight-line truck across, so the
	// rotation actually reads as the camera turning to face the door rather
	// than sliding past it. windowsScene.updateDoorApproachCamera() owns the
	// pivot-and-rotate math for the position itself (mirrors chapter four's
	// own orbitOffset camera orbit above); lookAt is just a plain
	// lerpVectors here since it's only an aim point, not a physically-
	// traversed path, straight at windowsScene.doorApproachTarget - the same
	// point the position arc pivots around, so by t:1 the camera is
	// centered on it and looking straight at it. Explicit fromTo (lookAt
	// captured once, not live-read at tween time) so a resize-triggered
	// ScrollTrigger refresh can't re-capture a stale mid-scroll lookAt as
	// this tween's start - same reasoning as chapter three's directional-
	// light fromTo above.
	const doorApproachLookAtFrom = windowsScene.scrollCameraBase.lookAt.clone();
	const doorApproach = { t: 0 };
	landingSceneTimeline.fromTo(doorApproach, {
		t: 0,
	}, {
		t: 1,
		ease: 'power2.inOut',
		duration: DOOR_APPROACH_DURATION,
		onUpdate: () => {
			windowsScene.updateDoorApproachCamera(doorApproach.t);
			windowsScene.scrollCameraBase.lookAt.lerpVectors(doorApproachLookAtFrom, windowsScene.doorApproachTarget, doorApproach.t);
		},
	}, DOOR_APPROACH_START);

};

