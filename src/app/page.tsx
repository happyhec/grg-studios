import AgencyHero from "@/components/AgencyHero";
import ElevatorNav from "@/components/ElevatorNav";
import FloatingCTA from "@/components/FloatingCTA";
import Marquee from "@/components/Marquee";
import QuickInquiry from "@/components/QuickInquiry";
import HomeClientSections from "@/components/HomeClientSections";

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

