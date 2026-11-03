import React, { useRef, useEffect } from 'react';
import { weddingData } from '../data/weddingData';

// Music plays always, with no button or tab at all.
// Browsers block sound until the visitor first interacts with the page
// (a tap, click, scroll or key press), so this tries to start on load and
// then starts on the very first interaction anywhere — including tapping
// the curtain opening — and then loops forever. There is no UI to stop it,
// by design: the player tab was removed on purpose.
export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = weddingData.audio.sourceUrl;
    audio.loop = true;
    audio.volume = 0.38;
    audio.preload = 'auto';

    let fallbackAttempted = false;
    audio.onerror = () => {
      if (!fallbackAttempted && weddingData.audio.fallbackUrl) {
        fallbackAttempted = true;
        audio.src = weddingData.audio.fallbackUrl;
        audio.play().catch(() => {});
      }
    };

    audioRef.current = audio;

    const tryPlay = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };

    // Attempt immediately (works if the browser already allows it)
    tryPlay();

    // Start on the first interaction, then stay playing
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
    events.forEach((e) => window.addEventListener(e, tryPlay, { passive: true }));

    // Keep retrying quietly until it actually starts (e.g. after a late tap)
    const retry = window.setInterval(() => {
      if (audio.paused) tryPlay();
      else window.clearInterval(retry);
    }, 2000);

    return () => {
      window.clearInterval(retry);
      events.forEach((e) => window.removeEventListener(e, tryPlay));
      audio.pause();
      audio.src = '';
    };
  }, []);

  // No visible UI — music only
  return null;
};
