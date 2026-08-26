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
// World-axes gizmo is hidden below this viewport size so it doesn't overlap the hero text.
const isMobileViewport = window.matchMedia('(max-width: 767px), (max-height: 500px)');
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
// const secondScene = new SecondScene('second-scene',loadingManager, renderer);
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
// Pause after the clear finishes, before pieces start dropping back in from above.
const DOMINO_REFORM_STOPPAGE = 1;
// Scrubbed length of chapter six's reform: every piece drops in from above the viewport,
// staggered left to right, to build the poster's own barcode-silhouette shape.
const DOMINO_REFORM_DURATION = 3;
// Pause after the reform grid settles, before the scanimation plane starts its slide.
const SCAN_PLANE_STOPPAGE = 1;
// Scrubbed length of the scanimation plane's own slide in from off-screen right.
const SCAN_PLANE_DURATION = 2.5;

// Timeline for events in the landing section
const landingSceneTimeline = gsap.timeline({
	scrollTrigger: {
		trigger: '#landing-scene',
		pin: true, // pin the trigger element while active
		start: 'top top', // when the top of the trigger hits the top of the viewport
		// Scroll length: two viewport heights for the original phases, plus room for
		// every chapter's stoppage/duration above. Recomputed on resize.
		end: () => '+=' + (window.innerHeight * 2 + window.innerHeight * CHAPTER_STOPPAGE_PX_PER_UNIT * (CHAPTER_STOPPAGE + CHAPTER_FOUR_STOPPAGE + PHASE4_DURATION + sphereMoveDuration + CHAPTER_FIVE_STOPPAGE + CHAPTER_FIVE_DURATION + DOMINO_FALL_STOPPAGE + DOMINO_FALL_DURATION + CHAPTER_FIVE_TAIL + DOMINO_CLEAR_DURATION + DOMINO_REFORM_STOPPAGE + DOMINO_REFORM_DURATION + SCAN_PLANE_STOPPAGE + SCAN_PLANE_DURATION)),
		invalidateOnRefresh: true,
		scrub: 1, // lower scrub means the camera reacts more directly to scrolling
		markers: false
	}
})
window.__debug = { ScrollTrigger, landingScene, landingSceneTimeline, activeScene: () => activeScene, gsap };

