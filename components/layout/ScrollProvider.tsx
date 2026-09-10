'use client';

import { createContext, useContext, useEffect, useRef } from 'react';

interface ScrollState {
  collapsed: boolean;
}

const ScrollContext = createContext<ScrollState>({ collapsed: false });

export function useScrollState() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const collapsedRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    // Hysteresis thresholds prevent rapid toggling when scroll position
    // hovers around a single value (common on trackpads / smooth wheels).
    const COLLAPSE_AT = 80; // pass this going DOWN to collapse
    const EXPAND_AT = 40;   // fall below this going UP to expand

    const update = () => {
      const y = window.scrollY;
      const current = collapsedRef.current;
      // Only flip state when we clearly cross a threshold in each direction.
      const next = current ? y > EXPAND_AT : y > COLLAPSE_AT;

      if (next !== current) {
        collapsedRef.current = next;
        document.body.toggleAttribute('data-scrolled', next);
      }

      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount so initial state matches the current scroll position
    // (important when navigating to a non-top anchor link).
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ collapsed: collapsedRef.current }}>
      {children}
    </ScrollContext.Provider>
  );
}
