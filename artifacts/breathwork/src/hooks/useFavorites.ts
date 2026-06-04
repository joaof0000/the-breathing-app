import { useState, useCallback } from 'react';

const FAV_KEY = 'breathwork_favorites';

export function loadFavorites(): string[] {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch { return []; }
}

function saveFavorites(favs: string[]) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch { /* noop */ }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites());

  const toggleFavorite = useCallback((techId: string) => {
    setFavorites(prev => {
      const next = prev.includes(techId)
        ? prev.filter(f => f !== techId)
        : [...prev, techId];
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (techId: string) => favorites.includes(techId),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
}
