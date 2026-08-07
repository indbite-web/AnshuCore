import React from 'react';
import {
  Sparkles,
  ClipboardCheck,
  Target,
  Zap,
  UserCheck,
  Smartphone
} from 'lucide-react';
import { CONFIG } from '../config';

const ICON_MAP = {
  Sparkles,
  ClipboardCheck,
  Target,
  Zap,
  UserCheck,
  Smartphone
};

export function Features() {
  const mainApp = CONFIG.apps[0];
  const features = mainApp.features;

  return (
    <section id="features" className="py-24 bg-[#0A1020] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Anshu Mock Features
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            Built for focused exam preparation.
          </h2>

          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Designed to simplify practice sessions, enhance retainment, and provide a seamless mobile test environment.
          </p>
        </div>

        {/* 3-Column Desktop / 2-Column Tablet / 1-Column Mobile Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = ICON_MAP[feature.iconName] || Sparkles;
            return (
              <div
                key={feature.id}
                className="p-8 rounded-3xl bg-[#050816]/60 border border-white/10 hover:border-cyan-500/40 hover:bg-[#050816]/90 transition-all duration-300 hover:-translate-y-1 group backdrop-blur-md relative overflow-hidden shadow-xl"
              >
                {/* Subtle Card Glow Effect */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-600/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-300" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-white font-display">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Features reflect official Anshu Mock v1.0 Android application functionality.
        </div>

      </div>
    </section>
  );
}

export default Features;
