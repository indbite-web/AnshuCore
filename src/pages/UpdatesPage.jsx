import React, { useState } from 'react';
import { formatReleaseDate, formatFileSize, findApkAssets } from '../services/github';
import { marked } from 'marked';

export function UpdatesPage({ app, releaseData, loading }) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const releases = releaseData?.rawReleases || [];

  const latestRelease = releases.length > 0 ? releases[0] : null;
  const previousReleases = releases.length > 1 ? releases.slice(1) : [];

  const renderMarkdown = (text) => {
    if (!text) return '<p>No release notes provided.</p>';
    try {
      return marked.parse(text, { breaks: true, gfm: true });
    } catch (e) {
      return text.replace(/\n/g, '<br />');
    }
  };

  const renderReleaseCard = (rel, globalIndex, isLatest) => {
    const isExpanded = expandedIndex === globalIndex;
    const apkAssets = findApkAssets(rel);
    const apk = apkAssets.length > 0 ? apkAssets[0] : null;
    const tagName = rel.tag_name || rel.name || 'v1.0.0';

    return (
      <div
        key={rel.id || globalIndex}
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          isLatest
            ? 'bg-white border-l-4 border-l-blue-600 border-slate-200 shadow-card'
            : 'bg-white border-slate-200 shadow-subtle hover:border-slate-300'
        }`}
      >
        {/* Header Row */}
        <div
          onClick={() => setExpandedIndex(isExpanded ? -1 : globalIndex)}
          className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Anshu Mock {tagName}
              </h3>

              {isLatest ? (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-subtle uppercase tracking-wide">
                  Latest
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold">
                  Previous Version
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-0.5 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-blue-600">new_releases</span>
                Version: <strong className="text-slate-700">{tagName}</strong>
              </span>

              {apk && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">hard_drive</span>
                  APK: <strong className="text-slate-700">{formatFileSize(apk.size)}</strong>
                </span>
              )}

              {apk && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-indigo-600">download_for_offline</span>
                  Downloads: <strong className="text-slate-700">{new Intl.NumberFormat().format(apk.download_count || 0)}</strong>
                </span>
              )}

              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-slate-400">calendar_month</span>
                Released: <strong className="text-slate-700">{formatReleaseDate(rel.published_at)}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
            {apk && (
              <a
                href={apk.browser_download_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-subtle transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download {tagName}</span>
              </a>
            )}

            <button className="p-1 text-slate-400 hover:text-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[22px]">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Expanded Details / Release Notes */}
        {isExpanded && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 bg-[#F8FAFC]">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Release Notes & Changes
            </h4>

            <div
              className="text-sm text-slate-700 leading-relaxed space-y-2 prose prose-slate max-w-none bg-white p-4 rounded-xl border border-slate-200"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(rel.body)
              }}
            />

            {apk && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">android</span>
                  <span className="font-mono font-medium text-slate-800">
                    {apk.name}
                  </span>
                  <span className="text-slate-500">
                    ({formatFileSize(apk.size)} • {new Intl.NumberFormat().format(apk.download_count || 0)} downloads)
                  </span>
                </div>

                <a
                  href={apk.browser_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-subtle transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Download {apk.name}</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 pt-24 pb-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-blue-600">update</span>
            <span>CHANGELOG & RELEASES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Updates & Previous Versions
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Official release notes and APK download links for all versions of Anshu Mock, fetched dynamically from GitHub.
          </p>
        </div>

        {/* Content Container */}
        <div className="mt-10 space-y-8">
          {loading ? (
            <div className="p-8 bg-white rounded-2xl animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-20 bg-slate-100 rounded-xl" />
            </div>
          ) : releases.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
              <p>No release notes available at this moment.</p>
            </div>
          ) : (
            <>
              {/* LATEST SECTION */}
              {latestRelease && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700 uppercase tracking-wider px-1">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>LATEST RELEASE</span>
                  </div>

                  {renderReleaseCard(latestRelease, 0, true)}
                </div>
              )}

              {/* PREVIOUS VERSIONS SECTION */}
              {previousReleases.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600 uppercase tracking-wider px-1">
                    <span className="material-symbols-outlined text-[18px]">history</span>
                    <span>PREVIOUS VERSIONS</span>
                  </div>

                  <div className="space-y-4">
                    {previousReleases.map((rel, index) =>
                      renderReleaseCard(rel, index + 1, false)
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default UpdatesPage;
