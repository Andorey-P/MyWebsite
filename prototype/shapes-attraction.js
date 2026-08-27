import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PALETTE } from '../src/materials/palette.js';

// Prototype only - not wired into the site's own scenes/timeline.
//
// 3D die-cut shapes (Bronowski "The Ascent of Man" cover reference) held in a
// constantly-attracting swarm at the world origin, with real rigid-body collision
// (cannon-es) so they physically jostle and pack rather than passing through each
// other. The mouse casts a ray into the scene; anything close to that ray gets
// pushed away, then drifts back once the ray moves on. Rendered as one InstancedMesh
// per shape type (not one mesh per shape) so a large swarm stays cheap to draw.

// --- tuning -----------------------------------------------------------------
const SHAPE_COUNT = 140;
const ATTRACT_K = 0.7;        // central spring force strength (force = k * displacement)
const LINEAR_DAMPING = 0.88;  // cannon per-body velocity damping (0..1) - heavy drag, slow/languid drift
const ANGULAR_DAMPING = 1;  // kills contact-induced tumbling quickly instead of letting it spin up
const REPEL_RADIUS = 8;       // world units, distance from the mouse ray - covers most of the settled cluster's own ~7-unit radius, so a center hover reads as the whole pile pushing apart, not just a thin core
const REPEL_STRENGTH = 140;
const SPAWN_RADIUS = 26;      // shapes spawn on a shell this far out and fly inward

const SHAPE_COLORS = [
	PALETTE.brick, PALETTE.slate, PALETTE.ochre, PALETTE.sage, PALETTE.clay,
	PALETTE.ink, PALETTE.ink, // ink weighted higher - reads as the reference's dark pieces
	PALETTE.signalRed, // rare saturated accent
];

// --- renderer / scene ---------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(PALETTE.paper);
scene.fog = new THREE.Fog(PALETTE.paper, 30, 70);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 34);
camera.lookAt(0, 0, 0);

scene.add(new THREE.AmbientLight(0xfff1da, 0.55));
const key = new THREE.DirectionalLight(0xfff1da, 1.1);
key.position.set(-8, 12, 10);
scene.add(key);
const rim = new THREE.DirectionalLight(PALETTE.paper, 0.4);
rim.position.set(6, -4, -10);
scene.add(rim);

function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resize);
resize();

// --- physics world --------------------------------------------------------
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // no fall - shapes are held only by central attraction
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = false;

const contactMaterial = new CANNON.Material('shape');
world.defaultContactMaterial = new CANNON.ContactMaterial(contactMaterial, contactMaterial, {
	friction: 0.3,
	restitution: 0.15, // low bounce - contact energy bleeds off instead of feeding spin/velocity back in
});

// --- shape geometry / collider definitions --------------------------------
// Convex hulls for the platonic solids cannon-es has no built-in primitive for.
function octahedronHull(r) {
	const v = [
		new CANNON.Vec3(r, 0, 0), new CANNON.Vec3(-r, 0, 0),
		new CANNON.Vec3(0, r, 0), new CANNON.Vec3(0, -r, 0),
		new CANNON.Vec3(0, 0, r), new CANNON.Vec3(0, 0, -r),
	];
	const faces = [
		[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
		[2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5],
	];
	return new CANNON.ConvexPolyhedron({ vertices: v, faces });
}

function tetrahedronHull(r) {
	const v = [
		new CANNON.Vec3(r, r, r), new CANNON.Vec3(r, -r, -r),
		new CANNON.Vec3(-r, r, -r), new CANNON.Vec3(-r, -r, r),
	];
	const faces = [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]];
	return new CANNON.ConvexPolyhedron({ vertices: v, faces });
}

// One shared plus-shape geometry (two boxes merged) for the "cross" type -
// collision uses its bounding box, since cannon-es colliders must be convex and
// a plus's notches aren't.
const crossGeometry = mergeGeometries([
	new THREE.BoxGeometry(1, 0.34, 0.34),
	new THREE.BoxGeometry(0.34, 1, 0.34),
]);

