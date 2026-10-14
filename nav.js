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
          ${numText ? `<span class="timeline-topic-num">${numText}</span> ` : ''}
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

// ===== 16. FORCE HTTPS REDIRECT =====
function enforceHTTPS() {
  if (
    window.location.protocol === 'http:' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    !window.location.hostname.endsWith('.local')
  ) {
    window.location.href = window.location.href.replace(/^http:/, 'https:');
  }
}

// ===== 17. PRIVACY-PRESERVING ANALYTICS MODULE =====
const Analytics = {
  initialized: false,

  init() {
    // Respect Do Not Track header
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
      console.info('[Analytics] Respecting Do Not Track (DNT) signal. Tracking disabled.');
      return;
    }

    // Check cookie consent
    const consent = localStorage.getItem('sql_cookie_consent');
    if (consent !== 'all') {
      return; // Only load telemetry if user gave consent
    }

    this.initialized = true;
    this.trackPageView();
    this.setupScrollDepthTracking();
  },

  trackPageView() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    this.trackEvent('Navigation', 'page_view', page);
  },

  trackEvent(category, action, label = '', value = 0) {
    if (!this.initialized && localStorage.getItem('sql_cookie_consent') !== 'all') return;

    // Dispatch custom event for extensible integrations (GA4, Cloudflare, Plausible)
    const eventDetail = { category, action, label, value, timestamp: Date.now() };
    window.dispatchEvent(new CustomEvent('sql_analytics_event', { detail: eventDetail }));

    // Support standard Google Analytics gtag if installed
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }

    // Support Cloudflare Beacon or Plausible if installed
    if (typeof window.plausible === 'function') {
      window.plausible(action, { props: { category, label } });
    }
  },

  setupScrollDepthTracking() {
    let tracked50 = false;
    let tracked90 = false;

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50 && !tracked50) {
        tracked50 = true;
        this.trackEvent('Engagement', 'scroll_depth_50', window.location.pathname);
      }
      if (scrollPercent >= 90 && !tracked90) {
        tracked90 = true;
        this.trackEvent('Engagement', 'scroll_depth_completed', window.location.pathname);
      }
    }, { passive: true });
  }
};

