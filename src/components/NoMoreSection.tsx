import React from 'react';

const NoMoreSection: React.FC = () => {
  const items = [
    {
      category: "hunger",
      description: "Aid projects are empowering the vulnerable, ensuring no child goes hungry. Your donation helps us provide food and nutrition."
    },
    {
      category: "illiteracy",
      description: "Education for all. Regardless of gender or background, we support children to stay in school and succeed."
    },
    {
      category: "disease",
      description: "Healthcare prevents disease and enables children to thrive. We provide access to medical care and health education."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
        <h2 className="text-3xl font-cursive font-bold mb-12 text-slate-800">Hopely.org</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="group hover:scale-105 transition-transform duration-100">
              <div className="text-4xl font-extrabold text-hopely-pink mb-3 group-hover:text-hopely-pink-dark transition-colors">
                No more
              </div>
              <div className="font-bold mb-4 text-xl text-slate-800">{item.category}</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{item.description}</p>
              {/* <a 
                href="#" 
                className="inline-block text-hopely-pink font-semibold hover:text-hopely-pink-dark hover:underline transition-colors"
              >
                Donate
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoMoreSection;
