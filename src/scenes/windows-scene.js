import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
import BaseThreeJS from '../core/threejs-scene-module';
import { PALETTE } from '../materials/palette.js';

// TEMP DEBUG: lets the scroll/mouse-driven camera in update() be overridden
// by free-orbit drag so the door/stairs integration can be eyeballed from
// any angle. Set back to false (or delete this flag, the controls setup in
// the constructor, and the branch in update()) once done checking - this
// isn't meant to ship.
const DEBUG_ORBIT = false;

// Mouse-parallax, layered on top of CAMERA_POSITION below in update() - at
// its current strength (40%/50% of the visible frame - see
// parallaxMaxOffset in init()) it swings the camera up to ~500 units off
// CAMERA_POSITION's exact placed position depending on where the mouse
// happens to be. Parallax is skipped entirely while DEBUG_ORBIT is on, so
// switch this off (or just ignore mouse movement) if you need to see the
// exact unshifted CAMERA_POSITION/CAMERA_LOOK_AT shot again.
const PARALLAX_ENABLED = true;

// Door + stairs constants, ported as-is from prototype/door-stairs.js - see
// that file for the full reasoning behind each mesh's pivot/scale trick.
// None of the dimensions below need retuning to change the camera framing -
// see CAMERA_POSITION/CAMERA_LOOK_AT further down for that.
const DOOR_WIDTH = 220; // matches the width the stairs spill out at
const DOOR_HEIGHT = 260;
const DOOR_DEPTH = 500; // how far the hollow doorway tunnel stretches toward +Z
const FLOOR_WIDTH = DOOR_WIDTH;
const FLOOR_DEPTH = 320;
const FLOOR_TARGET_SCALE = 0.5; // the floor's own tween below only opens it halfway

const STAIR_COUNT = 9;
const STAIR_WIDTH = FLOOR_WIDTH;
const STAIR_RUN = 46; // each tread's own depth (Z)
const STAIR_DROP = 34; // how far down (Y) each successive tread sits
const STAIR_DURATION = 0.12;
const STAIR_STAGGER = 0.02; // cascades the treads open one after another

const SECOND_FLOOR_WIDTH = STAIR_WIDTH;
const SECOND_FLOOR_DEPTH = STAIR_WIDTH; // its own "length" matches the stairs' width
const SECOND_FLOOR_DURATION = 0.15;

// Second flight: same tread proportions as the first, running toward +X
// instead of +Z, starting one step below the second floor.
const STAIR2_COUNT = STAIR_COUNT;
const STAIR2_WIDTH = STAIR_WIDTH;
const STAIR2_RUN = STAIR_RUN;
const STAIR2_DROP = STAIR_DROP;
const STAIR2_DURATION = STAIR_DURATION;
const STAIR2_STAGGER = STAIR_STAGGER;

const DOOR_DURATION = 0.3;
const FLOOR_DURATION = 0.25;

// Gap between the door's own far wall and the first tread - see
// prototype/door-stairs.js for why this is a fixed clearance rather than a
// Z position baked in independently of DOOR_DEPTH.
const STAIRS_CLEARANCE = 10;

// Sum of every tween/stagger duration in the door-open + stairs-cascade
// chain below (same formula as the prototype's own TOTAL_DURATION) -
// exported so main.js can size its own scroll room for this timeline (its
// `end` calc is a hand-summed formula of every phase's own duration, in the
// same units throughout - see CHAPTER_STOPPAGE_PX_PER_UNIT there).
export const DOOR_STAIRS_DURATION = DOOR_DURATION + FLOOR_DURATION
  + STAIR_STAGGER * (STAIR_COUNT - 1) + STAIR_DURATION
  + SECOND_FLOOR_DURATION
  + STAIR2_STAGGER * (STAIR2_COUNT - 1) + STAIR2_DURATION;

// CAMERA POSITION + LOOK-AT - hand-tune these two. Both absolute world
// positions (not an offset from anything), because with DEBUG_ORBIT's pan
// enabled the camera can end up looking at any point, not just the door -
// so both what to look at and where to look from need their own values.
// DEBUG_ORBIT's on-screen HUD prints both as ready-to-paste lines in this
// exact form - drag/pan/orbit to the shot you want, then copy them over
// these two declarations.
const CAMERA_POSITION = new THREE.Vector3(1561, 59, 2478);
const CAMERA_LOOK_AT = new THREE.Vector3(-681, -627, 965);

