import { useEffect, useState } from "react";

export function useResize(onResize: () => void) {
  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize(); // initialize

    return () => removeEventListener("resize", onResize);
  }, [onResize]);
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
