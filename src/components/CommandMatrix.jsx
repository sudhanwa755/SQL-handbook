import React, { useState } from 'react';
import { LayoutGrid, Table as TableIcon, Zap, Copy, Check, Search } from 'lucide-react';
import { COMMAND_CATEGORIES } from '../data/commandsData';

export function CommandMatrix() {
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const copySyntax = (syntax, name) => {
    navigator.clipboard.writeText(syntax);
    setCopiedCmd(name);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredCategories = COMMAND_CATEGORIES.map((cat) => {
    const matchingCmds = cat.commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(search.toLowerCase()) ||
        cmd.desc.toLowerCase().includes(search.toLowerCase()) ||
        cmd.syntax.toLowerCase().includes(search.toLowerCase())
    );
    return { ...cat, commands: matchingCmds };
  }).filter((cat) => cat.commands.length > 0 || search === '');

  return (
    <div>
      {/* Matrix Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} style={{ color: 'var(--accent-gold)' }} />
            SQL Command Categories Matrix
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Core syntax categories, transactional controls, and definition languages. Click any chip to copy syntax.
          </p>
        </div>

        {/* View mode toggle & search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search commands (e.g. TRUNCATE)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '7px 10px 7px 30px',
                color: 'var(--text-heading)',
                fontSize: '12px',
                outline: 'none',
                minWidth: '200px'
              }}
            />
          </div>

          <div style={{ display: 'flex', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '3px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'rgba(2, 132, 199, 0.15)' : 'transparent',
                border: viewMode === 'grid' ? '1px solid var(--accent-cyan)' : 'none',
                color: viewMode === 'grid' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                fontWeight: viewMode === 'grid' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <LayoutGrid size={13} /> Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                background: viewMode === 'table' ? 'rgba(2, 132, 199, 0.15)' : 'transparent',
                border: viewMode === 'table' ? '1px solid var(--accent-cyan)' : 'none',
                color: viewMode === 'table' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                fontWeight: viewMode === 'table' ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <TableIcon size={13} /> Table
            </button>
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredCategories.map((cat) => (
            <div
              key={cat.category}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--glass-highlight)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: cat.color,
                      background: `rgba(2, 132, 199, 0.08)`,
                      padding: '3px 10px',
                      borderRadius: '4px',
                      border: `1px solid ${cat.color}40`
                    }}
                  >
                    {cat.category}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {cat.subtitle}
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.55 }}>
                  {cat.description}
                </p>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px', fontWeight: 600 }}>
                  COMMANDS (CLICK TO COPY):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cat.commands.map((cmd) => (
                    <button
                      key={cmd.name}
                      onClick={() => copySyntax(cmd.syntax, cmd.name)}
                      title={`${cmd.desc} - Click to copy syntax`}
                      style={{
                        background: copiedCmd === cmd.name ? 'rgba(34, 197, 94, 0.2)' : 'var(--bg-surface)',
                        border: copiedCmd === cmd.name ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                        color: copiedCmd === cmd.name ? 'var(--accent-green)' : 'var(--text-heading)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '5px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {copiedCmd === cmd.name ? <Check size={11} /> : null}
                      <span>{cmd.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="relational-table-wrap">
          <div className="table-scroller">
            <table className="relational-table">
              <thead>
                <tr>
                  <th style={{ width: '90px' }}>Category</th>
                  <th style={{ width: '180px' }}>Classification</th>
                  <th>Commands & Syntax</th>
                  <th>Purpose & Relational Impact</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((cat) =>
                  cat.commands.map((cmd, idx) => (
                    <tr key={`${cat.category}-${cmd.name}`}>
                      {idx === 0 && (
                        <td
                          rowSpan={cat.commands.length}
                          style={{
                            verticalAlign: 'top',
                            fontWeight: 800,
                            fontFamily: 'var(--font-mono)',
                            color: cat.color,
                            borderRight: '1px solid var(--border-subtle)'
                          }}
                        >
                          {cat.category}
                        </td>
                      )}
                      <td style={{ verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{cmd.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cat.name}</div>
                      </td>
                      <td style={{ verticalAlign: 'top' }}>
                        <code
                          onClick={() => copySyntax(cmd.syntax, cmd.name)}
                          style={{
                            background: 'var(--bg-surface)',
                            color: 'var(--accent-cyan)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            display: 'inline-block',
                            border: '1px solid var(--border-subtle)',
                            fontFamily: 'var(--font-mono)'
                          }}
                          title="Click to copy syntax"
                        >
                          {cmd.syntax}
                        </code>
                      </td>
                      <td style={{ verticalAlign: 'top', color: 'var(--text-secondary)' }}>
                        {cmd.desc}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
