import { useRef, useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'breathwork_bg_audio_v1';

export interface BgAudioConfig {
  enabled: boolean;
  category: 'nature' | 'frequencies';
  sound: string;
  volume: number;
}

const DEFAULT_CONFIG: BgAudioConfig = {
  enabled: false,
  category: 'frequencies',
  sound: '528',
  volume: 35,
};

export const NATURE_SOUNDS = [
  { id: 'rain',  label: 'Rain',  labelPt: 'Chuva',  labelEs: 'Lluvia',  emoji: '\u{1F327}' },
  { id: 'ocean', label: 'Ocean', labelPt: 'Oceano', labelEs: 'Oc\u00E9ano', emoji: '\u{1F30A}' },
  { id: 'wind',  label: 'Wind',  labelPt: 'Vento',  labelEs: 'Viento',  emoji: '\u{1F4A8}' },
] as const;

export const FREQUENCY_SOUNDS = [
  { id: '528', label: '528 Hz \u00B7 Mi',            labelPt: '528 Hz \u00B7 Mi',            labelEs: '528 Hz \u00B7 Mi',            hz: 528, emoji: '\u2728',  desc: 'Transformation' },
  { id: '432', label: '432 Hz \u00B7 Natural A',    labelPt: '432 Hz \u00B7 L\u00E1 Natural', labelEs: '432 Hz \u00B7 La Natural',    hz: 432, emoji: '\u{1F3B5}', desc: 'Harmony' },
  { id: '174', label: '174 Hz \u00B7 Foundation',  labelPt: '174 Hz \u00B7 Funda\u00E7\u00E3o', labelEs: '174 Hz \u00B7 Fundaci\u00F3n', hz: 174, emoji: '\u{1F3D4}', desc: 'Pain relief' },
  { id: '396', label: '396 Hz \u00B7 Liberation',  labelPt: '396 Hz \u00B7 Liberta\u00E7\u00E3o', labelEs: '396 Hz \u00B7 Liberaci\u00F3n', hz: 396, emoji: '\u{1F525}', desc: 'Release' },
  { id: '639', label: '639 Hz \u00B7 Connection',  labelPt: '639 Hz \u00B7 Conex\u00E3o',    labelEs: '639 Hz \u00B7 Conexi\u00F3n',    hz: 639, emoji: '\u{1F49A}', desc: 'Heart' },
  { id: '741', label: '741 Hz \u00B7 Expression',  labelPt: '741 Hz \u00B7 Express\u00E3o',   labelEs: '741 Hz \u00B7 Expresi\u00F3n',   hz: 741, emoji: '\u{1F48E}', desc: 'Clarity' },
] as const;

function loadConfig(): BgAudioConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch { /* */ }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(c: BgAudioConfig) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch { /* */ }
}

