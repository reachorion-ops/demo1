import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowUpRight } from 'lucide-react';

interface LiquidHeroCanvasProps {
  onExploreClick?: () => void;
  onLeasingClick?: () => void;
}

interface WavePulse {
  x: number;
  y: number;
  birthTime: number;
  power: number;
}

const MAX_PULSES = 10;

export default function LiquidHeroCanvas({ onExploreClick, onLeasingClick }: LiquidHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const pulsesRef = useRef<WavePulse[]>([]);
  const lastRipplePosRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const lastEmitTimeRef = useRef<number>(0);

  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uPulses: { value: new Float32Array(MAX_PULSES * 4) },
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      precision: 'highp',
    });

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    const drawingBufferSize = new THREE.Vector2();
    renderer.getDrawingBufferSize(drawingBufferSize);
    uniformsRef.current.uResolution.value.copy(drawingBufferSize);

    container.innerHTML = '';
    container.appendChild(canvas);

    // Highly Luminous, Clearly Visible 4K Liquid Chrome & Volt Reflection Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform vec4 uPulses[${MAX_PULSES}];

      varying vec2 vUv;

      float getSurfaceHeight(vec2 p) {
        float t = uTime * 0.32; // Smooth, luxurious, viscous tempo

        // Subtle angle rotation for organic, sculptural liquid flow
        float c = 0.93;
        float s = 0.37;
        vec2 rp = vec2(p.x * c - p.y * s, p.x * s + p.y * c);

        // 1. Broad rolling liquid swells (deep, undulating, pronounced)
        float h = 0.0;
        h += sin(rp.x * 2.4 + t) * cos(rp.y * 1.9 + t * 0.85) * 0.18;
        h += sin(rp.x * 1.3 - rp.y * 2.2 - t * 0.6) * 0.14;
        h += cos(rp.x * 3.1 + rp.y * 2.7 + t * 1.05) * 0.07;
        h += sin(rp.x * 0.85 + rp.y * 1.15 - t * 0.4) * 0.15;

        // 2. Continuous cursor wake displacement
        float dMouse = distance(p, uMouse);
        if (dMouse < 0.85) {
          float mDist = dMouse / 0.85;
          float mWave = sin(dMouse * 14.0 - uTime * 2.0) * (1.0 - mDist) * 0.18;
          h += mWave;
        }

        // 3. Dynamic expanding viscous ripples from clicks and motion
        for (int i = 0; i < ${MAX_PULSES}; i++) {
          vec4 pulse = uPulses[i];
          float age = uTime - pulse.z;
          if (age > 0.0 && age < 4.0) {
            float dist = distance(p, pulse.xy);
            float radius = age * 0.45;
            float delta = dist - radius;
            
            float envelope = exp(-delta * delta * 24.0);
            float damping = exp(-age * 0.65);
            float wave = sin(delta * 14.0) * envelope * damping * pulse.w * 0.22;
            h += wave;
          }
        }

        return h;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float aspect = uResolution.x / uResolution.y;

        vec2 p = uv;
        p.x *= aspect;

        // Finite difference sampling with 4K-calibrated delta
        float eps = 0.0028;
        float hCenter = getSurfaceHeight(p);
        float hRight  = getSurfaceHeight(p + vec2(eps, 0.0));
        float hUp     = getSurfaceHeight(p + vec2(0.0, eps));

        float dX = (hRight - hCenter) / eps;
        float dY = (hUp - hCenter) / eps;

        // Pronounced 3D metallic liquid surface normal
        vec3 normal = normalize(vec3(-dX * 0.65, -dY * 0.65, 1.0));

        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 R = reflect(-viewDir, normal);

        // Architectural Studio Softbox Lighting Model
        vec3 lightDir1 = normalize(vec3(0.45, 0.65, 0.60)); // Key softbox
        float softbox1 = pow(max(0.0, dot(R, lightDir1)), 3.2);
        float spec1    = pow(max(0.0, dot(R, lightDir1)), 26.0);

        vec3 lightDir2 = normalize(vec3(-0.55, -0.30, 0.65)); // Counter fill softbox
        float softbox2 = pow(max(0.0, dot(R, lightDir2)), 3.8);
        float spec2    = pow(max(0.0, dot(R, lightDir2)), 22.0);

        vec3 lightDir3 = normalize(vec3(0.0, 0.85, 0.45)); // Overhead studio strip
        float softbox3 = pow(max(0.0, dot(R, lightDir3)), 4.2);

        // Highly Visible, Luminous Liquid Chrome Palette
        vec3 deepTitanium  = vec3(0.16, 0.18, 0.22); // Deep liquid shadow with high visibility
        vec3 liquidMercury = vec3(0.50, 0.54, 0.60); // Radiant silver midtone body
        vec3 moltenSilver  = vec3(0.88, 0.91, 0.96); // Bright studio reflection
        vec3 mirrorWhite   = vec3(1.00, 1.00, 1.00); // 4K specular glints

        // Bottega Volt Green Shimmer (#ccff00)
        vec3 voltGlint     = vec3(0.80, 1.00, 0.00);

        // Surface curvature & Fresnel
        float curvature = length(vec2(dX, dY));
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.6);

        // Base metallic composition
        float horizonFill = smoothstep(-0.4, 0.6, R.y);
        vec3 color = mix(deepTitanium, liquidMercury, horizonFill * 0.7 + 0.3);

        // Add softboxes & highlights for brilliant metallic clarity
        color += moltenSilver * (softbox1 * 0.65 + softbox2 * 0.45 + softbox3 * 0.35);
        color += mirrorWhite * (spec1 * 0.85 + spec2 * 0.55);

        // High-fashion volt green glint on liquid wave crests and glancing edges
        float voltShimmer = pow(curvature * 0.52, 2.2) * 0.35 + fresnel * 0.16;
        color += voltGlint * clamp(voltShimmer, 0.0, 0.50);

        // Smooth transition to black at the very bottom edge
        float bottomFade = smoothstep(0.0, 0.14, uv.y);
        color = mix(color * 0.4, color, bottomFade);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let currentMouse = new THREE.Vector2(0.5, 0.5);

    const emitPulse = (x: number, y: number, power: number) => {
      const now = uniformsRef.current.uTime.value;
      const aspect = container.clientWidth / container.clientHeight;
      const correctedX = x * aspect;

      pulsesRef.current.push({
        x: correctedX,
        y: y,
        birthTime: now,
        power: Math.min(1.6, power),
      });

      if (pulsesRef.current.length > MAX_PULSES) {
        pulsesRef.current.shift();
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse.set(x, y);

      const dx = x - lastRipplePosRef.current.x;
      const dy = y - lastRipplePosRef.current.y;
      const dist = Math.hypot(dx, dy);

      const now = performance.now() * 0.001;
      if (dist > 0.02 && now - lastEmitTimeRef.current > 0.10) {
        emitPulse(x, y, dist * 10.0);
        lastRipplePosRef.current.set(x, y);
        lastEmitTimeRef.current = now;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = 1.0 - (touch.clientY - rect.top) / rect.height;
        targetMouse.set(x, y);

        const now = performance.now() * 0.001;
        if (now - lastEmitTimeRef.current > 0.10) {
          emitPulse(x, y, 1.0);
          lastEmitTimeRef.current = now;
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      emitPulse(x, y, 1.8);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('click', onClick);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const pr = Math.min(window.devicePixelRatio || 1, 2.5);
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h);
      renderer.getDrawingBufferSize(drawingBufferSize);
      uniformsRef.current.uResolution.value.copy(drawingBufferSize);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      uniformsRef.current.uTime.value += delta;

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.09;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.09;

      const aspect = container.clientWidth / container.clientHeight;
      uniformsRef.current.uMouse.value.set(currentMouse.x * aspect, currentMouse.y);

      const arr = uniformsRef.current.uPulses.value;
      for (let i = 0; i < MAX_PULSES; i++) {
        if (i < pulsesRef.current.length) {
          const p = pulsesRef.current[i];
          arr[i * 4 + 0] = p.x;
          arr[i * 4 + 1] = p.y;
          arr[i * 4 + 2] = p.birthTime;
          arr[i * 4 + 3] = p.power;
        } else {
          arr[i * 4 + 2] = -999.0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* High-Visibility 4K Liquid Chrome Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 cursor-pointer"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Subtle atmospheric vignette that protects text legibility while keeping liquid 100% visible */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.38)_100%)]" />

      {/* Hero Editorial Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 pb-24 flex flex-col items-center text-center select-none">

        {/* Minimal Frosted Luxury Eyebrow with Volt Core */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-100 mb-8 shadow-sm animate-fade-in-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
          <span>BENGALURU • SANCTUARY OF ARCHITECTURE & COMMERCE</span>
        </div>

        {/* Stark Pure White & Platinum Gradient Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-white max-w-5xl tracking-tight leading-[1.05] mb-8 animate-fade-in-up animation-delay-100">
          Where Architectural Wonder <br />
          <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-editorial italic font-normal">
            Meets Haute Horlogerie & Couture.
          </span>
        </h1>

        {/* Crisp Editorial Body Copy with Highlighted Cadence */}
        <p className="max-w-2xl text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-12 tracking-wide font-sans animate-fade-in-up animation-delay-200">
          Spanning <span className="text-white font-normal">1.8 million square feet</span> along Bengaluru’s Outer Ring Road luxury corridor, The Aranya Promenade gathers <span className="text-white font-normal">240 global maisons</span>, al fresco culinary terraces, and South India’s first Onyx Cinema LED under a <span className="text-white font-normal">65-metre living glass canopy</span>.
        </p>

        {/* Action Buttons: High-Fashion Volt Green Accent Capsule & Frosted Sister CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 animate-fade-in-up animation-delay-300">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#ccff00] hover:bg-[#d8ff1a] text-black font-semibold text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(204,255,0,0.35)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)] active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Explore Spatial Tiers</span>
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={onLeasingClick}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.18] backdrop-blur-xl text-white border border-white/25 font-mono text-xs tracking-[0.16em] uppercase transition-all duration-300 hover:border-white/50 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <span>Commercial Leasing Dossier</span>
          </button>
        </div>

        {/* Architectural Frosted Glass Metric Strip */}
        <div className="mt-20 w-full max-w-4xl p-6 sm:p-7 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 select-none shadow-2xl animate-fade-in-up animation-delay-400">
          <div className="text-left">
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Total Scale</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">1.8M <span className="text-xs font-mono text-[#ccff00]">sq.ft</span></div>
            <div className="text-[11px] text-zinc-400 font-light mt-0.5">Gross Leasable Area</div>
          </div>

          <div className="text-left">
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Botanicals</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">40,000+</div>
            <div className="text-[11px] text-zinc-400 font-light mt-0.5">Preserved Native Flora</div>
          </div>

          <div className="text-left">
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Curated Salons</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1">240+</div>
            <div className="text-[11px] text-zinc-400 font-light mt-0.5">International Maisons</div>
          </div>

          <div className="text-left">
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Sustainability</div>
            <div className="text-2xl sm:text-3xl font-display text-white mt-1 flex items-center gap-1.5">
              <span>LEED Plat.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            </div>
            <div className="text-[11px] text-zinc-400 font-light mt-0.5">Net Zero Carbon 2028</div>
          </div>
        </div>

        {/* Interactive Gesture Hint */}
        <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-zinc-400 text-[10px] font-mono tracking-[0.2em] uppercase animate-subtle-float">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/80" />
          <span>Glide cursor across liquid surface to disperse waves</span>
        </div>

      </div>
    </div>
  );
}
