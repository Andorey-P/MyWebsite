import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Prototype only - not wired into the site's own scenes/timeline.
//
// Step 2 (reference: door + light-stairs poster): the door plane from step 1,
// now wide enough to match the staircase that'll eventually spill out of it,
// plus a floor plane perpendicular to it (the landing just past the
// threshold) that grows in right after the door finishes opening. Now a real
// 3D scene (perspective camera + OrbitControls) instead of the flat
// orthographic view step 1 used, since "perpendicular" only reads once
// there's real depth to look into.

gsap.registerPlugin(ScrollTrigger);

const DOOR_WIDTH = 220; // matches the width the stairs will spill out at
const DOOR_HEIGHT = 260;
const DOOR_DEPTH = 150; // how far the hollow doorway tunnel stretches toward +Z
const FLOOR_WIDTH = DOOR_WIDTH;
const FLOOR_DEPTH = 320;
const FLOOR_TARGET_SCALE = 0.5; // the floor's own tween below only opens it halfway
const FLOOR_ACTUAL_DEPTH = FLOOR_DEPTH * FLOOR_TARGET_SCALE;

const STAIR_COUNT = 9;
const STAIR_WIDTH = FLOOR_WIDTH;
const STAIR_RUN = 46; // each tread's own depth (Z)
const STAIR_DROP = 34; // how far down (Y) each successive tread sits - the "riser" gap reads as the dark stripe between treads
const STAIR_DURATION = 0.12;
const STAIR_STAGGER = 0.02; // cascades the treads open one after another, not all at once

// A landing at the bottom of the flight, same idea as a real staircase's
// landing - flat (no Y drop), sitting right after the last stair.
const SECOND_FLOOR_WIDTH = STAIR_WIDTH;
const SECOND_FLOOR_DEPTH = STAIR_WIDTH; // its own "length" matches the stairs' width, not FLOOR_DEPTH
const SECOND_FLOOR_DURATION = 0.15;

// Second flight: same tread proportions as the first, just running toward
// +X instead of +Z, starting one step below the second floor.
const STAIR2_COUNT = STAIR_COUNT;
const STAIR2_WIDTH = STAIR_WIDTH; // spans across Z, same as the first flight's own width
const STAIR2_RUN = STAIR_RUN;
const STAIR2_DROP = STAIR_DROP;
const STAIR2_DURATION = STAIR_DURATION;
const STAIR2_STAGGER = STAIR_STAGGER;

const DOOR_DURATION = 0.3;
const FLOOR_DURATION = 0.25;
// "1 duration unit = 1 viewport height" of scroll - setPageHeight() below
// makes sure the page is always tall enough to actually scroll this far.
const TOTAL_DURATION = DOOR_DURATION + FLOOR_DURATION
	+ STAIR_STAGGER * (STAIR_COUNT - 1) + STAIR_DURATION
	+ SECOND_FLOOR_DURATION
	+ STAIR2_STAGGER * (STAIR2_COUNT - 1) + STAIR2_DURATION;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(350, 180, 800);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, -DOOR_HEIGHT * 0.55, FLOOR_DEPTH * 0.25);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
// Wheel is the page's own scroll input (drives the door/floor timeline
// below) - without this, OrbitControls intercepts it for zoom instead,
// which both fights the scroll and yanks the camera around. Drag-to-rotate
// still works.
controls.enableZoom = false;
controls.update();

// Door: 4 separate plane meshes (left/top/right/bottom - no front/back caps,
// so it reads as a hollow tunnel) plus one extra occluder plane duplicating
// the right wall. Every plane is built the same simple way: a PlaneGeometry
// centered on the origin, rotated with a plain mesh.rotation so its default
// normal (0,0,1) ends up pointing the specific direction called for, then
// positioned with mesh.position. No geometry-level translate/scale/winding
// tricks - what you see in each mesh's own rotation/position is the whole
// story.
//
// door itself is a Group (not a mesh) so `door.scale.z` still drives the
// same open-on-scroll animation as before, applied to all 5 children at once.
const door = new THREE.Group();
door.scale.z = 0;
scene.add(door);

