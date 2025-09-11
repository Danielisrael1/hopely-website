import React from 'react';

const SponsorChild: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-12 text-slate-800">Sponsor a child</h2>
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img 
              src="/src/assets/img/jose.jpg" 
              alt="Sponsored Child" 
              className="w-40 h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
            />
            <div className="text-left flex-1">
              <div className="font-bold text-xl mb-3 text-slate-800">Kimuli Joseph (12)</div>
              <p className="text-gray-700 leading-relaxed mb-4">
                He has been sponsored through a monthly building program. Your support can help more children like Joseph access education, food, and healthcare.
              </p>
              <a 
                href="#" 
                className="inline-block bg-hopely-pink text-white px-6 py-2 rounded-lg font-semibold hover:bg-hopely-pink-dark transition-colors"
              >
                Sponsor Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorChild;
