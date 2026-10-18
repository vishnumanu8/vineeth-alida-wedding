import React, { useState } from 'react';
import { Share2, Heart, Download } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

export const Footer: React.FC = () => {
  const { couple, family, reception, metadata } = weddingConfig;
  const [sharing, setSharing] = useState(false);

  const handleShareWhatsApp = async () => {
    setSharing(true);
    const canonicalSiteUrl =
      metadata?.siteUrl || 'https://vishnumanu8.github.io/vineeth-alida-wedding/';

    // Detect if running on localhost / private network
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.startsWith('10.') ||
        window.location.hostname.endsWith('.local'));

    // Always share the public canonical URL so WhatsApp crawlers can scrape og-wedding.jpg
    const shareUrl = isLocalhost ? canonicalSiteUrl : window.location.href.split('?')[0];

    const shareTitle = `Wedding Reception Invitation — ${couple.combinedNames}`;
    const shareText = `*Wedding Reception Invitation — ${couple.combinedNames}* 💐\n\nYou are cordially invited to celebrate the wedding reception of Vineeth & Alida on ${reception.formattedDate} at ${reception.venueName}, ${reception.city}.\n\nView digital invitation & directions:\n${shareUrl}`;

    // Load actual invitation image file for native media sharing
    const imageUrl = metadata?.ogImage || '/images/og-wedding.jpg';
    let imageFile: File | null = null;
    try {
      const res = await fetch(imageUrl);
      if (res.ok) {
        const blob = await res.blob();
        imageFile = new File([blob], 'Vineeth-Alida-Wedding-Invitation.jpg', {
          type: blob.type || 'image/jpeg',
        });
      }
    } catch {
      // Image fetch fallback
    }

    // 1. Primary: Native Web Share API with REAL IMAGE FILE (iOS Safari, Android Chrome)
    // Attaches the actual wedding invitation photo directly into WhatsApp with the invitation caption!
    if (imageFile && navigator.canShare) {
      try {
        const fileShareData = {
          files: [imageFile],
          title: shareTitle,
          text: shareText,
        };
        if (navigator.canShare(fileShareData)) {
          await navigator.share(fileShareData);
          setSharing(false);
          return;
        }
      } catch (err) {
        // If user cancelled the share dialog, do not open anything
        if ((err as Error)?.name === 'AbortError') {
          setSharing(false);
          return;
        }
      }
    }

    // 2. Secondary: Native Share with Link (if file sharing not supported on this browser)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `You are cordially invited to celebrate the wedding reception of Vineeth & Alida on ${reception.formattedDate} at ${reception.venueName}, ${reception.city}.`,
          url: shareUrl,
        });
        setSharing(false);
        return;
      } catch (err) {
        // If user cancelled the share dialog, do not open anything
        if ((err as Error)?.name === 'AbortError') {
          setSharing(false);
          return;
        }
      }
    }

    // 3. Fallback: Direct WhatsApp Universal link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    // CRITICAL: On mobile, window.open('_blank') opens an empty about:blank tab that stays black.
    // window.location.href navigates directly to WhatsApp without creating a zombie tab.
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    setSharing(false);
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
        <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            disabled={sharing}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pearl hover:bg-champagne-light border border-gold/40 text-xs sm:text-sm font-medium text-botanical shadow-sm transition-all hover:shadow cursor-pointer min-h-[44px]"
          >
            <Share2 className="w-3.5 h-3.5 text-gold" />
            <span>{sharing ? 'Preparing Invitation...' : 'Share Invitation via WhatsApp'}</span>
          </button>

          <a
            href="/images/og-wedding.jpg"
            download="Vineeth-Alida-Wedding-Invitation.jpg"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-champagne-light/60 hover:bg-champagne border border-gold/25 text-xs font-medium text-slate hover:text-botanical transition-all cursor-pointer min-h-[44px]"
            title="Download invitation card image"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Save Invitation Card</span>
          </a>
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
