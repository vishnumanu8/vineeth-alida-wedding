import React from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { weddingConfig } from "../config/weddingConfig";
import { TouchToRevealMemory } from "./TouchToRevealMemory";

export const MomentsSection: React.FC = () => {
  const { moments } = weddingConfig.photos;

  if (!moments || moments.length === 0) return null;

  const beforeImage = moments[0]?.url || "/images/moment-1.jpg";
  const afterImage = moments[1]?.url || "/images/moment-2.jpg";
  const beforeLabel = moments[0]?.caption || "The Journey Begins";
  const afterLabel = moments[1]?.caption || "Towards Forever";

  return (
    <section
      id="moments"
      className="py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
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
            A Little Story of Us
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-1 max-w-sm mx-auto">
            Move the line - one moment, two ways to remember it.
          </p>
        </motion.div>

        {/* Feature: Touch-To-Reveal Memory Wipe */}
        <div className="w-full flex flex-col items-center">
          <TouchToRevealMemory
            beforeImage={beforeImage}
            afterImage={afterImage}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
          />
        </div>
      </div>
    </section>
  );
};
