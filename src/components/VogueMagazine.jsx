import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Music, Share2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

// Left Page Editorial Layout
function PageLeftContent({ spread, data, pageNumber }) {
  return (
    <div className="w-full h-full p-6 sm:p-10 md:p-12 flex flex-col justify-between relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F3ECDC] border-r border-[#EBE1CF] select-none overflow-hidden">
      {/* Ornate Corner Accents */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#1C1818]/60 pointer-events-none" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#1C1818]/60 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#1C1818]/60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#1C1818]/60 pointer-events-none" />

      {/* Subtle paper grain texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#d6cbba_0.6px,transparent_0.6px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

      <div className="text-center pt-2 relative z-10">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#73635C] block mb-2 sm:mb-3">
          {spread.pageLeft.tag}
        </span>

        {/* Main Masthead */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-[#111010] leading-none mb-1">
          {spread.pageLeft.headline}
        </h2>

        <h3 className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#52443F] uppercase font-semibold">
          {spread.pageLeft.subheadline}
        </h3>

        <div className="my-4 sm:my-6 flex items-center justify-center gap-3">
          <div className="w-10 sm:w-14 h-px bg-[#111010]/30" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.2em] text-[#8C2735] uppercase font-bold">
            {spread.pageLeft.ornament}
          </span>
          <div className="w-10 sm:w-14 h-px bg-[#111010]/30" />
        </div>

        {/* Person's Name */}
        <h4 className="text-2xl sm:text-4xl font-serif text-[#1C1818] tracking-widest uppercase font-normal mb-2 sm:mb-3">
          {data.name}
        </h4>

        <p className="text-xs sm:text-sm text-[#5C504A] font-serif italic max-w-sm mx-auto leading-relaxed whitespace-pre-line px-2">
          {spread.pageLeft.description}
        </p>
      </div>

      {/* Bottom Quote & Ornament */}
      <div className="pt-4 sm:pt-6 text-center relative z-10">
        <p className="text-xs sm:text-sm font-editorial italic text-[#382F2C] border-t border-b border-[#1C1818]/20 py-2.5 px-2">
          {spread.pageLeft.quote}
        </p>
        <div className="mt-2 text-xs font-mono text-[#8C7A70] flex items-center justify-between px-2">
          <span>P. {pageNumber}</span>
          <span className="text-sm text-[#8C2735]">⚜</span>
          <span>SPECIAL ISSUE</span>
        </div>
      </div>
    </div>
  );
}

// Right Page Photo Collage Layout
function PageRightContent({ spread, data, pageNumber }) {
  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between relative bg-[#FAF6ED] select-none overflow-hidden">
      {/* Subtle paper grain texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#d6cbba_0.6px,transparent_0.6px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

      {/* Header with handwritten note */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="font-cursive text-xl sm:text-2xl text-[#8C2735] font-semibold -rotate-2">
          {spread.pageRight.title} ↗
        </span>
        <span className="text-[10px] font-mono text-[#8F7D74] tracking-wider">
          VOL. 18
        </span>
      </div>

      {/* Photo Collage Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 my-auto relative z-10">
        {spread.pageRight.images.map((img, i) => (
          <div
            key={i}
            className={`rounded-lg overflow-hidden bg-neutral-200 shadow-xs relative group ${
              i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'
            }`}
          >
            <img
              src={img}
              alt="Editorial Crop"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
        ))}
      </div>

      {/* Bottom Handwritten Signature */}
      <div className="mt-3 pt-3 flex items-center justify-between border-t border-[#E8DFC9] relative z-10">
        <span className="font-cursive text-xl sm:text-2xl text-[#1C1818] font-bold">
          {spread.pageRight.note}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#94837B]">
          P. {pageNumber}
        </span>
      </div>
    </div>
  );
}

export default function VogueMagazine({ data, isMusicPlaying, onToggleMusic }) {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' | 'prev'
  const [targetSpreadIndex, setTargetSpreadIndex] = useState(0);

  const totalSpreads = data.magazine.spreads.length;
  const currentSpread = data.magazine.spreads[currentSpreadIndex];
  const targetSpread = data.magazine.spreads[targetSpreadIndex];

  const handleNext = () => {
    if (isFlipping) return;
    const nextIdx = (currentSpreadIndex + 1) % totalSpreads;
    setTargetSpreadIndex(nextIdx);
    setFlipDirection('next');
    setIsFlipping(true);
    sounds.playPageTurn();
  };

  const handlePrev = () => {
    if (isFlipping) return;
    const prevIdx = (currentSpreadIndex - 1 + totalSpreads) % totalSpreads;
    setTargetSpreadIndex(prevIdx);
    setFlipDirection('prev');
    setIsFlipping(true);
    sounds.playPageTurn();
  };

  const handleShare = () => {
    sounds.playPop();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#fbbf24', '#ffffff']
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("✨ Link copied to clipboard! Share the love with Annie!");
    }
  };

  return (
    <section id="magazine" className="relative py-20 px-4 sm:px-8 bg-[#F8F4EC] select-none">
      {/* Top Editorial Monogram matching Screen 4 */}
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 border-b border-[#E3D9C9] mb-10 text-[#4D423D]">
        <span className="text-xs font-mono tracking-widest uppercase">The Editorial Archive</span>
        <div className="flex flex-col items-center">
          <span className="text-xl">🌿</span>
          <span className="text-[10px] tracking-[0.3em] font-serif uppercase text-[#8A7970]">Maison de VOGUE</span>
        </div>
        <span className="text-xs font-mono tracking-widest uppercase">Issue No. 18</span>
      </div>

      {/* 3D Realistic Open Book Container with Page Turn */}
      <div className="max-w-5xl mx-auto relative" style={{ perspective: '2400px' }}>

        {/* Desktop & Tablet: Realistic 3D Two-Page Spread with Book Spine */}
        <div className="hidden md:block relative w-full h-[600px] rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] border border-[#E8DFC9] bg-[#FAF6ED] overflow-hidden">

          {/* Realistic Center Book Spine Crease & Depth Shadows */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/20 via-black/5 to-black/20 z-30 pointer-events-none shadow-inner" />

          {/* LAYER 1: BASE SPREAD (Underneath) */}
          <div className="absolute inset-0 grid grid-cols-2">
            {/* Base Left Page */}
            <div className="w-full h-full">
              <PageLeftContent
                spread={flipDirection === 'prev' && isFlipping ? targetSpread : currentSpread}
                data={data}
                pageNumber={((flipDirection === 'prev' && isFlipping ? targetSpreadIndex : currentSpreadIndex) * 2) + 1}
              />
            </div>

            {/* Base Right Page */}
            <div className="w-full h-full cursor-pointer" onClick={handleNext}>
              <PageRightContent
                spread={flipDirection === 'next' && isFlipping ? targetSpread : currentSpread}
                data={data}
                pageNumber={((flipDirection === 'next' && isFlipping ? targetSpreadIndex : currentSpreadIndex) * 2) + 2}
              />
            </div>
          </div>

          {/* LAYER 2: 3D ANIMATED FLIPPING PAGE LEAF (Active during turn) */}
          <AnimatePresence>
            {isFlipping && flipDirection === 'next' && (
              <motion.div
                key={`flip-next-${currentSpreadIndex}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{
                  duration: 0.85,
                  ease: [0.4, 0.0, 0.2, 1] // Natural page turn inertia
                }}
                onAnimationComplete={() => {
                  setCurrentSpreadIndex(targetSpreadIndex);
                  setIsFlipping(false);
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: '50%',
                  height: '100%',
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  zIndex: 40
                }}
              >
                {/* FRONT FACE of flipping page (Current Right Page) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    boxShadow: '-8px 0 25px rgba(0,0,0,0.18)'
                  }}
                  className="rounded-r-2xl overflow-hidden"
                >
                  <PageRightContent
                    spread={currentSpread}
                    data={data}
                    pageNumber={currentSpreadIndex * 2 + 2}
                  />
                  {/* Dynamic page curl shadow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.35, 0] }}
                    transition={{ duration: 0.85 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10 pointer-events-none"
                  />
                </div>

                {/* BACK FACE of flipping page (Next Left Page) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    boxShadow: '8px 0 25px rgba(0,0,0,0.18)'
                  }}
                  className="rounded-l-2xl overflow-hidden"
                >
                  <PageLeftContent
                    spread={targetSpread}
                    data={data}
                    pageNumber={targetSpreadIndex * 2 + 1}
                  />
                  {/* Dynamic landing shadow */}
                  <motion.div
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.85 }}
                    className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/10 pointer-events-none"
                  />
                </div>
              </motion.div>
            )}

            {isFlipping && flipDirection === 'prev' && (
              <motion.div
                key={`flip-prev-${currentSpreadIndex}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{
                  duration: 0.85,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                onAnimationComplete={() => {
                  setCurrentSpreadIndex(targetSpreadIndex);
                  setIsFlipping(false);
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                  zIndex: 40
                }}
              >
                {/* FRONT FACE of flipping page (Current Left Page) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    boxShadow: '8px 0 25px rgba(0,0,0,0.18)'
                  }}
                  className="rounded-l-2xl overflow-hidden"
                >
                  <PageLeftContent
                    spread={currentSpread}
                    data={data}
                    pageNumber={currentSpreadIndex * 2 + 1}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.35, 0] }}
                    transition={{ duration: 0.85 }}
                    className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/10 pointer-events-none"
                  />
                </div>

                {/* BACK FACE of flipping page (Prev Right Page) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    boxShadow: '-8px 0 25px rgba(0,0,0,0.18)'
                  }}
                  className="rounded-r-2xl overflow-hidden"
                >
                  <PageRightContent
                    spread={targetSpread}
                    data={data}
                    pageNumber={targetSpreadIndex * 2 + 2}
                  />
                  <motion.div
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.85 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10 pointer-events-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile View: High-fidelity Touch Flip Card */}
        <div className="md:hidden relative w-full min-h-[560px] rounded-2xl shadow-xl border border-[#E8DFC9] bg-[#FAF6ED] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSpreadIndex}
              initial={{ opacity: 0, rotateY: flipDirection === 'next' ? 65 : -65, scale: 0.95 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: flipDirection === 'next' ? -65 : 65, scale: 0.95 }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              className="w-full h-full flex flex-col"
            >
              <PageLeftContent
                spread={currentSpread}
                data={data}
                pageNumber={currentSpreadIndex * 2 + 1}
              />
              <div className="h-px bg-[#E3D9C9] my-2" />
              <PageRightContent
                spread={currentSpread}
                data={data}
                pageNumber={currentSpreadIndex * 2 + 2}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Floating Control Bar matching Screen 4 */}
        {/* [< PREV] [PREV] [1 to 4] [NEXT >] [PLAY & SHARE] [🎵 MUSIC] */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-full bg-[#1C1818] text-[#FFF8ED] text-xs font-mono tracking-wider shadow-2xl border border-amber-400/20">
            <button
              onClick={handlePrev}
              disabled={isFlipping}
              className="px-2.5 py-1 rounded-md hover:bg-white/15 active:scale-95 transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </button>

            <span className="px-2 py-0.5 text-amber-300 font-bold">
              Spread {currentSpreadIndex + 1} of {totalSpreads}
            </span>

            <button
              onClick={handleNext}
              disabled={isFlipping}
              className="px-2.5 py-1 rounded-md hover:bg-white/15 active:scale-95 transition-all cursor-pointer flex items-center gap-1 disabled:opacity-50"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-4 bg-white/20 mx-1" />

            <button
              onClick={handleShare}
              className="px-2.5 py-1 rounded-md hover:bg-rose-900/60 transition-colors cursor-pointer flex items-center gap-1.5 text-rose-300 hover:text-white"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PLAY & SHARE</span>
            </button>

            <button
              onClick={onToggleMusic}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                isMusicPlaying ? 'text-amber-300' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">MUSIC</span>
            </button>
          </div>
        </div>

        {/* Gentle hint */}
        <p className="text-center text-[11px] font-mono text-[#8C7A70] mt-3">
          Tip: Click NEXT / PREV or tap directly on the pages to flip the magazine
        </p>
      </div>
    </section>
  );
}
