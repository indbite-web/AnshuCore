import React from 'react';
import AppCard from './AppCard';
import { CONFIG } from '../config';

export function Apps({ appReleases, loading, onOpenChangelog, onRetry }) {
  return (
    <section id="apps" className="py-20 md:py-28 bg-[#F7F9FC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px] text-blue-600">apps</span>
            <span>ANSHUCORE APPS</span>
          </div>

          <h2 className="text-section-heading font-bold text-slate-900 font-display">
            Software designed around real needs.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Discover official applications engineered by AnshuCore for focused practice and high-performance digital tools.
          </p>
        </div>

        {/* Featured Product Block Showcase */}
        <div className="mt-16 space-y-12 max-w-5xl mx-auto">
          {CONFIG.apps.map((app) => {
            const releaseData = appReleases[app.id] || null;
            return (
              <AppCard
                key={app.id}
                app={app}
                releaseData={releaseData}
                loading={loading}
                onOpenChangelog={() => onOpenChangelog(app)}
                onRetry={() => onRetry(app)}
              />
            );
          })}

          {/* Scalable Ecosystem Expansion Teaser Card */}
          <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-300 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <span className="material-symbols-outlined text-[24px]">add_circle</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              More from AnshuCore
            </h3>
            <p className="text-sm text-slate-600 max-w-md">
              New experiences are being built. Additional Android and web applications will be introduced here.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Apps;
