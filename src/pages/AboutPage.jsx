import React from 'react';
import { Link } from 'react-router-dom';
import About from '../components/About';

export function AboutPage() {
  const approachPrinciples = [
    {
      icon: 'design_services',
      title: 'Useful by Design',
      description: 'We build features that solve real problems rather than adding superficial complexity.'
    },
    {
      icon: 'auto_awesome',
      title: 'Simple Experiences',
      description: 'Interfaces should feel intuitive, fast, and respectful of your time.'
    },
    {
      icon: 'rocket_launch',
      title: 'Built for the Future',
      description: 'Engineering clean codebases designed to scale smoothly as new products launch.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-20 pb-20">
      <About />

      {/* Our Approach Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-blue-600">psychology</span>
            <span>OUR APPROACH</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            How we design software
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {approachPrinciples.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200 shadow-subtle space-y-3"
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

        {/* Bottom Navigation Link */}
        <div className="mt-12 text-center">
          <Link
            to="/apps"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle transition-all duration-200"
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
