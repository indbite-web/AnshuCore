import React, { useState } from 'react';
import Logo from './Logo';
import { trackDownload } from '../utils/analytics';
import confetti from 'canvas-confetti';

export function AppCard({ app, releaseData, loading, onOpenChangelog, onRetry }) {

  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-card animate-pulse space-y-6">
        <div className="w-40 h-6 bg-slate-200 rounded" />
        <div className="w-full h-24 bg-slate-100 rounded-xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const {
    latestVersion = 'v1.0.0',
    latestSizeFormatted = 'N/A',
    latestDateFormatted = 'N/A',
    totalDownloads = 0,
    hasApk,
    error
  } = releaseData || {};

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left App Details Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Row */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-subtle flex-shrink-0">
              <Logo size={32} showText={false} />
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  {app.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  {latestVersion}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {app.category} • {app.platform}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            {app.shortDescription}
          </p>

          {/* LIVE Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F7F9FC] border border-slate-200/80">
            <div>
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-blue-600">new_releases</span>
                <span>Version</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">{latestVersion}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">download_for_offline</span>
                <span>Downloads</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {new Intl.NumberFormat().format(totalDownloads)}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-cyan-600">calendar_month</span>
                <span>Updated</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">{latestDateFormatted}</div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-indigo-600">hard_drive</span>
                <span>APK Size</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">{latestSizeFormatted}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            {hasApk && releaseData?.downloadUrl ? (
              <a
                href={releaseData.downloadUrl}
                rel="noopener noreferrer"
                onClick={() => {
                  trackDownload(app.name, releaseData.latestVersion, releaseData.downloadUrl);
                  try {
                    confetti({
                      particleCount: 45,
                      spread: 60,
                      origin: { y: 0.75 },
                      colors: ['#2563EB', '#3B82F6', '#1D4ED8', '#00A3FF']
                    });
                  } catch (err) {
                    // Ignore
                  }
                }}
                className="py-3.5 px-6 text-sm font-bold rounded-xl shadow-subtle transition-all duration-200 flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700/20 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Download APK ({latestSizeFormatted})</span>
              </a>
            ) : (
              <button
                disabled
                className="py-3.5 px-6 text-sm font-bold rounded-xl bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span>APK temporarily unavailable</span>
              </button>
            )}

            <button
              onClick={onOpenChangelog}
              className="py-3.5 px-5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-subtle transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-blue-600">update</span>
              <span>Release Notes</span>
            </button>
          </div>

          {error && !hasApk && (
            <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200 flex items-center justify-between">
              <span>Failed to fetch APK file. Please retry.</span>
              {onRetry && (
                <button onClick={onRetry} className="underline font-bold">Retry</button>
              )}
            </div>
          )}

        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[280px] bg-slate-900 rounded-[32px] p-3 shadow-phone border-2 border-slate-800">
            <div className="bg-slate-950 rounded-[24px] p-4 text-white space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 font-bold">
                <span>ANSHU MOCK</span>
                <span className="text-emerald-400 text-[10px] uppercase">Active Test</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-blue-400">Mock Exam Practice</div>
                <div className="text-xs font-medium text-slate-200">
                  Quantitative Aptitude & Logical Reasoning Practice Test 01
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-3/4 rounded-full" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Questions Answered</span>
                <span className="font-bold text-white">45 / 60</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AppCard;
