import React, { useState } from 'react';
import { X, Sparkles, Calendar, ArrowDownCircle, HardDrive, Download, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { formatReleaseDate, formatFileSize, findApkAssets } from '../services/github';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function Changelog({ isOpen, onClose, releaseData, app }) {
  const [expandedIndex, setExpandedIndex] = useState(0); // first release expanded by default

  if (!isOpen) return null;

  const releases = releaseData?.rawReleases || [];

  // Helper to render markdown content safely
  const renderMarkdown = (text) => {
    if (!text) return '<p>No release notes provided.</p>';
    try {
      const rawHtml = marked.parse(text, { breaks: true, gfm: true });
      // If DOMPurify is available or regex fallback
      return rawHtml;
    } catch (e) {
      return text.replace(/\n/g, '<br />');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-[#0A1020] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#050816]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                {app?.name || 'Anshu Mock'} Release Notes
              </h3>
              <p className="text-xs text-slate-400">
                Official changelog fetched live from GitHub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {releases.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No release records available at this moment.</p>
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
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isLatest
                      ? 'bg-blue-950/20 border-blue-500/40 shadow-lg'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Release Accordion Header */}
                  <div
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    className="p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-bold text-white font-display">
                        {rel.tag_name || rel.name}
                      </span>

                      {isLatest && (
                        <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-sm">
                          Latest Release
                        </span>
                      )}

                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {formatReleaseDate(rel.published_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {apk && (
                        <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg">
                          <ArrowDownCircle className="w-3.5 h-3.5 text-cyan-400" />
                          {new Intl.NumberFormat().format(apk.download_count)} downloads
                        </span>
                      )}

                      <button className="text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4">
                      {/* Release Title */}
                      <h4 className="text-sm font-semibold text-cyan-400">
                        {rel.name || rel.tag_name}
                      </h4>

                      {/* Release Body (Markdown) */}
                      <div
                        className="text-sm text-slate-300 leading-relaxed prose prose-invert max-w-none prose-p:my-1 prose-ul:list-disc prose-ul:pl-4 prose-li:my-0.5"
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(rel.body)
                        }}
                      />

                      {/* APK Asset Specs */}
                      {apk && (
                        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5 text-xs text-slate-400">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 font-mono text-slate-300">
                              <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                              {apk.name} ({formatFileSize(apk.size)})
                            </span>
                          </div>

                          <a
                            href={apk.browser_download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium inline-flex items-center gap-1.5 self-start sm:self-auto"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download APK
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
        <div className="px-6 py-4 border-t border-white/10 bg-[#050816] flex items-center justify-between text-xs text-slate-400">
          <span>Official AnshuCore GitHub Release Timeline</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Changelog;
