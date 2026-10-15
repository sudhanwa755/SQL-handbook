import React from 'react';
import { BookOpen, Compass, Award, Github, Sparkles } from 'lucide-react';

export function ProjectHero({ onStartLearning, onExploreCurriculum }) {
  return (
    <section className="project-hero" aria-label="Course Header">
      {/* Top Meta Tags (Clean, Educational, Liquid Glass) */}
      <div className="hero-meta-row">
        <span className="hero-tag-pill">Relational Engineering</span>
        <span className="hero-tag-text">· Database Theory & Analytical SQL</span>
        <span className="hero-tag-pill neutral">2025 Edition</span>
        <span className="hero-tag-pill accent">
          <Sparkles size={12} />
          160 Assessments
        </span>
      </div>

      {/* Main Title and Action Buttons */}
      <div className="hero-title-group">
        <div>
          <h1 className="hero-title">The SQL Handbook</h1>
          <p className="hero-subtitle-tagline">
            Interactive Relational Engineering Textbook & Assessment Platform
          </p>
        </div>
        
        <div className="hero-action-buttons">
          <button 
            className="hero-btn-liquid-primary" 
            onClick={onStartLearning}
            title="Begin with Chapter 1: Normalization"
          >
            <BookOpen size={15} />
            Start Chapter 1
          </button>

          <button 
            className="hero-btn-liquid-secondary" 
            onClick={onExploreCurriculum}
            title="View all 8 chapters and topics"
          >
            <Compass size={15} />
            Explore Curriculum
          </button>
          
          <a
            href="https://github.com/sudhanwa755/SQL-handbook"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-liquid-ghost"
            title="Open open-source GitHub repository"
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
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
