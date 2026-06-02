import { Outlet } from "react-router";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
} from "~/utils/strapiData.server.ts";
import type {
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.types";
import { DocumentationDataProvider } from "./DocumentationDataProvider";

export const handle = {
  hasProgressBar: true,
};

export type DocumentationRouteData = {
  prinzips: PrinzipWithAspekte[];
};

export const loader: () => Promise<DocumentationRouteData> = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekteAndExample[];
  }>(GET_PRINZIPS_WITH_EXAMPLES_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  const { prinzips } = prinzipData;

  return { prinzips };
};

export default function Documentation() {
  return (
    <DocumentationDataProvider>
      <Outlet />
    </DocumentationDataProvider>
  );
}
