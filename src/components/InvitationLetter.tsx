import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../config/weddingConfig';
import { CountdownTimer } from './CountdownTimer';

gsap.registerPlugin(ScrollTrigger);

export const InvitationLetter: React.FC = () => {
  const { couple, family } = weddingConfig;
  const cardRef = useRef<HTMLDivElement>(null);
  const cornerPathsRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      // Animate corner filigrees on scroll
      const corners = cardRef.current.querySelectorAll('.letter-corner-path');
      corners.forEach((path) => {
        const el = path as SVGPathElement;
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="invitation-letter"
      className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* ===================================================================
            HIGH-CONTRAST SECTION HEADER (Warm Ivory & Champagne Gold on Dark Emerald)
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 sm:mb-9"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111D4A] border border-gold/40 text-gold-shimmer text-xs uppercase tracking-widest font-semibold mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Formal Invitation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#FAF6F0] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            The Invitation Letter
          </h2>
          <p className="text-xs sm:text-sm text-[#E5C158] mt-1.5 max-w-sm mx-auto tracking-wide font-sans">
            A joyous celebration of love, family &amp; forever
          </p>
        </motion.div>

        {/* ===================================================================
            TACTILE DIGITAL PARCHMENT CARD WITH FORMAL ROYAL ETIQUETTE
            =================================================================== */}
        <div
          ref={cardRef}
          className="relative w-full rounded-3xl bg-[#FFFDF9] border border-gold/45 shadow-wedding-lg p-6 sm:p-12 text-center overflow-hidden"
        >
          {/* Subtle parchment grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#16255C 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Self-drawing Gilded Corner Ornaments */}
          <svg
            ref={cornerPathsRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="cornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C89D54" />
                <stop offset="50%" stopColor="#F0D49E" />
                <stop offset="100%" stopColor="#B88A45" />
              </linearGradient>
            </defs>

            {/* Top-Left */}
            <path
              className="letter-corner-path"
              d="M 12 40 L 12 12 L 40 12 M 16 16 L 32 16 M 16 16 L 16 32"
              stroke="url(#cornerGold)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Top-Right */}
            <path
              className="letter-corner-path"
              d="M 388 40 L 388 12 L 360 12 M 384 16 L 368 16 M 384 16 L 384 32"
              stroke="url(#cornerGold)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Bottom-Left */}
            <path
              className="letter-corner-path"
              d="M 12 360 L 12 388 L 40 388 M 16 384 L 32 384 M 16 384 L 16 368"
              stroke="url(#cornerGold)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Bottom-Right */}
            <path
              className="letter-corner-path"
              d="M 388 360 L 388 388 L 360 388 M 384 384 L 368 384 M 384 384 L 384 368"
              stroke="url(#cornerGold)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Wax Seal Motif: A & V 2027 */}
          <div className="relative z-10 mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#932525] via-[#A83232] to-[#6E1A1A] p-1 shadow-lg flex items-center justify-center mb-5 border border-gold/40">
            <div className="w-full h-full rounded-full border border-gold/50 flex flex-col items-center justify-center text-pearl">
              <span className="font-display text-sm sm:text-base font-bold tracking-widest text-[#F0D49E]">
                {couple.monogram}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-pearl/80">
                2027
              </span>
            </div>
          </div>

          {/* Invitation Headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-display italic text-xs sm:text-sm tracking-[0.25em] uppercase text-gold font-semibold">
              {family.invitationHeadline}
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          {/* ===================================================================
              FORMAL ETIQUETTE LAYOUT: COUPLE PROPERLY PAIRED WITH PARENTS
              =================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center max-w-lg mx-auto"
          >
            {/* Bride Name & Parents */}
            <div className="flex flex-col items-center">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-botanical tracking-tight leading-tight">
                {couple.bride.fullName}
              </h3>
              <p className="font-display italic text-sm sm:text-base text-slate mt-1.5 font-medium">
                {couple.bride.familyNote}
              </p>
            </div>

            {/* Animated Gold Ampersand & Ornamental Flourish */}
            <div className="my-4 sm:my-5 flex items-center justify-center gap-3 select-none">
              <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <span className="font-script text-3xl sm:text-4xl md:text-5xl text-gold font-normal px-2 drop-shadow-sm">
                &amp;
              </span>
              <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>

            {/* Groom Name & Parents */}
            <div className="flex flex-col items-center">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-botanical tracking-tight leading-tight">
                {couple.groom.fullName}
              </h3>
              <p className="font-display italic text-sm sm:text-base text-slate mt-1.5 font-medium">
                {couple.groom.familyNote}
              </p>
            </div>
          </motion.div>

          {/* Formal Invitation Message Prose */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-xl mx-auto my-7 px-2"
          >
            <p className="font-display text-lg sm:text-xl md:text-2xl text-botanical font-normal leading-relaxed tracking-wide italic">
              &ldquo;{family.invitationMessage}&rdquo;
            </p>
          </motion.div>

          {/* ===================================================================
              LIVE COUNTDOWN TIMER AT BASE OF LETTER CARD
              =================================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 pt-6 border-t border-champagne-border/80"
          >
            <CountdownTimer />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
