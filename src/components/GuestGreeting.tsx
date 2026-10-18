import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface GuestGreetingProps {
  guestName: string | null;
}

export const GuestGreeting: React.FC<GuestGreetingProps> = ({ guestName }) => {
  const greetingText = guestName
    ? weddingConfig.guestPersonalization.greetingTemplate(guestName)
    : weddingConfig.guestPersonalization.fallbackGreeting;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-6 sm:pt-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-champagne-light/90 border border-gold/30 shadow-wedding text-botanical-dark"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold" />
        <span className="font-display font-medium text-sm sm:text-base tracking-wide">
          {greetingText}
        </span>
        <Heart className="w-3.5 h-3.5 text-rose fill-rose" />
      </motion.div>
    </div>
  );
};
