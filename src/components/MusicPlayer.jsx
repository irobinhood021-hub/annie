import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Volume2, VolumeX, Sparkles, Disc } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function MusicPlayer({ isMusicPlaying, onToggleMusic, personName }) {
  const [liked, setLiked] = useState(true);
  const [activeTrack, setActiveTrack] = useState(sounds.activeTrack);

  useEffect(() => {
    const unsub = sounds.subscribe(({ activeTrack }) => {
      setActiveTrack(activeTrack);
    });
    return unsub;
  }, []);

  const isScrapbook = activeTrack === 'scrapbook';
  const trackTitle = isScrapbook ? 'Na Gall Mere Vas Di Rahi' : 'Happy Birthday Tune';
  const trackSub = isScrapbook ? 'Scrapbook Special 🎵' : 'Acoustic Birthday Melody 🎸';

  const handlePlayPause = () => {
    if (isScrapbook) {
      sounds.toggleScrapbookMusic();
    } else {
      onToggleMusic();
    }
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 z-40 select-none max-w-[calc(100vw-24px)]">
      <div className="flex items-center gap-2.5 sm:gap-3 bg-[#1C1818]/92 text-[#FFF8ED] backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.4)] border border-amber-400/30">
        {/* Spinning Vinyl Disc Artwork */}
        <div className="relative w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-950 flex items-center justify-center shadow border border-amber-400/40 overflow-hidden flex-shrink-0">
          <div
            className={`w-full h-full rounded-full flex items-center justify-center ${
              isMusicPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <Disc className="w-7 sm:w-8 h-7 sm:h-8 text-amber-200/80" />
          </div>
          <div className="absolute w-2.5 h-2.5 rounded-full bg-rose-500 border border-white" />
        </div>

        {/* Track Details */}
        <div className="text-left pr-1 sm:pr-2 max-w-[130px] xs:max-w-[170px] sm:max-w-none">
          <div className="text-[11px] sm:text-xs font-serif font-bold text-amber-200 tracking-wide flex items-center gap-1.5 truncate">
            <span className="truncate">{trackTitle}</span>
            {isMusicPlaying && (
              <span className="flex gap-0.5 items-end h-2.5 flex-shrink-0">
                <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
                <span className="w-0.5 h-3 bg-rose-300 animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-rose-400 animate-pulse delay-150" />
              </span>
            )}
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 truncate">
            {trackSub}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          title={isMusicPlaying ? "Pause Track" : "Play Track"}
          className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow cursor-pointer flex-shrink-0"
        >
          {isMusicPlaying ? (
            <Pause className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-white" />
          ) : (
            <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-white translate-x-0.5" />
          )}
        </button>

        {/* Heart like button */}
        <button
          onClick={() => {
            sounds.playPop();
            setLiked(!liked);
          }}
          className="text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer p-1 flex-shrink-0"
        >
          <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${liked ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>
      </div>
    </div>
  );
}
