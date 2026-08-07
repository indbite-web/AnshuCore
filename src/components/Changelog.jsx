import React, { useState } from 'react';
import { formatReleaseDate, formatFileSize, findApkAssets } from '../services/github';
import { marked } from 'marked';

export function Changelog({ isOpen, onClose, releaseData, app }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-[#F7F9FC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-[22px]">update</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Latest Updates
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {app?.name || 'Anshu Mock'} Release Timeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Release Timeline */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {releases.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
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
                      : 'bg-[#F7F9FC] border-slate-200'
                  }`}
                >
                  {/* Timeline Header Row */}
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

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3">
                      <h4 className="text-sm font-bold text-slate-900">
                        {rel.name || rel.tag_name}
                      </h4>

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

                          <a
                            href={apk.browser_download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold inline-flex items-center gap-1.5 self-start sm:self-auto"
                          >
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            <span>Download APK</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-[#F7F9FC] flex items-center justify-between text-xs text-slate-500">
          <span>Official AnshuCore GitHub Release Timeline</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Changelog;
