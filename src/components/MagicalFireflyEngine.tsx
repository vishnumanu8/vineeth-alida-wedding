import React, { useEffect, useRef } from 'react';

interface Firefly {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  vx: number;
  vy: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  angle: number;
  angularSpeed: number;
  orbitRadius: number;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  vy: number;
  vx: number;
  alpha: number;
  targetAlpha: number;
  color: string;
}

interface Stardust {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

export const MagicalFireflyEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Palette: Champagne gold, radiant gold, warm ivory
    const goldPalette = [
      { core: '#FFF6DF', glow: 'rgba(240, 212, 158, 0.7)' },
      { core: '#F0D49E', glow: 'rgba(212, 163, 89, 0.8)' },
      { core: '#E5C158', glow: 'rgba(229, 193, 88, 0.75)' },
      { core: '#FFDF9E', glow: 'rgba(255, 223, 158, 0.65)' },
    ];

    // Layer 1: 26 Glowing Golden Fireflies (sparse, elegant & breathable ambient density)
    const fireflyCount = prefersReducedMotion ? 8 : 26;
    const fireflies: Firefly[] = Array.from({ length: fireflyCount }, () => {
      const palette = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.6 + Math.random() * 2.2,
        color: palette.core,
        glowColor: palette.glow,
        vx: (Math.random() - 0.5) * 1.15,
        vy: -0.28 - Math.random() * 0.85,
        baseAlpha: 0.35 + Math.random() * 0.55,
        pulseSpeed: 1.5 + Math.random() * 2.2,
        pulsePhase: Math.random() * Math.PI * 2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.035,
        orbitRadius: 15 + Math.random() * 30,
      };
    });

    // Layer 2: 6 Soft Bokeh Light Orbs (delicate depth accents)
    const bokehOrbs: BokehOrb[] = Array.from({ length: 6 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 40 + Math.random() * 65,
      vy: -0.11 - Math.random() * 0.22,
      vx: (Math.random() - 0.5) * 0.16,
      alpha: 0.03 + Math.random() * 0.07,
      targetAlpha: 0.04 + Math.random() * 0.07,
      color: Math.random() > 0.5 ? '240, 212, 158' : '212, 163, 89',
    }));

    // Layer 3: 20 Floating Golden Botanical Dust / Stardust
    const stardustCount = prefersReducedMotion ? 6 : 20;
    const stardusts: Stardust[] = Array.from({ length: stardustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.9 + Math.random() * 1.4,
      vy: -0.22 - Math.random() * 0.45,
      vx: (Math.random() - 0.5) * 0.35,
      alpha: 0.2 + Math.random() * 0.6,
      twinkleSpeed: 2.2 + Math.random() * 2.8,
      twinklePhase: Math.random() * Math.PI * 2,
      color: '#FFFDF7',
    }));

    let lastTime = performance.now();

    // Main 60fps render loop
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // --- Draw Layer 2: Soft Bokeh Orbs (Background layer) ---
      for (const orb of bokehOrbs) {
        orb.y += orb.vy * 60 * dt;
        orb.x += orb.vx * 60 * dt;
        if (orb.y < -orb.radius * 2) {
          orb.y = height + orb.radius * 2;
          orb.x = Math.random() * width;
        }
        if (orb.x < -orb.radius * 2) orb.x = width + orb.radius * 2;
        if (orb.x > width + orb.radius * 2) orb.x = -orb.radius * 2;

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${orb.color}, ${orb.alpha * 0.45})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Draw Layer 3: Floating Golden Botanical Stardust ---
      for (const dust of stardusts) {
        dust.y += dust.vy * 60 * dt;
        dust.x += dust.vx * 60 * dt;
        if (dust.y < -10) {
          dust.y = height + 10;
          dust.x = Math.random() * width;
        }
        if (dust.x < -10) dust.x = width + 10;
        if (dust.x > width + 10) dust.x = -10;

        const currentAlpha =
          dust.alpha * (0.6 + 0.4 * Math.sin(currentTime * 0.003 * dust.twinkleSpeed + dust.twinklePhase));

        ctx.fillStyle = dust.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Draw Layer 1: Glowing Golden Fireflies (Foreground layer) ---
      for (const f of fireflies) {
        f.angle += f.angularSpeed * 60 * dt;
        f.y += f.vy * 60 * dt;
        f.x += (f.vx + Math.sin(f.angle) * 0.55) * 60 * dt;

        if (f.y < -20) {
          f.y = height + 20;
          f.x = Math.random() * width;
        }
        if (f.x < -20) f.x = width + 20;
        if (f.x > width + 20) f.x = -20;

        const pulse = Math.sin(currentTime * 0.002 * f.pulseSpeed + f.pulsePhase);
        const currentAlpha = f.baseAlpha * (0.65 + 0.35 * pulse);
        const currentRadius = f.radius * (0.9 + 0.2 * pulse);

        // Outer glow
        const glowRadius = currentRadius * 3.8;
        const glowGrad = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          glowRadius
        );
        glowGrad.addColorStop(0, f.glowColor);
        glowGrad.addColorStop(1, 'rgba(212, 163, 89, 0)');

        ctx.fillStyle = glowGrad;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = f.color;
        ctx.globalAlpha = Math.min(1, currentAlpha * 1.4);
        ctx.beginPath();
        ctx.arc(f.x, f.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause when page is hidden to save battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
};
