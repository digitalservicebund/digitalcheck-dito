import FileDownloadOutlined from "@digitalservicebund/icons/FileDownloadOutlined";
import { renderToString } from "react-dom/server";

export const downloadIconElement = (
  <FileDownloadOutlined
    height="1.5em"
    width="1.5em"
    className="ml-2 fill-current"
  />
);

export const dowloadIconString = renderToString(downloadIconElement);
