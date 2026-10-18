import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { WeddingImage } from './WeddingImage';

export const MomentsSection: React.FC = () => {
  const { moments } = weddingConfig.photos;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!moments || moments.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % moments.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
  };

  const currentMoment = moments[currentIndex];

  return (
    <section id="moments" className="py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-light border border-gold/30 text-botanical text-xs uppercase tracking-widest font-semibold mb-2">
            <Camera className="w-3.5 h-3.5 text-gold" />
            <span>Cherished Moments</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-botanical tracking-tight">
            Glimpses of Togetherness
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-1 max-w-sm mx-auto">
            A few sweet chapters from the journey leading up to forever.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
          {/* Card Frame */}
          <div className="relative rounded-3xl p-3 bg-pearl border border-gold/30 shadow-wedding-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMoment.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden"
              >
                <WeddingImage
                  src={currentMoment.url}
                  alt={currentMoment.caption}
                  fallbackTitle={currentMoment.caption}
                  fallbackSubtitle={currentMoment.subtitle || 'Vineeth & Alida'}
                  aspectRatio="4/5"
                  className="w-full h-auto"
                />

                {/* Caption Banner */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-botanical-deep/85 via-botanical-deep/50 to-transparent text-pearl text-left">
                  <div className="flex items-center gap-1.5 text-gold text-xs mb-0.5">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span className="font-medium tracking-wide">Vineeth &amp; Alida</span>
                  </div>
                  <h4 className="font-display text-lg sm:text-xl font-semibold text-pearl">
                    {currentMoment.caption}
                  </h4>
                  {currentMoment.subtitle && (
                    <p className="text-xs text-pearl-100/80 font-normal">
                      {currentMoment.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {moments.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pearl/80 hover:bg-pearl text-botanical border border-gold/30 shadow-md flex items-center justify-center transition-all cursor-pointer z-10"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pearl/80 hover:bg-pearl text-botanical border border-gold/30 shadow-md flex items-center justify-center transition-all cursor-pointer z-10"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {moments.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {moments.map((moment, idx) => (
                <button
                  key={moment.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-botanical'
                      : 'w-2 bg-champagne-border hover:bg-gold/60'
                  }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
