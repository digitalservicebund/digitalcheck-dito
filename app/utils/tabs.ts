export const tabSearchParam = "tab";
export const getTabAnchorLink = (tab: string, anchor?: string) =>
  anchor ? `?${tabSearchParam}=${tab}#${anchor}` : `?${tabSearchParam}=${tab}`;
