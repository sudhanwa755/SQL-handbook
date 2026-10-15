import React, { useState } from 'react';
import { Shield, FileText, Layers, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer({ onOpenChapter }) {
  // Modal State for Policies: 'privacy' | 'terms' | 'sitemap' | null
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
      {/* MINIMALIST 2-LINE FOOTER (EXACT MATCH TO REFERENCE DESIGN) */}
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
        <p className="text-[12px] text-slate-500 font-sans mt-1">
          © 2026 Sudhanwa Kulkarni. Crafted with React, TypeScript &amp; Vite.
        </p>
      </footer>

      {/* ==========================================================
          INTERACTIVE LEGAL / POLICY POPUP MODAL (EXACT MATCH TO IMAGES)
          ========================================================== */}
      <AnimatePresence>
        {activeModal && (
          <div 
            className="policy-modal-overlay fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="policy-modal-card relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl bg-[#080e1a] border border-slate-800 shadow-2xl overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-[#060a12]/70">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#38bdf8]">
                    {activeModal === 'privacy' && <Shield size={19} />}
                    {activeModal === 'terms' && <FileText size={19} />}
                    {activeModal === 'sitemap' && <Layers size={19} />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-sans tracking-normal">
                      {activeModal === 'privacy' && 'Privacy Policy'}
                      {activeModal === 'terms' && 'Terms & Conditions'}
                      {activeModal === 'sitemap' && 'Sitemap & Architecture'}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Last updated: October 2026
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="px-6 py-6 overflow-y-auto space-y-6 text-[13px] text-slate-300 font-sans leading-relaxed">
                
                {/* 1. PRIVACY POLICY MODAL CONTENT (MATCHING IMAGE 2) */}
                {activeModal === 'privacy' && (
                  <>
                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        1. Overview
                      </h4>
                      <p className="text-slate-300">
                        Welcome to the personal developer portfolio and educational platform of <strong className="text-white font-semibold">Sudhanwa Kulkarni</strong> (“we”, “our”, or “us”). We respect your privacy and are committed to protecting any personal information you choose to share with us while visiting this website.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        2. Information We Collect
                      </h4>
                      <p className="text-slate-300">
                        We do not collect personal data merely for browsing this site. The only personal information collected is provided directly and voluntarily by you through our Contact Form:
                      </p>
                      <ul className="space-y-1.5 pl-4 text-slate-300">
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
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        3. How Your Information is Used
                      </h4>
                      <p className="text-slate-300">
                        Information submitted through the contact form is solely used to communicate with you regarding your message. We <strong className="text-white font-semibold">never sell, rent, or share</strong> your information with advertisers or marketing third parties.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        4. Third-Party Services
                      </h4>
                      <p className="text-slate-300">
                        This platform utilizes standard, privacy-conscious infrastructure services (such as Vercel and GitHub) to host static assets and code repositories. These providers process basic connection metadata solely to deliver reliable web traffic.
                      </p>
                    </div>
                  </>
                )}

                {/* 2. TERMS & CONDITIONS MODAL CONTENT (MATCHING IMAGE 3) */}
                {activeModal === 'terms' && (
                  <>
                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        1. Acceptance of Terms
                      </h4>
                      <p className="text-slate-300">
                        By accessing and using this portfolio and educational website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, you should discontinue using this site.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        2. Intellectual Property
                      </h4>
                      <p className="text-slate-300">
                        Unless otherwise explicitly stated, all portfolio designs, custom illustrations, interactive UI layouts, and written content are the intellectual property of <strong className="text-white font-semibold">Sudhanwa Kulkarni</strong>.
                      </p>
                      <p className="text-slate-300 mt-2">
                        Source code for public projects linked on GitHub is governed by the respective open-source licenses (MIT, Apache 2.0, or GPL) indicated in each repository.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        3. Live Demos &amp; External Links
                      </h4>
                      <p className="text-slate-300">
                        This website links to third-party services and live deployment environments (e.g., Vercel, Supabase, Google Colab, GitHub). We are not responsible for the availability, uptime, content, or privacy practices of external websites.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        4. Disclaimer of Warranties
                      </h4>
                      <p className="text-slate-300">
                        This website and its demonstrative projects are provided “as is” without warranty of any kind, either express or implied.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        5. Contact
                      </h4>
                      <p className="text-slate-300">
                        If you have any questions or concerns regarding these Terms and Conditions, please reach out via GitHub at <a href="https://github.com/sudhanwa755/SQL-handbook/issues" target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:underline font-mono">sudhanwa755/SQL-handbook/issues</a>.
                      </p>
                    </div>
                  </>
                )}

                {/* 3. SITEMAP MODAL CONTENT */}
                {activeModal === 'sitemap' && (
                  <>
                    <div className="space-y-2">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        1. Educational Curriculum (8 Chapters)
                      </h4>
                      <ul className="space-y-1.5 pl-4 text-slate-300">
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
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        2. Assessments &amp; Practice Engine
                      </h4>
                      <p className="text-slate-300">
                        160 Interactive Relational Engineering MCQs covering mathematical normal forms, query optimization, and schema design.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[#38bdf8] font-mono font-bold text-sm tracking-tight">
                        3. Reference Matrix
                      </h4>
                      <p className="text-slate-300">
                        Full SQL Command Matrix with ANSI SQL reference queries and live visual table demonstrations.
                      </p>
                    </div>
                  </>
                )}

              </div>

              {/* Modal Footer (Matching Image 2 Close & Image 3 I Understand) */}
              <div className="px-6 py-4 flex justify-end items-center border-t border-slate-800/80 bg-[#060a12]/70">
                <button
                  onClick={closeModal}
                  className="bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] font-bold text-xs px-5 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  {activeModal === 'terms' ? 'I Understand' : 'Close'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
