'use client';

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

export default function HomeClientSections() {
  return (
    <>
      <ServicesGrid />
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
    </>
  );
}
