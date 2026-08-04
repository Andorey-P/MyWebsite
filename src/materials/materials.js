// materials/GridMaterial.js

import * as THREE from "three";

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