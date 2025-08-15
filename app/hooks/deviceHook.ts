import { useEffect, useState } from "react";

export function useResize(onResize: () => void, init = true) {
  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (init) onResize(); // initialize

    return () => removeEventListener("resize", onResize);
  }, [onResize, init]);
}

export function useScroll(onScroll: () => void) {
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    onScroll(); // initialize

    return () => removeEventListener("scroll", onScroll);
  }, [onScroll]);
}

export function useIsMobileSize() {
  const [isMobileSize, setIsMobileSize] = useState(false);

  useResize(() =>
    setIsMobileSize(window.innerWidth <= 768 /* Breakpoint md */),
  );

  return isMobileSize;
}
