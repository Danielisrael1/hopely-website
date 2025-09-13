import React from 'react';

const InfoCards: React.FC = () => {
  const cards = [
    {
      title: "Your Donation",
      description: "We are hoping to have people across the world to help us in our mission to make children have a better future.",
      backgroundImage: "/src/assets/img/hope.jpg",
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    },
    {
      title: "Complete Projects",
      description: "We provide updates on completed and ongoing projects, ensuring transparency and impact in our community work.",
      backgroundImage: "/src/assets/img/IMG_4178.png",
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      )
    },
    {
      title: "Hopekid",
      description: "We also have a sponsorship programme where you can sponsor a child and help them get access to education and basic needs.",
      backgroundImage: "/src/assets/img/IMG_4149.png",
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{backgroundImage: `url('${card.backgroundImage}')`}}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-hopely-pink/50 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 text-white">
                
                
                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 drop-shadow-lg">
                    {card.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed drop-shadow-md">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
