'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 144;
const IMAGE_PATH_TEMPLATE = (index: number) =>
  `/assets/projects/flora/sunflower/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export default function SunflowerShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Increased section height for enough "scrub" space
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map the scroll range with a plateau at the end so it stays bloomed
  const frameIndex = useTransform(smoothProgress, [0, 0.7, 1], [0, FRAME_COUNT - 1, FRAME_COUNT - 1]);

  useEffect(() => {
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
    return () => { isMounted = false; };
  }, []);

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
    <section id="sunflower-lab" ref={containerRef} className="relative h-[300vh] bg-black scroll-snap-section">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Lab HUD Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none p-12 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div className="font-mono text-[10px] text-[#c9a84c] tracking-[0.4em] uppercase">
                Flora Lab // heliotropic_study_04
              </div>
              <div className="text-white/20 font-mono text-[10px] uppercase">
                Sequence: SF_BLOOM_ALPHA
              </div>
           </div>
           
           <div className="max-w-xs">
              <h4 className="text-white font-serif italic text-2xl mb-2">The Sunflower Prototype</h4>
              <p className="text-white/40 text-xs leading-relaxed">
                Synchronizing scroll depth with biological heliotropism. 
                Visualizing the structural expansion of the Ecuadorian Sunflower in high-frequency capture.
              </p>
           </div>
        </div>

        {/* The Sunflower Canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain grayscale brightness-50 contrast-125"
          style={{ opacity: isLoading ? 0 : 0.6 }}
        />

        <AnimatePresence>
          {isLoading && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 text-center"
            >
               <div className="flex flex-col items-center gap-6">
                 <div className="text-white/20 text-[10px] font-mono tracking-[0.6em] uppercase">Syncing Helotropic Data</div>
                 <div className="w-48 h-[1px] bg-white/10 relative">
                   <motion.div 
                     className="absolute inset-y-0 left-0 bg-[#c9a84c]"
                     style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                   />
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scroll Progress Indicator - Left side */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 h-32 w-[1px] bg-white/5 opacity-50 z-20">
           <motion.div 
             className="w-full bg-[#c9a84c]"
             style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
           />
        </div>

      </div>
    </section>
  );
}

