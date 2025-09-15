import { ArrowUpward } from "@digitalservicebund/icons";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // only show the button when the user has scrolled past the fold
    const scrollThreshold = window.innerHeight;
    const shouldShowButton = window.scrollY > scrollThreshold;
    setIsVisible(shouldShowButton);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={twJoin(
        "ds-label-03-reg fixed right-16 bottom-16 z-50 flex items-center gap-8 rounded-full bg-blue-800 p-8 pr-16 text-white shadow-md outline-2 outline-blue-500 transition-opacity duration-150 sm:right-24 sm:bottom-24",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isVisible}
    >
      <ArrowUpward fill={"currentColor"} />
      Zurück nach oben
    </button>
  );
}