// Mobile framing fix: the door/stairs structure sits well to the positive-X
// side of CAMERA_LOOK_AT above (see the stairs2 flight's own +X cascade in
// buildDoorStairs). Desktop's wide aspect ratio comfortably frames all of it,
// but a narrow mobile viewport's much tighter horizontal FOV (see
// frameHalfWidth's own aspect-scaling in init() below) crops it down to a
// barely-visible sliver at the frame's right edge. Shifting both position and
// look-at by the same offset - a straight lateral truck, not a rotation, so
// the framing's own angle/distance stays identical - pans that content back
// into view. Hand-tuned against real mobile viewports the same way
// CAMERA_POSITION/CAMERA_LOOK_AT themselves were (DEBUG_ORBIT's HUD doesn't
// cover this offset - retune by eye if the door/stairs geometry changes).
const MOBILE_BREAKPOINT = 767; // matches every other mobile check in this codebase
const MOBILE_CAMERA_SHIFT_X = 900;

export default class WindowsScene extends BaseThreeJS {
  constructor(containerId, loadingManager, renderer) {
    super(containerId, loadingManager, renderer);
    // Transparent - no scene background/clear color of its own, so whatever
    // sits behind the canvas (the dot-wipe backdrop - see .windows-scene's
    // z-index in style.css) shows through wherever this scene doesn't draw.
    this.clearAlpha = 0;
    this.composer = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseOffset = new THREE.Vector2(0, 0);
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    // The scroll timeline in main.js tweens this directly; update() layers
    // the mouse-parallax offset on top each frame rather than the two
    // fighting. Real values (position/lookAt) are set in init() below, from
    // SCENE_CENTER/CAMERA_OFFSET above - placeholder Vector3s here just give
    // main.js something to .clone() before init() has run (it captures this
    // at construction time).
    this.scrollCameraBase = {
      position: new THREE.Vector3(),
      lookAt: new THREE.Vector3(),
    };

    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
    document.addEventListener('mousemove', this.onDocumentMouseMove);

    this.init();
  }

  init() {
    // fov is a deliberate choice (a narrower lens reads as more
    // "compressed"/telephoto, a wider one as more fisheye-distorted) - tune
    // to taste, independently of CAMERA_POSITION/CAMERA_LOOK_AT above.
    this.camera.fov = 35;
    this.camera.near = 1;
    this.camera.far = 10000;
    this.camera.updateProjectionMatrix();

    this.scrollCameraBase.position.copy(CAMERA_POSITION);
    this.scrollCameraBase.lookAt.copy(CAMERA_LOOK_AT);
    // See MOBILE_CAMERA_SHIFT_X above - pans the door/stairs structure back
    // into frame on narrow viewports, where it'd otherwise crop to a sliver.
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      this.scrollCameraBase.position.x += MOBILE_CAMERA_SHIFT_X;
      this.scrollCameraBase.lookAt.x += MOBILE_CAMERA_SHIFT_X;
    }
    this.camera.position.copy(this.scrollCameraBase.position);

    // Mouse-parallax offset in update() below, sized as a fraction of the
    // actually-visible frame at the camera's real distance from what it's
    // looking at - keeps it proportionally correct however far CAMERA_OFFSET
    // above ends up placing the camera, rather than a fixed unit count (a
    // fixed count tuned for one distance reads as way too strong up close,
    // or imperceptible from far away).
    const distanceToTarget = this.scrollCameraBase.position.distanceTo(this.scrollCameraBase.lookAt);
    const verticalHalfFov = THREE.MathUtils.degToRad(this.camera.fov / 2);
    const frameHalfHeight = distanceToTarget * Math.tan(verticalHalfFov);
    const frameHalfWidth = frameHalfHeight * this.camera.aspect;
    this.parallaxMaxOffset = new THREE.Vector2(frameHalfWidth * 0.3, frameHalfHeight * 0.3);

    this.buildDoorStairs();

