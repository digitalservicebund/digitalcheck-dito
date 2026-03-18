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
import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import {
  mobileTabPickerButtonClassName,
  mobileTabPickerOptionClassName,
  mobileTabPickerOptionsClassName,
} from "./tabUtils";

export type MobileTabPickerItem = {
  key: string;
  label: ReactNode;
};

type MobileTabPickerProps = {
  items: MobileTabPickerItem[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

export default function MobileTabPicker({
  items,
  selectedIndex,
  onChange,
}: MobileTabPickerProps) {
  return (
    <div className="mb-40 lg:hidden">
      <Listbox value={selectedIndex} onChange={onChange}>
        <ListboxButton className={mobileTabPickerButtonClassName}>
          {({ open }) => (
            <>
              {items[selectedIndex]?.label}
              <span className="absolute inset-y-0 right-[16px] flex items-center">
                {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
              </span>
            </>
          )}
        </ListboxButton>
        <ListboxOptions className={mobileTabPickerOptionsClassName}>
          {items.map((item, index) => (
            <ListboxOption
              key={item.key}
              className={({ focus, selected }) =>
                twJoin(
                  mobileTabPickerOptionClassName,
                  focus ? "bg-blue-300" : "bg-blue-100",
                  selected && "hidden",
                )
              }
              value={index}
            >
              {item.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
