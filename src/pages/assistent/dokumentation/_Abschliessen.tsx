import type { Prinzip } from "@/content.config";
import { contact } from "@/resources/content/shared/contact";
import { $pruefbereich, wizardStores } from "@/wizard/stores";
import { useStore } from "@nanostores/react";
import WordDownloadButton from "./_WordDownloadButton";

/** What to do with the finished Dokumentation, depending on Prüfbereich and EU-Bezug */
export default function Abschliessen({
  prinzipien,
}: {
  /** For the Word file, see WordDownloadButton */
  prinzipien: Prinzip[];
}) {
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
            Laden Sie die ausgefüllte Dokumentation herunter, um sie zu verakten
            {isBund && " und an den NKR zu senden"}.
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
            Senden Sie die Dokumentation <strong>als PDF per E-Mail</strong> an
            folgende Adresse:{" "}
            <a href={`mailto:${contact.nkrEmail}`}>{contact.nkrEmail}</a>. Der
            NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei
            Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine digital- und
            praxistaugliche Umsetzung.
          </li>
          <li>
            Der NKR empfiehlt, <strong>Visualisierungen</strong> und Skizzen als
            ergänzende Dokumente beizufügen – formlos als PDF oder Screenshot.
          </li>
        </ul>
      ),
    },
    hasEuBezug && {
      heading: "An die Nationale Kontaktstelle senden",
      content: (
        <ul>
          <li>
            Schicken Sie die ausgefüllte Dokumentation an die{" "}
            <strong>Nationale Kontaktstelle</strong>. Die
            Interoperabilitäts-Bewertung wird auf dem Portal{" "}
            <a
              href="https://interoperable-europe.ec.europa.eu/collection/assessments"
              target="_blank"
              rel="noreferrer"
            >
              „Interoperable Europe“
            </a>{" "}
            veröffentlicht, sofern der Referentenentwurf bereits öffentlich ist.
            Falls die Veröffentlichung noch aussteht, wird sich die Nationale
            Kontaktstelle zum von Ihnen angegebenen Zeitpunkt bei Ihnen melden.
          </li>
          <li>
            <strong>E-Mail der nationalen Kontaktstelle</strong>:{" "}
            <a href={`mailto:${contact.interoperabilityEmail}`}>
              {contact.interoperabilityEmail}
            </a>
          </li>
        </ul>
      ),
    },
  ].filter((step) => step !== false);

  return (
    <div className="space-y-48 sm:space-y-64">
      <div className="space-y-16">
        <h1 className="kern-heading-large">Dokumentation abschließen</h1>
        {isBund && (
          <p>
            Laden Sie die ausgefüllte Dokumentation herunter und leiten Sie
            diese an den NKR weiter. Optional können Sie das Dokument vorab zur
            Abstimmung versenden.
          </p>
        )}
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
            <h2 className="kern-heading-medium">{heading}</h2>
            {content}
          </section>
        ))}
        <div className="kern-alert kern-alert--success max-w-736">
          <div className="kern-alert__header">
            <span className="kern-icon kern-icon--success" aria-hidden="true" />
            <h2 className="kern-title">
              {/* The design mentions the Bewertung only for the Bund */}
              {isBund && hasEuBezug
                ? "Damit ist der Digitalcheck und die Interoperabilitäts-Bewertung für Sie beendet."
                : "Damit ist der Digitalcheck für Sie beendet."}
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
