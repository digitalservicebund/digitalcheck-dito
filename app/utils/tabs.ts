import { prettySlugify } from "~/utils/utilFunctions";

export const tabSearchParam = "tab";

export const getTabAnchorLink = (tab: string, anchor?: string) =>
  anchor ? `?${tabSearchParam}=${tab}#${anchor}` : `?${tabSearchParam}=${tab}`;

export const getTabAnchorLinkFromLabel = (label: string, anchor?: string) => {
  const tabSlug = prettySlugify(label); // as used in Tabs.astro
  return getTabAnchorLink(tabSlug, anchor);
};
