import customTwMerge from "~/utils/tailwindMerge";

type SeperatorProps = {
  className?: string;
};

export default function Separator({ className }: Readonly<SeperatorProps>) {
  return (
    <hr
      className={customTwMerge(
        "border-0 border-b-2 border-solid border-gray-400",
        className,
      )}
    />
  );
}