    // TEMP DEBUG - see DEBUG_ORBIT above. enableZoom is off for the same
    // reason the door-stairs prototype turned it off: this scene shares the
    // page's own wheel-driven scroll, and OrbitControls would otherwise
    // hijack the wheel for zoom instead of letting it scroll the page.
    if (DEBUG_ORBIT) {
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
      this.orbitControls.target.copy(this.scrollCameraBase.lookAt);
      this.orbitControls.enableDamping = true;
      this.orbitControls.dampingFactor = 0.08;
      this.orbitControls.enableZoom = false;
      // Pan (right-click drag) is left on so the look-at point itself can
      // be repositioned while hunting for a shot, not just orbited around a
      // fixed one - the HUD below prints orbitControls.target too (not a
      // fixed DOOR_CENTER), so wherever panning moves it still ends up
      // captured correctly in the printed CAMERA_LOOK_AT line.
      this.orbitControls.update();

      // On-screen readout of the camera's current position AND look-at
      // target, printed as ready-to-paste CAMERA_POSITION/CAMERA_LOOK_AT
      // lines - drag/pan/orbit to the shot you want, then copy both
      // straight over those two declarations above. Updated every frame in
      // update() below.
      this.debugCameraHud = document.createElement('div');
      this.debugCameraHud.style.cssText = 'position:fixed; top:90px; left:16px; z-index:9999; font-family:monospace; font-size:13px; line-height:1.5; color:#fff; background:rgba(0,0,0,0.65); padding:8px 12px; border-radius:4px; pointer-events:none; white-space:pre;';
      document.body.appendChild(this.debugCameraHud);
    }

