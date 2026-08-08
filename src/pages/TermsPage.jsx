import React from 'react';
import { Link } from 'react-router-dom';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 pt-24 pb-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-blue-600">gavel</span>
            <span>TERMS & CONDITIONS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Terms of Service
          </h1>

          <p className="mt-2 text-xs font-mono font-semibold text-slate-500">
            Last Updated: August 8, 2026
          </p>
        </div>

        {/* Terms Document Content Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            By accessing the AnshuCore website or using an AnshuCore application, you agree to use the services responsibly and in accordance with these Terms of Service.
          </p>

          {/* Section 1 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Use of Our Services
            </h2>
            <p>You may use AnshuCore websites and applications for their intended purposes.</p>
            <p className="font-semibold text-slate-800">You must not:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Attempt to disrupt or damage our services.</li>
              <li>Attempt unauthorized access to systems or accounts.</li>
              <li>Reverse engineer or misuse services where prohibited by applicable law.</li>
              <li>Upload or distribute malicious content through our services.</li>
              <li>Use our services for unlawful purposes.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Anshu Mock
            </h2>
            <p>
              Anshu Mock is an exam preparation and mock-test application. The application is intended to assist with practice and preparation.
            </p>
            <p>
              Anshu Mock does not guarantee examination results, selection, employment or any specific academic outcome.
            </p>
            <p>
              Users should independently verify important examination information, dates, eligibility requirements and official notifications from the relevant authority.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              APK Downloads
            </h2>
            <p>
              Official Android APK releases may be distributed through GitHub Releases. Different application versions may be available.
            </p>
            <p>
              AnshuCore may release updates, improvements, fixes or discontinue older versions when necessary.
            </p>
            <p>
              Users should preferably use the latest stable version available through the official AnshuCore website or official release channel.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Intellectual Property
            </h2>
            <p>
              The AnshuCore name, logo, branding, website design, application interfaces and original content are owned by or used by AnshuCore unless otherwise stated.
            </p>
            <p>
              You may not reproduce or redistribute proprietary content without appropriate permission, except where permitted by applicable law or an applicable open-source license.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Third-Party Services
            </h2>
            <p>
              AnshuCore may link to or use third-party services. Third-party services operate under their own terms and policies.
            </p>
            <p>
              AnshuCore is not responsible for changes to third-party services that are outside our control.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Availability
            </h2>
            <p>
              We aim to keep our services available and reliable, but we do not guarantee uninterrupted availability. Services may occasionally be unavailable because of:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>Maintenance</li>
              <li>Updates</li>
              <li>Technical problems</li>
              <li>Third-party outages</li>
              <li>Network problems</li>
              <li>Other circumstances beyond our reasonable control</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Changes to Services & Terms
            </h2>
            <p>
              AnshuCore may modify, update, add or remove features as products evolve.
            </p>
            <p>
              These Terms may be updated from time to time. The latest version will be published on this page.
            </p>
          </div>

          {/* Section 8: Contact */}
          <div className="space-y-3 pt-4 border-t border-slate-200 bg-[#F7F9FC] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Contact
            </h2>
            <p className="text-xs text-slate-600">
              For questions regarding these Terms, contact:
            </p>
            <div className="text-sm font-semibold text-slate-900">
              <div>AnshuCore</div>
              <a
                href="mailto:Corexanshu@gmail.com"
                className="text-blue-600 hover:text-blue-700 underline font-bold mt-1 inline-block"
              >
                Corexanshu@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default TermsPage;
