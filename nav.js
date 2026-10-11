// ==========================================================================
// HSQLDB / SQL HANDBOOK — SPATIAL UI & NAVIGATION ENGINE
// Powers the spatial glassmorphism atmosphere, cursor spotlight tracking,
// Mac window chrome, theme toggle switch, chapter filters, and view toggles.
// ==========================================================================

// ===== SHARED NAVIGATION DATA =====
const NAV_PAGES = [
  {
    partNumber: "00",
    label: "Overview",
    items: [
      {
        href: "index.html",
        icon: '<i data-lucide="compass" class="icon"></i>',
        text: "Handbook Index",
        sub: "Curriculum & Cheat Sheet",
        badge: "Home",
        badgeClass: "nav-badge-blue"
      }
    ]
  },
  {
    partNumber: "01",
    label: "Database Theory",
    items: [
      {
        href: "part1-normalization.html",
        icon: '<i data-lucide="layers" class="icon"></i>',
        text: "1. Normalization",
        sub: "1NF, 2NF, 3NF & Anomalies",
        badge: "3NF",
        badgeClass: "nav-badge-teal"
      },
      {
        href: "part2-keys-constraints.html",
        icon: '<i data-lucide="key" class="icon"></i>',
        text: "2. Keys & Constraints",
        sub: "PK, FK, UNIQUE, CHECK",
        badge: "Core",
        badgeClass: "nav-badge-gold"
      },
      {
        href: "part3-ddl-dml-tcl.html",
        icon: '<i data-lucide="terminal" class="icon"></i>',
        text: "3. DDL · DML · TCL",
        sub: "CREATE, ALTER, Transactions",
        badge: "Ops",
        badgeClass: "nav-badge-violet"
      }
    ]
  },
  {
    partNumber: "02",
    label: "Data Querying",
    items: [
      {
        href: "part4-select-where.html",
        icon: '<i data-lucide="search" class="icon"></i>',
        text: "4. SELECT · WHERE",
        sub: "Operators, LIKE, ORDER BY",
        badge: "Query",
        badgeClass: "nav-badge-blue"
      },
      {
        href: "part5-functions.html",
        icon: '<i data-lucide="cpu" class="icon"></i>',
        text: "5. Functions & NULL",
        sub: "Math, Strings, Dates, CAST",
        badge: "Logic",
        badgeClass: "nav-badge-green"
      }
    ]
  },
  {
    partNumber: "03",
    label: "Aggregation & Stats",
    items: [
      {
        href: "part6-groupby-having.html",
        icon: '<i data-lucide="bar-chart-2" class="icon"></i>',
        text: "6. GROUP BY & HAVING",
        sub: "Aggregates vs Filters",
        badge: "Stats",
        badgeClass: "nav-badge-gold"
      }
    ]
  },
  {
    partNumber: "04",
    label: "Relational Queries",
    items: [
      {
        href: "part7-joins.html",
        icon: '<i data-lucide="git-merge" class="icon"></i>',
        text: "7. All SQL Joins",
        sub: "INNER, OUTER, CROSS, SELF",
        badge: "Joins",
        badgeClass: "nav-badge-coral"
      },
      {
        href: "part8-subqueries-sets.html",
        icon: '<i data-lucide="network" class="icon"></i>',
        text: "8. Subqueries & Sets",
        sub: "Correlated, EXISTS, UNION",
        badge: "Advanced",
        badgeClass: "nav-badge-violet"
      }
    ]
  }
];

// ===== 1. SPATIAL ATMOSPHERE INJECTION =====
function setupSpatialAtmosphere() {
  if (document.querySelector('.spatial-background')) return;

  const bg = document.createElement('div');
  bg.className = 'spatial-background';
  bg.setAttribute('aria-hidden', 'true');
  bg.innerHTML = `
    <div class="spatial-orb orb-1"></div>
    <div class="spatial-orb orb-2"></div>
    <div class="spatial-orb orb-3"></div>
    <div class="spatial-grid"></div>
  `;
  document.body.prepend(bg);
}