    this.addWorldAxesGizmo();
  }

  // Same world-space orientation widget as LandingScene (see its own
  // addWorldAxesGizmo/recolorWorldAxesGizmo/buildAxisLabelSpriteMaterial for
  // the full reasoning) - pinned to the bottom-right corner, showing the
  // camera's current read on world X/Y/Z. main.js's renderActiveScene()
  // already renders whatever the active scene's own `viewHelper` is - it's
  // not scene-specific, so nothing there needed to change for this to show
  // up. Copied rather than shared/inherited since BaseThreeJS doesn't own
  // any rendering setup and this is only a few small methods.
  //
  // (This was added once before and looked broken - mispositioned, only
  // showing up after a DevTools-triggered resize. That turned out to be a
  // real bug in main.js's resizeRendererToDisplaySize(), which was
  // double-applying devicePixelRatio and feeding ViewHelper's positioning
  // math a canvas size that didn't match the actual drawing buffer - not
  // anything wrong with this widget itself. Now fixed there.)
  addWorldAxesGizmo() {
    this.viewHelper = new ViewHelper(this.camera, this.renderer.domElement);
    this.viewHelper.setLabels('X', 'Y', 'Z');
    this.recolorWorldAxesGizmo(PALETTE.clay);
  }

  recolorWorldAxesGizmo(hexColor) {
    const color = new THREE.Color(hexColor);

    for (const child of this.viewHelper.children) {
      if (child.isMesh) {
        child.material.color.set(color);
      } else if (child.isSprite && child.userData.type?.startsWith('pos')) {
        const label = child.userData.type.slice(-1);
        child.material.map.dispose();
        child.material.dispose();
        child.material = this.buildAxisLabelSpriteMaterial(color, label);
      }
    }
  }

  buildAxisLabelSpriteMaterial(color, text) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;

    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(32, 32, 14, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = color.getStyle();
    context.fill();

    context.font = '24px Arial';
    context.textAlign = 'center';
    context.fillStyle = '#000000';
    context.fillText(text, 32, 41);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    return new THREE.SpriteMaterial({ map: texture, toneMapped: false });
  }

  // Door + stairs meshes and their open/cascade tweens, ported from
  // prototype/door-stairs.js - mesh geometry/materials and the tween chain
  // are unchanged from that prototype (unlit MeshBasicMaterial throughout,
  // same pivot-and-scale reveal tricks). The one difference: this timeline
  // carries no ScrollTrigger of its own - the standalone prototype scrubbed
  // it straight against document.body, but here main.js nests it directly
  // into its own shared scroll timeline via `.add()` (see the end of this
  // method), so it stays continuously tied to scroll position (reversible
  // on scroll-back) the same way, without a second independent trigger -
  // see DOOR_STAIRS_DURATION above, which main.js also reads to size its
  // scroll room for it.
  buildDoorStairs() {
    // Identity transform - the camera above matches the prototype's own
    // scale exactly, so unlike an earlier version of this method, none of
    // the ported geometry below needs shrinking or reorienting to fit. Kept
    // as a group rather than adding everything straight to the scene just
    // as a single convenient handle.
    this.doorStairsGroup = new THREE.Group();
    this.scene.add(this.doorStairsGroup);

    const wallMaterial = () => new THREE.MeshBasicMaterial({ color: "#d04025" });

    // Door: 4 separate plane meshes (left/top/right/bottom - no front/back
    // caps, so it reads as a hollow tunnel) plus one extra occluder plane
    // duplicating the right wall. See prototype/door-stairs.js for the full
    // reasoning behind each plane's pivot/scale trick and the occluder/inner
    // wall split.
    this.door = new THREE.Group();
    this.doorStairsGroup.add(this.door);

    const leftPlaneGeometry = new THREE.PlaneGeometry(DOOR_DEPTH, DOOR_HEIGHT);
    leftPlaneGeometry.translate(0, DOOR_HEIGHT / 2, 0);
    this.leftPlane = new THREE.Mesh(leftPlaneGeometry, wallMaterial());
    this.leftPlane.rotation.y = Math.PI / 2;
    this.leftPlane.position.set(-DOOR_WIDTH / 2, -DOOR_HEIGHT, DOOR_DEPTH / 2);
    this.leftPlane.scale.y = 0;
    this.door.add(this.leftPlane);

    this.topPlane = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_DEPTH), wallMaterial());
    this.topPlane.rotation.x = Math.PI / 2;
    this.topPlane.position.set(0, -DOOR_HEIGHT, DOOR_DEPTH / 2);
    this.door.add(this.topPlane);

    // Ceiling occluder - same trick as floorOccluder further down (see its
    // own comment for the full reasoning), just facing up instead of down:
    // BackSide so it rasterizes when viewed from above looking down,
    // complementing topPlane's own FrontSide (visible from below, looking
    // up at the ceiling). Positioned at topPlane's own rest height (y:0)
    // rather than tracking topPlane's position tween (see the timeline
    // below - topPlane rises from -DOOR_HEIGHT to 0 as the door opens) -
    // it never draws a color, so there's no reveal-timing reason to track
    // that tween, only to occlude wherever the ceiling eventually sits.
    this.ceilingOccluder = new THREE.Mesh(
      new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_DEPTH),
      new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true, side: THREE.BackSide }),
    );
    this.ceilingOccluder.renderOrder = -1;
    this.ceilingOccluder.rotation.x = Math.PI / 2;
    this.ceilingOccluder.position.set(0, 0, DOOR_DEPTH / 2);
    this.door.add(this.ceilingOccluder);

    // The prototype painted this plane opaque black to match its own solid
    // scene.background, so it read as "invisible" without any masking
    // trick. This scene has no such background (clearAlpha:0 - see the
    // constructor - lets the page's own backdrop show through), so that
    // same solid black now shows up as a literal black patch instead of
    // blending in. colorWrite:false makes it a true depth-only occluder
    // instead - it still blocks whatever's behind it via the depth test,
    // just without painting any color of its own, so that area stays
    // whatever was already there (the transparent backdrop). depthWrite
    // alone isn't enough for that to be correct: colorWrite:false doesn't
    // erase color already painted at a pixel, it just never writes new
    // color there - so this only reads as "invisible" if IT renders before
    // whatever it needs to block, not after. renderOrder forces that,
    // rather than leaving it to three's default distance-based sort.
    this.rightPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(DOOR_DEPTH, DOOR_HEIGHT),
      new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true, side: THREE.BackSide }),
    );
    this.rightPlane.renderOrder = -1;
    this.rightPlane.rotation.y = -Math.PI / 2;
    this.rightPlane.position.set(DOOR_WIDTH / 2, -DOOR_HEIGHT / 2, DOOR_DEPTH / 2);
    this.door.add(this.rightPlane);

    this.rightPlaneInner = new THREE.Mesh(new THREE.PlaneGeometry(DOOR_DEPTH, DOOR_HEIGHT), wallMaterial());
    this.rightPlaneInner.rotation.y = -Math.PI / 2;
    this.rightPlaneInner.position.set(DOOR_WIDTH / 2, -DOOR_HEIGHT / 2, DOOR_DEPTH / 2);
    this.door.add(this.rightPlaneInner);

    const bottomPlaneGeometry = new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_DEPTH);
    bottomPlaneGeometry.translate(DOOR_WIDTH / 2, 0, 0);
    this.bottomPlane = new THREE.Mesh(bottomPlaneGeometry, wallMaterial());
    this.bottomPlane.rotation.x = -Math.PI / 2;
    this.bottomPlane.position.set(-DOOR_WIDTH / 2, -DOOR_HEIGHT, DOOR_DEPTH / 2);
    this.bottomPlane.scale.x = 0;
    this.door.add(this.bottomPlane);

    // Floor occluder - same "invisible but blocks the depth test" trick as
    // rightPlane above (see its own comment for the full reasoning), just
    // facing down instead of sideways: BackSide so it rasterizes when
    // viewed from underneath looking up, not from above. Without it,
    // orbiting below the structure and looking up sees straight through
    // the floor - bottomPlane's own material is FrontSide-only (visible
    // from above, where the camera normally is). Static/always full-size
    // like rightPlane rather than tied to bottomPlane's own door-open scale
    // tween - it never draws a color, so there's no reveal-timing reason to
    // animate it, only to occlude wherever the floor eventually sits.
    this.floorOccluder = new THREE.Mesh(
      new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_DEPTH),
      new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true, side: THREE.BackSide }),
    );
    this.floorOccluder.renderOrder = -1;
    this.floorOccluder.rotation.x = -Math.PI / 2;
    this.floorOccluder.position.set(0, -DOOR_HEIGHT, DOOR_DEPTH / 2);
    this.door.add(this.floorOccluder);

    // Floor: left un-added to the scene, same as the prototype (its tween
    // still runs below - it just has nothing to visibly show for it).
    const floorGeometry = new THREE.PlaneGeometry(FLOOR_WIDTH, FLOOR_DEPTH);
    floorGeometry.translate(0, -FLOOR_DEPTH / 2, 0);
    this.floor = new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({ color: "#d04025", side: THREE.DoubleSide }));
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.set(0, -DOOR_HEIGHT, 0);
    this.floor.scale.y = 0;
    // this.doorStairsGroup.add(this.floor);

    // Stairs: chained one after another, each tread's own pivot sitting
    // exactly where the previous one ends.
    this.stairs = [];
    let stairCursorY = -DOOR_HEIGHT;
    let stairCursorZ = DOOR_DEPTH + STAIRS_CLEARANCE;
    for (let i = 0; i < STAIR_COUNT; i++) {
      const stairGeometry = new THREE.PlaneGeometry(STAIR_WIDTH, STAIR_RUN);
      stairGeometry.translate(0, -STAIR_RUN / 2, 0);
      const stair = new THREE.Mesh(stairGeometry, new THREE.MeshBasicMaterial({ color: "#d04025", side: THREE.DoubleSide }));
      stair.rotation.x = -Math.PI / 2;
      stairCursorY -= STAIR_DROP;
      stair.position.set(0, stairCursorY, stairCursorZ);
      stair.scale.y = 0;
      this.doorStairsGroup.add(stair);
      this.stairs.push(stair);
      stairCursorZ += STAIR_RUN;
    }

    // Second floor: really just a 10th step, with a longer run so it reads
    // as a landing rather than another tread.
    stairCursorY -= STAIR_DROP;
    const secondFloorGeometry = new THREE.PlaneGeometry(SECOND_FLOOR_WIDTH, SECOND_FLOOR_DEPTH);
    secondFloorGeometry.translate(0, -SECOND_FLOOR_DEPTH / 2, 0);
    this.secondFloor = new THREE.Mesh(secondFloorGeometry, new THREE.MeshBasicMaterial({ color: "#d04025", side: THREE.DoubleSide }));
    this.secondFloor.rotation.x = -Math.PI / 2;
    this.secondFloor.position.set(0, stairCursorY, stairCursorZ);
    this.secondFloor.scale.y = 0;
    this.doorStairsGroup.add(this.secondFloor);

    // Second flight: same pivot-and-scale trick, grown via scale.x instead
    // of scale.y, starting one step below the second floor.
    this.stairs2 = [];
    let stair2CursorY = this.secondFloor.position.y;
    let stair2CursorX = SECOND_FLOOR_WIDTH / 2;
    const stair2Z = this.secondFloor.position.z + SECOND_FLOOR_DEPTH / 2;
    for (let i = 0; i < STAIR2_COUNT; i++) {
      const stair2Geometry = new THREE.PlaneGeometry(STAIR2_RUN, STAIR2_WIDTH);
      stair2Geometry.translate(STAIR2_RUN / 2, 0, 0);
      const stair2 = new THREE.Mesh(stair2Geometry, new THREE.MeshBasicMaterial({ color: "#d04025", side: THREE.DoubleSide }));
      stair2.rotation.x = -Math.PI / 2;
      stair2CursorY -= STAIR2_DROP;
      stair2.position.set(stair2CursorX, stair2CursorY, stair2Z);
      stair2.scale.x = 0;
      this.doorStairsGroup.add(stair2);
      this.stairs2.push(stair2);
      stair2CursorX += STAIR2_RUN;
    }

    // Left/top/bottom each grow along their own axis (see their comments
    // above for which); right is static and has no tween at all. All three
    // share the same start ('<' on the second and third ties them to the
    // first) and duration, so they read as one door opening, not three.
    // Not `paused: true` like chapterTwoTimeline etc. in main.js - those are
    // deliberately paused because they get explicitly .play()'d later at a
    // fixed real-time pace (see the comment above). This one is nested
    // straight into the master timeline for continuous scroll-scrubbing, and
    // a paused child's playhead doesn't advance even when its parent seeks
    // it directly - confirmed the hard way (progress stuck at 0 through the
    // entire scroll range until this was dropped).
    this.doorStairsTimeline = gsap.timeline();
    this.doorStairsTimeline.to(this.leftPlane.scale, {
      y: 1,
      ease: 'expo.inOut', // big ease - reads as barely moving, then a fast snap open, then settling
      duration: DOOR_DURATION,
    });
    this.doorStairsTimeline.to(this.topPlane.position, {
      y: 0,
      ease: 'expo.inOut',
      duration: DOOR_DURATION,
    }, '<');
    this.doorStairsTimeline.to(this.bottomPlane.scale, {
      x: 1,
      ease: 'expo.inOut',
      duration: DOOR_DURATION,
    }, '<');
    // No position arg - starts right where the door tweens above end.
    this.doorStairsTimeline.to(this.floor.scale, {
      y: FLOOR_TARGET_SCALE,
      ease: 'expo.inOut',
      duration: FLOOR_DURATION,
    });
    // Cascades down the staircase, one tread after another.
    this.doorStairsTimeline.to(this.stairs.map((stair) => stair.scale), {
      y: 1,
      ease: 'expo.inOut',
      duration: STAIR_DURATION,
      stagger: STAIR_STAGGER,
    });
    this.doorStairsTimeline.to(this.secondFloor.scale, {
      y: 1,
      ease: 'expo.inOut',
      duration: SECOND_FLOOR_DURATION,
    });
    // Second flight, cascading toward +X the same way the first cascaded toward +Z.
    this.doorStairsTimeline.to(this.stairs2.map((stair) => stair.scale), {
      x: 1,
      ease: 'expo.inOut',
      duration: STAIR2_DURATION,
      stagger: STAIR2_STAGGER,
    });
  }

  update() {
    // TEMP DEBUG - see DEBUG_ORBIT above. Bypasses the scroll/mouse camera
    // drive entirely so drag-to-orbit isn't fighting it every frame.
    if (DEBUG_ORBIT) {
      this.orbitControls.update();
      const p = this.camera.position;
      const t = this.orbitControls.target;
      this.debugCameraHud.textContent =
        `CAMERA_POSITION = new THREE.Vector3(${Math.round(p.x)}, ${Math.round(p.y)}, ${Math.round(p.z)});\n`
        + `CAMERA_LOOK_AT = new THREE.Vector3(${Math.round(t.x)}, ${Math.round(t.y)}, ${Math.round(t.z)});`;
      return;
    }

    // See PARALLAX_ENABLED above - off for now. mouseOffset just stays
    // (0,0) below when disabled, so camera.position below ends up exactly
    // scrollCameraBase.position.
    if (PARALLAX_ENABLED) {
      // mouseX/mouseY range roughly +-windowHalfX/Y (see onDocumentMouseMove) -
      // normalizing by that before scaling to parallaxMaxOffset (set in init(),
      // sized off the actual visible frame) is what keeps this noticeable
      // regardless of how far away the camera ends up sitting.
      const targetOffsetX = THREE.MathUtils.clamp((this.mouseX / this.windowHalfX) * this.parallaxMaxOffset.x, -this.parallaxMaxOffset.x, this.parallaxMaxOffset.x);
      const targetOffsetY = THREE.MathUtils.clamp((-this.mouseY / this.windowHalfY) * this.parallaxMaxOffset.y, -this.parallaxMaxOffset.y, this.parallaxMaxOffset.y);
      this.mouseOffset.x += (targetOffsetX - this.mouseOffset.x) * 0.05;
      this.mouseOffset.y += (targetOffsetY - this.mouseOffset.y) * 0.05;
    }

    this.camera.position.set(
      this.scrollCameraBase.position.x + this.mouseOffset.x,
      this.scrollCameraBase.position.y + this.mouseOffset.y,
      this.scrollCameraBase.position.z,
    );
    this.camera.lookAt(this.scrollCameraBase.lookAt);
  }

  onDocumentMouseMove(event) {
    this.mouseX = event.clientX - this.windowHalfX;
    this.mouseY = event.clientY - this.windowHalfY;
  }
}
