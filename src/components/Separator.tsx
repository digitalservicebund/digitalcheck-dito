import { twMerge } from "tailwind-merge";

type SeperatorProps = {
  className?: string;
};

export default function Separator({ className }: Readonly<SeperatorProps>) {
  return (
    <hr
      className={twMerge(
        "border-0 border-b-2 border-solid border-gray-400",
        className,
      )}
    />
  );
}
