import React from 'react';
import { X, FileCode, CheckSquare, Terminal } from 'lucide-react';

export function BreadcrumbTab({ tabs, activeTabId, onSelectTab, onCloseTab }) {
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="editor-header-bar">
      <div className="breadcrumb-trail">
        <span>sudhanwa755</span>
        <span className="sep">/</span>
        <span>workspace</span>
        <span className="sep">/</span>
        <span>sql-handbook</span>
        <span className="sep">/</span>
        <span className="active">{activeTab ? activeTab.title : 'README.md'}</span>
      </div>

      <div className="tabs-row">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              className={`editor-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              {tab.type === 'quiz' ? (
                <span className="lang-badge lang-quiz">Q</span>
              ) : tab.type === 'sql' ? (
                <span className="lang-badge lang-sql">S</span>
              ) : tab.type === 'runner' ? (
                <span className="lang-badge lang-react">R</span>
              ) : tab.type === 'matrix' ? (
                <span className="lang-badge lang-js">M</span>
              ) : (
                <span className="lang-badge lang-html">5</span>
              )}
              <span>{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  className="tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  title="Close tab"
                >
                  <X size={11} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
