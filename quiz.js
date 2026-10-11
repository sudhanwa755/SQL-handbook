// ==========================================================================
// HSQLDB / SQL HANDBOOK — SPATIAL CHAPTER QUIZ ENGINE
// Provides an interactive, 20-question mastery quiz after every chapter.
// Features:
// - 7 Easy, 7 Medium, 6 Query-based questions
// - Difficulty filtering (All, Easy, Medium, Query)
// - Real-time progress tracking
// - Post-quiz grading with score out of 20 AND percentage
// - Comprehensive review with in-depth explanations for right & wrong answers
// - Retake functionality
// ==========================================================================

class ChapterQuizEngine {
  constructor(chapterKey, containerId = 'chapter-quiz-mount') {
    this.chapterKey = chapterKey;
    this.containerId = containerId;
    this.data = (typeof QUIZ_DATA !== 'undefined' && QUIZ_DATA[chapterKey]) ? QUIZ_DATA[chapterKey] : null;
    this.userAnswers = {}; // { questionId: selectedOptionIndex }
    this.submitted = false;
    this.activeFilter = 'all'; // 'all', 'easy', 'medium', 'query'
    this.init();
  }

  init() {
    this.mount = document.getElementById(this.containerId);
    if (!this.mount || !this.data) return;
    this.render();
  }

  render() {
    const totalCount = this.data.questions.length;
    const easyCount = this.data.questions.filter(q => q.difficulty === 'easy').length;
    const medCount = this.data.questions.filter(q => q.difficulty === 'medium').length;
    const queryCount = this.data.questions.filter(q => q.difficulty === 'query').length;
    const answeredCount = Object.keys(this.userAnswers).length;

    let filteredQuestions = this.data.questions;
    if (this.activeFilter !== 'all') {
      filteredQuestions = this.data.questions.filter(q => q.difficulty === this.activeFilter);
    }

    let html = `
      <section class="topic-section quiz-section-root animate-in" id="chapterQuizSection">
        <div class="section-anchor" id="chapter-quiz"></div>

        <!-- Quiz Header Banner -->
        <div class="quiz-header-banner">
          <div class="quiz-header-badge-row">
            <span class="quiz-pill-badge pill-cyan">
              <i data-lucide="award" class="icon"></i> Chapter Assessment
            </span>
            <span class="quiz-pill-badge pill-neutral">
              ${totalCount} Questions · 7 Easy · 7 Medium · 6 Query
            </span>
            <span class="quiz-pill-badge pill-teal" id="quizProgressBadge">
              ${this.submitted ? 'Completed' : `Answered: ${answeredCount}/${totalCount}`}
            </span>
          </div>

          <h2 class="quiz-title">${this.data.title}</h2>
          <p class="quiz-subtitle">${this.data.subtitle}</p>

          <!-- Difficulty Filter Tabs -->
          <div class="quiz-filter-bar">
            <button class="quiz-filter-btn ${this.activeFilter === 'all' ? 'active' : ''}" onclick="window.currentQuiz.setFilter('all')">
              All (${totalCount})
            </button>
            <button class="quiz-filter-btn ${this.activeFilter === 'easy' ? 'active' : ''}" onclick="window.currentQuiz.setFilter('easy')">
              Easy Concept (${easyCount})
            </button>
            <button class="quiz-filter-btn ${this.activeFilter === 'medium' ? 'active' : ''}" onclick="window.currentQuiz.setFilter('medium')">
              Medium Theory (${medCount})
            </button>
            <button class="quiz-filter-btn ${this.activeFilter === 'query' ? 'active' : ''}" onclick="window.currentQuiz.setFilter('query')">
              Query & Code (${queryCount})
            </button>
          </div>
        </div>
    `;

    // Results Dashboard Banner (Shown if submitted)
    if (this.submitted) {
      html += this.renderResultsDashboard();
    }

    // Questions List
    html += `<div class="quiz-cards-list">`;
    filteredQuestions.forEach((q, idx) => {
      html += this.renderQuestionCard(q, idx + 1);
    });
    html += `</div>`;

    // Footer Action Bar
    html += `
      <div class="quiz-actions-footer">
        ${!this.submitted ? `
          <button class="btn btn-primary quiz-submit-btn" onclick="window.currentQuiz.submitQuiz()">
            <i data-lucide="check-circle" class="icon"></i> Submit & Grade Quiz (${answeredCount}/${totalCount})
          </button>
        ` : `
          <button class="btn btn-ghost quiz-retake-btn" onclick="window.currentQuiz.resetQuiz()">
            <i data-lucide="rotate-ccw" class="icon"></i> Retake Chapter Quiz
          </button>
          <a href="#chapterQuizSection" class="btn btn-primary" onclick="window.scrollTo({top: document.getElementById('chapterQuizSection').offsetTop - 80, behavior: 'smooth'})">
            <i data-lucide="arrow-up" class="icon"></i> Back to Scorecard
          </a>
        `}
      </div>

      </section>
    `;

    this.mount.innerHTML = html;

    // Refresh lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Refresh subway scrollspy timeline to include quiz
    if (typeof setupScrollSpy === 'function') {
      setupScrollSpy();
    }
  }