// ===== 18. SPATIAL COOKIE CONSENT BANNER =====
function setupCookieConsent() {
  const existingChoice = localStorage.getItem('sql_cookie_consent');
  if (existingChoice) {
    if (existingChoice === 'all') {
      Analytics.init();
    }
    return;
  }

  // Create banner DOM
  let banner = document.getElementById('cookieConsentBar');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'cookieConsentBar';
    banner.className = 'cookie-consent-bar';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie and privacy preferences');
    banner.innerHTML = `
      <div class="cookie-content-wrap">
        <div class="cookie-icon-orb">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
            <path d="M8.5 8.5v.01"></path>
            <path d="M16 15.5v.01"></path>
            <path d="M12 12v.01"></path>
            <path d="M11 17v.01"></path>
            <path d="M7 13v.01"></path>
          </svg>
        </div>
        <div class="cookie-text-col">
          <div class="cookie-title">Privacy & Local Storage</div>
          <p class="cookie-desc">
            We use on-device local storage to save your dark/light theme and chapter quiz scores. 
            No sensitive personal data is collected or sold.
          </p>
          <div class="cookie-actions-row">
            <button class="cookie-btn-accept" id="btnAcceptCookies">Accept All</button>
            <button class="cookie-btn-essential" id="btnEssentialCookies">Essential Only</button>
            <a href="privacy.html" class="cookie-btn-link" onclick="openLegalModal('privacy'); return false;">Privacy Policy</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
  }

  // Delay display slightly for smooth page entrance
  setTimeout(() => {
    banner.style.display = 'block';
  }, 1200);

  document.getElementById('btnAcceptCookies')?.addEventListener('click', () => {
    localStorage.setItem('sql_cookie_consent', 'all');
    banner.style.display = 'none';
    Analytics.init();
  });

  document.getElementById('btnEssentialCookies')?.addEventListener('click', () => {
    localStorage.setItem('sql_cookie_consent', 'essential');
    banner.style.display = 'none';
  });
}

// Global hook to reopen cookie settings from footer or modal
window.reopenCookieSettings = function() {
  openLegalModal('cookies');
};

// ===== 19. FORM VALIDATION & BOT/SPAM PROTECTION =====
function setupInteractiveForms() {
  document.querySelectorAll('form.needs-validation').forEach(form => {
    // Record timestamp when form was rendered to detect instant bot submissions
    form.dataset.renderedAt = Date.now().toString();

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const statusAlert = form.querySelector('.form-status-alert');

      // 1. Bot Honeypot Check
      const honeypot = form.querySelector('input[name="_honeypot"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('[Anti-Spam] Bot detected via honeypot field.');
        // Fake success to misdirect bot
        if (statusAlert) {
          statusAlert.className = 'form-status-alert alert-success';
          statusAlert.style.display = 'block';
          statusAlert.textContent = 'Feedback received! Thank you for helping improve the handbook.';
        }
        form.reset();
        return;
      }

      // 2. Bot Time-to-Submit Verification (Must take > 2.0 seconds)
      const renderedAt = parseInt(form.dataset.renderedAt || '0', 10);
      const elapsed = Date.now() - renderedAt;
      if (elapsed < 2000) {
        console.warn('[Anti-Spam] Bot detected: submission too rapid (' + elapsed + 'ms).');
        return;
      }

      // 3. Field-by-Field Input Validation
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      inputs.forEach(input => {
        const value = input.value.trim();
        let fieldValid = true;

        if (!value) {
          fieldValid = false;
        } else if (input.type === 'email') {
          // Standard RFC compliant email regex
          const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
          if (!emailRegex.test(value)) {
            fieldValid = false;
          }
        }

        if (!fieldValid) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });

      if (isValid) {
        if (statusAlert) {
          statusAlert.className = 'form-status-alert alert-success';
          statusAlert.style.display = 'block';
          statusAlert.innerHTML = '<span style="font-weight:700;">✓ Submission Confirmed!</span> Thank you for your feedback.';
        }

        Analytics.trackEvent('Form', 'feedback_submitted', form.id || 'general_form');
        form.reset();
        inputs.forEach(i => i.classList.remove('is-valid'));

        // Refresh timestamp
        form.dataset.renderedAt = Date.now().toString();
      }
    });

    // Clear invalid class on live input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  });
}

// ===== 20. MASTER SITE FOOTER INJECTION (CLEAN BOTTOM BAR) =====
function setupMasterFooter() {
  if (document.querySelector('.site-master-footer')) return;

  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  const footer = document.createElement('footer');
  footer.className = 'site-master-footer';
  footer.innerHTML = `
    <div class="footer-bottom-row" style="border-top:none; padding-top:0;">
      <div>
        © 2026 The SQL Handbook. Created by 
        <a href="https://github.com/sudhanwa755" target="_blank" rel="noopener noreferrer" style="color:var(--accent-cyan); font-weight:600;">@sudhanwa755</a>. 
        Open source under MIT License.
      </div>
      <div class="footer-legal-links">
        <a href="privacy.html" onclick="openLegalModal('privacy'); return false;">Privacy</a>
        <span>·</span>
        <a href="terms.html" onclick="openLegalModal('terms'); return false;">Terms</a>
        <span>·</span>
        <a href="404.html">404</a>
        <span>·</span>
        <a href="https://github.com/sudhanwa755/SQL-handbook" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span>·</span>
        <a href="sitemap.xml">Sitemap</a>
        <span>·</span>
        <a href="javascript:void(0)" onclick="openLegalModal('cookies')">Cookie Preferences</a>
      </div>
    </div>
  `;

  mainContent.appendChild(footer);
}

// ===== 21. IN-PAGE SPATIAL LEGAL & COOKIE MODAL ENGINE (APPEARS AS A DIV) =====
function openLegalModal(tab = 'privacy') {
  let overlay = document.getElementById('legalModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'legalModalOverlay';
    overlay.className = 'spatial-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.onclick = (e) => {
      if (e.target === overlay) closeLegalModal();
    };
    document.body.appendChild(overlay);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeLegalModal();
      }
    });
  }

  renderModalContent(tab);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
  const overlay = document.getElementById('legalModalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
  }
  document.body.style.overflow = '';
}

function renderModalContent(activeTab) {
  const overlay = document.getElementById('legalModalOverlay');
  if (!overlay) return;

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'cookies', label: 'Cookie Preferences' }
  ];

  let tabButtons = tabs.map(t => `
    <button class="spatial-modal-tab-btn${activeTab === t.id ? ' active' : ''}" onclick="renderModalContent('${t.id}')">
      ${t.label}
    </button>
  `).join('');

  let title = 'Privacy & Legal Transparency';
  let bodyHtml = '';

  if (activeTab === 'privacy') {
    title = 'Privacy Policy';
    bodyHtml = `
      <h3>1. Zero Personal Profiling & Monetization</h3>
      <p>
        The SQL Handbook is an open-source educational platform engineered with a strict privacy-first architecture. 
        We do not collect names, emails, passwords, phone numbers, or demographic profiles. You can access all 8 chapters 
        and 160 assessment questions without registering or signing in.
      </p>

      <h3>2. Client-Side Local Storage</h3>
      <p>
        We store essential functional preferences inside your browser's <code>localStorage</code> API. This data never leaves your computer:
      </p>
      <ul>
        <li><code>theme</code>: Remembers whether you prefer Dark Mode or Daylight Mode.</li>
        <li><code>sql_quiz_*</code>: Saves your chapter quiz answer selections and final test scores locally so you can review your performance.</li>
        <li><code>sql_cookie_consent</code>: Remembers your telemetry preference (<code>'all'</code> or <code>'essential'</code>).</li>
      </ul>

      <h3>3. Interactive Data Wipe</h3>
      <p>You have full authority over all data saved on your machine:</p>
      <div style="display:flex; gap:10px; margin:14px 0; flex-wrap:wrap;">
        <button class="btn btn-secondary" style="min-height:38px; padding:6px 14px; font-size:13px;" onclick="modalInspectStorage()">Inspect Stored Keys</button>
        <button class="btn btn-danger" style="min-height:38px; padding:6px 14px; font-size:13px;" onclick="modalWipeStorage()">Wipe All Local Data</button>
      </div>
      <div id="modalStorageStatus" style="font-size:13px; color:var(--accent-teal); display:none; padding:8px 12px; background:var(--glass-pill); border-radius:8px;"></div>

      <h3>4. GDPR & CCPA/CPRA Rights</h3>
      <p>
        Under statutory privacy laws (GDPR, CCPA/CPRA), you have the right to access and delete your personal data. 
        Because our servers retain no personal records, you can execute this right immediately at any time via the wipe button above.
      </p>
    `;
  } else if (activeTab === 'terms') {
    title = 'Terms & Conditions';
    bodyHtml = `
      <h3>1. Educational Open-Source Platform</h3>
      <p>
        The SQL Handbook is provided free of charge for students, database administrators, and software engineers. 
        All curriculum guides, visual diagrams, and code snippets are licensed under the permissive <strong>MIT License</strong>.
      </p>

      <h3>2. Production Database Disclaimer ("As-Is")</h3>
      <p>
        All queries and relational constraints are provided for educational purposes without warranties of any kind. 
        Before executing DDL (<code>DROP</code>, <code>TRUNCATE</code>, <code>ALTER</code>) or DML (<code>UPDATE</code>, <code>DELETE</code>) 
        on production systems, always test within a development sandbox and maintain verified backups.
      </p>

      <h3>3. Acceptable Use</h3>
      <p>
        Users agree not to launch automated denial-of-service attempts, malicious script injection, or abusive scraping against the platform.
      </p>

      <h3>4. Authorship & Attribution</h3>
      <p>
        Created and maintained by <strong>Sudhanwa (@sudhanwa755)</strong>. Downstream forks and classroom syllabus distributions 
        must preserve original copyright notices.
      </p>
    `;
  } else if (activeTab === 'cookies') {
    title = 'Cookie & Storage Preferences';
    const currentConsent = localStorage.getItem('sql_cookie_consent') || 'none';
    const badgeText = currentConsent === 'all' ? 'Analytics + Functional Storage (Accepted)' : (currentConsent === 'essential' ? 'Essential Storage Only' : 'No Consent Recorded');
    const badgeColor = currentConsent === 'all' ? 'var(--accent-emerald)' : 'var(--accent-gold)';

    bodyHtml = `
      <h3>Current Setting</h3>
      <p>
        <span style="display:inline-block; padding:4px 12px; border-radius:999px; background:var(--glass-pill); border:1px solid var(--glass-border); color:${badgeColor}; font-weight:700; font-size:13px;">
          ${badgeText}
        </span>
      </p>

      <h3>Manage Your Choice</h3>
      <p>
        We do not use advertising cookies. We only use local storage for your theme preferences and chapter assessment scores, 
        plus optional anonymous privacy-respecting pageview metrics.
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <button class="cta-primary-btn" style="justify-content:center; padding:10px 20px; font-size:14px;" onclick="modalSaveConsent('all')">
          ✓ Accept All (Analytics & Local Storage)
        </button>
        <button class="cta-secondary-btn" style="justify-content:center; padding:10px 20px; font-size:14px;" onclick="modalSaveConsent('essential')">
          Essential Storage Only (Theme & Quizzes)
        </button>
      </div>
      <div id="modalConsentAlert" style="font-size:13px; color:var(--accent-green); display:none; padding:8px 12px; background:var(--glass-pill); border-radius:8px;"></div>
    `;
  }

  overlay.innerHTML = `
    <div class="spatial-modal-dialog" onclick="event.stopPropagation()">
      <div class="spatial-modal-header">
        <div class="spatial-modal-title-wrap">
          <div class="spatial-modal-icon-orb">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h2 class="spatial-modal-title">${title}</h2>
        </div>
        <button class="spatial-modal-close-btn" onclick="closeLegalModal()" aria-label="Close dialog">✕</button>
      </div>

      <div class="spatial-modal-tabs">
        ${tabButtons}
      </div>

      <div class="spatial-modal-body">
        ${bodyHtml}
      </div>

      <div class="spatial-modal-footer">
        <span style="font-size:12.5px; color:var(--text-muted);">
          The SQL Handbook · Open Source MIT
        </span>
        <button class="btn btn-secondary" style="min-height:36px; padding:6px 18px; font-size:13px;" onclick="closeLegalModal()">
          Close
        </button>
      </div>
    </div>
  `;
}

// Modal Storage Helpers
window.modalInspectStorage = function() {
  const el = document.getElementById('modalStorageStatus');
  if (!el) return;
  const keys = Object.keys(localStorage);
  if (!keys.length) {
    el.style.display = 'block';
    el.textContent = 'No keys currently stored in localStorage.';
    return;
  }
  el.style.display = 'block';
  el.innerHTML = '<strong>Stored Keys (' + keys.length + '):</strong> ' + keys.map(k => `<code>${k}</code>`).join(', ');
};

window.modalWipeStorage = function() {
  if (confirm('Clear all stored theme preferences, quiz answers, and consent cookies?')) {
    localStorage.clear();
    const el = document.getElementById('modalStorageStatus');
    if (el) {
      el.style.display = 'block';
      el.textContent = '✓ All local storage items have been wiped.';
    }
  }
};

window.modalSaveConsent = function(level) {
  localStorage.setItem('sql_cookie_consent', level);
  const banner = document.getElementById('cookieConsentBar');
  if (banner) banner.style.display = 'none';
  if (level === 'all') Analytics.init();
  const el = document.getElementById('modalConsentAlert');
  if (el) {
    el.style.display = 'block';
    el.textContent = '✓ Preferences saved: ' + (level === 'all' ? 'All Accepted' : 'Essential Only');
  }
  setTimeout(() => {
    renderModalContent('cookies');
  }, 600);
};

window.openLegalModal = openLegalModal;
window.closeLegalModal = closeLegalModal;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  enforceHTTPS();
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
  setupCookieConsent();
  setupInteractiveForms();
  setupMasterFooter();
});


