import React from 'react';
import { Sparkles, PlusCircle } from 'lucide-react';
import AppCard from './AppCard';
import { CONFIG } from '../config';

export function Apps({ appReleases, loading, onOpenChangelog, onRetry }) {
  return (
    <section id="apps" className="py-24 bg-[#050816] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AnshuCore Apps
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            Apps built to make things simpler.
          </h2>

          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Discover official Android applications engineered by AnshuCore for focused performance and clean user experience.
          </p>
        </div>

        {/* Scalable App Showcase List */}
        <div className="mt-16 space-y-12 max-w-4xl mx-auto">
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

          {/* Scalable Teaser Card for Future AnshuCore Apps */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-white/[0.02] to-white/[0.01] border border-dashed border-white/10 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <PlusCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              More from AnshuCore
            </h3>
            <p className="text-sm text-slate-400 max-w-md">
              New experiences are being built. Additional Android and web applications will be introduced here.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Apps;
