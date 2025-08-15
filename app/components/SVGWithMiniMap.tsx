import { useEffect, useRef, useState } from "react";
import { useResize, useScroll } from "~/hooks/deviceHook";
import twMerge from "~/utils/tailwindMerge";

type MinimapProps = {
  svgSrc: string;
  minimapWidth?: number;
  className?: string;
};

export default function SVGWithMinimap({
  className,
  svgSrc,
  minimapWidth = 100,
}: MinimapProps) {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [viewportRatio, setViewportRatio] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);

  const svgContainerRef = useRef<HTMLDivElement>(null);
  const svgImgRef = useRef<HTMLImageElement>(null);

  const drawMinimapIndicator = () => {
    const el = svgContainerRef.current;
    if (!el) return;

    const scrollTop = window.scrollY - el.offsetTop;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = window.innerHeight;

    const elPageRatio = scrollHeight / el.offsetHeight;
    const ratio = (scrollTop / scrollHeight) * elPageRatio;

    setScrollRatio(ratio);
    setViewportRatio((clientHeight / scrollHeight) * elPageRatio);
  };

  useResize(drawMinimapIndicator);
  useScroll(drawMinimapIndicator);

  useEffect(() => {
    const img = svgImgRef.current;
    if (!img) return;

    const onLoad = () => {
      drawMinimapIndicator();
      setImgLoading(false);
    };

    img.addEventListener("load", onLoad);
    img.src = svgSrc;

    return () => img.removeEventListener("load", onLoad);
  }, [svgSrc]);

  return (
    <div
      className={twMerge(
        "flex flex-row items-start fill-blue-700/20 stroke-blue-700/90 px-8",
        className,
      )}
    >
      <div className="sticky top-10 mr-8 w-100">
        <div className="relative">
          <svg className="block" width={minimapWidth} viewBox="0 0 2203 13126">
            <image href={svgSrc} width="100%" />
            {/* Scroll indicator */}
            <rect
              x={0}
              y={scrollRatio * 100 + "%"}
              width="100%"
              height={viewportRatio * 100 + "%"}
              fill="inherit"
              stroke="inherit"
              strokeWidth={1}
            />
          </svg>
        </div>
      </div>

      <div ref={svgContainerRef} className="flex">
        {imgLoading && <p>Lädt...</p>}
        <img
          ref={svgImgRef}
          src={undefined}
          alt="Visualisierung: Der Digitalcheck im Gesetzgebungsprozess"
          className="block w-full"
        />
      </div>
    </div>
  );
}
