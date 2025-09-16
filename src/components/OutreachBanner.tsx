import React from 'react';

const OutreachBanner: React.FC = () => {
  return (
    <section className="relative h-64 flex items-center justify-center bg-cover bg-center bg-fixed" 
             style={{backgroundImage: "url('/img/happy-pupils.jpg')"}}>
      <div className="absolute inset-0 bg-black/50" />
      <h2 className="relative z-10 font-heading text-3xl md:text-4xl font-bold text-white text-center px-4 drop-shadow-lg">
        COMMUNITY BASED OUTREACH
      </h2>
    </section>
  );
};

export default OutreachBanner;
