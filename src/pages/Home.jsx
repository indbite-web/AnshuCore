import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import DownloadSection from '../components/DownloadSection';
import Logo from '../components/Logo';
import { CONFIG } from '../config';

export function Home({ appReleases, loading, onOpenChangelog }) {
  const navigate = useNavigate();
  const mainApp = CONFIG.apps[0];
  const releaseData = appReleases[mainApp.id] || null;

  const {
    latestVersion = 'v1.0.0',
    totalDownloads = 0
  } = releaseData || {};

  const previewFeatures = [
    {
      icon: 'auto_awesome',
      title: 'AI-Powered MCQ Generation',
      description: 'Generate practice MCQs intelligently tailored to your specific subjects.'
    },
    {
      icon: 'quiz',
      title: 'Mock Tests',
      description: 'Practice timed exams through a clean and distraction-free test interface.'
    },
    {
      icon: 'target',
      title: 'Smart Exam Preparation',
      description: 'Structured question modules to target weak areas efficiently.'
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero
        onDownloadClick={() => navigate('/download/anshu-mock')}
        onExploreClick={() => navigate('/features')}
      />

      {/* Short Introduction */}
      <About />

      {/* Featured Anshu Mock Preview (Compact for Mobile) */}
      <section className="py-16 bg-[#F7F9FC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px] text-blue-600">star</span>
              <span>FEATURED APP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Anshu Mock
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Exam Preparation • Android
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-5 max-w-lg mx-auto">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-subtle flex-shrink-0">
                <Logo size={28} showText={false} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Anshu Mock
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  by AnshuCore
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {mainApp.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#F7F9FC] border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Latest Version</span>
                <span className="font-bold text-slate-900">{latestVersion}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Total Downloads</span>
                <span className="font-bold text-blue-600">
                  {new Intl.NumberFormat().format(totalDownloads)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/apps"
                className="py-3 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-center transition-colors"
              >
                View App →
              </Link>
              <Link
                to="/download/anshu-mock"
                className="py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-center transition-colors shadow-subtle flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Features Preview (3 Key Features) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px] text-blue-600">auto_awesome</span>
              <span>KEY FEATURES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Built for focused preparation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {previewFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F7F9FC] border border-slate-200 shadow-subtle space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-[22px]">{feat.icon}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/features"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-200 transition-colors"
            >
              <span>View All Features</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <DownloadSection
        app={mainApp}
        releaseData={releaseData}
        onOpenChangelog={onOpenChangelog}
      />
    </div>
  );
}

export default Home;
