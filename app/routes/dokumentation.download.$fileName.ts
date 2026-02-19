import { contentType } from "mime-types";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { FederalState } from "~/contexts/FederalStateContext";
import { DATA_SCHEMA_VERSION } from "~/routes/dokumentation/documentationDataService";
import {
  createDoc,
  getTemplateFileName,
} from "~/service/wordDocumentationExport/wordDocumentation";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_ASPECTS_QUERY,
  PrinzipWithAspekte,
} from "~/utils/strapiData.server";
import type { Route } from "./+types/dokumentation.download.$fileName";

// This is a route instead of client side to support clients without JS
export async function loader({ params, request }: Route.LoaderArgs) {
  const { fileName } = params;

  if (!fileName) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Please provide a file name", { status: 400 });
  }

  // Get federal state from query parameter (defaults to "bund")
  const url = new URL(request.url);
  const federalState = (url.searchParams.get("state") || "bund") as FederalState;

  const principles = await fetchStrapiData<{
    prinzips: PrinzipWithAspekte[];
  }>(GET_PRINZIPS_WITH_ASPECTS_QUERY);
  if ("error" in principles) {
    throw new Error(principles.error);
  }

  const templateFileName = getTemplateFileName(federalState);
  const templatePath = path.join("public", "documents", templateFileName);
  const templateData = await fs.readFile(templatePath);

  const fileData = await createDoc(
    templateData,
    { version: DATA_SCHEMA_VERSION },
    principles.prinzips,
    federalState,
  );
  const mimeType = contentType(fileName) || "";

  return new Response(fileData, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": `${fileData.size}`,
    },
  });
}
