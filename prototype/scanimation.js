import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Prototype only - not wired into the site's own scenes/timeline.
//
// Tests the real scanimation asset (public/textures/scanimation.png) directly, per
// https://parametrichouse.com/scanimation/: "the screen is composed of vertical black
// bars with clear spaces between them; the bar width must be some multiple of the clear
// spaces". Measured straight from the source PNG (1254x1254px) via autocorrelation
// (far more robust than reading individual black/white runs by eye, which are noisy row
// to row) across several rows, both near the ring's top and deep past its hollow center:
// the pitch is a rock-solid 36px everywhere. The bar:gap SPLIT of that pitch, though,
// isn't a clean multiple - duty cycle (white fraction) varies row to row from ~0.34 to
// ~0.56, averaging close to 0.5, because this texture bakes in the interlaced animation
// frames themselves (per the article, that variation IS the content, not measurement
// noise). An even 50/50 split is the best simple read of that average, and also lines up
// with this most likely being a 2-frame interlace (matching the plain back-and-forth
// slide this prototype already does).
//
// Two separate objects, side by side (not combined yet):
//  - a fixed shutter grid, spaced off that measured/multiplied gap
//  - the actual PNG as a red cutout (alphaMap) plane, sliding side to side on its own
//    so the source animation itself is visible before testing it through the grid.

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2ede2);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 14);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.9));
const key = new THREE.DirectionalLight(0xffffff, 0.6);
key.position.set(4, 6, 8);
scene.add(key);

// --- Measured off the source texture (see comment above) ---
const TEXTURE_PX = 1254;
const PITCH_PX = 36; // confirmed via autocorrelation, consistent across every row sampled
const GAP_PX = PITCH_PX / 2; // clear space - even split, see comment above
const BAR_PX = PITCH_PX / 2; // opaque bar
const PLANE_SIZE = 4; // world units the 1254px texture is displayed at, for both objects below
const PX_TO_WORLD = PLANE_SIZE / TEXTURE_PX;
const GAP_WORLD = GAP_PX * PX_TO_WORLD;
const BAR_WORLD = BAR_PX * PX_TO_WORLD;
const PITCH_WORLD = GAP_WORLD + BAR_WORLD;

// --- Shutter grid, spaced off the measured pitch above - centered at the origin ---
const shutterGroup = new THREE.Group();
scene.add(shutterGroup);

const SHUTTER_HEIGHT = PLANE_SIZE * 1.1;
const SHUTTER_COUNT = Math.ceil(PLANE_SIZE / PITCH_WORLD) + 2;
const shutterGeo = new THREE.BoxGeometry(BAR_WORLD, SHUTTER_HEIGHT, 0.08);
const shutterMat = new THREE.MeshStandardMaterial({ color: 0x0c0a08, roughness: 0.5 });
const shutterMesh = new THREE.InstancedMesh(shutterGeo, shutterMat, SHUTTER_COUNT);
{
	const m = new THREE.Matrix4();
	for (let i = 0; i < SHUTTER_COUNT; i++) {
		const x = (i - (SHUTTER_COUNT - 1) / 2) * PITCH_WORLD;
		m.setPosition(x, 0, 0);
		shutterMesh.setMatrixAt(i, m);
	}
	shutterMesh.instanceMatrix.needsUpdate = true;
}
shutterGroup.add(shutterMesh);

// --- The actual scanimation.png as a red cutout, placed beside the grid ---
const texLoader = new THREE.TextureLoader();
const scanTexture = texLoader.load('../textures/scanimation.png');

const cutoutGeo = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE);
const cutoutMat = new THREE.MeshBasicMaterial({
	color: 0xd91e18, // red
	alphaMap: scanTexture,
	transparent: true,
	alphaTest: 0.5, // hard cutout, not a soft blend
	side: THREE.DoubleSide,
});
const cutoutPlane = new THREE.Mesh(cutoutGeo, cutoutMat);
const CUTOUT_HOME_X = -PLANE_SIZE * .2; // to the left of the grid, not overlapping it
cutoutPlane.position.set(CUTOUT_HOME_X, 0, -0.1); // slightly in front of the shutter grid
scene.add(cutoutPlane);

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// Only the cutout plane moves - a simple side-to-side glide, so its own baked-in
// animation frames are visible in isolation before testing them through the shutter.
const SLIDE_AMPLITUDE = PLANE_SIZE * 0.35;
const SLIDE_SPEED = 0.6; // radians/sec fed into the sine
let sliding = true;
const clock = new THREE.Clock();
function animate() {
	requestAnimationFrame(animate);
	if (sliding) {
		const t = clock.getElapsedTime();
		cutoutPlane.position.x = CUTOUT_HOME_X + Math.sin(t * SLIDE_SPEED) * SLIDE_AMPLITUDE;
	}
	controls.update();
	renderer.render(scene, camera);
}
animate();

window.__setSliding = (v) => { sliding = v; };
window.__setSlideX = (offset) => {
	cutoutPlane.position.x = CUTOUT_HOME_X + offset;
	renderer.render(scene, camera);
};

window.__proto = {
	scene, camera, renderer, controls,
	shutterGroup, shutterMesh, cutoutPlane, scanTexture,
	measured: { GAP_PX, BAR_PX, PITCH_WORLD, GAP_WORLD, BAR_WORLD },
};
