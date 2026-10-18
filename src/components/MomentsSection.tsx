import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { TouchToRevealMemory } from './TouchToRevealMemory';

export const MomentsSection: React.FC = () => {
  const { moments } = weddingConfig.photos;
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);

  if (!moments || moments.length === 0) return null;

  // Pairs for the reveal interaction
  const pairs = [
    {
      beforeImage: moments[0]?.url || '/images/moment-1.jpg',
      afterImage: moments[1]?.url || '/images/moment-2.jpg',
      beforeLabel: moments[0]?.caption || 'The Journey Begins',
      afterLabel: moments[1]?.caption || 'Laughter & Forever',
      theme: 'From First Moments to Forever',
    },
    ...(moments.length >= 3
      ? [
          {
            beforeImage: moments[1]?.url || '/images/moment-2.jpg',
            afterImage: moments[2]?.url || '/images/moment-3.jpg',
            beforeLabel: moments[1]?.caption || 'Shared Joy',
            afterLabel: moments[2]?.caption || 'A Lifetime Ahead',
            theme: 'A Lifetime of Togetherness',
          },
        ]
      : []),
  ];

  const currentPair = pairs[selectedPairIndex] || pairs[0];

  return (
    <section id="moments" className="py-12 sm:py-20 px-4 sm:px-6 md:pl-24 md:pr-8 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-light border border-gold/30 text-botanical text-xs uppercase tracking-widest font-semibold mb-2">
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span>Cherished Memories</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-botanical tracking-tight">
            Two Chapters, One Story
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-1 max-w-sm mx-auto">
            Drag the golden divider to reveal the journey from where it began to forever.
          </p>
        </motion.div>

        {/* Feature: Touch-To-Reveal Memory Wipe */}
        <div className="w-full flex flex-col items-center">
          <TouchToRevealMemory
            key={selectedPairIndex}
            beforeImage={currentPair.beforeImage}
            afterImage={currentPair.afterImage}
            beforeLabel={currentPair.beforeLabel}
            afterLabel={currentPair.afterLabel}
          />

          {/* Optional pair switcher if multiple memory pairs exist */}
          {pairs.length > 1 && (
            <div className="flex items-center gap-2 mt-5">
              {pairs.map((_pair, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPairIndex(idx)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedPairIndex === idx
                      ? 'bg-botanical text-pearl border-gold/60 shadow-sm'
                      : 'bg-pearl text-charcoal/80 border-champagne-border hover:border-gold/40'
                  }`}
                >
                  <span>Memory {idx + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