/* ── Noise buffer helpers ── */
function makeWhiteNoiseBuffer(ac: AudioContext, seconds: number): AudioBuffer {
  const frames = ac.sampleRate * seconds;
  const buf = ac.createBuffer(1, frames, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function makeBrownNoiseBuffer(ac: AudioContext, seconds: number): AudioBuffer {
  const frames = ac.sampleRate * seconds;
  const buf = ac.createBuffer(1, frames, ac.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < frames; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + (0.02 * white)) / 1.02;
    d[i] = last * 3.5;
  }
  return buf;
}

export function useBackgroundAudio(getVolume: () => number) {
  const acRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const srcsRef = useRef<AudioBufferSourceNode[]>([]);
  const isPlayingRef = useRef(false);

  const [config, setConfigState] = useState<BgAudioConfig>(loadConfig);
  const configRef = useRef(config);
  useEffect(() => { configRef.current = config; }, [config]);

  const setConfig = useCallback((patch: Partial<BgAudioConfig>) => {
    setConfigState(prev => {
      const next = { ...prev, ...patch };
      saveConfig(next);
      return next;
    });
  }, []);

  const ensureAC = useCallback(() => {
    if (!acRef.current) {
      acRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (acRef.current.state === 'suspended') {
      acRef.current.resume();
    }
    return acRef.current;
  }, []);

  const stopAll = useCallback(() => {
    oscsRef.current.forEach(o => { try { o.stop(); } catch { /* */ } });
    srcsRef.current.forEach(s => { try { s.stop(); } catch { /* */ } });
    oscsRef.current = [];
    srcsRef.current = [];
    nodesRef.current.forEach(n => { try { n.disconnect(); } catch { /* */ } });
    nodesRef.current = [];
  }, []);

  /* ── Frequency synthesis: 3 detuned sines + subtle LFO ── */
  const playFrequency = useCallback((freq: number) => {
    const ac = ensureAC();
    const masterVol = getVolume();
    const baseVol = configRef.current.volume / 100;
    if (masterVol < 0.001 || baseVol < 0.001) return;

    const gain = ac.createGain();
    const target = masterVol * baseVol * 0.055;
    gain.gain.setValueAtTime(0, ac.currentTime);
    gain.gain.linearRampToValueAtTime(target, ac.currentTime + 2);
    gain.connect(ac.destination);
    nodesRef.current.push(gain);

    const detunes = [0, -4, +4];
    detunes.forEach(dt => {
      const osc = ac.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = dt;
      osc.connect(gain);
      osc.start();
      oscsRef.current.push(osc);
    });

    // Subtle 3 Hz amplitude tremolo for warmth
    const tremolo = ac.createOscillator();
    tremolo.frequency.value = 3;
    const tremGain = ac.createGain();
    tremGain.gain.value = target * 0.08;
    tremolo.connect(tremGain);
    tremGain.connect(gain.gain);
    tremolo.start();
    oscsRef.current.push(tremolo);
    nodesRef.current.push(tremGain);
  }, [ensureAC, getVolume]);

  /* ── Nature sound synthesis ── */
  const playNature = useCallback((soundId: string) => {
    const ac = ensureAC();
    const masterVol = getVolume();
    const baseVol = configRef.current.volume / 100;
    if (masterVol < 0.001 || baseVol < 0.001) return;

    switch (soundId) {
      case 'rain': {
        const buf = makeWhiteNoiseBuffer(ac, 2);
        const src = ac.createBufferSource();
        src.buffer = buf;
        src.loop = true;

        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 900;
        lp.Q.value = 0.4;

        const hp = ac.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 120;

        const gain = ac.createGain();
        gain.gain.value = masterVol * baseVol * 0.14;

        src.connect(lp);
        lp.connect(hp);
        hp.connect(gain);
        gain.connect(ac.destination);
        src.start();

        srcsRef.current.push(src);
        nodesRef.current.push(lp, hp, gain);
        break;
      }
      case 'ocean': {
        const buf = makeBrownNoiseBuffer(ac, 3);
        const src = ac.createBufferSource();
        src.buffer = buf;
        src.loop = true;

        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 350;
        lp.Q.value = 0.3;

        const gain = ac.createGain();
        gain.gain.value = masterVol * baseVol * 0.2;

        // Slow wave swell LFO on gain
        const lfo = ac.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1; // 10-second waves
        const lfoGain = ac.createGain();
        lfoGain.gain.value = masterVol * baseVol * 0.12;
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        lfo.start();

        src.connect(lp);
        lp.connect(gain);
        gain.connect(ac.destination);
        src.start();

        srcsRef.current.push(src);
        oscsRef.current.push(lfo);
        nodesRef.current.push(lp, gain, lfoGain);
        break;
      }
      case 'wind': {
        const buf = makeWhiteNoiseBuffer(ac, 2);
        const src = ac.createBufferSource();
        src.buffer = buf;
        src.loop = true;

        const bp = ac.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 500;
        bp.Q.value = 0.25;

        // Slow gust sweep
        const sweep = ac.createOscillator();
        sweep.type = 'sine';
        sweep.frequency.value = 0.06;
        const sweepGain = ac.createGain();
        sweepGain.gain.value = 350;
        sweep.connect(sweepGain);
        sweepGain.connect(bp.frequency);
        sweep.start();

        const gain = ac.createGain();
        gain.gain.value = masterVol * baseVol * 0.11;

        src.connect(bp);
        bp.connect(gain);
        gain.connect(ac.destination);
        src.start();

        srcsRef.current.push(src);
        oscsRef.current.push(sweep);
        nodesRef.current.push(bp, gain, sweepGain);
        break;
      }
    }
  }, [ensureAC, getVolume]);

  const play = useCallback(() => {
    if (!configRef.current.enabled) return;
    stopAll();
    isPlayingRef.current = true;
    if (configRef.current.category === 'frequencies') {
      const sound = FREQUENCY_SOUNDS.find(s => s.id === configRef.current.sound);
      if (sound) playFrequency(sound.hz);
    } else {
      playNature(configRef.current.sound);
    }
  }, [stopAll, playFrequency, playNature]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    stopAll();
  }, [stopAll]);

  // Restart if config changes while playing
  useEffect(() => {
    if (isPlayingRef.current) {
      if (config.enabled) play();
      else stop();
    }
  }, [config.enabled, config.category, config.sound, config.volume, play, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAll();
      acRef.current?.close();
    };
  }, [stopAll]);

  return {
    play,
    stop,
    enabled: config.enabled,
    setEnabled: (v: boolean) => setConfig({ enabled: v }),
    category: config.category,
    setCategory: (v: 'nature' | 'frequencies') => setConfig({ category: v }),
    sound: config.sound,
    setSound: (v: string) => setConfig({ sound: v }),
    volume: config.volume,
    setVolume: (v: number) => setConfig({ volume: v }),
  };
}
