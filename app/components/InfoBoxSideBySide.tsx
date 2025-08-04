export default function InfoBoxSideBySide({
  children,
}: Readonly<{
  children: [React.ReactNode, React.ReactNode];
}>) {
  return <div className="flex flex-col gap-24 sm:flex-row">{children}</div>;
}
