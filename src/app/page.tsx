import AgencyHero from "@/components/AgencyHero";
import ElevatorNav from "@/components/ElevatorNav";
import QuickCTA from "@/components/QuickCTA";
import PortfolioSection from "@/components/PortfolioSection";

// Shared Section Components
import AgencyProcess from "@/components/AgencyProcess";
import AgencyTestimonials from "@/components/AgencyTestimonials";
import AgencyPricing from "@/components/AgencyPricing";
import AgencyAbout from "@/components/AgencyAbout";
import FAQ from "@/components/FAQ";
import AgencyContact from "@/components/AgencyContact";
import Marquee from "@/components/Marquee";
import ServicesGrid from "@/components/ServicesGrid";
import QuickInquiry from "@/components/QuickInquiry";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main className="bg-black font-inter overflow-x-hidden relative">
      <ElevatorNav />
      <QuickCTA />
      <FloatingCTA />

      <div id="hero" className="relative h-screen md:h-[200vh]">
        <AgencyHero />
      </div>

      <div className="bg-black border-y border-white/5 py-12">
        <Marquee
          items={[
            "40% More Leads - ASR Entertainment",
            "Live Waitlist System - Eggs 'N' Things",
            "5 Locations Digitized",
            "Cinematic Commerce - Bard Boys Genetics",
            "Camarillo - Ventura County - CA",
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
