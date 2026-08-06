import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type Lang = 'en' | 'pt' | 'es';

/** Same storage key as the web app so the chosen language is shared. */
const LANG_KEY = 'breathwork_lang';

const VALID: Lang[] = ['en', 'pt', 'es'];

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY)
      .then(v => {
        if (VALID.includes(v as Lang)) setLang(v as Lang);
      })
      .catch(() => {});
  }, []);

  return lang;
}
