import AgencyHero from "@/components/AgencyHero";
import ElevatorNav from "@/components/ElevatorNav";
import FloatingCTA from "@/components/FloatingCTA";
import Marquee from "@/components/Marquee";
import ServicesGrid from "@/components/ServicesGrid";
import QuickInquiry from "@/components/QuickInquiry";
import dynamic from 'next/dynamic';

const PortfolioSection = dynamic(() => import('@/components/PortfolioSection'));
const MotionLabBanner = dynamic(() => import('@/components/MotionLabBanner'));
const AgencyProcess = dynamic(() => import('@/components/AgencyProcess'));
const AgencyTestimonials = dynamic(() => import('@/components/AgencyTestimonials'));
const AgencyPricing = dynamic(() => import('@/components/AgencyPricing'));
const AgencyAbout = dynamic(() => import('@/components/AgencyAbout'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const AgencyContact = dynamic(() => import('@/components/AgencyContact'));

export default function Home() {
  return (
    <main className="bg-black font-inter relative">
      <ElevatorNav />
      <FloatingCTA />

      <div id="hero" className="relative h-screen md:h-[200vh]">
        <AgencyHero />
      </div>

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
