import { normalizePathname } from "@/utils/path";
import twMerge from "@/utils/tailwindMerge";
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
  activeBehavior?: ActiveBehavior;
  externalLink?: boolean;
};

export type DropdownContentListProps = {
  currentPath: string;
  data: DropdownItemProps[];
  isOrderedList?: boolean;
  onItemClick: () => void;
  isMobile?: boolean;
};

export default function DropdownContentList({
  currentPath,
  data,
  isOrderedList = false,
  onItemClick,
  isMobile = false,
}: Readonly<DropdownContentListProps>) {
  const listClasses = twMerge(
    "list-unstyled",
    isMobile && "py-8 pr-8 pl-16 border-b-[1px] border-gray-600",
  );

  const mapDataToItems = (option: DropdownItemProps, index: number) => {
    const isActive =
      currentPath === option.href ||
      currentPath.startsWith(
        option.href!.endsWith("/") ? option.href! : option.href! + "/",
      );
    const checkExactMatchCriteria =
      option.activeBehavior === "exactMatch"
        ? normalizePathname(currentPath) === normalizePathname(option.href!)
        : true;

    const finalIsActive =
      isActive &&
      option.activeBehavior !== "noHighlight" &&
      checkExactMatchCriteria;
    const itemNumber = isOrderedList ? index + 1 : undefined;
    // aria-label overrides the link's accessible name (the visible content
    // differs by breakpoint), so any info that should reach screen reader
    // users - e.g. the "moved to Zentrum für Legistik" hint or a
    // new-tab warning for external links - must be folded in here.
    const accessibleLabel = [
      option.title,
      option.newContent,
      option.externalLink && "öffnet in neuem Tab",
    ]
      .filter(Boolean)
      .join(", ");
    return (
      <li key={option.href || option.title || index}>
        <a
          href={option.href}
          className="link-unstyled"
          aria-current={isActive ? "page" : undefined}
          onClick={onItemClick}
          aria-label={accessibleLabel}
          role="menuitem"
          target={option.externalLink ? "_blank" : "_self"}
          rel={option.externalLink ? "noreferrer" : undefined}
        >
          <div
            className={twMerge(
              "kern-stack kern-stack-xs cursor-pointer border-l-4 border-l-transparent py-8 pr-8 pl-16 text-left hover:bg-blue-100 lg:border-l-8 lg:px-56 lg:py-24",
              finalIsActive && "border-blue-800 bg-blue-100",
              option.className,
            )}
          >
            <div className="flex flex-row items-center">
              {option.isNewTitle && (
                <Badge className="mr-8" look="hint">
                  NEU
                </Badge>
              )}
              {itemNumber && (
                <span className="kern-label mr-4">{itemNumber}. </span>
              )}
              <div className="kern-label">{option.title}</div>
              {option.externalLink && (
                <span
                  className="kern-icon kern-icon--open-in-new kern-icon--default ml-4"
                  aria-hidden="true"
                ></span>
              )}
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
        </a>
      </li>
    );
  };

  return isOrderedList ? (
    <ol className={listClasses}>{data.map((o, i) => mapDataToItems(o, i))}</ol>
  ) : (
    <ul className={listClasses}>{data.map((o, i) => mapDataToItems(o, i))}</ul>
  );
}
