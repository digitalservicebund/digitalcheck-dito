import {
  Tab as HeadlessTab,
  TabGroup as HeadlessTabGroup,
  TabGroupProps as HeadlessTabGroupProps,
  TabList as HeadlessTabList,
  TabPanel as HeadlessTabPanel,
  TabPanels,
} from "@headlessui/react";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { twJoin } from "tailwind-merge";
import { tabSearchParam } from "~/utils/tabs";
import { prettySlugify } from "~/utils/utilFunctions";
import MobileTabPicker from "./MobileTabPicker";
import {
  desktopTabClassName,
  getSelectedIndexByKey,
  selectedDesktopTabClassName,
} from "./tabUtils";

type TabProps = Omit<
  React.ComponentProps<typeof HeadlessTabPanel>,
  "children"
> & {
  tabId?: string;
  label: string;
  children: React.ReactNode;
};

type ResolvedTab = {
  children: React.ReactNode;
  label: string;
  panelProps: Omit<TabProps, "children" | "label" | "tabId">;
  key: string;
};

const TabComponent = (_props: TabProps) => null;

function isTabElement(
  child: React.ReactNode,
): child is React.ReactElement<TabProps, typeof TabComponent> {
  return React.isValidElement(child) && child.type === TabComponent;
}

function resolveTabs(children: React.ReactNode): ResolvedTab[] {
  return React.Children.toArray(children).flatMap((child) => {
    if (!isTabElement(child)) return [];
    const { children, label, tabId, ...panelProps } = child.props;
    const key = tabId ?? prettySlugify(label);

    return {
      label,
      panelProps,
      children,
      key,
    };
  });
}

export type TabGroupProps = Omit<
  HeadlessTabGroupProps,
  "children" | "defaultIndex" | "onChange" | "selectedIndex"
> & {
  children: React.ReactNode;
  onChange?: (index: number) => void;
  selectedIndex?: number;
};

const TabsComponent = ({
  children,
  onChange,
  selectedIndex: controlledSelectedIndex,
  ...props
}: TabGroupProps) => {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(0);
  const resolvedTabs = useMemo(() => resolveTabs(children), [children]);
  const isControlled = controlledSelectedIndex !== undefined;
  const selectedIndex = isControlled
    ? controlledSelectedIndex
    : internalSelectedIndex;

  const handleChange = (index: number) => {
    if (!resolvedTabs[index]) {
      return;
    }

    if (!isControlled) {
      setInternalSelectedIndex(index);
    }

    onChange?.(index);
  };

  return (
    <HeadlessTabGroup
      selectedIndex={selectedIndex}
      onChange={handleChange}
      {...props}
    >
      <HeadlessTabList className="mb-40 box-border flex items-stretch border-b-[3px] border-blue-500 max-lg:hidden">
        {resolvedTabs.map((tab) => (
          <HeadlessTab
            key={tab.key}
            className={({ selected }) =>
              twJoin(
                desktopTabClassName,
                selected && selectedDesktopTabClassName,
              )
            }
          >
            {tab.label}
          </HeadlessTab>
        ))}
      </HeadlessTabList>
      <MobileTabPicker
        items={resolvedTabs}
        selectedIndex={selectedIndex}
        onChange={handleChange}
      />
      <TabPanels>
        {resolvedTabs.map(({ children: panelChildren, key, panelProps }) => (
          <HeadlessTabPanel key={key} {...panelProps}>
            {panelChildren}
          </HeadlessTabPanel>
        ))}
      </TabPanels>
    </HeadlessTabGroup>
  );
};

type SearchParamTabsProps = Omit<TabGroupProps, "onChange" | "selectedIndex">;

const SearchParamTabsComponent = ({ children }: SearchParamTabsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resolvedTabs = useMemo(() => resolveTabs(children), [children]);
  const selectedIndex = getSelectedIndexByKey(
    resolvedTabs,
    searchParams.get(tabSearchParam) ?? undefined,
  );

  const handleChange = (index: number) => {
    const tab = resolvedTabs[index];
    if (!tab) {
      return;
    }

    setSearchParams(
      (prev) => {
        prev.set(tabSearchParam, tab.key);
        return prev;
      },
      { preventScrollReset: true },
    );
  };

  return (
    <TabsComponent selectedIndex={selectedIndex} onChange={handleChange}>
      {children}
    </TabsComponent>
  );
};

// Compound component export is intentional here.
// eslint-disable-next-line react-refresh/only-export-components
export const SearchParamTabs = Object.assign(SearchParamTabsComponent, {
  Tab: TabComponent,
});
const TabGroup = Object.assign(TabsComponent, {
  Tab: TabComponent,
});
export default TabGroup;
