import React from 'react';
import { Lock, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

export function LiveWindowFrame({ currentUrl = "sql-handbook-beryl.vercel.app/", children, isMaximized, onToggleMaximize }) {
  return (
    <div className={`live-mockup-window ${isMaximized ? 'maximized' : ''}`}>
      {/* Window Chrome matching the reference image */}
      <div className="mockup-window-header">
        <div className="window-dots">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-yellow"></span>
          <span className="window-dot dot-green"></span>
        </div>

        <div className="mockup-url-bar">
          <Lock size={12} className="lock-icon" />
          <span>{currentUrl}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            className="tab-close" 
            onClick={onToggleMaximize}
            title={isMaximized ? "Restore view" : "Maximize view"}
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Embedded Window Content */}
      <div className="mockup-window-body">
        {children}
      </div>
    </div>
  );
}
