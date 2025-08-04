import InfoBox from "./InfoBox";

export default function InfoBoxSideBySide({
  children,
}: Readonly<{
  children: [
    React.ReactElement<typeof InfoBox>,
    React.ReactElement<typeof InfoBox>,
  ];
}>) {
  return <div className="flex flex-col gap-24 sm:flex-row">{children}</div>;
}
