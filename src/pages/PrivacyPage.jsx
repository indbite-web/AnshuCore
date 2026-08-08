import React from 'react';
import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 pt-24 pb-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-[16px] text-blue-600">policy</span>
            <span>LEGAL & TRANSPARENCY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-2 text-xs font-mono font-semibold text-slate-500">
            Last Updated: August 8, 2026
          </p>
        </div>

        {/* Policy Document Content Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            AnshuCore respects your privacy and is committed to being transparent about how information may be handled when you use our website and applications.
          </p>

          <p>
            This Privacy Policy explains how information may be collected, used and protected when you visit the AnshuCore website or use an AnshuCore application such as Anshu Mock.
          </p>

          {/* Section 1 */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Information We May Collect
            </h2>
            <p>Depending on the product and features you use, information may include:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Information you voluntarily provide, such as profile information.</li>
              <li>App usage and interaction information required to provide application functionality.</li>
              <li>Technical information such as device type, operating system and application version when technically necessary.</li>
              <li>Information required to diagnose errors, crashes or technical problems.</li>
            </ul>
            <p className="text-xs text-slate-500 italic pt-1">
              We do not claim to collect information that the application does not actually request or process.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              How Information Is Used
            </h2>
            <p>Information may be used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Provide and improve application functionality.</li>
              <li>Personalize the user experience.</li>
              <li>Maintain application security and reliability.</li>
              <li>Diagnose technical problems.</li>
              <li>Improve performance and user experience.</li>
              <li>Provide updates and support.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Third-Party Services
            </h2>
            <p>
              AnshuCore products may use third-party services such as hosting, analytics, APIs or distribution platforms when required for functionality.
            </p>
            <p>
              Third-party services may process information according to their own privacy policies. For example, APK releases may be distributed through GitHub Releases.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Data Security
            </h2>
            <p>
              We take reasonable measures to protect information handled by our services. However, no internet-based service can guarantee absolute security.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Children's Privacy
            </h2>
            <p>
              Our services are not intentionally designed to collect personal information from children without appropriate authorization. If you believe that personal information has been provided improperly, contact us so the matter can be reviewed.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Data Retention
            </h2>
            <p>
              Information is retained only for as long as reasonably necessary for the relevant functionality, security, legal requirements or legitimate operational purposes.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Changes to This Policy
            </h2>
            <p>
              This Privacy Policy may be updated as AnshuCore products and services evolve. Updated versions will be published on this page with a revised date.
            </p>
          </div>

          {/* Section 8: Contact */}
          <div className="space-y-3 pt-4 border-t border-slate-200 bg-[#F7F9FC] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Contact
            </h2>
            <p className="text-xs text-slate-600">
              For privacy-related questions, contact:
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

export default PrivacyPage;