// Each type: how to build its Three geometry (unit-scale, actual size applied via
// instance matrix) and its cannon-es collision shape at a given radius-ish size.
const TYPES = {
	sphere: {
		weight: 3,
		geometry: new THREE.SphereGeometry(0.5, 32, 24),
		smooth: true, // curved surface - flat shading would facet it into a low-poly ball
		makeShape: (s) => new CANNON.Sphere(s * 0.5),
	},
	dot: {
		weight: 2,
		geometry: new THREE.SphereGeometry(0.5, 20, 16),
		smooth: true,
		makeShape: (s) => new CANNON.Sphere(s * 0.5),
	},
	box: {
		weight: 2,
		geometry: new THREE.BoxGeometry(1, 1, 1),
		makeShape: (s) => new CANNON.Box(new CANNON.Vec3(s * 0.5, s * 0.5, s * 0.5)),
	},
	octahedron: {
		weight: 1.5,
		geometry: new THREE.OctahedronGeometry(0.65),
		makeShape: (s) => octahedronHull(s * 0.65),
	},
	tetrahedron: {
		weight: 1.2,
		geometry: new THREE.TetrahedronGeometry(0.65),
		makeShape: (s) => tetrahedronHull(s * 0.4),
	},
	cone: {
		weight: 1.5,
		geometry: new THREE.ConeGeometry(0.5, 1, 24),
		smooth: true, // smooths the cone's round lateral surface - its flat base cap stays a hard edge either way
		// cannon-es has no dedicated cone - a cylinder with a near-zero top radius
		// approximates one closely enough for a decorative swarm.
		makeShape: (s) => new CANNON.Cylinder(0.001, s * 0.5, s, 10),
	},
	torus: {
		weight: 1.5,
		geometry: new THREE.TorusGeometry(0.4, 0.16, 16, 32),
		smooth: true,
		// Approximated as a sphere at the torus's outer radius - true torus collision
		// isn't a convex primitive; close enough for shapes that are purely decorative.
		makeShape: (s) => new CANNON.Sphere(s * 0.56),
	},
	cross: {
		weight: 1.2,
		geometry: crossGeometry,
		makeShape: (s) => new CANNON.Box(new CANNON.Vec3(s * 0.5, s * 0.5, s * 0.17)),
	},
};
const TYPE_KEYS = Object.keys(TYPES);

function pickWeighted() {
	const total = TYPE_KEYS.reduce((sum, k) => sum + TYPES[k].weight, 0);
	let r = Math.random() * total;
	for (const k of TYPE_KEYS) {
		r -= TYPES[k].weight;
		if (r <= 0) return k;
	}
	return TYPE_KEYS[TYPE_KEYS.length - 1];
}

// --- build shapes: physics bodies + one InstancedMesh per type --------------
// Each shape's type is picked exactly once, into this list - both the per-type
// InstancedMesh capacity below and the body/instance creation loop read from it,
// so the two stay in sync (picking independently twice would let the random draws
// disagree and overflow a mesh's allocated instance count).
const pickedTypes = Array.from({ length: SHAPE_COUNT }, () => pickWeighted());
const countByType = {};
for (const type of pickedTypes) countByType[type] = (countByType[type] || 0) + 1;

const shapes = []; // { type, body, instanceIndex }
const instancedMeshes = {};
const nextIndexByType = {};
for (const type of TYPE_KEYS) {
	const count = countByType[type] || 0;
	if (count === 0) continue;
	const material = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0, flatShading: !TYPES[type].smooth });
	const mesh = new THREE.InstancedMesh(TYPES[type].geometry, material, count);
	mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
	scene.add(mesh);
	instancedMeshes[type] = mesh;
	nextIndexByType[type] = 0;
}

const dummy = new THREE.Object3D();
const color = new THREE.Color();

