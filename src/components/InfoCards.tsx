import React, { useEffect, useState } from 'react';
import { AppwriteService } from '../services/appwrite';

interface InfoCard {
  title: string;
  description: string;
  backgroundImage: string;
  iconImage: string;
  order: number;
}

const InfoCards: React.FC = () => {
  const [cards, setCards] = useState<InfoCard[]>([
    {
      title: "Your Donation",
      description: "We are hoping to have people across the world to help us in our mission to make children have a better future.",
      backgroundImage: "/img/coin-donation.jpg",
      iconImage: "/icons/infocards/heart.png",
      order: 1
    },
    {
      title: "Complete Projects",
      description: "We provide updates on completed and ongoing projects, ensuring transparency and impact in our community work.",
      backgroundImage: "/img/IMG_4178.png",
      iconImage: "/icons/infocards/project.png",
      order: 2
    },
    {
      title: "Hopekid",
      description: "We also have a sponsorship programme where you can sponsor a child and help them get access to education and basic needs.",
      backgroundImage: "/img/IMG_4149.png",
      iconImage: "/icons/infocards/baby.png",
      order: 3
    }
  ]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await AppwriteService.getInfoCards();
        if (data && data.length > 0) {
          setCards(data.sort((a, b) => a.order - b.order));
        }
      } catch (error) {
        console.error('Error fetching info cards:', error);
        // Keep default cards on error
      }
    };
    fetchCards();
  }, []);

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
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-slate-800/95 backdrop-blur-sm rounded-full p-4 group-hover:bg-slate-800 transition-colors duration-300">
                    <img 
                      src={card.iconImage} 
                      alt={card.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3 drop-shadow-lg font-heading">
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
