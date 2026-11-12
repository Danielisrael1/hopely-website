import React, { useEffect, useRef, useState } from 'react';
import Button3D from './Button3D';
import useParallax from '../hooks/useParallax';
import { AppwriteService, type HeroContent } from '../services/appwrite';

const FALLBACK_HERO: HeroContent = {
  title: 'Hopely Uganda',
  subtitle: 'Empowering communities, transforming lives, creating hope for children in Uganda',
  buttonText: 'DONATE',
  buttonUrl: 'https://gofund.me/266a82aa',
  backgroundImage: '/img/IMG_4149.webp',
};

const Hero: React.FC = () => {
  // Image load state for blur-up
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  // Plain (non-3D) parallax background (disabled on small screens & reduced motion)
  const wrapperRef = useParallax({ speed: 0.25, disableBelow: 640, plain: true });

  // State for hero content from CMS
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);

  // Fetch hero content from Appwrite
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const content = await AppwriteService.getHeroContent();
        setHeroContent(content);
      } catch (error) {
        console.error('Failed to fetch hero content:', error);
        setHeroContent(FALLBACK_HERO);
      }
    };

    fetchHeroContent();
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) setLoaded(true);
  }, [heroContent]);

  // Use CMS content or fallback
  const content = heroContent || FALLBACK_HERO;

  return (
    <section className="relative hero-screen overflow-hidden bg-slate-800">
      {/* Parallax Background (plain parallax + blur loading) */}
      <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Wait for the CMS answer so the fallback photo isn't downloaded and then replaced */}
        {heroContent && (
          <img
            ref={imgRef}
            src={content.backgroundImage}
            alt=""
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${loaded ? 'blur-0 scale-100 opacity-100' : 'blur-xl scale-105 opacity-80'}`}
            onLoad={() => setLoaded(true)}
            decoding="async"
            fetchPriority="high"
          />
        )}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content: centred in the part of the screen visible on load, clear of the fixed header */}
      <div className="relative z-10 hero-content flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white drop-shadow-2xl mb-6 animate-fade-in">
          {content.title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-lg">
          {content.subtitle}
        </p>
        <Button3D text={content.buttonText} size="large" variant="pink" className="px-24 text-lg shadow-xl" href={content.buttonUrl} />
      </div>

      {/* Scroll Indicator */}
    </section>
  );
};

export default Hero;
