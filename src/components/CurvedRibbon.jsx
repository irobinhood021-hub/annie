import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Play, Pause } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function CurvedRibbon({ data }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const offsetRef = useRef(0);

  const [activePhoto, setActivePhoto] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 680 });
  const [cardPositions, setCardPositions] = useState([]);
  const names = ['Annie', 'Ananya', 'Akshara'];
  const [nameIndex, setNameIndex] = useState(0);
  const nameToggle = names[nameIndex];

  // Base canvas coordinate system matching the reference screenshot exactly
  const BASE_WIDTH = 1200;
  const BASE_HEIGHT = 680;

  // The precise roller-coaster loop SVG path matching media_1795249416289_a547f84f.jpg
  // 1. Starts bottom-left, runs horizontally under the text
  // 2. Ascends smoothly into the signature loop
  // 3. Curves clockwise over the top apex and down the right side of the loop
  // 4. Crosses near the bottom and swoops smoothly out towards the right edge
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
      list.push({
        ...srcPhoto,
        uniqueId: `card-${i}`,
        // One featured card highlighted in color at apex (matching reference screenshot)
        isSpecialFeatured: i === 10
      });
    }
    return list;
  }, [data.ribbonPhotos]);

  // Handle responsive resizing for both laptop and mobile
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        const isMobile = w < 768;
        const h = isMobile ? Math.max(520, w * 1.05) : Math.max(640, w * 0.56);
        setContainerSize({ width: w, height: h });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Ultra-smooth delta-time based continuous loop animation
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

    // Cinematic cruise speed (pixels per second)
    const speedPxPerSec = 44;
    lastTimeRef.current = performance.now();

    const render = (currentTime) => {
      // Calculate delta time for 100% consistent frame rate (60Hz / 120Hz ProMotion)
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

        // Central difference tangent sampling (±8px) for ultra-silky angle rotation without jitter
        const p1Dist = (dist - 8 + pathLength) % pathLength;
        const p2Dist = (dist + 8) % pathLength;
        const p1 = path.getPointAtLength(p1Dist);
        const p2 = path.getPointAtLength(p2Dist);
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        // Responsive coordinate scaling
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

  // Increased card size: generous & prominent on desktop, clear on mobile
  const isMobile = containerSize.width < 768;
  const isTablet = containerSize.width >= 768 && containerSize.width < 1024;
  const cardSize = isMobile ? 82 : isTablet ? 108 : 126;

  return (
    <section id="ribbon" className="relative w-full bg-[#FAF5EB] overflow-hidden select-none py-10 md:py-18">
      {/* Hidden SVG Path element used for math calculations */}
      <svg className="absolute w-0 h-0 pointer-events-none" viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}>
        <path ref={pathRef} d={pathD} fill="none" />
      </svg>

      {/* Decorative Sparkle Accent in bottom right matching screenshot */}
      <div className="absolute right-8 bottom-12 text-[#E2D4BF] pointer-events-none">
        <Sparkles className="w-10 h-10 md:w-16 md:h-16" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative">
        {/* Main Section Layout: Text on Left + Moving Loop Canvas */}
        <div
          ref={containerRef}
          className="relative w-full min-h-[520px] md:min-h-[680px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setActivePhoto(null);
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 2200);
          }}
        >
          {/* Top Left: Typography matching media_1795249416289_a547f84f.jpg */}
          <div className="absolute top-0 left-0 z-20 max-w-sm md:max-w-md pt-2 md:pt-6 pointer-events-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#161212] leading-[1.08] tracking-tight">
              Happy <br />
              Birthday <br />
              <span className="inline-block relative">
                <span className="italic font-normal font-serif text-[#161212]">
                  {nameToggle}
                </span>
                {/* Subtle switch toggle between Annie, Ananya, and Akshara */}
                <button
                  onClick={() => setNameIndex((prev) => (prev + 1) % names.length)}
                  title="Switch between Annie / Ananya / Akshara"
                  className="ml-3 text-[10px] font-mono tracking-widest text-[#8C2735] hover:underline uppercase align-middle bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 cursor-pointer shadow-2xs"
                >
                  → {names[(nameIndex + 1) % names.length]}
                </button>
              </span>
            </h1>

            {/* Short horizontal divider line under title */}
            <div className="w-12 h-0.5 bg-[#8C2735] mt-5 mb-5" />

            <p className="text-[#524641] text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-xs sm:max-w-sm">
              {data.hero.subtitle}
            </p>

            {/* Mobile / Laptop Motion Control Pill */}
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

              <span className="text-[10px] font-mono text-[#8F7D74] hidden sm:inline">
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
                  // Pure GPU transform without CSS transition lag during animation frames
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${pos.angle}deg)`,
                  zIndex: isHovered ? 60 : isHighlighted ? 35 : Math.round(pos.y),
                  willChange: 'transform',
                  pointerEvents: 'auto'
                }}
                onMouseEnter={() => {
                  sounds.playPop();
                  setActivePhoto(photo);
                }}
                onTouchStart={() => {
                  sounds.playPop();
                  setActivePhoto(photo);
                }}
              >
                {/* Inner Card Container: handles hover scale & lighting without fighting rAF positional transform */}
                <div
                  style={{
                    transform: isHovered ? 'scale(1.36)' : 'scale(1)',
                    transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease'
                  }}
                  className={`w-full h-full rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-white cursor-pointer select-none ${
                    isHighlighted
                      ? 'shadow-[0_12px_30px_rgba(0,0,0,0.18)] ring-2 ring-amber-400/90 ring-offset-2'
                      : 'shadow-[0_6px_16px_rgba(0,0,0,0.08)] border border-[#E0D3C1]'
                  }`}
                >
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative bg-neutral-200">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                        isHighlighted
                          ? 'grayscale-0 scale-105'
                          : 'grayscale contrast-110'
                      }`}
                      loading="lazy"
                      draggable="false"
                    />
                    {/* Gloss glass highlight overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Active Hover Floating Caption Badge */}
          <AnimatePresence>
            {activePhoto && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1C1818]/95 text-[#FFF8ED] text-xs font-serif tracking-wider shadow-2xl flex items-center gap-2 backdrop-blur-md border border-amber-400/40 pointer-events-none"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
                <span>{activePhoto.caption}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
