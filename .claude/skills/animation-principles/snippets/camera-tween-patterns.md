# Camera Tween Patterns

Copy-paste GSAP-driven and native Three.js camera movement recipes for the design decisions in [docs/camera-cinematography.md](../docs/camera-cinematography.md). All assume `camera` is a `THREE.PerspectiveCamera` updated within the app's single shared render tick — where that tick lives is `javascript-architecture`/`threejs-website-reviewer` territory, not this doc's.

## Simple dolly (button/state-triggered, not scroll-scrubbed)

```js
function dollyTo(targetPosition, targetLookAt, { duration = 2.2 } = {}) {
  const tl = gsap.timeline();
  tl.to(camera.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration,
    ease: 'power2.inOut', // moving through/toward a new framing — see docs/camera-cinematography.md#camera-easing
  }, 0);

  // Tween a proxy vector for lookAt, matched duration/easing to position (avoid orientation/position desync)
  const lookAtProxy = currentLookAt.clone();
  tl.to(lookAtProxy, {
    x: targetLookAt.x,
    y: targetLookAt.y,
    z: targetLookAt.z,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => camera.lookAt(lookAtProxy),
  }, 0);

  return tl;
}
```

## Orbit around a target (product/showcase reveal)

```js
function orbitAroundTarget(target, { radius = 4, fromAngle = 0, toAngle = Math.PI * 0.6, duration = 3 }) {
  const state = { angle: fromAngle };
  return gsap.to(state, {
    angle: toAngle,
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.position.x = target.x + Math.sin(state.angle) * radius;
      camera.position.z = target.z + Math.cos(state.angle) * radius;
      camera.position.y = target.y + 1.2; // fixed height offset, or tween this too for a rising orbit
      camera.lookAt(target);
    },
  });
}
```

## Path-based composite move (position + independent look-target along curves)

```js
const positionCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2, 10),
  new THREE.Vector3(3, 1.5, 4),
  new THREE.Vector3(1, 0.8, 1.2),
], false, 'catmullrom', 0.5);

const lookAtCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0.5, 1, 0),
  new THREE.Vector3(0, 0.5, 0),
], false, 'catmullrom', 0.5);

function playCameraPath({ duration = 3, scrollTrigger = null } = {}) {
  const progress = { t: 0 };
  return gsap.to(progress, {
    t: 1,
    duration: scrollTrigger ? undefined : duration,
    ease: scrollTrigger ? 'none' : 'power2.inOut', // scrub supplies easing when scroll-driven
    scrollTrigger,
    onUpdate: () => {
      camera.position.copy(positionCurve.getPointAt(progress.t));
      camera.lookAt(lookAtCurve.getPointAt(progress.t));
    },
  });
}

// Button-triggered (fixed duration):
playCameraPath({ duration: 3 });

// Scroll-scrubbed (progress driven by scroll position):
playCameraPath({
  scrollTrigger: { trigger: '.camera-sequence', scrub: 0.8, start: 'top top', end: '+=200%' },
});
```

## Hard cut, masked by a DOM transition

```js
function cutCameraTo(position, lookAt, maskEl) {
  const tl = gsap.timeline();
  tl.to(maskEl, { opacity: 1, duration: 0.25, ease: 'power1.inOut' })
    .call(() => {
      camera.position.copy(position);
      camera.lookAt(lookAt);
    })
    .to(maskEl, { opacity: 0, duration: 0.3, ease: 'power1.inOut', delay: 0.05 });
  return tl;
}
```
See [docs/camera-cinematography.md § cut vs. move](../docs/camera-cinematography.md#cut-vs-move) for when a cut (not a move) is the right call.

## FOV rack as a storytelling accent (paired with a dolly)

```js
function dollyWithFovRack(targetPosition, targetFov, { duration = 2.2 } = {}) {
  const tl = gsap.timeline();
  tl.to(camera.position, { ...targetPosition, duration, ease: 'power2.inOut' }, 0)
    .to(camera, {
      fov: targetFov, // keep the delta modest: 10-20 degrees total, see docs/camera-cinematography.md
      duration,
      ease: 'power2.inOut',
      onUpdate: () => camera.updateProjectionMatrix(),
    }, 0);
  return tl;
}
```

## Ambient idle drift (static-feeling section, subtle life)

```js
function idleCameraDrift() {
  const basePosition = camera.position.clone();
  gsap.to(camera.position, {
    x: basePosition.x + 0.15,
    y: basePosition.y + 0.08,
    duration: 6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}
```
Use for sections where the camera should read as "alive but not directed" — see [docs/camera-cinematography.md § when to leave the camera static](../docs/camera-cinematography.md#when-to-just-leave-the-camera-static). Amplitude kept small (0.1-0.2 units) — this is ambient texture, not a camera move with a destination.

## Reduced-motion: cut instead of any of the above

```js
function setCameraReducedMotion(position, lookAt) {
  camera.position.copy(position);
  camera.lookAt(lookAt);
  // no tween, no idle drift, no path traversal — instant reposition
}
```
Gate camera-move functions behind the same `prefers-reduced-motion` check used elsewhere (see [gsap-timeline-patterns.md § reduced-motion gate](gsap-timeline-patterns.md#reduced-motion-gsap-matchmedia-gate)) and call this instead.

## Related

- Movement-type decision rationale: [docs/camera-cinematography.md](../docs/camera-cinematography.md)
- Scroll-linked usage of the path pattern: [scrolltrigger-patterns.md](scrolltrigger-patterns.md)
- Duration budgets: [docs/easing-timing.md § duration by interaction type](../docs/easing-timing.md#duration-by-interaction-type)
