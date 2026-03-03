import { useEffect, useRef, useState } from "react";

export function useResize(onResize: () => void, init = true) {
  const onResizeRef = useRef(onResize);

  // Update the ref when the callback changes
  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    if (typeof globalThis.window === "undefined") return;

    const handleResize = () => {
      onResizeRef.current();
    };

    globalThis.window.addEventListener("resize", handleResize);
    if (init) handleResize(); // initialize

    return () => globalThis.window.removeEventListener("resize", handleResize);
  }, [init]);
}

export function useScroll(onScroll: () => void) {
  const onScrollRef = useRef(onScroll);

  // Update the ref when the callback changes
  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    if (typeof globalThis.window === "undefined") return;

    const handleScroll = () => {
      onScrollRef.current();
    };

    globalThis.window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize

    return () => globalThis.window.removeEventListener("scroll", handleScroll);
  }, []);
}

export function useIsMobileSize() {
  // Start with undefined to indicate we don't know the size yet (avoiding hydration mismatch)
  // On the server, we can't determine the screen size, so we defer this until client-side
  const [isMobileSize, setIsMobileSize] = useState<boolean | undefined>(
    undefined,
  );

  useResize(() => {
    if (typeof globalThis.window !== "undefined") {
      setIsMobileSize(globalThis.window.innerWidth <= 768 /* Breakpoint md */);
    }
  });

  // Default to false (desktop) if not yet determined to maintain backward compatibility
  return isMobileSize ?? false;
}