// ===== 2. BUILD SPATIAL SIDEBAR (MODERN TILE & TIMELINE HUB) =====
function buildSidebar(currentPage) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  if (!currentPage) {
    const parts = window.location.pathname.split('/');
    currentPage = parts[parts.length - 1] || 'index.html';
  }

  let html = `
    <!-- Brand Header -->
    <div class="sidebar-brand-header">
      <a href="index.html" class="sidebar-brand-link">
        <div class="brand-emblem-orb">
          <i data-lucide="database" class="icon"></i>
        </div>
        <div class="brand-title-wrap">
          <span class="brand-name">SQL Studio</span>
          <span class="brand-tagline">HSQLDB Handbook</span>
        </div>
      </a>
    </div>

    <!-- Live Curriculum Pill -->
    <div class="sidebar-curriculum-chip">
      <span class="curriculum-dot"></span>
      <span>8 Chapters · 60+ Topics</span>
    </div>

    <!-- HUD Search Box with Shortcut Keycap -->
    <div class="sidebar-search-box">
      <div class="search-input-wrap">
        <svg class="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="searchInput" placeholder="Search handbook (Press /)..." oninput="filterNav(this.value)" autocomplete="off" />
        <span class="search-key-badge">/</span>
      </div>
    </div>

    <!-- Navigation Scroll Area -->
    <nav class="sidebar-nav" id="sidebarNav">
  `;

  for (const section of NAV_PAGES) {
    const hasActivePage = (currentPage && currentPage !== 'index.html') && section.items.some(item => item.href === currentPage);
    const isCollapsed = !hasActivePage;

    html += `
      <div class="sidebar-section-header${isCollapsed ? ' collapsed' : ''}${hasActivePage ? ' has-active' : ''}" onclick="toggleSection(this)">
        <span class="section-badge">${section.partNumber}</span>
        <span class="section-title">${section.label}</span>
        <span class="section-chevron">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>
      <div class="nav-section-items${isCollapsed ? ' collapsed' : ''}">
    `;

    for (const item of section.items) {
      const isActive = item.href === currentPage;
      const isChapter = item.href.startsWith('part');
      const quizPill = isChapter ? `<span class="nav-quiz-pill" title="Includes 20-Q Assessment"><span class="quiz-pulse-dot"></span>20Q</span>` : '';
      const badgeHtml = item.badge ? `<span class="nav-badge ${item.badgeClass || 'nav-badge-teal'}">${item.badge}</span>` : '';
      const badgesWrap = (badgeHtml || quizPill) ? `<div class="nav-badges-wrap">${badgeHtml}${quizPill}</div>` : '';
      const filterKeywords = `${item.text} ${item.sub || ''} ${section.label} quiz 20q`.toLowerCase();

      html += `
        <a href="${item.href}" class="sidebar-nav-card${isActive ? ' active' : ''}" data-nav-text="${filterKeywords}">
          <div class="nav-card-left">
            <span class="nav-icon-badge">${item.icon}</span>
            <div class="nav-text-col">
              <span class="nav-item-title">${item.text}</span>
              ${item.sub ? `<span class="nav-item-sub">${item.sub}</span>` : ''}
            </div>
          </div>
          ${badgesWrap}
        </a>
      `;

      if (isActive) {
        html += `<div id="scrollspy-container" class="scrollspy-timeline-tree"></div>`;
      }
    }
    html += `</div>`;
  }

  html += `</nav>`;
  sidebar.innerHTML = html;

  // Re-render Lucide icons
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Populate scrollspy timeline if on chapter page
  setupScrollSpy();

  // Close sidebar when a nav link is tapped on mobile
  sidebar.querySelectorAll('.sidebar-nav-card, .timeline-topic-node').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) backdrop.classList.remove('open');
      }
    });
  });
}

