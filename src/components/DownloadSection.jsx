import React, { useState } from 'react';
import { Download, ShieldCheck, FileText, Check, Smartphone, ArrowDownCircle, HardDrive, Calendar } from 'lucide-react';
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
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#1D4ED8', '#2563EB', '#0080FF', '#00A3FF', '#38BDF8']
      });
    } catch (e) {
      // Ignore confetti error
    }

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      window.location.href = downloadUrl;
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 800);
  };

  return (
    <section id="download" className="py-24 bg-[#050816] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Card Frame */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#0A1020] via-[#050816] to-[#0A1020] border border-blue-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto">
            {/* Logo Badge */}
            <div className="inline-flex p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-6">
              <Logo size={48} showText={false} />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Ready to start practicing?
            </h2>

            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              Download the latest official version of <strong className="text-white">Anshu Mock</strong> for Android.
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
            <div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-blue-400" /> Version
              </div>
              <div className="text-base font-bold text-white mt-1">{latestVersion}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" /> APK Size
              </div>
              <div className="text-base font-bold text-white mt-1">{latestSizeFormatted}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Updated
              </div>
              <div className="text-base font-bold text-white mt-1">{latestDateFormatted}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <ArrowDownCircle className="w-3.5 h-3.5 text-indigo-400" /> Total Downloads
              </div>
              <div className="text-base font-bold text-cyan-400 mt-1">
                {new Intl.NumberFormat().format(totalDownloads)}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            {hasApk ? (
              <button
                onClick={handleDownload}
                disabled={downloading}
                className={`w-full sm:flex-1 py-4 px-8 text-base font-bold rounded-2xl shadow-xl transition-all duration-200 flex items-center justify-center gap-3 ${
                  downloadSuccess
                    ? 'bg-emerald-600 text-white'
                    : downloading
                    ? 'bg-blue-700 text-white cursor-wait'
                    : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-600/30 hover:shadow-cyan-500/40 border border-cyan-300/30'
                }`}
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    <span>Downloading APK...</span>
                  </>
                ) : downloading ? (
                  <span>Initiating Download...</span>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download APK</span>
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="w-full sm:flex-1 py-4 px-8 text-base font-bold rounded-2xl bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed text-center"
              >
                APK temporarily unavailable
              </button>
            )}

            <button
              onClick={onOpenChangelog}
              className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Release Notes</span>
            </button>
          </div>

          {/* Transparency & Security Notice */}
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>APK delivered directly from the official AnshuCore GitHub release.</span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DownloadSection;