// Resizes the renderer's drawing buffer to match the canvas's CSS display size.
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
	const orbitRadiusCloseFactor = .65; // fraction of the starting distance-to-pivot closed by the end
	const orbitAngle = -Math.PI / 2; // sweep direction - flip the sign if the grid rotates the wrong way
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
	// the camera also climbs and pans toward the domino row's own center.
	const orbit2AngleStart = orbitAngle;
	const orbit2AngleEnd = -Math.PI / 2;
	const orbit2TiltStart = orbitTiltAngle;
	const orbit2TiltEnd = 0;
	const orbit2RadiusFactor = 1 - orbitRadiusCloseFactor;
	// Extra world units the camera climbs, so the grid pulls back and reads smaller in frame.
	const orbit2CameraLift = 2000;
	// Pans the pivot toward the domino row's actual screen position - "up a little, not too much".
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

	// Chapter six's reform: once every piece has cleared the frame, the 42 grid tiles (no
	// hero cube for now) drop back in from above the viewport, staggered left to right, and
	// settle into a single row of upright bars again - same "row of vertical bars" reading
	// as the pre-topple row above (local X stays each bar's own tall axis; screen-right sets
	// its place in the row). Every bar shares the same size and the same baseline - thin,
	// long, tightly packed, and perfectly flush - reading as one dense scanimation-style
	// grid rather than a silhouette.
	const DOMINO_REFORM_START = DOMINO_CLEAR_START + DOMINO_CLEAR_DURATION + DOMINO_REFORM_STOPPAGE;

	const reformBarCount = gridInstanceCount; // 42 tiles
	const reformCenterRank = (reformBarCount - 1) / 2;
	// Scales the whole reform grid (bar length, thickness, and - since spacing is
	// derived from thickness below - the gaps between bars too) up together, so the
	// grid takes up more of the viewport without upsetting the bar:gap ratio the scan
	// plane's own alignment depends on. The scan plane's size is itself derived from
	// this grid's spacing further down, so it grows right along with it - tune to taste.
	const REFORM_SCALE_MULTIPLIER = 1.35;
	// Every bar shares this same size - thinner and much longer than the pre-topple row's
	// own bars - tune to taste.
	const reformThickness = dominoThickness * 0.5 * REFORM_SCALE_MULTIPLIER;
	const reformLengthScale = dominoHeightScale * 2 * REFORM_SCALE_MULTIPLIER;
	const reformBarHalfLengthLocal = (gridTileSize * reformLengthScale) / 2;
	// Bar:gap is an even 1:1 split - matches the actual scanimation.png texture's own
	// measured pitch (36px, ~50/50 bar:gap via autocorrelation - see
	// prototype/scanimation.js), so the scan plane's slide-in below lines up with this
	// grid's own gaps instead of an arbitrary spacing.
	const reformSpacingRatio = 2;
	const reformSpacing = gridTileSize * reformThickness * reformSpacingRatio;

	// Local X is every bar's own tall axis (same as the pre-topple row and the topple's own
	// hinge above) - every bar's center sits this same offset from it, so the whole row
	// lands flush on one shared baseline. Flip to -1 if bars end up dropping in upside down.
	const reformVerticalSign = 1;
	const reformBaselineLocalX = 0;
	const reformBarOffsetLocal = reformBaselineLocalX + reformBarHalfLengthLocal;
	// Drop distance generous enough to start every bar above the top of frame.
	const reformDropDistanceLocal = (heroCubeSize * 60) / landingScene.gridToCubeScale;
	const reformStaggerSpan = DOMINO_REFORM_DURATION * 0.7;
	const reformDropDuration = DOMINO_REFORM_DURATION - reformStaggerSpan;
	const reformDropEase = gsap.parseEase('power3.out');

	const reformCameraRight = new THREE.Vector3();
	const reformLocalRight = new THREE.Vector3();

	// The row centers on wherever the camera is actually looking (at the grid's own
	// depth), not the grid's own local origin - the two drifted apart back in chapter
	// five's orbit2 recenter, so anchoring on the grid's origin left the row off-screen-
	// center. Captured once, the first time any piece's onUpdate runs past
	// DOMINO_REFORM_START, since the camera itself is fixed for the rest of the timeline.
	//
	// Nudged down and right from dead-center screen once at capture time, so the grid
	// settles lower in frame (vertically centered rather than sitting high, under the
	// nav) and closer to the right edge - tune to taste.
	const reformAnchorRightOffset = 130;
	const reformAnchorDownOffset = 170;
	const reformCamForward = new THREE.Vector3();
	const reformCaptureCameraRight = new THREE.Vector3();
	const reformCaptureCameraUp = new THREE.Vector3();
	const reformAnchorWorld = new THREE.Vector3();
	const reformAnchorLocal = new THREE.Vector3();
	let reformAnchorCaptured = false;
	function reformCaptureAnchor() {
		if (reformAnchorCaptured) return;
		reformAnchorCaptured = true;
		landingScene.camera.updateMatrixWorld();
		landingScene.camera.getWorldDirection(reformCamForward);
		const depth = reformAnchorWorld
			.copy(landingScene.hiddenGrid.position)
			.sub(landingScene.camera.position)
			.dot(reformCamForward);
		reformAnchorWorld.copy(landingScene.camera.position).addScaledVector(reformCamForward, depth);

		reformCaptureCameraRight.setFromMatrixColumn(landingScene.camera.matrixWorld, 0).normalize();
		reformCaptureCameraUp.setFromMatrixColumn(landingScene.camera.matrixWorld, 1).normalize();
		reformAnchorWorld
			.addScaledVector(reformCaptureCameraRight, reformAnchorRightOffset)
			.addScaledVector(reformCaptureCameraUp, -reformAnchorDownOffset);

		reformAnchorLocal.copy(reformAnchorWorld)
			.sub(landingScene.hiddenGrid.position)
			.applyQuaternion(dominoGroupQuaternionInverse)
			.divideScalar(landingScene.gridToCubeScale);
	}

	// Ranked by the same left-to-right sweep order used for the pre-topple row, so each
	// tile's place in the row stays consistent across both phases.
	const reformScale = new THREE.Vector3(reformLengthScale, reformThickness, reformThickness);
	landingScene.hiddenGridBasePositions.forEach((_, i) => {
		const rank = dominoSweepRank[i];
		const u = reformBarCount > 1 ? rank / (reformBarCount - 1) : 0;
		const offsetTime = u * reformStaggerSpan; // left to right
		const rowStep = (rank - reformCenterRank) * reformSpacing;

		const targetLocal = new THREE.Vector3();
		const startLocal = new THREE.Vector3();
		const position = new THREE.Vector3();
		const matrix = new THREE.Matrix4();
		const proxy = { t: 0 };
		const proxyDuration = DOMINO_REFORM_DURATION - offsetTime;

		landingSceneTimeline.to(proxy, {
			t: 1,
			ease: 'none',
			duration: proxyDuration,
			onUpdate: () => {
				console.log('[reformBar]', i, proxy.t);
				const dropT = reformDropEase(Math.min(proxy.t * proxyDuration / reformDropDuration, 1));

				landingScene.camera.updateMatrixWorld();
				reformCaptureAnchor();
				reformCameraRight.setFromMatrixColumn(landingScene.camera.matrixWorld, 0).normalize();
				reformLocalRight.copy(reformCameraRight).applyQuaternion(dominoGroupQuaternionInverse);

				targetLocal.copy(reformAnchorLocal).addScaledVector(reformLocalRight, rowStep);
				targetLocal.x += reformVerticalSign * reformBarOffsetLocal;
				startLocal.copy(targetLocal);
				startLocal.x += reformVerticalSign * reformDropDistanceLocal;

				position.copy(startLocal).lerp(targetLocal, dropT);
				matrix.compose(position, dominoIdentityQuaternion, reformScale);
				landingScene.hiddenGrid.setMatrixAt(i, matrix);
				landingScene.hiddenGrid.instanceMatrix.needsUpdate = true;
			},
		}, DOMINO_REFORM_START + offsetTime);
	});

	// A slight camera orbit around world X, synced with the reform bars' own drop-in
	// above (same start/duration) so the camera drifts while the grid assembles rather
	// than as a separate beat. Orbits around the same anchor the grid itself centers on.
	// Captured once so it starts from the camera's actual settled pose rather than an
	// assumed one. Flip the sign if 5% reads as tilting the wrong way.
	const REFORM_ORBIT_ANGLE = THREE.MathUtils.degToRad(360 * 0.05); // "5% around the X axis"
	const reformOrbitAxis = new THREE.Vector3(1, 0, 0);
	const reformOrbitPivot = new THREE.Vector3();
	const reformOrbitStartOffset = new THREE.Vector3();
	const reformOrbitStartUp = new THREE.Vector3();
	const reformOrbitOffset = new THREE.Vector3();
	const reformOrbitUp = new THREE.Vector3();
	let reformOrbitCaptured = false;
	const reformOrbitProxy = { t: 0 };
	landingSceneTimeline.to(reformOrbitProxy, {
		t: 1,
		ease: 'power1.inOut',
		duration: DOMINO_REFORM_DURATION,
		onUpdate: () => {
			if (!reformOrbitCaptured) {
				reformOrbitCaptured = true;
				reformCaptureAnchor();
				reformOrbitPivot.copy(reformAnchorWorld);
				reformOrbitStartOffset.copy(landingScene.camera.position).sub(reformOrbitPivot);
				reformOrbitStartUp.copy(landingScene.camera.up);
			}
			console.log('[reformOrbit]', reformOrbitProxy.t);
			const angle = REFORM_ORBIT_ANGLE * reformOrbitProxy.t;
			reformOrbitOffset.copy(reformOrbitStartOffset).applyAxisAngle(reformOrbitAxis, angle);
			reformOrbitUp.copy(reformOrbitStartUp).applyAxisAngle(reformOrbitAxis, angle);
			landingScene.camera.position.copy(reformOrbitPivot).add(reformOrbitOffset);
			landingScene.camera.up.copy(reformOrbitUp);
			landingScene.camera.lookAt(reformOrbitPivot);
		},
	}, DOMINO_REFORM_START);

	// Chapter six's scanimation reveal: the actual barrier-grid texture (see
	// landingScene.scanPlane, built in landing-scene.js) slides in from off past the
	// right edge of frame and comes to rest right behind the reform grid above, so its
	// own baked animation reads through the grid's gaps - the live version of the test
	// built and measured in prototype/scanimation.js.
	const SCAN_PLANE_START = DOMINO_REFORM_START + DOMINO_REFORM_DURATION + SCAN_PLANE_STOPPAGE;

	// Measured directly off public/textures/scanimation.png via autocorrelation (see
	// prototype/scanimation.js) - a rock-solid 36px pitch. The plane is scaled so that
	// pitch lines up exactly with the reform grid's own (reformSpacing, also a 1:1
	// bar:gap split now, to match).
	const SCAN_TEXTURE_PX = 1254;
	const SCAN_PITCH_PX = 36;
	const reformSpacingWorld = reformSpacing * landingScene.gridToCubeScale;
	const scanPlaneWorldSize = reformSpacingWorld * (SCAN_TEXTURE_PX / SCAN_PITCH_PX);

	// Generous enough to start well past the right edge of frame regardless of viewport
	// width - tune to taste.
	const scanPlaneOffscreenDistance = scanPlaneWorldSize * 3;
	// Sits a hair behind the reform grid's own bars (further from the camera along its
	// own forward axis), so the grid actually occludes it once they line up, rather than
	// the two fighting for the same depth.
	const scanPlaneDepthOffset = heroCubeSize * 0.5;

	// The reform bars extend a full length OUT from reformAnchorWorld along their own
	// tall axis (it's their baseline/bottom edge, not their middle - see
	// reformBarOffsetLocal above), so the grid's true visual center sits this same
	// offset further along that axis. Local X is that tall axis (see the pre-topple row
	// and topple's own hinge above) - converted to world via the grid's own rotation
	// rather than assumed, so this still holds on portrait's extra rotation.z.
	const reformWorldTallAxis = new THREE.Vector3(1, 0, 0).applyQuaternion(landingScene.hiddenGrid.quaternion);
	const scanCenterOffset = reformVerticalSign * reformBarOffsetLocal * landingScene.gridToCubeScale;

	const scanCamForward = new THREE.Vector3();
	const scanCameraRight = new THREE.Vector3();
	const scanTarget = new THREE.Vector3();
	const scanStart = new THREE.Vector3();
	const scanPlaneProxy = { t: 0 };
	// Hidden until this phase is actually reached (and re-hidden on reverse scroll) -
	// same "compare against last known state" toggle chapter five's wall-vanish uses,
	// since a plain visible=true at setup time would show it from page load, sitting
	// wherever it defaults to, long before chapter six.
	let scanPlaneVisible = false;
	// The plane sits scanPlaneDepthOffset further from the camera than the grid itself
	// (see above) - under this perspective camera, that extra distance alone makes a
	// same-world-size pitch project smaller on screen than the grid's, so gaps and bars
	// drift out of sync the further across the pattern you look. Scaling the plane up by
	// its own distance ratio (sized once the anchor/camera distance is known, both fixed
	// for the rest of the timeline) cancels that foreshortening out.
	let scanPlaneSized = false;
	landingSceneTimeline.to(scanPlaneProxy, {
		t: 1,
		ease: 'power2.inOut',
		duration: SCAN_PLANE_DURATION,
		onUpdate: () => {
			const shouldShow = scanPlaneProxy.t > 0;
			if (shouldShow !== scanPlaneVisible) {
				scanPlaneVisible = shouldShow;
				landingScene.scanPlane.visible = shouldShow;
			}
			if (!scanPlaneVisible) return;

			landingScene.camera.updateMatrixWorld();
			reformCaptureAnchor(); // same lazy anchor the reform grid itself centers on

			if (!scanPlaneSized) {
				scanPlaneSized = true;
				const gridDistance = landingScene.camera.position.distanceTo(reformAnchorWorld);
				const scanPlaneDistance = gridDistance + scanPlaneDepthOffset;
				const perspectiveCorrection = scanPlaneDistance / gridDistance;
				const correctedSize = scanPlaneWorldSize * perspectiveCorrection;
				landingScene.scanPlane.scale.set(correctedSize, correctedSize, 1);
			}

			landingScene.camera.getWorldDirection(scanCamForward);
			scanCameraRight.setFromMatrixColumn(landingScene.camera.matrixWorld, 0).normalize();

			scanTarget.copy(reformAnchorWorld)
				.addScaledVector(reformWorldTallAxis, scanCenterOffset)
				.addScaledVector(scanCamForward, scanPlaneDepthOffset);
			scanStart.copy(scanTarget).addScaledVector(scanCameraRight, scanPlaneOffscreenDistance);

			landingScene.scanPlane.position.copy(scanStart).lerp(scanTarget, scanPlaneProxy.t);
			landingScene.scanPlane.quaternion.copy(landingScene.camera.quaternion); // always faces the camera
		},
	}, SCAN_PLANE_START);

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

