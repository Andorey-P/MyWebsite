// materials/GridMaterial.js

import * as THREE from "three";
import { PALETTE } from "./palette.js";

export function createGridMaterial({
    color = 0xa34f35,
    roughness = 0.9,
    metalness = 0.0,

    tileX = 16,
    tileY = 8,

    lineWidth = 0.001,
    lineColor = new THREE.Color(0xffffff),
    lineOpacity = 0.8
} = {}) {

    const material = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness
    });

    // Kept directly on the material (not just inside onBeforeCompile's local
    // `shader`) so it's addressable after creation: mutate these `.value`s at
    // any time - tiling, base color, line color - and the shader picks it up
    // next frame with no recompile needed, since WebGLRenderer re-uploads
    // uniforms by reference every draw call.
    material.uniforms = {
        uLineColor: { value: new THREE.Color(lineColor) },
        uLineWidth: { value: lineWidth },
        uLineOpacity: { value: lineOpacity },
        uTile: { value: new THREE.Vector2(tileX, tileY) },
        uBaseColor: { value: new THREE.Color(color) }
    };

    material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, material.uniforms);

        shader.vertexShader = shader.vertexShader.replace(
            "#include <common>",
            `
            #include <common>
            varying vec2 vUv;
            `
        );

        shader.vertexShader = shader.vertexShader.replace(
            "#include <uv_vertex>",
            `
            #include <uv_vertex>
            vUv = uv;
            `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <common>",
            `
            #include <common>
            varying vec2 vUv;
            uniform vec3 uLineColor;
            uniform float uLineWidth;
            uniform float uLineOpacity;
            uniform vec2 uTile;
            uniform vec3 uBaseColor;
            `
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            "#include <map_fragment>",
            `
            vec2 grid = fract(vUv * uTile);

            float dx = min(grid.x, 1.0 - grid.x);
            float dy = min(grid.y, 1.0 - grid.y);

            float aa = max(fwidth(dx), fwidth(dy));

            float vertical = 1.0 - smoothstep(
                uLineWidth - aa,
                uLineWidth + aa,
                dx
            );

            float horizontal = 1.0 - smoothstep(
                uLineWidth - aa,
                uLineWidth + aa,
                dy
            );

            float line = max(vertical, horizontal);

            diffuseColor.rgb = mix(
                uBaseColor,
                uLineColor,
                line * uLineOpacity
            );
            `
        );

    };

    // Three.js's WebGLRenderer caches compiled programs by shader source, which
    // is identical for every material this factory produces (only the uniform
    // *values* differ), so instancing here is cheap - no extra shader compiles.
    // A plain `.clone()` would still be wrong though: MeshStandardMaterial's
    // built-in copy() doesn't know about our custom `.uniforms`, so it'd hand
    // back a material with no grid uniforms at all. Route clone() back through
    // this factory instead, seeded with the current uniform values, so each
    // instance gets its own independent set to tweak.
    material.clone = function () {
        return createGridMaterial({
            color: this.uniforms.uBaseColor.value.clone(),
            roughness: this.roughness,
            metalness: this.metalness,
            tileX: this.uniforms.uTile.value.x,
            tileY: this.uniforms.uTile.value.y,
            lineWidth: this.uniforms.uLineWidth.value,
            lineColor: this.uniforms.uLineColor.value.clone(),
            lineOpacity: this.uniforms.uLineOpacity.value
        });
    };

    return material;
}

