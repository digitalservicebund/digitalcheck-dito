import type { Prinzip } from "@/content.config";
import { contact } from "@/resources/content/shared/contact";
import { $pruefbereich, wizardStores } from "@/wizard/stores";
import { useStore } from "@nanostores/react";
import WordDownloadButton from "./_WordDownloadButton";

/** What to do with the finished Dokumentation, depending on Prüfbereich and EU-Bezug */
export default function Abschliessen({
  prinzipien,
}: Readonly<{
  /** For the Word file, see WordDownloadButton */
  prinzipien: Prinzip[];
}>) {
  // Rendered client-only (no HTML from the build), so the stored data is known
  const data = useStore(wizardStores.dokumentation.$data);
  // Without a stored Prüfbereich, the Bund is assumed (as in the breadcrumb)
  const isBund = (useStore($pruefbereich) ?? "Bund") === "Bund";
  // The EU steps only apply with EU-Bezug, see dokumentationFlow
  const hasEuBezug = data["eu-interoperabilitaet-bezug"] === "yes";

  const steps = [
    {
      heading: "Dokumentation herunterladen",
      content: (
        <>
          <p>
            {isBund
              ? "Laden Sie die ausgefüllte Dokumentation als Word-Datei herunter. Sie können diese vorab intern abstimmen und anschließend an den NKR weiterleiten."
              : "Laden Sie die ausgefüllte Dokumentation als Word-Datei herunter, um sie zu verakten."}
          </p>
          <div className="pt-16">
            <WordDownloadButton
              prinzipien={prinzipien}
              label="Word-Datei herunterladen (.docx)"
              look="primary"
            />
          </div>
        </>
      ),
    },
    // The NKR only checks Regelungsvorhaben of the Bund
    isBund && {
      heading: "Fertige Dokumentation an den NKR senden",
      content: (
        <ul>
          <li>
            Senden Sie die finale Dokumentation{" "}
            <strong>als PDF per E-Mail</strong> an{" "}
            <a href={`mailto:${contact.nkrEmail}`}>{contact.nkrEmail}</a>.
          </li>
          <li>
            <strong>Visualisierungen</strong> können Sie als separate Anlage (z.
            B. als PDF oder Bilddatei) beifügen.
          </li>
          <li>
            Der NKR prüft Ihren Entwurf auf Digital- und Praxistauglichkeit und
            kommt bei Rückfragen direkt auf Sie zu.
          </li>
        </ul>
      ),
    },
    hasEuBezug && {
      heading: "An die Nationale Kontaktstelle senden",
      content: (
        <ul>
          <li>
            Senden Sie die ausgefüllte Dokumentation{" "}
            <strong>als PDF per E-Mail</strong> an{" "}
            <a href={`mailto:${contact.interoperabilityEmail}`}>
              {contact.interoperabilityEmail}
            </a>
            .
          </li>
          <li>
            Die Interoperabilitätsbewertung wird auf dem Portal {"„"}
            <a
              href="https://interoperable-europe.ec.europa.eu/collection/assessments"
              target="_blank"
              rel="noreferrer"
            >
              Interoperable Europe
            </a>
            {"“"} publiziert, sobald Ihr Referentenentwurf veröffentlicht wurde.
            Sollte dies noch nicht der Fall sein, meldet sich die Nationale
            Kontaktstelle zum angegebenen Zeitpunkt bei Ihnen.
          </li>
        </ul>
      ),
    },
  ].filter((step) => step !== false);

  return (
    <div className="space-y-48 sm:space-y-64">
      <div className="space-y-16">
        <h1 className="kern-heading-medium">Dokumentation abschließen</h1>
      </div>
      <div className="space-y-32">
        {steps.map(({ heading, content }, index) => (
          <section
            key={heading}
            className="bg-kern-darkblue-025 space-y-16 rounded-sm px-16 py-32 sm:px-64"
          >
            {/* A single step isn't numbered */}
            {steps.length > 1 && (
              <p className="kern-preline">Schritt {index + 1}</p>
            )}
            <h2 className="kern-heading-small">{heading}</h2>
            {content}
          </section>
        ))}
        <div className="kern-alert kern-alert--success max-w-736">
          <div className="kern-alert__header">
            <span className="kern-icon kern-icon--success" aria-hidden="true" />
            <h2 className="kern-title">
              {hasEuBezug
                ? "Damit haben Sie den Digitalcheck und die Interoperabilitätsbewertung erfolgreich abgeschlossen."
                : "Damit haben Sie den Digitalcheck erfolgreich abgeschlossen."}
            </h2>
          </div>
          <div className="kern-alert__body">
            <p className="kern-body">Sie können diese Seite jetzt schließen.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
