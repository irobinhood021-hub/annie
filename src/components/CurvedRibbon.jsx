import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Play, Pause, X } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function CurvedRibbon({ data }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const offsetRef = useRef(0);

  const [activePhoto, setActivePhoto] = useState(null);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 680 });
  const [cardPositions, setCardPositions] = useState([]);

  // Base canvas coordinate system matching the reference screenshot exactly
  const BASE_WIDTH = 1200;
  const BASE_HEIGHT = 680;

  // The precise roller-coaster loop SVG path matching media_1795249416289_a547f84f.jpg
  const pathD = useMemo(() => {
    return [
      "M -120 590",
      "C 80 590, 260 590, 390 580",
      "C 455 575, 485 520, 505 435",
      "C 525 330, 550 220, 600 160",
      "C 640 115, 715 115, 755 165",
      "C 795 215, 795 325, 765 415",
      "C 725 495, 650 550, 585 570",
      "C 545 580, 580 600, 670 590",
      "C 775 580, 880 540, 975 480",
      "C 1070 420, 1160 360, 1320 300"
    ].join(" ");
  }, []);

  // 20 cards: optimal spacing with the larger photo sizes
  const totalCards = 20;
  const photos = useMemo(() => {
    const list = [];
    for (let i = 0; i < totalCards; i++) {
      const srcPhoto = data.ribbonPhotos[i % data.ribbonPhotos.length];
      const imageSrc = srcPhoto.url || srcPhoto.src || srcPhoto.image;
      list.push({
        ...srcPhoto,
        src: imageSrc,
        url: imageSrc,
        fullUrl: srcPhoto.fullUrl || imageSrc,
        uniqueId: `card-${i}`,
        // One featured card highlighted in color at apex
        isSpecialFeatured: i === 10
      });
    }
    return list;
  }, [data.ribbonPhotos]);

  // Handle responsive resizing for laptop
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = Math.max(640, w * 0.56);
        setContainerSize({ width: w, height: h });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Ultra-smooth delta-time based continuous loop animation for desktop
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let pathLength = 0;
    try {
      pathLength = path.getTotalLength();
    } catch (e) {
      return;
    }

    if (!pathLength) return;

    const speedPxPerSec = 44;
    lastTimeRef.current = performance.now();

    const render = (currentTime) => {
      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = currentTime;

      if (!isPaused) {
        offsetRef.current = (offsetRef.current + speedPxPerSec * dt) % pathLength;
      }

      const scaleX = containerSize.width / BASE_WIDTH;
      const scaleY = containerSize.height / BASE_HEIGHT;

      const positions = [];
      const step = pathLength / totalCards;

      for (let i = 0; i < totalCards; i++) {
        const dist = (offsetRef.current + i * step) % pathLength;
        const pt = path.getPointAtLength(dist);

        const p1Dist = (dist - 8 + pathLength) % pathLength;
        const p2Dist = (dist + 8) % pathLength;
        const p1 = path.getPointAtLength(p1Dist);
        const p2 = path.getPointAtLength(p2Dist);
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        const posX = pt.x * scaleX;
        const posY = pt.y * scaleY;

        positions.push({
          x: posX,
          y: posY,
          angle: angle,
          dist: dist
        });
      }

      setCardPositions(positions);
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [containerSize, isPaused, pathD]);

  const cardSize = 126;

  // Split photos into two rows for the mobile photo strip
  const mobileRow1 = useMemo(() => {
    const row = data.ribbonPhotos.slice(0, 10).map(p => ({
      ...p,
      src: p.url || p.src || p.image
    }));
    return [...row, ...row];
  }, [data.ribbonPhotos]);

  const mobileRow2 = useMemo(() => {
    const row = data.ribbonPhotos.slice(10, 20).map(p => ({
      ...p,
      src: p.url || p.src || p.image
    }));
    return [...row, ...row];
  }, [data.ribbonPhotos]);

  return (
    <section id="ribbon" className="relative w-full bg-[#FAF5EB] overflow-hidden select-none py-10 md:py-18">
      {/* Hidden SVG Path element used for laptop math calculations */}
      <svg className="absolute w-0 h-0 pointer-events-none" viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}>
        <path ref={pathRef} d={pathD} fill="none" />
      </svg>

      {/* Decorative Sparkle Accent in bottom right */}
      <div className="absolute right-8 bottom-12 text-[#E2D4BF] pointer-events-none">
        <Sparkles className="w-10 h-10 md:w-16 md:h-16" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 relative">

        {/* ========================================================= */}
        {/* 1. DESKTOP / LAPTOP VIEW: Signature Roller-Coaster 3D Curve */}
        {/* ========================================================= */}
        <div
          ref={containerRef}
          className="hidden md:block relative w-full min-h-[640px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setActivePhoto(null);
          }}
        >
          {/* Top Left: Typography matching media_1795249416289_a547f84f.jpg */}
          <div className="absolute top-0 left-0 z-20 max-w-sm md:max-w-md pt-2 md:pt-6 pointer-events-auto">
            <h1 className="text-5xl md:text-7xl font-serif text-[#161212] leading-[1.08] tracking-tight">
              Happy <br />
              Birthday <br />
              <span className="italic font-normal font-serif text-[#161212]">
                {data.name}
              </span>
            </h1>

            {/* Short horizontal divider line under title */}
            <div className="w-12 h-0.5 bg-[#8C2735] mt-5 mb-5" />

            <p className="text-[#524641] text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-xs sm:max-w-sm">
              {data.hero.subtitle}
            </p>

            {/* Motion Control Pill */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[#DECDB7] text-[11px] font-mono text-[#574943] hover:bg-white shadow-xs transition-all cursor-pointer"
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 text-rose-600 fill-rose-600" />
                    <span>Resume Loop</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-amber-600 fill-amber-600" />
                    <span>Smooth Flow</span>
                  </>
                )}
              </button>

              <span className="text-[10px] font-mono text-[#8F7D74]">
                Hover to pause & inspect
              </span>
            </div>
          </div>

          {/* Cards Riding the Moving Roller-Coaster Ribbon Loop */}
          {cardPositions.map((pos, idx) => {
            const photo = photos[idx];
            if (!photo) return null;

            const isHovered = activePhoto?.uniqueId === photo.uniqueId;
            const isHighlighted = isHovered || (!activePhoto && photo.isSpecialFeatured);

            return (
              <div
                key={photo.uniqueId}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${cardSize}px`,
                  height: `${cardSize}px`,
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${pos.angle}deg)`,
                  zIndex: isHovered ? 60 : isHighlighted ? 35 : Math.round(pos.y),
                  willChange: 'transform',
                  transition: 'z-index 0.2s ease',
                  pointerEvents: 'auto'
                }}
                onMouseEnter={() => {
                  sounds.playChime(659.25, 0.4, 'sine', 0.08);
                  setActivePhoto(photo);
                }}
              >
                <div
                  className={`w-full h-full rounded-2xl p-1.5 transition-all duration-300 cursor-pointer ${
                    isHighlighted
                      ? 'bg-amber-400 shadow-[0_12px_28px_rgba(245,158,11,0.45)] scale-120'
                      : 'bg-white/90 shadow-md hover:scale-110'
                  }`}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-neutral-200">
                    <img
                      src={photo.src || photo.url}
                      alt={photo.caption}
                      loading={idx < 6 ? "eager" : "lazy"}
                      decoding="async"
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isHighlighted ? 'grayscale-0 contrast-105' : 'grayscale contrast-95'
                      }`}
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* ========================================================= */}
        {/* 2. MOBILE VIEW: Pure Horizontal Photo Filmstrip (Clean Strip) */}
        {/* ========================================================= */}
        <div className="md:hidden block">
          {/* Header & Typography */}
          <div className="text-left mb-6 pt-2">
            <h1 className="text-4xl sm:text-5xl font-serif text-[#161212] leading-[1.1] tracking-tight">
              Happy Birthday <br />
              <span className="italic font-normal font-serif text-[#161212]">
                {data.name}
              </span>
            </h1>

            {/* Short horizontal divider line */}
            <div className="w-10 h-0.5 bg-[#8C2735] mt-3.5 mb-3.5" />

            <p className="text-[#524641] text-xs leading-relaxed font-sans max-w-sm">
              {data.hero.subtitle}
            </p>

            {/* Mobile Controls */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#DECDB7] text-[11px] font-mono text-[#574943] shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3 text-rose-600 fill-rose-600" />
                    <span>Resume Motion</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-amber-600 fill-amber-600" />
                    <span>Pause Flow</span>
                  </>
                )}
              </button>

              <span className="text-[10px] font-mono text-[#8F7D74]">
                Tap photo to preview ✨
              </span>
            </div>
          </div>

          {/* Continuous Moving Photo Strips */}
          <div className="relative py-2 -mx-4 overflow-hidden">
            {/* Top Fade Edge */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF5EB] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF5EB] to-transparent z-10 pointer-events-none" />

            {/* STRIP 1: Glides Left */}
            <div className={`animate-marquee-left mb-3.5 ${isPaused ? 'paused-marquee' : ''}`}>
              {mobileRow1.map((item, idx) => (
                <div
                  key={`strip1-${idx}`}
                  onClick={() => {
                    sounds.playPop();
                    setModalPhoto(item);
                  }}
                  className="mx-1.5 w-[110px] sm:w-[130px] aspect-[4/5] rounded-xl overflow-hidden bg-white p-1 shadow-sm border border-amber-200/50 cursor-pointer active:scale-95 transition-transform flex-shrink-0"
                >
                  <img
                    src={item.src || item.url}
                    alt={item.caption}
                    loading={idx < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* STRIP 2: Glides Right */}
            <div className={`animate-marquee-right ${isPaused ? 'paused-marquee' : ''}`}>
              {mobileRow2.map((item, idx) => (
                <div
                  key={`strip2-${idx}`}
                  onClick={() => {
                    sounds.playPop();
                    setModalPhoto(item);
                  }}
                  className="mx-1.5 w-[110px] sm:w-[130px] aspect-[4/5] rounded-xl overflow-hidden bg-white p-1 shadow-sm border border-amber-200/50 cursor-pointer active:scale-95 transition-transform flex-shrink-0"
                >
                  <img
                    src={item.src || item.url}
                    alt={item.caption}
                    loading={idx < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Photo Preview Modal when tapped on mobile or desktop */}
      <AnimatePresence>
        {modalPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#1C1818] p-4 rounded-2xl shadow-2xl border border-amber-400/40 text-[#FFF8ED]"
            >
              <button
                onClick={() => setModalPhoto(null)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-white p-1 rounded-full bg-black/40 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-neutral-900">
                <img
                  src={modalPhoto.fullUrl || modalPhoto.src || modalPhoto.url}
                  alt={modalPhoto.caption}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-200">
                <span className="capitalize">{modalPhoto.caption || "Annie's Special Moment"}</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
