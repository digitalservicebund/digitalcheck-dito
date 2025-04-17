import twMerge from "~/utils/tailwindMerge";

export type DropdownItemProps = {
  number?: number;
  title: string;
  content?: string;
  newContent?: string;
  className?: string;
  href?: string;
  isNewTitle?: boolean;
  isActive?: boolean;
  allHrefs?: string[];
};

export default function DropdownItem({
  number,
  title,
  content,
  newContent,
  isNewTitle,
  className,
  isActive,
}: DropdownItemProps) {
  return (
    <div
      className={twMerge(
        "ds-stack ds-stack-8 cursor-pointer border-l-[4px] border-l-transparent px-16 py-8 text-left hover:bg-blue-100 lg:border-l-[8px] lg:px-56 lg:py-24",
        isActive && "border-blue-800 bg-blue-100",
        className,
      )}
    >
      <div className="ds-label-02-reg lg:ds-label-01-bold">
        {isNewTitle && (
          <span className="ds-label-02-reg mr-8 rounded-md bg-blue-300 px-8 py-4 text-[#004B76]">
            NEU
          </span>
        )}
        {/*
        // TODO: render list as html
*/}
        {number !== 0 && <span className="mr-4">{number}. </span>}
        {title}
      </div>
      {content && <span className="hidden lg:inline">{content}</span>}
      {newContent && (
        <div className="max-lg:hidden">
          <span className="ds-label-02-reg mr-8 rounded-md bg-blue-300 px-8 py-4 text-[#004B76]">
            NEU
          </span>
          <span>{newContent}</span>
        </div>
      )}
    </div>
  );
}
