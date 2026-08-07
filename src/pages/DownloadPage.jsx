import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ShaderGradientCanvas from '../components/ShaderGradientCanvas';
import { trackDownload } from '../utils/analytics';
import confetti from 'canvas-confetti';
import { marked } from 'marked';

export function DownloadPage({ app, releaseData, loading }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const {
    latestVersion = 'v1.0.0',
    latestSizeFormatted = 'N/A',
    latestDateFormatted = 'N/A',
    latestDownloadCount = 0,
    totalDownloads = 0,
    latestRelease,
    downloadUrl,
    hasApk,
    error
  } = releaseData || {};

  const handleDownload = () => {
    if (!downloadUrl) return;

    trackDownload(app?.name || 'Anshu Mock', latestVersion, downloadUrl);
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

  const renderMarkdown = (text) => {
    if (!text) return '<p>No release notes provided.</p>';
    try {
      return marked.parse(text, { breaks: true, gfm: true });
    } catch (e) {
      return text.replace(/\n/g, '<br />');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white pt-24 pb-20 relative overflow-hidden">
      {/* Calm WebGL Shader Background */}
      <ShaderGradientCanvas speed={0.2} frequency={0.6} amplitude={0.2} variant="calm" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/90 via-[#0B1F3A]/80 to-[#0B1F3A] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Breadcrumb Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-subtle border border-white/10">
              <Logo size={28} showText={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white font-display">
                  Anshu Mock
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Android
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-300">
                by <span className="text-blue-400 font-bold">AnshuCore</span>
              </p>
            </div>
          </div>

          <Link
            to="/apps"
            className="text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg border border-white/15 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Apps</span>
          </Link>
        </div>

        {/* Headline Section */}
        <div className="mt-8 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>OFFICIAL APK DOWNLOAD</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Download Anshu Mock
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Get the latest official version of Anshu Mock for Android directly from our GitHub release repository.
          </p>
        </div>

        {/* Main Download Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white text-slate-900 shadow-2xl space-y-6 max-w-lg mx-auto">
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/2" />
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-slate-100 rounded-xl" />)}
              </div>
              <div className="h-12 bg-slate-200 rounded-xl" />
            </div>
          ) : (
            <>
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
                    <span>Latest Downloads</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {new Intl.NumberFormat().format(latestDownloadCount)}
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

              {/* Total Downloads Summary Row */}
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                <span className="font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-blue-600">analytics</span>
                  Total Historical Downloads
                </span>
                <span className="font-extrabold text-blue-700 text-sm">
                  {new Intl.NumberFormat().format(totalDownloads)}
                </span>
              </div>

              {/* Large Primary Download APK Button */}
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

              {/* Security Badge Notice */}
              <div className="text-center flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                <span>Official release delivered through AnshuCore's GitHub repository.</span>
              </div>
            </>
          )}

          {error && !hasApk && (
            <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200 text-center">
              <span>APK temporarily unavailable. Please retry later.</span>
            </div>
          )}

        </div>

        {/* Latest Release Notes Teaser */}
        {latestRelease && (
          <div className="mt-10 max-w-lg mx-auto p-6 rounded-2xl bg-white/10 border border-white/15 text-slate-200 backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-blue-400">update</span>
                Latest Release Notes ({latestVersion})
              </h4>
              <Link
                to="/updates"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
              >
                <span>View all updates</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            <div
              className="text-xs text-slate-300 leading-relaxed max-h-32 overflow-y-auto custom-scrollbar pr-2"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(latestRelease.body)
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default DownloadPage;
