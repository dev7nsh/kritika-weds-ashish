import React, { useRef, useEffect } from 'react';
import { weddingData } from '../data/weddingData';

// Music plays always, with no button or tab at all.
// Browsers block sound until the visitor first interacts with the page
// (a tap, click, scroll or key press), so playback starts on the very
// first interaction anywhere — including tapping the curtain opening —
// and then loops forever. There is no UI to stop it, by design: the
// player tab was removed on purpose.
//
// Performance: preload is 'none' and nothing is attempted on load.
// The track is a 7 MB MP3; with preload 'auto' (and an immediate play()
// attempt plus an unconditional 2 s retry) the browser downloaded the
// whole file on page load, competing with the images for bandwidth and
// making the photos load slowly. Loading starts only after the visitor
// interacts, which is also the earliest the browser would allow sound.
export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = weddingData.audio.sourceUrl;
    audio.loop = true;
    audio.volume = 0.38;
    audio.preload = 'none';

    let fallbackAttempted = false;
    audio.onerror = () => {
      if (!fallbackAttempted && weddingData.audio.fallbackUrl) {
        fallbackAttempted = true;
        audio.src = weddingData.audio.fallbackUrl;
        audio.play().catch(() => {});
      }
    };

    audioRef.current = audio;

    let interacted = false;

    const tryPlay = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };

    // Start on the first interaction, then stay playing. The first
    // interaction also flips the flag that allows the retry loop below
    // to run — without it, the retry would download the track even if
    // the visitor never interacts.
    const onFirstInteraction = () => {
      interacted = true;
      tryPlay();
    };
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
    events.forEach((e) => window.addEventListener(e, onFirstInteraction, { passive: true }));

    // Keep retrying quietly until it actually starts (e.g. after a late tap),
    // but only once the visitor has interacted at least once.
    const retry = window.setInterval(() => {
      if (!interacted) return;
      if (audio.paused) tryPlay();
      else window.clearInterval(retry);
    }, 2000);

    return () => {
      window.clearInterval(retry);
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
      audio.pause();
      audio.src = '';
    };
  }, []);

  // No visible UI — music only
  return null;
};
