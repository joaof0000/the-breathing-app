import { useRef, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'breathwork_voice_cues_v1';

export interface VoiceCueConfig {
  enabled: boolean;
  gender: 'male' | 'female';
  volume: number;
}

const DEFAULT: VoiceCueConfig = { enabled: false, gender: 'female', volume: 80 };

function load(): VoiceCueConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch { /* */ }
  return { ...DEFAULT };
}

function save(c: VoiceCueConfig) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch { /* */ }
}

const PHASE_FILES: Record<string, { male: string; female: string }> = {
  inhale: { male: '/voice/voice_male_inhale.mp3',  female: '/voice/voice_female_inhale.mp3' },
  hold:   { male: '/voice/voice_male_hold.mp3',    female: '/voice/voice_female_hold.mp3' },
  exhale: { male: '/voice/voice_male_exhale.mp3',  female: '/voice/voice_female_exhale.mp3' },
};

export function useVoiceCues(getMasterVolume: () => number) {
  const [config, setConfigState] = useState<VoiceCueConfig>(load);
  const configRef = useRef(config);
  useEffect(() => { configRef.current = config; }, [config]);

  const setConfig = useCallback((patch: Partial<VoiceCueConfig>) => {
    setConfigState(prev => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const currentRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const all: HTMLAudioElement[] = [];
    Object.values(PHASE_FILES).forEach(p => {
      const am = new Audio(p.male);
      const af = new Audio(p.female);
      am.preload = 'auto';
      af.preload = 'auto';
      all.push(am, af);
    });
    audioRefs.current = all;
    return () => {
      all.forEach(a => { a.pause(); a.src = ''; });
      audioRefs.current = [];
    };
  }, []);

  const play = useCallback((phase: 'inhale' | 'hold' | 'exhale') => {
    const cfg = configRef.current;
    if (!cfg.enabled) return;
    const master = getMasterVolume();
    if (master < 0.001) return;

    const files = PHASE_FILES[phase];
    if (!files) return;

    const src = files[cfg.gender];
    const vol = master * (cfg.volume / 100);

    // Stop any currently playing voice cue to avoid overlap
    if (currentRef.current) {
      currentRef.current.pause();
      currentRef.current.currentTime = 0;
      currentRef.current = null;
    }

    const a = new Audio(src);
    a.volume = Math.max(0, Math.min(1, vol));
    currentRef.current = a;
    a.play().catch(() => { currentRef.current = null; });
    a.onended = () => { currentRef.current = null; };
  }, [getMasterVolume]);

  const stop = useCallback(() => {
    if (currentRef.current) {
      currentRef.current.pause();
      currentRef.current.currentTime = 0;
      currentRef.current = null;
    }
  }, []);

  return {
    play,
    stop,
    enabled: config.enabled,
    setEnabled: (v: boolean) => setConfig({ enabled: v }),
    gender: config.gender,
    setGender: (v: 'male' | 'female') => setConfig({ gender: v }),
    volume: config.volume,
    setVolume: (v: number) => setConfig({ volume: v }),
  };
}
