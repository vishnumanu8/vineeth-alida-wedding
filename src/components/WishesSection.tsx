import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { fireWeddingCelebration } from '../utils/confetti';

interface WishesSectionProps {
  initialGuestName?: string | null;
}

export const WishesSection: React.FC<WishesSectionProps> = ({ initialGuestName }) => {
  const { wishes, couple } = weddingConfig;
  const [senderName, setSenderName] = useState(initialGuestName || '');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!wishes.enabled) return null;

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();

    const finalName = senderName.trim() || 'A Dear Friend & Well-wisher';
    const finalMsg = message.trim() || 'Wishing you both a blessed and joyful married life!';

    // Trigger celebratory confetti explosion
    fireWeddingCelebration();
    setSent(true);

    // Format WhatsApp message
    const formattedText = `*Wedding Wishes for ${couple.combinedNames}* 💐\n\n"${finalMsg}"\n\n— *With love & blessings from ${finalName}*`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${wishes.whatsappNumber}&text=${encodeURIComponent(
      formattedText
    )}`;

    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);

    setTimeout(() => {
      setSent(false);
    }, 4500);
  };

  return (
    <section id="wishes" className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-light border border-gold/30 text-botanical text-xs uppercase tracking-widest font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 text-rose fill-rose" />
            <span>Blessings &amp; Greetings</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-botanical tracking-tight">
            Send Your Warm Wishes
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-1 max-w-md mx-auto">
            Your heartfelt words and prayers are the greatest gift to Vineeth &amp; Alida.
          </p>
        </motion.div>

        {/* Wishes Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-pearl border border-gold/30 p-6 sm:p-8 shadow-wedding-lg relative overflow-hidden"
        >
          {/* Form */}
          <form onSubmit={handleSendWish} className="space-y-4">
            <div>
              <label
                htmlFor="guest-name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1"
              >
                Your Name / Family
              </label>
              <input
                id="guest-name"
                type="text"
                placeholder="e.g. Suresh & Family, John, Anita"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-champagne-light/50 border border-champagne-border focus:border-botanical focus:bg-pearl focus:outline-none text-base sm:text-sm text-charcoal transition-colors placeholder:text-slate/60"
              />
            </div>

            <div>
              <label
                htmlFor="wish-message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1"
              >
                Your Message of Blessings
              </label>
              <textarea
                id="wish-message"
                rows={3}
                placeholder="Write your personal blessing or memory for Vineeth & Alida..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-champagne-light/50 border border-champagne-border focus:border-botanical focus:bg-pearl focus:outline-none text-base sm:text-sm text-charcoal transition-colors placeholder:text-slate/60 resize-none"
              />
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-botanical hover:bg-botanical-light text-pearl font-medium text-sm sm:text-base tracking-wide transition-all shadow-md shadow-botanical/20 flex items-center justify-center gap-2 border border-gold/30 cursor-pointer group min-h-[46px]"
            >
              <MessageCircleHeart className="w-4 h-4 text-rose fill-rose" />
              <span>Send Wishes via WhatsApp</span>
              <Send className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Success feedback pill */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-botanical/10 border border-botanical/30 text-botanical text-xs text-center flex items-center justify-center gap-2 font-medium"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Thank you! Your blessings are flying to Vineeth &amp; Alida!</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
