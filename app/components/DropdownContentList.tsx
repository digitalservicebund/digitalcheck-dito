import { Link, useLocation } from "react-router";
import DropdownItem, {
  type DropdownItemProps,
} from "~/components/DrodownItem.tsx";

export type DropdownContentListProps = {
  data: DropdownItemProps[];
  isList?: boolean;
  onItemClick: () => void;
};

// TODO: add second row for more than 4 items
export default function DropdownContentList({
  data,
  isList = false,
  onItemClick,
}: Readonly<DropdownContentListProps>) {
  const location = useLocation();
  const currentPathname = location.pathname;
  return (
    <>
      {data.map((option, index) => {
        const isActive = !!option.href && option.href === currentPathname;
        return (
          <Link
            key={option.title}
            to={option.href!}
            role="option"
            onClick={onItemClick}
            aria-selected={isActive}
            aria-label={option.title}
          >
            <DropdownItem
              number={isList ? index + 1 : 0}
              newContent={option.newContent}
              title={option.title}
              content={option.content}
              isNewTitle={option.isNewTitle}
              isActive={isActive}
            />
          </Link>
        );
      })}
    </>
  );
}
