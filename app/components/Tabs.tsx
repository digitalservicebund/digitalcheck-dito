import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import React, { useState } from "react";
import { twJoin } from "tailwind-merge";
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
  wrapperClassName?: string;
  initialActiveIndex?: number;
  onNavigateRequest?: (tab: TabItem, index: number) => void;
}

/**
 * Renders a tabbed interface, with a dropdown menu for narrow viewports.
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
  wrapperClassName,
  initialActiveIndex = 0,
  onNavigateRequest,
}: Readonly<TabsProps>) {
  const [activeTab, setActiveTab] = useState(initialActiveIndex);

  const handleTabInteraction = (index: number) => {
    setActiveTab(index);
    if (onNavigateRequest) {
      onNavigateRequest(tabs[index], index);
    }
  };

  return (
    <TabGroup
      className={wrapperClassName}
      selectedIndex={activeTab}
      onChange={handleTabInteraction}
    >
      <TabList
        aria-label="Menü Navigation"
        className={twMerge(
          "mb-40 box-border flex items-stretch border-b-[3px] border-blue-500 max-lg:hidden",
          className,
        )}
      >
        {/* Tab buttons regular view */}
        {tabs.map((tab) => (
          <Tab
            key={tab.title}
            className="relative -mb-[3px] box-border min-h-[70px] cursor-pointer border-b-[3px] border-blue-500 px-24 py-12 text-left leading-tight hyphens-auto text-blue-800 hover:bg-blue-100 data-selected:border-b-4 data-selected:border-blue-800 data-selected:bg-blue-100 data-selected:font-bold"
          >
            {tab.title}
          </Tab>
        ))}
      </TabList>
      {/* Mobile Dropdown */}
      <div className={twMerge("mb-40 lg:hidden", className)}>
        {/* Wrapper is needed for the styles here, Listbox provides context and state management */}
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
      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={`panel-${index + 1}`}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
