# Shader Patterns

Reference GLSL patterns for common review recommendations. See [docs/shader-review.md](../docs/shader-review.md) for the reasoning behind each.

## Branchless blending instead of `if`/`else` on a continuous value

```glsl
// Avoid on a per-fragment data-dependent condition:
if (vDistance < uThreshold) {
  color = colorA;
} else {
  color = colorB;
}

// Prefer:
float t = smoothstep(uThreshold - uSoftness, uThreshold + uSoftness, vDistance);
vec3 color = mix(colorA, colorB, t);
```

`smoothstep` also gives a soft, anti-aliased transition edge for free instead of the hard-cut boundary a branch produces — usually a visual improvement, not just a performance one.

## `onBeforeCompile` pattern for extending a built-in material

Preferred over a full custom `ShaderMaterial` when you want the built-in's full PBR lighting model (shadows, IBL, tone mapping) plus one custom effect:

```js
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });

material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = { value: 0 };
  shader.uniforms.uAmplitude = { value: 0.3 };

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
    #include <begin_vertex>
    transformed.y += sin(position.x * 4.0 + uTime) * uAmplitude;
    `
  );

  material.userData.shader = shader; // keep a reference so the render loop can update uniforms
};

// In the render loop:
if (material.userData.shader) {
  material.userData.shader.uniforms.uTime.value = elapsedTime;
}
```

Injecting at a known Three.js shader chunk include point (`#include <begin_vertex>`, `#include <normal_vertex>`, etc.) is more resilient to Three.js internal shader changes across versions than replacing large blocks of the built-in shader source wholesale — check the target chunk still exists after a Three.js version bump.

## Packed ORM texture (glTF convention) sampled once

```glsl
// Instead of three separate texture lookups:
float ao = texture2D(aoMap, vUv).r;
float roughness = texture2D(roughnessMap, vUv).g;
float metalness = texture2D(metalnessMap, vUv).b;

// One lookup, three channels — the standard glTF-packed layout:
vec3 orm = texture2D(ormMap, vUv).rgb;
float ao = orm.r;
float roughness = orm.g;
float metalness = orm.b;
```

## Time uniform without long-session precision loss

```js
// Avoid: unbounded growth over a long-running session
material.uniforms.uTime.value = performance.now() / 1000;

// Prefer: wrap against the animation's actual period
const period = 100.0; // seconds — pick something longer than any visible cycle in the shader
material.uniforms.uTime.value = (elapsedSeconds % period);
```

```glsl
// If the shader itself uses uTime in a periodic function (sin/cos/fract-based noise),
// wrapping the JS-side value is sufficient — the GLSL math doesn't need to know about the wrap
// as long as the periodic functions it feeds are themselves periodic over that range.
float wave = sin(uTime * uFrequency);
```

## Re-normalizing interpolated vectors before lighting math

```glsl
// Vertex shader:
varying vec3 vNormal;
void main() {
  vNormal = normalMatrix * normal; // unit length at each vertex
  // ...
}

// Fragment shader:
varying vec3 vNormal;
void main() {
  vec3 normal = normalize(vNormal); // re-normalize: interpolation across the triangle denormalizes it
  float diffuse = max(dot(normal, lightDir), 0.0);
}
```

## Dissolve / mask effect using a noise texture (common portfolio effect, cheap)

```glsl
uniform sampler2D uNoiseMap;
uniform float uDissolveProgress; // 0 = fully visible, 1 = fully dissolved
uniform vec3 uEdgeColor;
varying vec2 vUv;

void main() {
  float noise = texture2D(uNoiseMap, vUv).r;

  if (noise < uDissolveProgress) discard; // acceptable use of discard: driven by a uniform-derived threshold, not per-fragment branching logic elsewhere in the shader

  float edge = smoothstep(uDissolveProgress, uDissolveProgress + 0.05, noise);
  vec3 color = mix(uEdgeColor, baseColor, edge);

  gl_FragColor = vec4(color, 1.0);
}
```

`discard` has a real cost (can disable early-Z optimization on some GPUs for the rest of the draw call) but is the standard, correct tool for a genuine cutout/dissolve effect — don't avoid it reflexively; just don't reach for it as a substitute for `mix`-based blending where blending is what's actually wanted.

## Precision qualifiers for mobile-targeted fragment shaders

```glsl
precision mediump float; // default for most color/UV math on mobile paths

// Escalate only where needed:
uniform highp vec3 uWorldOffset; // large world-space values need highp to avoid precision artifacts
```
