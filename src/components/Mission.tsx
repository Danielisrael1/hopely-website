import React, { useEffect, useState } from 'react';
import { AppwriteService, type MissionSection, type MissionItem } from '../services/appwrite';

const Mission: React.FC = () => {
  const [missionSection, setMissionSection] = useState<MissionSection | null>(null);
  const [missionItems, setMissionItems] = useState<MissionItem[]>([]);

  // Fetch mission data from Appwrite
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const [sectionData, itemsData] = await Promise.all([
          AppwriteService.getMissionSection(),
          AppwriteService.getMissionItems()
        ]);
        setMissionSection(sectionData);
        setMissionItems(itemsData);
      } catch (error) {
        console.error('Failed to fetch mission data:', error);
      }
    };

    fetchMissionData();
  }, []);

  // Use CMS data or fallback
  const section = missionSection || {
    title: 'Join in our mission',
    missionImage: '/mission.jpg',
    ctaButtonText: 'Join Us',
    ctaButtonUrl: 'https://gofund.me/266a82aa',
  };

  const items = missionItems.length > 0 ? missionItems : [
    { text: 'Donate directly, whether regular or one-off', icon: '🎁', order: 1 },
    { text: 'Volunteer your time or skills', icon: '🤝', order: 2 },
    { text: 'Help us reach more children in need', icon: '❤️', order: 3 },
    { text: 'Share our mission with your network', icon: '📤', order: 4 },
  ];

  return (
    <section className="bg-slate-800 text-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 flex justify-center">
          <div className="w-80 h-80 hover:scale-105 transition-transform duration-500 group">
            <svg className="h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hopeImg" x="0" y="0" width="1" height="1">
                  <image 
                    x="0" 
                    y="0" 
                    width="100%" 
                    height="100%" 
                    preserveAspectRatio="xMidYMid slice" 
                    href={section.missionImage} 
                  />
                </pattern>
              </defs>
              <path 
                fill="url(#hopeImg)" 
                transform="translate(100 100)"
                className="transition-all duration-700 ease-in-out"
                d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z"
              >
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="
                    M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z;
                    
                    M54.8,-76.3C69.8,-66.2,79.2,-47.7,82.1,-28.1C85,-8.5,81.3,12.2,72.8,28.9C64.4,45.6,51.1,58.3,35.8,64.9C20.5,71.5,3.2,72,-12.3,67.8C-27.8,63.6,-41.5,54.7,-52.9,43.2C-64.3,31.7,-73.4,17.6,-75.8,2.4C-78.2,-12.8,-74,-29.1,-64.4,-40.8C-54.8,-52.5,-39.8,-59.6,-24.2,-69.8C-8.6,-80,7.6,-93.3,24.1,-91.2C40.6,-89.1,57.4,-71.6,54.8,-76.3Z;
                    
                    M48.3,-69.8C61.4,-58.7,70,-41.3,72.8,-22.9C75.6,-4.5,72.7,14.9,64.9,30.4C57.1,45.9,44.4,57.5,29.6,64.4C14.8,71.3,-2.1,73.5,-18.2,69.4C-34.3,65.3,-49.6,54.9,-58.6,40.7C-67.6,26.5,-70.3,8.5,-67.8,-8.2C-65.3,-24.9,-57.6,-40.3,-46.1,-51.6C-34.6,-62.9,-19.3,-70.1,-2.5,-66.6C14.3,-63.1,35.2,-80.9,48.3,-69.8Z;
                    
                    M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z
                  "
                />
              </path>
              
              {/* Hover glow effect */}
              <path 
                fill="none" 
                stroke="url(#glowGradient)" 
                strokeWidth="2"
                transform="translate(100 100)"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z"
              />
              
              <defs>
                <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#EB9594', stopOpacity: 0.8}} />
                  <stop offset="50%" style={{stopColor: '#ffffff', stopOpacity: 0.6}} />
                  <stop offset="100%" style={{stopColor: '#EB9594', stopOpacity: 0.8}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-hopely-pink font-heading">{section.title}</h2>
          <ul className="mb-6 space-y-4 text-lg">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <a 
            href={section.ctaButtonUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-hopely-pink text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-hopely-pink-dark hover:scale-105 transition-all duration-300 shadow-lg inline-block"
          >
            {section.ctaButtonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mission;
