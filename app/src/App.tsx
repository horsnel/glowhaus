import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import StepsSection from './sections/StepsSection';
import DemoSection from './sections/DemoSection';
import GallerySection from './sections/GallerySection';
import FeaturesSection from './sections/FeaturesSection';
import CommunitySection from './sections/CommunitySection';
import TestimonialSection from './sections/TestimonialSection';
import PricingSection from './sections/PricingSection';
import ProSection from './sections/ProSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            // If not in a pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <HeroSection />

        {/* Section 2: Steps - pin: false */}
        <div id="steps">
          <StepsSection />
        </div>

        {/* Section 3: Demo - pin: true */}
        <DemoSection />

        {/* Section 4: Gallery - pin: true */}
        <div id="styles">
          <GallerySection />
        </div>

        {/* Section 5: Features - pin: false */}
        <FeaturesSection />

        {/* Section 6: Community - pin: false */}
        <div id="community">
          <CommunitySection />
        </div>

        {/* Section 7: Testimonial - pin: true */}
        <TestimonialSection />

        {/* Section 8: Pricing - pin: false */}
        <div id="pricing">
          <PricingSection />
        </div>

        {/* Section 9: Pro - pin: true */}
        <ProSection />
      </main>
    </div>
  );
}

export default App;
