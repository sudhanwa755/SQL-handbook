import React from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import GlassDock from './ui/GlassDock';

export function Topbar({ 
  dockItems,
  isMobile,
  totalChapters, 
  totalQuestions,
  isSidebarOpen,
  onToggleSidebar
}) {
  return (
    <header className="topbar-wrapper">
      {/* Left: macOS Traffic Lights & Mobile Hamburger */}
      <div className="window-dots-group">
        <button 
          className="mobile-menu-btn" 
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close navigation sidebar" : "Open navigation sidebar"}
          title="Toggle curriculum sidebar"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red" title="Close"></span>
          <span className="window-dot dot-yellow" title="Minimize"></span>
          <span className="window-dot dot-green" title="Maximize"></span>
        </div>

        <span className="mobile-brand-title font-mono font-bold text-sky-400">SQL Handbook</span>
      </div>

      {/* TOP CENTER: VengeanceUI Glass Dock (Wide Screen with Icon + Text Expandable Look) */}
      {!isMobile && dockItems && (
        <div className="topbar-dock-container flex items-center justify-center">
          <GlassDock items={dockItems} mode="expanded" />
        </div>
      )}

      {/* Topbar Right Meta Indicators */}
      <div className="topbar-meta">
        <div className="meta-pill liquid-pill hidden sm:flex" title="8 Educational Chapters & 160 Interactive MCQs">
          <BookOpen size={13} className="meta-icon" />
          <span>{totalChapters} Ch · {totalQuestions} Qs</span>
        </div>
        <div className="meta-pill liquid-pill branch-pill" title="Relational Database Engineering Edition">
          <span className="live-dot-pulse"></span>
          <span>SQL 2.0</span>
        </div>
      </div>
    </header>
  );
}

