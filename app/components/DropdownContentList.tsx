import { NavLink, useLocation } from "react-router";
import twMerge from "~/utils/tailwindMerge";
import { normalizePathname } from "~/utils/utilFunctions";
import Badge from "./Badge";

export type ActiveBehavior = "noHighlight" | "exactMatch";

export type DropdownItemProps = {
  number?: number;
  title: string;
  content?: string;
  newContent?: string;
  className?: string;
  href?: string;
  isNewTitle?: boolean;
  plausibleEventName: string;
  activeBehavior?: ActiveBehavior;
};

export type DropdownContentListProps = {
  data: DropdownItemProps[];
  isOrderedList?: boolean;
  onItemClick: () => void;
  isMobile?: boolean;
  parentPlausibleEvent: string;
};

export default function DropdownContentList({
  data,
  isOrderedList = false,
  onItemClick,
  isMobile = false,
  parentPlausibleEvent,
}: Readonly<DropdownContentListProps>) {
  const location = useLocation();
  const listClasses = twMerge(
    "list-unstyled",
    isMobile && "py-8 pr-8 pl-16 border-b-[1px] border-gray-600",
  );

  const mapDataToItems = (option: DropdownItemProps, index: number) => {
    return (
      <li key={option.href || option.title || index}>
        <NavLink
          to={option.href!}
          onClick={onItemClick}
          aria-label={option.title}
          role="menuitem"
          className={`plausible-event-name=Nav+Bar.${parentPlausibleEvent}+Layer.${option.plausibleEventName}`}
        >
          {({ isActive }) => {
            const checkExactMatchCriteria =
              option.activeBehavior === "exactMatch"
                ? normalizePathname(location.pathname) ===
                  normalizePathname(option.href!)
                : true;

            const finalIsActive =
              isActive &&
              option.activeBehavior !== "noHighlight" &&
              checkExactMatchCriteria;
            const itemNumber = isOrderedList ? index + 1 : undefined;

            return (
              <div
                className={twMerge(
                  "ds-stack ds-stack-4 hover:bg-ds-blue cursor-pointer border-l-[4px] border-l-transparent py-8 pr-8 pl-16 text-left lg:border-l-[8px] lg:px-56 lg:py-24",
                  finalIsActive && "bg-ds-blue border-ds-dark-blue",
                  option.className,
                )}
              >
                <div className="ds-label-02-reg lg:ds-label-01-bold">
                  {option.isNewTitle && (
                    <Badge className="mr-8" look="hint">
                      NEU
                    </Badge>
                  )}
                  {itemNumber && <span className="mr-4">{itemNumber}. </span>}
                  {option.title}
                </div>
                {option.content && (
                  <span className="hidden lg:inline">{option.content}</span>
                )}
                {option.newContent && (
                  <div className="max-lg:hidden">
                    <Badge className="mr-8" look="hint">
                      NEU
                    </Badge>
                    <span>{option.newContent}</span>
                  </div>
                )}
              </div>
            );
          }}
        </NavLink>
      </li>
    );
  };

  return isOrderedList ? (
    <ol className={listClasses}>{data.map(mapDataToItems)}</ol>
  ) : (
    <ul className={listClasses}>{data.map(mapDataToItems)}</ul>
  );
}
