import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Sparkles, MessageCircleHeart } from 'lucide-react';
import { weddingConfig } from './config/weddingConfig';
import { weddingAudio } from './utils/audioPlayer';
import { getGuestNameFromUrl } from './utils/url';

import { OpeningDoors } from './components/OpeningDoors';
import { HeroSection } from './components/HeroSection';
import { GoldenThreadDivider } from './components/GoldenThreadDivider';
import { CoupleSection } from './components/CoupleSection';
import { ReceptionSection } from './components/ReceptionSection';
import { MomentsSection } from './components/MomentsSection';
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
        {/* Full-Screen Immersive Couple Hero Screen */}
        <HeroSection guestName={guestName} />

        {/* In-Page Golden Thread Motif 1: The Couple */}
        <GoldenThreadDivider
          label="The Couple"
          targetId="invitation-story"
          icon={<Heart className="w-3 h-3 text-gold fill-gold/40" />}
        />

        {/* Section 1: The Couple Profiles & Family Blessings */}
        <CoupleSection />

        {/* In-Page Golden Thread Motif 2: The Reception */}
        <GoldenThreadDivider
          label="The Reception"
          targetId="reception"
          icon={<Calendar className="w-3 h-3 text-gold" />}
        />

        {/* Section 2: Unified Editorial Reception Composition */}
        <ReceptionSection />

        {/* In-Page Golden Thread Motif 3: Cherished Memories */}
        <GoldenThreadDivider
          label="Memories"
          targetId="moments"
          icon={<Sparkles className="w-3 h-3 text-gold" />}
        />

        {/* Section 3: Touch-to-Reveal Memory Wipe */}
        <MomentsSection />

        {/* In-Page Golden Thread Motif 4: Blessings & Wishes */}
        <GoldenThreadDivider
          label="Blessings"
          targetId="wishes"
          icon={<MessageCircleHeart className="w-3 h-3 text-rose fill-rose/40" />}
        />

        {/* Section 4: Wishes & Blessings via WhatsApp */}
        <WishesSection initialGuestName={guestName} />
      </main>

      {/* Elegant Footer */}
      <Footer />

      {/* Unobtrusive Fixed Bottom-Right Audio Control */}
      <AudioControl visible={hasOpenedDoors} />
    </div>
  );
};

export default App;
