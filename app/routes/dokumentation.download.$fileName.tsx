import { contentType } from "mime-types";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  createDoc,
  FILE_NAME_DOCUMENTATION_TEMPLATE,
} from "~/service/wordDocumentationExport/wordDocumentation";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_ASPECTS_QUERY,
  PrinzipWithAspekte,
} from "~/utils/strapiData.server";
import type { Route } from "./+types/dokumentation.download.$fileName";

export async function loader({ params }: Route.LoaderArgs) {
  const { fileName } = params;

  if (!fileName) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Please provide a file name", { status: 400 });
  }

  console.log("fileName", fileName);

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

  const fileData = await createDoc(templateData, principles.prinzips, true);
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
