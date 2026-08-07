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
    <footer className="bg-[#071426] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo size={38} showText={true} darkMode={true} />
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {CONFIG.company.tagline} AnshuCore creates useful, modern and thoughtfully designed digital products for mobile and web.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => handleLinkClick(e, 'hero')}
                  className="hover:text-white transition-colors"
                >
                  Anshu Mock
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  onClick={(e) => handleLinkClick(e, 'download')}
                  className="hover:text-white transition-colors"
                >
                  Download APK
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenChangelog}
                  className="hover:text-white transition-colors text-left"
                >
                  Latest Updates
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-white transition-colors"
                >
                  About AnshuCore
                </a>
              </li>
              <li>
                <a
                  href="#apps"
                  onClick={(e) => handleLinkClick(e, 'apps')}
                  className="hover:text-white transition-colors"
                >
                  AnshuCore Apps
                </a>
              </li>
            </ul>
          </div>

          {/* Developers & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display mb-4">
              Developers & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href={CONFIG.company.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
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
          <div className="flex items-center gap-4">
            <span>Anshu Mock — by AnshuCore</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
