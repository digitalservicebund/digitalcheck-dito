import { promises as fs } from "fs";
import { contentType } from "mime-types";
import path from "path";
import trackCustomEvent from "~/utils/trackCustomEvent.server";
import type { Route } from "./+types/download.$fileName";

export async function loader({ params, request }: Route.LoaderArgs) {
  let { fileName } = params;

  if (!fileName) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Please provide a file name", { status: 400 });
  }

  // NOTE: 70-tage replace pdf with word document
  /**
   * Used for external links to the old pdf document
   */
  if (fileName === "digitalcheck-begleitende-dokumentation.pdf") {
    fileName = "Dokumentieren-der-Digitaltauglichkeit_V1-5.docx";
  }

  try {
    const filePath = path.join("public", "documents", fileName);
    const fileData = await fs.readFile(filePath);
    const mimeType = contentType(fileName) || "";

    void trackCustomEvent(request, { name: `Download`, props: { fileName } });
    return new Response(fileData, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": `${fileData.byteLength}`,
      },
    });
  } catch {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("File not found", { status: 404 });
  }
}
