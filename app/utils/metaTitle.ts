import type { MetaDescriptor } from "react-router";
import { siteMeta } from "~/resources/content/shared/meta";

export default function constructMetaTitle(
  prefix: string | undefined,
): MetaDescriptor[] {
  const title = prefix ? `${prefix} — ${siteMeta.title}` : siteMeta.title;

  return [
    { title },
    {
      name: "title",
      content: title,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "twitter:title",
      content: title,
    },
  ];
}
