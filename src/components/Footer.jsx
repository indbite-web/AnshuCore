import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { CONFIG } from '../config';

export function Footer({ onNavigate, onOpenChangelog }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071426] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo size={38} showText={true} darkMode={true} />
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Building software that feels simpler. AnshuCore creates useful, modern and thoughtfully designed digital products.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-400">mail</span>
              <span>Official Support:</span>
              <a
                href="mailto:Corexanshu@gmail.com"
                className="text-blue-400 hover:text-blue-300 font-semibold underline"
              >
                Corexanshu@gmail.com
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/apps" className="hover:text-white transition-colors">
                  Anshu Mock
                </Link>
              </li>
              <li>
                <Link to="/download/anshu-mock" className="hover:text-white transition-colors">
                  Download APK
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-white transition-colors">
                  Latest Updates
                </Link>
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
                <Link to="/about" className="hover:text-white transition-colors">
                  About AnshuCore
                </Link>
              </li>
              <li>
                <Link to="/apps" className="hover:text-white transition-colors">
                  AnshuCore Apps
                </Link>
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
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
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
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <span>Anshu Mock by AnshuCore</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
