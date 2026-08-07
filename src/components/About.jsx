import React from 'react';
import Logo from './Logo';

export function About() {
  const pillars = [
    {
      icon: 'memory',
      title: 'Intelligent Software',
      description: 'Engineering tools that solve real problems with speed, clarity and precision.'
    },
    {
      icon: 'layers',
      title: 'Clean User Experience',
      description: 'Crafting clutter-free interfaces that prioritize usability, focus and fluid interaction.'
    },
    {
      icon: 'verified_user',
      title: 'Reliable Standards',
      description: 'Building products using clean codebases and secure software standards.'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px] text-blue-600">domain</span>
            <span>ABOUT ANSHUCORE</span>
          </div>

          <h2 className="text-section-heading font-bold text-slate-900 font-display">
            Building software that feels simpler.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            AnshuCore is a technology brand focused on creating useful, modern and thoughtfully designed digital products. Our goal is to combine practical functionality with simple, polished user experiences.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#F7F9FC] border border-slate-200/80 shadow-subtle hover:shadow-card transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 mb-6">
                <span className="material-symbols-outlined text-[26px]">{pillar.icon}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-display">
                {pillar.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Official Brand Identity Card */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0B1F3A] text-white shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Logo size={52} showText={false} />
            <div>
              <h3 className="text-2xl font-bold text-white font-display">
                AnshuCore
              </h3>
              <p className="text-slate-300 text-sm mt-0.5">
                Building smarter digital experiences across mobile and modern web.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-slate-200 text-xs font-mono">
            Official Technology Brand
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
