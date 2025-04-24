import { useLocation } from "react-router";
import Background from "~/components/Background";
import { progress } from "~/resources/content/progress";
import twMerge from "~/utils/tailwindMerge";

export default function Progress() {
  const { pathname } = useLocation();
  return (
    <Background backgroundColor="midBlue">
      <div className="flex items-center justify-center sm:gap-24">
        {progress.map((item, index) => (
          <div
            key={item.label}
            className={twMerge(
              "flex items-center px-12 pt-8 pb-4 text-blue-800 max-md:flex-col md:border-b-4",
              pathname.startsWith(item.prefix)
                ? "border-blue-800 font-bold"
                : "border-transparent",
            )}
          >
            <div
              className={twMerge(
                "mr-8 flex h-24 w-24 items-center justify-center rounded-full border-2",
                pathname.startsWith(item.prefix)
                  ? "border-blue-800 bg-blue-800 text-white"
                  : "border-white",
              )}
            >
              {index + 1}
            </div>
            <span className="hidden md:block">{item.label}</span>
            <span className="md:hidden">{item.labelShort}</span>
          </div>
        ))}
      </div>
    </Background>
  );
}
