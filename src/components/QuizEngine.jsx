import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Filter, HelpCircle, ArrowLeft } from 'lucide-react';

export function QuizEngine({ chapterId, quizData, onBackToChapter }) {
  const chapterQuiz = quizData[chapterId];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  if (!chapterQuiz) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
        <p>No assessment data found for this chapter.</p>
        <button onClick={onBackToChapter} className="hero-btn-liquid-secondary" style={{ marginTop: '16px' }}>
          <ArrowLeft size={14} /> Back to Chapter
        </button>
      </div>
    );
  }

  const questions = chapterQuiz.questions;

  const handleSelectOption = (qId, optionIndex) => {
    if (selectedAnswers[qId] !== undefined) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
  };

  // Score calculation
  let correctCount = 0;
  let answeredCount = 0;
  questions.forEach((q) => {
    if (selectedAnswers[q.id] !== undefined) {
      answeredCount++;
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    }
  });

  const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  
  let tierBadge = "Start Assessment";
  let tierColor = "var(--text-muted)";
  if (answeredCount >= 5) {
    if (percentage >= 85) {
      tierBadge = "Mastery (85%+)";
      tierColor = "var(--accent-green)";
    } else if (percentage >= 70) {
      tierBadge = "Proficient (70%+)";
      tierColor = "var(--accent-cyan)";
    } else {
      tierBadge = "Needs Review (<70%)";
      tierColor = "var(--accent-amber)";
    }
  }

  const filteredQuestions = questions.filter((q) => {
    if (difficultyFilter === 'all') return true;
    if (difficultyFilter === 'easy') return q.difficulty === 'easy';
    if (difficultyFilter === 'medium') return q.difficulty === 'medium';
    if (difficultyFilter === 'query') return q.difficulty === 'hard' || q.type === 'query';
    return true;
  });

  return (
    <div className="quiz-container">
      {/* Quiz Header Score Card */}
      <div className="quiz-header-card">
        <div>
          <button
            onClick={onBackToChapter}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '8px'
            }}
          >
            <ArrowLeft size={13} /> Back to Chapter Theory
          </button>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-heading)' }}>
            {chapterQuiz.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '3px' }}>
            {chapterQuiz.subtitle} (20 Questions Total)
          </p>
        </div>

        {/* Live Score Meter */}
        <div className="quiz-score-meter">
          <div className="score-badge-circle">
            <span className="score-num">{correctCount}</span>
            <span className="score-total">/ {answeredCount}</span>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 800, color: tierColor }}>
              {tierBadge}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {answeredCount === 20 ? "Completed All 20 Questions" : `${20 - answeredCount} Questions Remaining`}
            </div>
          </div>

          {answeredCount > 0 && (
            <button
              onClick={handleReset}
              className="copy-sql-btn"
              style={{ marginLeft: '12px', padding: '6px 12px' }}
              title="Reset quiz responses"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Difficulty Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Filter:
          </span>
          {['all', 'easy', 'medium', 'query'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              style={{
                background: difficultyFilter === diff ? 'rgba(2, 132, 199, 0.15)' : 'var(--bg-surface)',
                border: difficultyFilter === diff ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                color: difficultyFilter === diff ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: difficultyFilter === diff ? 700 : 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease'
              }}
            >
              {diff}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Showing {filteredQuestions.length} of 20
        </span>
      </div>

      {/* Questions List */}
      <div>
        {filteredQuestions.map((q) => {
          const userAns = selectedAnswers[q.id];
          const isAnswered = userAns !== undefined;
          const isCorrect = userAns === q.correct;

          return (
            <div
              key={q.id}
              className={`quiz-question-card ${isAnswered ? (isCorrect ? 'answered-correct' : 'answered-incorrect') : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 800 }}>
                  Question {q.id} of 20
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    background: q.difficulty === 'easy' ? 'rgba(22, 163, 74, 0.1)' : q.difficulty === 'medium' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(126, 34, 206, 0.1)',
                    color: q.difficulty === 'easy' ? 'var(--accent-green)' : q.difficulty === 'medium' ? 'var(--accent-gold)' : 'var(--accent-purple)',
                    border: '1px solid currentColor'
                  }}
                >
                  {q.difficulty}
                </span>
              </div>

              <h3 className="question-prompt">{q.question}</h3>

              {/* Options */}
              <div className="quiz-options-list">
                {q.options.map((opt, optIdx) => {
                  let optClass = "";
                  if (isAnswered) {
                    if (optIdx === q.correct) optClass = "opt-correct";
                    else if (optIdx === userAns) optClass = "opt-wrong";
                  }

                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      className={`quiz-option-btn ${optClass}`}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isAnswered}
                    >
                      <span className="option-letter">{letter}.</span>
                      <span style={{ flex: 1, lineHeight: 1.5 }}>{opt}</span>
                      {isAnswered && optIdx === q.correct && (
                        <CheckCircle2 size={16} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                      )}
                      {isAnswered && optIdx === userAns && optIdx !== q.correct && (
                        <XCircle size={16} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Reveal */}
              {isAnswered && (
                <div className="explanation-reveal">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: isCorrect ? 'var(--accent-green)' : 'var(--accent-gold)', marginBottom: '5px' }}>
                    <HelpCircle size={15} />
                    <span>{isCorrect ? "Correct! Conceptual Rationale:" : "Incorrect. Architectural Explanation:"}</span>
                  </div>
                  <p style={{ color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
