import React from 'react';
import { Sparkles, Music, Volume2, VolumeX, Heart } from 'lucide-react';

export default function Navbar({ isMusicPlaying, onToggleMusic, onReopenCurtains }) {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#F8F4EC]/90 border-b border-[#E8DEC8]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between text-xs sm:text-sm tracking-wider uppercase font-medium text-[#574B46]">
        {/* Left Links */}
        <nav className="flex items-center gap-3 sm:gap-7">
          <a href="#home" className="hover:text-rose-600 transition-colors py-1 border-b-2 border-rose-500 font-semibold text-[#2D2727]">
            Home
          </a>
          <a href="#ribbon" className="hover:text-rose-600 transition-colors">
            Moments
          </a>
          <a href="#scrapbook" className="hover:text-rose-600 transition-colors">
            Wishes
          </a>
        </nav>

        {/* Center Brand Monogram */}
        <div className="hidden sm:flex items-center gap-1.5 font-serif text-base sm:text-lg tracking-widest text-[#2D2727] select-none">
          <span className="font-bold uppercase tracking-wider text-xs sm:text-sm font-sans">A</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span className="font-bold uppercase tracking-wider text-xs sm:text-sm font-sans">19</span>
        </div>

        {/* Right Links & Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a href="#magazine" className="hover:text-rose-600 transition-colors hidden md:inline-block">
            Vogue
          </a>

          {/* Re-curtain trigger */}
          <button
            onClick={onReopenCurtains}
            title="Stage Intro"
            className="text-[10px] sm:text-[11px] font-mono tracking-widest px-2 sm:px-2.5 py-1 rounded-md border border-[#D5C7B0] hover:bg-[#EBE0CD] transition-all cursor-pointer text-[#4A3E39]"
          >
            Curtains
          </button>

          {/* Music button */}
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all cursor-pointer ${
              isMusicPlaying
                ? 'bg-rose-100/80 border-rose-300 text-rose-700 shadow-xs'
                : 'bg-white/60 border-[#D5C7B0] text-[#695D56] hover:bg-white'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 animate-pulse text-rose-600" />
                <span className="text-[10px] sm:text-[11px] font-mono font-medium lowercase">melody</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#8A7C75]" />
                <span className="text-[10px] sm:text-[11px] font-mono lowercase">music</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
