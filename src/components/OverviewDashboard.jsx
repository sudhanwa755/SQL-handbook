import React, { useState } from 'react';
import { BookOpen, Layers, FileCode, Database, ArrowRight, Award, Search, Sparkles } from 'lucide-react';

export function OverviewDashboard({ curriculum, onOpenChapter, onOpenQuiz }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState('all');

  const filteredChapters = curriculum.filter((ch) => {
    const matchesSearch = 
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedPart === 'all') return matchesSearch;
    return matchesSearch && ch.partId === selectedPart;
  });

  return (
    <div className="overview-dashboard">
      {/* HUD Metrics Banner */}
      <div className="metrics-hud">
        <div className="metric-hud-card">
          <div className="metric-icon-wrap">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="metric-number">8</div>
            <div className="metric-label">Chapters</div>
          </div>
        </div>

        <div className="metric-hud-card">
          <div className="metric-icon-wrap">
            <Layers size={20} />
          </div>
          <div>
            <div className="metric-number">4</div>
            <div className="metric-label">Core Parts</div>
          </div>
        </div>

        <div className="metric-hud-card">
          <div className="metric-icon-wrap">
            <FileCode size={20} />
          </div>
          <div>
            <div className="metric-number">60+</div>
            <div className="metric-label">Topics</div>
          </div>
        </div>

        <div className="metric-hud-card">
          <div className="metric-icon-wrap">
            <Database size={20} />
          </div>
          <div>
            <div className="metric-number">100+</div>
            <div className="metric-label">Live Queries</div>
          </div>
        </div>
      </div>

      {/* Curriculum Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} style={{ color: 'var(--accent-cyan)' }} />
            Curriculum & Table of Contents
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Select any chapter to explore database theory, queries, and relational result tables.
          </p>
        </div>

        {/* Search input with daylight / dark theme compatibility */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search topics or queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '8px 12px 8px 34px',
              color: 'var(--text-heading)',
              fontSize: '13px',
              fontFamily: 'var(--font-display)',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {['all', 'theory', 'core', 'analytics', 'relational'].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPart(p)}
            style={{
              background: selectedPart === p ? 'rgba(2, 132, 199, 0.15)' : 'var(--bg-card)',
              border: selectedPart === p ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
              color: selectedPart === p ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              borderRadius: '9999px',
              padding: '5px 14px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: selectedPart === p ? 700 : 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.15s ease'
            }}
          >
            {p === 'all' ? 'All Chapters' : p}
          </button>
        ))}
      </div>

      {/* Chapter Cards Grid */}
      <div className="chapter-cards-grid">
        {filteredChapters.map((ch) => (
          <div
            key={ch.id}
            className="chapter-card-item"
            onClick={() => onOpenChapter(ch.id)}
          >
            <div>
              <div className="card-top-meta">
                <span className="chapter-part-chip">{ch.part}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ⏱ {ch.readTime}
                </span>
              </div>

              <h3 className="card-title">
                {ch.chapterNumber}. {ch.title}
              </h3>
              
              <p className="card-subtitle">{ch.subtitle}</p>
            </div>

            <div className="card-footer-info">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenQuiz(ch.id);
                }}
                style={{
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: 'var(--accent-gold)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Award size={12} />
                20-Q Quiz
              </button>

              <span className="card-cta-link">
                Read Chapter <ArrowRight size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
