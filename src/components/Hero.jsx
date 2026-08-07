import React from 'react';
import Logo from './Logo';

export function Hero({ onDownloadClick, onExploreClick }) {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#F7F9FC] border-b border-[#E5EAF2] overflow-hidden"
    >
      {/* Background Architectural Geometry */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Category Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-[16px] text-blue-600">smartphone</span>
              <span>ANSHUCORE APPS</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-hero-headline font-extrabold text-slate-900 font-display tracking-tight leading-[1.08]">
              Practice smarter.{' '}
              <span className="block text-blue-600">
                Perform better.
              </span>
            </h1>

            {/* Product Subtext */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              <strong className="text-slate-900 font-semibold">Anshu Mock</strong> is a modern exam preparation app designed for focused practice, intelligent MCQ generation and a smoother mock-test experience.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onDownloadClick}
                className="px-6 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle hover:shadow transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[22px]">android</span>
                <span>Download for Android</span>
              </button>

              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-subtle transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] text-blue-600">auto_awesome</span>
                <span>Explore Features</span>
              </button>
            </div>

            {/* Platform Trust Tag */}
            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500 font-medium">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">verified</span>
              <span>Available for Android • Official Release</span>
            </div>
          </div>

          {/* Right Hero Column — Clean Android Phone Presentation */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Subtle Backdrop Panel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-indigo-600/5 rounded-3xl transform rotate-3 scale-95 border border-blue-200/40" />

            {/* Realistic Phone Frame Container */}
            <div className="relative w-full max-w-[320px] bg-slate-900 border-4 border-slate-800 rounded-[40px] p-3 shadow-phone">
              
              {/* Camera Speaker Notch */}
              <div className="w-24 h-3.5 bg-slate-950 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
              </div>

              {/* App Screen Interface Preview */}
              <div className="bg-slate-950 rounded-[30px] p-4 text-white space-y-3.5 overflow-hidden">
                
                {/* Mock App Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Logo size={22} showText={false} />
                    <span className="text-xs font-bold tracking-wide text-white">ANSHU MOCK</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 border border-blue-500/30">
                    v1.0.0
                  </span>
                </div>

                {/* AI Question Simulation Card */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-blue-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                      AI MCQ Generator
                    </span>
                    <span>Q 08 / 40</span>
                  </div>
                  <p className="text-xs text-slate-100 font-medium leading-snug">
                    Which layer handles reliable end-to-end data delivery in OSI model?
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {['Network Layer', 'Transport Layer (Correct)', 'Session Layer', 'Data Link'].map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-[11px] flex items-center justify-between ${
                          i === 1
                            ? 'bg-blue-600 text-white font-semibold shadow-subtle'
                            : 'bg-slate-950/70 text-slate-400 border border-slate-800'
                        }`}
                      >
                        <span>{opt}</span>
                        {i === 1 && <span className="material-symbols-outlined text-[14px] text-white">check_circle</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score & Analytics Widget */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-medium">Accuracy</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">96.5%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-medium">Practice Time</div>
                    <div className="text-sm font-bold text-blue-400 mt-0.5">42 Mins</div>
                  </div>
                </div>

              </div>

              {/* Contextual Badges Flanking Phone */}
              <div className="absolute -top-3 -right-4 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-card flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <span className="material-symbols-outlined text-[16px] text-blue-600">auto_awesome</span>
                <span>AI MCQ Generation</span>
              </div>

              <div className="absolute -bottom-3 -left-4 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-card flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">quiz</span>
                <span>Mock Tests</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
