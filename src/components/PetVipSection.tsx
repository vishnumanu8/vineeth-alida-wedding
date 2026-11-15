import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';

/**
 * High-definition Champagne Gold SVG Paw Icon
 * Replaces native grey Unicode 🐾 emoji across all mobile devices
 */
export const GoldPawSvg: React.FC<{
  className?: string;
  fill?: string;
  size?: number | string;
}> = ({ className = 'w-4 h-4', fill = '#F0D49E', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill={fill}
    aria-hidden="true"
  >
    {/* Main central pad */}
    <ellipse cx="12" cy="15.8" rx="4.8" ry="3.8" />
    {/* 4 Toe beans */}
    <circle cx="6.2" cy="10.2" r="2.1" />
    <circle cx="10" cy="6.6" r="2.3" />
    <circle cx="14" cy="6.6" r="2.3" />
    <circle cx="17.8" cy="10.2" r="2.1" />
  </svg>
);

/**
 * 4-Point Golden Sparkle SVG
 */
const GoldSparkleSvg: React.FC<{
  className?: string;
  fill?: string;
  size?: number | string;
}> = ({ className = 'w-3.5 h-3.5', fill = '#F0D49E', size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill={fill}
    aria-hidden="true"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

interface TapParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'paw' | 'heart' | 'sparkle';
}

/**
 * Continuous Infinite Walking Paw Trail Component
 * 8 alternating footsteps with permanent outer coordinates and animated inner SVG
 */
const WalkingPawTrail: React.FC = () => {
  const pawSteps = [
    { x: 18,  y: 30, rot: -16, delay: 0 },
    { x: 56,  y: 18, rot: 14,  delay: 0.22 },
    { x: 94,  y: 28, rot: -14, delay: 0.44 },
    { x: 132, y: 16, rot: 16,  delay: 0.66 },
    { x: 170, y: 26, rot: -15, delay: 0.88 },
    { x: 208, y: 16, rot: 15,  delay: 1.10 },
    { x: 246, y: 26, rot: -14, delay: 1.32 },
    { x: 284, y: 18, rot: 16,  delay: 1.54 },
  ];

  return (
    <div className="w-full flex justify-center mb-3">
      <svg
        viewBox="0 0 310 46"
        className="w-64 sm:w-80 h-auto overflow-visible mx-auto"
        aria-label="Golden paw footsteps walking continuously"
      >
        <defs>
          <linearGradient id="walkingPawGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C89D54" />
            <stop offset="50%" stopColor="#F5E2B8" />
            <stop offset="100%" stopColor="#D4A359" />
          </linearGradient>
          <filter id="pawGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {pawSteps.map((paw, i) => (
          <g
            key={i}
            transform={`translate(${paw.x}, ${paw.y}) rotate(${paw.rot})`}
          >
            <motion.g
              animate={{
                opacity: [0.15, 1, 0.15],
                scale: [0.85, 1.18, 0.85],
              }}
              transition={{
                duration: 1.76,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: paw.delay,
              }}
              filter="url(#pawGlowFilter)"
            >
              <g transform="scale(0.85)">
                <ellipse cx="0" cy="0" rx="6.5" ry="5.2" fill="url(#walkingPawGoldGrad)" />
                <circle cx="-5.5" cy="-7.5" r="2.2" fill="url(#walkingPawGoldGrad)" />
                <circle cx="-1.8" cy="-10" r="2.5" fill="url(#walkingPawGoldGrad)" />
                <circle cx="2.6" cy="-10" r="2.5" fill="url(#walkingPawGoldGrad)" />
                <circle cx="6.2" cy="-7.5" r="2.2" fill="url(#walkingPawGoldGrad)" />
              </g>
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const PetVipSection: React.FC = () => {
  const { pets } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-10% 0px -10% 0px' });

  const [loveCount, setLoveCount] = useState(0);
  const [tapParticles, setTapParticles] = useState<TapParticle[]>([]);
  const [isTapped, setIsTapped] = useState(false);
  const lastTapRef = useRef<number>(0);

  // 6 Continuous ambient floaters in upper space of pet portrait
  const ambientFloaters = [
    { id: 1, type: 'paw', left: '16%', startTop: 38, duration: 4.6, delay: 0 },
    { id: 2, type: 'heart', left: '38%', startTop: 45, duration: 5.2, delay: 1.1 },
    { id: 3, type: 'sparkle', left: '68%', startTop: 40, duration: 4.8, delay: 2.2 },
    { id: 4, type: 'paw', left: '84%', startTop: 44, duration: 5.0, delay: 0.6 },
    { id: 5, type: 'heart', left: '26%', startTop: 36, duration: 4.4, delay: 3.0 },
    { id: 6, type: 'sparkle', left: '54%', startTop: 46, duration: 5.4, delay: 1.8 },
  ];

  // Automatic periodic particle emitter while section is in viewport
  useEffect(() => {
    if (!isInView) return;

    const particleTypes: ('paw' | 'heart' | 'sparkle')[] = ['paw', 'heart', 'sparkle', 'paw'];
    const interval = setInterval(() => {
      const newParticle: TapParticle = {
        id: Date.now() + Math.random(),
        x: 35 + Math.random() * 240,
        y: 220 + Math.random() * 50,
        size: 16 + Math.random() * 8,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      };

      setTapParticles((prev) => [...prev.slice(-8), newParticle]);

      setTimeout(() => {
        setTapParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 2000);
    }, 1800);

    return () => clearInterval(interval);
  }, [isInView]);

  // Tap micro-interaction: burst of love & confetti
  // Uses strict event stopPropagation and debounce guard to guarantee exactly +1 per physical tap
  const handleSendLove = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    const now = Date.now();
    if (now - lastTapRef.current < 250) {
      return;
    }
    lastTapRef.current = now;

    setLoveCount((prev) => prev + 1);
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 350);

    const rect = cardRef.current?.getBoundingClientRect();
    const spawnX = e && rect ? e.clientX - rect.left : 150;
    const spawnY = e && rect ? e.clientY - rect.top : 220;

    const types: ('paw' | 'heart' | 'sparkle')[] = ['paw', 'heart', 'sparkle', 'paw', 'heart'];
    const burst: TapParticle[] = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: spawnX + (Math.random() - 0.5) * 80,
      y: spawnY + (Math.random() - 0.5) * 40,
      size: 18 + Math.random() * 10,
      type: types[i % types.length],
    }));

    setTapParticles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setTapParticles((prev) => prev.filter((item) => !burst.some((b) => b.id === item.id)));
    }, 2000);

    // Golden celebratory confetti burst
    try {
      const clientX = e ? e.clientX : window.innerWidth / 2;
      const clientY = e ? e.clientY : window.innerHeight / 2;
      confetti({
        particleCount: 26,
        spread: 65,
        origin: {
          x: clientX / window.innerWidth,
          y: clientY / window.innerHeight,
        },
        colors: ['#F0D49E', '#D4A359', '#1C2A4F', '#FFF9F1'],
        ticks: 120,
        gravity: 1.1,
        scalar: 0.9,
      });
    } catch {
      // Confetti fallback
    }
  };

  if (!pets || !pets.enabled) return null;

  return (
    <section
      ref={sectionRef}
      id="four-legged-vips"
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden select-none"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* ===================================================================
            1. INFINITE WORKING GOLDEN PAW TRAIL (Continuous Rhythmic Loop)
            =================================================================== */}
        <WalkingPawTrail />

        {/* ===================================================================
            2. HIGH-CONTRAST SECTION HEADER WITH GOLD SVG PAW
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111D4A] border border-gold/40 text-gold-shimmer text-xs uppercase tracking-widest font-semibold mb-2.5 shadow-sm">
            <GoldPawSvg className="w-3.5 h-3.5 text-gold fill-gold" />
            <span>{pets.sectionBadge.replace('✨ ', '').replace('🐾', '').trim()}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FAF6F0] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {pets.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#E5C158] mt-1.5 max-w-md mx-auto tracking-wide font-sans">
            {pets.subtitle}
          </p>
        </motion.div>

        {/* ===================================================================
            3. CONTINUOUS LIVING PET FRAME: 3D FLOATING, BORDER BEAM & UPPER OVERLAY
            =================================================================== */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full max-w-sm sm:max-w-md"
        >
          {/* Continuous Shimmering Gold Border Beam */}
          <div
            className="absolute -inset-[2px] rounded-3xl opacity-75 blur-[1px] pointer-events-none overflow-hidden"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, transparent 75deg, #F0D49E 100deg, #D4A359 135deg, transparent 160deg)',
              animation: 'borderBeamSpin 5s linear infinite',
            }}
          />

          <div
            ref={cardRef}
            onClick={handleSendLove}
            className={`relative w-full rounded-3xl bg-[#FFFDF9] border border-gold/45 shadow-wedding-lg p-3 sm:p-5 flex flex-col items-center cursor-pointer transition-transform duration-300 ${
              isTapped ? 'scale-[0.98]' : 'hover:scale-[1.01]'
            }`}
            role="button"
            tabIndex={0}
            aria-label="Tap to send love and paws to the family pets"
          >
            {/* Corner Filigrees with Golden Paws */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-gold pointer-events-none" />

            {/* Tightened Pet Photography Container with Animated Upper Space */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-gold/30 bg-[#0E1738] shadow-inner">
              <img
                src={pets.image}
                alt={pets.imageAlt}
                className="w-full h-full object-cover object-bottom filter brightness-[1.02] contrast-[1.03]"
                loading="lazy"
              />

              {/* Upper Space Continuous Floating Overlay (Hearts, Sparkles, Mini Paws) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {ambientFloaters.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ y: 0, opacity: 0, scale: 0.8 }}
                    animate={{
                      y: [-8, -75],
                      opacity: [0, 0.9, 0],
                      scale: [0.8, 1.15, 0.85],
                      x: [0, f.id % 2 === 0 ? 8 : -8, 0],
                    }}
                    transition={{
                      duration: f.duration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: f.delay,
                    }}
                    className="absolute drop-shadow-[0_2px_6px_rgba(212,163,89,0.85)]"
                    style={{ left: f.left, top: `${f.startTop}%` }}
                  >
                    {f.type === 'paw' && <GoldPawSvg size={15} fill="#F5E2B8" />}
                    {f.type === 'heart' && <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/85" />}
                    {f.type === 'sparkle' && <GoldSparkleSvg className="w-3.5 h-3.5" fill="#FFFDF7" />}
                  </motion.div>
                ))}
              </div>

              {/* Bottom subtle gradient */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none" />

              {/* Tap Burst Hearts & Paws Overlay */}
              <AnimatePresence>
                {tapParticles.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, scale: 0.6, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.4,
                      y: -110,
                      x: (Math.random() - 0.5) * 50,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="pointer-events-none absolute z-30 select-none drop-shadow-md"
                    style={{
                      left: `${item.x}px`,
                      top: `${item.y}px`,
                    }}
                  >
                    {item.type === 'paw' && <GoldPawSvg size={item.size} fill="#F0D49E" />}
                    {item.type === 'heart' && <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />}
                    {item.type === 'sparkle' && <GoldSparkleSvg className="w-4 h-4" fill="#FFFDF7" />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Heartfelt Caption Prose */}
            <div className="mt-4 px-2 text-center">
              <p className="font-display italic text-sm sm:text-base text-botanical font-medium leading-relaxed">
                &ldquo;{pets.description}&rdquo;
              </p>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="h-[1px] w-6 bg-gold/50" />
                <span className="text-[11px] uppercase tracking-widest text-gold font-semibold">
                  Family &amp; Forever Friends
                </span>
                <span className="h-[1px] w-6 bg-gold/50" />
              </div>
            </div>

            {/* Interactive Tap Button with Crisp Gold Paw SVG */}
            <div className="mt-4 w-full flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendLove(e);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-botanical hover:bg-botanical-light text-pearl text-xs sm:text-sm font-medium border border-gold/40 shadow-sm transition-all hover:shadow cursor-pointer min-h-[42px] active:scale-95"
              >
                <GoldPawSvg className="w-4 h-4 text-gold fill-[#F0D49E]" />
                <span>Send Love &amp; Paws</span>
                {loveCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-gold/20 text-gold-shimmer text-[11px] font-semibold">
                    +{loveCount}
                  </span>
                )}
                <Heart className="w-3.5 h-3.5 text-rose fill-rose" />
              </button>
            </div>

            <span className="text-[10px] text-slate/75 mt-2 font-sans tracking-wide">
              ✦ Tap anywhere on the photo to shower them with love! ✦
            </span>
          </div>
        </motion.div>
      </div>

      {/* Embedded 60fps Keyframe Animations for Border Beam */}
      <style>{`
        @keyframes borderBeamSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};
