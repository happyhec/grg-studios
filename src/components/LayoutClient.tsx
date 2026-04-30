'use client';

import dynamic from 'next/dynamic';
import { LazyMotion } from 'framer-motion';

const loadFeatures = () => import('framer-motion').then(res => res.domAnimation);
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <CustomCursor />
      {children}
    </LazyMotion>
  );
}
