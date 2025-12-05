import {
  TabGroup as HeadlessTabGroup,
  TabGroupProps as HeadlessTabGroupProps,
} from "@headlessui/react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import TabGroup from "./Tabs";
import { TabsStateContext } from "./TabsStateContext";

export type TabGroupWithUrlStateProps = Omit<
  HeadlessTabGroupProps,
  "selectedIndex"
> & {
  initialActiveIndex?: number;
  useUrlTabState?: boolean;
};

/**
 * @name TabGroupWithUrlState
 * @description Tab Group controlled by search parameter, e.g.: ?tab=2
 * @usage with Link component like this: `<Link to={getTabAnchorLink(2, "element-id")} reloadDocument />`
 */
const TabGroupWithUrlState = ({
  initialActiveIndex = 0,
  onChange: parentOnChange,
  ...props
}: TabGroupWithUrlStateProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIndex =
    Number(searchParams.get("tab") ?? initialActiveIndex + 1) - 1;

  const onChange = useCallback(
    (index: number) => {
      if (parentOnChange) parentOnChange(index);

      setSearchParams(new URLSearchParams({ tab: String(index + 1) }), {
        preventScrollReset: true,
      });
    },
    [parentOnChange, setSearchParams],
  );

  const context = useMemo(
    () => ({
      selectedIndex,
      onChange,
    }),
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

TabGroupWithUrlState.Tab = TabGroup.Tab;
TabGroupWithUrlState.TabList = TabGroup.TabList;
TabGroupWithUrlState.TabPanels = TabGroup.TabPanels;
TabGroupWithUrlState.TabPanel = TabGroup.TabPanel;
export default TabGroupWithUrlState;
