import React, { useEffect, useState } from 'react';
import Logo from './Logo';

export function Loader({ onFinish }) {
  const [stage, setStage] = useState(0); // 0: initial, 1: reveal, 2: fade out
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      const timer = setTimeout(() => {
        onFinish();
      }, 400);
      return () => clearTimeout(timer);
    }

    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 1400);
    const t3 = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-900">
        <Logo size={80} showText={true} textClassName="text-2xl font-bold tracking-tight text-slate-900 mt-4" />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-400 ease-out ${
        stage === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated SVG Logo */}
        <div
          className={`transform transition-all duration-700 ${
            stage >= 1 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <Logo size={100} showText={false} animated={true} />
        </div>

        {/* AnshuCore Typography */}
        <div
          className={`mt-5 text-center transform transition-all duration-500 delay-200 ${
            stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">
            Anshu<span className="text-blue-600">Core</span>
          </h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
            Software & Technology
          </p>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-36 h-1 bg-slate-100 rounded-full mt-6 overflow-hidden relative">
          <div
            className={`h-full bg-blue-600 transition-all duration-1200 ease-out rounded-full ${
              stage >= 1 ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;