function toggleSection(labelEl) {
  const isCurrentlyCollapsed = labelEl.classList.contains('collapsed');

  // Accordion mode: collapse all sections first
  document.querySelectorAll('.sidebar-section-header').forEach(header => {
    header.classList.add('collapsed');
    const items = header.nextElementSibling;
    if (items) {
      items.classList.add('collapsed');
    }
  });

  // If the clicked concept was collapsed, maximize only this particular one
  if (isCurrentlyCollapsed) {
    labelEl.classList.remove('collapsed');
    const itemsEl = labelEl.nextElementSibling;
    if (itemsEl) {
      itemsEl.classList.remove('collapsed');
    }
  }
}

function filterNav(q) {
  const items = document.querySelectorAll('.sidebar-nav-card[data-nav-text], .nav-item[data-nav-text]');
  const term = q.toLowerCase().trim();
  items.forEach(item => {
    const matches = !term || item.dataset.navText.includes(term);
    item.style.display = matches ? 'flex' : 'none';
  });

  // Automatically uncollapse sections when searching, or restore collapsed accordion state when cleared
  document.querySelectorAll('.sidebar-section-header').forEach(header => {
    const itemsContainer = header.nextElementSibling;
    if (!itemsContainer) return;
    if (term) {
      header.classList.remove('collapsed');
      itemsContainer.classList.remove('collapsed');
      const hasVisibleItem = Array.from(itemsContainer.querySelectorAll('.sidebar-nav-card')).some(el => el.style.display !== 'none');
      header.style.display = hasVisibleItem ? 'flex' : 'none';
    } else {
      header.style.display = 'flex';
      const hasActive = header.classList.contains('has-active');
      if (hasActive) {
        header.classList.remove('collapsed');
        itemsContainer.classList.remove('collapsed');
      } else {
        header.classList.add('collapsed');
        itemsContainer.classList.add('collapsed');
      }
    }
  });
}

// ===== 3. MAC-STYLE SPATIAL CODE WINDOWS =====
function setupMacCodeWindows() {
  document.querySelectorAll('.code-block-wrap').forEach(wrap => {
    const header = wrap.querySelector('.code-header');
    if (!header || header.querySelector('.mac-dots')) return;

    const dots = document.createElement('div');
    dots.className = 'mac-dots';
    dots.innerHTML = `
      <span class="mac-dot dot-red"></span>
      <span class="mac-dot dot-yellow"></span>
      <span class="mac-dot dot-green"></span>
    `;

    const lang = header.querySelector('.code-lang');
    const leftWrap = document.createElement('div');
    leftWrap.className = 'code-header-left';
    leftWrap.appendChild(dots);
    if (lang) {
      header.insertBefore(leftWrap, lang);
      leftWrap.appendChild(lang);
    } else {
      header.prepend(leftWrap);
    }
  });
}

// ===== 4. SPATIAL SPECULAR SPOTLIGHT (MOUSE TRACKING) =====
function setupSpatialSpotlight() {
  const targetSelectors = '.concept-card, .toc-card, .index-chapter, .chapter-card, .command-card, .info-box, .stat-item, .code-block-wrap, .result-table-wrap, .nav-link-card';
  
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll(targetSelectors);
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40) {
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  });
}

// ===== 5. INTERACTIVE 3D PERSPECTIVE TILT =====
function setupSpatialTilt() {
  if (window.matchMedia('(hover: hover) and (min-width: 900px)').matches) {
    const tiltCards = document.querySelectorAll('.concept-card, .stat-item, .command-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (y / (rect.height / 2)) * -4;
        const rotY = (x / (rect.width / 2)) * 4;
        card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}

// ===== 6. COPY CODE BUTTONS & COMMAND CHIPS =====
function setupCopyButtons() {
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block-wrap').querySelector('pre');
      if (!pre) return;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        btn.style.color = '#38bdf8';
        btn.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2200);
      });
    });
  });

  // Interactive Command Chips on Index Page
  document.querySelectorAll('.cmd-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmdText = chip.innerText.trim();
      navigator.clipboard.writeText(cmdText).then(() => {
        const originalText = chip.innerText;
        chip.innerText = '✓ ' + originalText;
        chip.style.borderColor = 'var(--accent-teal)';
        chip.style.color = 'var(--accent-teal)';
        setTimeout(() => {
          chip.innerText = originalText;
          chip.style.borderColor = '';
          chip.style.color = '';
        }, 1500);
      });
    });
  });
}

