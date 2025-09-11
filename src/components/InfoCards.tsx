import React from 'react';

const InfoCards: React.FC = () => {
  const cards = [
    {
      title: "Non-Governmental Organization",
      description: "Hopely supports underprivileged children across Uganda, enabling them for a better future through education, health, and community projects."
    },
    {
      title: "Complete Projects",
      description: "We provide updates on completed and ongoing projects, ensuring transparency and impact."
    },
    {
      title: "HopeKid",
      description: "We offer sponsorship programs for children in need, giving hope and opportunity."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-2xl font-bold mb-4 text-slate-800">{card.title}</div>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
