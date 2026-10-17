import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Compass, Github, Sparkles, Search, X, Award, Zap, ArrowRight } from 'lucide-react';
import { CURRICULUM } from '../data/curriculumData';
import { COMMAND_CATEGORIES } from '../data/commandsData';

// Build a flat, searchable index from all project data
function buildSearchIndex() {
  const items = [];

  CURRICULUM.forEach((ch) => {
    items.push({
      type: 'chapter',
      id: ch.id,
      label: `Ch ${ch.chapterNumber}: ${ch.title}`,
      sub: ch.subtitle,
      badge: ch.part,
      badgeColor: 'cyan',
      icon: BookOpen,
    });

    items.push({
      type: 'quiz',
      id: ch.id,
      label: `Quiz: Chapter ${ch.chapterNumber} — ${ch.title}`,
      sub: `20 interactive relational questions · ${ch.difficulty}`,
      badge: '20-Q',
      badgeColor: 'gold',
      icon: Award,
    });

    ch.sections?.forEach((sec) => {
      items.push({
        type: 'section',
        id: ch.id,
        label: sec.title,
        sub: sec.content?.slice(0, 90) + '...',
        badge: ch.part,
        badgeColor: 'cyan',
        icon: BookOpen,
      });
    });
  });

  COMMAND_CATEGORIES.forEach((cat) => {
    cat.commands.forEach((cmd) => {
      items.push({
        type: 'command',
        id: 'command-matrix',
        label: `${cmd.name} (${cat.category})`,
        sub: cmd.desc,
        badge: cat.category,
        badgeColor: cat.category === 'DDL' ? 'gold' : cat.category === 'DML' ? 'cyan' : cat.category === 'DQL' ? 'green' : 'purple',
        icon: Zap,
      });
    });
  });

  return items;
}

const SEARCH_INDEX = buildSearchIndex();

