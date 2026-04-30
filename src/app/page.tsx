import AgencyHero from "@/components/AgencyHero";
import ElevatorNav from "@/components/ElevatorNav";
import FloatingCTA from "@/components/FloatingCTA";
import Marquee from "@/components/Marquee";
import QuickInquiry from "@/components/QuickInquiry";
import dynamic from 'next/dynamic';

const ServicesGrid = dynamic(() => import('@/components/ServicesGrid'), { ssr: false });
const PortfolioSection = dynamic(() => import('@/components/PortfolioSection'), { ssr: false });
const MotionLabBanner = dynamic(() => import('@/components/MotionLabBanner'), { ssr: false });
const AgencyProcess = dynamic(() => import('@/components/AgencyProcess'), { ssr: false });
const AgencyTestimonials = dynamic(() => import('@/components/AgencyTestimonials'), { ssr: false });
const AgencyPricing = dynamic(() => import('@/components/AgencyPricing'), { ssr: false });
const AgencyAbout = dynamic(() => import('@/components/AgencyAbout'), { ssr: false });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const AgencyContact = dynamic(() => import('@/components/AgencyContact'), { ssr: false });

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

      <div id="services" className="bg-black py-20 px-6">
        <ServicesGrid />
      </div>

      <PortfolioSection />
      <MotionLabBanner />

      <div id="process">
        <AgencyProcess />
      </div>

      <div id="testimonials" className="bg-black py-20 border-y border-white/5">
        <AgencyTestimonials />
      </div>

      <div id="pricing">
        <AgencyPricing />
      </div>

      <div id="about">
        <AgencyAbout />
      </div>

      <div id="faq">
        <FAQ />
      </div>

      <div id="contact">
        <AgencyContact />
      </div>
    </main>
  );
}
