import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { CONFIG } from '../config';

export function Navbar({ activeSection = 'hero' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileLinks = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/apps', label: 'Apps', icon: 'apps' },
    { to: '/features', label: 'Features', icon: 'auto_awesome' },
    { to: '/updates', label: 'Updates', icon: 'update' },
    { to: '/about', label: 'About', icon: 'info' },
    { to: '/school-login', label: 'School Login', icon: 'school' },
  ];

  const desktopNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/apps', label: 'Apps' },
    { to: '/features', label: 'Features' },
    { to: '/updates', label: 'Updates' },
    { to: '/about', label: 'About' },
  ];

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
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 focus:outline-none"
        >
          <Logo size={34} showText={true} />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {desktopNavLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/school-login"
            className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors ${
              location.pathname === '/school-login'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-blue-600">school</span>
            <span>School Login</span>
          </Link>
        </nav>

        {/* Right: Desktop GitHub & Action CTA */}
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

          <Link
            to="/download/anshu-mock"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle hover:shadow transition-all duration-200 flex items-center gap-2 border border-blue-700/20 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Download App</span>
          </Link>
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
            {mobileLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-colors flex items-center gap-3 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-blue-600">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100">
              <Link
                to="/download/anshu-mock"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 text-center font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Download Anshu Mock</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
