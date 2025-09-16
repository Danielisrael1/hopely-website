import React, { useState, useEffect, useRef } from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Felicity Byaruhanga",
      role: "FOUNDER",
      image: "/img/pervin.jpg",
      description: "Felicity is passionate about empowering communities and has led Hopely.org since its inception.",
      email: "felicity@hopely.org"
    },
    {
      id: 2,
      name: "Daniel Israel",
      role: "CO-FOUNDER",
      image: "/img/alisha.jpg",
      description: "Daniel is dedicated to making a difference and manages outreach and partnerships.",
      email: "daniel@hopely.org"
    },
    {
      id: 3,
      name: "Sarah Nakato",
      role: "PROJECT MANAGER",
      image: "/img/hope.jpg",
      description: "Sarah coordinates our field operations and ensures projects are completed successfully.",
      email: "sarah@hopely.org"
    },
    {
      id: 4,
      name: "Moses Kiprotich",
      role: "COMMUNITY OUTREACH",
      image: "/img/jose.jpg",
      description: "Moses builds relationships with local communities and identifies children in need of support.",
      email: "moses@hopely.org"
    },
    {
      id: 5,
      name: "Grace Nalubega",
      role: "EDUCATION COORDINATOR",
      image: "/img/IMG_4149.png",
      description: "Grace oversees our educational programs and ensures children receive quality learning opportunities.",
      email: "grace@hopely.org"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, teamMembers.length]);

  // Calculate how many cards to show per view
  const getCardsPerView = () => {
    if (isMobile) return 1;
    return 3;
  };

  // Calculate the maximum index based on cards per view
  const getMaxIndex = () => {
    return Math.max(0, teamMembers.length - getCardsPerView());
  };

  const goToSlide = (index: number) => {
    const maxIndex = getMaxIndex();
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? getMaxIndex() : prevIndex - 1
    );
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
                    <div className="text-hopely-pink text-xs md:text-sm font-semibold mb-4 tracking-wider uppercase">
                      {member.role}
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center flex-grow mb-4">
                      {member.description}
                    </p>
                    
                
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(teamMembers.length / getCardsPerView()) }).map((_, index) => (
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
