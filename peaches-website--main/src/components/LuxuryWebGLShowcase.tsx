import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from './SafeImage';

interface CategoryItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  img: string;
  fallback: string;
  prodId: string;
  colorBg: string;
}

interface LuxuryWebGLShowcaseProps {
  activeIndex: number;
  categories: CategoryItem[];
}

export const LuxuryWebGLShowcase: React.FC<LuxuryWebGLShowcaseProps> = ({
  activeIndex,
  categories,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to keep track of WebGL constructs across renders
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const prevActiveIndexRef = useRef<number>(0);
  const isLoadedRef = useRef<boolean>(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isWebGlActive, setIsWebGlActive] = useState(false);

  // Load a texture with a fallback to Unsplash url if the local file 404s
  const loadTextureWithFallback = (
    primarySrc: string,
    fallbackSrc: string,
    loader: THREE.TextureLoader
  ): Promise<THREE.Texture> => {
    return new Promise((resolve) => {
      loader.load(
        primarySrc,
        (texture) => {
          texture.minFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          resolve(texture);
        },
        undefined,
        () => {
          // If local assets fail (e.g., in developer preview server mismatch), fallback cleanly to Unsplash
          loader.load(
            fallbackSrc,
            (fbTexture) => {
              fbTexture.minFilter = THREE.LinearFilter;
              fbTexture.generateMipmaps = false;
              resolve(fbTexture);
            },
            undefined,
            () => {
              // Return a luxury off-white color block canvas texture if both fail, preventing app black screen
              const canvas = document.createElement('canvas');
              canvas.width = 64;
              canvas.height = 64;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#FAF5F0';
                ctx.fillRect(0, 0, 64, 64);
              }
              const emptyTx = new THREE.CanvasTexture(canvas);
              resolve(emptyTx);
            }
          );
        }
      );
    });
  };

  const categoriesKey = categories.map((c) => c.img).join(',');

  // Preload all category textures on mount
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const loadAll = async () => {
      const loaded: THREE.Texture[] = [];
      for (const cat of categories) {
        const tex = await loadTextureWithFallback(cat.img, cat.fallback, loader);
        loaded.push(tex);
      }
      texturesRef.current = loaded;
      setIsPreloaded(true);
    };

    loadAll();

    return () => {
      // Cleanup loaded textures on unmount
      texturesRef.current.forEach((t) => t.dispose());
    };
  }, [categoriesKey]);

  // Secondary effect to boot WebGL framework once preloaded with robust try-catch
  useEffect(() => {
    if (!isPreloaded || !canvasRef.current || !containerRef.current) return;

    let active = true;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let resizeObserver: ResizeObserver | null = null;

    try {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // 1. WebGL Setup
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      rendererRef.current = renderer;

      const scene = new THREE.Scene();
      
      // Simple Orthographic camera for full screen quad mapping
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Initial textures
      const initialTexture = texturesRef.current[activeIndex] || texturesRef.current[0];
      const dummyTexture = texturesRef.current[0];

      // 2. Custom fluid wave displacement transition shader
      material = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTextureCurrent;
          uniform sampler2D uTextureNext;
          uniform float uProgress;
          uniform float uWaveDirection; // 1.0 = left-to-right, -1.0 = right-to-left
          uniform float uTime;
          uniform float uTextureAspect;
          uniform float uResolutionAspect;

          varying vec2 vUv;

          // Cover UV ratio calculator
          vec2 getCoverUV(vec2 uv) {
            vec2 coverUV = uv - 0.5;
            if (uResolutionAspect > uTextureAspect) {
              coverUV.y *= uTextureAspect / uResolutionAspect;
            } else {
              coverUV.x *= uResolutionAspect / uTextureAspect;
            }
            return coverUV + 0.5;
          }

          // Multi-frequency biological/water fluid noise
          float luxuryRipple(vec2 uv, float speed) {
            float w1 = sin(uv.y * 14.5 + speed) * 0.5;
            float w2 = cos(uv.y * 29.2 - speed * 0.8) * 0.3;
            float w3 = sin(uv.x * 10.0 + uv.y * 15.0 + speed * 0.5) * 0.2;
            return w1 + w2 + w3;
          }

          void main() {
            // Calculate object-fit: cover UV mapping
            vec2 refUV = getCoverUV(vUv);

            // Symmetrical sweep coordinate
            // If direction is Left-to-Right (1.0), we sweep left to right (refUV.x).
            // If direction is Right-to-Left (-1.0), we sweep right to left (1.0 - refUV.x).
            float coordX = (uWaveDirection > 0.0) ? refUV.x : (1.0 - refUV.x);

            // Progress runs from 0.0 to 1.15. 
            // We stretch the threshold boundaries and clamp here to ensure standard blend completes normally by progress 1.0.
            float threshold = clamp(uProgress, 0.0, 1.0) * 1.5 - 0.25;
            float dist = coordX - threshold;

            // Wave intensity behaves as a localized bell-curve around the reveal sweep-line
            float waveIntensity = smoothstep(0.35, 0.0, abs(dist));

            // Physical wave distortion peak scale
            float splashPower = waveIntensity * 0.082 * (1.0 + sin(clamp(uProgress, 0.0, 1.0) * 3.14159) * 0.5);

            // Liquid water flow wave speed calculation
            float waveSpeed = uTime * 3.2;
            float rip = luxuryRipple(refUV, waveSpeed);

            // Tiny high-frequency horizontal micro-vibration mimicking premium active skincare liquid energy
            float microVibe = sin(refUV.y * 140.0 + uTime * 35.0) * cos(refUV.x * 90.0 - uTime * 20.0) * 0.0016 * waveIntensity;

            float horizOffset = (rip * splashPower + microVibe) * uWaveDirection;

            // Slow organic idle water breathe
            float idleSpeed = uTime * 0.5;
            float idleOffset = sin(refUV.y * 6.5 + idleSpeed) * 0.0022 + cos(refUV.x * 8.0 - idleSpeed * 0.7) * 0.0015;

            // Soft residual settling ripple as wave hits the edge (bounds 0.85 to 1.15)
            float settlingProgress = clamp((uProgress - 0.85) / 0.30, 0.0, 1.0);
            float settlingEnvelope = sin(settlingProgress * 3.14159) * (1.0 - settlingProgress);
            float settlingRipple = sin(refUV.y * 35.0 + uTime * 12.0) * cos(refUV.x * 25.0 - uTime * 8.0) * 0.0055 * settlingEnvelope;

            // Apply coordinate displacement to current image
            vec2 uvCurrent = refUV;
            uvCurrent.x += horizOffset + idleOffset;

            // Apply counter-shifting flow and settling ripple to next image to emphasize settling behavior
            vec2 uvNext = refUV;
            float parallaxShift = 0.05 * (1.0 - clamp(uProgress, 0.0, 1.0)) * uWaveDirection;
            uvNext.x += -parallaxShift + horizOffset + idleOffset + settlingRipple * uWaveDirection;

            // Clamp and query colors
            uvCurrent = clamp(uvCurrent, 0.001, 0.999);
            uvNext = clamp(uvNext, 0.001, 0.999);

            vec4 texCurrent = texture2D(uTextureCurrent, uvCurrent);
            vec4 texNext = texture2D(uTextureNext, uvNext);

            // Linear gradient crossfade sweep mask
            float mixFactor = smoothstep(threshold - 0.18, threshold + 0.18, coordX);

            // Reveal next, hide current
            gl_FragColor = mix(texNext, texCurrent, mixFactor);
          }
        `,
        uniforms: {
          uTextureCurrent: { value: initialTexture },
          uTextureNext: { value: dummyTexture },
          uProgress: { value: 1.15 }, // Initialize completed
          uWaveDirection: { value: 1.0 },
          uTime: { value: 0 },
          uTextureAspect: { value: 1.5 }, // Default average landscapish 3:2
          uResolutionAspect: { value: width / height },
        },
        depthWrite: false,
        depthTest: false,
      });
      materialRef.current = material;

      // Full screen mapped Quad geometry
      geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Initial uTextureAspect settings based on active texture
      if (initialTexture.image && initialTexture.image.width > 0) {
        material.uniforms.uTextureAspect.value = initialTexture.image.width / initialTexture.image.height;
      }

      // 3. Simple high-performance render tick using requestAnimationFrame
      const startClock = Date.now();

      const animate = () => {
        if (!active || !renderer || !material) return;
        const elapsed = (Date.now() - startClock) / 1000;
        material.uniforms.uTime.value = elapsed;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      // 4. Responsive Resize Observer setup
      resizeObserver = new ResizeObserver((entries) => {
        if (!entries || entries.length === 0) return;
        const { width: w, height: h } = entries[0].contentRect;
        if (w > 0 && h > 0 && renderer && material) {
          renderer.setSize(w, h);
          material.uniforms.uResolutionAspect.value = w / h;
        }
      });
      resizeObserver.observe(containerRef.current);

      isLoadedRef.current = true;
      prevActiveIndexRef.current = activeIndex;
      setIsWebGlActive(true);
    } catch (err) {
      console.error('Three.JS Engine setup failed or context lost:', err);
      setIsWebGlActive(false);
    }

    // Cleanup WebGL resources on teardown
    return () => {
      active = false;
      if (resizeObserver && containerRef.current) {
        resizeObserver.disconnect();
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
      rendererRef.current = null;
      materialRef.current = null;
      isLoadedRef.current = false;
    };
  }, [isPreloaded, categoriesKey]);

  // Handle activeIndex shifts and trigger high-fashion GSAP liquid sweep wave transitions!
  useEffect(() => {
    if (!isLoadedRef.current || !materialRef.current || !isWebGlActive) return;

    const prevIndex = prevActiveIndexRef.current;
    if (activeIndex === prevIndex) return;

    // Direction calculation:
    // Moving from a higher index (e.g. 0: Serum) to a lower index (e.g. 1: Toner) -> LEFT to RIGHT (1.0).
    // Moving from a lower index (e.g. 2: Sun protections) back to higher (e.g. 1: Toner) -> RIGHT to LEFT (-1.0).
    const direction = activeIndex > prevIndex ? 1.0 : -1.0;

    const textureCurrent = texturesRef.current[prevIndex] || texturesRef.current[0];
    const textureNext = texturesRef.current[activeIndex] || texturesRef.current[0];

    // Assign uniforms
    const uniforms = materialRef.current.uniforms;
    uniforms.uTextureCurrent.value = textureCurrent;
    uniforms.uTextureNext.value = textureNext;
    uniforms.uWaveDirection.value = direction;
    
    // Set aspect ratio of the primary texture
    if (textureNext.image && textureNext.image.width > 0) {
      uniforms.uTextureAspect.value = textureNext.image.width / textureNext.image.height;
    } else {
      uniforms.uTextureAspect.value = 1.5; // fallback
    }

    // GSAP clean uniform timeline triggers
    const anim = { val: 0.0 };
    uniforms.uProgress.value = 0.0;

    gsap.killTweensOf(anim);
    gsap.to(anim, {
      val: 1.15, // Let val sweep up to 1.15 to naturally animate and settle the residual ripple
      duration: 1.05, // Slowed down by ~25% for high-fashion elegance (prev 0.85)
      // Luxury skincare campaign cubic-bezier feel: smooth easeOut with immediate acceleration
      ease: 'power3.out',
      onUpdate: () => {
        uniforms.uProgress.value = anim.val;
      },
      onComplete: () => {
        // Safe keep to final state
        uniforms.uProgress.value = 1.15;
        prevActiveIndexRef.current = activeIndex;
      }
    });

    return () => {
      gsap.killTweensOf(anim);
    };
  }, [activeIndex, isWebGlActive]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/* 
        DOM Base Layer: High-performance immediate image crossfade (Foundation).
        This guarantees images instantly update, crossfade, and never freeze, bypasses WebGL initialization delays.
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.25, 1, 0.5, 1]
            }}
            className="absolute inset-0 w-full h-full"
          >
            <SafeImage
              src={categories[activeIndex].img}
              fallbackSrc={categories[categories[activeIndex] ? activeIndex : 0].fallback}
              alt={categories[activeIndex].title}
              className="absolute inset-0 w-full h-full object-cover brightness-95"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 
        The WebGL active canvas element (Enhancement).
        Fades in smoothly ONLY when WebGL is initialized, preloaded, and compiled without issue.
        If it fails, it remains hidden with opacity 0, exposing the perfect fallback layer below.
      */}
      <canvas
        ref={canvasRef}
        style={{
          opacity: (isPreloaded && isWebGlActive) ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.45s ease',
        }}
        className="absolute inset-0 w-full h-full block bg-transparent"
        aria-hidden="true"
      />

      {/* Elegant glass loading spinner fallback if nothing has ever loaded */}
      {!isPreloaded && (
        <div className="absolute inset-0 bg-[#FAF5F0] flex items-center justify-center z-30">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-t-2 border-stone-800 rounded-full animate-spin mb-3"></div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-stone-500">
              Loading ritual visual...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
