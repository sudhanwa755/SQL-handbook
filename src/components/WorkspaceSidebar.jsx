import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronRight, BookOpen, Award, Zap, FileText } from 'lucide-react';

export function WorkspaceSidebar({ 
  curriculum, 
  selectedFileId, 
  onSelectFile, 
  isOpenOnMobile, 
  onCloseMobile 
}) {
  const [openFolders, setOpenFolders] = useState({
    '01-database-theory': true,
    '02-core-sql-ops': true,
    '03-analytical-sql': true,
    '04-relational-queries': true,
    'assessments-engine': false,
    'curriculum-matrix': true,
  });

  const toggleFolder = (folderKey) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpenOnMobile && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`workspace-sidebar liquid-sidebar ${isOpenOnMobile ? 'mobile-open' : ''}`} aria-label="Curriculum Sidebar Navigation">
        {/* Liquid Glass Header */}
        <div className="sidebar-header">
          <div className="sidebar-title-group">
            <div className="sidebar-icon-glow">
              <Layers size={15} />
            </div>
            <span>WORKSPACE</span>
          </div>
          <span className="badge-liquid-counter">8 chapters</span>
        </div>

        {/* Tree Container */}
        <div className="tree-container">
          {/* FOLDER 1: 01-database-theory */}
          <div className="tree-folder">
            <div
              className="tree-folder-header"
              onClick={() => toggleFolder('01-database-theory')}
            >
              <div className="folder-title">
                {openFolders['01-database-theory'] ? (
                  <ChevronDown size={14} className="chevron-icon" />
                ) : (
                  <ChevronRight size={14} className="chevron-icon" />
                )}
                <span>01-database-theory</span>
              </div>
              <span className="folder-count">2</span>
            </div>

            {openFolders['01-database-theory'] && (
              <div className="tree-children">
                <div
                  className={`tree-file-item ${selectedFileId === 'part1' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part1', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-html">5</span>
                    <span className="file-name">01-normalization.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">3NF</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>

                <div
                  className={`tree-file-item ${selectedFileId === 'part2' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part2', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-ts">TS</span>
                    <span className="file-name">02-keys-constraints.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">PK/FK</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOLDER 2: 02-core-sql-ops */}
          <div className="tree-folder">
            <div
              className="tree-folder-header"
              onClick={() => toggleFolder('02-core-sql-ops')}
            >
              <div className="folder-title">
                {openFolders['02-core-sql-ops'] ? (
                  <ChevronDown size={14} className="chevron-icon" />
                ) : (
                  <ChevronRight size={14} className="chevron-icon" />
                )}
                <span>02-core-sql-ops</span>
              </div>
              <span className="folder-count">2</span>
            </div>

            {openFolders['02-core-sql-ops'] && (
              <div className="tree-children">
                <div
                  className={`tree-file-item ${selectedFileId === 'part3' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part3', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-sql">SQL</span>
                    <span className="file-name">03-ddl-dml-tcl.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">ACID</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>

                <div
                  className={`tree-file-item ${selectedFileId === 'part4' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part4', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-js">JS</span>
                    <span className="file-name">04-select-where.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">DQL</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOLDER 3: 03-analytical-sql */}
          <div className="tree-folder">
            <div
              className="tree-folder-header"
              onClick={() => toggleFolder('03-analytical-sql')}
            >
              <div className="folder-title">
                {openFolders['03-analytical-sql'] ? (
                  <ChevronDown size={14} className="chevron-icon" />
                ) : (
                  <ChevronRight size={14} className="chevron-icon" />
                )}
                <span>03-analytical-sql</span>
              </div>
              <span className="folder-count">2</span>
            </div>

            {openFolders['03-analytical-sql'] && (
              <div className="tree-children">
                <div
                  className={`tree-file-item ${selectedFileId === 'part5' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part5', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-react">R</span>
                    <span className="file-name">05-functions-null.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">3VL</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>

                <div
                  className={`tree-file-item ${selectedFileId === 'part6' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part6', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-sql">SQL</span>
                    <span className="file-name">06-groupby-having.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">Stats</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOLDER 4: 04-relational-queries */}
          <div className="tree-folder">
            <div
              className="tree-folder-header"
              onClick={() => toggleFolder('04-relational-queries')}
            >
              <div className="folder-title">
                {openFolders['04-relational-queries'] ? (
                  <ChevronDown size={14} className="chevron-icon" />
                ) : (
                  <ChevronRight size={14} className="chevron-icon" />
                )}
                <span>04-relational-queries</span>
              </div>
              <span className="folder-count">2</span>
            </div>

            {openFolders['04-relational-queries'] && (
              <div className="tree-children">
                <div
                  className={`tree-file-item ${selectedFileId === 'part7' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part7', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-react">R</span>
                    <span className="file-name">07-relational-joins.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">Venn</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>

                <div
                  className={`tree-file-item ${selectedFileId === 'part8' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('part8', 'chapter');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-sql">SQL</span>
                    <span className="file-name">08-subqueries-sets.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">Sets</span>
                    <span className="file-dot-live"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOLDER 5: assessments-engine (160 Questions total) */}
          <div className="tree-folder">
            <div
              className="tree-folder-header"
              onClick={() => toggleFolder('assessments-engine')}
            >
              <div className="folder-title">
                {openFolders['assessments-engine'] ? (
                  <ChevronDown size={14} className="chevron-icon" />
                ) : (
                  <ChevronRight size={14} className="chevron-icon" />
                )}
                <span>assessments-engine</span>
              </div>
              <span className="folder-count">8</span>
            </div>

            {openFolders['assessments-engine'] && (
              <div className="tree-children">
                {curriculum.map((ch) => (
                  <div
                    key={`quiz-${ch.id}`}
                    className={`tree-file-item ${selectedFileId === `quiz-${ch.id}` ? 'active' : ''}`}
                    onClick={() => {
                      onSelectFile(`quiz-${ch.id}`, 'quiz');
                      if (onCloseMobile) onCloseMobile();
                    }}
                  >
                    <div className="file-info">
                      <span className="lang-badge lang-quiz">Q</span>
                      <span className="file-name">quiz-ch{ch.chapterNumber}-{ch.id}.test.sql</span>
                    </div>
                    <div className="file-meta-tags">
                      <span className="file-year-pill">20Q</span>
                      <span className="file-dot-live"></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FOLDER 6: curriculum-matrix & reference */}
          <div className="tree-folder">
            <div
              className="tree-folder-header"
              onClick={() => toggleFolder('curriculum-matrix')}
            >
              <div className="folder-title">
                {openFolders['curriculum-matrix'] ? (
                  <ChevronDown size={14} className="chevron-icon" />
                ) : (
                  <ChevronRight size={14} className="chevron-icon" />
                )}
                <span>reference-tools</span>
              </div>
              <span className="folder-count">2</span>
            </div>

            {openFolders['curriculum-matrix'] && (
              <div className="tree-children">
                <div
                  className={`tree-file-item ${selectedFileId === 'command-matrix' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('command-matrix', 'matrix');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-js">M</span>
                    <span className="file-name">sql-command-matrix.sql</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">Matrix</span>
                  </div>
                </div>

                <div
                  className={`tree-file-item ${selectedFileId === 'overview' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectFile('overview', 'overview');
                    if (onCloseMobile) onCloseMobile();
                  }}
                >
                  <div className="file-info">
                    <span className="lang-badge lang-html">5</span>
                    <span className="file-name">README.md</span>
                  </div>
                  <div className="file-meta-tags">
                    <span className="file-year-pill">TOC</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
