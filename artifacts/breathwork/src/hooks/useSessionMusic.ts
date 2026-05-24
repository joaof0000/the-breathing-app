import { useRef, useState, useCallback, useEffect } from 'react';

export const MUSIC_URLS: Record<string, string> = {
  energy:      'https://upload.wikimedia.org/wikipedia/commons/a/a4/Vivaldi_-_Four_Seasons_1_Spring_mvt_1_Allegro_-_John_Harrison_violin.oga',
  focus:       'https://upload.wikimedia.org/wikipedia/commons/3/30/Kimiko_Ishizaka_-_Bach_-_Well-Tempered_Clavier%2C_Book_1_-_01_Prelude_No._1_in_C_major%2C_BWV_846.ogg',
  adhd:        'https://upload.wikimedia.org/wikipedia/commons/b/be/Bolero_by_Ravel_Orch.ogg',
  calm:        'https://upload.wikimedia.org/wikipedia/commons/8/8d/Clair_de_lune_-_Claude_Debussy_-_piano.ogg',
  sleep:       'https://upload.wikimedia.org/wikipedia/commons/3/3e/Chopin_-_Nocturne_Op_9_No_2.ogg',
  spiritual:   'https://upload.wikimedia.org/wikipedia/commons/d/da/BWV_1068_Air.ogg',
  craving:     'https://upload.wikimedia.org/wikipedia/commons/a/a7/Moonlight_sonata.ogg',
  anger:       'https://upload.wikimedia.org/wikipedia/commons/2/28/Toccata_and_Fugue_in_D_Minor_BWV_565.ogg',
  performance: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor%2C_op._67_-_i._allegro_con_brio.ogg',
  health:      'https://upload.wikimedia.org/wikipedia/commons/4/47/Mozart_Piano_Concerto_21_K467_2_Andante.ogg',
  trauma:      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Handel_Sarabande.ogg',
  transmute:   'https://upload.wikimedia.org/wikipedia/commons/3/3b/Bach_BWV1004.ogg',
};

export function useSessionMusic(goalKey: string | null, getVolume: () => number) {
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  const goalKeyRef = useRef(goalKey);
  useEffect(() => { goalKeyRef.current = goalKey; }, [goalKey]);

  const getVolRef = useRef(getVolume);
  useEffect(() => { getVolRef.current = getVolume; }, [getVolume]);

  const getOrCreateAudio = useCallback((): HTMLAudioElement | null => {
    const key = goalKeyRef.current;
    if (!key) return null;
    const url = MUSIC_URLS[key];
    if (!url) return null;
    const vol = Math.min(1, getVolRef.current() * 0.38);
    if (!audioRef.current || audioRef.current.getAttribute('data-goal') !== key) {
      audioRef.current?.pause();
      const el = new Audio(url);
      el.loop = true;
      el.volume = vol;
      el.setAttribute('data-goal', key);
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(() => {
    if (!enabledRef.current) return;
    const el = getOrCreateAudio();
    if (!el) return;
    el.play().catch(() => {});
  }, [getOrCreateAudio]);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  const updateVolume = useCallback((fraction: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(1, fraction * 0.38);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      audioRef.current?.pause();
    }
  }, [enabled]);

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  return { play, stop, updateVolume, enabled, setEnabled };
}
