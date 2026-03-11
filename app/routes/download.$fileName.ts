import { contentType } from "mime-types";
import { promises as fs } from "node:fs";
import path from "node:path";
import trackCustomEvent from "~/utils/trackCustomEvent.server";
import type { Route } from "./+types/download.$fileName";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { fileName } = params;

  if (!fileName) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Please provide a file name", { status: 400 });
  }

  try {
    const filePath = path.join("public", "documents", fileName);
    const fileData = await fs.readFile(filePath);
    const mimeType = contentType(fileName) || "";

    void trackCustomEvent(request, { name: "Download", props: { fileName } });
    return new Response(new Uint8Array(fileData).buffer, {
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
