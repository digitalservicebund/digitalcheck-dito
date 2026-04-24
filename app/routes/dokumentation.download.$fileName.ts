import { contentType } from "mime-types";
import { promises as fs } from "node:fs";
import path from "node:path";

import {
  createDoc as createDocV1,
  FILE_NAME_DOCUMENTATION_TEMPLATE as FILE_NAME_DOCUMENTATION_TEMPLATE_V1,
} from "~/service/wordDocumentationExport/wordDocumentationV1";
import {
  createDoc as createDocV2,
  FILE_NAME_DOCUMENTATION_TEMPLATE as FILE_NAME_DOCUMENTATION_TEMPLATE_V2,
} from "~/service/wordDocumentationExport/wordDocumentationV2";

import { features } from "~/utils/featureFlags";
import getFeatureFlag from "~/utils/featureFlags.server";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_ASPECTS_QUERY,
} from "~/utils/strapiData.server";
import type { PrinzipWithAspekte } from "~/utils/strapiData.types";
import type { Route } from "./+types/dokumentation.download.$fileName";
import { DATA_SCHEMA_VERSION_V1 } from "./dokumentation/documentationDataSchema";

// This is a route instead of client side to support clients without JS
export async function loader({ params }: Route.LoaderArgs) {
  const { fileName } = params;

  if (!fileName) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Please provide a file name", { status: 400 });
  }

  const simplifiedFlow = getFeatureFlag(features.simplifiedPrincipleFlow);

  const FILE_NAME_DOCUMENTATION_TEMPLATE = simplifiedFlow
    ? FILE_NAME_DOCUMENTATION_TEMPLATE_V2
    : FILE_NAME_DOCUMENTATION_TEMPLATE_V1;
  const createDoc = simplifiedFlow ? createDocV2 : createDocV1;

  const principles = await fetchStrapiData<{
    prinzips: PrinzipWithAspekte[];
  }>(GET_PRINZIPS_WITH_ASPECTS_QUERY);
  if ("error" in principles) {
    throw new Error(principles.error);
  }

  const templatePath = path.join(
    "public",
    "documents",
    FILE_NAME_DOCUMENTATION_TEMPLATE,
  );
  const templateData = await fs.readFile(templatePath);

  const fileData = await createDoc(
    templateData,
    { version: DATA_SCHEMA_VERSION_V1 },
    principles.prinzips,
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
