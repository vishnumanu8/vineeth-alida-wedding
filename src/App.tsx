import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { weddingConfig } from './config/weddingConfig';
import { weddingAudio } from './utils/audioPlayer';
import { getGuestNameFromUrl } from './utils/url';

import { OpeningCard } from './components/OpeningCard';
import { Navbar } from './components/Navbar';
import { CoupleSection } from './components/CoupleSection';
import { ReceptionSection } from './components/ReceptionSection';
import { MomentsSection } from './components/MomentsSection';
import { WishesSection } from './components/WishesSection';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';
import { ScrollProgress } from './components/ScrollProgress';

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
    // Smoothly scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReopenCard = () => {
    setHasOpenedCard(false);
  };

  return (
    <div className="min-h-screen bg-pearl text-charcoal flex flex-col font-sans selection:bg-gold/20 selection:text-botanical-dark">
      {/* Scroll-Progress Hairline Bar */}
      {hasOpenedCard && <ScrollProgress />}

      {/* 1. Mobile-First Opening Ceremonial Card (Highest Priority) */}
      <AnimatePresence mode="wait">
        {!hasOpenedCard && (
          <OpeningCard
            onOpen={handleOpenInvitation}
            guestName={guestName}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Wedding Reception Invitation */}
      {hasOpenedCard && (
        <motion.div
          key="main-invitation-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col"
        >
          <Navbar onReopenCard={handleReopenCard} />

          <main className="flex-1">
            {/* Section 1: The Couple & First Screen Hero */}
            <CoupleSection guestName={guestName} />

            {/* Section 2: The Reception (Central Focus) */}
            <ReceptionSection />

            {/* Section 3: Couple Photographs (Moments) */}
            <MomentsSection />

            {/* Section 4: Wishes & Blessings */}
            <WishesSection initialGuestName={guestName} />
          </main>

          <Footer />
          <FloatingControls />
        </motion.div>
      )}
    </div>
  );
};

export default App;
