'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { ShieldAlert, Film, Zap } from 'lucide-react';

const FRAME_COUNT = 120;
const IMAGE_PATH_TEMPLATE = (index: number) =>
  `/assets/projects/bard-boys/hero-sequence/ezgif-frame-${(index * 2 + 1).toString().padStart(3, '0')}.jpg`;

export default function BardBoysShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(containerRef, { margin: "200% 0px 200% 0px", once: true });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll Progress (Sticky-relative for perfect timing)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll scrub
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0.1, 0.9], [0, FRAME_COUNT - 1]);

  // Preload
  useEffect(() => {
    if (!isInView || isMobile) return;

    let isMounted = true;
    const loadImages = async () => {
      const loaded: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new (window as any).Image();
          img.src = IMAGE_PATH_TEMPLATE(i);
          img.onload = () => {
            if (isMounted) {
              loaded[i] = img;
              setLoadedCount((prev) => prev + 1);
            }
            resolve();
          };
          img.onerror = resolve; // Continue on error
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      if (isMounted) {
        setImages(loaded);
        setIsLoading(false);
      }
    };

    loadImages();

    // Safety timeout to ensure loading screen clears even if some images fail
    const safetyTimeout = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 5000);

    return () => { 
      isMounted = false; 
      clearTimeout(safetyTimeout);
    };
  }, [isInView]);

  // Canvas Render
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
      renderFrame(frameIndex.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const unsubscribe = frameIndex.on('change', (latest) => {
      renderFrame(latest);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [images, frameIndex]);

  return (
    <section id="bard-boys" ref={containerRef} className="relative h-[250vh] bg-black scroll-snap-section">
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        
        {/* Background Canvas Scrub (Desktop Only) */}
        {!isMobile ? (
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale brightness-75 transition-opacity duration-1000"
            style={{ opacity: isLoading ? 0 : 0.6 }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src="/assets/projects/bard-boys/hero-sequence/ezgif-frame-061.jpg" 
              alt="Bard Boys Mobile" 
              fill 
              className="object-cover opacity-40 grayscale"
            />
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          
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
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
            className="text-center"
          >
            <span className="text-[#c9a84c] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Case Study A // Authority Integration</span>
            <h2 className="text-7xl md:text-9xl font-bebas text-white leading-none">BARD BOYS</h2>
            <p className="text-white/40 font-outfit max-w-xl mx-auto mt-6 text-lg leading-relaxed">
              Engineered Ventura County's premier genetics boutique with proprietary age-verification gates and real-time inventory synchronization. 
              A collision of architectural engineering and cinematic boutique retail.
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
            <FeatureCard 
              icon={<ShieldAlert className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />}
              title="Security Infrastructure"
              desc="Proprietary Remote Killswitch logic paired with industry-grade age verification gates."
            />
            <FeatureCard 
              icon={<Film className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />}
              title="Cinematic Narrative"
              desc="120-frame scroll-scrub sequence delivering a filmic product introduction."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-[#c9a84c]" strokeWidth={1} />}
              title="Fast Commerce"
              desc="Optimized menu indexing with sub-100ms response times for seamless ordering."
            />
          </div>
        </div>

        {/* Loading Sequence (Desktop Only) */}
        <AnimatePresence>
          {isLoading && !isMobile && (
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
                <div className="text-white/20 text-[8px] font-mono uppercase">Deciphering Genetic Arrays</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-white font-bold mb-2 uppercase tracking-wider">{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
