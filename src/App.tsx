/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BackgroundGrid } from './components/BackgroundGrid';
import { Globe } from './components/Globe';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-[#f8fafc] overflow-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <BackgroundGrid />

      {/* Overlay Content */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12 lg:p-16 z-10">
        <header className="flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
            NEXUS
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors pointer-events-auto">Platform</a>
            <a href="#" className="hover:text-slate-900 transition-colors pointer-events-auto">Solutions</a>
            <a href="#" className="hover:text-slate-900 transition-colors pointer-events-auto">Company</a>
          </nav>
          <button className="pointer-events-auto relative px-6 py-2.5 bg-white text-slate-900 text-sm font-medium hover:bg-slate-50 transition-colors border border-slate-200 group">
            {/* Top Left Corner */}
            <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-slate-400 transition-colors group-hover:border-indigo-500 pointer-events-none" />
            {/* Top Right Corner */}
            <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-slate-400 transition-colors group-hover:border-indigo-500 pointer-events-none" />
            {/* Bottom Left Corner */}
            <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-slate-400 transition-colors group-hover:border-indigo-500 pointer-events-none" />
            {/* Bottom Right Corner */}
            <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-slate-400 transition-colors group-hover:border-indigo-500 pointer-events-none" />
            Get Started
          </button>
        </header>

        <main className="hidden max-w-3xl pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Interactive Preview
          </div>
          
          {/* Blurred Header */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6 blur-[10px] bg-slate-200/40 rounded-3xl p-4 -ml-4 opacity-80 select-none">
            Global scale,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              refined precision.
            </span>
          </h1>
          
          {/* Blurred Subheader */}
          <p className="text-lg md:text-xl text-slate-500 max-w-md leading-relaxed blur-[6px] bg-slate-200/40 rounded-2xl p-4 -ml-4 opacity-80 select-none">
            Interact with the globe to explore our worldwide infrastructure. Built for performance, designed for elegance.
          </p>
        </main>

        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-xs text-slate-500 font-medium uppercase tracking-wider">
          <div className="relative flex items-center gap-4 px-5 py-3 bg-white/20 backdrop-blur-md border-[0.5px] border-slate-300/80 shadow-sm">
            {/* Top Left Corner */}
            <span className="absolute -top-[0.5px] -left-[0.5px] w-2 h-2 border-t border-l border-slate-400 pointer-events-none" />
            {/* Top Right Corner */}
            <span className="absolute -top-[0.5px] -right-[0.5px] w-2 h-2 border-t border-r border-slate-400 pointer-events-none" />
            {/* Bottom Left Corner */}
            <span className="absolute -bottom-[0.5px] -left-[0.5px] w-2 h-2 border-b border-l border-slate-400 pointer-events-none" />
            {/* Bottom Right Corner */}
            <span className="absolute -bottom-[0.5px] -right-[0.5px] w-2 h-2 border-b border-r border-slate-400 pointer-events-none" />
            <span>Scroll to zoom</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Drag to rotate</span>
          </div>
          <div className="relative flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-md border-[0.5px] border-slate-300/80 shadow-sm">
            {/* Top Left Corner */}
            <span className="absolute -top-[0.5px] -left-[0.5px] w-2 h-2 border-t border-l border-slate-400 pointer-events-none" />
            {/* Top Right Corner */}
            <span className="absolute -top-[0.5px] -right-[0.5px] w-2 h-2 border-t border-r border-slate-400 pointer-events-none" />
            {/* Bottom Left Corner */}
            <span className="absolute -bottom-[0.5px] -left-[0.5px] w-2 h-2 border-b border-l border-slate-400 pointer-events-none" />
            {/* Bottom Right Corner */}
            <span className="absolute -bottom-[0.5px] -right-[0.5px] w-2 h-2 border-b border-r border-slate-400 pointer-events-none" />
            System Status: <span className="text-emerald-500">Optimal</span>
          </div>
        </footer>
      </div>

      {/* 3D Globe Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
        <div className="w-[800px] h-[800px] max-w-[150vw] max-h-[150vh] opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <Globe />
        </div>
      </div>
    </div>
  );
}
