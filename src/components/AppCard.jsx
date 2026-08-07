import React, { useState } from 'react';
import { Download, Calendar, HardDrive, ArrowDownCircle, RefreshCw, FileText, Check, AlertCircle, Smartphone } from 'lucide-react';
import Logo from './Logo';
import { trackDownload } from '../utils/analytics';
import confetti from 'canvas-confetti';

export function AppCard({ app, releaseData, loading, onOpenChangelog, onRetry }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadClick = (e) => {
    if (!releaseData?.downloadUrl) return;

    trackDownload(app.name, releaseData.latestVersion, releaseData.downloadUrl);
    setDownloading(true);

    // Trigger confetti micro-interaction
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#1D4ED8', '#2563EB', '#0080FF', '#00A3FF', '#38BDF8']
      });
    } catch (err) {
      // Ignore if confetti fails
    }

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);

      // Trigger actual browser download
      window.location.href = releaseData.downloadUrl;

      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 800);
  };

  if (loading) {
    return (
      <div className="p-8 rounded-3xl bg-[#0A1020] border border-white/10 shadow-2xl animate-pulse space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800" />
            <div className="space-y-2">
              <div className="w-32 h-6 bg-slate-800 rounded" />
              <div className="w-24 h-4 bg-slate-800/60 rounded" />
            </div>
          </div>
          <div className="w-20 h-6 bg-slate-800 rounded-full" />
        </div>
        <div className="w-full h-12 bg-slate-800/40 rounded-xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-slate-800/40 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const {
    latestVersion = 'v1.0.0',
    latestSizeFormatted = 'N/A',
    latestDateFormatted = 'N/A',
    latestDownloadCount = 0,
    totalDownloads = 0,
    downloadUrl,
    hasApk,
    error,
    isCached
  } = releaseData || {};

  return (
    <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0A1020] to-[#050816] border border-white/15 shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* App Title & Icon */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-600/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#050816] rounded-[14px] flex items-center justify-center">
              <Logo size={36} showText={false} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white font-display">
                {app.name}
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-400 font-medium border border-blue-500/30">
                {latestVersion}
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              by <span className="text-blue-400">{app.developer}</span>
            </p>
          </div>
        </div>

        {/* Android & Category Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Smartphone className="w-3.5 h-3.5" />
            {app.platform}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.04] text-slate-300 text-xs font-medium border border-white/10">
            {app.category}
          </span>
        </div>
      </div>

      {/* App Description */}
      <p className="mt-6 text-base text-slate-300 leading-relaxed">
        {app.shortDescription}
      </p>

      {/* Release Metrics Bar */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5 text-blue-400" /> APK Size
          </div>
          <div className="text-base font-bold text-white mt-1">
            {latestSizeFormatted}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Released
          </div>
          <div className="text-base font-bold text-white mt-1">
            {latestDateFormatted}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowDownCircle className="w-3.5 h-3.5 text-emerald-400" /> Latest Downloads
          </div>
          <div className="text-base font-bold text-white mt-1">
            {new Intl.NumberFormat().format(latestDownloadCount)}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowDownCircle className="w-3.5 h-3.5 text-indigo-400" /> Total Downloads
          </div>
          <div className="text-base font-bold text-cyan-400 mt-1">
            {new Intl.NumberFormat().format(totalDownloads)}
          </div>
        </div>
      </div>

      {/* Error or Cache Banner if applicable */}
      {error && !hasApk && (
        <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>APK temporarily unavailable. Please retry.</span>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-white font-medium text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          )}
        </div>
      )}

      {isCached && (
        <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1 justify-end">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Data cached from GitHub API
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        {hasApk ? (
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className={`w-full sm:flex-1 py-4 px-6 text-base font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
              downloadSuccess
                ? 'bg-emerald-600 text-white border border-emerald-400'
                : downloading
                ? 'bg-blue-700 text-white cursor-wait'
                : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border border-cyan-400/30 hover:shadow-cyan-500/30'
            }`}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 animate-bounce" />
                <span>Downloading APK...</span>
              </>
            ) : downloading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Initiating Download...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download APK ({latestSizeFormatted})</span>
              </>
            )}
          </button>
        ) : (
          <button
            disabled
            className="w-full sm:flex-1 py-4 px-6 text-base font-bold rounded-2xl bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>APK temporarily unavailable</span>
          </button>
        )}

        <button
          onClick={onOpenChangelog}
          className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md"
        >
          <FileText className="w-4 h-4 text-blue-400" />
          <span>View Changelog</span>
        </button>
      </div>

    </div>
  );
}

export default AppCard;
