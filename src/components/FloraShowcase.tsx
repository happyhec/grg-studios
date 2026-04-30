'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';

const FRAME_COUNT = 120;
const IMAGE_PATH_TEMPLATE = (index: number) =>
  `/assets/projects/flora/rose-bloom/ezgif-frame-${(index * 2 + 1).toString().padStart(3, '0')}.jpg`;

export default function FloraShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Mobile Click-to-Play State
  const [showMobileFallback, setShowMobileFallback] = useState(true);
  const [mobileFrame, setMobileFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const isInView = useInView(containerRef, { margin: "100% 0px 100% 0px", once: true });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll Progress (Desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0.1, 0.8], [0, FRAME_COUNT - 1]);

  // Unified Image Fetcher
  const fetchImages = async () => {
    setIsLoading(true);
    const loaded: HTMLImageElement[] = [];
    const promises = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const promise = new Promise<void>((resolve) => {
        const img = new (window as any).Image();
        img.src = IMAGE_PATH_TEMPLATE(i);
        img.onload = () => {
          loaded[i] = img;
          setLoadedCount((prev) => prev + 1);
          resolve();
        };
        img.onerror = resolve; // Ignore errors to prevent hanging
      });
      promises.push(promise);
    }

    await Promise.all(promises);
    setImages(loaded);
    setIsLoading(false);
    return loaded;
  };

  // Desktop Preload when in view
  useEffect(() => {
    if (isMobile || !isInView) return;
    let isMounted = true;
    
    fetchImages().then(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => { isMounted = false; };
  }, [isInView, isMobile]);

  // Mobile Play Handler
  const handlePlay = async () => {
    setShowMobileFallback(false);
    
    if (images.length === 0) {
      await fetchImages();
    }
    
    setIsPlaying(true);
    let frame = 0;
    const interval = setInterval(() => {
      if (frame >= FRAME_COUNT - 1) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        frame++;
        setMobileFrame(frame);
      }
    }, 1000 / 30); // ~30fps playback
  };

  // Canvas Render Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      renderFrame(isMobile ? mobileFrame : frameIndex.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let unsubscribe: () => void;
    
    if (isMobile) {
      renderFrame(mobileFrame);
    } else {
      unsubscribe = frameIndex.on('change', (latest) => {
        renderFrame(latest);
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (unsubscribe) unsubscribe();
    };
  }, [images, frameIndex, isMobile, mobileFrame]);

  const showDesktopLoader = !isMobile && isLoading;

  return (
    <section 
      id="flora-syndicate" 
      ref={containerRef} 
      className={`relative bg-black scroll-snap-section ${isMobile ? 'h-auto py-12' : 'h-[250vh]'}`}
    >
      <div className={`w-full flex items-center justify-center overflow-hidden ${isMobile ? 'relative h-[80vh] rounded-3xl border border-white/10 mx-auto w-[90vw]' : 'sticky top-0 h-screen'}`}>
        
        {/* Visual Layer */}
        {!isMobile ? (
          // DESKTOP: Canvas Scrub
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ opacity: isLoading ? 0 : 0.8 }}
          />
        ) : (
          // MOBILE: Facade or Playback
          <>
            <canvas 
              ref={canvasRef} 
              className={`absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 ${showMobileFallback ? 'hidden' : 'block'}`}
            />
            
            {showMobileFallback && (
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src="/assets/projects/flora/rose-bloom/ezgif-frame-061.jpg" 
                  alt="Flora Mobile" 
                  fill 
                  className="object-cover opacity-50 grayscale"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                  <button 
                    onClick={handlePlay}
                    className="flex items-center gap-3 bg-[#c9a84c] text-black px-6 py-3 rounded-full font-bold text-[10px] tracking-widest uppercase hover:scale-105 transition-transform"
                  >
                    <Play className="w-4 h-4 fill-black" /> Play Sequence
                  </button>
                  <span className="mt-4 text-[9px] text-white/50 tracking-widest uppercase">120-Frame Bloom Transition</span>
                </div>
              </div>
            )}
            
            {/* Mobile Loading Overlay */}
            {isLoading && isMobile && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin mb-4" />
                <span className="text-[#c9a84c] text-[10px] tracking-widest uppercase animate-pulse">Fetching Assets...</span>
              </div>
            )}
          </>
        )}

        {/* Text Content */}
        <div className={`relative z-10 container mx-auto px-6 flex flex-col items-center text-center pointer-events-none ${isMobile && !showMobileFallback ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          <motion.div
            style={{ 
              opacity: isMobile ? 1 : useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
              y: isMobile ? 0 : useTransform(scrollYProgress, [0, 0.1], [50, 0])
            }}
          >
            <span className="text-[#c9a84c] font-bold tracking-[0.4em] uppercase text-xs mb-4 block drop-shadow-md">Case Study B</span>
            <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-none drop-shadow-lg">FLORA SYNDICATE</h2>
            <p className="text-white/80 font-outfit max-w-xl mx-auto mt-6 text-sm md:text-lg leading-relaxed drop-shadow-md hidden md:block">
              Custom e-commerce platform and brand identity system. Elevating the floral delivery experience through biological immersion.
            </p>
          </motion.div>
        </div>

        {/* Loading Bar (Desktop Only) */}
        <AnimatePresence>
          {showDesktopLoader && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex items-center justify-center z-50"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-white/20 text-xs tracking-[0.5em] uppercase italic">Preparing The Bloom</div>
                <div className="w-64 h-[1px] bg-white/10 relative">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-[#c9a84c]"
                    style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Tech Breakdown (Below Video) */}
      {isMobile && (
        <div className="px-6 mt-8 max-w-sm mx-auto">
          <p className="text-white/60 text-sm leading-relaxed mb-6 text-center">
            Elevating the floral delivery experience through biological immersion. Featuring a complete brand identity system and luxury conversion architecture.
          </p>
          <div className="space-y-4">
            <FeatureCard 
              title="Luxury E-Commerce"
              value="Conversion Architecture"
              desc="High-end shopping experience designed to position arrangements as luxury goods."
            />
            <FeatureCard 
              title="Brand Identity System"
              value="Complete Redesign"
              desc="From packaging guidelines to digital presence, elevating the local delivery standard."
            />
          </div>
        </div>
      )}
    </section>
  );
}

function FeatureCard({ title, value, desc }: { title: string; value: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl text-left">
      <div className="text-[10px] font-mono text-[#c9a84c] tracking-[0.2em] uppercase mb-2">{title}</div>
      <div className="text-xl font-serif italic text-white mb-2">{value}</div>
      <p className="text-white/40 text-[11px] leading-relaxed">{desc}</p>
    </div>
  );
}
