import { useEffect, useRef, useState } from "react";

export function useResize(onResize: () => void, init = true) {
  const onResizeRef = useRef(onResize);

  // Update the ref when the callback changes
  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      onResizeRef.current();
    };

    window.addEventListener("resize", handleResize);
    if (init) handleResize(); // initialize

    return () => window.removeEventListener("resize", handleResize);
  }, [init]);
}

export function useScroll(onScroll: () => void) {
  const onScrollRef = useRef(onScroll);

  // Update the ref when the callback changes
  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      onScrollRef.current();
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

export function useIsMobileSize() {
  // Start with undefined to indicate we don't know the size yet (avoiding hydration mismatch)
  // On the server, we can't determine the screen size, so we defer this until client-side
  const [isMobileSize, setIsMobileSize] = useState<boolean | undefined>(
    undefined,
  );

  useResize(() => {
    if (typeof window !== "undefined") {
      setIsMobileSize(window.innerWidth <= 768 /* Breakpoint md */);
    }
  });

  // Default to false (desktop) if not yet determined to maintain backward compatibility
  return isMobileSize ?? false;
}
