/**
 * Thin hook — delegates to LangContext so all consumers share one source of truth.
 * Returns [currentLang, setLang].
 */
export type { Lang } from '@/contexts/LangContext';
export { useLangContext as useLang } from '@/contexts/LangContext';
