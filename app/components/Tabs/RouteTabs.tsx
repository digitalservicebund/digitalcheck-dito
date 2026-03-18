import { type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
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

export type RouteTabsProps = {
  activeKey?: string;
  tabs: RouteTab[];
};

// Renders a list of tabs as links and navigates to the corresponding route when a tab is selected.
export default function RouteTabs({ activeKey, tabs }: RouteTabsProps) {
  const navigate = useNavigate();
  const selectedIndex = getSelectedIndexByKey(tabs, activeKey);

  const onChange = (index: number) => {
    const tab = tabs[index];
    if (!tab) {
      return;
    }

    void navigate(tab.to);
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
            <Link
              key={tab.key}
              to={tab.to}
              aria-current={isActive ? "page" : undefined}
              className={twJoin(
                desktopTabClassName,
                isActive && selectedDesktopTabClassName,
              )}
            >
              {tab.label}
            </Link>
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
