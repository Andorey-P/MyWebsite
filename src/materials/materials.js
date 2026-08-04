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

    material.onBeforeCompile = (shader) => {
        shader.uniforms.uLineColor = {
            value: new THREE.Color(lineColor)
        };
        shader.uniforms.uLineWidth = {
            value: lineWidth
        };
        shader.uniforms.uLineOpacity = {
            value: lineOpacity
        };
        shader.uniforms.uTile = {
            value: new THREE.Vector2(tileX, tileY)
        };

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
                diffuseColor.rgb,
                uLineColor,
                line * uLineOpacity
            );
            `
        );

    };

    return material;
}