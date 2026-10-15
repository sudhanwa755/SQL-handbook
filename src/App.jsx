import React, { useState, useEffect } from 'react';
import { Topbar } from './components/Topbar';
import { BreadcrumbTab } from './components/BreadcrumbTab';
import { WorkspaceSidebar } from './components/WorkspaceSidebar';
import { ProjectHero } from './components/ProjectHero';
import { LiveWindowFrame } from './components/LiveWindowFrame';
import { OverviewDashboard } from './components/OverviewDashboard';
import { ChapterReader } from './components/ChapterReader';
import { QuizEngine } from './components/QuizEngine';
import { CommandMatrix } from './components/CommandMatrix';
import { Footer } from './components/Footer';
import GlassDock from './components/ui/GlassDock';

import { Home, BookOpen, Award, Zap, Sun, Moon } from 'lucide-react';

import { CURRICULUM } from './data/curriculumData';
import { QUIZ_DATA } from './data/quizData';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeNav, setActiveNav] = useState('home');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Editor Tabs State
  const [tabs, setTabs] = useState([
    { id: 'overview', title: 'README.md — Interactive SQL Handbook', type: 'html' }
  ]);
  const [activeTabId, setActiveTabId] = useState('overview');

  // Currently viewed chapter and quiz IDs
  const [activeChapterId, setActiveChapterId] = useState('part1');
  const [activeQuizId, setActiveQuizId] = useState('part1');

  // Screen width detection (wide screen >= 768px, mobile < 768px)
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Helper to open or focus a tab
  const openTab = (newTab) => {
    setTabs((prev) => {
      const exists = prev.find(t => t.id === newTab.id);
      if (exists) return prev;
      return [...prev, newTab];
    });
    setActiveTabId(newTab.id);
  };

  const closeTab = (tabIdToClose) => {
    setTabs((prev) => {
      const filtered = prev.filter(t => t.id !== tabIdToClose);
      if (activeTabId === tabIdToClose) {
        if (filtered.length > 0) {
          setActiveTabId(filtered[filtered.length - 1].id);
        } else {
          setActiveTabId('overview');
          return [{ id: 'overview', title: 'README.md — Interactive SQL Handbook', type: 'html' }];
        }
      }
      return filtered;
    });
  };

  // Handle tree file selection
  const handleSelectFile = (fileId, fileType) => {
    if (fileType === 'chapter') {
      const ch = CURRICULUM.find(c => c.id === fileId);
      if (ch) {
        setActiveChapterId(ch.id);
        setActiveNav('curriculum');
        openTab({
          id: ch.id,
          title: ch.fileName,
          type: 'sql'
        });
      }
    } else if (fileType === 'quiz') {
      const cleanId = fileId.replace('quiz-', '');
      setActiveQuizId(cleanId);
      setActiveNav('quizzes');
      openTab({
        id: fileId,
        title: `${fileId}.test.sql`,
        type: 'quiz'
      });
    } else if (fileType === 'matrix') {
      setActiveNav('matrix');
      openTab({
        id: 'command-matrix',
        title: 'sql-command-matrix.sql',
        type: 'matrix'
      });
    } else if (fileType === 'overview') {
      setActiveNav('home');
      openTab({
        id: 'overview',
        title: 'README.md — Interactive SQL Handbook',
        type: 'html'
      });
    }
  };

  // Handle Top Nav Pill click
  const handleSelectNav = (navKey) => {
    setActiveNav(navKey);
    if (navKey === 'home') {
      openTab({ id: 'overview', title: 'README.md — Interactive SQL Handbook', type: 'html' });
    } else if (navKey === 'curriculum') {
      const ch = CURRICULUM.find(c => c.id === activeChapterId) || CURRICULUM[0];
      openTab({ id: ch.id, title: ch.fileName, type: 'sql' });
    } else if (navKey === 'quizzes') {
      openTab({ id: `quiz-${activeQuizId}`, title: `quiz-${activeQuizId}.test.sql`, type: 'quiz' });
    } else if (navKey === 'matrix') {
      openTab({ id: 'command-matrix', title: 'sql-command-matrix.sql', type: 'matrix' });
    }
  };

  // Direct chapter opening from card
  const handleOpenChapter = (chId) => {
    const ch = CURRICULUM.find(c => c.id === chId);
    if (ch) {
      setActiveChapterId(ch.id);
      setActiveNav('curriculum');
      openTab({ id: ch.id, title: ch.fileName, type: 'sql' });
    }
  };

  // Direct quiz opening from card
  const handleOpenQuiz = (chId) => {
    setActiveQuizId(chId);
    setActiveNav('quizzes');
    openTab({ id: `quiz-${chId}`, title: `quiz-${chId}.test.sql`, type: 'quiz' });
  };

  // Chapter navigation (Previous / Next)
  const handleNavigateChapter = (chapNum) => {
    const ch = CURRICULUM.find(c => c.chapterNumber === chapNum);
    if (ch) {
      setActiveChapterId(ch.id);
      setActiveNav('curriculum');
      openTab({ id: ch.id, title: ch.fileName, type: 'sql' });
    }
  };

  // Compute dynamic mock browser URL for textbook preview
  let mockBrowserUrl = "sql-handbook-edu.vercel.app/";
  if (activeTabId === 'overview') {
    mockBrowserUrl = "sql-handbook-edu.vercel.app/curriculum";
  } else if (activeTabId === 'command-matrix') {
    mockBrowserUrl = "sql-handbook-edu.vercel.app/reference/command-matrix";
  } else if (activeTabId.startsWith('quiz-')) {
    mockBrowserUrl = `sql-handbook-edu.vercel.app/assessments/${activeTabId.replace('quiz-', '')}`;
  } else {
    mockBrowserUrl = `sql-handbook-edu.vercel.app/chapters/${activeTabId}`;
  }

  // Active chapter object
  const currentChapter = CURRICULUM.find(c => c.id === activeChapterId) || CURRICULUM[0];

  // VengeanceUI Glass Dock Items
  const dockItems = [
    {
      title: 'Home',
      icon: Home,
      active: activeNav === 'home',
      onClick: () => handleSelectNav('home'),
    },
    {
      title: 'Curriculum',
      icon: BookOpen,
      active: activeNav === 'curriculum',
      onClick: () => handleSelectNav('curriculum'),
    },
    {
      title: 'Assessments',
      icon: Award,
      active: activeNav === 'quizzes',
      onClick: () => handleSelectNav('quizzes'),
    },
    {
      title: 'Commands',
      icon: Zap,
      active: activeNav === 'matrix',
      onClick: () => handleSelectNav('matrix'),
    },
    {
      title: theme === 'dark' ? 'Daylight' : 'Deep Space',
      icon: theme === 'dark' ? Sun : Moon,
      onClick: toggleTheme,
    },
  ];

  return (
    <div className="app-container">
      <div className="app-atmosphere"></div>

      {/* LIQUID GLASS TOPBAR (Holds Top-Center Expanded VengeanceUI Glass Dock for Wide Screens) */}
      <Topbar
        dockItems={dockItems}
        isMobile={isMobile}
        totalChapters={CURRICULUM.length}
        totalQuestions={160}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Breadcrumb Trail & Editor Tabs */}
      <BreadcrumbTab
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
        onCloseTab={closeTab}
      />

      {/* Main Workspace Layout */}
      <div className="workspace-layout">
        {/* Left Tree Workspace Sidebar */}
        <WorkspaceSidebar
          curriculum={CURRICULUM}
          selectedFileId={activeTabId}
          onSelectFile={handleSelectFile}
          isOpenOnMobile={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Main Canvas */}
        <main className="workspace-canvas pb-28">
          {/* Project Hero Header (Teaching Focus — ONLY on Home/Overview tab) */}
          {activeTabId === 'overview' && (
            <ProjectHero
              onStartLearning={() => handleOpenChapter('part1')}
              onExploreCurriculum={() => handleSelectNav('home')}
            />
          )}

          {/* Liquid Glass Viewport Window Frame */}
          <LiveWindowFrame
            currentUrl={mockBrowserUrl}
            isMaximized={isMaximized}
            onToggleMaximize={() => setIsMaximized(prev => !prev)}
          >
            {activeTabId === 'overview' && (
              <OverviewDashboard
                curriculum={CURRICULUM}
                onOpenChapter={handleOpenChapter}
                onOpenQuiz={handleOpenQuiz}
              />
            )}

            {activeTabId === 'command-matrix' && (
              <CommandMatrix />
            )}

            {activeTabId.startsWith('quiz-') && (
              <QuizEngine
                chapterId={activeQuizId}
                quizData={QUIZ_DATA}
                onBackToChapter={() => handleOpenChapter(activeQuizId)}
              />
            )}

            {/* Default to Chapter Reader if active tab is a chapter ID */}
            {activeTabId !== 'overview' && 
             activeTabId !== 'command-matrix' && 
             !activeTabId.startsWith('quiz-') && (
              <ChapterReader
                chapter={CURRICULUM.find(c => c.id === activeTabId) || currentChapter}
                onOpenQuiz={handleOpenQuiz}
                onNavigateChapter={handleNavigateChapter}
              />
            )}
          </LiveWindowFrame>

          {/* APPLICATION FOOTER: Clean Legal & Privacy Links and Policy Modals */}
          <Footer />
        </main>
      </div>

      {/* MOBILE BOTTOM DOCK: STRICTLY for Small Devices Only (< 768px) — Dead Center */}
      {isMobile && (
        <div className="vengeance-dock-container mobile-dock-container fixed bottom-3 left-0 right-0 mx-auto z-50 pointer-events-auto flex items-center justify-center w-fit">
          <GlassDock items={dockItems} mode="compact" />
        </div>
      )}
    </div>
  );
}