  renderQuestionCard(q, displayIndex) {
    const isAnswered = this.userAnswers.hasOwnProperty(q.id);
    const selectedIdx = this.userAnswers[q.id];
    const isCorrect = this.submitted && selectedIdx === q.correct;
    const isWrong = this.submitted && isAnswered && selectedIdx !== q.correct;
    const isSkipped = this.submitted && !isAnswered;

    let cardClass = 'quiz-question-card';
    if (this.submitted) {
      if (isCorrect) cardClass += ' card-correct';
      else if (isWrong) cardClass += ' card-wrong';
      else if (isSkipped) cardClass += ' card-skipped';
    }

    let diffBadgeClass = 'diff-easy';
    let diffLabel = 'Easy Concept';
    if (q.difficulty === 'medium') {
      diffBadgeClass = 'diff-medium';
      diffLabel = 'Medium Theory';
    } else if (q.difficulty === 'query') {
      diffBadgeClass = 'diff-query';
      diffLabel = 'Query / Schema SQL';
    }

    // Format question text (support code blocks inside question if any)
    let formattedQuestion = this.escapeHtml(q.question);

    let html = `
      <div class="${cardClass}" id="question-card-${q.id}">
        <div class="quiz-card-header">
          <div class="quiz-card-meta">
            <span class="quiz-q-num">Q${q.id}</span>
            <span class="quiz-diff-badge ${diffBadgeClass}">${diffLabel}</span>
            ${q.type === 'coding' ? `<span class="quiz-type-badge"><i data-lucide="code" class="icon"></i> Code MCQ</span>` : ''}
          </div>

          ${this.submitted ? `
            <div class="quiz-result-pill ${isCorrect ? 'pill-correct' : (isWrong ? 'pill-wrong' : 'pill-skipped')}">
              ${isCorrect ? '✓ Correct (+1)' : (isWrong ? '✗ Incorrect (0)' : '— Skipped (0)')}
            </div>
          ` : ''}
        </div>

        <div class="quiz-question-body">
          <p class="quiz-question-text">${formattedQuestion}</p>
        </div>

        <div class="quiz-options-group">
    `;

    q.options.forEach((optText, optIdx) => {
      const isSelected = selectedIdx === optIdx;
      const isThisCorrect = this.submitted && optIdx === q.correct;
      const isThisWrongSelected = this.submitted && isSelected && !isThisCorrect;

      let optionClass = 'quiz-option-tile';
      if (!this.submitted && isSelected) optionClass += ' selected';
      if (this.submitted) {
        if (isThisCorrect) optionClass += ' opt-correct';
        if (isThisWrongSelected) optionClass += ' opt-wrong';
      }

      const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
      const isCodeOption = optText.includes('\n') || optText.includes('CREATE ') || optText.includes('SELECT ') || optText.includes('ALTER ');

      html += `
        <div class="${optionClass}" onclick="${!this.submitted ? `window.currentQuiz.selectOption(${q.id}, ${optIdx})` : ''}">
          <div class="option-letter-box">${letter}</div>
          <div class="option-content ${isCodeOption ? 'option-code-content' : ''}">
            ${isCodeOption ? `<pre><code>${this.escapeHtml(optText)}</code></pre>` : `<span>${this.escapeHtml(optText)}</span>`}
          </div>
          <div class="option-indicator">
            ${this.submitted && isThisCorrect ? '✓' : (this.submitted && isThisWrongSelected ? '✗' : '')}
          </div>
        </div>
      `;
    });

    html += `</div>`; // .quiz-options-group

    // If submitted, show detailed validation & explanation
    if (this.submitted) {
      html += `
        <div class="quiz-explanation-box">
          <div class="explanation-title">
            <i data-lucide="info" class="icon"></i> Explanation & Concept Rationale:
          </div>
          <p class="explanation-text">${q.explanation}</p>
          ${isWrong ? `
            <div class="explanation-hint">
              <strong>Why your selection was wrong:</strong> Option ${String.fromCharCode(65 + selectedIdx)} does not satisfy the relational constraints. The valid answer is <strong>Option ${String.fromCharCode(65 + q.correct)}</strong>.
            </div>
          ` : ''}
        </div>
      `;
    }

    html += `</div>`; // .quiz-question-card
    return html;
  }

