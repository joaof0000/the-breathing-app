import { useEffect, useRef } from 'react';

/**
 * Acquires a Screen Wake Lock while `active` is true.
 * Falls back gracefully on browsers that don't support the Wake Lock API.
 *
 * Lifecycle guarantees
 * --------------------
 * 1. Per-sentinel release listeners.  Each sentinel gets its own stable
 *    closure as its `release` handler.  The closure captures the specific
 *    sentinel instance and only clears `sentinelRef` when that instance is
 *    still the one being tracked, preventing stale events from corrupting
 *    newer state.
 *
 * 2. Desired-state convergence.  `desiredRef` is always written before any
 *    async call.  When `wakeLock.request()` resolves it re-checks `desiredRef`
 *    so a transition while in-flight is handled correctly:
 *      - active → inactive mid-flight: the fresh sentinel is released immediately.
 *      - inactive → active mid-flight: `acquiringRef` is still set; the
 *        settling call converges to "keep lock" without a duplicate request.
 *
 * 3. No overlapping requests.  `acquiringRef` prevents concurrent calls.
 */
export function useWakeLock(active: boolean) {
  const sentinelRef  = useRef<WakeLockSentinel | null>(null);
  const acquiringRef = useRef(false);
  /** Always reflects the latest value of `active` so async callbacks can converge. */
  const desiredRef   = useRef(false);

  /**
   * Release the currently held sentinel (if any).
   * Safe to call repeatedly — no-ops when no sentinel is held.
   */
  function doRelease(): void {
    const s = sentinelRef.current;
    if (!s) return;
    s.release().catch(() => {});
    sentinelRef.current = null;
  }

  /**
   * Attempt to acquire the wake lock.  Reads `desiredRef` at resolution time
   * so it always converges to the current desired state, even if `active`
   * toggled while the async request was in flight.
   */
  async function doAcquire(): Promise<void> {
    if (!('wakeLock' in navigator)) return;
    if (acquiringRef.current) return;  // a request is already in flight; it will converge
    if (sentinelRef.current)  return;  // already holding a lock

    acquiringRef.current = true;
    let sentinel: WakeLockSentinel | null = null;
    try {
      sentinel = await navigator.wakeLock.request('screen');
    } catch {
      // Permission denied or API unavailable — degrade silently.
    } finally {
      acquiringRef.current = false;
    }

    if (!sentinel) return;

    // Converge: if desired state changed to false while we were awaiting,
    // release the freshly obtained sentinel instead of storing it.
    if (!desiredRef.current) {
      sentinel.release().catch(() => {});
      return;
    }

    // Each sentinel gets its own per-instance closure so that:
    // - removeEventListener (done implicitly on release) always targets the
    //   right function reference.
    // - A stale event for an old sentinel cannot corrupt newer state.
    const captured = sentinel;
    const onRelease = () => {
      if (sentinelRef.current === captured) {
        sentinelRef.current = null;
        // Page returned to visibility while we held the lock — reacquire.
        if (desiredRef.current && document.visibilityState === 'visible') {
          doAcquire();
        }
      }
    };

    captured.addEventListener('release', onRelease);
    sentinelRef.current = captured;
  }

  // Acquire or release whenever `active` changes.
  useEffect(() => {
    desiredRef.current = active;
    if (active) {
      doAcquire();
    } else {
      doRelease();
    }
    // Always release on unmount.
    return () => {
      desiredRef.current = false;
      doRelease();
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-acquire when the page becomes visible again after being hidden.
  // Browsers automatically release wake locks on visibility change.
  // Registered once; reads live refs at call time — no staleness.
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && desiredRef.current) {
        if (!sentinelRef.current && !acquiringRef.current) {
          doAcquire();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
