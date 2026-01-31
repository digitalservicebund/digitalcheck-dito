import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import { useEffect, useRef, useState } from "react";
import {
  FEDERAL_STATES,
  type FederalState,
  useFederalState,
} from "~/contexts/FederalStateContext";
import twMerge from "~/utils/tailwindMerge";

export default function FederalStateSelector() {
  const { currentState, setCurrentState, stateInfo } = useFederalState();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const selectState = (state: FederalState) => {
    setCurrentState(state);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-[160px]">
      <button
        type="button"
        onClick={toggleOpen}
        className={twMerge(
          "flex h-full w-full cursor-pointer items-center justify-between gap-4 border-b-4 border-transparent px-12 hover:bg-blue-100",
          isOpen && "border-blue-800 bg-blue-100",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Bundesland auswählen: ${stateInfo.name}`}
      >
        <span className="ds-label-01-reg whitespace-nowrap">
          {stateInfo.name}
        </span>
        {isOpen ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Bundesland auswählen"
          className="absolute right-0 z-50 w-full list-none rounded-b-md border-t border-gray-600 bg-white py-8 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]"
        >
          {FEDERAL_STATES.map((state) => (
            <li key={state.id} role="option" aria-selected={currentState === state.id}>
              <button
                type="button"
                onClick={() => selectState(state.id)}
                className={twMerge(
                  "ds-label-01-reg w-full cursor-pointer px-16 py-8 text-left hover:bg-blue-100",
                  currentState === state.id && "bg-blue-100 font-bold",
                )}
              >
                {state.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
