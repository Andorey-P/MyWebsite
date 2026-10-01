// Shared mobile detection + gyroscope permission handling for the idle
// mouse-parallax camera drift in LandingScene (chapter 1) and WindowsScene
// (chapter 7). Both scenes keep driving that drift off their existing
// this.mouseX/this.mouseY fields - on mobile they just get fed from
// deviceorientation (tilt) instead of mousemove, since there's no mouse.

// Same breakpoint main.js already uses to hide the world-axes gizmo on
// small/short viewports - kept here as the single source of truth so the
// scenes and main.js all agree on what counts as "mobile".
export const isMobileViewport = window.matchMedia('(max-width: 767px), (max-height: 500px)');

// On-screen readout for diagnosing gyro issues directly on a phone, with no
// devtools/cable required - load the site as ...?debuggyro to turn it on.
// Reports permission-API presence/secure-context, the permission grant
// result, and every raw deviceorientation reading each scene receives, so
// it's obvious which stage is failing (no permission prompt shown, prompt
// denied, or events just never arriving) instead of guessing from a
// sensitivity constant that can't do anything if events aren't flowing.
export const GYRO_DEBUG = new URLSearchParams(window.location.search).has('debuggyro');

let hudEl = null;
function ensureHud() {
  if (!GYRO_DEBUG || hudEl) return hudEl;
  hudEl = document.createElement('div');
  hudEl.id = 'gyro-debug-hud';
  Object.assign(hudEl.style, {
    position: 'fixed',
    top: '8px',
    left: '8px',
    zIndex: 999999,
    background: 'rgba(0,0,0,0.75)',
    color: '#0f0',
    font: '11px/1.4 monospace',
    padding: '6px 8px',
    whiteSpace: 'pre-wrap',
    pointerEvents: 'none',
    maxWidth: '90vw',
  });
  hudEl.textContent = 'gyro debug: waiting...';
  document.body.appendChild(hudEl);
  return hudEl;
}

export function gyroDebugLog(text) {
  if (!GYRO_DEBUG) return;
  const el = ensureHud();
  if (el) el.textContent = text;
}

// iOS 13+ gates deviceorientation behind an explicit permission prompt that
// only resolves 'granted' when requested from inside a genuine user gesture.
// WebKit is stricter here than for most other gated APIs: a bare
// 'touchstart' (even mid-scroll, on window) throws "requesting device
// orientation access require a user gesture prompt" - only a real 'click'
// on an element satisfies it, so this needs an actual button tap rather than
// a silent background listener. Everywhere else - Android, desktop, older
// iOS - there's no such gate: the browser just starts delivering events to
// whatever listener is already registered, so those platforms never show
// the button at all (see #gyro-permission-btn in index.html/style.css).
export function initGyroPermissionButton() {
  if (GYRO_DEBUG) {
    ensureHud();
  }
  if (typeof DeviceOrientationEvent === 'undefined' || typeof DeviceOrientationEvent.requestPermission !== 'function') {
    gyroDebugLog(`gyro: no requestPermission() - events should fire directly\nsecure context: ${window.isSecureContext}`);
    return;
  }
  // Desktop Safari (macOS) also exposes DeviceOrientationEvent.requestPermission,
  // even though there's no tilt sensor to permission-gate - without this check
  // the button shows up there too. Gate on the same mobile breakpoint the
  // scenes use to decide whether to read tilt at all.
  if (!isMobileViewport.matches) {
    gyroDebugLog(`gyro: requestPermission() found but viewport isn't mobile - not showing button\nsecure context: ${window.isSecureContext}`);
    return;
  }
  const btn = document.getElementById('gyro-permission-btn');
  if (!btn) return;
  gyroDebugLog(`gyro: requestPermission() found, showing button\nsecure context: ${window.isSecureContext}`);
  btn.hidden = false;
  btn.addEventListener('click', () => {
    gyroDebugLog('gyro: requesting permission...');
    // Both scenes' 'deviceorientation' listeners are already registered at
    // construction time (see LandingScene/WindowsScene constructors) - they
    // just won't receive anything until this resolves 'granted', so there's
    // nothing else to wire up here.
    DeviceOrientationEvent.requestPermission()
      .then((result) => gyroDebugLog(`gyro: permission = ${result}`))
      .catch((err) => gyroDebugLog(`gyro: permission request threw: ${err && err.message}`))
      .finally(() => btn.remove());
  }, { once: true });
}
