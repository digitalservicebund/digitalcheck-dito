import { Link, useLocation } from "react-router";
import DropdownItem, {
  type DropdownItemProps,
} from "~/components/DrodownItem.tsx";

export type DropdownContentListProps = {
  data: DropdownItemProps[];
  isList?: boolean;
  onItemClick: () => void;
};

export default function DropdownContentList({
  data,
  isList = false,
  onItemClick,
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
        <li>
          <Link
            to={option.href!}
            key={index}
            role="option"
            onClick={onItemClick}
            aria-selected={isActive}
            aria-label={option.title}
            className="min-w-0 flex-1"
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

  return isList ? (
    // No styling because the numbers are rendered inside the DropdownItem
    <ol className="list-none">{data.map(mapDataToItems)}</ol>
  ) : (
    <>{data.map(mapDataToItems)}</>
  );
}