const BADGE_COLORS = {
  cyan:   { bg: 'rgba(56,189,248,0.12)', text: '#38bdf8', border: 'rgba(56,189,248,0.3)' },
  gold:   { bg: 'rgba(251,191,36,0.12)', text: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  green:  { bg: 'rgba(34,197,94,0.12)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  purple: { bg: 'rgba(168,85,247,0.12)', text: '#a855f7', border: 'rgba(168,85,247,0.3)' },
};

const TYPE_LABELS = {
  chapter: 'Chapter',
  quiz: 'Assessment',
  section: 'Topic',
  command: 'SQL Cmd',
};

export function ProjectHero({ onStartLearning, onExploreCurriculum, onOpenChapter, onOpenQuiz, onSelectMatrix }) {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const cleanQuery = query.trim().toLowerCase();

  const results = cleanQuery.length >= 1
    ? SEARCH_INDEX.filter(
        (item) =>
          item.label.toLowerCase().includes(cleanQuery) ||
          item.sub.toLowerCase().includes(cleanQuery) ||
          item.badge.toLowerCase().includes(cleanQuery)
      ).slice(0, 10)
    : [];

  useEffect(() => { setHovered(0); }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        inputRef.current && !inputRef.current.closest('.hero-search-wrap')?.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e) => {
    if (!isDropdownOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHovered(h => Math.min(h + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHovered(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter') { e.preventDefault(); handleSelect(results[hovered]); }
    if (e.key === 'Escape') { setIsDropdownOpen(false); setQuery(''); }
  };

  const handleSelect = (item) => {
    setQuery('');
    setIsDropdownOpen(false);
    if (item.type === 'chapter' || item.type === 'section') onOpenChapter?.(item.id);
    else if (item.type === 'quiz') onOpenQuiz?.(item.id);
    else if (item.type === 'command') onSelectMatrix?.();
  };

  // Popular quick-jump chips
  const quickChips = [
    { label: 'Normalization', query: 'normalization' },
    { label: 'SQL Joins', query: 'joins' },
    { label: 'GROUP BY', query: 'group by' },
    { label: 'Foreign Keys', query: 'foreign key' },
    { label: 'Subqueries', query: 'subquer' },
    { label: 'ACID Transactions', query: 'acid' },
  ];

  return (
    <section className="project-hero" aria-label="Course Header">
      {/* Top Meta Tags */}
      <div className="hero-meta-row">
        <span className="hero-tag-pill">Relational Engineering</span>
        <span className="hero-tag-text">· Database Theory &amp; Analytical SQL</span>
        <span className="hero-tag-pill neutral">2026 Edition</span>
        <span className="hero-tag-pill accent">
          <Sparkles size={12} />
          160 Assessments
        </span>
      </div>

      {/* Title */}
      <div className="hero-title-group">
        <div>
          <h1 className="hero-title">The SQL Handbook</h1>
          <p className="hero-subtitle-tagline">
            Interactive Relational Engineering Textbook &amp; Assessment Platform
          </p>
        </div>
        <div className="hero-action-buttons">
          <button className="hero-btn-liquid-primary" onClick={onStartLearning} title="Begin with Chapter 1: Normalization">
            <BookOpen size={15} /> Start Chapter 1
          </button>
          <button className="hero-btn-liquid-secondary" onClick={onExploreCurriculum} title="View all 8 chapters">
            <Compass size={15} /> Explore Curriculum
          </button>
          <a href="https://github.com/sudhanwa755/SQL-handbook" target="_blank" rel="noopener noreferrer" className="hero-btn-liquid-ghost">
            <Github size={15} /> GitHub
          </a>
        </div>
      </div>

      {/* ─── HERO SEARCH BAR ─────────────────────────────────────────────────── */}
      <div className="hero-search-wrap" style={{ position: 'relative', marginTop: '28px', marginBottom: '8px' }}>
        {/* Input Row */}
        <div
          className="hero-search-input-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(9,15,29,0.88)',
            border: `1px solid ${isDropdownOpen && results.length > 0 ? 'rgba(56,189,248,0.5)' : 'rgba(56,189,248,0.22)'}`,
            borderRadius: isDropdownOpen && results.length > 0 ? '16px 16px 0 0' : '16px',
            padding: '14px 18px',
            boxShadow: isDropdownOpen && results.length > 0
              ? '0 0 0 3px rgba(56,189,248,0.08), 0 8px 32px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.06)',
            transition: 'all 0.2s ease',
            cursor: 'text',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <Search
            size={22}
            style={{ color: isDropdownOpen ? '#38bdf8' : '#64748b', flexShrink: 0, transition: 'color 0.2s' }}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsDropdownOpen(true); }}
            onFocus={() => setIsDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search chapters, SQL commands, topics, assessments..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              caretColor: '#38bdf8',
            }}
            aria-label="Search the SQL Handbook"
            aria-autocomplete="list"
            aria-expanded={isDropdownOpen && results.length > 0}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setIsDropdownOpen(false); inputRef.current?.focus(); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', padding: '2px', borderRadius: '6px' }}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0,
            background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(56,189,248,0.15)',
            borderRadius: '8px', padding: '3px 10px',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
              {results.length > 0 ? `${results.length} results` : 'Search'}
            </span>
          </div>
        </div>

        {/* Live Results Dropdown */}
        {isDropdownOpen && results.length > 0 && (
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(7,11,22,0.97)',
              border: '1px solid rgba(56,189,248,0.3)',
              borderTop: '1px solid rgba(56,189,248,0.1)',
              borderRadius: '0 0 16px 16px',
              overflow: 'hidden',
              boxShadow: '0 20px 48px -8px rgba(0,0,0,0.7)',
              zIndex: 9999,
              backdropFilter: 'blur(16px)',
              maxHeight: '420px',
              overflowY: 'auto',
            }}
          >
            {/* Results */}
            {results.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === hovered;
              const colors = BADGE_COLORS[item.badgeColor] || BADGE_COLORS.cyan;
              return (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  onMouseEnter={() => setHovered(idx)}
                  onClick={() => handleSelect(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 18px',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(56,189,248,0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid rgba(56,189,248,0.6)' : '3px solid transparent',
                    transition: 'all 0.12s ease',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: isActive ? 'rgba(56,189,248,0.18)' : 'rgba(16,28,51,0.8)',
                    border: `1px solid ${isActive ? 'rgba(56,189,248,0.4)' : 'rgba(56,189,248,0.12)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isActive ? '#38bdf8' : '#64748b',
                    transition: 'all 0.12s ease',
                  }}>
                    <Icon size={16} />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '14px', fontWeight: 600,
                      color: isActive ? '#ffffff' : '#e2e8f0',
                      fontFamily: 'var(--font-display)',
                      lineHeight: 1.3,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: '12px', color: '#64748b',
                      fontFamily: 'var(--font-display)',
                      marginTop: '2px',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {item.sub}
                    </div>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '10.5px', fontWeight: 700, fontFamily: 'var(--font-mono)',
                      padding: '2px 8px', borderRadius: '5px',
                      background: colors.bg, color: colors.text, border: `1px solid ${colors.border}`,
                    }}>
                      {TYPE_LABELS[item.type] || item.type}
                    </span>
                    {isActive && <ArrowRight size={14} style={{ color: '#38bdf8' }} />}
                  </div>
                </div>
              );
            })}

            {/* Footer hint */}
            <div style={{
              padding: '10px 18px',
              borderTop: '1px solid rgba(56,189,248,0.1)',
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(5,8,16,0.8)',
            }}>
              {[['↑↓', 'Navigate'], ['↵', 'Select'], ['ESC', 'Close']].map(([key, label]) => (
                <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#475569', fontFamily: 'var(--font-mono)' }}>
                  <kbd style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '5px', padding: '1px 7px', color: '#94a3b8', fontSize: '11px' }}>{key}</kbd>
                  {label}
                </span>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '11.5px', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {results.length} match{results.length !== 1 ? 'es' : ''}
              </span>
            </div>
          </div>
        )}

        {/* No results state */}
        {isDropdownOpen && cleanQuery.length >= 2 && results.length === 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 9999,
            background: 'rgba(7,11,22,0.97)',
            border: '1px solid rgba(56,189,248,0.2)',
            borderTop: '1px solid rgba(56,189,248,0.08)',
            borderRadius: '0 0 16px 16px',
            padding: '28px 18px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontFamily: 'var(--font-display)' }}>
              No results for <strong style={{ color: '#38bdf8' }}>"{query}"</strong>
            </p>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', fontFamily: 'var(--font-display)' }}>
              Try: normalization, joins, GROUP BY, subquery, ACID
            </p>
          </div>
        )}
      </div>

      {/* Quick Jump Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <span style={{ fontSize: '12px', color: '#475569', fontFamily: 'var(--font-mono)', fontWeight: 600, alignSelf: 'center', marginRight: '4px' }}>
          Quick search:
        </span>
        {quickChips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => { setQuery(chip.query); setIsDropdownOpen(true); setTimeout(() => inputRef.current?.focus(), 30); }}
            style={{
              background: 'rgba(16,28,51,0.7)',
              border: '1px solid rgba(56,189,248,0.18)',
              color: '#94a3b8',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)';
              e.currentTarget.style.color = '#38bdf8';
              e.currentTarget.style.background = 'rgba(56,189,248,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.18)';
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.background = 'rgba(16,28,51,0.7)';
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Pedagogical Description */}
      <p className="hero-desc">
        A teacher-crafted relational database engineering textbook covering database theory, mathematical
        normal forms (1NF–3NF), schema constraints, and complex multi-table analytical queries. Every topic
        includes concrete conceptual explanations, interview gotchas, and <strong>live visual result tables</strong>.
      </p>

      {/* Technology & Curriculum Badges */}
      <div className="hero-tech-badges">
        <div className="tech-badge-pill">
          <span className="lang-badge lang-sql">SQL</span>
          <span>ANSI SQL</span>
        </div>
        <div className="tech-badge-pill">
          <span className="lang-badge lang-html">3NF</span>
          <span>Database Theory</span>
        </div>
        <div className="tech-badge-pill">
          <span className="lang-badge lang-react">R</span>
          <span>React Spatial UI</span>
        </div>
        <div className="tech-badge-pill">
          <span className="lang-badge lang-quiz">20Q</span>
          <span>Chapter Assessments</span>
        </div>
      </div>
    </section>
  );
}