for (let i = 0; i < SHAPE_COUNT; i++) {
	const type = pickedTypes[i];
	const size = type === 'dot' ? 0.55 + Math.random() * 0.4 : 1.1 + Math.random() * 2.1;
	const c = SHAPE_COLORS[(Math.random() * SHAPE_COLORS.length) | 0];

	// Spawn on a sphere shell around the origin, flying inward once attraction kicks in.
	const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
	const spawnPos = dir.multiplyScalar(SPAWN_RADIUS * (0.6 + Math.random() * 0.6));

	const body = new CANNON.Body({
		mass: size,
		shape: TYPES[type].makeShape(size),
		position: new CANNON.Vec3(spawnPos.x, spawnPos.y, spawnPos.z),
		material: contactMaterial,
		linearDamping: LINEAR_DAMPING,
		angularDamping: ANGULAR_DAMPING,
	});
	body.quaternion.setFromEuler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
	world.addBody(body);

	const instanceIndex = nextIndexByType[type]++;
	const mesh = instancedMeshes[type];
	dummy.position.set(spawnPos.x, spawnPos.y, spawnPos.z);
	dummy.scale.setScalar(size);
	dummy.updateMatrix();
	mesh.setMatrixAt(instanceIndex, dummy.matrix);
	mesh.setColorAt(instanceIndex, color.set(c));

	shapes.push({ type, size, body, instanceIndex });
}
for (const mesh of Object.values(instancedMeshes)) {
	mesh.instanceColor.needsUpdate = true;
}

// --- mouse ray repulsion ------------------------------------------------------
const pointerNDC = new THREE.Vector2(-10, -10); // parked off-screen until first move
const raycaster = new THREE.Raycaster();
let pointerActive = false;

window.addEventListener('pointermove', (e) => {
	pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
	pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
	pointerActive = true;
});
window.addEventListener('pointerleave', () => { pointerActive = false; });

const rayOrigin = new THREE.Vector3();
const rayDir = new THREE.Vector3();
const toBody = new THREE.Vector3();
const closestPoint = new THREE.Vector3();
const pushDir = new THREE.Vector3();

// Pushes any body whose position falls within REPEL_RADIUS of the mouse's 3D
// sightline (not just its depth-plane projection), so the repulsion reads as a
// beam through the scene rather than a flat disc at one fixed depth.
function applyPointerRepulsion() {
	if (!pointerActive) return;
	raycaster.setFromCamera(pointerNDC, camera);
	rayOrigin.copy(raycaster.ray.origin);
	rayDir.copy(raycaster.ray.direction);

	for (const s of shapes) {
		const p = s.body.position;
		toBody.set(p.x, p.y, p.z).sub(rayOrigin);
		const t = Math.max(0, toBody.dot(rayDir));
		closestPoint.copy(rayOrigin).addScaledVector(rayDir, t);
		pushDir.set(p.x, p.y, p.z).sub(closestPoint);
		const dist = pushDir.length();
		if (dist < REPEL_RADIUS && dist > 0.0001) {
			const falloff = 1 - dist / REPEL_RADIUS;
			const force = REPEL_STRENGTH * falloff * falloff;
			pushDir.multiplyScalar(force / dist);
			s.body.applyForce(new CANNON.Vec3(pushDir.x, pushDir.y, pushDir.z), s.body.position);
		}
	}
}

// --- animation loop ------------------------------------------------------
const centerForce = new CANNON.Vec3();
let lastTime = performance.now();

function animate(now) {
	const dt = Math.min((now - lastTime) / 1000, 1 / 30);
	lastTime = now;

	for (const s of shapes) {
		const p = s.body.position;
		centerForce.set(-p.x, -p.y, -p.z).scale(ATTRACT_K * s.body.mass, centerForce);
		s.body.applyForce(centerForce, s.body.position);
	}
	applyPointerRepulsion();

	world.step(1 / 60, dt, 5);

	for (const s of shapes) {
		const mesh = instancedMeshes[s.type];
		const p = s.body.position;
		const q = s.body.quaternion;
		dummy.position.set(p.x, p.y, p.z);
		dummy.quaternion.set(q.x, q.y, q.z, q.w);
		dummy.scale.setScalar(s.size);
		dummy.updateMatrix();
		mesh.setMatrixAt(s.instanceIndex, dummy.matrix);
	}
	for (const mesh of Object.values(instancedMeshes)) {
		mesh.instanceMatrix.needsUpdate = true;
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
