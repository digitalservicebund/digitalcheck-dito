import { NavLink, useLocation } from "react-router";
import DropdownItem, {
  type DropdownItemProps,
} from "~/components/DrodownMenuItem.tsx";
import twMerge from "~/utils/tailwindMerge";

export type DropdownContentListProps = {
  data: DropdownItemProps[];
  isOrderedList?: boolean;
  onItemClick: () => void;
  isMobile?: boolean;
};

export default function DropdownContentList({
  data,
  isOrderedList = false,
  onItemClick,
  isMobile = false,
}: Readonly<DropdownContentListProps>) {
  const location = useLocation();
  const listClasses = twMerge(
    "list-unstyled",
    isMobile && "py-8 pr-8 pl-16 border-b-[1px] border-gray-600",
  );

  const mapDataToItems = (option: DropdownItemProps, index: number) => {
    const renderContent = ({ isActive }: { isActive: boolean }) => {
      const browserHasHash = location.hash !== "";
      // Don't mark support subsection as active items
      const finalIsActive = isActive && !browserHasHash;

      return (
        <DropdownItem
          number={isOrderedList ? index + 1 : undefined}
          newContent={option.newContent}
          title={option.title}
          content={option.content}
          isNewTitle={option.isNewTitle}
          isActive={finalIsActive}
          className={option.className}
        />
      );
    };

    return (
      <li key={index}>
        <NavLink
          to={option.href!}
          role="option"
          onClick={onItemClick}
          aria-label={option.title}
        >
          {renderContent}
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
