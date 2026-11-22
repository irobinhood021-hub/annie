import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Play, Pause, Disc, Music, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

// Custom 3D Glowing Monarch Butterfly with fluttering wings
function GlowingButterfly({ size = 44, glowRadius = 24, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none group/fly ${className}`}
      style={{ perspective: 600 }}
    >
      {/* Radiant Golden Glow Aura */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/60 via-amber-300/40 to-transparent blur-md pointer-events-none group-hover/fly:scale-130 transition-transform"
        style={{ margin: `-${glowRadius / 2}px` }}
      />

      {/* Butterfly SVG with 3D Left & Right Wing Flap */}
      <svg
        width={size}
        height={size * 0.82}
        viewBox="0 0 100 82"
        fill="none"
        className="relative z-10 butterfly-glow drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] transition-transform duration-300 group-hover/fly:scale-115"
      >
        {/* Left Wing (flaps on Y axis) */}
        <g className="wing-left">
          <path
            d="M 50 42 C 40 25, 15 5, 2 18 C -6 28, 4 58, 28 64 C 40 67, 48 55, 50 42 Z"
            fill="url(#goldWingGradLeft)"
            stroke="#4A2606"
            strokeWidth="1.5"
          />
          <path
            d="M 50 42 C 42 30, 20 18, 12 25 C 8 32, 16 50, 32 54 C 42 56, 48 48, 50 42 Z"
            fill="#FBBF24"
            opacity="0.9"
          />
          <path d="M 50 42 Q 32 30 12 25" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 28 45 18 42" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 36 55 26 58" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <circle cx="5" cy="20" r="1.5" fill="#FFF8EE" />
          <circle cx="10" cy="35" r="1.5" fill="#FFF8EE" />
          <circle cx="20" cy="52" r="1.5" fill="#FFF8EE" />
        </g>

        {/* Right Wing (flaps on Y axis) */}
        <g className="wing-right">
          <path
            d="M 50 42 C 60 25, 85 5, 98 18 C 106 28, 96 58, 72 64 C 60 67, 52 55, 50 42 Z"
            fill="url(#goldWingGradRight)"
            stroke="#4A2606"
            strokeWidth="1.5"
          />
          <path
            d="M 50 42 C 58 30, 80 18, 88 25 C 92 32, 84 50, 68 54 C 58 56, 52 48, 50 42 Z"
            fill="#FBBF24"
            opacity="0.9"
          />
          <path d="M 50 42 Q 68 30 88 25" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 72 45 82 42" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 64 55 74 58" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <circle cx="95" cy="20" r="1.5" fill="#FFF8EE" />
          <circle cx="90" cy="35" r="1.5" fill="#FFF8EE" />
          <circle cx="80" cy="52" r="1.5" fill="#FFF8EE" />
        </g>

        {/* Butterfly Body & Antennae */}
        <ellipse cx="50" cy="44" rx="2.5" ry="12" fill="#2E1705" />
        <path d="M 49 33 Q 44 22 38 18" stroke="#2E1705" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 51 33 Q 56 22 62 18" stroke="#2E1705" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="38" cy="18" r="1" fill="#FBBF24" />
        <circle cx="62" cy="18" r="1" fill="#FBBF24" />

        {/* Gradients */}
        <defs>
          <linearGradient id="goldWingGradLeft" x1="50" y1="42" x2="0" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="goldWingGradRight" x1="50" y1="42" x2="100" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Retro Cassette Tape Component
function RetroCassette({ isPlaying, onToggle, className = "" }) {
  return (
    <div
      onClick={onToggle}
      className={`bg-[#221F1F] p-3 rounded-lg shadow-xl border border-amber-500/30 cursor-pointer select-none group ${className}`}
    >
      {/* Washi Tape on top */}
      <div className="w-16 h-4 washi-tape absolute -top-2 left-1/2 -translate-x-1/2 rotate-2 opacity-90 pointer-events-none" />

      {/* Cassette Header Bar */}
      <div className="flex items-center justify-between text-[10px] font-mono text-amber-300/80 mb-1.5 px-1">
        <span className="flex items-center gap-1">
          <Music className="w-3 h-3 text-rose-400" /> SIDE A
        </span>
        <span className="text-zinc-400">HQ STEREO</span>
      </div>

      {/* Cassette Body / Label */}
      <div className="bg-[#FFFBF0] rounded p-2 text-center border border-amber-200/50 shadow-inner">
        <div className="text-[11px] font-serif font-bold text-zinc-900 truncate flex items-center justify-center gap-1">
          <span>Na Gall Mere Vas Di Rahi</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
        </div>
        <div className="text-[9px] font-mono text-zinc-500 tracking-wider mt-0.5">
          Annie's Special Track 🎶
        </div>

        {/* Cassette Window & Reels */}
        <div className="mt-2 h-7 bg-[#1C1818] rounded-full flex items-center justify-around px-4 border border-zinc-700">
          <div className="relative w-5 h-5 rounded-full border border-amber-300/70 flex items-center justify-center bg-zinc-900">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-dashed border-amber-400 rounded-full"
            />
          </div>

          <div className="h-0.5 w-12 bg-amber-500/40 rounded-full" />

          <div className="relative w-5 h-5 rounded-full border border-amber-300/70 flex items-center justify-center bg-zinc-900">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-dashed border-amber-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Cassette Footer */}
      <div className="mt-2 flex items-center justify-between text-[10px] font-mono px-1 text-zinc-400">
        <span className="flex items-center gap-1 text-amber-200">
          {isPlaying ? <Pause className="w-3 h-3 text-rose-400" /> : <Play className="w-3 h-3 text-amber-400" />}
          {isPlaying ? 'Playing...' : 'Tap to Play'}
        </span>
        <span className="text-[9px] text-zinc-500">23 NOV 2026</span>
      </div>
    </div>
  );
}

