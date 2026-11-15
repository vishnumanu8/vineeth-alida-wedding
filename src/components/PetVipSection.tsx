import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../config/weddingConfig';

gsap.registerPlugin(ScrollTrigger);

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

export const PetVipSection: React.FC = () => {
  const { pets } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const pawTrailRef = useRef<SVGSVGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [loveCount, setLoveCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [isBouncing, setIsBouncing] = useState(false);

  // Animated paw prints stepping across the path on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pawTrailRef.current || !sectionRef.current) return;

      const paws = pawTrailRef.current.querySelectorAll('.paw-print');
      gsap.fromTo(
        paws,
        { opacity: 0, scale: 0.4, y: 15 },
        {
          opacity: 0.9,
          scale: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.6,
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            delay: 0.35,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tap micro-interaction: confetti + floating hearts & paw prints
  const handleSendLove = (e: React.MouseEvent) => {
    setLoveCount((prev) => prev + 1);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    // Bounding rect for spawn position
    const rect = e.currentTarget.getBoundingClientRect();
    const spawnX = e.clientX - rect.left || 150;
    const spawnY = e.clientY - rect.top || 150;

    const emojis = ['🐾', '💛', '✨', '🐾', '💖'];
    const newItems: FloatingHeart[] = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      x: spawnX + (Math.random() - 0.5) * 60,
      y: spawnY + (Math.random() - 0.5) * 30,
      size: 18 + Math.random() * 12,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setFloatingHearts((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((item) => !newItems.some((n) => n.id === item.id)));
    }, 1800);

    // Warm golden confetti burst from button
    try {
      confetti({
        particleCount: 22,
        spread: 60,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#F0D49E', '#D4A359', '#315B4B', '#FFF9F1'],
        ticks: 120,
        gravity: 1.1,
        scalar: 0.85,
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
      className="relative py-14 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-pearl via-[#F7F2EA] to-pearl text-charcoal overflow-hidden select-none"
    >
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* ===================================================================
            ANIMATED STEPPING PAW TRAIL (Scroll-Triggered Reveal)
            =================================================================== */}
        <div className="w-full flex justify-center mb-3">
          <svg
            ref={pawTrailRef}
            viewBox="0 0 240 45"
            className="w-48 sm:w-64 h-auto overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pawGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C89D54" />
                <stop offset="100%" stopColor="#F0D49E" />
              </linearGradient>
            </defs>

            {/* Stepping Paw 1 (Left) */}
            <g className="paw-print" transform="translate(30, 24) rotate(-18) scale(0.65)">
              <ellipse cx="0" cy="0" rx="9" ry="7.5" fill="url(#pawGold)" />
              <circle cx="-7.5" cy="-9.5" r="3.2" fill="url(#pawGold)" />
              <circle cx="-2.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="3.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="8" cy="-9" r="3.2" fill="url(#pawGold)" />
            </g>

            {/* Stepping Paw 2 (Right) */}
            <g className="paw-print" transform="translate(85, 12) rotate(16) scale(0.7)">
              <ellipse cx="0" cy="0" rx="9" ry="7.5" fill="url(#pawGold)" />
              <circle cx="-7.5" cy="-9.5" r="3.2" fill="url(#pawGold)" />
              <circle cx="-2.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="3.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="8" cy="-9" r="3.2" fill="url(#pawGold)" />
            </g>

            {/* Stepping Paw 3 (Left) */}
            <g className="paw-print" transform="translate(140, 24) rotate(-16) scale(0.75)">
              <ellipse cx="0" cy="0" rx="9" ry="7.5" fill="url(#pawGold)" />
              <circle cx="-7.5" cy="-9.5" r="3.2" fill="url(#pawGold)" />
              <circle cx="-2.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="3.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="8" cy="-9" r="3.2" fill="url(#pawGold)" />
            </g>

            {/* Stepping Paw 4 (Right) */}
            <g className="paw-print" transform="translate(195, 12) rotate(18) scale(0.8)">
              <ellipse cx="0" cy="0" rx="9" ry="7.5" fill="url(#pawGold)" />
              <circle cx="-7.5" cy="-9.5" r="3.2" fill="url(#pawGold)" />
              <circle cx="-2.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="3.5" cy="-12.5" r="3.5" fill="url(#pawGold)" />
              <circle cx="8" cy="-9" r="3.2" fill="url(#pawGold)" />
            </g>
          </svg>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne-light border border-gold/30 text-botanical text-xs uppercase tracking-widest font-semibold mb-2">
            <span>🐾</span>
            <span>{pets.sectionBadge}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-botanical tracking-tight">
            {pets.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-1 max-w-md mx-auto">
            {pets.subtitle}
          </p>
        </motion.div>

        {/* ===================================================================
            ORNAMENTAL BOTANICAL FRAME SHOWCASING THE PET DOGS
            =================================================================== */}
        <div
          ref={cardRef}
          onClick={handleSendLove}
          className={`relative w-full max-w-sm sm:max-w-md rounded-3xl bg-[#FFFDF9] border-2 border-gold/45 shadow-wedding-lg p-3 sm:p-5 flex flex-col items-center cursor-pointer transition-transform duration-300 ${
            isBouncing ? 'scale-[0.98]' : 'hover:scale-[1.01]'
          }`}
          role="button"
          tabIndex={0}
          aria-label="Tap to send love and paws to the family pets"
        >
          {/* Ornate corner filigree */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold pointer-events-none" />

          {/* Genuine Uncropped Dog Photography Container */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-gold/30 bg-[#0B1A13] shadow-inner">
            <img
              src={pets.image}
              alt={pets.imageAlt}
              className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
              loading="lazy"
            />

            {/* Subtle bottom vignette for caption contrast */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Floating Hearts & Paws Overlay */}
            <AnimatePresence>
              {floatingHearts.map((item) => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 1, scale: 0.6, y: 0 }}
                  animate={{ opacity: 0, scale: 1.4, y: -90, x: (Math.random() - 0.5) * 40 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="pointer-events-none absolute z-30 select-none"
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

          {/* Interactive Tap Button / Affordance */}
          <div className="mt-4 w-full flex items-center justify-center">
            <button
              type="button"
              onClick={handleSendLove}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-botanical hover:bg-botanical-light text-pearl text-xs sm:text-sm font-medium border border-gold/35 shadow-sm transition-all hover:shadow cursor-pointer min-h-[40px]"
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

          <span className="text-[10px] text-slate/70 mt-2 font-sans tracking-wide">
            ✦ Tap anywhere on the card to shower them with love! ✦
          </span>
        </div>
      </div>
    </section>
  );
};
