export default function InfoBoxSideBySide({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 gap-x-24 gap-y-40 sm:grid-cols-2">
      {children}
    </div>
  );
}
