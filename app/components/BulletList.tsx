import React from "react";
import twMerge from "~/utils/tailwindMerge";

type BulletListProps = React.PropsWithChildren<{
  className?: string;
}> &
  React.HTMLProps<HTMLUListElement>;

const Bullet = () => (
  <div
    className={
      "mt-10 flex size-[20px] items-center justify-center rounded-full bg-blue-900"
    }
    role="none"
  ></div>
);

const BulletListItem = ({
  children,
  bullet,
  className,
}: React.PropsWithChildren<{ bullet?: boolean; className?: string }>) => (
  <li className="flex scroll-my-40 flex-row items-start gap-16 first:mt-16">
    {bullet && <Bullet />}
    <div className={className}>{children}</div>
  </li>
);

const BulletList = ({ className, children, ...restProps }: BulletListProps) => {
  return (
    <div
      className={twMerge(
        "ds-stack ds-stack-8 group relative scroll-my-40",
        className,
      )}
    >
      <div className="absolute top-32 bottom-0 left-[8px] w-[4px] bg-blue-300"></div>
      <ul
        className="list-unstyled ds-stack ds-stack-32 relative"
        {...restProps}
      >
        {children}
      </ul>
    </div>
  );
};

BulletList.Item = BulletListItem;

export default BulletList;
