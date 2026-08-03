import { useRef, useState, useCallback, useEffect } from 'react';

export const MUSIC_URLS: Record<string, string> = {
  energy:      'https://upload.wikimedia.org/wikipedia/commons/f/ff/Vivaldi_-_Four_Seasons_1_Spring_mvt_1_Allegro_-_John_Harrison_violin.oga',
  focus:       'https://upload.wikimedia.org/wikipedia/commons/b/b6/Kimiko_Ishizaka_-_Bach_-_Well-Tempered_Clavier%2C_Book_1_-_01_Prelude_No._1_in_C_major%2C_BWV_846.ogg',
  adhd:        'https://upload.wikimedia.org/wikipedia/commons/c/c3/Bolero-Maurice_Ravel-1930.ogg',
  calm:        'https://upload.wikimedia.org/wikipedia/commons/b/be/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg',
  sleep:       'https://upload.wikimedia.org/wikipedia/commons/5/5c/Frederic_Chopin_-_Nocturne_Eb_major_Opus_9%2C_number_2.ogg',
  spiritual:   'https://upload.wikimedia.org/wikipedia/commons/9/9b/Johann_Sebastian_Bach_-_Air.ogg',
  craving:     'https://upload.wikimedia.org/wikipedia/commons/4/48/Ludwig_van_Beethoven_-_sonata_no._14_in_c_sharp_minor_%27moonlight%27%2C_op._27_no._2_-_i._adagio_sostenuto.ogg',
  anger:       'https://upload.wikimedia.org/wikipedia/commons/b/be/Toccata_et_Fugue_BWV565.ogg',
  performance: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor%2C_op._67_-_i._allegro_con_brio.ogg',
  health:      'https://upload.wikimedia.org/wikipedia/commons/2/24/Mozart_-_Eine_kleine_Nachtmusik_-_1._Allegro.ogg',
  trauma:      'https://upload.wikimedia.org/wikipedia/commons/e/e9/Handel_-_Suite_Vol._2_No._4_in_D_minor_HWV_437_-_4._Sarabande.oga',
  transmute:   'https://upload.wikimedia.org/wikipedia/commons/4/49/Johann_Sebastian_Bach_-_Chaconne_for_violin_alone.ogg',
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
        console.warn('[music] failed to load:', url);
        if (isActiveRef.current && enabledRef.current) playFallback();
      }, { once: true });
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
      console.warn('[music] play failed, using synthesized fallback:', err?.message);
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
