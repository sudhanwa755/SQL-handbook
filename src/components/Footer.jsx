import React, { useState } from 'react';
import { Shield, FileText, Layers, X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  // Modal State for Policies: 'privacy' | 'terms' | 'cookies' | 'sitemap' | null
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const canvas = document.querySelector('.workspace-canvas');
    if (canvas) {
      canvas.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* MINIMALIST 2-LINE FOOTER (MATCHING USER SCREENSHOT EXACTLY) */}
      <footer className="app-footer-wrapper w-full mt-16 mb-8 py-8 flex flex-col items-center justify-center gap-3 text-center border-t border-slate-800/40">
        {/* Navigation & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-slate-400 font-sans">
          <button
            onClick={() => setActiveModal('privacy')}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer font-normal"
          >
            Privacy Policy
          </button>

          <span className="text-slate-600 select-none">·</span>

          <button
            onClick={() => setActiveModal('terms')}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer font-normal"
          >
            Terms &amp; Conditions
          </button>

          <span className="text-slate-600 select-none">·</span>

          <button
            onClick={() => setActiveModal('cookies')}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer font-normal"
          >
            Cookie Policy
          </button>

          <span className="text-slate-600 select-none">·</span>

          <button
            onClick={() => setActiveModal('sitemap')}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer font-normal"
          >
            Sitemap
          </button>

          <span className="text-slate-600 select-none">·</span>

          <button
            onClick={scrollToTop}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer font-normal"
          >
            Back to Top ↑
          </button>
        </div>

        {/* Copyright & Author Line */}
        <p className="text-[12px] text-slate-500 font-sans mt-0.5">
          © 2026 Sudhanwa Kulkarni. Crafted with React, TypeScript &amp; Vite.
        </p>
      </footer>

      {/* ==========================================================
          MODAL DIALOG (EXACT 1:1 REPLICATION OF USER SCREENSHOT)
          ========================================================== */}
      <AnimatePresence>
        {activeModal && (
          <div 
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="policy-modal-card relative w-full max-w-[560px] h-[600px] max-h-[88vh] flex flex-col rounded-2xl bg-[#0b1120] border border-[#1e293b] shadow-2xl overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="policy-modal-header flex items-center justify-between px-6 py-4.5 border-b border-[#1e293b] flex-shrink-0">
                <div className="flex items-center gap-3.5">
                  <div className="text-[#38bdf8] flex-shrink-0">
                    {activeModal === 'privacy' && <Shield size={22} />}
                    {activeModal === 'terms' && <FileText size={22} />}
                    {activeModal === 'cookies' && <Cookie size={22} />}
                    {activeModal === 'sitemap' && <Layers size={22} />}
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white font-sans leading-none tracking-tight">
                      {activeModal === 'privacy' && 'Privacy Policy'}
                      {activeModal === 'terms' && 'Terms & Conditions'}
                      {activeModal === 'cookies' && 'Cookie Policy'}
                      {activeModal === 'sitemap' && 'Sitemap & Architecture'}
                    </h3>
                    <p className="text-[12px] text-slate-400 font-mono tracking-wide mt-1.5">
                      Last updated: October 2026
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-slate-800/60"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="policy-modal-body flex-1 overflow-y-auto px-6 py-5 space-y-6 text-[13.5px] text-slate-300 font-sans leading-[1.68] min-h-0">
                
                {/* 1. TERMS & CONDITIONS (EXACT TEXT & HEADINGS FROM USER SCREENSHOT) */}
                {activeModal === 'terms' && (
                  <>
                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        1. Acceptance of Terms
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        By accessing and using this portfolio website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, you should discontinue using this site.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        2. Intellectual Property
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        Unless otherwise explicitly stated, all portfolio designs, custom illustrations, interactive UI layouts, and written content are the intellectual property of <strong className="text-white font-semibold">Sudhanwa Kulkarni</strong>.
                      </p>
                      <p className="text-slate-300 leading-[1.68] mt-2">
                        Source code for public projects linked on GitHub is governed by the respective open-source licenses (MIT, Apache 2.0, or GPL) indicated in each repository.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        3. Live Demos &amp; External Links
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        This website links to third-party services and live deployment environments (e.g., Vercel, Supabase, Google Colab, GitHub). We are not responsible for the availability, uptime, content, or privacy practices of external websites.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        4. Disclaimer of Warranties
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        This website and its demonstrative projects are provided “as is” without warranty of any kind, either express or implied.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        5. Contact
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        If you have any questions or concerns regarding these Terms and Conditions, please reach out via GitHub at <a href="https://github.com/sudhanwa755/SQL-handbook/issues" target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:underline font-mono">sudhanwa755/SQL-handbook/issues</a>.
                      </p>
                    </div>
                  </>
                )}

                {/* 2. PRIVACY POLICY (EXACT TEXT & HEADINGS FROM USER SCREENSHOT) */}
                {activeModal === 'privacy' && (
                  <>
                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        1. Overview
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        Welcome to the personal developer portfolio of <strong className="text-white font-semibold">Sudhanwa Kulkarni</strong> (“we”, “our”, or “us”). We respect your privacy and are committed to protecting any personal information you choose to share with us while visiting this website.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        2. Information We Collect
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        We do not collect personal data merely for browsing this site. The only personal information collected is provided directly and voluntarily by you through our Contact Form:
                      </p>
                      <ul className="space-y-1.5 pl-4 text-slate-300 leading-[1.68]">
                        <li>
                          <strong className="text-white font-semibold">Name:</strong> To address you properly in our reply.
                        </li>
                        <li>
                          <strong className="text-white font-semibold">Email Address:</strong> To respond to your inquiry, freelance proposal, or career opportunity.
                        </li>
                        <li>
                          <strong className="text-white font-semibold">Message Content:</strong> The details of your inquiry or feedback.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        3. How Your Information is Used
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        Information submitted through the contact form is solely used to communicate with you regarding your message. We <strong className="text-white font-semibold">never sell, rent, or share</strong> your information with advertisers or marketing third parties.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        4. Third-Party Services
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        This portfolio utilizes standard, privacy-conscious infrastructure services (such as Vercel and GitHub) to deliver high availability and secure static asset delivery.
                      </p>
                    </div>
                  </>
                )}

                {/* 3. COOKIE POLICY */}
                {activeModal === 'cookies' && (
                  <>
                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        1. Essential Local Storage
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        This educational platform utilizes lightweight, strictly essential browser storage to persist your theme preference (Daylight / Deep Space Obsidian mode), active tabs, and curriculum chapter progress.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        2. No Third-Party Trackers
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        We respect your privacy as a software engineer. We do <strong className="text-white font-semibold">not</strong> employ advertising pixels, marketing cookies, or invasive cross-domain profiling scripts.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        3. Managing Local Storage
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        You can reset or clear stored handbook data at any time directly through your browser’s developer tools or privacy settings.
                      </p>
                    </div>
                  </>
                )}

                {/* 4. SITEMAP */}
                {activeModal === 'sitemap' && (
                  <>
                    <div className="space-y-2">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        1. Educational Curriculum (8 Chapters)
                      </h4>
                      <ul className="space-y-1.5 pl-4 text-slate-300 leading-[1.68]">
                        <li>01. Database Normalization (1NF–3NF &amp; BCNF)</li>
                        <li>02. Keys &amp; Integrity Constraints (PK, FK, Composite)</li>
                        <li>03. DDL, DML &amp; Transaction Control (ACID)</li>
                        <li>04. SELECT, Filtering &amp; Wildcards (WHERE, LIKE)</li>
                        <li>05. Functions, NULL Logic &amp; CASE Expressions</li>
                        <li>06. GROUP BY &amp; HAVING Aggregations</li>
                        <li>07. All SQL Joins &amp; Multi-Table Queries</li>
                        <li>08. Subqueries, Correlated Queries &amp; Set Operations</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        2. Interactive Assessments
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        160 Interactive Relational Engineering MCQs covering mathematical normal forms, query optimization, and schema design.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-[14.5px] tracking-tight">
                        3. Reference Matrix
                      </h4>
                      <p className="text-slate-300 leading-[1.68]">
                        Full SQL Command Matrix with ANSI SQL reference queries and live visual result demonstrations.
                      </p>
                    </div>
                  </>
                )}

              </div>

              {/* Modal Footer (Exact Match to Screenshot with Cyan Button) */}
              <div className="policy-modal-footer px-6 py-4 flex justify-end items-center border-t border-[#1e293b] bg-[#0b1120] flex-shrink-0">
                <button
                  onClick={closeModal}
                  className="policy-modal-btn bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#020617] font-semibold text-[13px] px-5 py-2 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  {activeModal === 'terms' || activeModal === 'cookies' ? 'I Understand' : 'Close'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
