export type DropdownItemProps = {
  number?: number;
  title: string;
  content?: string;
  newContent?: string;
  className?: string;
  href?: string;
  isNewTitle?: boolean;
};

const DropdownItem = ({
  number,
  title,
  content,
  newContent,
  isNewTitle,
}: DropdownItemProps) => {
  return (
    <div className="ds-stack ds-stack-8 cursor-pointer border-blue-800 px-56 py-24 text-left hover:bg-blue-100 focus:border-3">
      <div className="ds-label-01-bold">
        {isNewTitle && (
          <span className="ds-label-02-reg mr-8 rounded-md bg-blue-300 px-8 py-4 text-[#004B76]">
            NEU
          </span>
        )}
        {number !== 0 && (
          <span className="absolute left-[36px]">{number}.</span>
        )}
        {title}
      </div>
      {content && <span>{content}</span>}
      {newContent && (
        <div>
          <span className="ds-label-02-reg mr-8 rounded-md bg-blue-300 px-8 py-4 text-[#004B76]">
            NEU
          </span>
          <span>{newContent}</span>
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