  renderResultsDashboard() {
    const total = this.data.questions.length;
    let correctCount = 0;
    let easyCorrect = 0, easyTotal = 0;
    let medCorrect = 0, medTotal = 0;
    let queryCorrect = 0, queryTotal = 0;

    this.data.questions.forEach(q => {
      const isCorrect = this.userAnswers[q.id] === q.correct;
      if (q.difficulty === 'easy') { easyTotal++; if (isCorrect) easyCorrect++; }
      if (q.difficulty === 'medium') { medTotal++; if (isCorrect) medCorrect++; }
      if (q.difficulty === 'query') { queryTotal++; if (isCorrect) queryCorrect++; }
      if (isCorrect) correctCount++;
    });

    const percent = Math.round((correctCount / total) * 100);

    let gradeTitle = 'Mastery Achieved';
    let gradeBadge = 'Mastery (90%+)';
    let gradeColor = '#2dd4bf';

    if (percent < 50) {
      gradeTitle = 'Needs Concept Review';
      gradeBadge = 'Review Theory';
      gradeColor = '#fb7185';
    } else if (percent < 75) {
      gradeTitle = 'Good Progress';
      gradeBadge = 'Intermediate';
      gradeColor = '#fbbf24';
    } else if (percent < 90) {
      gradeTitle = 'Proficient Database Architect';
      gradeBadge = 'Proficient';
      gradeColor = '#38bdf8';
    }

    return `
      <div class="quiz-results-card animate-in">
        <div class="results-main-col">
          <div class="results-badge-tag" style="border-color: ${gradeColor}; color: ${gradeColor};">
            ${gradeBadge}
          </div>
          <h3 class="results-score-title">Your Score: <span class="score-highlight">${correctCount} / ${total}</span></h3>
          <div class="results-percent-hero" style="color: ${gradeColor};">
            ${percent}%
          </div>
          <p class="results-evaluation">
            ${percent >= 80 ? 'Exceptional! You demonstrated a deep understanding of normalization rules, functional dependencies, and schema decomposition queries.' : 'Good attempt! Review the question explanations below to master the specific normal form rules and query edge cases you missed.'}
          </p>
        </div>

        <div class="results-breakdown-col">
          <div class="breakdown-stat-tile">
            <span class="breakdown-label">Easy Concepts</span>
            <span class="breakdown-val">${easyCorrect} / ${easyTotal}</span>
            <div class="breakdown-bar-bg"><div class="breakdown-bar-fill fill-easy" style="width: ${(easyCorrect/easyTotal)*100}%"></div></div>
          </div>
          <div class="breakdown-stat-tile">
            <span class="breakdown-label">Medium Theory</span>
            <span class="breakdown-val">${medCorrect} / ${medTotal}</span>
            <div class="breakdown-bar-bg"><div class="breakdown-bar-fill fill-medium" style="width: ${(medCorrect/medTotal)*100}%"></div></div>
          </div>
          <div class="breakdown-stat-tile">
            <span class="breakdown-label">Query & Schema SQL</span>
            <span class="breakdown-val">${queryCorrect} / ${queryTotal}</span>
            <div class="breakdown-bar-bg"><div class="breakdown-bar-fill fill-query" style="width: ${(queryCorrect/queryTotal)*100}%"></div></div>
          </div>
        </div>
      </div>
    `;
  }

  selectOption(questionId, optionIndex) {
    if (this.submitted) return;
    this.userAnswers[questionId] = optionIndex;
    this.render();
  }

  setFilter(filterName) {
    this.activeFilter = filterName;
    this.render();
  }

  submitQuiz() {
    const total = this.data.questions.length;
    const answeredCount = Object.keys(this.userAnswers).length;
    if (answeredCount < total) {
      const remaining = total - answeredCount;
      const confirmSubmit = confirm(`You still have ${remaining} unanswered question(s). Are you sure you want to grade the quiz now?`);
      if (!confirmSubmit) return;
    }
    this.submitted = true;
    this.render();
    const section = document.getElementById('chapterQuizSection');
    if (section) {
      window.scrollTo({ top: section.offsetTop - 70, behavior: 'smooth' });
    }
  }

  resetQuiz() {
    this.userAnswers = {};
    this.submitted = false;
    this.activeFilter = 'all';
    this.render();
    const section = document.getElementById('chapterQuizSection');
    if (section) {
      window.scrollTo({ top: section.offsetTop - 70, behavior: 'smooth' });
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Auto-boot on DOM ready if container exists
document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('chapter-quiz-mount');
  if (mount) {
    // Detect chapter from data attribute or filename
    const chapterKey = mount.getAttribute('data-chapter') || 'part1';
    window.currentQuiz = new ChapterQuizEngine(chapterKey, 'chapter-quiz-mount');
  }
});
