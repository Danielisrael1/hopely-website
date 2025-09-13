import React from 'react';

const DonationSteps: React.FC = () => {
  const steps = [
    {
      number: 1,
      description: "First, we collect the money on special bank accounts accessed by only a few trusted people. The expenses are being monthly reported by email to those who donated."
    },
    {
      number: 2,
      description: "We have trustworthy partners across the world We cooperate with food, textile, educational and medical industries."
    },
    {
      number: 3,
      description: "Finally, we report the completed projects weekly with visual and documental proofs. We care for every penny to serve its goal."
    }
  ];

  return (
    <section className="py-16 bg-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-16">
        <h2 className="text-3xl font-bold mb-16 text-center font-heading">How we spend your donation</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-16 w-0.5 bg-hopely-pink hidden md:block" style={{height: 'calc(100% - 8rem)'}}></div>
          
          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="relative flex items-start">
                {/* Step indicator circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 bg-hopely-pink rounded-full flex items-center justify-center text-white text-xs shadow-lg">
                    Step {step.number}
                  </div>
                  {/* White dot in center of circle */}
                  {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div> */}
                </div>
                
                {/* Content */}
                <div className="ml-4 pt-1 flex-1">
                  <p className="text-lg leading-relaxed text-white/90">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSteps;
