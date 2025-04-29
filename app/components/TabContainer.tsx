import React, { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

export interface TabItem {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  initialActiveIndex?: number;
  ariaLabel: string;
}

export default function TabContainer({
  tabs,
  initialActiveIndex = 0,
  ariaLabel,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(initialActiveIndex);
  const tabRef = useRef<Map<number, HTMLButtonElement> | null>(null);

  useEffect(() => {
    setActiveTab(initialActiveIndex);
  }, [initialActiveIndex]);

  function getMap() {
    if (!tabRef.current) {
      tabRef.current = new Map();
    }
    return tabRef.current;
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const map = getMap();
      map.get(index)?.setAttribute("tabindex", "-1");
      const direction = e.key === "ArrowRight" ? 1 : -1;
      const newIndex = (index + direction + tabs.length) % tabs.length;
      map.get(newIndex)?.focus();
      map.get(newIndex)?.setAttribute("tabindex", "0");
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="my-32 flex items-start max-sm:flex-col"
      >
        {/* Tab buttons */}
        {tabs.map((tab, index) => (
          <button
            key={tab.title}
            role="tab"
            ref={(node) => {
              const map = getMap();
              if (node) map.set(index, node);
              else map.delete(index);
            }}
            aria-selected={activeTab === index}
            aria-controls={`panel-${index + 1}`}
            id={`tab-${index + 1}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={twJoin(
              "my-8 mr-48 cursor-pointer p-8 text-blue-800",
              activeTab === index && "border-b-2 border-blue-800 font-bold",
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content of each tab */}
      {tabs.map((tab, index) => (
        <div
          key={`panel-${index + 1}`}
          id={`panel-${index + 1}`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${index + 1}`}
          hidden={activeTab !== index}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
