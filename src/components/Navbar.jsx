import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';
import Logo from './Logo';
import { CONFIG } from '../config';
import { trackNavClick } from '../utils/analytics';

export function Navbar({ activeSection = 'hero', onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'apps', label: 'Apps' },
    { id: 'features', label: 'Features' },
    { id: 'download', label: 'Download' },
    { id: 'changelog', label: 'Changelog' },
  ];

  const scrollToSection = (id) => {
    trackNavClick(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#050816]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="group flex items-center gap-2"
        >
          <Logo size={36} showText={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-white bg-blue-600/30 border border-blue-500/40 shadow-sm shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={CONFIG.company.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full inline-flex items-center gap-1 transition-colors"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </nav>

        {/* Desktop Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              if (onDownloadClick) onDownloadClick();
              else scrollToSection('download');
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-full shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 border border-cyan-400/30"
          >
            <Download className="w-4 h-4" />
            Get Anshu Mock
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#0A1020]/95 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl transition-all duration-300 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all ${
                  activeSection === link.id
                    ? 'text-white bg-blue-600/20 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={CONFIG.company.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:bg-white/5 rounded-xl flex items-center justify-between"
            >
              GitHub Repository
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>

            <div className="pt-4 mt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onDownloadClick) onDownloadClick();
                  else scrollToSection('download');
                }}
                className="w-full py-3.5 text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Anshu Mock APK
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
