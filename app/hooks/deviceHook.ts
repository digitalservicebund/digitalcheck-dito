import { useEffect, useState } from "react";

export function useIsMobileSize() {
  const [isMobileSize, setIsMobileSize] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileSize(window.innerWidth <= 768); // Breakpoint md

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => removeEventListener("resize", handleResize);
  }, []);

  return isMobileSize;
}
