import fs from "node:fs";
import path from "node:path";
import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ActionFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import { twJoin } from "tailwind-merge";
import Alert from "~/components/Alert.tsx";
import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer.tsx";
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

type UploadResult = {
  contentMatch?: boolean;
  didUpload?: boolean;
  error?: string;
  userCannotUpload?: boolean;
};

const localStorageLabel = "upload-test-feedback";

type SavedUploadTestState = {
  organization: string;
  system: string;
  comment: string;
  results: Record<string, UploadResult | undefined>;
};

function loadFromStorage(): SavedUploadTestState {
  const defaults: SavedUploadTestState = {
    organization: "",
    system: "",
    comment: "",
    results: {},
  };
  if (globalThis.window === undefined) return defaults;
  try {
    const saved = localStorage.getItem(localStorageLabel);
    if (!saved) return defaults;
    const parsed = JSON.parse(saved) as Partial<SavedUploadTestState>;
    return {
      organization:
        typeof parsed.organization === "string" ? parsed.organization : "",
      system: typeof parsed.system === "string" ? parsed.system : "",
      comment: typeof parsed.comment === "string" ? parsed.comment : "",
      results:
        parsed.results && typeof parsed.results === "object"
          ? parsed.results
          : {},
    };
  } catch {
    return defaults;
  }
}

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
  status,
  onComplete,
}: Readonly<{
  file: (typeof testFiles)[number];
  status: UploadResult;
  onComplete: (result: UploadResult | undefined) => void;
}>) {
  const fetcher = useFetcher<typeof action>();
  const fetchResult = fetcher.data?.[file.path];
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const notifiedRef = useRef<UploadResult | undefined>(undefined);
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

  useEffect(() => {
    if (fetchResult && notifiedRef.current !== fetchResult) {
      notifiedRef.current = fetchResult;
      onComplete({ ...fetchResult, didUpload: true });
    }
  }, [fetchResult, onComplete]);

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
          status.userCannotUpload && "cursor-not-allowed bg-gray-100",
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

      {status.didUpload ? (
        <div className="mt-8 space-y-4">
          <p className="flex items-center gap-8">
            {status.contentMatch
              ? "✅ Inhalt stimmt überein"
              : "❌ Inhalt stimmt nicht überein"}
          </p>
          {status.error && (
            <p className="text-sm text-red-600">{status.error}</p>
          )}
        </div>
      ) : (
        <label className="ds-label-01-reg flex flex-row items-center gap-16">
          <input
            type="checkbox"
            className="ds-checkbox"
            checked={status.userCannotUpload}
            onChange={(event) => {
              const checked = event.target.checked;
              onComplete(
                checked
                  ? {
                      error: "Konnte nicht hochgeladen werden",
                      userCannotUpload: true,
                    }
                  : undefined,
              );
            }}
          />
          <span>Die Datei konnte nicht hochgeladen werden.</span>
        </label>
      )}
    </div>
  );
}

export default function UploadTest() {
  const savedUploadTestState = loadFromStorage();
  const [results, setResults] = useState<
    Record<string, UploadResult | undefined>
  >(savedUploadTestState.results);
  const [captureResult, setCaptureResult] = useState("");
  const posthog = usePostHog();

  const [organization, setOrganization] = useState(
    savedUploadTestState.organization,
  );
  const [system, setSystem] = useState(savedUploadTestState.system);
  const [comment, setComment] = useState(savedUploadTestState.comment);

  const handleComplete = useCallback(
    (fileName: string, result?: UploadResult) => {
      setResults((results) => ({
        ...results,
        [fileName]: result,
      }));
    },
    [],
  );

  useEffect(() => {
    const valuesToStore: SavedUploadTestState = {
      organization,
      system,
      comment,
      results,
    };
    localStorage.setItem(localStorageLabel, JSON.stringify(valuesToStore));
  }, [comment, organization, results, system]);

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
  }, [comment, organization, posthog, results, system]);

  const clearSavedValues = useCallback(() => {
    localStorage.removeItem(localStorageLabel);
    setOrganization("");
    setSystem("");
    setComment("");
    setResults({});
    setCaptureResult("");
  }, []);

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
                status={results[file.name] ?? { didUpload: false }}
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

          <ButtonContainer>
            <Button type={"button"} onClick={submitFeedback}>
              Ergebnis absenden
            </Button>
            <Button type="button" look="link" onClick={clearSavedValues}>
              Gespeicherte Werte entfernen
            </Button>
          </ButtonContainer>
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
