import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button3D from './Button3D';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth scroll function for sections on the home page
  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Use setTimeout to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  // Navigate to projects page
  const navigateToProjects = () => {
    navigate('/projects');
    setIsMenuOpen(false); // Close mobile menu if open
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or on link
  const closeMenu = () => setIsMenuOpen(false);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-800/95 backdrop-blur-md shadow-lg' : 'bg-transparent backdrop-blur-xs shadow-sm'
      }`}>
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          
          <button 
            onClick={() => navigate('/')}
            className="font-cursive flex items-center font-bold text-xl sm:text-2xl text-white z-50 hover:text-hopely-pink transition-colors duration-200"
          >
            <img src="/logo.png" alt="Hopely Uganda Logo" className="h-10 w-10 object-contain mr-2 cursor-pointer" onClick={() => navigate('/')} />
            Hopely Uganda
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => scrollToSection('what-we-do')}
              className="text-white text-sm font-medium hover:text-hopely-pink transition-colors duration-200 cursor-pointer"
            >
              What We Do
            </button>
            <button 
              onClick={() => scrollToSection('get-involved')}
              className="text-white text-sm font-medium hover:text-hopely-pink transition-colors duration-200 cursor-pointer"
            >
              Get Involved
            </button>
            <button 
              onClick={navigateToProjects}
              className="text-white text-sm font-medium hover:text-hopely-pink transition-colors duration-200 cursor-pointer"
            >
              Projects
            </button>
            <Button3D text="Donate" size="medium" variant="pink" href="https://gofund.me/266a82aa" />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 focus:bg-white/10 active:bg-white-100 transition-colors duration-200 z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'
              }`} />
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'mb-1'
              }`} />
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />
        
        {/* Mobile Menu */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Menu Content */}
          <div className="flex flex-col h-full pt-20 pb-6 px-6">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-6">
              <button 
                onClick={() => {
                  scrollToSection('what-we-do');
                  closeMenu();
                }}
                className="text-slate-800 font-medium text-lg py-3 border-b border-gray-100 hover:text-hopely-pink transition-colors duration-200 text-left"
              >
                What We Do
              </button>
              <button 
                onClick={() => {
                  scrollToSection('get-involved');
                  closeMenu();
                }}
                className="text-slate-800 font-medium text-lg py-3 border-b border-gray-100 hover:text-hopely-pink transition-colors duration-200 text-left"
              >
                Get Involved
              </button>
              <button 
                onClick={() => {
                  navigateToProjects();
                  closeMenu();
                }}
                className="text-slate-800 font-medium text-lg py-3 border-b border-gray-100 hover:text-hopely-pink transition-colors duration-200 text-left"
              >
                Projects
              </button>
              <Button3D 
                text="Donate Now" 
                size="large" 
                variant="pink" 
                href="https://gofund.me/266a82aa"
                className="w-full mt-4"
              />
            </nav>

            {/* Contact Info */}
            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium text-slate-800">Get in touch</p>
                <p>info@hopely.org</p>
                <p>+256 778000100</p>
                <p>Kampala, Uganda</p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-hopely-pink transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-hopely-pink transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
