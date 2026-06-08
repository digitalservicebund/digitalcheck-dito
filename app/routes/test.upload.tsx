import fs from "node:fs";
import path from "node:path";
import type { ActionFunctionArgs } from "react-router";
import { Form, useActionData } from "react-router";
import Button from "~/components/Button.tsx";
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

Laden Sie die eben heruntergeladenen Dateien hier wieder hoch, um den Upload zu testen:
`;

export default function UploadTest() {
  const actionData = useActionData<typeof action>();

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

            <Form
              method="post"
              encType="multipart/form-data"
              className="space-y-32"
            >
              <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
                {testFiles.map((file) => (
                  <div
                    key={file.path}
                    className="rounded-8 space-y-16 border border-gray-400 p-24"
                  >
                    <label
                      htmlFor={file.path}
                      className="ds-label-01-bold block"
                    >
                      {file.name} hochladen
                    </label>
                    <input
                      type="file"
                      id={file.path}
                      name={file.path}
                      className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                    />
                    {actionData?.[file.path] && (
                      <div className="mt-8 space-y-4">
                        <p className="flex items-center gap-8">
                          {actionData[file.path].sizeMatch ? "✅" : "❌"} Größe
                          stimmt überein
                        </p>
                        <p className="flex items-center gap-8">
                          {actionData[file.path].contentMatch ? "✅" : "❌"}{" "}
                          Inhalt stimmt überein
                        </p>
                        {actionData[file.path].error && (
                          <p className="text-sm text-red-600">
                            {actionData[file.path].error}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button type="submit">Dateien prüfen</Button>
            </Form>
          </section>
        </Container>
      </main>
    </>
  );
}
