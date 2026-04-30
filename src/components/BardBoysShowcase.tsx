'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { ShieldAlert, Film, Zap, Play } from 'lucide-react';

const FRAME_COUNT = 120;
const IMAGE_PATH_TEMPLATE = (index: number) =>
  `/assets/projects/bard-boys/hero-sequence/ezgif-frame-${(index * 2 + 1).toString().padStart(3, '0')}.jpg`;

export default function BardBoysShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile Click-to-Play State
  const [showMobileFallback, setShowMobileFallback] = useState(true);
  const [mobileFrame, setMobileFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Trigger when element scrolls into view
  const isInView = useInView(containerRef, { margin: "100% 0px 100% 0px", once: true });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll Progress for Desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0.1, 0.9], [0, FRAME_COUNT - 1]);

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

  // Initial loading state overlay for desktop to cover empty canvas
  const showDesktopLoader = !isMobile && isLoading;

  return (
    <section 
      id="bard-boys" 
      ref={containerRef} 
      className={`relative bg-black scroll-snap-section ${isMobile ? 'h-auto py-12' : 'h-[250vh]'}`}
    >
      <div className={`w-full flex flex-col overflow-hidden ${isMobile ? 'relative h-[80vh] rounded-3xl border border-white/10 mx-auto w-[90vw]' : 'sticky top-0 h-screen'}`}>
        
        {/* Visual Layer */}
        {!isMobile ? (
          // DESKTOP: Canvas Scrub
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale brightness-75 transition-opacity duration-1000"
            style={{ opacity: isLoading ? 0 : 0.6 }}
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
                  src="/assets/projects/bard-boys/hero-sequence/ezgif-frame-061.jpg" 
                  alt="Bard Boys Mobile" 
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
                  <span className="mt-4 text-[9px] text-white/50 tracking-widest uppercase">120-Frame WebGL Render</span>
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

        {/* Content Overlay */}
        <div className={`relative z-10 flex flex-col items-center justify-center h-full px-6 pointer-events-none ${isMobile && !showMobileFallback ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          
          {/* Diagnostic HUD Overlay */}
          <div className="absolute top-24 left-6 space-y-4 max-w-sm hidden lg:block">
            <DiagnosticPanel 
              title="ENCRYPTION GATE" 
              status="ACTIVE" 
              details="AES-256 Age Verification Layer"
            />
            <DiagnosticPanel 
              title="SIGNAL LISTENERS" 
              status="STANDBY" 
              details="Socket: STATE_VOID"
            />
          </div>

          <motion.div
            style={{ opacity: isMobile ? 1 : useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
            className="text-center"
          >
            <span className="text-[#c9a84c] font-bold tracking-[0.4em] uppercase text-xs mb-4 block drop-shadow-md">Case Study A</span>
            <h2 className="text-6xl md:text-9xl font-bebas text-white leading-none drop-shadow-lg">BARD BOYS</h2>
            <p className="text-white/80 font-outfit max-w-xl mx-auto mt-4 text-sm md:text-lg leading-relaxed drop-shadow-md hidden md:block">
              Architected Ventura County's premier genetics boutique with proprietary age-verification gates and real-time inventory synchronization. 
            </p>
          </motion.div>
        </div>

        {/* Desktop Loading Overlay */}
        <AnimatePresence>
          {showDesktopLoader && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex items-center justify-center z-[100]"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="text-[#c9a84c] animate-pulse text-[10px] tracking-[0.6em] uppercase font-mono">Initializing Sequence</div>
                <div className="w-64 h-px bg-white/10 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-[#c9a84c]"
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
            Architected Ventura County's premier genetics boutique with proprietary age-verification gates. A collision of high-end technical architecture and cinematic retail.
          </p>
          <div className="space-y-4">
            <FeatureCard 
              icon={<ShieldAlert className="w-5 h-5 text-[#c9a84c]" strokeWidth={1} />}
              title="Security Infrastructure"
              desc="Remote Killswitch logic paired with industry-grade age verification gates."
            />
            <FeatureCard 
              icon={<Film className="w-5 h-5 text-[#c9a84c]" strokeWidth={1} />}
              title="Cinematic Narrative"
              desc="120-frame WebGL scroll-scrub sequence delivering a filmic product introduction."
            />
          </div>
        </div>
      )}
    </section>
  );
}

function DiagnosticPanel({ title, status, details }: { title: string; status: string; details: string }) {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-lg font-mono text-[10px]">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white/40">{title}</span>
        <span className="text-[#c9a84c]">{status}</span>
      </div>
      <div className="text-white opacity-90">{details}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
      <div className="mb-3">{icon}</div>
      <h3 className="text-white text-xs font-bold mb-2 uppercase tracking-wider">{title}</h3>
      <p className="text-white/40 text-[11px] leading-relaxed">{desc}</p>
    </div>
  );
}
