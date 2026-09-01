import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Prototype only - not wired into the site's own scenes/timeline.
//
// Goal: the camera only ever sees a wall. The sun (a directional light) sits
// behind the camera and shines toward the wall at a slight angle, and the
// plant (public/models/shrub_02/) sits behind the camera too, fully outside
// its view frustum - so the only trace of it on screen is the shadow it
// throws onto the wall, swaying like it's alive in a breeze.
//
// Plant model: "Shrub 02" by Poly Haven (polyhaven.com/a/shrub_02), CC0 -
// free to use with no attribution required. Its leaves are real individual
// polygons rather than alpha-cutout texture cards, so the dappled shadow
// silhouette comes straight from the geometry.
//
// The plant's shadow doesn't land on the wall wherever the model's own
// pivot happens to be - it's solved for below (see PLACE THE PLANT) so the
// shadow lands centered on the wall regardless of the source file's native
// pivot/scale.

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const WALL_Z = -4;
const WALL_WIDTH = 34;
const WALL_HEIGHT = 20;
const WALL_CENTER_Y = 6;

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, WALL_CENTER_Y, 0);
camera.lookAt(0, WALL_CENTER_Y, WALL_Z);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// VSM (not PCFSoft) so the blur radius below is a real, independently-tunable
// softness rather than a fixed-width PCF filter tied to shadow map resolution -
// lets the map stay high-res (crisp silhouette) while the edges still go extra soft.
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

// Orbit controls are just for inspecting the setup - the camera starts framed
// dead-on at the wall, matching the brief.
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, WALL_CENTER_Y, WALL_Z);
controls.enableDamping = true;
controls.update();

// --- The wall - the only geometry the camera ever actually sees ---
const wallMat = new THREE.MeshStandardMaterial({ color: 0xe8e2d4, roughness: 0.95, metalness: 0 });
const wall = new THREE.Mesh(new THREE.PlaneGeometry(WALL_WIDTH, WALL_HEIGHT), wallMat);
wall.position.set(0, WALL_CENTER_Y, WALL_Z);
wall.receiveShadow = true;
scene.add(wall);

// Low ambient fill so the shadow reads as darker-than-lit rather than pure
// black - real bounce light would never leave a shadow fully unlit.
scene.add(new THREE.AmbientLight(0xffffff, 0.35));

// --- The sun - positioned behind the camera (camera sits at z=0, this sits
// at z=16), shining toward the wall at a slight downward/sideways angle
// rather than dead-on, so the plant's shadow reads as a real cast shadow
// instead of a flat, undistorted silhouette. ---
const sun = new THREE.DirectionalLight(0xfff4e0, 3);
const SUN_POSITION = new THREE.Vector3(5, 13, 16);
const SUN_TARGET = new THREE.Vector3(0, WALL_CENTER_Y, WALL_Z);
sun.position.copy(SUN_POSITION);
sun.target.position.copy(SUN_TARGET);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
// Tightened from 1/60 - the sun-to-wall distance here is only ~20-25 units
// even at the far end of the mouse sway, so the old near/far gave the depth
// buffer a lot of unused range. That wasted precision is what caused the
// diagonal banding ("shadow acne") across the wall at grazing sun angles.
sun.shadow.camera.near = 5;
sun.shadow.camera.far = 40;
// Tightened from ±20 to ±14 - the plant itself is only ~11 units across, so
// the wider box was spending most of the 4096px map on empty space around
// it. A tighter box puts more texels on the plant, which is what actually
// sharpens the leaf detail (the map resolution below can only do so much
// stretched over a bigger area).
sun.shadow.camera.left = -14;
sun.shadow.camera.right = 14;
sun.shadow.camera.top = 14;
sun.shadow.camera.bottom = -14;
sun.shadow.bias = 0.0006;
// Raised well past the default - at shallow/grazing sun angles (the mouse
// sway can push it there) a flat receiver like the wall is most prone to
// shadow acne, since the shadow map's texel footprint stretches out along
// the surface. normalBias pushes the sampled point along the wall's own
// normal to compensate; too small a value is exactly what produced the
// diagonal banding across the wall.
sun.shadow.normalBias = 0.4;
// VSM's own blur - radius is world/light-space blur width (in shadow-camera
// units), blurSamples is the two-pass blur's sample count (higher = smoother
// falloff, no extra banding, at some cost). Kept small so individual leaves
// stay legible - a radius anywhere near the plant's own size (it's roughly
// 11 units tall) blurs the whole silhouette into a single soft blob instead
// of a shadow made of leaves. A little above the bare minimum (1) also helps
// smooth over the same grazing-angle banding normalBias is fixing above.
sun.shadow.radius = 5;
sun.shadow.blurSamples = 8;
scene.add(sun);
scene.add(sun.target);

// Mouse sways the sun's position around its home spot (target stays fixed on
// the wall) - so moving the mouse tilts the light angle, and the plant's
// shadow drifts/stretches across the wall in response, like the sun itself
// moving in the sky. Tracked as a raw offset here and lerped toward in the
// animate loop below, so the sway is smoothed rather than snapping to the cursor.
const SUN_MOUSE_RANGE_X = 8;
const SUN_MOUSE_RANGE_Y = 5;
const SUN_MOUSE_DAMPING = 0.06;
let mouseNX = 0;
let mouseNY = 0;
window.addEventListener('mousemove', (e) => {
	mouseNX = (e.clientX / window.innerWidth) * 2 - 1;
	mouseNY = (e.clientY / window.innerHeight) * 2 - 1;
});

