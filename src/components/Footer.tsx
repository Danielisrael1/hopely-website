import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="font-cursive font-bold text-2xl mb-6 md:mb-0 text-hopely-pink">Hopely.org</div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm mb-6 md:mb-0">
            <a href="#" className="hover:text-hopely-pink transition-colors">What We Do</a>
            <a href="#" className="hover:text-hopely-pink transition-colors">Get Involved</a>
            <a href="#" className="hover:text-hopely-pink transition-colors">Projects</a>
            <a href="https://gofund.me/266a82aa" target="_blank" rel="noopener noreferrer" className="hover:text-hopely-pink transition-colors">Donate</a>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              aria-label="Instagram"
              className="hover:text-hopely-pink transition-colors hover:scale-110 transform duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </a>
            <a 
              href="#" 
              aria-label="Facebook"
              className="hover:text-hopely-pink transition-colors hover:scale-110 transform duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12" />
              </svg>
            </a>
            <a 
              href="#" 
              aria-label="Twitter"
              className="hover:text-hopely-pink transition-colors hover:scale-110 transform duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-6">
          <div className="text-xs text-center text-gray-400">
            © Hopely.org {new Date().getFullYear()} &nbsp; | &nbsp; Non-profit organization &nbsp; | &nbsp; All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
