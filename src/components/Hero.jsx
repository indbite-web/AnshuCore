import React from 'react';
import { Download, Sparkles, Smartphone, ChevronRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Logo from './Logo';

export function Hero({ onDownloadClick, onExploreClick }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#050816]"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-blue-800/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Main Product Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-blue-500/30 text-blue-400 text-sm font-medium mb-6 backdrop-blur-md shadow-lg shadow-blue-900/10">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Introducing Anshu Mock</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-xs text-slate-400">by AnshuCore</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
              Smarter Mock Tests.{' '}
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
                Better Preparation.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              <strong className="text-white font-semibold">Anshu Mock</strong> by AnshuCore brings intelligent exam preparation, AI-powered question generation and a modern mock-test experience into one powerful Android app.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onDownloadClick}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 border border-cyan-300/30 group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Anshu Mock</span>
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-4 text-base font-medium text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 group backdrop-blur-md"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Platform & Trust Badge */}
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Available for Android</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Official Release</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Outer Decorative Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 rounded-3xl blur-2xl transform rotate-6 scale-95" />

            {/* Floating Phone Frame Visual */}
            <div className="relative w-full max-w-sm bg-[#0A1020] border border-white/15 rounded-[38px] p-4 shadow-2xl shadow-blue-950/60 backdrop-blur-xl">
              
              {/* Phone Top Notch Bar */}
              <div className="w-32 h-4 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center gap-2 border border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>

              {/* Simulated App Screen */}
              <div className="bg-[#050816] border border-white/10 rounded-[28px] p-5 space-y-4 overflow-hidden relative">
                
                {/* Mock Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Logo size={24} showText={false} />
                    <span className="text-xs font-bold text-white tracking-wider">ANSHU MOCK</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    v1.0.0
                  </span>
                </div>

                {/* Mock AI Question Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900/60 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Question Generator
                    </span>
                    <span>Q 12 / 50</span>
                  </div>
                  <p className="text-xs text-white font-medium leading-snug">
                    Which data structure provides O(1) average time complexity for lookups?
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {['Binary Search Tree', 'Hash Table (Selected)', 'Linked List', 'Array List'].map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-xl text-[11px] flex items-center justify-between ${
                          i === 1
                            ? 'bg-blue-600/40 border border-blue-400 text-white font-semibold'
                            : 'bg-white/[0.03] text-slate-400 border border-white/5'
                        }`}
                      >
                        <span>{opt}</span>
                        {i === 1 && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mock Analytics Summary */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] text-slate-400">Accuracy Rate</div>
                    <div className="text-base font-bold text-cyan-400 mt-0.5">94.2%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] text-slate-400">Practice Score</div>
                    <div className="text-base font-bold text-blue-400 mt-0.5">480 / 500</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Overlay */}
              <div className="absolute -bottom-4 -left-4 bg-[#0A1020]/90 border border-cyan-500/30 backdrop-blur-md rounded-2xl p-3 shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Direct APK Download</div>
                  <div className="text-[10px] text-slate-400">Official GitHub Release</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
