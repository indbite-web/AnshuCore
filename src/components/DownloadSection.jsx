import React, { useState } from 'react';
import Logo from './Logo';
import { trackDownload } from '../utils/analytics';
import confetti from 'canvas-confetti';

export function DownloadSection({ app, releaseData, onOpenChangelog }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const {
    latestVersion = 'v1.0.0',
    latestSizeFormatted = 'N/A',
    latestDateFormatted = 'N/A',
    totalDownloads = 0,
    downloadUrl,
    hasApk
  } = releaseData || {};

  const handleDownload = () => {
    if (!downloadUrl) return;

    trackDownload(app.name, latestVersion, downloadUrl);
    setDownloading(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#00A3FF']
      });
    } catch (e) {
      // Ignore
    }

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      window.location.href = downloadUrl;
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 600);
  };

  return (
    <section id="download" className="py-20 md:py-28 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>GET ANSHU MOCK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Get Anshu Mock. <br />
              <span className="text-blue-400">Start practicing on Android today.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Download the official Android APK directly from our GitHub release. Fast setup, no registration barriers, and built for intelligent exam prep.
            </p>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-emerald-400">android</span>
                <span>Android 7.0+</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-blue-400">security</span>
                <span>Verified APK</span>
              </div>
            </div>
          </div>

          {/* Right Column — Pure White Download Panel */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md p-8 rounded-3xl bg-white text-slate-900 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <Logo size={28} showText={false} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {app.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    Official Android Release
                  </p>
                </div>
              </div>

              {/* LIVE Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F7F9FC] border border-slate-200">
                <div>
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-blue-600">new_releases</span>
                    <span>Version</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{latestVersion}</div>
                </div>

                <div>
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">hard_drive</span>
                    <span>APK Size</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{latestSizeFormatted}</div>
                </div>

                <div>
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-indigo-600">download_for_offline</span>
                    <span>Downloads</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {new Intl.NumberFormat().format(totalDownloads)}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-cyan-600">calendar_month</span>
                    <span>Updated</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{latestDateFormatted}</div>
                </div>
              </div>

              {/* Large Download Button */}
              {hasApk ? (
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className={`w-full py-4 px-6 text-base font-bold rounded-xl shadow-subtle transition-all duration-200 flex items-center justify-center gap-2.5 ${
                    downloadSuccess
                      ? 'bg-emerald-600 text-white'
                      : downloading
                      ? 'bg-blue-700 text-white cursor-wait'
                      : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-700/20 active:scale-[0.98]'
                  }`}
                >
                  {downloadSuccess ? (
                    <>
                      <span className="material-symbols-outlined text-[22px]">check_circle</span>
                      <span>Downloading APK...</span>
                    </>
                  ) : downloading ? (
                    <>
                      <span className="material-symbols-outlined text-[22px] animate-spin">refresh</span>
                      <span>Initiating Download...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[22px]">download</span>
                      <span>Download APK</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 px-6 text-base font-bold rounded-xl bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">error</span>
                  <span>APK temporarily unavailable</span>
                </button>
              )}

              {/* Secondary Action */}
              <button
                onClick={onOpenChangelog}
                className="w-full py-3 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-blue-600">update</span>
                <span>View Release Notes</span>
              </button>

              {/* Security Badge */}
              <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                <span>Delivered from the official AnshuCore GitHub release.</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DownloadSection;
