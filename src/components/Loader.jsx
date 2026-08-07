import React, { useEffect, useState } from 'react';
import Logo from './Logo';

export function Loader({ onFinish }) {
  const [stage, setStage] = useState(0); // 0: initial, 1: draw & text reveal, 2: fade out
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      const timer = setTimeout(() => {
        onFinish();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Sequence timing
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] text-white">
        <Logo size={90} showText={true} textClassName="text-3xl font-extrabold tracking-tight mt-4 text-white" />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] transition-opacity duration-500 ease-out ${
        stage === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          stage >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl -mt-10" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated SVG Logo */}
        <div
          className={`transform transition-all duration-1000 ${
            stage >= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <Logo size={120} showText={false} animated={true} />
        </div>

        {/* AnshuCore Brand Name Reveal */}
        <div
          className={`mt-6 text-center transform transition-all duration-700 delay-300 ${
            stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h1 className="text-3xl font-bold tracking-tight text-white font-display">
            Anshu<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Core</span>
          </h1>
          <p className="text-sm text-slate-400 tracking-wider uppercase font-medium mt-1">
            Intelligent Software
          </p>
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-48 h-1 bg-slate-800/80 rounded-full mt-8 overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-1500 ease-out rounded-full ${
              stage >= 1 ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;
