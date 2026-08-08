import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ShaderGradientCanvas from '../components/ShaderGradientCanvas';
import { trackDownload } from '../utils/analytics';
import confetti from 'canvas-confetti';
import { marked } from 'marked';
import { findApkAssets, formatFileSize, formatReleaseDate } from '../services/github';

export function DownloadPage({ app, releaseData, loading }) {
  const [showPreviousVersions, setShowPreviousVersions] = useState(false);
  const [selectedReleaseForNotes, setSelectedReleaseForNotes] = useState(null);

  const renderMarkdown = (text) => {
    if (!text || !text.trim()) {
      return '<p class="text-slate-400 italic">No release notes provided for this version.</p>';
    }
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
            Get the official Android release directly from our GitHub repository.
          </p>
        </div>

        {/* Main Download Card (Primary Focus - LATEST Version) */}
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
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Latest Version
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold font-mono">
                  {latestVersion}
                </span>
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
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">storage</span>
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
              {hasApk && downloadUrl ? (
                <a
                  href={downloadUrl}
                  onClick={() => {
                    trackDownload(app?.name || 'Anshu Mock', latestVersion, downloadUrl);
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
                  }}
                  className="w-full py-4 px-6 text-base font-bold rounded-xl shadow-subtle transition-all duration-200 flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700/20 active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[22px]">download</span>
                  <span>Download APK</span>
                </a>
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

        {/* COMPACT COLLAPSIBLE PREVIOUS VERSIONS SECTION (Section 2 & 3 Requirement) */}
        {previousReleases.length > 0 && (
          <div className="mt-6 max-w-lg mx-auto space-y-3">
            
            {/* Collapsible Header Toggle */}
            <button
              onClick={() => setShowPreviousVersions(!showPreviousVersions)}
              className="w-full p-4 rounded-2xl bg-white text-slate-900 shadow-lg border border-slate-200/90 flex items-center justify-between font-bold text-sm select-none transition-all hover:bg-slate-50 active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-blue-600">history</span>
                <span>Previous Versions</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono border border-slate-200">
                  {previousReleases.length}
                </span>
              </div>

              <span className="material-symbols-outlined text-[22px] text-slate-500">
                {showPreviousVersions ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Expanded Compact List */}
            {showPreviousVersions && (
              <div className="p-5 rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200 space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-500 font-semibold">
                  <span>Older Release Archives</span>
                  <Link to="/updates" className="text-blue-600 hover:underline flex items-center gap-0.5">
                    <span>Full Changelog</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>

                <div className="space-y-3">
                  {previousReleases.map((rel) => {
                    const apkAssets = findApkAssets(rel);
                    const apk = apkAssets.length > 0 ? apkAssets[0] : null;
                    const tagName = rel.tag_name || rel.name || 'v1.0.0';

                    return (
                      <div
                        key={rel.id}
                        className="p-4 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 space-y-3"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 font-mono text-base">
                              {tagName}
                            </span>
                          </div>

                          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                            {formatReleaseDate(rel.published_at)}
                          </span>
                        </div>

                        {/* Compact Stats Row */}
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 flex-wrap">
                          {apk && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-emerald-600">storage</span>
                              <span>{formatFileSize(apk.size)}</span>
                            </span>
                          )}

                          {apk && (
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-indigo-600">download_for_offline</span>
                              <span>{new Intl.NumberFormat().format(apk.download_count || 0)} Downloads</span>
                            </span>
                          )}
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center gap-2 pt-1">
                          {apk ? (
                            <a
                              href={apk.browser_download_url}
                              onClick={() => trackDownload(app?.name || 'Anshu Mock', tagName, apk.browser_download_url)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-subtle transition-all"
                            >
                              <span className="material-symbols-outlined text-[16px]">download</span>
                              <span>Download {tagName}</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 italic">APK Unavailable</span>
                          )}

                          <button
                            onClick={() => setSelectedReleaseForNotes(rel)}
                            className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px] text-blue-600">description</span>
                            <span className="hidden sm:inline">Notes</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Isolated Release Notes Modal for Older Releases */}
        {selectedReleaseForNotes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div
              className="relative w-full max-w-xl bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#F7F9FC]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-blue-600">description</span>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Release Notes — {selectedReleaseForNotes.tag_name || selectedReleaseForNotes.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedReleaseForNotes(null)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs sm:text-sm text-slate-700 leading-relaxed prose prose-slate max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(selectedReleaseForNotes.body)
                  }}
                />
              </div>

              <div className="px-6 py-3.5 border-t border-slate-200 bg-[#F7F9FC] flex justify-end">
                <button
                  onClick={() => setSelectedReleaseForNotes(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DownloadPage;
