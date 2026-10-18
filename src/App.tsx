import React, { useState, useEffect } from 'react';
import { weddingConfig } from './config/weddingConfig';
import { weddingAudio } from './utils/audioPlayer';
import { getGuestNameFromUrl } from './utils/url';

import { OpeningDoors } from './components/OpeningDoors';
import { TheLivingGoldenThread } from './components/TheLivingGoldenThread';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { ReceptionSection } from './components/ReceptionSection';
import { MomentsSection } from './components/MomentsSection';
import { WishesSection } from './components/WishesSection';
import { Footer } from './components/Footer';

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
    <div className="min-h-screen bg-[#102019] text-charcoal flex flex-col font-sans selection:bg-gold/20 selection:text-botanical-dark">
      {/* 1. Cinematic Double-Door Parting Reveal */}
      {!hasOpenedDoors && (
        <OpeningDoors
          onOpen={handleOpenDoors}
          guestName={guestName}
        />
      )}

      {/* Feature A: The Living Golden Thread (Progressive scroll path & milestone navigation) */}
      <TheLivingGoldenThread />

      {/* 2. Main Full-Screen & Scroll-Driven Wedding Invitation */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Full-Screen Immersive Couple Hero Screen (Pre-rendered behind doors for instant reveal) */}
        <HeroSection guestName={guestName} />

        {/* Section 1: The Couple Profiles & Family Blessings */}
        <CoupleSection />

        {/* Section 2: The Reception Details & Venue Map */}
        <ReceptionSection />

        {/* Section 3: Cherished Moments Gallery */}
        <MomentsSection />

        {/* Section 4: Wishes & Blessings via WhatsApp */}
        <WishesSection initialGuestName={guestName} />
      </main>

      {/* Elegant Footer */}
      <Footer />
    </div>
  );
};

export default App;
