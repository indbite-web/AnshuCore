import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { CONFIG } from '../config';
import { trackNavClick } from '../utils/analytics';

export function Navbar({ activeSection = 'hero', onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'apps', label: 'Apps' },
    { id: 'features', label: 'Features' },
    { id: 'changelog', label: 'Updates' },
    { id: 'about', label: 'About' },
  ];

  const scrollToSection = (id) => {
    trackNavClick(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 72;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle py-3.5'
          : 'bg-white border-b border-slate-200/60 py-4'
      }`}
      style={{ height: '72px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <Logo size={34} showText={true} />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === link.id
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: GitHub & Primary Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={CONFIG.company.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </a>

          <button
            onClick={() => {
              if (onDownloadClick) onDownloadClick();
              else scrollToSection('download');
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle hover:shadow transition-all duration-200 flex items-center gap-2 border border-blue-700/20 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Download App</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-white border-b border-slate-200 shadow-xl p-5 animate-fadeIn z-50">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                  activeSection === link.id
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}

            <a
              href={CONFIG.company.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 rounded-xl flex items-center justify-between"
            >
              <span>GitHub Repository</span>
              <span className="material-symbols-outlined text-[20px] text-slate-400">open_in_new</span>
            </a>

            <div className="pt-3 mt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onDownloadClick) onDownloadClick();
                  else scrollToSection('download');
                }}
                className="w-full py-3.5 px-4 text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Download Anshu Mock APK</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
