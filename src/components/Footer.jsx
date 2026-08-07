import React from 'react';
import Logo from './Logo';
import { CONFIG } from '../config';

export function Footer({ onNavigate, onOpenChangelog }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (id === 'changelog') {
      onOpenChangelog();
      return;
    }
    onNavigate(id);
  };

  return (
    <footer className="bg-[#050816] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo size={40} showText={true} />
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {CONFIG.company.tagline} AnshuCore develops intelligent software and clean digital experiences across mobile and modern web.
            </p>
            <div className="pt-2 text-xs text-slate-500 font-mono">
              Anshu Mock — by AnshuCore
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => handleLinkClick(e, 'hero')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Anshu Mock
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleLinkClick(e, 'features')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  onClick={(e) => handleLinkClick(e, 'download')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Download APK
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenChangelog}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Changelog & Releases
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About AnshuCore
                </a>
              </li>
              <li>
                <a
                  href="#apps"
                  onClick={(e) => handleLinkClick(e, 'apps')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AnshuCore Apps
                </a>
              </li>
            </ul>
          </div>

          {/* Developers & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-display mb-4">
              Developers & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href={CONFIG.company.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} AnshuCore. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Anshu Mock — by AnshuCore</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
