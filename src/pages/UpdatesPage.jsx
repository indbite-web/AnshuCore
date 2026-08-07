import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatReleaseDate, formatFileSize, findApkAssets } from '../services/github';
import { marked } from 'marked';

export function UpdatesPage({ app, releaseData, loading }) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const releases = releaseData?.rawReleases || [];

  const renderMarkdown = (text) => {
    if (!text) return '<p>No release notes provided.</p>';
    try {
      return marked.parse(text, { breaks: true, gfm: true });
    } catch (e) {
      return text.replace(/\n/g, '<br />');
    }
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
            Latest Updates
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Track official release notes, feature updates, and improvements fetched live from GitHub.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="mt-10 space-y-4">
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
            releases.map((rel, index) => {
              const isLatest = index === 0;
              const isExpanded = expandedIndex === index;
              const apkAssets = findApkAssets(rel);
              const apk = apkAssets.length > 0 ? apkAssets[0] : null;

              return (
                <div
                  key={rel.id || index}
                  className={`rounded-2xl border transition-all ${
                    isLatest
                      ? 'bg-white border-l-4 border-l-blue-600 border-slate-200 shadow-subtle'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {/* Header */}
                  <div
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-bold text-slate-900 font-display">
                        {rel.tag_name || rel.name}
                      </span>

                      {isLatest && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-subtle">
                          Latest
                        </span>
                      )}

                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                        {formatReleaseDate(rel.published_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {apk && (
                        <span className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                          <span className="material-symbols-outlined text-[14px] text-blue-600">download_for_offline</span>
                          {new Intl.NumberFormat().format(apk.download_count)} downloads
                        </span>
                      )}

                      <button className="text-slate-400 hover:text-slate-700">
                        <span className="material-symbols-outlined text-[20px]">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3">
                      <h2 className="text-sm font-bold text-slate-900">
                        {rel.name || rel.tag_name}
                      </h2>

                      <div
                        className="text-sm text-slate-600 leading-relaxed space-y-1 prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(rel.body)
                        }}
                      />

                      {apk && (
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F7F9FC] p-3 rounded-xl border border-slate-200 text-xs">
                          <span className="font-mono font-medium text-slate-700">
                            {apk.name} ({formatFileSize(apk.size)})
                          </span>

                          <Link
                            to="/download/anshu-mock"
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold inline-flex items-center gap-1.5 self-start sm:self-auto"
                          >
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            <span>Download APK</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

export default UpdatesPage;
