import React, { useState } from 'react';
import { formatReleaseDate, formatFileSize, findApkAssets } from '../services/github';
import { marked } from 'marked';
import { trackDownload } from '../utils/analytics';

export function UpdatesPage({ app, releaseData, loading }) {
  const [expandedIds, setExpandedIds] = useState({});

  const releases = releaseData?.rawReleases || [];
  const latestRelease = releases.length > 0 ? releases[0] : null;
  const previousReleases = releases.length > 1 ? releases.slice(1) : [];

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  const renderReleaseCard = (rel, isLatest) => {
    const apkAssets = findApkAssets(rel);
    const apk = apkAssets.length > 0 ? apkAssets[0] : null;
    const tagName = rel.tag_name || rel.name || 'v1.0.0';
    const isExpanded = Boolean(expandedIds[rel.id]);

    return (
      <div
        key={rel.id}
        className={`rounded-3xl border transition-all duration-200 bg-white overflow-hidden ${
          isLatest
            ? 'border-l-4 border-l-blue-600 border-slate-200 shadow-card'
            : 'border-slate-200 shadow-subtle hover:border-slate-300'
        }`}
      >
        {/* Main Card Content (Visible Immediately) */}
        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Anshu Mock {tagName}
                </h3>

                {isLatest ? (
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-subtle uppercase tracking-wide">
                    Latest Release
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold">
                    Previous Version
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                Released on {formatReleaseDate(rel.published_at)}
              </p>
            </div>

            <div className="font-mono text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              {tagName}
            </div>
          </div>

          {/* Key Metrics Row (APK Size & Live GitHub Download Count) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F7F9FC] border border-slate-200/90 text-xs">
            <div>
              <div className="text-slate-500 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-blue-600">new_releases</span>
                <span>Version</span>
              </div>
              <div className="font-bold text-slate-900 mt-0.5">{tagName}</div>
            </div>

            <div>
              <div className="text-slate-500 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">hard_drive</span>
                <span>APK Size</span>
              </div>
              <div className="font-bold text-slate-900 mt-0.5">
                {apk ? formatFileSize(apk.size) : 'N/A'}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="text-slate-500 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-indigo-600">download_for_offline</span>
                <span>Downloads</span>
              </div>
              <div className="font-bold text-slate-900 mt-0.5">
                {apk ? new Intl.NumberFormat().format(apk.download_count || 0) : 0}
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            {apk ? (
              <a
                href={apk.browser_download_url}
                onClick={() => trackDownload(app?.name || 'Anshu Mock', tagName, apk.browser_download_url)}
                className="py-3 px-5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-subtle transition-all duration-150 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Download APK ({formatFileSize(apk.size)})</span>
              </a>
            ) : (
              <button
                disabled
                className="py-3 px-5 text-sm font-bold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>APK Unavailable</span>
              </button>
            )}

            <button
              onClick={() => toggleExpand(rel.id)}
              className="py-3 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-blue-600">
                {isExpanded ? 'visibility_off' : 'description'}
              </span>
              <span>{isExpanded ? 'Hide Release Notes' : 'View Release Notes'}</span>
              <span className="material-symbols-outlined text-[16px] text-slate-400">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>

        </div>

        {/* Collapsible Release Notes (Strictly isolated per release) */}
        {isExpanded && (
          <div className="px-6 pb-6 pt-0 border-t border-slate-100">
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Release Notes for {tagName}</span>
                <span className="font-mono text-[11px] normal-case text-slate-400">
                  {formatReleaseDate(rel.published_at)}
                </span>
              </div>

              <div
                className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 prose prose-slate max-w-none bg-white p-4 rounded-xl border border-slate-200"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(rel.body)
                }}
              />
            </div>
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
            <div className="p-8 bg-white rounded-3xl animate-pulse space-y-4 border border-slate-200">
              <div className="h-6 bg-slate-200 rounded w-1/3" />
              <div className="h-20 bg-slate-100 rounded-xl" />
            </div>
          ) : releases.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
              <p>No release notes available at this moment.</p>
            </div>
          ) : (
            <>
              {/* LATEST RELEASE SECTION */}
              {latestRelease && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-blue-700 uppercase tracking-wider px-1">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>LATEST RELEASE</span>
                  </div>

                  {renderReleaseCard(latestRelease, true)}
                </div>
              )}

              {/* PREVIOUS VERSIONS SECTION */}
              {previousReleases.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600 uppercase tracking-wider px-1">
                    <span className="material-symbols-outlined text-[18px]">history</span>
                    <span>PREVIOUS VERSIONS</span>
                  </div>

                  <div className="space-y-5">
                    {previousReleases.map((rel) => renderReleaseCard(rel, false))}
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
