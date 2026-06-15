import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const greetings = [
  '• Hallo',
  '• Hello',
  '• Bonjour',
  '• Ciao',
  '• Olá',
  '• مرحبا',
  '• こんにちは',
];

const ease = [0.76, 0, 0.24, 1];
const wordDelays = [210, 210, 230, 250, 280, 560, 900];
const curveInitial = 'M0 0 L100 0 C82 78 18 78 0 0 Z';
const curveFlat = 'M0 0 L100 0 C82 0 18 0 0 0 Z';

function Preloader({ onComplete }) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const hasCompleted = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const activeGreeting = greetings[greetingIndex].replace(/^•\s*/, '');
  const isArabicGreeting = /[\u0600-\u06FF]/.test(activeGreeting);
  const overlayTransition = shouldReduceMotion
    ? { duration: 0.25, ease: 'easeOut' }
    : { duration: 1, ease };

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  useEffect(() => {
    const delay = shouldReduceMotion
      ? Math.min(wordDelays[greetingIndex], 140)
      : wordDelays[greetingIndex];

    const timer = window.setTimeout(() => {
      if (greetingIndex < greetings.length - 1) {
        setGreetingIndex((currentIndex) => currentIndex + 1);
        return;
      }

      setIsVisible(false);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [greetingIndex, shouldReduceMotion]);

  const handleExitComplete = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete?.();
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[2147483647] h-screen min-h-[100dvh] w-screen bg-[#141516] text-white"
          initial={{ y: '0%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={overlayTransition}
          style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
        >
          <div
            className="relative z-10 flex h-full w-full items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={greetings[greetingIndex]}
                className="inline-flex select-none items-center gap-4 font-sans text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-none tracking-normal"
                dir="ltr"
                aria-label={greetings[greetingIndex]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: shouldReduceMotion ? 0.12 : 0.24, ease }}
              >
                <span aria-hidden="true">•</span>
                <bdi dir={isArabicGreeting ? 'rtl' : 'auto'}>{activeGreeting}</bdi>
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.svg
            className="pointer-events-none absolute left-0 top-full h-48 w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <motion.path
              fill="#141516"
              initial={{ d: curveInitial }}
              exit={{ d: curveFlat }}
              transition={overlayTransition}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
