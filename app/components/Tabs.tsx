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
import { getPlausibleEventClassName } from "~/utils/plausibleUtils";
import twMerge from "~/utils/tailwindMerge";

export interface TabItem {
  title: string;
  plausibleEventName?: string;
  content: React.ReactNode;
  path?: string;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
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
  className,
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
        className={twMerge(
          "mb-40 box-border flex items-stretch border-b-[3px] border-blue-500 max-lg:hidden",
          className,
        )}
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
            className={twMerge(
              "hover:bg-ds-blue text-ds-dark-blue relative -mb-[3px] box-border min-h-[70px] cursor-pointer border-b-[3px] border-blue-500 px-24 py-12 text-left leading-tight hyphens-auto",
              activeTab === index &&
                "bg-ds-blue border-ds-dark-blue border-b-4 font-bold",
              getPlausibleEventClassName(`Tab+Bar.${tab.plausibleEventName}`),
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {/* Mobile Dropdown */}
      <div className={twMerge("mb-40 lg:hidden", className)}>
        {/* Wrapper is needed for the styles here, Listbox provides context & state management */}
        <Listbox
          value={activeTab}
          onChange={(newIndex) => {
            handleTabInteraction(newIndex);
          }}
        >
          {/* Container for positioning */}
          <ListboxButton className="ds-label-02-bold bg-ds-blue hover:bg-ds-mid-blue text-ds-dark-blue focus:border-ds-dark-blue relative h-[70px] w-full cursor-pointer border-[4px] border-transparent pl-[16px] text-left">
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
                    "ds-label-02-regular text-ds-dark-blue focus:border-ds-dark-blue relative cursor-pointer border-[4px] border-transparent py-[10px] pr-[10px] pl-[16px] select-none first:pt-[16px] last:pb-[16px]",
                    focus ? "bg-ds-mid-blue" : "bg-ds-blue",
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
