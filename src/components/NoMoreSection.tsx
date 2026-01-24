import React, { useState, useEffect } from 'react';
import { AppwriteService, type NoMoreItem } from '../services/appwrite';

const NoMoreSection: React.FC = () => {
  const [items, setItems] = useState<NoMoreItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await AppwriteService.getNoMoreItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch no more items:', error);
        // Fallback data
        setItems([
          { category: "hunger", description: "Aid projects are empowering the vulnerable, ensuring no child goes hungry. Your donation helps us provide food and nutrition.", order: 1 },
          { category: "illiteracy", description: "Education for all. Regardless of gender or background, we support children to stay in school and succeed.", order: 2 },
          { category: "disease", description: "Healthcare prevents disease and enables children to thrive. We provide access to medical care and health education.", order: 3 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-24 mx-auto"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-16 text-center">
        <h2 className="text-3xl font-cursive font-bold mb-12 text-slate-800">Hopely Uganda</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="group hover:scale-105 transition-transform duration-100">
              <div className="text-4xl font-extrabold text-hopely-pink mb-3 group-hover:text-hopely-pink-dark transition-colors font-heading">
                No more
              </div>
              <div className="font-bold mb-4 text-xl text-slate-800 font-heading">{item.category}</div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{item.description}</p>
              <a 
                href="https://gofund.me/266a82aa" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-hopely-pink font-semibold hover:text-hopely-pink-dark hover:underline transition-colors"
              >
                Donate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoMoreSection;
