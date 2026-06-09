import fs from "node:fs";
import path from "node:path";
import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ActionFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import { twJoin } from "tailwind-merge";
import Alert from "~/components/Alert.tsx";
import Button from "~/components/Button.tsx";
import Container from "~/components/Container.tsx";
import Hero from "~/components/Hero.tsx";
import MetaTitle from "~/components/Meta.tsx";
import { dedent } from "~/utils/dedentMultilineStrings.ts";

const testFiles = [
  { name: "PNG-Bilddatei", path: "/images/beispielflussdiagram.png" },
  {
    name: "JPG-Bilddatei",
    path: "/images/ablaufdiagramm-v3-deutsch.jpg",
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
  { name: "CSV-Datei", path: "/documents/upload-test.csv" },
];

type UploadResult = { contentMatch: boolean; error?: string };

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const results: Record<string, UploadResult> = {};

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
          contentMatch: false,
          error: "Referenzdatei nicht gefunden",
        };
        continue;
      }

      const referenceFileContent = fs.readFileSync(diskPath);
      const uploadedFileContent = Buffer.from(await uploadedFile.arrayBuffer());

      const contentMatch = uploadedFileContent.equals(referenceFileContent);

      results[fileInfo.path] = { contentMatch };
    } catch (error) {
      console.error(error);
      results[fileInfo.path] = {
        contentMatch: false,
        error: "Fehler beim Vergleich",
      };
    }
  }

  return results;
}

function UploadDropzoneCard({
  file,
  onComplete,
}: Readonly<{
  file: (typeof testFiles)[number];
  onComplete: (result: UploadResult | undefined) => void;
}>) {
  const fetcher = useFetcher<typeof action>();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [cannotUpload, setCannotUpload] = useState(false);
  const notifiedRef = useRef(false);

  const submitFile = (uploadedFile: File | null) => {
    if (!uploadedFile) {
      return;
    }

    const formData = new FormData();
    formData.set(file.path, uploadedFile);
    setSelectedFileName(uploadedFile.name);
    notifiedRef.current = false; // Reset notification flag for new upload
    void fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  const fileResult = fetcher.data?.[file.path];

  useEffect(() => {
    if (fileResult && !notifiedRef.current) {
      notifiedRef.current = true;
      onComplete(fileResult);
    }
  }, [fileResult, onComplete]);

  return (
    <div className="rounded-8 max-w-a11y space-y-16 border border-gray-400 p-24">
      <p className="ds-label-01-bold block">{file.name} hochladen</p>
      <label
        htmlFor={file.path}
        className={twJoin(
          "rounded-8 block cursor-pointer border-2 border-dashed p-24 text-center transition-colors",
          isDragOver
            ? "border-blue-700 bg-blue-100"
            : "border-gray-500 bg-gray-50 hover:bg-gray-100",
          cannotUpload && "cursor-not-allowed bg-gray-100",
        )}
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
      {!fileResult && (
        <label className="ds-label-01-reg flex flex-row items-center gap-16">
          <input
            type="checkbox"
            className="ds-checkbox"
            checked={cannotUpload}
            onChange={(event) => {
              const checked = event.target.checked;
              onComplete(
                checked
                  ? {
                      contentMatch: false,
                      error: "Konnte nicht hochgeladen werden",
                    }
                  : undefined,
              );
              setCannotUpload((value) => !value);
            }}
          />
          <span>Die Datei konnte nicht hochgeladen werden.</span>
        </label>
      )}
      {fileResult && (
        <div className="mt-8 space-y-4">
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
  const [results, setResults] = useState(
    {} as Record<string, UploadResult | undefined>,
  );
  const [captureResult, setCaptureResult] = useState("");
  const posthog = usePostHog();

  const [organization, setOrganization] = useState("");
  const [system, setSystem] = useState("");
  const [comment, setComment] = useState("");

  const handleComplete = useCallback(
    (fileName: string, result?: UploadResult) => {
      setResults((results) => ({
        ...results,
        [fileName]: result,
      }));
    },
    [],
  );

  const submitFeedback = useCallback(() => {
    const payload = {
      organization,
      system,
      comment,
      results,
    };

    const captureResult = posthog?.capture(
      "upload_test_feedback_submitted",
      payload,
    );
    setCaptureResult(captureResult === undefined ? "failure" : "success");
  }, [organization, posthog, results]);

  return (
    <>
      <MetaTitle prefix="Upload-Test" />
      <main>
        <Hero
          title={"Upload-Test"}
          subtitle={dedent`
          Das Digitalcheck-Team testet aktuell, ob Anhänge wie Visualisierungen über den Browser hochgeladen werden können – über die Systeme verschiedener Ressorts.

          **Gehen Sie so vor:**
          1. Laden Sie die Datei herunter.
          2. Laden Sie dieselbe Datei direkt wieder hoch.
          3. Wiederholen Sie dies für jeden Dateityp.
          
          Vielen Dank für Ihre Unterstützung!`}
        />
        <Container className="mb-80 space-y-40">
          <div className="max-w-a11y space-y-8">
            <label
              htmlFor="sender-organization"
              className="ds-label-01-reg block"
            >
              Ministerium
            </label>
            <input
              id="sender-organization"
              name="organization"
              type="text"
              className="ds-input"
              value={organization}
              onChange={(event) => setOrganization(event.currentTarget.value)}
            />
          </div>
          <div className="max-w-a11y space-y-8">
            <label htmlFor="sender-system" className="ds-label-01-reg block">
              System (z. B. SINA)
            </label>
            <input
              id="sender-system"
              name="system"
              type="text"
              className="ds-input"
              value={system}
              onChange={(event) => setSystem(event.currentTarget.value)}
            />
          </div>
          {testFiles.map((file) => (
            <section key={file.path} className="space-y-24">
              <h2>{file.name}</h2>
              <a className="text-link block" href={file.path} download>
                {file.name} herunterladen
              </a>
              <UploadDropzoneCard
                file={file}
                onComplete={(result) => handleComplete(file.name, result)}
              />
            </section>
          ))}

          <label className="ds-label-01-reg block">
            <span>Weitere Kommentare (optional)</span>
            <textarea
              className={"ds-textarea max-w-a11y"}
              rows={6}
              value={comment}
              onChange={(event) => setComment(event.currentTarget.value)}
            />
          </label>

          <Button type={"button"} onClick={submitFeedback}>
            Ergebnis absenden
          </Button>
          {captureResult === "failure" && (
            <Alert
              title="Ergebnis konnte nicht übermittelt werden"
              content="Beim Übermitteln des Feedbacks ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schicken Sie uns das Ergebnis per E-Mail."
              tagName="h2"
              look="error"
              setShowAlert={() => setCaptureResult("")}
            />
          )}
          {captureResult === "success" && (
            <Alert
              title="Ergebnis erfolgreich übermittelt"
              content="Vielen Dank!"
              tagName="h2"
              look="success"
              setShowAlert={() => setCaptureResult("")}
            />
          )}
        </Container>
      </main>
    </>
  );
}
