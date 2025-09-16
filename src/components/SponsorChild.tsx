import React, { useState, useEffect } from 'react';

const SponsorChild: React.FC = () => {
  const children = [
    {
      id: 1,
      name: "Kimuli Joseph",
      age: 16,
      image: "/src/assets/img/jose.jpg",
      description: "Joseph, 16 years is the eldest among his 3 siblings. abandon by the father he had challenges going to school since it was his mother carrying the family alone taking care.",
      additionalInfo: "with your sponsorship, he can go to a better school, acquire better education and break the poverty cycle in the family hence, brighter future Become a sponsor parent to Joseph."
    },
    {
      id: 2,
      name: "Nakato Sarah",
      age: 12,
      image: "/src/assets/img/alisha.jpg",
      description: "Sarah is a bright young girl who dreams of becoming a doctor. She lost her parents in an accident and now lives with her grandmother.",
      additionalInfo: "Your sponsorship will help Sarah continue her education and provide her with the basic necessities she needs to thrive and achieve her dreams."
    },
    {
      id: 3,
      name: "Ssaku Parvin Darious |S4",
      age: 14,
      image: "/src/assets/img/pervin.jpg",
      description: "Parvin ,17 years at his young age, he couldn’t make it to school and was stuckUsed to vendor clothes to earn a living with his mother. Open not lost. He continued in this line of business, but it couldn’t generate enough income to take him to school.With your generous sponsorship, Parvin can go back to school so that he achieves his goals and dreams in lif.",
      additionalInfo: "Become a sponsor parent to Parvin."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, children.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-12 text-slate-800 font-heading">Sponsor a child</h2>
        
        <div 
          className="relative max-w-4xl mx-auto bg-gray-50 rounded-xl overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-hopely-pink text-white rounded-full flex items-center justify-center hover:bg-hopely-pink-dark transition-colors shadow-lg"
            aria-label="Previous child"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-hopely-pink text-white rounded-full flex items-center justify-center hover:bg-hopely-pink-dark transition-colors shadow-lg"
            aria-label="Next child"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Content */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children.map((child) => (
                <div key={child.id} className="w-full flex-shrink-0 p-8 md:p-12">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Child Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={child.image} 
                        alt={child.name} 
                        className="w-64 h-80 object-cover rounded-lg shadow-md" 
                      />
                    </div>
                    
                    {/* Child Information */}
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-2xl mb-3 text-slate-800 font-heading">
                        {child.name} ({child.age})
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {child.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                        {child.additionalInfo}
                      </p>
                      
                      {/* Learn More Button */}
                      <div className="flex gap-4">
                        <button className="bg-hopely-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-hopely-pink-dark transition-colors shadow-lg">
                          Sponsor Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {children.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-hopely-pink' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorChild;
