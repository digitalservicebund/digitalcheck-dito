import type { Prinzip } from "@/content.config";
import { wizardStores } from "@/wizard/stores";

type Props = {
  /** Content of the Prinzipien, passed from the page as islands can't read collections */
  prinzipien: Prinzip[];
  label: string;
  look: "primary" | "secondary" | "tertiary";
  /** Without the stored answers, to fill in the Word file instead */
  templateOnly?: boolean;
};

/** Downloads the Dokumentation as Word file */
export default function WordDownloadButton({
  prinzipien,
  label,
  look,
  templateOnly = false,
}: Props) {
  const download = async () => {
    // Loaded on click, as docx is large
    const [{ downloadWordDocumentation }, { toDocumentationData }] =
      await Promise.all([
        import("@/service/wordDocumentationExport/wordDocumentation"),
        import("@/service/wordDocumentationExport/fromDokumentationWizard"),
      ]);
    await downloadWordDocumentation(
      toDocumentationData(wizardStores.dokumentation.$data.get(), prinzipien),
      prinzipien,
      { templateOnly },
    );
  };

  return (
    <button
      type="button"
      className={`kern-btn kern-btn--${look}`}
      onClick={() => void download()}
    >
      <span className="kern-icon kern-icon--download" aria-hidden="true" />
      <span className="kern-label">{label}</span>
    </button>
  );
}
