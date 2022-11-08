import { useRef } from 'react';

import Seo from '@/components/common/Seo';
import Feature from '@/components/Home/Feature';
import Hero from '@/components/Home/Hero';

export default function HomePage() {
  const featureRef = useRef<HTMLDivElement>(null);

  const onFeatureClick = () => {
    featureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Seo />
      <main>
        <Hero onFeatureClick={onFeatureClick} />
        <span ref={featureRef}>
          <Feature />
        </span>
      </main>
    </>
  );
}
