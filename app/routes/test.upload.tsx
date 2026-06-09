import fs from "node:fs";
import path from "node:path";
import { useState } from "react";
import type { ActionFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import Container from "~/components/Container.tsx";
import Hero from "~/components/Hero.tsx";
import MetaTitle from "~/components/Meta.tsx";
import RichText from "~/components/RichText.tsx";

const testFiles = [
  { name: "PNG-Bilddatei", path: "/images/beispielflussdiagram.png" },
  {
    name: "JPG-Bilddatei",
    path: "/public/images/ablaufdiagramm-v3-deutsch.jpg",
  },
  {
    name: "Word-Datei",
    path: "/documents/interview-leitfaden/Ablaufplan_Interviewführung.docx",
  },
  {
    name: "PowerPoint-Datei",
    path: "/documents/interview-leitfaden/Akteurlandschaft_Analyse.pptx",
  },
  { name: "JSON-Datei", path: "/documents/upload-test.json" },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const results: Record<
    string,
    { sizeMatch: boolean; contentMatch: boolean; error?: string }
  > = {};

  for (const fileInfo of testFiles) {
    const uploadedFile = formData.get(fileInfo.path) as File | null;
    if (!uploadedFile || uploadedFile.size === 0) {
      continue;
    }

    try {
      const diskPath = path.join(
        process.cwd(),
        "public",
        fileInfo.path.replace(/^\/public/, ""),
      );

      if (!fs.existsSync(diskPath)) {
        results[fileInfo.path] = {
          sizeMatch: false,
          contentMatch: false,
          error: "Referenzdatei nicht gefunden",
        };
        continue;
      }

      const referenceFileContent = fs.readFileSync(diskPath);
      const uploadedFileContent = Buffer.from(await uploadedFile.arrayBuffer());

      const sizeMatch = uploadedFile.size === referenceFileContent.length;
      const contentMatch = uploadedFileContent.equals(referenceFileContent);

      results[fileInfo.path] = { sizeMatch, contentMatch };
    } catch (error) {
      console.error(error);
      results[fileInfo.path] = {
        sizeMatch: false,
        contentMatch: false,
        error: "Fehler beim Vergleich",
      };
    }
  }

  return results;
}

const filesMarkdown = testFiles
  .map(
    (file) =>
      `1. <a class="external-link" href="${file.path}" download>${file.name}</a>`,
  )
  .join("\n");

const step1 = `
## 1. Schritt

Laden Sie die folgenden Dateien herunter:
${filesMarkdown}
`;

const step2 = `
## 2. Schritt

Laden Sie die eben heruntergeladenen Dateien hier wieder hoch, um den Upload zu testen. Sie können Dateien pro Feld per Drag-and-Drop ablegen. Der Upload startet sofort.
`;

function UploadDropzoneCard({
  file,
}: Readonly<{ file: (typeof testFiles)[number] }>) {
  const fetcher = useFetcher<typeof action>();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const submitFile = (uploadedFile: File | null) => {
    if (!uploadedFile) {
      return;
    }

    const formData = new FormData();
    formData.set(file.path, uploadedFile);
    setSelectedFileName(uploadedFile.name);
    void fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  const fileResult = fetcher.data?.[file.path];

  return (
    <div className="rounded-8 space-y-16 border border-gray-400 p-24">
      <p className="ds-label-01-bold block">{file.name} hochladen</p>
      <label
        htmlFor={file.path}
        className={`rounded-8 block cursor-pointer border-2 border-dashed p-24 text-center transition-colors ${
          isDragOver
            ? "border-blue-700 bg-blue-100"
            : "border-gray-500 bg-gray-50 hover:bg-gray-100"
        }`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragOver(false);
          submitFile(event.dataTransfer.files[0] ?? null);
        }}
      >
        <input
          type="file"
          id={file.path}
          name={file.path}
          className="sr-only"
          onChange={(event) =>
            submitFile(event.currentTarget.files?.[0] ?? null)
          }
        />
        <p className="ds-body-01-reg">
          Datei hier ablegen oder klicken, um auszuwählen
        </p>
        {selectedFileName && (
          <p className="ds-body-02-reg mt-8 text-gray-700">
            Ausgewählt: {selectedFileName}
          </p>
        )}
        {fetcher.state !== "idle" && (
          <p className="ds-body-02-reg mt-8 text-gray-700">Upload läuft...</p>
        )}
      </label>
      {fileResult && (
        <div className="mt-8 space-y-4">
          <p className="flex items-center gap-8">
            {fileResult.sizeMatch
              ? "✅ Größe stimmt überein"
              : "❌ Größe stimmt nicht überein"}
          </p>
          <p className="flex items-center gap-8">
            {fileResult.contentMatch
              ? "✅ Inhalt stimmt überein"
              : "❌ Inhalt stimmt nicht überein"}
          </p>
          {fileResult.error && (
            <p className="text-sm text-red-600">{fileResult.error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function UploadTest() {
  return (
    <>
      <MetaTitle prefix="Upload-Test" />
      <main>
        <Hero
          title={"Upload-Test"}
          subtitle="Geben Sie uns Feedback, ob Sie Anhänge (z. B. Visualisierungen) an die Dokumentation der Digitaltauglichkeit anhängen können."
        />
        <Container className="mb-80 space-y-40">
          <section>
            <RichText markdown={step1} />
          </section>

          <section className="space-y-24">
            <RichText markdown={step2} />
            <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
              {testFiles.map((file) => (
                <UploadDropzoneCard key={file.path} file={file} />
              ))}
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
