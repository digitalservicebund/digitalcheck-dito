import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import {
  Tab as HeadlessTab,
  TabGroup as HeadlessTabGroup,
  TabGroupProps as HeadlessTabGroupProps,
  TabList as HeadlessTabList,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import React, { createContext, useMemo, useState } from "react";
import { twJoin } from "tailwind-merge";

export type TabListWithListboxProps = {
  children: React.ReactNode;
};

type TabsState = Pick<HeadlessTabGroupProps, "selectedIndex" | "onChange">;
const TabsStateContext = createContext<TabsState | null>(null);

export type TabGroupProps = Omit<HeadlessTabGroupProps, "selectedIndex"> & {
  initialActiveIndex?: number;
};

const TabGroup = ({
  initialActiveIndex = 0,
  onChange: parentOnChange,
  ...props
}: TabGroupProps) => {
  const [selectedIndex, setSelectedIndex] =
    useState<number>(initialActiveIndex);

  const onChange = (index: number) => {
    if (parentOnChange) {
      parentOnChange(index);
    }
    setSelectedIndex(index);
  };

  const context = useMemo(
    () => ({ selectedIndex, onChange }),
    [selectedIndex, onChange],
  );

  return (
    <TabsStateContext value={context}>
      <HeadlessTabGroup
        selectedIndex={selectedIndex}
        onChange={onChange}
        {...props}
      />
    </TabsStateContext>
  );
};

type TabProps = { children?: React.ReactNode };
/**
 * Dummy component that only renders its children.
 * The actual Tab logic and styling are added by the `Children.map` call in `TabListWithListbox`.
 */
const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

function useTabsStateContext(): TabsState {
  const context = React.useContext(TabsStateContext);
  if (context === null) {
    throw new Error("TabList must be used within a TabGroup component");
  }
  return context;
}

const TabList = ({ children }: Readonly<TabListWithListboxProps>) => {
  const context = useTabsStateContext();

  return (
    <>
      <HeadlessTabList className="mb-40 box-border flex items-stretch border-b-[3px] border-blue-500 max-lg:hidden">
        {React.Children.map(children, (child) => {
          return (
            <HeadlessTab className="relative -mb-[3px] box-border min-h-[70px] cursor-pointer border-b-[3px] border-blue-500 px-24 py-12 text-left leading-tight hyphens-auto text-blue-800 hover:bg-blue-100 data-selected:border-b-4 data-selected:border-blue-800 data-selected:bg-blue-100 data-selected:font-bold">
              {child}
            </HeadlessTab>
          );
        })}
      </HeadlessTabList>
      {/* Mobile Dropdown */}
      <div className="mb-40 lg:hidden">
        {/* Wrapper is needed for the styles here, Listbox provides context and state management */}
        <Listbox value={context.selectedIndex} onChange={context.onChange}>
          {/* Container for positioning */}
          <ListboxButton className="ds-label-02-bold relative h-[70px] w-full cursor-pointer border-4 border-transparent bg-blue-100 pl-[16px] text-left text-blue-800 hover:bg-blue-300 focus:border-blue-800">
            {({ open }) => (
              <>
                {React.Children.toArray(children)[context.selectedIndex ?? 0]}
                <span className="absolute inset-y-0 right-[16px] flex items-center">
                  {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
                </span>
              </>
            )}
          </ListboxButton>
          <ListboxOptions className="border-t border-blue-500 focus:outline-none">
            {React.Children.map(children, (child, index) => (
              <ListboxOption
                className={({ focus, selected }) =>
                  twJoin(
                    "ds-label-02-regular relative cursor-pointer border-4 border-transparent py-[10px] pr-[10px] pl-[16px] text-blue-800 select-none first:pt-[16px] last:pb-[16px] focus:border-blue-800",
                    focus ? "bg-blue-300" : "bg-blue-100",
                    // Selected item should be just visible in ListboxButton
                    selected && "hidden",
                  )
                }
                value={index}
              >
                {child}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </>
  );
};

TabGroup.Tab = Tab;
TabGroup.TabList = TabList;
TabGroup.TabPanels = TabPanels;
TabGroup.TabPanel = TabPanel;
export default TabGroup;
