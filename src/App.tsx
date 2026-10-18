import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { weddingConfig } from './config/weddingConfig';
import { weddingAudio } from './utils/audioPlayer';
import { getGuestNameFromUrl } from './utils/url';

import { OpeningCard } from './components/OpeningCard';
import { Navbar } from './components/Navbar';
import { GuestGreeting } from './components/GuestGreeting';
import { CoupleSection } from './components/CoupleSection';
import { ReceptionSection } from './components/ReceptionSection';
import { MomentsSection } from './components/MomentsSection';
import { WishesSection } from './components/WishesSection';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';

export const App: React.FC = () => {
  const [hasOpenedCard, setHasOpenedCard] = useState(false);
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

  const handleOpenInvitation = (_withAudio: boolean) => {
    setHasOpenedCard(true);
    // Smoothly scroll to the couple section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReopenCard = () => {
    setHasOpenedCard(false);
  };

  return (
    <div className="min-h-screen bg-pearl text-charcoal flex flex-col font-sans selection:bg-gold/20 selection:text-botanical-dark">
      {/* 1. Mobile-First Opening Ceremonial Card (Highest Priority) */}
      <AnimatePresence>
        {!hasOpenedCard && (
          <OpeningCard
            onOpen={handleOpenInvitation}
            guestName={guestName}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Wedding Reception Invitation */}
      <div className={`transition-opacity duration-700 ${!hasOpenedCard ? 'pointer-events-none opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Navbar onReopenCard={handleReopenCard} />

        <main className="flex-1 pt-16 sm:pt-20">
          {/* Personalized Guest Welcome Banner */}
          <GuestGreeting guestName={guestName} />

          {/* Section 1: The Couple */}
          <CoupleSection />

          {/* Section 2: The Reception (Central Focus) */}
          <ReceptionSection />

          {/* Section 3: Couple Photographs (Moments) */}
          <MomentsSection />

          {/* Section 4: Wishes & Blessings */}
          <WishesSection initialGuestName={guestName} />
        </main>

        <Footer />
        <FloatingControls />
      </div>
    </div>
  );
};

export default App;
