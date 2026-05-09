'use client';

import Marquee from '@/components/Marquee';
import QuickInquiry from '@/components/QuickInquiry';

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
