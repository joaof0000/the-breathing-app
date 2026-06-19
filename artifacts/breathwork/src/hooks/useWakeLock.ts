import { useRef, useCallback } from 'react';

export function useWakeLock() {
  const lockRef = useRef<WakeLockSentinel | null>(null);

  const acquire = useCallback(async () => {
    if (!('wakeLock' in navigator)) return;
    try {
      lockRef.current = await (navigator as unknown as {
        wakeLock: { request(type: string): Promise<WakeLockSentinel> };
      }).wakeLock.request('screen');
    } catch { /* not supported or permission denied */ }
  }, []);

  const release = useCallback(() => {
    lockRef.current?.release().catch(() => {});
    lockRef.current = null;
  }, []);

  return { acquire, release };
}
