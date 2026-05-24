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

  const getOrCreateAudio = useCallback((): HTMLAudioElement | null => {
    const key = goalKeyRef.current;
    if (!key) return null;
    const url = MUSIC_URLS[key];
    if (!url) return null;
    if (!audioRef.current || audioRef.current.getAttribute('data-goal') !== key) {
      audioRef.current?.pause();
      const el = new Audio(url);
      el.loop   = true;
      el.volume = Math.min(1, musicVolumeRef.current / 100);
      el.setAttribute('data-goal', key);
      el.addEventListener('error', () => {
        console.warn('[music] failed to load:', url);
      }, { once: true });
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const doPlay = useCallback(() => {
    const el = getOrCreateAudio();
    if (!el) return;
    applyVolume();
    const p = el.play();
    if (p) p.catch((err) => { console.warn('[music] play blocked:', err?.message); });
  }, [getOrCreateAudio, applyVolume]);

  /** Called when the breathing session begins */
  const play = useCallback(() => {
    isActiveRef.current = true;
    if (!enabledRef.current) return;
    doPlay();
  }, [doPlay]);

  /** Called when the breathing session ends */
  const stop = useCallback(() => {
    isActiveRef.current = false;
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, []);

  // When re-enabled mid-session, resume immediately
  useEffect(() => {
    if (enabled && isActiveRef.current) {
      doPlay();
    } else if (!enabled) {
      audioRef.current?.pause();
    }
  }, [enabled, doPlay]);

  // Keep volume in sync when slider moves
  useEffect(() => {
    applyVolume();
  }, [musicVolume, applyVolume]);

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  return { play, stop, enabled, setEnabled, musicVolume, setMusicVolume };
}
