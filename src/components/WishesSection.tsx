import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';
import { weddingConfig, WishRecipient } from '../config/weddingConfig';
import { fireWeddingCelebration } from '../utils/confetti';

interface WishesSectionProps {
  initialGuestName?: string | null;
}

export const WishesSection: React.FC<WishesSectionProps> = ({ initialGuestName }) => {
  const { wishes, couple } = weddingConfig;

  // Multi-recipient fallback guarantee
  const recipients: WishRecipient[] =
    wishes.recipients && wishes.recipients.length > 0
      ? wishes.recipients
      : [
          {
            id: 'default',
            name: couple.combinedNames,
            role: 'The Couple',
            phone: wishes.whatsappNumber,
            label: couple.combinedNames,
          },
        ];

  const [selectedRecipientId, setSelectedRecipientId] = useState<string>(
    recipients[0]?.id || 'default'
  );
  const [senderName, setSenderName] = useState(initialGuestName || '');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sentToName, setSentToName] = useState('');

  if (!wishes.enabled) return null;

  const currentRecipient =
    recipients.find((r) => r.id === selectedRecipientId) || recipients[0];

  const triggerSend = (recipient: WishRecipient) => {
    const finalName = senderName.trim() || 'A Dear Friend & Well-wisher';
    const finalMsg =
      message.trim() || 'Wishing you both a lifetime of love, joy, and blessed beginnings!';

    // Format WhatsApp message with festive formatting
    const formattedText = `*Wedding Wishes for ${couple.combinedNames}* 💐\n\n"${finalMsg}"\n\n— *With love & blessings from ${finalName}*`;

    // Clean phone number (digits only)
    const cleanPhone = recipient.phone.replace(/[^0-9]/g, '');
    // wa.me is the official WhatsApp universal link
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      formattedText
    )}`;

    // Fire celebratory confetti explosion
    fireWeddingCelebration();
    setSentToName(recipient.name);
    setSent(true);

    // CRITICAL FIX FOR BLANK BLACK PAGE ON MOBILE CHROME:
    // Calling window.open(..., '_blank') on mobile browsers opens an empty about:blank tab
    // which remains black when WhatsApp app takes over the intent.
    // Navigating window.location.href directly triggers the native WhatsApp app without
    // opening an orphaned blank page.
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      setSent(false);
    }, 4500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSend(currentRecipient);
  };

  return (
    <section id="wishes" className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
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
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-pearl border border-gold/30 p-5 sm:p-8 shadow-wedding-lg relative overflow-hidden"
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Recipient Selection (Multi-Number Support: Groom / Bride) */}
            {recipients.length > 1 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Send Blessings To
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {recipients.map((rec) => {
                    const isSelected = selectedRecipientId === rec.id;
                    return (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => setSelectedRecipientId(rec.id)}
                        className={`py-2.5 px-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-botanical text-pearl border-botanical shadow-md shadow-botanical/20'
                            : 'bg-champagne-light/50 text-charcoal border-gold/30 hover:border-gold hover:bg-champagne-light'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-gold' : 'bg-slate/40'
                          }`}
                        />
                        <span>{rec.label || `${rec.name} (${rec.role})`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

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
                placeholder="Write your personal blessing or message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-champagne-light/50 border border-champagne-border focus:border-botanical focus:bg-pearl focus:outline-none text-base sm:text-sm text-charcoal transition-colors placeholder:text-slate/60 resize-none"
              />

              {/* Quick Preset Wish Suggestions */}
              {wishes.presetMessages && wishes.presetMessages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] uppercase font-semibold text-gold tracking-wider w-full mb-0.5">
                    Quick suggestions:
                  </span>
                  {wishes.presetMessages.slice(0, 3).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMessage(preset)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-champagne-light/80 hover:bg-champagne border border-gold/25 text-slate hover:text-charcoal transition-colors text-left truncate max-w-full cursor-pointer"
                    >
                      &ldquo;{preset.slice(0, 36)}...&rdquo;
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-botanical hover:bg-botanical-light text-pearl font-medium text-sm sm:text-base tracking-wide transition-all shadow-md shadow-botanical/20 flex items-center justify-center gap-2 border border-gold/30 cursor-pointer group min-h-[48px]"
              >
                <MessageCircleHeart className="w-4 h-4 text-rose fill-rose" />
                <span>Send to {currentRecipient.name} via WhatsApp</span>
                <Send className="w-3.5 h-3.5 text-gold group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Multi-Recipient Quick Shortcut for the other person */}
              {recipients.length > 1 && (
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-[11px] text-slate/70">Or send directly to:</span>
                  {recipients
                    .filter((r) => r.id !== selectedRecipientId)
                    .map((other) => (
                      <button
                        key={other.id}
                        type="button"
                        onClick={() => triggerSend(other)}
                        className="text-[11px] font-medium text-botanical hover:text-gold underline underline-offset-2 cursor-pointer flex items-center gap-1"
                      >
                        <span>{other.name} ({other.role})</span>
                        <Send className="w-2.5 h-2.5" />
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Success feedback pill */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-botanical/10 border border-botanical/30 text-botanical text-xs text-center flex items-center justify-center gap-2 font-medium"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Opening WhatsApp for {sentToName}... Thank you for your blessings!</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
