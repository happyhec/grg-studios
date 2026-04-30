'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

const FRAME_COUNT = 120;
const IMAGE_PATH_TEMPLATE = (index: number) =>
  `/assets/projects/flora/rose-bloom/ezgif-frame-${(index * 2 + 1).toString().padStart(3, '0')}.jpg`;

export default function FloraShowcase() {
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0.1, 0.8], [0, FRAME_COUNT - 1]);

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
          img.onerror = resolve;
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
    <section id="flora-syndicate" ref={containerRef} className="relative h-[250vh] bg-black scroll-snap-section">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The Bloom Canvas (Desktop Only) */}
        {!isMobile ? (
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ opacity: isLoading ? 0 : 0.8 }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src="/assets/projects/flora/rose-bloom/ezgif-frame-061.jpg" 
              alt="Flora Mobile" 
              fill 
              className="object-cover opacity-40 grayscale"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.1], [50, 0])
            }}
          >
            <span className="text-[#c9a84c] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Case Study B</span>
            <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-none">FLORA SYNDICATE</h2>
            <p className="text-white/40 font-outfit max-w-xl mx-auto mt-6 text-lg leading-relaxed">
              Custom e-commerce platform and brand identity system. Elevating the floral delivery experience through biological immersion.
              The Ecuadorian Rose Bloom—a 120-frame transition from bud to full flower.
            </p>
          </motion.div>

          {/* Interactive Feature Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
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

        {/* Loading Bar (Desktop Only) */}
        <AnimatePresence>
          {isLoading && !isMobile && (
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
    </section>
  );
}

function FloatingRender({ src, pos, delay, scrollScale }: { src: string; pos: string; delay: number; scrollScale: [number, number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1 }}
      className={`absolute ${pos} w-[25vw] max-w-[400px] aspect-[4/5] border border-white/10 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700`}
    >
      <Image 
        src={src} 
        alt="Architectural Render" 
        fill 
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40 tracking-widest uppercase">
        Architectural Render // Concept 01
      </div>
    </motion.div>
  );
}

function FeatureCard({ title, value, desc }: { title: string; value: string; desc: string }) {
  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/5 p-6 rounded-xl text-left">
      <div className="text-[10px] font-mono text-[#c9a84c] tracking-[0.2em] uppercase mb-2">{title}</div>
      <div className="text-xl font-serif italic text-white mb-2">{value}</div>
      <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}
