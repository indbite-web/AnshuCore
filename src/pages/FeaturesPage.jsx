import React from 'react';
import { Link } from 'react-router-dom';
import Features from '../components/Features';

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-20 pb-20">
      {/* Existing Features Component */}
      <Features />

      {/* Bottom CTA Banner */}
      <div className="max-w-4xl mx-auto px-4 mt-12 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B1F3A] text-white shadow-xl space-y-4">
          <h3 className="text-2xl font-bold font-display">
            Ready to start practicing?
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Get the latest official version of Anshu Mock for Android and start improving your test prep today.
          </p>
          <div className="pt-2">
            <Link
              to="/download/anshu-mock"
              className="px-6 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-subtle inline-flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-blue-600">download</span>
              <span>Download Anshu Mock</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
