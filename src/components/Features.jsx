import React from 'react';
import Logo from './Logo';

export function Features() {
  const editorialFeatures = [
    {
      id: 'mcq-gen',
      tag: 'AI GENERATION',
      title: 'AI-Powered MCQ Generation',
      description: 'Generate practice MCQs intelligently tailored to your specific subjects for focused, effective preparation.',
      icon: 'auto_awesome',
      preview: {
        badge: 'AI MCQ Engine',
        headline: 'Instant Question Generation',
        subtext: 'Creates targeted multiple-choice questions with answer explanations in seconds.',
        stat: '100% Focused Practice'
      }
    },
    {
      id: 'mock-test',
      tag: 'EXAM SIMULATION',
      title: 'Focused Mock Tests',
      description: 'Practice timed exams through a clean and distraction-free test interface designed to build confidence.',
      icon: 'quiz',
      preview: {
        badge: 'Mock Exam Mode',
        headline: 'Distraction-Free Environment',
        subtext: 'Simulates real test conditions with time tracking and score breakdowns.',
        stat: 'Real Exam Timing'
      }
    },
    {
      id: 'exam-focused',
      tag: 'STRUCTURED PRACTICE',
      title: 'Exam-Focused Practice',
      description: 'Prepare through structured question-based practice modules categorized by subject and difficulty.',
      icon: 'target',
      preview: {
        badge: 'Category Practice',
        headline: 'Structured Subject Modules',
        subtext: 'Organized practice sets that let you target weak areas efficiently.',
        stat: 'Subject Mastery'
      }
    },
    {
      id: 'personalized',
      tag: 'PERSONALIZATION',
      title: 'Personalized Experience',
      description: 'Customize your study profile, track your daily practice goals, and manage your prep preferences.',
      icon: 'account_circle',
      preview: {
        badge: 'User Profile',
        headline: 'Tailored Study Dashboard',
        subtext: 'Saves your progress history and custom test configurations.',
        stat: 'Personal Stats'
      }
    },
    {
      id: 'modern-ui',
      tag: 'ANDROID APP',
      title: 'Fast, Modern Android UI',
      description: 'Built natively for Android with clean navigation, zero clutter, and smooth interaction.',
      icon: 'smartphone',
      preview: {
        badge: 'Native Android',
        headline: 'Lightweight & Responsive',
        subtext: 'Optimized performance for smooth navigation on all Android smartphones.',
        stat: '60 FPS Performance'
      }
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px] text-blue-600">auto_awesome</span>
            <span>ANSHU MOCK FEATURES</span>
          </div>

          <h2 className="text-section-heading font-bold text-slate-900 font-display">
            Intelligent features built for better preparation.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Every feature in Anshu Mock is designed to simplify practice sessions, eliminate clutter, and maximize learning retention.
          </p>
        </div>

        {/* Alternating Editorial Feature Blocks */}
        <div className="mt-20 space-y-20">
          {editorialFeatures.map((feat, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={feat.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Text Block */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 tracking-wider uppercase">
                    <span className="material-symbols-outlined text-[18px]">{feat.icon}</span>
                    <span>{feat.tag}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    {feat.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                    <span>Confirmed Anshu Mock v1.0 Feature</span>
                  </div>
                </div>

                {/* Visual Preview Block */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F9FC] border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden">
                    
                    {/* Top Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <Logo size={24} showText={false} />
                        <span className="text-xs font-bold text-slate-800 tracking-wide">ANSHU MOCK</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                        {feat.preview.badge}
                      </span>
                    </div>

                    {/* Content Preview */}
                    <div className="mt-6 space-y-3">
                      <h4 className="text-lg font-bold text-slate-900 font-display">
                        {feat.preview.headline}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {feat.preview.subtext}
                      </p>

                      <div className="pt-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                          {feat.preview.stat}
                        </span>
                        <span className="material-symbols-outlined text-[20px] text-slate-400">arrow_forward</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;