// Direction light travels in, from the sun toward the scene - used below to
// solve where the plant needs to sit for its shadow to land on the wall.
const sunDirection = new THREE.Vector3().subVectors(SUN_TARGET, SUN_POSITION).normalize();

// --- The plant - behind the camera (positive z, camera looks down -z) and
// therefore never in frame; only its shadow shows up. ---
const PLANT_Z = 9; // behind the camera (which sits at z=0)
const PLANT_TARGET_HEIGHT = 11; // world units - scaled to this regardless of the source model's native size
const PLANT_ROTATION_Y_DEG = 120; // spin the model around its up axis - tweak this to face it the way you want

const plantGroup = new THREE.Group();
scene.add(plantGroup);

// Wind sway - a cheap per-vertex sine displacement, phase-offset by each
// vertex's own local position so different leaf clusters swing out of sync
// instead of the whole bush rocking as one rigid slab. Applied to BOTH the
// mesh's real material and a matching custom shadow-depth material - the
// mesh itself is never actually seen (it sits out of frame), so without the
// depth material carrying the same displacement, the shadow would stay
// frozen while the invisible mesh swayed underneath it.
const windUniforms = {
	uTime: { value: 0 },
	uAmplitude: { value: 0.05 }, // set for real below, once the model's own local size is known
};
const WIND_SPEED = 1.6;
const windDisplacementGLSL = `
	float windPhase = position.x * 0.9 + position.z * 0.7 + position.y * 1.3;
	float sway = sin(uTime * ${WIND_SPEED.toFixed(2)} + windPhase) * uAmplitude
		+ sin(uTime * ${(WIND_SPEED * 2.3).toFixed(2)} + windPhase * 2.1) * uAmplitude * 0.35;
	transformed.x += sway;
	transformed.z += sway * 0.6;
`;
function applyWindShader(material) {
	material.onBeforeCompile = (shader) => {
		shader.uniforms.uTime = windUniforms.uTime;
		shader.uniforms.uAmplitude = windUniforms.uAmplitude;
		shader.vertexShader = `uniform float uTime;\nuniform float uAmplitude;\n${shader.vertexShader}`
			.replace('#include <begin_vertex>', `#include <begin_vertex>\n${windDisplacementGLSL}`);
	};
}

new GLTFLoader().load(
	'../models/shrub_02/shrub_02.gltf',
	(gltf) => {
		const model = gltf.scene;
		model.rotation.y = THREE.MathUtils.degToRad(PLANT_ROTATION_Y_DEG);

		// Wind amplitude is set relative to the model's own local size, so it
		// scales sensibly regardless of what PLANT_TARGET_HEIGHT ends up scaling it to.
		const rawBox = new THREE.Box3().setFromObject(model);
		windUniforms.uAmplitude.value = rawBox.getSize(new THREE.Vector3()).length() * 0.02;

		model.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = true;
				applyWindShader(child.material);

				const depthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
				applyWindShader(depthMaterial);
				child.customDepthMaterial = depthMaterial;
			}
		});

		// Normalize scale off the model's own bounding box, so the shadow it
		// throws is a consistent, legible size no matter the source model's native units.
		const rawHeight = rawBox.max.y - rawBox.min.y || 1;
		const scale = PLANT_TARGET_HEIGHT / rawHeight;
		model.scale.setScalar(scale);
		plantGroup.add(model);

		// PLACE THE PLANT: solve for the group's (x, y) so the model's own
		// bounding-box center - wherever the source model's own pivot happens to
		// leave it - projects, along the sun's direction, onto the wall's
		// center. z is pinned to PLANT_Z directly (decoupled from the model's
		// local center) so "behind the camera" stays exact regardless of model depth.
		const localBox = new THREE.Box3().setFromObject(model); // model's own bbox, group still at origin
		const localCenter = localBox.getCenter(new THREE.Vector3());

		const groupZ = PLANT_Z - localCenter.z;
		const t = (WALL_Z - PLANT_Z) / sunDirection.z;
		const groupX = -localCenter.x - sunDirection.x * t;
		const groupY = WALL_CENTER_Y - localCenter.y - sunDirection.y * t;
		plantGroup.position.set(groupX, groupY, groupZ);

		console.log('[plant-shadow] plant placed at', plantGroup.position, '- shadow should land at wall center');
	},
	undefined,
	(err) => console.error('[plant-shadow] failed to load shrub_02.gltf', err),
);

// --- Debug helpers, off by default - press "h" to toggle ---
const sunHelper = new THREE.DirectionalLightHelper(sun, 2);
const shadowCameraHelper = new THREE.CameraHelper(sun.shadow.camera);
sunHelper.visible = false;
shadowCameraHelper.visible = false;
scene.add(sunHelper, shadowCameraHelper);
window.addEventListener('keydown', (e) => {
	if (e.key !== 'h') return;
	sunHelper.visible = !sunHelper.visible;
	shadowCameraHelper.visible = sunHelper.visible;
});

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
	requestAnimationFrame(animate);

	windUniforms.uTime.value = clock.getElapsedTime();

	const sunTargetX = SUN_POSITION.x + mouseNX * SUN_MOUSE_RANGE_X;
	const sunTargetY = SUN_POSITION.y + mouseNY * SUN_MOUSE_RANGE_Y;
	sun.position.x = THREE.MathUtils.lerp(sun.position.x, sunTargetX, SUN_MOUSE_DAMPING);
	sun.position.y = THREE.MathUtils.lerp(sun.position.y, sunTargetY, SUN_MOUSE_DAMPING);

	sunHelper.update();
	controls.update();
	renderer.render(scene, camera);
}
animate();

window.__proto = { scene, camera, renderer, controls, wall, sun, plantGroup };
