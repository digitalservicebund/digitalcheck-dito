import type { ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import MobileTabPicker from "./MobileTabPicker";
import {
  desktopTabClassName,
  getSelectedIndexByKey,
  selectedDesktopTabClassName,
} from "./tabUtils";

export type RouteTab = {
  key: string;
  label: ReactNode;
  to: string;
};

export type RouteTabsProps = Readonly<{
  activeKey?: string;
  tabs: RouteTab[];
}>;

// Renders a list of tabs as links and navigates to the corresponding route when a tab is selected.
export default function RouteTabs({ activeKey, tabs }: RouteTabsProps) {
  const selectedIndex = getSelectedIndexByKey(tabs, activeKey);

  const onChange = (index: number) => {
    const tab = tabs[index];
    if (tab) globalThis.location.href = tab.to;
  };

  return (
    <>
      <nav
        aria-label="Seitenabschnitte"
        className="mb-40 box-border hidden items-stretch border-b-[3px] border-blue-500 lg:flex"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;

          return (
            <a
              key={tab.key}
              href={tab.to}
              aria-current={isActive ? "page" : undefined}
              className={twJoin(
                desktopTabClassName,
                isActive && selectedDesktopTabClassName,
              )}
            >
              {tab.label}
            </a>
          );
        })}
      </nav>
      <MobileTabPicker
        items={tabs}
        selectedIndex={selectedIndex}
        onChange={onChange}
      />
    </>
  );
}
