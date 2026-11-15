import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MessageCircleHeart, ScrollText } from 'lucide-react';
import { weddingConfig } from './config/weddingConfig';
import { weddingAudio } from './utils/audioPlayer';
import { getGuestNameFromUrl } from './utils/url';

import { OpeningDoors } from './components/OpeningDoors';
import { HeroSection } from './components/HeroSection';
import { InvitationLetter } from './components/InvitationLetter';
import { GoldenThreadDivider } from './components/GoldenThreadDivider';
import { CoupleSection } from './components/CoupleSection';
import { ReceptionSection } from './components/ReceptionSection';
import { PetVipSection } from './components/PetVipSection';
import { WishesSection } from './components/WishesSection';
import { Footer } from './components/Footer';
import { AudioControl } from './components/AudioControl';

export const App: React.FC = () => {
  const [hasOpenedDoors, setHasOpenedDoors] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    // Initialize audio system
    if (weddingConfig.audio.enabled) {
      weddingAudio.init(weddingConfig.audio.filePath);
    }

    // Safely check for guest query parameter
    const guest = getGuestNameFromUrl();
    if (guest) {
      setGuestName(guest);
    }
  }, []);

  const handleOpenDoors = () => {
    setHasOpenedDoors(true);
  };

  return (
    <div className="min-h-screen bg-[#07130E] text-charcoal flex flex-col font-sans selection:bg-gold/20 selection:text-botanical-dark">
      {/* 1. Cinematic Emerald Aperture Double-Door Parting Reveal */}
      {!hasOpenedDoors && (
        <OpeningDoors
          onOpen={handleOpenDoors}
          guestName={guestName}
        />
      )}

      {/* 2. Main Wedding Invitation in Natural Document Flow */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Full-Screen Animated Monogram & Kinetic Typography Hero */}
        <HeroSection guestName={guestName} />

        {/* In-Page Golden Thread Motif 1: The Invitation Letter */}
        <GoldenThreadDivider
          label="The Letter"
          targetId="invitation-letter"
          icon={<ScrollText className="w-3 h-3 text-gold" />}
        />

        {/* Section 1: The Living Invitation Letter with Parchment & Countdown */}
        <InvitationLetter />

        {/* In-Page Golden Thread Motif 2: Our Journey */}
        <GoldenThreadDivider
          label="Our Journey"
          targetId="invitation-story"
          icon={<Heart className="w-3 h-3 text-gold fill-gold/40" />}
        />

        {/* Section 2: Couple Heraldic Crests & Dubai-to-Kerala Flight Animation */}
        <CoupleSection />

        {/* In-Page Golden Thread Motif 3: The Reception */}
        <GoldenThreadDivider
          label="The Reception"
          targetId="reception"
          icon={<Calendar className="w-3 h-3 text-gold" />}
        />

        {/* Section 3: Unified Editorial Reception Composition */}
        <ReceptionSection />

        {/* In-Page Golden Thread Motif 4: Special Guests (Pet VIPs) */}
        <GoldenThreadDivider
          label="VIP Guests"
          targetId="four-legged-vips"
          icon={<span className="text-[10px]">🐾</span>}
        />

        {/* Section 4: Meet the Four-Legged VIPs (Pet Dogs Showcase) */}
        <PetVipSection />

        {/* In-Page Golden Thread Motif 5: Blessings & Wishes */}
        <GoldenThreadDivider
          label="Blessings"
          targetId="wishes"
          icon={<MessageCircleHeart className="w-3 h-3 text-rose fill-rose/40" />}
        />

        {/* Section 5: Wishes & Blessings via WhatsApp */}
        <WishesSection initialGuestName={guestName} />
      </main>

      {/* Elegant Closing Keepsake Footer */}
      <Footer />

      {/* Unobtrusive Fixed Bottom-Right Audio Control */}
      <AudioControl visible={hasOpenedDoors} />
    </div>
  );
};

export default App;
