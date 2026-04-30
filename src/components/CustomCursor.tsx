'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let glowX = 0;
    let glowY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      // Slower follow for the giant glow spotlight
      glowX += (mouseX - glowX) * 0.04;
      glowY += (mouseY - glowY) * 0.04;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animateRing);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Animate ring
    const animationFrame = requestAnimationFrame(animateRing);

    // Dynamic hover detection for interactive elements
    const updateHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], .interactive');
      elements.forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    // Initial listener setup
    updateHoverListeners();
    
    // Re-run observer for dynamic content
    const observer = new MutationObserver(updateHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Target Dot */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#c9a84c] transition-[width,height,background-color] duration-200 ease-out ${
          isHovering ? 'w-3 h-3 bg-[#e8d5a3]' : isClicking ? 'w-1.5 h-1.5' : 'w-2 h-2'
        }`}
      />
      {/* Outer Ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-[rgba(201,168,76,0.5)] transition-[width,height,border-color] duration-350 ease-out ${
          isHovering ? 'w-14 h-14 border-[rgba(201,168,76,0.8)]' : isClicking ? 'w-7 h-7' : 'w-9 h-9'
        }`}
      />
    </>
  );
}
