'use client';

import dynamic from 'next/dynamic';

const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false });
const QuickInquiry = dynamic(() => import('@/components/QuickInquiry'), { ssr: false });

export default function PageMiddleSections() {
  return (
    <div className="bg-black border-y border-white/5 py-12">
      <Marquee
        items={[
          "Cinematic Commerce - Bard Boys",
          "Interactive Experiences - Flora Syndicate",
          "Live Waitlist System - Eggs 'N' Things",
          "Custom Framer Motion & WebGL",
        ]}
        speed={35}
        isPill={false}
      />
      <QuickInquiry />
    </div>
  );
}
