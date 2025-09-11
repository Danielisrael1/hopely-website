import React from 'react';

const DonationSteps: React.FC = () => {
  const steps = [
    {
      number: 1,
      description: "Funds are collected and allocated to the areas of most vital need. The process is transparent and regularly reported to the donors/supporters."
    },
    {
      number: 2,
      description: "We implement projects in food, education, and health, with all associated costs tracked and reported."
    },
    {
      number: 3,
      description: "Every penny is spent for its goal."
    }
  ];

  return (
    <section className="py-16 bg-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <h2 className="text-3xl font-bold mb-12 text-center">How we spend your donation</h2>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 items-start group">
              <span className="font-bold text-pink-400 text-xl bg-pink-400/20 px-3 py-2 rounded-full group-hover:bg-pink-400/30 transition-colors">
                Step {step.number}
              </span>
              <p className="text-lg leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationSteps;
