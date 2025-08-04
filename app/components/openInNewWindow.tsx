import OpenInNewIcon from "@digitalservicebund/icons/OpenInNew";
import { renderToString } from "react-dom/server";

export const openInNewIconElement = (
  <OpenInNewIcon height="1.2em" width="1.2em" className="ml-2 fill-current" />
);

export const openInNewIconString = renderToString(openInNewIconElement);