const wallMaterial = () => new THREE.MeshBasicMaterial({ color: 0xffffff });

// Left plane - normal toward +X.
const leftPlane = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_DEPTH, DOOR_HEIGHT), wallMaterial());
leftPlane.rotation.y = Math.PI / 2;
leftPlane.position.set(-DOOR_WIDTH / 2, -DOOR_HEIGHT / 2, DOOR_DEPTH / 2);
door.add(leftPlane);

// Top plane - normal toward -Y.
const topPlane = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_DEPTH), wallMaterial());
topPlane.rotation.x = Math.PI / 2;
topPlane.position.set(0, 0, DOOR_DEPTH / 2);
door.add(topPlane);

// Right plane - normal toward -X, but transparent + occluding. The "correct"
// way to do this is colorWrite: false (never paints its own color) with
// depthWrite still on, so it blocks anything behind it via ordinary depth
// testing without ever drawing itself - tried that first, but it didn't
// reliably occlude here (confirmed with a color-coded test: a blue plane
// placed behind it showed through instead of being blocked, even though
// depthWrite was on). Rather than depend on that, this is an ordinary fully
// opaque plane - ordinary colorWrite:true rendering, so occlusion is exactly
// as reliable as any other solid object in the scene - just colored to match
// scene.background (black), so it reads as invisible without needing any
// masking trick at all.
const rightPlane = new THREE.Mesh(
	new THREE.PlaneGeometry(DOOR_DEPTH, DOOR_HEIGHT),
	new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }),
);
rightPlane.rotation.y = -Math.PI / 2;
rightPlane.position.set(DOOR_WIDTH / 2, -DOOR_HEIGHT / 2, DOOR_DEPTH / 2);
door.add(rightPlane);

// Bottom plane - normal toward +Y.
const bottomPlane = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_DEPTH), wallMaterial());
bottomPlane.rotation.x = -Math.PI / 2;
bottomPlane.position.set(0, -DOOR_HEIGHT, DOOR_DEPTH / 2);
door.add(bottomPlane);

// Floor: same "pivot at the near edge, grow via scale.y" trick as the door,
// but rotated flat so growth reads as extending away from the threshold
// instead of downward. Positioned so its pivot sits exactly at the door's
// own bottom edge.
const floorGeometry = new THREE.PlaneGeometry(FLOOR_WIDTH, FLOOR_DEPTH);
floorGeometry.translate(0, -FLOOR_DEPTH / 2, 0);
const floor = new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
floor.rotation.x = -Math.PI / 2; // lie flat, growth extends toward +Z (out into the room, toward camera)
floor.position.set(0, -DOOR_HEIGHT, 0);
floor.scale.y = 0;
// scene.add(floor);

