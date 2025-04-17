import { Link, useLocation } from "react-router";
import DropdownItem, {
  type DropdownItemProps,
} from "~/components/DrodownItem.tsx";
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
  const currentPathname = location.pathname;

  const mapDataToItems = (option: DropdownItemProps, index: number) => {
    const isActive =
      option.href === currentPathname ||
      (option.allHrefs && option.allHrefs.includes(currentPathname));

    const itemContent = (
      <DropdownItem
        number={isList ? index + 1 : undefined}
        newContent={option.newContent}
        title={option.title}
        content={option.content}
        isNewTitle={option.isNewTitle}
        isActive={isActive}
      />
    );

    if (isList) {
      return (
        <li key={index}>
          <Link
            to={option.href!}
            role="option"
            onClick={onItemClick}
            aria-selected={isActive}
            aria-label={option.title}
          >
            {itemContent}
          </Link>
        </li>
      );
    } else {
      return (
        <Link
          key={option.title}
          to={option.href!}
          role="option"
          onClick={onItemClick}
          aria-selected={isActive}
          aria-label={option.title}
        >
          {itemContent}
        </Link>
      );
    }
  };

  const mobileElementStyle = "py-8 pr-8 pl-16 border-b-[1px] border-gray-600 ";

  return isList ? (
    // No styling because the numbers are rendered inside the DropdownItem
    <ol
      className={twMerge(
        "list-unstyled list-none",
        isMobile ? mobileElementStyle : "",
      )}
    >
      {data.map(mapDataToItems)}
    </ol>
  ) : (
    <div className={isMobile ? mobileElementStyle : ""}>
      {data.map(mapDataToItems)}
    </div>
  );
}
