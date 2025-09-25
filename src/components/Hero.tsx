import React from 'react';
import Button3D from './Button3D';
import useParallax from '../hooks/useParallax';

const Hero: React.FC = () => {
  // Parallax background (disabled on small screens & reduced motion)
  const bgRef = useParallax({ speed: 0.45, disableBelow: 640 });

  return (
    <section className="relative h-[100svh] flex flex-col justify-center items-center overflow-hidden">
      {/* Parallax Background (no background-attachment:fixed to avoid jank) */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center parallax-layer pointer-events-none"
        style={{ backgroundImage: "url('/img/IMG_4149.webp')" }}
        aria-hidden="true"
      />
      
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
