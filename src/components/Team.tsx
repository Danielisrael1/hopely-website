import React, { useState, useEffect, useRef, useCallback } from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      id: 3,
      name: "Byaruhanga Felicity",
      role: "TEAM LEAD CANADA",
      location: "Canada",
      image: "/img/teams/team3.jpg",
      description: "Felicity leads our Canadian operations and coordinates international partnerships for Hopely.org.",
      email: "felicity@hopely.org"
    },
    {
      id: 4,
      name: "Lukwago Daniel",
      role: "TEAM LEAD UGANDA",
      location: "Uganda",
      image: "/img/teams/team4.jpg",
      description: "Daniel leads our Uganda team and manages community outreach and local partnerships on the ground.",
      email: "daniel@hopely.org"
    },
    {
      id: 5,
      name: "Brooke Ramos Dickson",
      role: "COMMUNICATIONS DIRECTOR",
      location: "Canada",
      image: "/img/teams/team5.jpg",
      description: "Brooke manages our communications, storytelling, and digital outreach to spread awareness of our mission.",
      email: "brooke@hopely.org"
    },
    {
      id: 1,
      name: "Jjunju Micheal",
      role: "FIELD OPERATIONS DIRECTOR",
      location: "Uganda",
      image: "/img/teams/team1.jpg",
      description: "Micheal oversees all field operations in Uganda, ensuring our programs reach the communities that need them most.",
      email: "micheal@hopely.org"
    },
    {
      id: 2,
      name: "Kisakye Dorah",
      role: "FINANCE DIRECTOR",
      location: "Uganda",
      image: "/img/teams/team2.jpg",
      description: "Dorah manages our finances with transparency and ensures every donation is used effectively for maximum impact.",
      email: "dorah@hopely.org"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate how many cards to show per view
  const getCardsPerView = useCallback(() => {
    if (isMobile) return 1;
    return 3;
  }, [isMobile]);

  // Calculate the maximum index based on cards per view
  const getMaxIndex = useCallback(() => {
    return Math.max(0, teamMembers.length - getCardsPerView());
  }, [teamMembers.length, getCardsPerView]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality (desktop: stop at maxIndex to avoid empty gap)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      const maxIndex = getMaxIndex();
      setCurrentIndex(prevIndex => {
        // On mobile (cardsPerView = 1) maxIndex === length-1 so this still advances each card.
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, teamMembers.length, isMobile, getMaxIndex]);

  // Clamp index when layout changes (e.g., resize between mobile/desktop)
  useEffect(() => {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [isMobile, teamMembers.length, currentIndex, getMaxIndex]);


  const goToSlide = (index: number) => {
    const maxIndex = getMaxIndex();
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? getMaxIndex() : prev - 1));
  };

  const goToNext = () => {
    const maxIndex = getMaxIndex();
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }
  };

  // Calculate transform based on mobile/desktop
  const getTransform = () => {
    const cardsPerView = getCardsPerView();
    const percentage = (currentIndex * 100) / cardsPerView;
    return `translateX(-${percentage}%)`;
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
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-hopely-pink text-white rounded-full items-center justify-center hover:bg-hopely-pink-dark transition-colors shadow-lg hidden sm:flex"
            aria-label="Previous team member"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-hopely-pink text-white rounded-full items-center justify-center hover:bg-hopely-pink-dark transition-colors shadow-lg hidden sm:flex"
            aria-label="Next team member"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-0 sm:mx-8 p-4 rounded-xl">
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: getTransform() }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-2 sm:px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-full flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 mx-2 sm:mx-0">
                    <div className="relative mb-6">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full shadow-md" 
                      />
                     
                    </div>
                    
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-slate-800 font-heading text-center">
                      {member.name}
                    </h3>
                    <div className="text-hopely-pink text-xs md:text-sm font-semibold mb-2 tracking-wider uppercase">
                      {member.role}
                    </div>
                    <div className="text-gray-500 text-xs md:text-sm font-medium mb-4 flex items-center justify-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {member.location}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center flex-grow mb-4">
                      {member.description}
                    </p>
                    
                    {/* Contact Button */}
                    {/* <button className="text-hopely-pink hover:text-hopely-pink-dark font-semibold text-sm transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: getMaxIndex() + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === Math.floor(currentIndex / getCardsPerView())
                    ? 'bg-hopely-pink' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe indicator */}
          <div className="flex sm:hidden justify-center mt-4 text-gray-500 text-xs">
            <span>← Swipe to see more team members →</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
