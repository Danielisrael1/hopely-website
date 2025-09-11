import React from 'react';

const Mission: React.FC = () => {
  return (
    <section className="bg-slate-800 text-white py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 flex justify-center">
          <img 
            src="/src/assets/img/842CA8D4-9F5D-4193-B00D-1A828073D942.PNG" 
            alt="Mission" 
            className="rounded-lg w-80 h-80 object-cover shadow-xl hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-pink-400">Join in our mission</h2>
          <ul className="list-disc ml-6 mb-6 space-y-3 text-lg">
            <li>Donate directly, whether regular or one-off</li>
            <li>Volunteer your time or skills</li>
            <li>Help us reach more children in need</li>
            <li>Share our mission with your network</li>
          </ul>
          <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-pink-600 hover:scale-105 transition-all duration-300 shadow-lg">
            Join Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mission;
