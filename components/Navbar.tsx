
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { MenuIcon, CloseIcon, ArrowRight } from './Icons';
import Magnetic from './Magnetic';
import TextScramble from './TextScramble';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar border/background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out-quart ${scrolled ? 'bg-white/85 backdrop-blur-lg border-b border-neutral-200 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Magnetic>
            <a href="#" className="text-xl font-bold tracking-tighter text-neutral-900 z-50 relative group block p-2">
              DEV<span className="text-neutral-400 group-hover:text-neutral-900 transition-colors">.</span>
            </a>
          </Magnetic>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors relative group px-2 py-2 block"
                >
                  {link.name}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neutral-900 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-full group-hover:h-[1px] group-hover:rounded-none"></span>
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden z-50 text-neutral-900 p-2 -mr-2 hover:bg-neutral-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-white flex flex-col transition-all duration-[800ms] ease-out-expo ${
          mobileMenuOpen ? 'clip-path-full opacity-100' : 'clip-path-top opacity-0 pointer-events-none'
        }`}
        style={{ 
          clipPath: mobileMenuOpen ? 'circle(150% at top right)' : 'circle(0% at top right)'
        }}
      >
        {/* Mobile Menu Header (Close Button) */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
          <span className="text-xl font-bold tracking-tighter text-neutral-900">Menu</span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors group"
            aria-label="Close menu"
          >
            <CloseIcon className="w-6 h-6 text-neutral-900 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col justify-center flex-1 px-6 gap-6">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-5xl font-bold tracking-tighter text-neutral-900 flex items-center justify-between group transition-all duration-700 ease-out-quart ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${100 + (idx * 100)}ms` }}
            >
              <span className="group-hover:translate-x-4 transition-transform duration-300">
                {link.name}
              </span>
              <ArrowRight className="w-8 h-8 text-neutral-300 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out-expo" />
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Footer */}
        <div 
          className={`p-6 bg-neutral-50 transition-all duration-1000 delay-500 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
            <p className="text-neutral-400 text-xs uppercase tracking-widest mb-2">Get in touch</p>
            <a href="mailto:hello@dev.com" className="text-lg font-medium text-neutral-900">hello@dev-portfolio.com</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