// ===== 7. BACK TO TOP BUTTON =====
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 350);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== 8. KEYBOARD SHORTCUTS =====
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) ||
        (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
      e.preventDefault();
      const input = document.getElementById('searchInput');
      if (input) {
        input.focus();
        input.select();
      }
    }
  });
}

// ===== 9. VISIONOS FLOATING SPATIAL THEME TOGGLE SWITCH & MOBILE DRAWER =====
function setupMobileAndTheme() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  // Mobile Hamburger Button with inline SVG fallback
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-btn';
  hamburger.setAttribute('aria-label', 'Toggle Navigation Menu');
  hamburger.innerHTML = `
    <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
    </svg>
  `;
  
  const breadcrumb = document.querySelector('.topbar-breadcrumb');
  if (breadcrumb) {
    topbar.insertBefore(hamburger, breadcrumb);
  } else {
    topbar.prepend(hamburger);
  }

  // Sidebar toggle logic with backdrop & keyboard/link dismissal
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.classList.remove('sidebar-open');
    };

    const toggleSidebar = (e) => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('open');
      document.body.classList.toggle('sidebar-open');
      if (e) e.stopPropagation();
    };

    hamburger.addEventListener('click', toggleSidebar);

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        closeSidebar();
      }
    });

    backdrop.addEventListener('click', closeSidebar);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    // Close sidebar when navigating to internal anchor on mobile/tablet
    sidebar.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && window.innerWidth <= 1024) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          closeSidebar();
        }
      }
    });
  }

  // Modern VisionOS Spatial Glass Theme Toggle Switch
  const currentTheme = localStorage.getItem('hsqldb-theme') || 'dark';
  const isLightInitial = currentTheme === 'light';
  if (isLightInitial) {
    document.documentElement.classList.add('light-theme');
  }

  const themeToggle = document.createElement('button');
  themeToggle.className = 'spatial-theme-toggle';
  themeToggle.id = 'themeToggleBtn';
  themeToggle.setAttribute('aria-label', 'Toggle visual theme');
  themeToggle.setAttribute('role', 'switch');
  themeToggle.setAttribute('aria-checked', isLightInitial ? 'true' : 'false');
  
  themeToggle.innerHTML = `
    <span class="toggle-track">
      <span class="toggle-icon icon-sun" title="Light Theme">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </span>
      <span class="toggle-icon icon-moon" title="Dark Theme">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </span>
      <span class="toggle-thumb"></span>
    </span>
  `;

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-theme');
    const isLight = document.documentElement.classList.contains('light-theme');
    localStorage.setItem('hsqldb-theme', isLight ? 'light' : 'dark');
    themeToggle.setAttribute('aria-checked', isLight ? 'true' : 'false');
  });

  const actions = document.querySelector('.topbar-actions');
  if (actions) {
    actions.insertBefore(themeToggle, actions.firstChild);
  }
}

// ===== 10. READING PROGRESS BAR =====
function setupProgressBar() {
  const container = document.createElement('div');
  container.className = 'reading-progress-container';
  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  container.appendChild(bar);
  document.body.appendChild(container);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (height > 0) ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + '%';
  });
}

