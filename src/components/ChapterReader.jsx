import React, { useState } from 'react';
import { Copy, Check, Terminal, Award, ArrowLeft, ArrowRight, AlertTriangle, Table } from 'lucide-react';

export function ChapterReader({ chapter, onOpenQuiz, onNavigateChapter }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedVenn, setSelectedVenn] = useState('inner');

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!chapter) return null;

  return (
    <article className="chapter-content-container">
      {/* Chapter View Header */}
      <div className="chapter-view-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span className="chapter-part-chip">{chapter.part}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              ⏱ {chapter.readTime} · {chapter.difficulty}
            </span>
            <button
              onClick={() => onOpenQuiz(chapter.id)}
              className="hero-btn-liquid-secondary"
              style={{ padding: '5px 12px', fontSize: '12px' }}
            >
              <Award size={13} style={{ color: 'var(--accent-gold)' }} />
              Take 20-Q Quiz
            </button>
          </div>
        </div>

        <h1>Chapter {chapter.chapterNumber}: {chapter.title}</h1>
        <p>{chapter.subtitle}</p>
      </div>

      {/* Overview Card */}
      <div style={{ background: 'var(--bg-panel)', padding: '18px 20px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '24px', boxShadow: 'var(--glass-highlight)' }}>
        <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.65 }}>
          {chapter.overview}
        </p>
      </div>

      {/* Anomalies Grid (if present) */}
      {chapter.anomalies && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--text-heading)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            <AlertTriangle size={17} style={{ color: 'var(--accent-amber)' }} />
            The Three Relational Anomalies
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {chapter.anomalies.map((ano, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  boxShadow: 'var(--glass-highlight)'
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '6px' }}>
                  {ano.icon} {ano.type}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {ano.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Venn Diagram Selector (Chapter 7) */}
      {chapter.vennTypes && (
        <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-medium)', borderRadius: '14px', padding: '20px', marginBottom: '28px', boxShadow: 'var(--glass-highlight)' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--text-heading)', marginBottom: '12px', fontWeight: 700 }}>
            Interactive SQL Join Venn Diagram
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {chapter.vennTypes.map((v) => (
              <button
                key={v.type}
                onClick={() => setSelectedVenn(v.type)}
                style={{
                  background: selectedVenn === v.type ? 'rgba(2, 132, 199, 0.15)' : 'var(--bg-surface)',
                  border: selectedVenn === v.type ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  color: selectedVenn === v.type ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: selectedVenn === v.type ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {v.title}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
            <div style={{ position: 'relative', width: '240px', height: '130px' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '10px',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  border: '2px solid #0284c7',
                  background: selectedVenn === 'left' || selectedVenn === 'full' ? 'rgba(2, 132, 199, 0.25)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#0284c7'
                }}
              >
                Table A
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  border: '2px solid #8b5cf6',
                  background: selectedVenn === 'right' || selectedVenn === 'full' ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#8b5cf6'
                }}
              >
                Table B
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px' }}>
            {chapter.vennTypes.find(v => v.type === selectedVenn)?.desc}
          </p>
        </div>
      )}

      {/* Chapter Sections */}
      {chapter.sections.map((sec, idx) => (
        <section key={sec.id} style={{ marginBottom: '38px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
            {sec.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.65 }}>
            {sec.content}
          </p>

          {/* High-Contrast Code Terminal Box */}
          <div className="code-terminal-box">
            <div className="code-terminal-header">
              <div className="terminal-title">
                <div className="window-dots" style={{ width: 'auto', gap: '5px' }}>
                  <span className="window-dot dot-red" style={{ width: '9px', height: '9px' }}></span>
                  <span className="window-dot dot-yellow" style={{ width: '9px', height: '9px' }}></span>
                  <span className="window-dot dot-green" style={{ width: '9px', height: '9px' }}></span>
                </div>
                <span>SQL Query / Definition</span>
              </div>
              <button
                className="copy-sql-btn"
                onClick={() => copyToClipboard(sec.sql, idx)}
              >
                {copiedIndex === idx ? (
                  <>
                    <Check size={12} style={{ color: 'var(--accent-green-bright)' }} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-pre-wrap">
              <code>{sec.sql}</code>
            </pre>
          </div>

          {/* Relational Result Table */}
          {sec.resultTable && (
            <div className="relational-table-wrap">
              <div className="relational-table-header">
                <Table size={14} />
                <span>Live Relational Output Table</span>
              </div>
              <div className="table-scroller">
                <table className="relational-table">
                  <thead>
                    <tr>
                      {sec.resultTable.headers.map((h, hIdx) => (
                        <th key={hIdx}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.resultTable.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>
                            {cell === 'NULL' ? (
                              <span className="null-pill">NULL</span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Gotcha Warning Box */}
          {sec.gotcha && (
            <div className="gotcha-box">
              <div className="gotcha-title">
                <AlertTriangle size={15} />
                <span>Architect Gotcha / Traps to Avoid</span>
              </div>
              <div>{sec.gotcha}</div>
            </div>
          )}
        </section>
      ))}

      {/* Chapter Footer Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', marginTop: '40px', flexWrap: 'wrap', gap: '12px' }}>
        {chapter.chapterNumber > 1 ? (
          <button
            className="hero-btn-liquid-secondary"
            onClick={() => onNavigateChapter(chapter.chapterNumber - 1)}
          >
            <ArrowLeft size={14} /> Previous Chapter
          </button>
        ) : <div></div>}

        <button
          className="hero-btn-liquid-primary"
          onClick={() => onOpenQuiz(chapter.id)}
        >
          <Award size={15} /> Take 20-Q Assessment
        </button>

        {chapter.chapterNumber < 8 ? (
          <button
            className="hero-btn-liquid-secondary"
            onClick={() => onNavigateChapter(chapter.chapterNumber + 1)}
          >
            Next Chapter <ArrowRight size={14} />
          </button>
        ) : <div></div>}
      </div>
    </article>
  );
}
