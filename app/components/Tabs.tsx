import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

export interface TabItem {
  title: string;
  plausibleEventName?: string;
  content: React.ReactNode;
  path?: string;
}

interface TabsProps {
  tabs: TabItem[];
  initialActiveIndex?: number;
  onNavigateRequest?: (tab: TabItem, index: number) => void;
}

/**
 * Renders a tabbed interface.
 *
 * This component can display content directly within tab panels or,
 * when the `onNavigateRequest` prop is provided, it can delegate navigation
 * to an external source. In this mode, clicking a tab
 * will invoke `onNavigateRequest` with the tab's details, allowing the parent
 * component to handle the route change. The content for each tab is then
 * expected to be rendered by the parent, not by this component.
 */
export default function Tabs({
  tabs,
  initialActiveIndex = 0,
  onNavigateRequest,
}: Readonly<TabsProps>) {
  const [activeTab, setActiveTab] = useState(initialActiveIndex);
  const tabRef = useRef<Map<number, HTMLButtonElement> | null>(null);

  useEffect(() => {
    setActiveTab(initialActiveIndex);
  }, [initialActiveIndex]);

  function getMap() {
    tabRef.current ??= new Map();
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

  const handleTabInteraction = (index: number) => {
    setActiveTab(index);
    if (onNavigateRequest) {
      onNavigateRequest(tabs[index], index);
    }
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="Menü Navigation"
        className="my-[40px] flex items-start border-b-[3px] border-blue-500 max-lg:hidden"
      >
        {/* Tab buttons regular view */}
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
            aria-controls={
              !onNavigateRequest ? `panel-${index + 1}` : undefined
            }
            id={`tab-${index + 1}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => handleTabInteraction(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={twJoin(
              "relative mr-[8px] -mb-[3px] h-[70px] cursor-pointer px-[24px] py-[10px] text-blue-800 hover:border-b-[3px] hover:border-blue-500 hover:bg-blue-100",
              activeTab === index &&
                "border-b-[4px] border-blue-800 bg-blue-100 font-bold hover:border-b-[4px] hover:border-blue-800",
              tab.plausibleEventName &&
                `plausible-event-name=Tab+Bar.${tab.plausibleEventName}`,
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {/* Mobile Dropdown */}
      <div className="my-[40px] lg:hidden">
        {/* Wrapper is needed for the styles here, Listbox provides context & state management */}
        <Listbox
          value={activeTab}
          onChange={(newIndex) => {
            handleTabInteraction(newIndex);
          }}
        >
          {/* Container for positioning */}
          <ListboxButton className="ds-label-02-bold relative h-[70px] w-full cursor-pointer border-[4px] border-transparent bg-blue-100 pl-[16px] text-left text-blue-800 hover:bg-blue-300 focus:border-blue-800">
            {({ open }) => (
              <>
                {tabs[activeTab].title}
                <span className="absolute inset-y-0 right-[16px] flex items-center">
                  {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
                </span>
              </>
            )}
          </ListboxButton>
          <ListboxOptions className="border-t-[1px] border-blue-500 focus:outline-none">
            {tabs.map((tab, index) => (
              <ListboxOption
                key={tab.title}
                className={({ focus, selected }) =>
                  twJoin(
                    "ds-label-02-regular relative cursor-pointer border-[4px] border-transparent py-[10px] pr-[10px] pl-[16px] text-blue-800 select-none first:pt-[16px] last:pb-[16px] focus:border-blue-800",
                    focus ? "bg-blue-300" : "bg-blue-100",
                    // Selected item should be just visible in ListboxButton
                    selected && "hidden",
                    tab.plausibleEventName &&
                      `plausible-event-name=Tab+Bar.${tab.plausibleEventName}`,
                  )
                }
                value={index}
              >
                {tab.title}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>

      {/* Content of each tab. Render only if not navigating */}
      {/* TODO: Potentially remove guard and see whether rendering current tab is enough */}
      {!onNavigateRequest &&
        tabs.map((tab, index) => (
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
    </>
  );
}
