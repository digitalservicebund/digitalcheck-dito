import InfoBox, { InfoBoxProps } from "~/components/InfoBox.tsx";

export type MethodCardProps = {
  image?: React.ReactNode;
  infoBox?: React.ReactNode;
};

export default function MethodCard({
  image,
  infoBox,
}: Readonly<MethodCardProps>) {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="bg-blue-300 px-20 pt-40 sm:px-96 sm:pt-44">
        <div className="&_img:object-cover &_img:object-top h-0 overflow-hidden pb-[40%] shadow-2xl">
          {image}
        </div>
      </div>
      {infoBox}
    </div>
  );
}

const MethodCardInfoBox = (props: InfoBoxProps) => (
  <InfoBox
    {...props}
    className="bg-blue-100 px-16 py-24 sm:px-80 sm:pt-40 sm:pb-48"
  />
);

MethodCard.InfoBox = MethodCardInfoBox;
