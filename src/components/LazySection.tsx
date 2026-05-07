'use client';

import { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  height?: string;
  /** Optional id placed on the outer wrapper so hash-nav works before the section loads */
  id?: string;
}

export default function LazySection({ children, height = '400px', id }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load 200px before it comes into view
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    // id is on the outer wrapper so it is always present in the DOM —
    // this lets /#hash navigation and scrollToSection() find the target
    // even before the lazy content has loaded.
    <div id={id} ref={ref} style={{ minHeight: isVisible ? 'auto' : height }}>
      {isVisible ? children : null}
    </div>
  );
}
