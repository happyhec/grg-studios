'use client';

import dynamic from 'next/dynamic';
import LazySection from './LazySection';

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
      <LazySection height="600px">
        <ServicesGrid />
      </LazySection>

      <LazySection height="800px">
        <PortfolioSection />
      </LazySection>

      <LazySection height="400px">
        <MotionLabBanner />
      </LazySection>

      <LazySection height="600px">
        <div id="process">
          <AgencyProcess />
        </div>
      </LazySection>

      <LazySection height="400px">
        <div id="testimonials" className="bg-black py-20 border-y border-white/5">
          <AgencyTestimonials />
        </div>
      </LazySection>

      <LazySection height="600px">
        <div id="pricing">
          <AgencyPricing />
        </div>
      </LazySection>

      <LazySection height="600px">
        <div id="about">
          <AgencyAbout />
        </div>
      </LazySection>

      <LazySection height="400px">
        <div id="faq">
          <FAQ />
        </div>
      </LazySection>

      <LazySection height="600px">
        <div id="contact">
          <AgencyContact />
        </div>
      </LazySection>
    </>
  );
}

