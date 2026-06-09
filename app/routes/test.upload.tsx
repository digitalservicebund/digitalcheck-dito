import fs from "node:fs";
import path from "node:path";
import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ActionFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import Alert from "~/components/Alert.tsx";
import Button from "~/components/Button.tsx";
import Container from "~/components/Container.tsx";
import Hero from "~/components/Hero.tsx";
import MetaTitle from "~/components/Meta.tsx";

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
                      error: "Kann nicht hochgeladen werden",
                    }
                  : undefined,
              );
              setCannotUpload((value) => !value);
            }}
          />
          <span>Die Datei kann nicht hochgeladen werden.</span>
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
      results,
    };
    console.log(payload);

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
          subtitle="Bitte geben Sie uns Feedback, ob Sie Anhänge (z. B. Visualisierungen) über Ihren Browser hochladen können.
          Laden Sie in jedem Schritt die Datei herunter und anschließend direkt wieder hoch. Sie können die Datei per Drag-and-Drop ablegen; der Upload startet sofort."
        />
        <Container className="mb-80 space-y-40">
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
            <p className="ds-body-02-reg text-gray-700">
              Diese Angabe wird zusammen mit den Dateiergebnissen an das
              Digitalcheck-Team übermittelt.
            </p>
          </div>

          <Button type={"button"} onClick={submitFeedback}>
            Ergebnis übermitteln
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
