import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import gsap from 'gsap';

// Helper component for Morphing Icons
const MorphingIcon = ({ type, isActive, onClick, onMouseEnter }) => {
  const buttonRef = useRef(null);
  const pathRef = useRef(null);

  const animateHome = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;

    gsap.to(button, {
      '--tab-bar-home-scale': 0.25,
      '--tab-bar-home-opacity': 0,
      duration: 0.1,
      onComplete: () => {
        gsap.to(path, {
          keyframes: [
            {
              morphSVG:
                'M21 18V10.5339C21 9.57062 20.5374 8.66591 19.7565 8.1019L13.7565 3.76856C12.7079 3.01128 11.2921 3.01128 10.2435 3.76856L4.24353 8.1019C3.46259 8.66591 3 9.57062 3 10.5339V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18Z',
              duration: 0.71,
              ease: 'elastic.out(1, .9)',
              onStart: () => {
                gsap.to(button, {
                  '--tab-bar-home-scale': 0.7,
                  duration: 0.71,
                  ease: 'elastic.out(1, .9)',
                });
                gsap.to(button, { '--tab-bar-home-opacity': 1, duration: 0.2 });
              },
            },
          ],
        });
      },
    });
  };

  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter();
    if (type === 'home') animateHome();
  };

  if (type === 'home') {
    return (
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        className={cn('home', isActive ? 'active' : '')}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path
            ref={pathRef}
            d="M3 18V10.5339C3 9.57062 3.46259 8.66591 4.24353 8.1019L10.2435 3.76856C11.2921 3.01128 12.7079 3.01128 13.7565 3.76856L19.7565 8.1019C20.5374 8.66591 21 9.57062 21 10.5339V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18Z"
          />
        </svg>
      </button>
    );
  }

  return null;
};

export const GlassDock = React.forwardRef(
  ({ items, mode = 'compact', className, dockClassName, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [direction, setDirection] = useState(0);
    const itemRefs = useRef([]);

    const handleMouseEnter = (index) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    const getTooltipCenter = (index) => {
      const el = itemRefs.current[index];
      if (el) {
        return el.offsetLeft + el.offsetWidth / 2;
      }
      return index * 48 + 24;
    };

    // ==========================================
    // 1. EXPANDED MODE (FOR WIDE SCREEN TOP CENTER)
    // Beside each icon, show text label with expandable look
    // ==========================================
    if (mode === 'expanded') {
      return (
        <div ref={ref} className={cn('relative z-50 flex items-center justify-center', className)} {...props}>
          <div
            className={cn(
              'glass-dock glass-dock-expanded relative flex flex-row items-center justify-center',
              'gap-1.5 px-3 py-1.5 rounded-full',
              'border border-sky-400/25 bg-slate-900/80 backdrop-blur-2xl shadow-xl',
              'transition-all duration-300',
              dockClassName
            )}
            style={{
              backdropFilter: 'blur(24px) saturate(190%)',
              WebkitBackdropFilter: 'blur(24px) saturate(190%)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.16)',
            }}
          >
            {items.map((el, index) => {
              const Icon = el.icon;
              const isActive = el.active;

              const handleClick = () => {
                if (el.onClick) {
                  el.onClick();
                } else if (el.href) {
                  window.open(el.href, '_blank', 'noopener,noreferrer');
                }
              };

              return (
                <motion.button
                  key={el.title}
                  onClick={handleClick}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'glass-dock-expanded-item relative flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer select-none text-[13px] font-medium font-display',
                    isActive
                      ? 'active bg-sky-400/20 text-sky-400 border border-sky-400/40 shadow-[0_0_14px_rgba(56,189,248,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                  )}
                  role="button"
                  aria-label={el.title}
                >
                  <Icon
                    size={16}
                    className={cn(
                      'flex-shrink-0 transition-colors duration-200',
                      isActive ? 'text-sky-400' : 'currentColor'
                    )}
                  />
                  <span className="whitespace-nowrap font-medium tracking-wide">
                    {el.title}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] flex-shrink-0 ml-0.5" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      );
    }

    // ==========================================
    // 2. COMPACT MODE (FOR SMALL DEVICE BOTTOM CENTER)
    // Ultra-compact view with just icons and floating VengeanceUI spring tooltip
    // ==========================================
    return (
      <div ref={ref} className={cn('w-fit mx-auto relative z-50 flex items-center justify-center', className)} {...props}>
        <div
          className={cn(
            'glass-dock glass-dock-compact relative flex flex-row items-center justify-center flex-nowrap',
            'gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-2xl',
            'border border-sky-400/25 bg-slate-900/90 backdrop-blur-2xl shadow-2xl',
            'transition-all duration-300',
            dockClassName
          )}
          style={{
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.16)',
          }}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          {/* Tooltip Popup */}
          <AnimatePresence>
            {hoveredIndex !== null && items[hoveredIndex] && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -54,
                  left: getTooltipCenter(hoveredIndex),
                  x: '-50%',
                }}
                exit={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
                transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                className="absolute top-0 pointer-events-none z-30"
              >
                <div
                  className={cn(
                    'glass-dock-tooltip px-3 py-1.5 rounded-lg',
                    'bg-slate-950/95 text-sky-200 border border-sky-400/35 shadow-xl',
                    'flex items-center justify-center min-w-[80px]'
                  )}
                  style={{ backdropFilter: 'blur(16px)' }}
                >
                  <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.span
                        key={items[hoveredIndex]?.title}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 25 : -25,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          x: direction > 0 ? -25 : 25,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        transition={{
                          duration: 0.22,
                          ease: 'easeOut',
                        }}
                        className="text-[12px] font-semibold tracking-wide whitespace-nowrap font-mono select-none"
                      >
                        {items[hoveredIndex]?.title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact Dock Items */}
          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;
            const isActive = el.active;

            const handleClick = () => {
              if (el.onClick) {
                el.onClick();
              } else if (el.href) {
                window.open(el.href, '_blank', 'noopener,noreferrer');
              }
            };

            return (
              <div
                key={el.title}
                ref={(node) => { itemRefs.current[index] = node; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={handleClick}
                className={cn(
                  'glass-dock-item relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer rounded-xl transition-all duration-200 select-none flex-shrink-0',
                  isActive 
                    ? 'active bg-sky-400/20 border border-sky-400/40 text-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.35)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
                role="button"
                tabIndex={0}
                aria-label={el.title}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                  }
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    y: isHovered ? -3 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="flex items-center justify-center"
                >
                  <Icon
                    size={19}
                    className={cn(
                      'transition-colors duration-200',
                      isActive ? 'text-sky-400' : isHovered ? 'text-sky-300' : 'currentColor'
                    )}
                  />
                </motion.div>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = 'GlassDock';
export default GlassDock;


