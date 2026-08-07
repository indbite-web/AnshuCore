import React from 'react';
import { Cpu, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export function About() {
  const pillars = [
    {
      icon: Cpu,
      title: 'Intelligent Software',
      description: 'Engineering modern tools that solve real problems with speed, clarity and precision.'
    },
    {
      icon: Layers,
      title: 'Clean User Experience',
      description: 'Crafting clutter-free interfaces that prioritize usability, focus and fluid interaction.'
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Architecture',
      description: 'Building robust products using clean codebases and secure software standards.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0A1020] relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Built by AnshuCore
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            Technology designed to make everyday experiences smarter.
          </h2>

          {/* Paragraph */}
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            AnshuCore is a technology brand focused on building useful, modern and thoughtfully designed digital products. We combine intelligent software with clean user experiences to create tools that feel simple, fast and practical.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.04] transition-all duration-300 group backdrop-blur-md"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-blue-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white font-display">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-slate-400 leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Brand Card Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0A1020] to-slate-900/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <Logo size={64} showText={false} />
            <div>
              <h3 className="text-2xl font-bold text-white font-display">
                AnshuCore
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Building smarter digital experiences across mobile and modern web.
              </p>
            </div>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-mono">
            Official Company Platform
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
