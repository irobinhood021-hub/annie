import React, { useState } from 'react';
import { BIRTHDAY_DATA } from './data/content';
import { sounds } from './utils/audio';

import VelvetCurtains from './components/VelvetCurtains';
import Navbar from './components/Navbar';
import CurvedRibbon from './components/CurvedRibbon';
import Scrapbook from './components/Scrapbook';
import VogueMagazine from './components/VogueMagazine';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

export default function App() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleToggleMusic = () => {
    const newState = sounds.toggleBackgroundMusic((playing) => {
      setIsMusicPlaying(playing);
    });
    setIsMusicPlaying(newState);
  };

  const handleCurtainOpen = () => {
    setIsCurtainOpen(true);
  };

  const handleStartMusic = () => {
    if (!isMusicPlaying) {
      sounds.startBackgroundMusic();
      setIsMusicPlaying(true);
    }
  };

  const handleReopenCurtains = () => {
    setIsCurtainOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#2C2625] relative selection:bg-rose-200 selection:text-rose-900">
      {/* 1. Grand Velvet Curtains & Countdown (Screen 1) */}
      <VelvetCurtains
        data={BIRTHDAY_DATA}
        isOpen={isCurtainOpen}
        onOpen={handleCurtainOpen}
        onStartMusic={handleStartMusic}
      />

      {/* Main Website Content (Visible behind & after curtains part) */}
      <div id="home" className="relative z-10">
        {/* Navigation Bar */}
        <Navbar
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onReopenCurtains={handleReopenCurtains}
        />

        {/* 2. Curved Filmstrip / Looping Photo Ribbon (Screen 2) */}
        <CurvedRibbon data={BIRTHDAY_DATA} />

        {/* 3. Interactive Scrapbook & Draggable Polaroids with Butterfly Notes (Screen 3) */}
        <Scrapbook data={BIRTHDAY_DATA} />

        {/* 4. VOGUE Birthday Special Edition Flipbook (Screen 4) */}
        <VogueMagazine
          data={BIRTHDAY_DATA}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />

        {/* Footer Celebration */}
        <Footer data={BIRTHDAY_DATA} />

        {/* Floating Spotify / Music Player Bar */}
        <MusicPlayer
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          personName={BIRTHDAY_DATA.name}
        />
      </div>
    </div>
  );
}

