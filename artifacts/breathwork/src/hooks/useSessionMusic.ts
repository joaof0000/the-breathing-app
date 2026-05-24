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

export function useSessionMusic(goalKey: string | null, getVolume: () => number) {
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const enabledRef  = useRef(true);
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  const goalKeyRef = useRef(goalKey);
  useEffect(() => { goalKeyRef.current = goalKey; }, [goalKey]);

  const getVolRef  = useRef(getVolume);
  useEffect(() => { getVolRef.current = getVolume; }, [getVolume]);

  const getOrCreateAudio = useCallback((): HTMLAudioElement | null => {
    const key = goalKeyRef.current;
    if (!key) return null;
    const url = MUSIC_URLS[key];
    if (!url) return null;
    if (!audioRef.current || audioRef.current.getAttribute('data-goal') !== key) {
      audioRef.current?.pause();
      const el = new Audio(url);
      el.loop  = true;
      el.volume = Math.min(1, getVolRef.current() * 0.38);
      el.setAttribute('data-goal', key);
      el.addEventListener('error', () => {
        console.warn('[music] failed to load:', url);
      }, { once: true });
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(() => {
    if (!enabledRef.current) return;
    const el = getOrCreateAudio();
    if (!el) return;
    const p = el.play();
    if (p) p.catch((err) => { console.warn('[music] play blocked:', err?.message); });
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
    if (!enabled) audioRef.current?.pause();
  }, [enabled]);

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  return { play, stop, updateVolume, enabled, setEnabled };
}
