import { TabGroupProps } from "@headlessui/react";
import { createContext } from "react";

export type TabsState = Pick<TabGroupProps, "selectedIndex" | "onChange">;
export const TabsStateContext = createContext<TabsState | null>(null);
