import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

interface CartoonOpeningProps {
  /** Fired once the cartoon doors start opening and the invitation is revealed. */
  onUnlock: () => void;
  /** Fired after the overlay has fully faded and can be unmounted. */
  onComplete?: () => void;
}

// Bouncy cartoon easing — overshoots slightly, like a hand-drawn bounce
const BOUNCE: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PETALS = ['🌸', '🌼', '💛', '🌸', '✨', '🌼', '💛', '🌸'];

export const CartoonOpening: React.FC<CartoonOpeningProps> = ({ onUnlock, onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isTriggeredRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const [prefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timers = timersRef.current;
    return () => {
      document.body.style.overflow = originalOverflow;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Warm the hero photograph while the visitor reads the opening screen
  useEffect(() => {
    const img = new Image();
    img.decoding = 'async';
    img.src = '/images/hero.jpg';
  }, []);

  const schedule = (fn: () => void, seconds: number) => {
    timersRef.current.push(window.setTimeout(fn, seconds * 1000));
  };

  const handleOpen = () => {
    if (isTriggeredRef.current) return;
    isTriggeredRef.current = true;
    setIsOpening(true);
    // Timer-driven so the visitor can never be trapped, even if an
    // animation is interrupted or never fires its completion event.
    const revealAt = prefersReducedMotion ? 0.25 : 0.55;
    const fadeFor = prefersReducedMotion ? 0.3 : 0.9;
    schedule(() => {
      document.body.style.overflow = '';
      onUnlock();
    }, revealAt);
    schedule(() => {
      setIsDismissed(true);
      onComplete?.();
    }, revealAt + fadeFor + 0.05);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  if (isDismissed) return null;

  const motionOff = prefersReducedMotion;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{ duration: motionOff ? 0.3 : 0.9, delay: motionOff ? 0.25 : 0.55, ease: EASE }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFF7E6 0%, #FDE8D7 55%, #F8E3EC 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'max(24px, env(safe-area-inset-top)) 16px max(24px, env(safe-area-inset-bottom))',
        pointerEvents: isOpening ? 'none' : 'auto',
      }}
      onClick={handleOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Opening"
    >
      {/* Cartoon sun */}
      {!motionOff && (
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '6%', right: '8%', width: 84, height: 84, fontSize: 64, lineHeight: 1, zIndex: 2 }}
        >
          ☀️
        </motion.div>
      )}

      {/* Drifting cartoon clouds */}
      {!motionOff && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
          {[
            { top: '10%', left: '6%', size: 56, dur: 26 },
            { top: '18%', left: '62%', size: 44, dur: 32 },
            { top: '30%', left: '28%', size: 38, dur: 38 },
          ].map((c, i) => (
            <motion.div
              key={i}
              animate={{ x: [0, 28, 0], y: [0, -6, 0] }}
              transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
              style={{ position: 'absolute', top: c.top, left: c.left, fontSize: c.size, lineHeight: 1, opacity: 0.9 }}
            >
              ☁️
            </motion.div>
          ))}
        </div>
      )}

      {/* Cartoon opening doors — slide apart on open */}
      <motion.div
        aria-hidden="true"
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '-110%' : 0 }}
        transition={{ duration: motionOff ? 0.3 : 0.9, delay: motionOff ? 0 : 0.15, ease: EASE }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '50%',
          background: 'linear-gradient(180deg, #E8A0B4, #D67A95)',
          borderRadius: '0 24px 24px 0', zIndex: 1, pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ x: 0 }}
        animate={{ x: isOpening ? '110%' : 0 }}
        transition={{ duration: motionOff ? 0.3 : 0.9, delay: motionOff ? 0 : 0.15, ease: EASE }}
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
          background: 'linear-gradient(180deg, #E8A0B4, #D67A95)',
          borderRadius: '24px 0 0 24px', zIndex: 1, pointerEvents: 'none',
        }}
      />

      {/* Petal burst on open */}
      {isOpening && !motionOff && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
          {PETALS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: '50vw', y: '55vh', opacity: 1, scale: 0.6, rotate: 0 }}
              animate={{
                x: `${8 + i * 12}%`,
                y: `${12 + (i % 3) * 22}%`,
                opacity: 0, scale: 1.2, rotate: 240,
              }}
              transition={{ duration: 1.1, ease: EASE }}
              style={{ position: 'absolute', fontSize: 26 }}
            >
              {p}
            </motion.div>
          ))}
        </div>
      )}

      {/* Cartoon couple scene */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={isOpening ? { opacity: 0, y: -20, scale: 1.05 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: BOUNCE }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 560, width: '100%' }}
      >
        <motion.div
          animate={motionOff ? undefined : { y: [0, -8, 0], rotate: [0, -1.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 'clamp(64px, 18vw, 110px)', lineHeight: 1, filter: 'drop-shadow(0 10px 18px rgba(84,38,55,0.18))' }}
          aria-hidden="true"
        >
          👰‍♀️🤵‍♂️
        </motion.div>

        <p style={{ margin: '14px 0 4px', fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#8A5A2B', letterSpacing: '0.18em', fontWeight: 600 }}>
          YOU&apos;RE INVITED!
        </p>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 7vw, 3.4rem)', lineHeight: 1.05, color: '#542637' }}>
          {weddingData.brideName} <span style={{ color: '#C4A36A' }}>♡</span> {weddingData.groomName}
        </h1>
        <p style={{ margin: '10px 0 0', fontSize: 'clamp(0.95rem, 3vw, 1.15rem)', color: '#6B4A3A' }}>
          Shubh Vivah • 25 November 2026 • Jaipur
        </p>
        <p style={{ margin: '6px 0 0', fontSize: '0.95rem', color: '#8A6B5A' }}>
          {weddingData.monogram} • Tap to open the celebration
        </p>

        <motion.button
          type="button"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          whileHover={motionOff ? undefined : { scale: 1.06, rotate: -1 }}
          whileTap={motionOff ? undefined : { scale: 0.94 }}
          animate={motionOff ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            marginTop: 26, cursor: 'pointer', border: '3px solid #542637', borderRadius: 999,
            background: '#542637', color: '#FFF7E6', padding: '16px 34px',
            fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.04em',
            boxShadow: '0 10px 0 #2D0F1B, 0 18px 30px rgba(84,38,55,0.25)',
          }}
          aria-label="Open the wedding invitation"
        >
          Open Invitation →
        </motion.button>
        <p style={{ marginTop: 14, fontSize: '0.85rem', color: '#9A7A6A' }}>
          A cartoon celebration is waiting inside
        </p>
      </motion.div>

      {/* Cartoon ground */}
      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 90, background: '#BFE3B0', borderTop: '5px solid #7CB87A', borderRadius: '50% 50% 0 0 / 40px 40px 0 0', zIndex: 2 }} />
    </motion.div>
  );
};

export default CartoonOpening;
