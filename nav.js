// ===== SHARED NAVIGATION DATA =====
const NAV_PAGES = [
  {
    label: "Overview",
    items: [
      { href: "index.html", icon: "🏠", text: "Home & Table of Contents", badge: "" }
    ]
  },
  {
    label: "Part 1 — Theory",
    items: [
      { href: "part1-normalization.html", icon: "📐", text: "1. Normalization (1NF–3NF)", badge: "3NF" },
      { href: "part2-keys-constraints.html", icon: "🔑", text: "2. Keys & Constraints", badge: "" },
      { href: "part3-ddl-dml-tcl.html", icon: "🛠️", text: "3. DDL · DML · TCL", badge: "" },
    ]
  },
  {
    label: "Part 2 — Querying",
    items: [
      { href: "part4-select-where.html", icon: "🔍", text: "4. SELECT · WHERE · ORDER BY", badge: "" },
      { href: "part5-functions.html", icon: "⚙️", text: "5. NULL · Functions · CAST", badge: "" },
    ]
  },
  {
    label: "Part 3 — Aggregation",
    items: [
      { href: "part6-groupby-having.html", icon: "📊", text: "6. GROUP BY · HAVING", badge: "" },
    ]
  },
  {
    label: "Part 4 — Multi-Table",
    items: [
      { href: "part7-joins.html", icon: "🔗", text: "7. All Joins · Self Join", badge: "" },
      { href: "part8-subqueries-sets.html", icon: "🧩", text: "8. Subqueries · Set Ops", badge: "ADV" },
    ]
  }
];

// ===== BUILD SIDEBAR =====
function buildSidebar(currentPage) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  let html = `
    <div class="sidebar-logo">
      <a href="index.html" style="text-decoration:none;">
        <span class="logo-mark">HSQLDB</span>
        <span class="logo-sub">Complete Handbook</span>
      </a>
    </div>
    <div class="sidebar-search">
      <input type="text" id="searchInput" placeholder="Search topics..." oninput="filterNav(this.value)" />
    </div>
    <nav class="sidebar-nav" id="sidebarNav">
  `;

  for (const section of NAV_PAGES) {
    html += `<div class="nav-section-label">${section.label}</div>`;
    for (const item of section.items) {
      const isActive = item.href === currentPage;
      const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      html += `
        <a href="${item.href}" class="nav-item${isActive ? ' active' : ''}" data-nav-text="${item.text.toLowerCase()}">
          <span class="nav-icon">${item.icon}</span>
          ${item.text}
          ${badge}
        </a>
      `;
    }
  }

  html += `</nav>`;
  sidebar.innerHTML = html;

  // Close sidebar when a nav link is tapped on mobile
  sidebar.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) backdrop.classList.remove('open');
      }
    });
  });
}

function filterNav(q) {
  const items = document.querySelectorAll('.nav-item[data-nav-text]');
  const term = q.toLowerCase().trim();
  items.forEach(item => {
    item.style.display = (!term || item.dataset.navText.includes(term)) ? '' : 'none';
  });
}

// ===== COPY CODE BUTTONS =====
function setupCopyButtons() {
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block-wrap').querySelector('pre');
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.textContent = '✓ Copied!';
        btn.style.color = '#3dd9c0';
        setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = ''; }, 2000);
      });
    });
  });
}

// ===== BACK TO TOP =====
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== ANIMATE SECTIONS =====
function setupAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.topic-section, .toc-card, .concept-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

function makeVisible(el) {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
}

// Override animate-in for plain CSS approach
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.topic-section, .toc-card, .concept-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 50 + i * 40);
  });
});

// ===== RESPONSIVE & THEME =====
function setupMobileAndTheme() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  // Hamburger Menu
  const hamburger = document.createElement('button');
  hamburger.innerHTML = '☰';
  hamburger.className = 'hamburger-btn';
  
  // Insert before breadcrumb
  const breadcrumb = document.querySelector('.topbar-breadcrumb');
  if (breadcrumb) {
    topbar.insertBefore(hamburger, breadcrumb);
  }

  // Sidebar toggle logic
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    // Create backdrop for mobile sidebar
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    hamburger.addEventListener('click', (e) => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('open');
      e.stopPropagation();
    });

    // Close sidebar if clicking backdrop or outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
      }
    });
    
    // Also close on backdrop click specifically
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
    });
  }

  // Theme Toggle
  const themeToggle = document.createElement('button');
  themeToggle.className = 'btn btn-ghost theme-toggle-btn';
  
  const currentTheme = localStorage.getItem('hsqldb-theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    themeToggle.innerHTML = '🌙 Dark';
  } else {
    themeToggle.innerHTML = '☀️ Light';
  }

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-theme');
    const isLight = document.documentElement.classList.contains('light-theme');
    localStorage.setItem('hsqldb-theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
  });

  const actions = document.querySelector('.topbar-actions');
  if (actions) {
    actions.insertBefore(themeToggle, actions.firstChild);
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setupCopyButtons();
  setupBackToTop();
  setupMobileAndTheme();
});
