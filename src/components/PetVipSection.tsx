import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
}> = ({ className = 'w-3 h-3', fill = '#F0D49E', size }) => (
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
 * Subtle Compact Walking Paw Trail Component
 * 6 delicate footsteps with alternating positions leading softly into the card
 */
const SubtlePawTrail: React.FC = () => {
  const pawSteps = [
    { x: 12,  y: 18, rot: -15, delay: 0 },
    { x: 42,  y: 10, rot: 15,  delay: 0.25 },
    { x: 72,  y: 18, rot: -14, delay: 0.50 },
    { x: 102, y: 10, rot: 14,  delay: 0.75 },
    { x: 132, y: 18, rot: -15, delay: 1.00 },
    { x: 162, y: 10, rot: 15,  delay: 1.25 },
  ];

  return (
    <div className="w-full flex justify-center mb-2.5 pointer-events-none">
      <svg
        viewBox="0 0 178 30"
        className="w-40 sm:w-48 h-auto overflow-visible mx-auto"
        aria-label="Delicate golden paw footsteps"
      >
        <defs>
          <linearGradient id="compactPawGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C89D54" />
            <stop offset="50%" stopColor="#F5E2B8" />
            <stop offset="100%" stopColor="#D4A359" />
          </linearGradient>
        </defs>

        {pawSteps.map((paw, i) => (
          <g
            key={i}
            transform={`translate(${paw.x}, ${paw.y}) rotate(${paw.rot})`}
          >
            <motion.g
              animate={{
                opacity: [0.12, 0.85, 0.12],
                scale: [0.85, 1.12, 0.85],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: paw.delay,
              }}
            >
              <g transform="scale(0.55)">
                <ellipse cx="0" cy="0" rx="6.5" ry="5.2" fill="url(#compactPawGold)" />
                <circle cx="-5.5" cy="-7.5" r="2.2" fill="url(#compactPawGold)" />
                <circle cx="-1.8" cy="-10" r="2.5" fill="url(#compactPawGold)" />
                <circle cx="2.6" cy="-10" r="2.5" fill="url(#compactPawGold)" />
                <circle cx="6.2" cy="-7.5" r="2.2" fill="url(#compactPawGold)" />
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
  const cardRef = useRef<HTMLDivElement>(null);

  const [loveCount, setLoveCount] = useState(0);
  const [tapParticles, setTapParticles] = useState<TapParticle[]>([]);
  const [isTapped, setIsTapped] = useState(false);
  const lastTapRef = useRef<number>(0);

  // Micro-interaction: burst of love & confetti
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
    setTimeout(() => setIsTapped(false), 300);

    const rect = cardRef.current?.getBoundingClientRect();
    const spawnX = e && rect ? e.clientX - rect.left : 140;
    const spawnY = e && rect ? e.clientY - rect.top : 120;

    const types: ('paw' | 'heart' | 'sparkle')[] = ['paw', 'heart', 'sparkle', 'paw'];
    const burst: TapParticle[] = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      x: spawnX + (Math.random() - 0.5) * 60,
      y: spawnY + (Math.random() - 0.5) * 30,
      size: 16 + Math.random() * 8,
      type: types[i % types.length],
    }));

    setTapParticles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setTapParticles((prev) => prev.filter((item) => !burst.some((b) => b.id === item.id)));
    }, 1800);

    // Celebratory confetti burst
    try {
      const clientX = e ? e.clientX : window.innerWidth / 2;
      const clientY = e ? e.clientY : window.innerHeight / 2;
      confetti({
        particleCount: 20,
        spread: 55,
        origin: {
          x: clientX / window.innerWidth,
          y: clientY / window.innerHeight,
        },
        colors: ['#F0D49E', '#D4A359', '#1C2A4F', '#FFF9F1'],
        ticks: 100,
        gravity: 1.2,
        scalar: 0.85,
      });
    } catch {
      // Confetti fallback
    }
  };

  if (!pets || !pets.enabled) return null;

  return (
    <section
      id="four-legged-vips"
      className="relative py-8 sm:py-12 px-4 sm:px-6 overflow-hidden select-none"
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Animated Paw Trail */}
        <SubtlePawTrail />

        {/* ===================================================================
            COMPACT ELEGANT FEATURE CARD: "And Three Very Special Guests"
            Gentle scroll reveal with restrained proportions
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div
            ref={cardRef}
            onClick={handleSendLove}
            className={`relative rounded-3xl bg-[#FFFDF9] border border-gold/40 shadow-wedding p-4 sm:p-5 flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isTapped ? 'scale-[0.98]' : 'hover:border-gold/60'
            }`}
            role="button"
            tabIndex={0}
            aria-label="Tap to send love to the special guests"
          >
            {/* Delicate Corner Filigrees */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-gold/40 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-gold/40 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-gold/40 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-gold/40 pointer-events-none" />

            {/* Micro Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111D4A] border border-gold/40 text-gold-shimmer text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold mb-2 shadow-xs">
              <GoldPawSvg className="w-3 h-3 text-gold fill-gold" />
              <span>{pets.sectionBadge.replace('✨ ', '').replace('🐾', '').trim()}</span>
            </div>

            {/* Concept Title: "And Three Very Special Guests" */}
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-botanical tracking-tight leading-snug">
              {pets.title}
            </h3>

            {/* Compact Framed Photograph of the Dogs */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 my-3 rounded-2xl overflow-hidden border border-gold/35 bg-[#0E1738] shadow-inner shrink-0 group">
              <img
                src={pets.image}
                alt={pets.imageAlt}
                className="w-full h-full object-cover object-bottom filter brightness-[1.02] contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Bottom subtle gradient vignette */}
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Tap Burst Particles Overlay */}
              <AnimatePresence>
                {tapParticles.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, scale: 0.6, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.3,
                      y: -70,
                      x: (Math.random() - 0.5) * 40,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="pointer-events-none absolute z-30 select-none drop-shadow-md"
                    style={{
                      left: `${item.x}px`,
                      top: `${item.y}px`,
                    }}
                  >
                    {item.type === 'paw' && <GoldPawSvg size={item.size} fill="#F0D49E" />}
                    {item.type === 'heart' && <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />}
                    {item.type === 'sparkle' && <GoldSparkleSvg className="w-3 h-3" fill="#FFFDF7" />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Short Playful Caption */}
            <p className="font-serif italic text-xs sm:text-[13px] text-charcoal/85 leading-relaxed max-w-xs mx-auto">
              &ldquo;{pets.subtitle}&rdquo;
            </p>

            {/* Compact Interaction Button */}
            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendLove(e);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-botanical hover:bg-botanical-light text-pearl text-xs font-medium border border-gold/30 shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <GoldPawSvg className="w-3 h-3 text-gold fill-[#F0D49E]" />
                <span>Send Love &amp; Paws</span>
                {loveCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-gold/25 text-gold-shimmer text-[10px] font-semibold">
                    +{loveCount}
                  </span>
                )}
                <Heart className="w-3 h-3 text-rose fill-rose" />
              </button>
            </div>

            <span className="text-[9px] sm:text-[10px] text-slate/65 mt-1.5 font-sans tracking-wide">
              ✦ Tap to share a celebratory treat with them! ✦
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
