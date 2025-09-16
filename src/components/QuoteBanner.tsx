import React from 'react';

const QuoteBanner: React.FC = () => {
  return (
    <section className="relative h-48 flex items-center justify-center bg-cover bg-center bg-fixed" 
             style={{backgroundImage: "url('/src/assets/img/pupils2.jpg')"}}>
      <div className="absolute inset-0 bg-black/50" />
      <h2 className="relative z-10 font-heading text-xl md:text-3xl font-bold text-white text-center px-4 max-w-4xl italic drop-shadow-lg">
        "It's not how much we give but how much love we put into giving."
      </h2>
    </section>
  );
};

export default QuoteBanner;