// Stairs: same "pivot at the near edge, grow via scale.y" trick as the floor,
// chained one after another - each tread's own pivot sits exactly where the
// previous one ends, so they only look continuous once every earlier tread
// is fully grown. Positions are computed against the floor's actual (half-
// open) length, not its full geometry, and each step drops in Y before
// advancing in Z, so the empty gap between treads reads as the riser's shadow.
const stairs = [];
let stairCursorY = -DOOR_HEIGHT;
let stairCursorZ = FLOOR_ACTUAL_DEPTH;
for (let i = 0; i < STAIR_COUNT; i++) {
	const stairGeometry = new THREE.PlaneGeometry(STAIR_WIDTH, STAIR_RUN);
	stairGeometry.translate(0, -STAIR_RUN / 2, 0);
	const stair = new THREE.Mesh(stairGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
	stair.rotation.x = -Math.PI / 2;
	stairCursorY -= STAIR_DROP;
	stair.position.set(0, stairCursorY, stairCursorZ);
	stair.scale.y = 0;
	scene.add(stair);
	stairs.push(stair);
	stairCursorZ += STAIR_RUN;
}

// Second floor: really just a 10th step - same STAIR_DROP as every other
// stair (so there's a real riser gap between it and the last tread, instead
// of the last stair reading as continuing flat into it), just with a longer
// run so it reads as a landing rather than another tread.
stairCursorY -= STAIR_DROP;
const secondFloorGeometry = new THREE.PlaneGeometry(SECOND_FLOOR_WIDTH, SECOND_FLOOR_DEPTH);
secondFloorGeometry.translate(0, -SECOND_FLOOR_DEPTH / 2, 0);
const secondFloor = new THREE.Mesh(secondFloorGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
secondFloor.rotation.x = -Math.PI / 2;
secondFloor.position.set(0, stairCursorY, stairCursorZ);
secondFloor.scale.y = 0;
scene.add(secondFloor);

// Second flight: same "pivot at the near edge, grow via scale" trick, but
// grown via scale.x instead of scale.y, and rotated the same single
// rotation.x = -Math.PI/2 as everything else - since that rotation never
// touches the local X axis, growth stays mapped straight to world +X
// instead of needing a second rotation to redirect it. Starts one step
// (STAIR2_DROP) below the second floor: in X, flush with the floor's own
// +X edge (not its center - the floor's width is centered on X=0, so its
// edge sits at +SECOND_FLOOR_WIDTH/2) so the flight reads as continuing off
// the landing's edge rather than erupting out of its middle; in Z, centered
// on the floor's own Z span (the floor's pivot sits at its NEAR Z edge, not
// its center).
const stairs2 = [];
let stair2CursorY = secondFloor.position.y;
let stair2CursorX = SECOND_FLOOR_WIDTH / 2;
const stair2Z = secondFloor.position.z + SECOND_FLOOR_DEPTH / 2;
for (let i = 0; i < STAIR2_COUNT; i++) {
	const stair2Geometry = new THREE.PlaneGeometry(STAIR2_RUN, STAIR2_WIDTH);
	stair2Geometry.translate(STAIR2_RUN / 2, 0, 0);
	const stair2 = new THREE.Mesh(stair2Geometry, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
	stair2.rotation.x = -Math.PI / 2;
	stair2CursorY -= STAIR2_DROP;
	stair2.position.set(stair2CursorX, stair2CursorY, stair2Z);
	stair2.scale.x = 0;
	scene.add(stair2);
	stairs2.push(stair2);
	stair2CursorX += STAIR2_RUN;
}

// The scroll-driven timeline below needs TOTAL_DURATION viewport-heights of
// room to scroll through; without this the page runs out of scroll distance
// before the timeline (and the last few stairs) ever reaches its end.
function setPageHeight() {
	document.body.style.height = (window.innerHeight * (1 + TOTAL_DURATION)) + 'px';
}

function resize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	setPageHeight();
	ScrollTrigger.refresh();
}
resize();
window.addEventListener('resize', resize);

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
animate();

window.__debug = { scene, camera, controls, door, floor, stairs, secondFloor, stairs2, renderer };

const tl = gsap.timeline({
	scrollTrigger: {
		trigger: document.body,
		start: 'top top',
		end: '+=' + window.innerHeight * TOTAL_DURATION,
		scrub: 1,
	},
});

tl.to(door.scale, {
	z: 1,
	ease: 'expo.inOut', // big ease - reads as barely moving, then a fast snap open, then settling
	duration: DOOR_DURATION,
});
// No position arg - starts right where the door tween above ends.
tl.to(floor.scale, {
	y: FLOOR_TARGET_SCALE,
	ease: 'expo.inOut',
	duration: FLOOR_DURATION,
});
// Cascades down the staircase, one tread after another, rather than all
// treads growing in unison.
tl.to(stairs.map((stair) => stair.scale), {
	y: 1,
	ease: 'expo.inOut',
	duration: STAIR_DURATION,
	stagger: STAIR_STAGGER,
});
// The landing at the bottom of the flight, right after the last stair.
tl.to(secondFloor.scale, {
	y: 1,
	ease: 'expo.inOut',
	duration: SECOND_FLOOR_DURATION,
});
// Second flight, cascading toward +X the same way the first cascaded toward +Z.
tl.to(stairs2.map((stair) => stair.scale), {
	x: 1,
	ease: 'expo.inOut',
	duration: STAIR2_DURATION,
	stagger: STAIR2_STAGGER,
});
