import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// 3D Simplex / Perlin Noise functions for GLSL Shader
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_0.142857142857 = 0.142857142857;
  vec3  ns = n_0.142857142857 * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}
`;

const vertexShader = `
uniform float uTime;
uniform float uSpeed;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vUv;
varying float vNoise;

${noiseGLSL}

void main() {
  vUv = uv;
  vec3 pos = position;

  float noise = snoise(vec3(pos.x * uFrequency, pos.y * uFrequency, uTime * uSpeed * 0.3));
  pos.z += noise * uAmplitude;
  vNoise = noise;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColor1; // Deep Navy #071426
uniform vec3 uColor2; // Navy Blue #0B1F3A
uniform vec3 uColor3; // Royal Blue #1D4ED8
uniform vec3 uColor4; // Primary Blue #2563EB
uniform vec3 uColor5; // Cyan Accent #00A3FF
uniform float uTime;

varying vec2 vUv;
varying float vNoise;

void main() {
  float mix1 = sin(vUv.x * 3.1415 + uTime * 0.1) * 0.5 + 0.5;
  float mix2 = cos(vUv.y * 3.1415 + uTime * 0.15) * 0.5 + 0.5;
  float nFactor = vNoise * 0.5 + 0.5;

  vec3 colA = mix(uColor1, uColor2, mix1);
  vec3 colB = mix(uColor3, uColor4, mix2);
  vec3 finalColor = mix(colA, colB, nFactor);

  // Add subtle cyan highlight spot
  float cyanHighlight = smoothstep(0.4, 0.9, nFactor) * 0.35;
  finalColor = mix(finalColor, uColor5, cyanHighlight);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function ShaderGradientCanvas({
  speed = 0.5,
  frequency = 0.8,
  amplitude = 0.4,
  variant = 'hero', // 'hero' or 'calm'
  className = ''
}) {
  const containerRef = useRef(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch (e) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2.5;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Plane Mesh Geometry
    const geometry = new THREE.PlaneGeometry(5, 5, isMobile ? 32 : 64, isMobile ? 32 : 64);

    // AnshuCore Official Palette Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: variant === 'calm' ? speed * 0.4 : speed },
      uFrequency: { value: frequency },
      uAmplitude: { value: variant === 'calm' ? amplitude * 0.4 : amplitude },
      uColor1: { value: new THREE.Color('#071426') },
      uColor2: { value: new THREE.Color('#0B1F3A') },
      uColor3: { value: new THREE.Color('#1D4ED8') },
      uColor4: { value: new THREE.Color('#2563EB') },
      uColor5: { value: new THREE.Color('#00A3FF') }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.3;
    mesh.rotation.z = 0.1;
    scene.add(mesh);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [speed, frequency, amplitude, variant]);

  // Static Fallback for Reduced Motion or WebGL Unsupported
  if (reducedMotion || !webGlSupported) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#1D4ED8] ${className}`}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  );
}

export default ShaderGradientCanvas;
