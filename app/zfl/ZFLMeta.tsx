import { ZFL_TITLE } from "./constants";

export default function MetaTitle({
  prefix,
}: Readonly<{
  prefix?: string;
}>) {
  const title = prefix ? `${prefix} — ${ZFL_TITLE}` : ZFL_TITLE;

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
    </>
  );
}
