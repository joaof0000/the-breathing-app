import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type Lang = 'en' | 'pt' | 'es';

const LANG_KEY = 'breathwork_lang';
const VALID: Lang[] = ['en', 'pt', 'es'];

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  // Guard: once the user has explicitly chosen a language, ignore late storage hydration
  const userSelectedRef = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(LANG_KEY)
      .then(v => {
        if (!userSelectedRef.current && VALID.includes(v as Lang)) {
          setLangState(v as Lang);
        }
      })
      .catch(() => {});
  }, []);

  const setLang = useCallback((l: Lang) => {
    userSelectedRef.current = true;
    setLangState(l);
    AsyncStorage.setItem(LANG_KEY, l).catch(() => {});
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLangContext(): LangContextValue {
  return useContext(LangContext);
}
