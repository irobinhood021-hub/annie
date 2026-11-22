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
          {/* Outer Wing Shading */}
          <path
            d="M 50 42 C 40 25, 15 5, 2 18 C -6 28, 4 58, 28 64 C 40 67, 48 55, 50 42 Z"
            fill="url(#goldWingGradLeft)"
            stroke="#4A2606"
            strokeWidth="1.5"
          />
          {/* Inner Wing Accent */}
          <path
            d="M 50 42 C 42 30, 20 18, 12 25 C 8 32, 16 50, 32 54 C 42 56, 48 48, 50 42 Z"
            fill="#FBBF24"
            opacity="0.9"
          />
          {/* Wing Veins */}
          <path d="M 50 42 Q 32 30 12 25" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 28 45 18 42" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 36 55 26 58" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          {/* White Border Dots */}
          <circle cx="5" cy="20" r="1.5" fill="#FFF8EE" />
          <circle cx="10" cy="35" r="1.5" fill="#FFF8EE" />
          <circle cx="20" cy="52" r="1.5" fill="#FFF8EE" />
        </g>

        {/* Right Wing (flaps on Y axis) */}
        <g className="wing-right">
          {/* Outer Wing Shading */}
          <path
            d="M 50 42 C 60 25, 85 5, 98 18 C 106 28, 96 58, 72 64 C 60 67, 52 55, 50 42 Z"
            fill="url(#goldWingGradRight)"
            stroke="#4A2606"
            strokeWidth="1.5"
          />
          {/* Inner Wing Accent */}
          <path
            d="M 50 42 C 58 30, 80 18, 88 25 C 92 32, 84 50, 68 54 C 58 56, 52 48, 50 42 Z"
            fill="#FBBF24"
            opacity="0.9"
          />
          {/* Wing Veins */}
          <path d="M 50 42 Q 68 30 88 25" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 72 45 82 42" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          <path d="M 50 42 Q 64 55 74 58" stroke="#381D04" strokeWidth="1.2" opacity="0.75" />
          {/* White Border Dots */}
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

// Retro Draggable Cassette Tape Sticker with spinning reels
function RetroCassette({ isPlaying, onToggle }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onToggle}
      className="absolute bottom-6 right-4 sm:right-16 z-30 max-w-[240px] sm:max-w-[260px] bg-[#221F1F] p-3 rounded-lg shadow-xl border border-amber-500/30 rotate-[-4deg] cursor-pointer select-none group"
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
          {/* Reel Left */}
          <div className="relative w-5 h-5 rounded-full border border-amber-300/70 flex items-center justify-center bg-zinc-900">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-dashed border-amber-400 rounded-full"
            />
          </div>

          {/* Tape bridge */}
          <div className="h-0.5 w-12 bg-amber-500/40 rounded-full" />

          {/* Reel Right */}
          <div className="relative w-5 h-5 rounded-full border border-amber-300/70 flex items-center justify-center bg-zinc-900">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-3.5 h-3.5 border-2 border-dashed border-amber-400 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Cassette Footer / Play hint */}
      <div className="mt-2 flex items-center justify-between text-[10px] font-mono px-1 text-zinc-400">
        <span className="flex items-center gap-1 text-amber-200">
          {isPlaying ? <Pause className="w-3 h-3 text-rose-400" /> : <Play className="w-3 h-3 text-amber-400" />}
          {isPlaying ? 'Playing...' : 'Tap to Play'}
        </span>
        <span className="text-[9px] text-zinc-500">23 NOV 2026</span>
      </div>
    </motion.div>
  );
}

