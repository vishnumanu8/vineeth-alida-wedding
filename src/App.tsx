import React, { useState, useEffect } from 'react';
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
import { MagicalFireflyEngine } from './components/MagicalFireflyEngine';

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
    <div className="min-h-screen bg-[#0B1325] text-charcoal flex flex-col font-sans selection:bg-gold/20 selection:text-sapphire-dark relative">
      {/* 60fps Magical Multi-Layer Firefly, Bokeh & Stardust Engine */}
      <MagicalFireflyEngine />

      {/* 1. Cinematic Midnight Sapphire Aperture Double-Door Parting Reveal */}
      {!hasOpenedDoors && (
        <OpeningDoors
          onOpen={handleOpenDoors}
          guestName={guestName}
        />
      )}

      {/* 2. Main Wedding Invitation in Natural Document Flow */}
      <main className="flex-1 w-full overflow-x-hidden relative z-20">
        {/* Full-Screen Animated Monogram & Kinetic Typography Hero */}
        <HeroSection guestName={guestName} />

        {/* Clean Ornamental Golden Thread Divider */}
        <GoldenThreadDivider />

        {/* Section 1: The Living Invitation Letter with Formal Etiquette & Live Countdown */}
        <InvitationLetter />

        {/* Clean Ornamental Golden Thread Divider */}
        <GoldenThreadDivider />

        {/* Section 2: Dubai to Kerala Animated Flight Route ("Our New Journey Begins") */}
        <CoupleSection />

        {/* Clean Ornamental Golden Thread Divider */}
        <GoldenThreadDivider />

        {/* Section 3: Unified Editorial Reception Composition */}
        <ReceptionSection />

        {/* Clean Ornamental Golden Thread Divider */}
        <GoldenThreadDivider />

        {/* Section 4: Continuously Alive Pet Dogs Showcase ("Our Four-Legged VIPs") */}
        <PetVipSection />

        {/* Clean Ornamental Golden Thread Divider */}
        <GoldenThreadDivider />

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
