import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { WeddingImage } from './WeddingImage';

export const CoupleSection: React.FC = () => {
  const { couple, family } = weddingConfig;

  return (
    <section
      id="invitation-story"
      className="relative py-14 sm:py-24 pl-12 pr-4 sm:pl-16 sm:pr-6 md:px-8 bg-pearl text-charcoal overflow-hidden"
    >
      {/* Subtle top transition gradient from hero dark emerald */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

      {/* Subtle radiant background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-champagne/45 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* ===================================================================
            FAMILY INVITATION HEADLINE & MESSAGE
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-8 sm:mb-12 max-w-xl mx-auto"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-display italic text-xs sm:text-sm text-gold tracking-widest uppercase font-medium">
              {family.invitationHeadline}
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-botanical tracking-tight leading-tight">
            Our New Journey Begins
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-slate mt-3 leading-relaxed">
            {family.invitationMessage}
          </p>

          {/* Micro-Interaction: Dubai ✈ Kerala journey detail */}
          {couple.originJourney && (
            <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-pearl border border-gold/40 shadow-sm text-xs text-botanical">
              <span className="font-medium text-charcoal">{couple.originJourney.from}</span>
              <div className="relative flex items-center justify-center text-gold">
                <span className="w-6 sm:w-8 h-[1px] border-t border-gold/50" />
                <Plane className="w-3.5 h-3.5 text-gold mx-1 rotate-45 transform" />
                <span className="w-6 sm:w-8 h-[1px] border-t border-gold/50" />
              </div>
              <span className="font-medium text-charcoal">{couple.originJourney.to}</span>
              <span className="text-slate/70 text-[11px] hidden sm:inline pl-1">
                • {couple.originJourney.note}
              </span>
            </div>
          )}
        </motion.div>

        {/* ===================================================================
            COUPLE PROFILE CARDS WITH PORTRAITS & SUBTLE ONE-LINERS
            =================================================================== */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-pearl border border-champagne-border/90 shadow-wedding flex flex-col items-center text-center relative overflow-hidden group hover:border-gold/50 transition-colors"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/45 mb-4 shadow-sm">
              <WeddingImage
                src={couple.groom.portrait}
                alt={couple.groom.fullName}
                fallbackTitle={couple.groom.name}
                fallbackSubtitle={couple.groom.title}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">
              {couple.groom.title}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-botanical">
              {couple.groom.fullName}
            </h3>
            <p className="text-xs text-slate mt-1 mb-3">
              {couple.groom.familyNote}
            </p>

            {/* Subtle One-Liner */}
            {couple.groom.oneLiner && (
              <p className="text-xs italic text-charcoal/80 bg-champagne-light/80 px-3.5 py-2 rounded-xl border border-gold/20 max-w-xs mt-auto">
                &ldquo;{couple.groom.oneLiner}&rdquo;
              </p>
            )}
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-3xl bg-pearl border border-champagne-border/90 shadow-wedding flex flex-col items-center text-center relative overflow-hidden group hover:border-gold/50 transition-colors"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/45 mb-4 shadow-sm">
              <WeddingImage
                src={couple.bride.portrait}
                alt={couple.bride.fullName}
                fallbackTitle={couple.bride.name}
                fallbackSubtitle={couple.bride.title}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">
              {couple.bride.title}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-botanical">
              {couple.bride.fullName}
            </h3>
            <p className="text-xs text-slate mt-1 mb-3">
              {couple.bride.familyNote}
            </p>

            {/* Subtle One-Liner */}
            {couple.bride.oneLiner && (
              <p className="text-xs italic text-charcoal/80 bg-champagne-light/80 px-3.5 py-2 rounded-xl border border-gold/20 max-w-xs mt-auto">
                &ldquo;{couple.bride.oneLiner}&rdquo;
              </p>
            )}
          </motion.div>
        </div>

        {/* ===================================================================
            FAMILY BLESSINGS NOTE
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-14 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-rose mb-2">
            <Heart className="w-4 h-4 fill-rose text-rose" />
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <Heart className="w-4 h-4 fill-rose text-rose" />
          </div>
          <p className="font-display italic text-sm sm:text-base text-slate">
            {family.warmClosing}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2.5 text-xs font-medium text-botanical">
            {family.hosts.map((host, idx) => (
              <span key={idx} className="px-4 py-1.5 rounded-full bg-champagne/45 border border-gold/25">
                {host}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
