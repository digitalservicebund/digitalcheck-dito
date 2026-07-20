import customTwMerge from "@/utils/tailwindMerge";

type SeperatorProps = {
  className?: string;
};

export default function Separator({ className }: Readonly<SeperatorProps>) {
  return (
    <hr
      className={customTwMerge(
        "border-ds-gray-400 border-0 border-b-2 border-solid",
        className,
      )}
    />
  );
}
