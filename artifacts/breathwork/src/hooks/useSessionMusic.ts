import { useRef, useState, useCallback, useEffect } from 'react';

const musicAsset = (fileName: string) => `${import.meta.env.BASE_URL}music/${fileName}.mp3`;

// These are bundled public-domain recordings. See public/music/ATTRIBUTION.md.
// Reusing a recording intentionally keeps the download small while ensuring every
// goal has offline-capable classical audio instead of a third-party URL.
export const MUSIC_URLS: Record<string, string> = {
  energy:      musicAsset('energy'),
  focus:       musicAsset('focus'),
  adhd:        musicAsset('adhd'),
  calm:        musicAsset('calm'),
  sleep:       musicAsset('sleep'),
  spiritual:   musicAsset('spiritual'),
  craving:     musicAsset('sleep'),
  anger:       musicAsset('focus'),
  performance: musicAsset('energy'),
  health:      musicAsset('energy'),
  trauma:      musicAsset('calm'),
  transmute:   musicAsset('focus'),
  recovery:    musicAsset('calm'),
  bleak:       musicAsset('calm'),
  grief:       musicAsset('sleep'),
};

export function useSessionMusic(goalKey: string | null) {
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const isActiveRef = useRef(false);          // true once play() has been called
  const [enabled, setEnabled]         = useState(true);
  const [musicVolume, setMusicVolume] = useState(45); // 0-100, independent slider
  const fallbackAcRef = useRef<AudioContext | null>(null);
  const fallbackNodesRef = useRef<OscillatorNode[]>([]);
  const fallbackTimerRef = useRef<number | null>(null);

  const enabledRef     = useRef(true);
  const musicVolumeRef = useRef(45);
  const goalKeyRef     = useRef(goalKey);

  useEffect(() => { enabledRef.current     = enabled;     }, [enabled]);
  useEffect(() => { musicVolumeRef.current = musicVolume; }, [musicVolume]);
  useEffect(() => { goalKeyRef.current     = goalKey;     }, [goalKey]);

  const applyVolume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(1, musicVolumeRef.current / 100);
    }
  }, []);

  const stopFallback = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    fallbackNodesRef.current.forEach(node => {
      try { node.stop(); } catch { /* already stopped */ }
    });
    fallbackNodesRef.current = [];
  }, []);

  const playFallback = useCallback(() => {
    stopFallback();
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!fallbackAcRef.current) fallbackAcRef.current = new AC();
    const ac = fallbackAcRef.current;
    if (ac.state === 'suspended') void ac.resume();

    const patterns: Record<string, number[]> = {
      energy: [392, 440, 494, 523, 587, 659, 587, 523],
      focus: [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23],
      adhd: [261.63, 293.66, 329.63, 392, 329.63, 293.66],
      calm: [261.63, 329.63, 392, 523, 392, 329.63],
      sleep: [261.63, 293.66, 349.23, 392, 349.23, 293.66],
      spiritual: [392, 440, 523, 587, 659, 587, 523, 440],
      craving: [220, 261.63, 329.63, 392, 329.63, 261.63],
      anger: [220, 233.08, 261.63, 293.66, 261.63, 233.08],
      performance: [261.63, 329.63, 392, 523, 659, 523, 392, 329.63],
      health: [261.63, 329.63, 392, 440, 392, 329.63],
      trauma: [220, 261.63, 293.66, 349.23, 293.66, 261.63],
      transmute: [293.66, 349.23, 440, 523, 659, 523, 440, 349.23],
    };
    const notes = patterns[goalKeyRef.current ?? ''] ?? patterns.calm;
    let noteIndex = 0;

    const playNote = () => {
      const now = ac.currentTime;
      const duration = 2.2;
      const gain = ac.createGain();
      const master = Math.min(1, musicVolumeRef.current / 100) * 0.11;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, master), now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      gain.connect(ac.destination);

      const oscillator = ac.createOscillator();
      oscillator.type = 'triangle';
      oscillator.frequency.value = notes[noteIndex % notes.length];
      oscillator.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + duration);
      fallbackNodesRef.current.push(oscillator);
      noteIndex += 1;
    };

    playNote();
    fallbackTimerRef.current = window.setInterval(playNote, 2100);
  }, [stopFallback]);

  const getOrCreateAudio = useCallback((): HTMLAudioElement | null => {
    const key = goalKeyRef.current;
    if (!key) return null;
    const url = MUSIC_URLS[key];
    if (!url) return null;
    if (!audioRef.current || audioRef.current.getAttribute('data-goal') !== key) {
      audioRef.current?.pause();
      const el = new Audio(url);
      el.preload = 'auto';
      el.loop   = true;
      el.volume = Math.min(1, musicVolumeRef.current / 100);
      el.setAttribute('data-goal', key);
      el.addEventListener('error', () => {
        console.error('[music] bundled track failed to load; using synthesized fallback:', {
          goal: key,
          src: url,
          networkState: el.networkState,
          error: el.error?.message,
        });
        if (isActiveRef.current && enabledRef.current) playFallback();
      }, { once: true });
      el.addEventListener('stalled', () => {
        console.warn('[music] bundled track stalled:', { goal: key, src: url });
      });
      audioRef.current = el;
    }
    return audioRef.current;
  }, [playFallback]);

  const doPlay = useCallback(() => {
    const el = getOrCreateAudio();
    if (!el) return;
    applyVolume();
    const p = el.play();
    const loadTimeout = window.setTimeout(() => {
      if (isActiveRef.current && enabledRef.current && el.paused) playFallback();
    }, 3500);
    if (p) p.catch((err) => {
      window.clearTimeout(loadTimeout);
      console.error('[music] bundled track could not start; using synthesized fallback:', {
        goal: goalKeyRef.current,
        src: el.currentSrc || el.src,
        error: err?.message,
      });
      if (isActiveRef.current && enabledRef.current) playFallback();
    });
    else window.clearTimeout(loadTimeout);
  }, [getOrCreateAudio, applyVolume, playFallback]);

  /** Called when the breathing session begins */
  const play = useCallback(() => {
    isActiveRef.current = true;
    if (!enabledRef.current) return;
    doPlay();
  }, [doPlay]);

  /** Called when the breathing session ends */
  const stop = useCallback(() => {
    isActiveRef.current = false;
    stopFallback();
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, [stopFallback]);

  // When re-enabled mid-session, resume immediately
  useEffect(() => {
    if (enabled && isActiveRef.current) {
      stopFallback();
      doPlay();
    } else if (!enabled) {
      audioRef.current?.pause();
      stopFallback();
    }
  }, [enabled, doPlay, stopFallback]);

  // Keep volume in sync when slider moves
  useEffect(() => {
    applyVolume();
  }, [musicVolume, applyVolume]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      stopFallback();
      void fallbackAcRef.current?.close();
    };
  }, [stopFallback]);

  return { play, stop, enabled, setEnabled, musicVolume, setMusicVolume };
}