export default function Scrapbook({ data }) {
  const [activeTab, setActiveTab] = useState('stories');
  const [selectedNote, setSelectedNote] = useState(null);
  const [likedCards, setLikedCards] = useState({});
  const [isSongPlaying, setIsSongPlaying] = useState(sounds.isScrapbookPlaying);

  useEffect(() => {
    const unsubscribe = sounds.subscribe(({ isScrapbookPlaying }) => {
      setIsSongPlaying(isScrapbookPlaying);
    });
    return unsubscribe;
  }, []);

  const handleToggleSong = () => {
    sounds.playPop();
    const playing = sounds.toggleScrapbookMusic((active) => {
      setIsSongPlaying(active);
    });
    setIsSongPlaying(playing);
  };

  const handleLike = (e, id) => {
    e.stopPropagation();
    sounds.playPop();
    setLikedCards(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));

    confetti({
      particleCount: 28,
      spread: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#f43f5e', '#fb7185', '#fbbf24']
    });
  };

  const openButterflyNote = (note) => {
    sounds.playPop();
    setSelectedNote(note);
  };

  // Polaroid list mapping
  const polaroids = data.scrapbook.polaroids;

  return (
    <section id="scrapbook" className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-8 bg-[#F8EFE4] overflow-hidden select-none">
      {/* Background Radial Glow & Soft Warm Paper Shading */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF4EC] via-[#F6ECE1] to-[#EFE2D4] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d6cbba_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Decorative Doodles */}
      <div className="absolute top-8 left-8 sm:left-14 pointer-events-none opacity-60">
        <svg width="100" height="60" viewBox="0 0 100 60" fill="none" stroke="#9A8275" strokeWidth="1.5">
          <path d="M 12 28 C 12 18, 22 14, 28 20 C 34 14, 44 18, 44 28 C 44 40, 28 48, 28 50 C 28 48, 12 40, 12 28 Z" />
          <path d="M 48 30 Q 70 20 88 18" strokeDasharray="3 3" />
          <path d="M 80 14 L 88 18 L 84 24" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1C1615] tracking-tight font-normal"
        >
          {data.scrapbook.title}
        </motion.h2>

        {/* Scrapbook Tabs */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 mt-5 sm:mt-6 text-xs sm:text-sm font-serif tracking-[0.2em] text-[#695B54] uppercase">
          {[
            { id: 'stories', label: 'OUR STORIES' },
            { id: 'memories', label: 'MEMORIES' },
            { id: 'wishes', label: 'WISHES' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playPop();
                setActiveTab(tab.id);
              }}
              className={`transition-all cursor-pointer relative pb-1.5 ${
                activeTab === tab.id
                  ? 'text-[#1C1615] font-bold'
                  : 'hover:text-[#2B2321] opacity-75'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#695B54] rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Scrapbook Section Dedicated Music Player Pill */}
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={handleToggleSong}
            className={`group inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer border ${
              isSongPlaying
                ? 'bg-[#1C1818] text-amber-200 border-amber-400/60 shadow-amber-500/20'
                : 'bg-[#FFF8ED]/85 text-[#3A2C26] border-[#D8C7B5] hover:bg-[#FFFBF5]'
            }`}
          >
            <div className="relative">
              <Disc className={`w-4 h-4 text-rose-500 ${isSongPlaying ? 'animate-spin' : ''}`} />
            </div>

            <div className="text-left">
              <span className="text-[11px] sm:text-xs font-serif font-semibold tracking-wide block">
                {isSongPlaying ? 'Na Gall Mere Vas Di Rahi' : 'Play Scrapbook Song'}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 block">
                Special Romantic Soundtrack 🎵
              </span>
            </div>

            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white flex items-center justify-center ml-1 shadow-sm">
              {isSongPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
            </div>

            {isSongPlaying && (
              <span className="flex gap-0.5 items-end h-3 ml-1">
                <span className="w-0.5 h-3 bg-rose-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-amber-400 animate-pulse delay-75" />
                <span className="w-0.5 h-3 bg-rose-400 animate-pulse delay-150" />
              </span>
            )}
          </button>
        </div>
      </div>


      {/* ========================================================= */}
      {/* 1. DESKTOP / LAPTOP: Wide Corkboard Canvas with Fan Spread */}
      {/* ========================================================= */}
      <div className="hidden md:flex max-w-[1380px] mx-auto relative min-h-[800px] items-center justify-center">

        {/* Sticky Note Left */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          className="absolute left-6 md:left-12 bottom-12 z-20 max-w-[230px] bg-[#FFFBF0] p-4 pt-5 rounded-xs shadow-md rotate-[-5deg] border border-[#E8DEC8] cursor-grab active:cursor-grabbing select-none"
        >
          <div className="w-16 h-4 washi-tape absolute -top-2 left-1/2 -translate-x-1/2 rotate-1" />
          <p className="font-cursive text-xl text-[#3A2C26] leading-snug">
            Hello, to the sweetest soul! Every moment with you is golden & special!! ❤️
          </p>
          <div className="mt-2 text-right text-xs">🌸</div>
        </motion.div>

        {/* Butterfly near Left Sticky Note */}
        <div className="absolute left-18 bottom-48 z-30 pointer-events-auto">
          <GlowingButterfly
            size={52}
            onClick={() => openButterflyNote(polaroids[0].note)}
          />
        </div>

        {/* Sticky Note Right */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          className="absolute right-[31%] top-20 z-20 max-w-[210px] bg-[#FFFBF0] p-4 pt-5 rounded-xs shadow-md rotate-[3deg] border border-[#E8DEC8] cursor-grab active:cursor-grabbing select-none"
        >
          <div className="w-16 h-4 washi-tape absolute -top-2 left-1/2 -translate-x-1/2 -rotate-2" />
          <p className="font-cursive text-xl text-[#3A2C26] leading-snug">
            Love you more than words can hold. Happy Birthday to you! 🌙
          </p>
        </motion.div>

        {/* Draggable Retro Cassette Tape on Corkboard */}
        <motion.div
          drag
          dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
          className="absolute bottom-6 right-16 z-30 rotate-[-4deg]"
        >
          <RetroCassette isPlaying={isSongPlaying} onToggle={handleToggleSong} />
        </motion.div>

        {/* The 6 Polaroids spread on canvas */}
        <div className="relative w-full h-full min-h-[720px] flex items-center justify-center">

          {/* CARD 1: Cutie 💖 */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute left-[8%] top-14 z-20 w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[-6deg] border border-[#E5DAC8] cursor-grab"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img src={polaroids[0].image} alt="Cutie" loading="lazy" decoding="async" className="w-full h-full object-cover" draggable="false" />
              <div onClick={(e) => handleLike(e, 'p1')} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90">
                <Heart className={`w-3.5 h-3.5 ${likedCards['p1'] ? 'text-rose-600 fill-rose-600' : 'text-zinc-600'}`} />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">{polaroids[0].label}</span>
            </div>
            <div className="absolute -right-5 top-1/2 z-40">
              <GlowingButterfly size={48} onClick={() => openButterflyNote(polaroids[0].note)} />
            </div>
          </motion.div>

          {/* CARD 2: Baddie 🔥 */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute left-[22%] top-72 z-15 w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[-2deg] border border-[#E5DAC8] cursor-grab"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img src={polaroids[1].image} alt="Baddie" loading="lazy" decoding="async" className="w-full h-full object-cover" draggable="false" />
              <div onClick={(e) => handleLike(e, 'p2')} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90">
                <span className="text-zinc-600 font-bold text-sm">+</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">{polaroids[1].label}</span>
            </div>
          </motion.div>

          {/* CARD 3: My Life 🫶 */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute left-1/2 -translate-x-1/2 top-48 z-25 w-72 bg-white p-4 pb-6 rounded-xs shadow-[0_16px_36px_rgba(0,0,0,0.16)] rotate-0 border border-[#E5DAC8] cursor-grab"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
              <div className="w-7 h-7 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img src={polaroids[2].image} alt="My Life" loading="lazy" decoding="async" className="w-full h-full object-cover" draggable="false" />
              <div onClick={(e) => handleLike(e, 'p3')} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90">
                <Heart className={`w-3.5 h-3.5 ${likedCards['p3'] ? 'text-rose-600 fill-rose-600' : 'text-rose-500 fill-rose-500'}`} />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="font-cursive text-3xl text-[#2B2321] font-semibold">{polaroids[2].label}</span>
            </div>
            <div className="absolute -top-6 -right-6 z-40">
              <GlowingButterfly size={54} onClick={() => openButterflyNote(polaroids[2].note)} />
            </div>
          </motion.div>

          {/* CARD 4: Bestie 🥰 */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute right-[12%] top-14 z-20 w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[8deg] border border-[#E5DAC8] cursor-grab"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img src={polaroids[4].image} alt="Bestie" loading="lazy" decoding="async" className="w-full h-full object-cover" draggable="false" />
              <div onClick={(e) => handleLike(e, 'p5')} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">{polaroids[4].label}</span>
            </div>
          </motion.div>

          {/* CARD 5: Dream Girl ✨ */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute right-[25%] top-72 z-18 w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[3deg] border border-[#E5DAC8] cursor-grab"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img src={polaroids[3].image} alt="Dream Girl" loading="lazy" decoding="async" className="w-full h-full object-cover" draggable="false" />
              <div onClick={(e) => handleLike(e, 'p4')} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90">
                <Heart className={`w-3.5 h-3.5 ${likedCards['p4'] ? 'text-rose-600 fill-rose-600' : 'text-zinc-600'}`} />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">{polaroids[3].label}</span>
            </div>
            <div className="absolute -right-5 bottom-8 z-40">
              <GlowingButterfly size={46} onClick={() => openButterflyNote(polaroids[3].note)} />
            </div>
          </motion.div>

          {/* CARD 6: Always You ❤️ */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute right-[7%] top-80 z-20 w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[-4deg] border border-[#E5DAC8] cursor-grab"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img src={polaroids[5].image} alt="Always You" loading="lazy" decoding="async" className="w-full h-full object-cover" draggable="false" />
              <div onClick={(e) => handleLike(e, 'p6')} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">{polaroids[5].label}</span>
            </div>
            <div className="absolute -top-4 -right-4 z-40">
              <GlowingButterfly size={48} onClick={() => openButterflyNote(polaroids[5].note)} />
            </div>
          </motion.div>

        </div>
      </div>


      {/* ========================================================= */}
      {/* 2. MOBILE VIEW: Aesthetic Polaroid Cards Feed (Clean Cards) */}
      {/* ========================================================= */}
      <div className="md:hidden block max-w-sm mx-auto space-y-8 mt-6">

        {/* Mobile Cassette Player Card */}
        <div className="relative pt-2">
          <RetroCassette
            isPlaying={isSongPlaying}
            onToggle={handleToggleSong}
            className="max-w-[280px] mx-auto relative"
          />
        </div>

        {/* Mobile Sticky Thought 1 */}
        <div className="relative max-w-[280px] mx-auto bg-[#FFFBF0] p-4 pt-5 rounded-xs shadow-md rotate-[-2deg] border border-[#E8DEC8]">
          <div className="w-14 h-3.5 washi-tape absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-1" />
          <p className="font-cursive text-lg text-[#3A2C26] leading-snug">
            Hello, to the sweetest soul! Every moment with you is golden & special!! ❤️
          </p>
          <div className="mt-1 text-right text-xs">🌸</div>
        </div>

        {/* The 6 Polaroid Cards listed cleanly with alternating subtle tilts */}
        {polaroids.map((card, idx) => {
          const rotationAngle = idx % 2 === 0 ? '-1.5deg' : '1.5deg';
          const cardKey = `mob-p${idx + 1}`;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              style={{ transform: `rotate(${rotationAngle})` }}
              className="relative max-w-[290px] mx-auto bg-white p-3.5 pb-5 rounded-xs shadow-[0_10px_25px_rgba(0,0,0,0.12)] border border-[#E5DAC8]"
            >
              {/* 3D Red Heart Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              </div>

              {/* Photo Area */}
              <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                {/* Like Button */}
                <div
                  onClick={(e) => handleLike(e, cardKey)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-sm cursor-pointer active:scale-90"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedCards[cardKey] ? 'text-rose-600 fill-rose-600' : 'text-zinc-600'
                    }`}
                  />
                </div>
              </div>

              {/* Handwritten Label & Interaction Hint */}
              <div className="mt-3 text-center">
                <div className="font-cursive text-2xl text-[#2B2321] font-semibold">
                  {card.label}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                  Tap glowing butterfly for secret letter 🦋
                </div>
              </div>

              {/* Glowing Butterfly Perched on Card */}
              <div className="absolute -top-3 -right-3 z-30">
                <GlowingButterfly
                  size={46}
                  onClick={() => openButterflyNote(card.note)}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Mobile Sticky Thought 2 */}
        <div className="relative max-w-[280px] mx-auto bg-[#FFFBF0] p-4 pt-5 rounded-xs shadow-md rotate-[2deg] border border-[#E8DEC8]">
          <div className="w-14 h-3.5 washi-tape absolute -top-1.5 left-1/2 -translate-x-1/2 -rotate-1" />
          <p className="font-cursive text-lg text-[#3A2C26] leading-snug">
            Love you more than words can hold. Happy Birthday to you! 🌙
          </p>
        </div>

      </div>

      {/* Secret Personal Letter Modal Popup */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNote(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#1C1818] text-[#FFF8ED] p-6 sm:p-7 rounded-2xl shadow-2xl border border-amber-500/40"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                A Secret Birthday Message
              </div>

              <h4 className="font-serif text-2xl font-bold text-amber-200 mb-3">
                {selectedNote.title}
              </h4>

              <p className="font-sans text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
                {selectedNote.text}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-cursive text-xl text-rose-300">With all my love ❤️</span>
                <span className="text-xs font-mono text-zinc-400">Tap anywhere to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
