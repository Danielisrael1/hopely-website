import React, { useEffect, useRef, useState } from 'react';
import Button3D from './Button3D';
import useParallax from '../hooks/useParallax';

const Hero: React.FC = () => {
  // Image load state for blur-up
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  // Plain (non-3D) parallax background (disabled on small screens & reduced motion)
  const wrapperRef = useParallax({ speed: 0.25, disableBelow: 640, plain: true });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) setLoaded(true);
  }, []);

  return (
    <section className="relative h-[100svh] flex flex-col justify-center items-center overflow-hidden">
      {/* Parallax Background (plain parallax + blur loading) */}
      <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          ref={imgRef}
            src="/img/IMG_4149.webp"
          alt=""
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${loaded ? 'blur-0 scale-100 opacity-100' : 'blur-xl scale-105 opacity-80'}`}
          onLoad={() => setLoaded(true)}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white drop-shadow-2xl mb-6 animate-fade-in">
          Hopely Uganda
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-lg">
          Empowering communities, transforming lives, creating hope for children in Uganda
        </p>
        <Button3D text="DONATE " size="large" variant="pink" className="px-24 text-lg shadow-xl" href="https://gofund.me/266a82aa" />
      </div>
      
      {/* Scroll Indicator */}
    </section>
  );
};

export default Hero;
