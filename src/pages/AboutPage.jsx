import React from 'react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  const approachPrinciples = [
    {
      icon: 'design_services',
      title: 'Useful by Design',
      description: 'We focus on features that solve real problems.'
    },
    {
      icon: 'auto_awesome',
      title: 'Simple Experiences',
      description: 'Powerful functionality should still feel easy to use.'
    },
    {
      icon: 'rocket_launch',
      title: 'Built for the Future',
      description: 'Our products are designed to evolve with new technology and user needs.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24 pb-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px] text-blue-600">info</span>
            <span>ABOUT ANSHUCORE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Building software that feels simpler.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            AnshuCore is a technology brand focused on creating useful, modern and thoughtfully designed digital products.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#F7F9FC] border border-slate-200/90 shadow-subtle space-y-6 text-slate-700 text-base leading-relaxed">
          <p>
            We believe software should not feel unnecessarily complicated. Our goal is to combine practical functionality, intelligent technology and clean user experiences to create products that are simple to understand, enjoyable to use and built for real-world needs.
          </p>

          <p>
            From productivity and education-focused applications to future digital platforms, AnshuCore is building a growing ecosystem of software designed with simplicity and usefulness in mind.
          </p>
        </div>

        {/* Our Approach Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px] text-blue-600">psychology</span>
              <span>PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Our approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approachPrinciples.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ending Notice */}
        <div className="mt-12 text-center text-slate-600 space-y-3">
          <p className="text-base font-semibold text-slate-900 font-display">
            AnshuCore is just getting started.
          </p>
          <p className="text-xs text-slate-500">
            For inquiries, reach out at{' '}
            <a href="mailto:Corexanshu@gmail.com" className="text-blue-600 font-semibold underline">
              Corexanshu@gmail.com
            </a>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle transition-all duration-200"
          >
            <span>Explore AnshuCore Apps</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;
