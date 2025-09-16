import React, { useState, useEffect } from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Felicity Byaruhanga",
      role: "FOUNDER",
      image: "/src/assets/img/pervin.jpg",
      description: "Felicity is passionate about empowering communities and has led Hopely.org since its inception.",
      email: "felicity@hopely.org"
    },
    {
      id: 2,
      name: "Daniel Israel",
      role: "CO-FOUNDER",
      image: "/src/assets/img/alisha.jpg",
      description: "Daniel is dedicated to making a difference and manages outreach and partnerships.",
      email: "daniel@hopely.org"
    },
    {
      id: 3,
      name: "Sarah Nakato",
      role: "PROJECT MANAGER",
      image: "/src/assets/img/hope.jpg",
      description: "Sarah coordinates our field operations and ensures projects are completed successfully.",
      email: "sarah@hopely.org"
    },
    {
      id: 4,
      name: "Moses Kiprotich",
      role: "COMMUNITY OUTREACH",
      image: "/src/assets/img/jose.jpg",
      description: "Moses builds relationships with local communities and identifies children in need of support.",
      email: "moses@hopely.org"
    },
    {
      id: 5,
      name: "Grace Nalubega",
      role: "EDUCATION COORDINATOR",
      image: "/src/assets/img/IMG_4149.png",
      description: "Grace oversees our educational programs and ensures children receive quality learning opportunities.",
      email: "grace@hopely.org"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, teamMembers.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-12 text-slate-800 font-heading">Meet our awesome team</h2>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-hopely-pink text-white rounded-full flex items-center justify-center hover:bg-hopely-pink-dark transition-colors shadow-lg"
            aria-label="Previous team member"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-hopely-pink text-white rounded-full flex items-center justify-center hover:bg-hopely-pink-dark transition-colors shadow-lg"
            aria-label="Next team member"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-8">
            <div 
              className="flex transition-transform p-4 duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {/* Duplicate cards for infinite effect */}
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div 
                  key={`${member.id}-${index}`}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-lg p-6 h-full flex flex-col items-center hover:shadow-lg hover:scale-105 transition-all duration-200 border border-gray-100">
                    <div className="relative mb-6">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-32 h-32 object-cover rounded-full shadow-md" 
                      />
                      
                    </div>
                    
                    <h3 className="font-bold text-xl mb-2 text-slate-800 font-heading text-center">
                      {member.name}
                    </h3>
                    <div className="text-hopely-pink text-sm font-semibold mb-4 tracking-wider uppercase">
                      {member.role}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed text-center flex-grow mb-4">
                      {member.description}
                    </p>
                    
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-hopely-pink' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
