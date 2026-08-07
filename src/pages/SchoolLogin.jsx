import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ShaderGradientCanvas from '../components/ShaderGradientCanvas';

export function SchoolLogin() {
  return (
    <div className="min-h-screen bg-[#071426] text-white pt-28 pb-20 relative flex items-center justify-center overflow-hidden">
      {/* Subtle WebGL Shader Background */}
      <ShaderGradientCanvas speed={0.2} frequency={0.5} amplitude={0.2} variant="calm" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/90 via-[#0B1F3A]/80 to-[#071426] pointer-events-none z-0" />

      <div className="max-w-md w-full mx-auto px-4 relative z-10 text-center">
        
        {/* Card Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white text-slate-900 shadow-2xl space-y-6">
          
          {/* Logo Badge */}
          <div className="inline-flex p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-subtle mb-2">
            <Logo size={48} showText={false} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mx-auto">
            <span className="material-symbols-outlined text-[16px] text-blue-600">school</span>
            <span>ANSHUCORE ERP</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              School Login
            </h1>
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
              Coming Soon
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            The AnshuCore school platform is currently being prepared. School access and ERP dashboard features will be available here in a future release.
          </p>

          <div className="pt-4">
            <Link
              to="/"
              className="w-full py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              <span>Back to Home</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default SchoolLogin;
