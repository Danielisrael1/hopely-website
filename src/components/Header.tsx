import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="font-extrabold text-lg text-slate-800">HOPELY.org</div>
        <nav className="space-x-6 text-slate-700 font-semibold">
          <a href="#" className="hover:text-pink-500 transition-colors">What We Do</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Get Involved</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Projects</a>
          <a href="#" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">Donate</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
