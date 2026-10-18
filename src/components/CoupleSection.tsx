import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { WeddingImage } from './WeddingImage';

interface CoupleSectionProps {
  guestName?: string | null;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ guestName }) => {
  const { couple, family } = weddingConfig;

  const scrollToReception = () => {
    const el = document.getElementById('reception');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="couple"
      className="relative w-full overflow-hidden"
    >
      {/* Decorative floral aura background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-champagne/35 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* =========================================================================
          FIRST SCREEN / HERO TABLEAU
          Exquisitely proportioned to fit the mobile viewport without any cropping!
          ========================================================================= */}
      <div className="min-h-[88dvh] sm:min-h-[92dvh] flex flex-col items-center justify-between pt-12 sm:pt-16 pb-6 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        
        {/* Top: Family Greeting & Names */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Guest Personalization Pill or Family Greeting */}
          <div className="mb-2 sm:mb-3">
            {guestName ? (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-champagne-light border border-gold/40 text-botanical text-xs font-medium shadow-sm">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Cordially Welcoming {guestName}</span>
                <Heart className="w-3 h-3 text-rose fill-rose" />
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold/70" />
                <span className="font-display italic text-xs sm:text-sm text-gold tracking-widest uppercase">
                  {family.invitationHeadline}
                </span>
                <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold/70" />
              </div>
            )}
          </div>

          {/* Couple's Names */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-botanical tracking-tight leading-tight">
            {couple.groom.name}{' '}
            <span className="font-script text-2xl sm:text-3xl md:text-4xl text-gold font-normal px-1">
              &amp;
            </span>{' '}
            {couple.bride.name}
          </h1>

          <p className="font-sans text-xs sm:text-sm text-slate max-w-md mx-auto mt-1.5 leading-relaxed font-normal">
            Request the pleasure of your company at their wedding reception
          </p>
        </motion.div>

        {/* Center: Hero Couple Portrait Frame (Proportioned to avoid mobile clipping) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[270px] sm:max-w-[320px] md:max-w-sm my-3 sm:my-5"
        >
          {/* Ornate Gold Border & Shadow */}
          <div className="relative p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-pearl border border-gold/50 shadow-wedding-lg">
            {/* Corner Filigree Accents */}
            <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-gold rounded-tl-sm pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-gold rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-gold rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-gold rounded-br-sm pointer-events-none" />

            <div className="rounded-xl sm:rounded-2xl overflow-hidden relative max-h-[44vh] sm:max-h-[50vh]">
              <WeddingImage
                src={weddingConfig.photos.heroPortrait}
                alt="Vineeth and Alida"
                fallbackTitle="Vineeth & Alida"
                fallbackSubtitle="Wedding Reception"
                aspectRatio="4/5"
                priority={true}
                className="w-full h-auto object-cover"
              />

              {/* Bottom Subtle Gradient for Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-deep/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none">
                <span className="font-script text-xl sm:text-2xl text-pearl drop-shadow-md">
                  Forever Begins
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom of Hero Screen: Travel Detail & Scroll Down Cue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3 w-full"
        >
          {/* Micro-Interaction: Dubai ✈ Kerala journey detail */}
          {couple.originJourney && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pearl border border-gold/40 shadow-sm text-xs text-botanical">
              <span className="font-medium text-charcoal">{couple.originJourney.from}</span>
              <div className="relative flex items-center justify-center text-gold">
                <span className="w-5 sm:w-7 h-[1px] border-t border-gold/50" />
                <Plane className="w-3 h-3 text-gold mx-1 rotate-45 transform" />
                <span className="w-5 sm:w-7 h-[1px] border-t border-gold/50" />
              </div>
              <span className="font-medium text-charcoal">{couple.originJourney.to}</span>
              <span className="text-slate/70 text-[11px] hidden sm:inline pl-1">
                • {couple.originJourney.note}
              </span>
            </div>
          )}

          {/* Smooth Scroll Cue to Reception */}
          <button
            type="button"
            onClick={scrollToReception}
            className="flex items-center gap-1.5 text-xs text-slate hover:text-botanical transition-colors cursor-pointer pt-1 group"
            aria-label="Scroll to Reception Details"
          >
            <span className="tracking-wide">Reception Details &amp; Directions</span>
            <ChevronDown className="w-3.5 h-3.5 text-gold group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* =========================================================================
          COUPLE PROFILES & FAMILY BLESSINGS (BELOW THE FOLD)
          ========================================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16 flex flex-col items-center text-center">
        {/* Short invitation message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="font-sans text-sm sm:text-base text-slate max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12"
        >
          {family.invitationMessage}
        </motion.p>

        {/* Individual Profile Cards with Tasteful One-Liners */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="p-5 sm:p-6 rounded-2xl bg-pearl border border-champagne-border/90 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:border-gold/40 transition-colors"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/40 mb-3 shadow-sm">
              <WeddingImage
                src={couple.groom.portrait}
                alt={couple.groom.fullName}
                fallbackTitle={couple.groom.name}
                fallbackSubtitle={couple.groom.title}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-0.5">
              {couple.groom.title}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-botanical">
              {couple.groom.fullName}
            </h3>
            <p className="text-xs text-slate mt-1 mb-2">
              {couple.groom.familyNote}
            </p>

            {/* Subtle One-Liner */}
            {couple.groom.oneLiner && (
              <p className="text-xs italic text-charcoal/80 bg-champagne-light/70 px-3 py-1.5 rounded-lg border border-gold/20 max-w-xs mt-auto">
                &ldquo;{couple.groom.oneLiner}&rdquo;
              </p>
            )}
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-5 sm:p-6 rounded-2xl bg-pearl border border-champagne-border/90 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:border-gold/40 transition-colors"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/40 mb-3 shadow-sm">
              <WeddingImage
                src={couple.bride.portrait}
                alt={couple.bride.fullName}
                fallbackTitle={couple.bride.name}
                fallbackSubtitle={couple.bride.title}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-0.5">
              {couple.bride.title}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-botanical">
              {couple.bride.fullName}
            </h3>
            <p className="text-xs text-slate mt-1 mb-2">
              {couple.bride.familyNote}
            </p>

            {/* Subtle One-Liner */}
            {couple.bride.oneLiner && (
              <p className="text-xs italic text-charcoal/80 bg-champagne-light/70 px-3 py-1.5 rounded-lg border border-gold/20 max-w-xs mt-auto">
                &ldquo;{couple.bride.oneLiner}&rdquo;
              </p>
            )}
          </motion.div>
        </div>

        {/* Heartfelt Families Note */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-rose mb-1.5">
            <Heart className="w-4 h-4 fill-rose text-rose" />
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <Heart className="w-4 h-4 fill-rose text-rose" />
          </div>
          <p className="font-display italic text-sm sm:text-base text-slate">
            {family.warmClosing}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 text-xs font-medium text-botanical">
            {family.hosts.map((host, idx) => (
              <span key={idx} className="px-3.5 py-1 rounded-full bg-champagne/40 border border-gold/20">
                {host}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
