import React, { useEffect, useState } from 'react';
import Button3D from './Button3D';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/img/IMG_4149.png')",
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-cursive font-bold text-white drop-shadow-2xl mb-6 animate-fade-in">
          Hopely Uganda
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-lg">
          Empowering communities, transforming lives, creating hope for children in Uganda
        </p>
        <Button3D text="DONATE " size="large" variant="pink" className="px-24 text-lg shadow-xl" />
      </div>
      
      {/* Scroll Indicator */}
    </section>
  );
};

export default Hero;
