import React from 'react';
import Logo from './Logo';

export function Screenshots() {
  const mockScreenshots = [
    {
      id: 1,
      title: 'Practice Dashboard',
      subtitle: 'Track subject metrics & test history',
      tag: 'HOME'
    },
    {
      id: 2,
      title: 'AI MCQ Generator',
      subtitle: 'Create targeted question sets',
      tag: 'AI ENGINE'
    },
    {
      id: 3,
      title: 'Mock Exam Interface',
      subtitle: 'Distraction-free test environment',
      tag: 'EXAM MODE'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F7F9FC] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px] text-blue-600">smartphone</span>
            <span>APP PREVIEW</span>
          </div>

          <h2 className="text-section-heading font-bold text-slate-900 font-display">
            See Anshu Mock in action
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Explore the interface designed for clean navigation, fast response times, and focused practice sessions.
          </p>
        </div>

        {/* Responsive Gallery: 3-Phone Grid on Desktop, Touch Scrollable Carousel on Mobile */}
        <div className="mt-16 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto hide-scrollbar pb-6 snap-x snap-mandatory">
          {mockScreenshots.map((screen) => (
            <div
              key={screen.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center"
            >
              <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300">
                
                {/* Phone Mockup Frame */}
                <div className="w-full bg-slate-950 rounded-[28px] p-4 text-white border-2 border-slate-800 space-y-4">
                  
                  {/* Phone Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Logo size={20} showText={false} />
                      <span className="text-[11px] font-bold text-slate-300">ANSHU MOCK</span>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                      {screen.tag}
                    </span>
                  </div>

                  {/* Interface Mock Content */}
                  <div className="space-y-3 py-2">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white">{screen.title}</div>
                      <div className="text-[10px] text-slate-400">{screen.subtitle}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Daily Practice Progress</span>
                        <span className="text-blue-400 font-bold">85%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[85%] rounded-full" />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-300 font-medium">Quick Start Mock Test</span>
                      <span className="material-symbols-outlined text-[16px] text-emerald-400">play_circle</span>
                    </div>
                  </div>

                </div>

                {/* Caption */}
                <div className="mt-4 text-center">
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {screen.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {screen.subtitle}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-xs text-slate-500 md:hidden flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[16px]">swipe</span>
          <span>Swipe horizontally to view app screens</span>
        </div>

      </div>
    </section>
  );
}

export default Screenshots;
