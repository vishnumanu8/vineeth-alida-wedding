import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { WeddingImage } from './WeddingImage';

export const CoupleSection: React.FC = () => {
  const { couple, family } = weddingConfig;

  return (
    <section id="couple" className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Decorative floral aura background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Family Greeting Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-display italic text-sm sm:text-base text-gold tracking-widest uppercase">
              {family.invitationHeadline}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-botanical tracking-tight leading-tight">
            {couple.groom.name}{' '}
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-gold font-normal px-1">
              &amp;
            </span>{' '}
            {couple.bride.name}
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate max-w-xl mx-auto mt-4 leading-relaxed font-normal">
            {family.invitationMessage}
          </p>

          {/* Micro-Interaction: Dubai ✈ Kerala journey detail */}
          {couple.originJourney && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-pearl border border-gold/40 shadow-sm text-xs text-botanical"
            >
              <span className="font-medium text-charcoal">{couple.originJourney.from}</span>
              <div className="relative flex items-center justify-center text-gold">
                <span className="w-8 h-[1px] bg-dashed border-t border-gold/50" />
                <Plane className="w-3.5 h-3.5 text-gold mx-1 rotate-45 transform" />
                <span className="w-8 h-[1px] bg-dashed border-t border-gold/50" />
              </div>
              <span className="font-medium text-charcoal">{couple.originJourney.to}</span>
              <span className="text-slate/60 text-[10px] hidden sm:inline pl-1">
                • {couple.originJourney.note}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Hero Couple Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md sm:max-w-lg mx-auto my-6 sm:my-10"
        >
          {/* Ornate Gold Border & Shadow */}
          <div className="relative p-2.5 sm:p-3.5 rounded-3xl bg-pearl border border-gold/40 shadow-wedding-lg">
            {/* Corner Filigree Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold rounded-br-sm pointer-events-none" />

            <div className="rounded-2xl overflow-hidden relative">
              <WeddingImage
                src={weddingConfig.photos.heroPortrait}
                alt="Vineeth and Alida"
                fallbackTitle="Vineeth & Alida"
                fallbackSubtitle="Our Wedding Celebration"
                aspectRatio="4/5"
                priority={true}
                className="w-full h-auto"
              />

              {/* Delicate Overlay Gradient for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-deep/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                <span className="font-script text-2xl sm:text-3xl text-pearl drop-shadow-md">
                  Forever Begins
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Individual Profile Cards with the Tasteful One-Liners */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 text-rose mb-1">
            <Heart className="w-4 h-4 fill-rose text-rose" />
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <Heart className="w-4 h-4 fill-rose text-rose" />
          </div>
          <p className="font-display italic text-sm sm:text-base text-slate">
            {family.warmClosing}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 text-xs font-medium text-botanical">
            {family.hosts.map((host, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-champagne/40 border border-gold/20">
                {host}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