// ===== 11. SCROLLSPY (SUBWAY TOPIC TIMELINE) =====
function setupScrollSpy() {
  const container = document.getElementById('scrollspy-container');
  if (!container) return;

  const sections = document.querySelectorAll('.topic-section');
  if (sections.length === 0) return;

  let html = '';
  sections.forEach((sec) => {
    const h2 = sec.querySelector('h2');
    const num = sec.querySelector('.section-num');
    const anchor = sec.querySelector('.section-anchor');
    if (!h2 || !anchor) return;
    const id = anchor.id;
    const isQuiz = sec.classList.contains('quiz-section-root') || id.includes('quiz') || h2.innerText.toLowerCase().includes('quiz');

    if (isQuiz) {
      html += `
        <a href="#${id}" class="timeline-topic-node timeline-quiz-highlight scrollspy-link" data-target="${id}">
          <span class="timeline-quiz-sparkle">🏆</span>
          <span class="timeline-quiz-badge">20Q QUIZ</span>
          <span class="timeline-topic-label">Chapter Assessment</span>
        </a>
      `;
    } else {
      const numText = num && num.innerText.trim() !== '' ? num.innerText.trim() : '';
      let label = h2.innerText.replace(numText, '').trim();

      html += `
        <a href="#${id}" class="timeline-topic-node scrollspy-link" data-target="${id}">
          <span class="timeline-dot"></span>
          ${numText ? `<span class="timeline-topic-num">${numText}</span>` : ''}
          <span class="timeline-topic-label">${label}</span>
        </a>
      `;
    }
  });

  container.innerHTML = html;

  const links = container.querySelectorAll('.scrollspy-link');
  if (!links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const anchor = entry.target.querySelector('.section-anchor');
        if (anchor) {
          const activeLink = container.querySelector(`[data-target="${anchor.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      }
    });
  }, { threshold: 0.1, rootMargin: "-10% 0px -80% 0px" });

  sections.forEach(sec => observer.observe(sec));
}

// ===== 12. CHAPTER FILTER TABS (INDEX PAGE) =====
function setupChapterFilter() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const chapterCards = document.querySelectorAll('.chapter-card');
  if (!filterPills.length || !chapterCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      chapterCards.forEach(card => {
        const cardPart = card.getAttribute('data-part');
        if (filter === 'all' || cardPart === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// ===== 13. VIEW MODE TOGGLE (INDEX PAGE COMMANDS) =====
function setupViewToggle() {
  const toggleBtns = document.querySelectorAll('.view-toggle-btn');
  const gridView = document.getElementById('commandGridView');
  const tableView = document.getElementById('commandTableView');
  if (!toggleBtns.length || !gridView || !tableView) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.getAttribute('data-view');
      if (view === 'grid') {
        gridView.style.display = 'grid';
        tableView.style.display = 'none';
      } else {
        gridView.style.display = 'none';
        tableView.style.display = 'block';
      }
    });
  });
}

// ===== 14. DYNAMIC RESPONSIVE TABLE CONTAINERS =====
function setupResponsiveTables() {
  // Find all tables that are not already safely wrapped in a responsive scroll container
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    const parent = table.parentElement;
    if (
      !parent.classList.contains('table-chrome') &&
      !parent.classList.contains('result-table-wrap') &&
      !parent.classList.contains('table-scroll-wrap')
    ) {
      const wrap = document.createElement('div');
      wrap.className = 'table-scroll-wrap';
      parent.insertBefore(wrap, table);
      wrap.appendChild(table);
    }
  });
}

// ===== 15. TABLE OVERFLOW HINTS =====
function setupTableScrollHints() {
  const checkOverflow = () => {
    document.querySelectorAll('.table-chrome, .result-table-wrap, .table-scroll-wrap').forEach(wrap => {
      const hint = wrap.querySelector('.table-scroll-hint');
      if (!hint) return;
      const isOverflowing = wrap.scrollWidth > wrap.clientWidth;
      hint.style.display = isOverflowing ? 'inline-flex' : 'none';
      
      wrap.addEventListener('scroll', () => {
        if (wrap.scrollLeft > 20) {
          hint.style.opacity = '0.3';
        } else {
          hint.style.opacity = '1';
        }
      }, { passive: true });
    });
  };

  checkOverflow();
  window.addEventListener('resize', checkOverflow);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  setupSpatialAtmosphere();
  setupMacCodeWindows();
  setupSpatialSpotlight();
  setupSpatialTilt();
  setupCopyButtons();
  setupBackToTop();
  setupKeyboardShortcuts();
  setupMobileAndTheme();
  setupProgressBar();
  setupScrollSpy();
  setupChapterFilter();
  setupViewToggle();
  setupResponsiveTables();
  setupTableScrollHints();
});

