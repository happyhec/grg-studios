import AgencyHero from "@/components/AgencyHero";
import dynamic from 'next/dynamic';

const ElevatorNav = dynamic(() => import('@/components/ElevatorNav'), { ssr: false });
const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), { ssr: false });
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false });
const QuickInquiry = dynamic(() => import('@/components/QuickInquiry'), { ssr: false });
const HomeClientSections = dynamic(() => import('@/components/HomeClientSections'), { ssr: false });

export default function Home() {
  return (
    <main className="bg-black font-inter relative">
      <ElevatorNav />
      <FloatingCTA />

      <AgencyHero />

      <div className="bg-black border-y border-white/5 py-12">
        <Marquee
          items={[
            "Cinematic Commerce - Bard Boys",
            "Interactive Experiences - Flora Syndicate",
            "Live Waitlist System - Eggs 'N' Things",
            "Full-Stack Development - Ventura County",
            "Custom Framer Motion & WebGL",
          ]}
          speed={35}
          isPill={false}
        />
        <QuickInquiry />
      </div>

      <HomeClientSections />
    </main>
  );
}


