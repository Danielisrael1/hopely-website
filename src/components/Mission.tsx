import React from 'react';

const Mission: React.FC = () => {
  return (
    <section className="bg-slate-800 text-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 flex justify-center">
          <div className="w-80 h-80 hover:scale-105 transition-transform duration-300">
            <svg className="h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hopeImg" x="0" y="0" width="1" height="1">
                  <image 
                    x="0" 
                    y="0" 
                    width="100%" 
                    height="100%" 
                    preserveAspectRatio="xMidYMid slice" 
                    href="/src/assets/img/hope.jpg" 
                  />
                </pattern>
              </defs>
              <path 
                fill="url(#hopeImg)" 
                d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z" 
                transform="translate(100 100)" 
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-hopely-pink">Join in our mission</h2>
          <ul className="list-disc ml-6 mb-6 space-y-3 text-lg">
            <li>Donate directly, whether regular or one-off</li>
            <li>Volunteer your time or skills</li>
            <li>Help us reach more children in need</li>
            <li>Share our mission with your network</li>
          </ul>
          <button className="bg-hopely-pink text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-hopely-pink-dark hover:scale-105 transition-all duration-300 shadow-lg">
            Join Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mission;
