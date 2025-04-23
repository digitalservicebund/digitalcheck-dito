import { NavLink, useLocation } from "react-router";
import DropdownItem, {
  type DropdownItemProps,
} from "~/components/DrodownMenuItem.tsx";
import twMerge from "~/utils/tailwindMerge";

export type DropdownContentListProps = {
  data: DropdownItemProps[];
  isList?: boolean;
  onItemClick: () => void;
  isMobile?: boolean;
};

export default function DropdownContentList({
  data,
  isList = false,
  onItemClick,
  isMobile = false,
}: Readonly<DropdownContentListProps>) {
  const location = useLocation();

  const mapDataToItems = (option: DropdownItemProps, index: number) => {
    const renderContent = ({ isActive }: { isActive: boolean }) => {
      const browserHasHash = location.hash !== "";
      // Don't mark support subsection as active items
      const finalIsActive = isActive && !browserHasHash;

      return (
        <DropdownItem
          number={isList ? index + 1 : undefined}
          newContent={option.newContent}
          title={option.title}
          content={option.content}
          isNewTitle={option.isNewTitle}
          isActive={finalIsActive}
          className={option.className}
        />
      );
    };

    if (isList) {
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
    } else {
      return (
        <NavLink
          key={option.title}
          to={option.href!}
          role="option"
          onClick={onItemClick}
          aria-label={option.title}
        >
          {renderContent}
        </NavLink>
      );
    }
  };

  const mobileElementStyle = "py-8 pr-8 pl-16 border-b-[1px] border-gray-600 ";
  const listClasses = twMerge(
    "list-unstyled list-none",
    isMobile ? mobileElementStyle : "",
  );

  return isList ? (
    <ol className={listClasses}>{data.map(mapDataToItems)}</ol>
  ) : (
    <ul className={listClasses}>{data.map(mapDataToItems)}</ul>
  );
}
