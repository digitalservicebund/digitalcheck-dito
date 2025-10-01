import { siteMeta } from "~/resources/content/shared/meta";

export default function MetaTitle({
  prefix,
}: Readonly<{
  prefix?: string;
}>) {
  const title = prefix
    ? `${prefix} — ${siteMeta.title}`
    : siteMeta.titleWithTagline;

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
    </>
  );
}
