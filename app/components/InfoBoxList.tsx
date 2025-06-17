import { createContext, memo, ReactNode, useContext } from "react";
import twMerge from "~/utils/tailwindMerge";
import InfoBox, { InfoBoxProps } from "./InfoBox";

type InfoBoxListProps = {
  children: ReactNode;
  separator?: boolean;
};

const InfoBoxListContext = createContext<{ separator?: boolean }>({
  separator: false,
});

const useInfoBoxListContext = () => useContext(InfoBoxListContext);

function InfoBoxListItem(infoBoxProps: InfoBoxProps) {
  const { separator } = useInfoBoxListContext();

  return (
    <li
      className={
        separator
          ? "border-0 border-b-2 border-solid border-gray-400 pb-40 last:border-none last:pb-0"
          : ""
      }
    >
      <InfoBox {...infoBoxProps} />
    </li>
  );
}

function InfoBoxListWrapper({ children }: Readonly<{ children: ReactNode }>) {
  const { separator } = useInfoBoxListContext();

  return (
    <ul
      className={twMerge(
        "list-unstyled info-box ds-stack mt-32",
        separator ? "ds-stack-32" : "ds-stack-48",
      )}
    >
      {children}
    </ul>
  );
}

function InfoBoxList({ children, separator }: Readonly<InfoBoxListProps>) {
  return (
    <InfoBoxListContext.Provider value={{ separator }}>
      <section className="ds-stack ds-stack-8">{children}</section>
    </InfoBoxListContext.Provider>
  );
}

InfoBoxList.List = memo(InfoBoxListWrapper);
InfoBoxList.Item = memo(InfoBoxListItem);

export default InfoBoxList;
