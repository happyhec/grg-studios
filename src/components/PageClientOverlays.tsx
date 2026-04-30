'use client';

import dynamic from 'next/dynamic';

const ElevatorNav = dynamic(() => import('@/components/ElevatorNav'), { ssr: false });
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), { ssr: false });

export default function PageClientOverlays() {
  return (
    <>
      <ElevatorNav />
      <FloatingCTA />
    </>
  );
}
