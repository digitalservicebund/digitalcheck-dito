import { useCallback, useEffect, useState } from "react";

export function useResize(onResize: () => void, init = true) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", onResize);
    if (init) onResize(); // initialize

    return () => window.removeEventListener("resize", onResize);
  }, [onResize, init]);
}

export function useScroll(onScroll: () => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", onScroll);
    onScroll(); // initialize

    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
}

export function useIsMobileSize() {
  const [isMobileSize, setIsMobileSize] = useState<boolean | undefined>(
    undefined,
  );

  useResize(
    // Use useCallback to prevent infinite loop
    useCallback(() => {
      if (typeof window !== "undefined") {
        setIsMobileSize(window.innerWidth <= 768 /* Breakpoint md */);
      }
    }, []),
  );

  // Default to false (desktop) if not yet determined
  return isMobileSize ?? false;
}
