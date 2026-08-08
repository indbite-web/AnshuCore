import React from 'react';
import { Link } from 'react-router-dom';
import AppCard from '../components/AppCard';
import { CONFIG } from '../config';

export function AppsPage({ appReleases, loading, onOpenChangelog }) {
  const mainApp = CONFIG.apps[0];
  const releaseData = appReleases[mainApp.id] || null;

  const featuresList = [
    "AI-powered MCQ generation",
    "Mock test practice",
    "Exam-focused question practice",
    "Personalized user experience",
    "Modern Android interface"
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 pt-24 pb-20 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-blue-600">apps</span>
            <span>ANSHUCORE APPS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Software built for real needs.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Explore applications created by AnshuCore. Each product is designed with a focus on practical functionality, clean interfaces and a smooth user experience.
          </p>
        </div>

        {/* Dynamic App Card */}
        <div className="space-y-8">
          <AppCard
            app={mainApp}
            releaseData={releaseData}
            loading={loading}
            onOpenChangelog={() => onOpenChangelog(mainApp)}
          />
        </div>

        {/* Detailed App Showcase */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Anshu Mock
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                Available for Android
              </span>
            </div>
            <p className="text-sm font-semibold text-blue-600">
              Smart Exam Preparation for Android
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Anshu Mock is an Android application designed to make exam preparation more convenient through mock tests, MCQ-based practice and intelligent question generation.
            </p>
            <p>
              Whether you're practicing individual questions or preparing through mock tests, Anshu Mock provides a focused environment for regular practice.
            </p>
          </div>

          {/* Features Checklist */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featuresList.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F9FC] border border-slate-200/80 text-xs font-semibold text-slate-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-blue-600">check_circle</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              Anshu Mock is developed and maintained by AnshuCore.
            </span>

            <Link
              to="/download/anshu-mock"
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download APK</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AppsPage;
