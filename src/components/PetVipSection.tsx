import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../config/weddingConfig';

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

export const PetVipSection: React.FC = () => {
  const { pets } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-10% 0px -10% 0px' });

  const [loveCount, setLoveCount] = useState(0);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [isTapped, setIsTapped] = useState(false);

  // Automatic continuous particle emitter while section is in viewport
  useEffect(() => {
    if (!isInView) return;

    const emojis = ['🐾', '💛', '✨', '🐾', '💖'];
    const interval = setInterval(() => {
      const newParticle: FloatingParticle = {
        id: Date.now() + Math.random(),
        x: 30 + Math.random() * 260,
        y: 280 + Math.random() * 40,
        size: 14 + Math.random() * 10,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };

      setParticles((prev) => {
        const next = [...prev.slice(-12), newParticle];
        return next;
      });

      // Cleanup
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 2000);
    }, 1500);

    return () => clearInterval(interval);
  }, [isInView]);

  // Tap micro-interaction: burst of love & confetti
  const handleSendLove = (e: React.MouseEvent) => {
    setLoveCount((prev) => prev + 1);
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 350);

    const rect = cardRef.current?.getBoundingClientRect();
    const spawnX = rect ? e.clientX - rect.left : 150;
    const spawnY = rect ? e.clientY - rect.top : 200;

    const emojis = ['🐾', '💛', '✨', '🐾', '💖', '🐾'];
    const burst: FloatingParticle[] = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: spawnX + (Math.random() - 0.5) * 80,
      y: spawnY + (Math.random() - 0.5) * 40,
      size: 18 + Math.random() * 14,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setParticles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((item) => !burst.some((b) => b.id === item.id)));
    }, 2000);

    // Golden confetti burst
    try {
      confetti({
        particleCount: 26,
        spread: 65,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#F0D49E', '#D4A359', '#315B4B', '#FFF9F1'],
        ticks: 120,
        gravity: 1.1,
        scalar: 0.9,
      });
    } catch {
      // Confetti fallback
    }
  };

  if (!pets || !pets.enabled) return null;

  // 6 Stepping Paws with infinite walking sequence
  const walkingPaws = [
    { x: 30, y: 24, rot: -18, delay: 0 },
    { x: 70, y: 12, rot: 16, delay: 0.35 },
    { x: 110, y: 24, rot: -16, delay: 0.7 },
    { x: 150, y: 12, rot: 18, delay: 1.05 },
    { x: 190, y: 24, rot: -18, delay: 1.4 },
    { x: 230, y: 12, rot: 16, delay: 1.75 },
  ];

  return (
    <section
      ref={sectionRef}
      id="four-legged-vips"
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden select-none"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* ===================================================================
            INFINITE WALKING GOLDEN PAW TRAIL (Continuous Rhythmic Loop)
            =================================================================== */}
        <div className="w-full flex justify-center mb-3">
          <svg
            viewBox="0 0 260 45"
            className="w-56 sm:w-72 h-auto overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="walkingPawGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C89D54" />
                <stop offset="50%" stopColor="#F0D49E" />
                <stop offset="100%" stopColor="#C89D54" />
              </linearGradient>
            </defs>

            {walkingPaws.map((paw, i) => (
              <g
                key={i}
                transform={`translate(${paw.x}, ${paw.y}) rotate(${paw.rot}) scale(0.72)`}
                style={{
                  animation: `pawStep 2.1s infinite ease-in-out`,
                  animationDelay: `${paw.delay}s`,
                }}
              >
                <ellipse cx="0" cy="0" rx="9" ry="7.5" fill="url(#walkingPawGold)" />
                <circle cx="-7.5" cy="-9.5" r="3.2" fill="url(#walkingPawGold)" />
                <circle cx="-2.5" cy="-12.5" r="3.5" fill="url(#walkingPawGold)" />
                <circle cx="3.5" cy="-12.5" r="3.5" fill="url(#walkingPawGold)" />
                <circle cx="8" cy="-9" r="3.2" fill="url(#walkingPawGold)" />
              </g>
            ))}
          </svg>
        </div>

        {/* ===================================================================
            HIGH-CONTRAST SECTION HEADER
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B1E16] border border-gold/40 text-gold-shimmer text-xs uppercase tracking-widest font-semibold mb-2.5 shadow-sm">
            <span>🐾</span>
            <span>{pets.sectionBadge}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FAF6F0] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {pets.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#E5C158] mt-1.5 max-w-md mx-auto tracking-wide font-sans">
            {pets.subtitle}
          </p>
        </motion.div>

        {/* ===================================================================
            CONTINUOUS LIVING PET FRAME: 3D FLOATING, BORDER BEAM & EMANATING PARTICLES
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
            {/* Corner Filigrees with Tiny Walking Golden Paws */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-gold pointer-events-none" />

            {/* Genuine Uncropped Dog Photography Container */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-gold/30 bg-[#0B1A13] shadow-inner">
              <img
                src={pets.image}
                alt={pets.imageAlt}
                className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
                loading="lazy"
              />

              {/* Bottom subtle gradient */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none" />

              {/* Automatic & Tap Floating Hearts & Paws Overlay */}
              <AnimatePresence>
                {particles.map((item) => (
                  <motion.span
                    key={item.id}
                    initial={{ opacity: 1, scale: 0.6, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.45,
                      y: -110,
                      x: (Math.random() - 0.5) * 50,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="pointer-events-none absolute z-30 select-none drop-shadow-md"
                    style={{
                      left: `${item.x}px`,
                      top: `${item.y}px`,
                      fontSize: `${item.size}px`,
                    }}
                  >
                    {item.emoji}
                  </motion.span>
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

            {/* Interactive Tap Button */}
            <div className="mt-4 w-full flex items-center justify-center">
              <button
                type="button"
                onClick={handleSendLove}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-botanical hover:bg-botanical-light text-pearl text-xs sm:text-sm font-medium border border-gold/40 shadow-sm transition-all hover:shadow cursor-pointer min-h-[42px]"
              >
                <span>🐾</span>
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

      {/* Embedded 60fps Keyframe Animations for Paws & Border Beam */}
      <style>{`
        @keyframes pawStep {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.65) translateY(4px);
          }
          30%, 65% {
            opacity: 1;
            transform: scale(0.9) translateY(0);
            filter: drop-shadow(0 0 6px #F0D49E);
          }
        }
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
