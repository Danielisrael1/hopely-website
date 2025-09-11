import React from 'react';

const NGOSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Title Section */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
              Non-Governmental
              <br />
              <span className="text-hopely-pink">Organization</span>
            </h2>
          </div>
          
          {/* Content Section */}
          <div className="lg:w-2/3 relative">
            {/* Red accent line */}
            <div className="absolute left-0 top-0 w-1 h-full bg-hopely-pink hidden lg:block"></div>
            
            {/* Text content */}
            <div className="lg:pl-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                Hopely supports underprivileged children across Uganda, giving them hope for a better future 
                by providing them with access to education, food, and clothing. Our goal is to save as many 
                lives as possible and ensure a bright future for those who are below the breadline. We envision 
                a Uganda without hunger, illiteracy, or disease, where every child can reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NGOSection;
