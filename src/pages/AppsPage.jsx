import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { CONFIG } from '../config';

export function AppsPage({ appReleases, loading, onOpenChangelog }) {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 pt-24 pb-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-blue-600">apps</span>
            <span>ANSHUCORE APPS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Apps designed around real needs.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Explore official applications engineered by AnshuCore for focused practice and modern mobile experiences.
          </p>
        </div>

        {/* Apps List */}
        <div className="mt-10 space-y-8">
          {CONFIG.apps.map((app) => {
            const releaseData = appReleases[app.id] || null;
            const {
              latestVersion = 'v1.0.0',
              latestSizeFormatted = 'N/A',
              latestDateFormatted = 'N/A',
              totalDownloads = 0,
              hasApk
            } = releaseData || {};

            return (
              <div
                key={app.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6"
              >
                {/* Header Row */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-subtle flex-shrink-0">
                    <Logo size={32} showText={false} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold text-slate-900 font-display">
                        {app.name}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                        {latestVersion}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      by <span className="text-blue-600 font-bold">{app.developer}</span> • {app.category} • {app.platform}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {app.shortDescription}
                </p>

                {/* LIVE Metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-[#F7F9FC] border border-slate-200">
                  <div>
                    <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-blue-600">new_releases</span>
                      <span>Version</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">{latestVersion}</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">download_for_offline</span>
                      <span>Downloads</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      {new Intl.NumberFormat().format(totalDownloads)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-cyan-600">calendar_month</span>
                      <span>Updated</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">{latestDateFormatted}</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-indigo-600">hard_drive</span>
                      <span>APK Size</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">{latestSizeFormatted}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to="/download/anshu-mock"
                    className="py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-subtle flex items-center justify-center gap-2 border border-blue-700/20"
                  >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    <span>Download APK</span>
                  </Link>

                  <Link
                    to="/features"
                    className="py-3.5 px-5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-subtle flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px] text-blue-600">auto_awesome</span>
                    <span>View Features</span>
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Scalable Ecosystem Expansion Teaser Card */}
          <div className="p-6 rounded-2xl bg-white border border-dashed border-slate-300 text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <span className="material-symbols-outlined text-[22px]">add_circle</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              More from AnshuCore
            </h3>
            <p className="text-xs text-slate-600 max-w-md">
              New experiences are being built. Additional Android and web applications will be introduced here.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AppsPage;