export default function Scrapbook({ data }) {
  const [activeTab, setActiveTab] = useState('stories');
  const [selectedNote, setSelectedNote] = useState(null);
  const [likedCards, setLikedCards] = useState({});
  const [isSongPlaying, setIsSongPlaying] = useState(sounds.isScrapbookPlaying);

  useEffect(() => {
    // Sync with global audio state
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

  return (
    <section id="scrapbook" className="relative py-20 md:py-28 px-4 sm:px-8 bg-[#F8EFE4] overflow-hidden select-none">
      {/* Background Radial Glow & Soft Warm Paper Shading matching screenshot */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF4EC] via-[#F6ECE1] to-[#EFE2D4] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#d6cbba_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Decorative Doodles matching media_1795250159312_8b5f47ee.jpg */}
      {/* Top Left: Dotted arrow pointing to sketched heart */}
      <div className="absolute top-8 left-8 sm:left-14 pointer-events-none opacity-60">
        <svg width="100" height="60" viewBox="0 0 100 60" fill="none" stroke="#9A8275" strokeWidth="1.5">
          <path d="M 12 28 C 12 18, 22 14, 28 20 C 34 14, 44 18, 44 28 C 44 40, 28 48, 28 50 C 28 48, 12 40, 12 28 Z" />
          <path d="M 48 30 Q 70 20 88 18" strokeDasharray="3 3" />
          <path d="M 80 14 L 88 18 L 84 24" />
        </svg>
      </div>

      {/* Left Edge: Metallic Paperclip */}
      <div className="absolute top-52 left-3 sm:left-6 pointer-events-none opacity-75">
        <div className="w-4 h-16 rounded-full border-2 border-[#8A7970] shadow-xs rotate-[-15deg]" />
      </div>

      {/* Right Edge: Metallic Paperclip */}
      <div className="absolute top-56 right-3 sm:right-6 pointer-events-none opacity-75">
        <div className="w-4 h-16 rounded-full border-2 border-[#8A7970] shadow-xs rotate-[15deg]" />
      </div>

      {/* Sketched Smiley Doodle right side */}
      <div className="absolute top-72 right-1/3 sm:right-[36%] pointer-events-none opacity-50 hidden sm:block">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#9A8275" strokeWidth="1.5">
          <circle cx="20" cy="20" r="16" />
          <circle cx="15" cy="16" r="1.5" fill="#9A8275" />
          <circle cx="25" cy="16" r="1.5" fill="#9A8275" />
          <path d="M 13 25 Q 20 31 27 25" strokeLinecap="round" />
        </svg>
      </div>

      {/* Aesthetic Switch Pills on Corners matching screenshot */}
      <div className="absolute top-8 right-8 pointer-events-none hidden sm:block">
        <div className="w-12 h-6 rounded-full bg-[#E5D7C7] p-1 shadow-inner flex items-center">
          <div className="w-4 h-4 rounded-full bg-white shadow-xs ml-auto" />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 pointer-events-none hidden sm:block">
        <div className="w-12 h-6 rounded-full bg-[#E5D7C7] p-1 shadow-inner flex items-center">
          <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
        </div>
      </div>

      {/* Floating Animated Flying Butterflies across the canvas */}
      <motion.div
        animate={{
          x: [0, 45, 10, -20, 0],
          y: [0, -25, -45, -15, 0],
          rotate: [0, 10, -8, 6, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 left-1/4 z-30 pointer-events-auto"
      >
        <GlowingButterfly
          size={50}
          onClick={() => openButterflyNote(data.scrapbook.polaroids[0].note)}
        />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -35, 15, -10, 0],
          y: [0, -30, -10, -40, 0],
          rotate: [0, -8, 12, -5, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-36 right-1/4 z-30 pointer-events-auto"
      >
        <GlowingButterfly
          size={54}
          onClick={() => openButterflyNote(data.scrapbook.polaroids[3].note)}
        />
      </motion.div>

      {/* Main Section Header matching media_1795250159312_8b5f47ee.jpg */}
      <div className="max-w-4xl mx-auto text-center mb-8 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1C1615] tracking-tight font-normal"
        >
          {data.scrapbook.title}
        </motion.h2>

        {/* Scrapbook Tabs: OUR STORIES (with brush underline) | MEMORIES | WISHES */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mt-6 text-xs sm:text-sm font-serif tracking-[0.2em] text-[#695B54] uppercase">
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
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={handleToggleSong}
            className={`group inline-flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer border ${
              isSongPlaying
                ? 'bg-[#1C1818] text-amber-200 border-amber-400/60 shadow-amber-500/20'
                : 'bg-[#FFF8ED]/85 text-[#3A2C26] border-[#D8C7B5] hover:bg-[#FFFBF5]'
            }`}
          >
            {/* Spinning Disc / Note Icon */}
            <div className="relative">
              <Disc className={`w-4 h-4 text-rose-500 ${isSongPlaying ? 'animate-spin' : ''}`} />
            </div>

            <div className="text-left">
              <span className="text-xs font-serif font-semibold tracking-wide block">
                {isSongPlaying ? 'Now Playing: Na Gall Mere Vas Di Rahi' : 'Play Scrapbook Song'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 block">
                Special Romantic Soundtrack 🎵
              </span>
            </div>

            {/* Play / Pause Toggle Circle */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white flex items-center justify-center ml-1 shadow-sm">
              {isSongPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
            </div>

            {/* Equalizer Wave Bars */}
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

      {/* Main Canvas with the 6 Polaroids arranged in the exact fan layout */}
      <div className="max-w-[1380px] mx-auto relative min-h-[680px] sm:min-h-[740px] md:min-h-[800px] flex items-center justify-center">

        {/* 1. Left Sticky Note with washi tape & floral seal matching screenshot */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          className="absolute left-2 sm:left-6 md:left-12 bottom-12 z-20 max-w-[210px] sm:max-w-[230px] bg-[#FFFBF0] p-4 pt-5 rounded-xs shadow-md rotate-[-5deg] border border-[#E8DEC8] cursor-grab active:cursor-grabbing select-none"
        >
          {/* Top washi tape */}
          <div className="w-16 h-4 washi-tape absolute -top-2 left-1/2 -translate-x-1/2 rotate-1" />
          <p className="font-cursive text-lg sm:text-xl text-[#3A2C26] leading-snug">
            Hello, to the sweetest soul! Every moment with you is golden & special!! ❤️
          </p>
          <div className="mt-2 text-right text-xs">🌸</div>
        </motion.div>

        {/* Butterfly near Left Sticky Note with golden halo */}
        <div className="absolute left-10 sm:left-18 bottom-48 z-30 pointer-events-auto">
          <GlowingButterfly
            size={52}
            onClick={() => openButterflyNote(data.scrapbook.polaroids[0].note)}
          />
        </div>

        {/* 2. Right Sticky Note with washi tape matching screenshot */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          className="absolute right-1/3 sm:right-[31%] top-20 z-20 max-w-[190px] sm:max-w-[210px] bg-[#FFFBF0] p-4 pt-5 rounded-xs shadow-md rotate-[3deg] border border-[#E8DEC8] cursor-grab active:cursor-grabbing select-none hidden sm:block"
        >
          {/* Top washi tape */}
          <div className="w-16 h-4 washi-tape absolute -top-2 left-1/2 -translate-x-1/2 -rotate-2" />
          <p className="font-cursive text-lg sm:text-xl text-[#3A2C26] leading-snug">
            Love you more than words can hold. Happy Birthday to you! 🌙
          </p>
        </motion.div>

        {/* Retro Cassette Tape on Corkboard Canvas (Draggable & Interactive) */}
        <RetroCassette isPlaying={isSongPlaying} onToggle={handleToggleSong} />

        {/* THE 6 POLAROIDS matching media_1795250159312_8b5f47ee.jpg */}
        <div className="relative w-full h-full min-h-[640px] md:min-h-[720px] flex items-center justify-center">

          {/* CARD 1: Cutie 💖 (Far Left, rotated -5deg) */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute left-[2%] sm:left-[6%] md:left-[8%] top-10 sm:top-14 z-20 w-52 sm:w-60 md:w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[-6deg] border border-[#E5DAC8] cursor-grab"
          >
            {/* 3D Red Heart Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            {/* Photo */}
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img
                src={data.scrapbook.polaroids[0].image}
                alt="Cutie"
                className="w-full h-full object-cover"
                draggable="false"
              />
              {/* Badge top right */}
              <div
                onClick={(e) => handleLike(e, 'p1')}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90"
              >
                <Heart className={`w-3.5 h-3.5 ${likedCards['p1'] ? 'text-rose-600 fill-rose-600' : 'text-zinc-600'}`} />
              </div>
            </div>

            {/* Handwritten Label */}
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">
                Cutie 💖
              </span>
            </div>

            {/* Glowing Butterfly on corner */}
            <div className="absolute -right-5 top-1/2 z-40">
              <GlowingButterfly
                size={48}
                onClick={() => openButterflyNote(data.scrapbook.polaroids[0].note)}
              />
            </div>
          </motion.div>

          {/* CARD 2: Baddie 🔥 (Mid-Left lower, rotated -2deg) */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute left-[16%] sm:left-[20%] md:left-[22%] top-64 sm:top-72 z-15 w-52 sm:w-60 md:w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[-2deg] border border-[#E5DAC8] cursor-grab"
          >
            {/* 3D Red Heart Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            {/* Photo */}
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img
                src={data.scrapbook.polaroids[1].image}
                alt="Baddie"
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div
                onClick={(e) => handleLike(e, 'p2')}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90"
              >
                <span className="text-zinc-600 font-bold text-sm">+</span>
              </div>
            </div>

            {/* Handwritten Label */}
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">
                Baddie 🔥
              </span>
            </div>
          </motion.div>

          {/* CARD 3: My Life 🫶 (Center, upright 0deg) */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute left-1/2 -translate-x-1/2 top-44 sm:top-48 z-25 w-56 sm:w-64 md:w-72 bg-white p-4 pb-6 rounded-xs shadow-[0_16px_36px_rgba(0,0,0,0.16)] rotate-0 border border-[#E5DAC8] cursor-grab"
          >
            {/* 3D Red Heart Pin */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
              <div className="w-7 h-7 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
            </div>

            {/* Photo */}
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img
                src={data.scrapbook.polaroids[2].image}
                alt="My Life"
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div
                onClick={(e) => handleLike(e, 'p3')}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90"
              >
                <Heart className={`w-3.5 h-3.5 ${likedCards['p3'] ? 'text-rose-600 fill-rose-600' : 'text-rose-500 fill-rose-500'}`} />
              </div>
            </div>

            {/* Handwritten Label */}
            <div className="mt-3 text-center flex items-center justify-center gap-1.5">
              <span className="font-cursive text-2xl sm:text-3xl text-[#2B2321] font-semibold">
                My Life 🫶
              </span>
            </div>

            {/* Glowing Butterfly perched on top-right of center card matching screenshot */}
            <div className="absolute -top-6 -right-6 z-40">
              <GlowingButterfly
                size={54}
                onClick={() => openButterflyNote(data.scrapbook.polaroids[2].note)}
              />
            </div>
          </motion.div>

          {/* CARD 4: Bestie 🥰 (Top Right, rotated +8deg) */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute right-[4%] sm:right-[10%] md:right-[12%] top-10 sm:top-14 z-20 w-52 sm:w-60 md:w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[8deg] border border-[#E5DAC8] cursor-grab hidden sm:block"
          >
            {/* 3D Red Heart Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            {/* Photo */}
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img
                src={data.scrapbook.polaroids[4].image}
                alt="Bestie"
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div
                onClick={(e) => handleLike(e, 'p5')}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </div>
            </div>

            {/* Handwritten Label */}
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">
                Bestie 🥰
              </span>
            </div>
          </motion.div>

          {/* CARD 5: Dream Girl ✨ (Mid-Right lower, rotated +3deg) */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute right-[18%] sm:right-[22%] md:right-[25%] top-64 sm:top-72 z-18 w-52 sm:w-60 md:w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[3deg] border border-[#E5DAC8] cursor-grab"
          >
            {/* 3D Red Heart Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            {/* Photo */}
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img
                src={data.scrapbook.polaroids[3].image}
                alt="Dream Girl"
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div
                onClick={(e) => handleLike(e, 'p4')}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90"
              >
                <Heart className={`w-3.5 h-3.5 ${likedCards['p4'] ? 'text-rose-600 fill-rose-600' : 'text-zinc-600'}`} />
              </div>
            </div>

            {/* Handwritten Label */}
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">
                Dream Girl ✨
              </span>
            </div>

            {/* Glowing Butterfly at bottom right */}
            <div className="absolute -right-5 bottom-8 z-40">
              <GlowingButterfly
                size={46}
                onClick={() => openButterflyNote(data.scrapbook.polaroids[3].note)}
              />
            </div>
          </motion.div>

          {/* CARD 6: Always You ❤️ (Far Right lower, rotated -4deg) */}
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.08, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.04, zIndex: 40 }}
            className="absolute right-[2%] sm:right-[5%] md:right-[7%] top-72 sm:top-80 z-20 w-52 sm:w-60 md:w-64 bg-white p-3.5 pb-5 rounded-xs shadow-[0_12px_28px_rgba(0,0,0,0.14)] rotate-[-4deg] border border-[#E5DAC8] cursor-grab"
          >
            {/* 3D Red Heart Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
              <div className="w-6 h-6 rounded-full bg-rose-600 shadow-md border-2 border-white flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            </div>

            {/* Photo */}
            <div className="w-full aspect-[4/5] rounded-xs overflow-hidden bg-neutral-100 relative group">
              <img
                src={data.scrapbook.polaroids[5].image}
                alt="Always You"
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div
                onClick={(e) => handleLike(e, 'p6')}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 active:scale-90"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </div>
            </div>

            {/* Handwritten Label */}
            <div className="mt-3 text-center">
              <span className="font-cursive text-2xl text-[#2B2321] font-semibold">
                Always You ❤️
              </span>
            </div>

            {/* Glowing Butterfly at top right */}
            <div className="absolute -top-4 -right-4 z-40">
              <GlowingButterfly
                size={48}
                onClick={() => openButterflyNote(data.scrapbook.polaroids[5].note)}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Secret Personal Letter Modal Popup when butterfly is clicked (exact video feature) */}
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
              className="relative max-w-md w-full bg-[#1C1818] text-[#FFF8ED] p-7 rounded-2xl shadow-2xl border border-amber-500/40"
            >
              {/* Close Button */}
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
