import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CurtainOpeningProps {
  /** Fired once the curtains start parting and the invitation is revealed. */
  onUnlock: () => void;
  /** Fired after the overlay has fully faded and can be unmounted. */
  onComplete?: () => void;
}

// The source video is 10s of red curtains opening onto a blank white screen.
// The white tail was trimmed off in editing (this file is only the first
// 3.6s, watermark cropped out), and the overlay fades out at 2.4s — while
// the curtains are still parting — so visitors never sit on a white screen:
// the hero is revealed through the fading curtains instead.
const FADE_AT = 2.4;
const FADE_FOR = 0.9;

export const CurtainOpening: React.FC<CurtainOpeningProps> = ({ onUnlock, onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const doneRef = useRef(false);
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

  // Warm the hero photograph while the curtains play
  useEffect(() => {
    const img = new Image();
    img.decoding = 'async';
    img.src = '/images/hero.jpg';
  }, []);

  const schedule = (fn: () => void, seconds: number) => {
    timersRef.current.push(window.setTimeout(fn, seconds * 1000));
  };

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setIsFading(true);
    document.body.style.overflow = '';
    onUnlock();
    schedule(() => {
      setIsDismissed(true);
      onComplete?.();
    }, prefersReducedMotion ? 0.3 : FADE_FOR + 0.05);
  };

  // Autoplay: muted + playsInline plays without a tap on most phones.
  // If the browser still blocks it, fall back to a tap-to-open button.
  useEffect(() => {
    if (prefersReducedMotion) {
      schedule(() => finish(), 0.3);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p) {
      p.catch(() => setNeedsTap(true));
    }
    // Safety net: never trap the visitor if the video stalls
    schedule(() => finish(), 4.2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.currentTime >= FADE_AT) finish();
  };

  const handleTap = () => {
    const v = videoRef.current;
    if (v && needsTap) {
      v.play().catch(() => finish());
      setNeedsTap(false);
      return;
    }
    // Tapping the curtains skips straight to the invitation
    finish();
  };

  if (isDismissed) return null;

  return (
    <motion.div
      className="curtain-opening"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: prefersReducedMotion ? 0.3 : FADE_FOR, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#000',
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
      onClick={handleTap}
      role="dialog"
      aria-modal="true"
      aria-label="Opening curtains"
    >
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src="/videos/curtain-open.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={finish}
          onError={finish}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          aria-hidden="true"
        />
      )}
      {needsTap && !isFading && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleTap();
          }}
          style={{
            position: 'absolute', left: '50%', bottom: '12%', transform: 'translateX(-50%)',
            cursor: 'pointer', border: '3px solid #542637', borderRadius: 999,
            background: '#F8F3EC', color: '#542637', padding: '16px 34px',
            fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
          aria-label="Open the wedding invitation"
        >
          Open Invitation →
        </button>
      )}
    </motion.div>
  );
};

export default CurtainOpening;