// Lattice reveal material (see buildLatticeReveal in landing-scene.js): an
// unlit InstancedMesh shader where every instance is one thin rotating mark.
// Ported near-verbatim from prototype/three-lattice-reveal.html's own
// ShaderMaterial - that demo drove gl_Position straight off
// projectionMatrix * modelViewMatrix against an orthographic camera filling
// the viewport, so the same math works unchanged here once the mesh is
// parented under a group placed/scaled to sit in front of the shared
// perspective camera (see buildLatticeReveal) - modelViewMatrix folds that
// group's transform in for free, no shader changes needed.
//
// Per-instance aData fields (set once in buildLatticeReveal, not touched
// again): x = this mark's own brightness (0-1, from the source image).
// y = reveal delay (0-~0.28, radial from grid center) - how far uProgress
// has to climb past this before the mark starts leaving its at-rest state.
// z = a random -0.5..0.5 angle jitter, so the fully-revealed state doesn't
// read as perfectly uniform. w = intro delay (0-1, diagonal top-left to
// bottom-right) - drives uIntro's one-time real-time pop-in on first entry,
// independent of scroll.
// curled: whether marks start swirled/turbulent (uFlow=1, the "let the
// turbulence unwind" look this chapter is built around) or start straight
// with no curl/displacement at all (uFlow=0) - see LATTICE_CURLED_INTRO in
// landing-scene.js. Either way it fades out as uProgress climbs (uFlow's
// every use in the shader below is scaled by q1 squared, which decays to 0
// on its own), so this only really matters for what the grid looks like
// before it starts resolving.
export function createLatticeRevealMaterial(n, curled = true) {
    const uniforms = {
        uN: { value: n },
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uFlow: { value: curled ? 1 : 0 },
        uTone: { value: 0 },
        uIntro: { value: 0 },
        uColor: { value: new THREE.Color(PALETTE.ink) },
    };

    const vertexShader = `
        attribute vec2 aCell;
        attribute vec4 aData;

        uniform float uN, uTime, uProgress, uFlow, uTone, uIntro;
        varying float vAlpha;

        const float FA = 2.0, FB = 2.4, FE = 2.6, FF = 1.4;

        void main() {
            float cell = 2.0 / uN;
            float u = (aCell.x + 0.5) / uN * 2.0 - 1.0;
            float v = (aCell.y + 0.5) / uN * 2.0 - 1.0;

            // Gradient of a scalar field; marks ride its curl, so they trace
            // closed streamlines instead of running into a sink.
            float t1 = uTime * 0.11, t2 = uTime * 0.08, t3 = uTime * 0.13;
            float sAu = sin(FA * u + t1), cAu = cos(FA * u + t1);
            float cBv = cos(FB * v - t2), sBv = sin(FB * v - t2);
            float q   = cos(FE * v + FF * u + t3);
            float dU =  FA * cAu * cBv + 0.55 * FF * q;
            float dV = -FB * sAu * sBv + 0.55 * FE * q;

            float b  = aData.x;
            float pl = clamp((uProgress - aData.y) * 1.42, 0.0, 1.0);
            pl = pl * pl * (3.0 - 2.0 * pl);
            float q1 = 1.0 - pl;

            float wid = cell * (0.08 + pl * (0.02 + 0.88 * b - 0.08));
            float len = cell * (0.80 + pl * (0.88 - 0.10 * b - 0.80));

            // Entrance: a diagonal wavefront from the top-left corner, played
            // once in real time (see LandingScene.enterLatticeReveal).
            float it = clamp((uIntro - aData.w * 0.55) / 0.45, 0.0, 1.0);
            float k = it - 1.0;
            float pop = 1.0 + 2.4 * k * k * k + 1.4 * k * k; // easeOutBack
            wid *= pop;
            len *= pop;
            float amp = cell * 0.62 * uFlow * q1 * q1;

            // Upright at rest; the swirl unwinds as brightness takes over.
            float ang = 1.5707963
                        - (q1 * uFlow * atan(-dU, dV)
                           + pl * (b - 0.5) * 0.55
                           + q1 * aData.z * 0.10);

            float cx = -1.0 + (aCell.x + 0.5) * cell + dV * amp;
            float cy =  1.0 - (aCell.y + 0.5) * cell + dU * amp;

            vec2 p = vec2(position.x * len, position.y * wid);
            float c = cos(ang), s = sin(ang);
            vec2 rp = vec2(p.x * c - p.y * s, p.x * s + p.y * c);

            vAlpha = mix(1.0, 0.34 + 0.66 * (q1 + pl * b), uTone) * clamp(it * 3.0, 0.0, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(cx + rp.x, cy + rp.y, 0.0, 1.0);
        }`;

    const fragmentShader = `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() { gl_FragColor = vec4(uColor, vAlpha); }`;

    return new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
    });
}