import React, { useState, useEffect } from 'react';
import { AppwriteService, type HopeKid } from '../services/appwrite';

const SPONSOR_URL = 'https://gofund.me/266a82aa';

const SponsorChild: React.FC = () => {
  const [children, setChildren] = useState<(HopeKid & { $id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Kids are managed in the admin panel (HopeKids tab)
  useEffect(() => {
    AppwriteService.getHopeKids()
      .then(setChildren)
      .finally(() => setLoading(false));
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || children.length < 2) return;

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

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-16 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-800 font-heading">Sponsor a child</h2>
          <div className="max-w-4xl mx-auto h-96 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </section>
    );
  }

  // Nothing to show until a kid is added in the admin panel
  if (children.length === 0) return null;

  const hasMany = children.length > 1;

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
          {hasMany && (
            <>
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
            </>
          )}

          {/* Carousel Content */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children.map((child, index) => (
                <div key={child.$id ?? index} className="w-full flex-shrink-0 p-8 md:p-12">
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
                      {child.additionalInfo && (
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                          {child.additionalInfo}
                        </p>
                      )}

                      {/* Learn More Button */}
                      <div className="flex gap-4">
                        <a
                          href={SPONSOR_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-hopely-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-hopely-pink-dark transition-colors shadow-lg inline-block"
                        >
                          Sponsor Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {hasMany && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default SponsorChild;
