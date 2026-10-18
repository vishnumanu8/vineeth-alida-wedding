import React from 'react';
import { Share2, Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const Footer: React.FC = () => {
  const { couple, family, reception } = weddingConfig;

  const handleShareWhatsApp = () => {
    const text = `*Wedding Reception Invitation — ${couple.combinedNames}* 💐\n\nYou are cordially invited to celebrate the wedding reception of Vineeth & Alida on ${reception.formattedDate} at ${reception.venueName}, ${reception.city}.\n\nView the digital invitation, directions & details here:\n${window.location.href.split('?')[0]}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="relative bg-gradient-to-b from-champagne-light to-champagne/60 border-t border-champagne-border py-12 sm:py-16 px-4 sm:px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram Crest */}
        <div className="w-12 h-12 rounded-full border-2 border-gold/40 bg-pearl flex items-center justify-center text-botanical font-display font-semibold text-lg shadow-sm mb-3">
          {couple.monogram}
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-botanical">
          {couple.combinedNames}
        </h3>

        <p className="font-script text-xl sm:text-2xl text-gold mt-1">
          With Love &amp; Joy
        </p>

        {/* Share Invitation Action */}
        <div className="my-6">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pearl hover:bg-champagne-light border border-gold/40 text-xs sm:text-sm font-medium text-botanical shadow-sm transition-all hover:shadow cursor-pointer min-h-[44px]"
          >
            <Share2 className="w-3.5 h-3.5 text-gold" />
            <span>Share Invitation via WhatsApp</span>
          </button>
        </div>

        {/* Family Greeting */}
        <p className="text-xs text-slate max-w-sm mx-auto leading-relaxed">
          {family.warmClosing}
          <br />
          <span className="font-semibold text-charcoal">
            {family.hosts.join(' • ')}
          </span>
        </p>

        <div className="flex items-center gap-1.5 text-slate/70 text-[11px] mt-8 pt-6 border-t border-champagne-border/80">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose fill-rose" />
          <span>for Vineeth &amp; Alida • 2027</span>
        </div>
      </div>
    </footer>
  );
};
