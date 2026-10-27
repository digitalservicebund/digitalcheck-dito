import { assistent_vorpruefung_datenaustausch } from "@/config/routes";
import { contact } from "@/resources/content/shared/contact";
import { mailto } from "@/utils/mailtoHelper";
import { wizardStores } from "@/wizard/stores";
import {
  answerLabels,
  getVorpruefungResult,
  questionNames,
  resultRows,
  type VorpruefungResult,
} from "@/wizard/vorpruefungResult";
import { useStore } from "@nanostores/react";
import { useId, useState, type ReactNode } from "react";
import ResultTable from "./_ResultTable";

type VorpruefungData = ReturnType<typeof wizardStores.vorpruefung.$data.get>;

/** A result without open questions, shown in "Ihr Ergebnis" */
type ClearResult = Exclude<VorpruefungResult, "contradiction" | "unsure">;

const meanings: Record<ClearResult, string> = {
  negative:
    "Das bedeutet, dass Sie nichts weiter unternehmen müssen. Der Digitalcheck ist für Sie beendet.",
  digital:
    "Das bedeutet, dass Sie weitere Schritte unternehmen müssen, um Digitaltauglichkeit in Ihrem Regelungsvorhaben sicherzustellen. Zur EU-Interoperabilität müssen Sie jedoch nichts weiter tun.",
  digitalAndInteroperability:
    "Das bedeutet, dass Sie weitere Schritte unternehmen müssen, um Digitaltauglichkeit und EU-Anforderungen an Interoperabilität in Ihrem Regelungsvorhaben sicherzustellen.",
};

// Completed by the subject, e.g. "Ihr Vorhaben" on the page, "Das Vorhaben" in the e-mail
const statements = (result: ClearResult) => {
  const hasDigitalbezug = result !== "negative";
  const hasInteroperability = result === "digitalAndInteroperability";
  return [
    {
      isMet: hasDigitalbezug,
      verb: "hat",
      object: hasDigitalbezug ? "einen Digitalbezug" : "keinen Digitalbezug",
    },
    {
      isMet: hasInteroperability,
      verb: "enthält",
      object: hasInteroperability
        ? "Anforderungen der Interoperabilität"
        : "keine eindeutigen Anforderungen der Interoperabilität",
    },
  ];
};

const emailBody = (result: ClearResult, data: VorpruefungData, title: string) =>
  [
    "Guten Tag,",
    "hiermit sende ich Ihnen das Ergebnis der Vorprüfung des Digitalchecks.",
    [
      title && `Vorhaben: ${title}`,
      `Vorprüfung für: ${data.pruefbereich ?? "Bund"}`,
    ]
      .filter(Boolean)
      .join("\n"),
    [
      "Ergebnis:",
      ...statements(result).map(
        ({ verb, object }) => `- Das Vorhaben ${verb} ${object}.`,
      ),
    ].join("\n"),
    [
      "So kommt das Ergebnis zustande:",
      ...questionNames.map((name) => {
        const answer = data[name];
        const { route, explanations } = resultRows[name];
        return answer
          ? `- ${route.title}: ${answerLabels[answer]} – ${explanations[answer]}`
          : `- ${route.title}: –`;
      }),
    ].join("\n"),
    "Mit freundlichen Grüßen",
  ].join("\n\n");

function SupportContact() {
  return (
    <>
      <a href={contact.phone}>{contact.phoneDisplay}</a> oder{" "}
      <a href={mailto(contact.email, "Supportanfrage: digitalcheck.bund.de")}>
        {contact.email}
      </a>
    </>
  );
}

function WarningAlert({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="kern-alert kern-alert--warning max-w-736">
      <div className="kern-alert__header">
        <span className="kern-icon kern-icon--warning" aria-hidden="true" />
        <h2 className="kern-title">{title}</h2>
      </div>
      <div className="kern-alert__body space-y-16">{children}</div>
    </div>
  );
}

function ResultAlert({ result }: { result: ClearResult }) {
  return (
    <div className="kern-alert kern-alert--info max-w-736">
      <div className="kern-alert__header">
        <h2 className="kern-title">Ihr Ergebnis</h2>
      </div>
      <div className="kern-alert__body space-y-16">
        <ul className="list-unstyled space-y-8">
          {statements(result).map(({ isMet, verb, object }) => (
            <li key={verb} className="kern-body flex items-center gap-8">
              <span
                className={`kern-icon bg-kern-feedback-info ${isMet ? "kern-icon--success" : "kern-icon--close"}`}
                aria-hidden="true"
              />
              <span>
                Ihr Vorhaben {verb} <b>{object}</b>.
              </span>
            </li>
          ))}
        </ul>
        <div>
          <p className="kern-body">
            <b>Was bedeutet das für Ihr Vorhaben?</b>
          </p>
          <p className="kern-body">{meanings[result]}</p>
        </div>
      </div>
    </div>
  );
}

/** Opens the user's e-mail program with the result, to be checked and sent by them */
function EmailForm({
  to,
  cc,
  body,
}: {
  to: string;
  cc?: string;
  body: (title: string) => string;
}) {
  const id = useId();
  const [title, setTitle] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const subject = title
    ? `Digitalcheck Vorprüfung: „${title}“`
    : "Digitalcheck Vorprüfung";

  return (
    <div className="space-y-32 pt-16">
      <div className="flex flex-wrap justify-between gap-32">
        <div className="space-y-32">
          <div className="kern-form-input">
            <label htmlFor={`${id}-title`} className="kern-label">
              Vorläufiger Arbeitstitel des Vorhabens
            </label>
            <input
              type="text"
              id={`${id}-title`}
              className="kern-form-input__input bg-white"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-16">
            <a
              href={mailto(to, subject, body(title), cc)}
              className="kern-btn kern-btn--primary link-unstyled"
            >
              <span
                className="kern-icon kern-icon--open-in-new"
                aria-hidden="true"
              />
              <span className="kern-label">E-Mail-Programm öffnen</span>
            </a>
            <button
              type="button"
              className="kern-btn kern-btn--tertiary"
              aria-expanded={isPreviewOpen}
              aria-controls={`${id}-preview`}
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
            >
              <span
                className={`kern-icon ${isPreviewOpen ? "kern-icon--arrow-up" : "kern-icon--arrow-down"}`}
                aria-hidden="true"
              />
              <span className="kern-label">E-Mail-Text vorab ansehen</span>
            </button>
          </div>
        </div>
        <div className="kern-body max-w-320 space-y-8">
          <p>
            <i>Empfänger</i>: {to}
          </p>
          {cc && (
            <>
              <p>
                <i>Kopie</i>: {cc}
              </p>
              <p className="text-kern-layout-text-muted">
                Die Kopie an das Digitalcheck-Team ist bei
                Interoperabilitätsbezug automatisch enthalten.
              </p>
            </>
          )}
        </div>
      </div>
      <p
        id={`${id}-preview`}
        hidden={!isPreviewOpen}
        className="kern-body rounded-sm bg-white p-16 whitespace-pre-line"
      >
        {body(title)}
      </p>
    </div>
  );
}

/** What to do with the result, depending on the Prüfbereich and the Interoperabilität */
function Steps({
  result,
  data,
  isBund,
}: {
  result: ClearResult;
  data: VorpruefungData;
  isBund: boolean;
}) {
  const hasInteroperability = result === "digitalAndInteroperability";
  const body = (title: string) => emailBody(result, data, title);
  const sendNote = (
    <p>
      Eine vorbereitete E-Mail wird geöffnet – Sie prüfen und senden selbst.
    </p>
  );

  const steps = [
    {
      heading: "Vorprüfungsergebnis herunterladen",
      content: (
        <>
          <p>Laden Sie Ihr Vorprüfungsergebnis herunter, um es zu verakten.</p>
          <div className="pt-16">
            {/* TODO: Generate the PDF, until then the print dialog can save one */}
            <button
              type="button"
              className="kern-btn kern-btn--primary"
              onClick={() => globalThis.print()}
            >
              <span
                className="kern-icon kern-icon--download"
                aria-hidden="true"
              />
              <span className="kern-label">Ergebnis herunterladen (.pdf)</span>
            </button>
          </div>
        </>
      ),
    },
    // The NKR only checks Regelungsvorhaben of the Bund, the Digitalcheck
    // team gets a copy with Interoperabilität
    isBund && {
      heading: "Ergebnis an den Normenkontrollrat senden",
      content: (
        <>
          <p>
            Der NKR steht Ihnen bei Fragen zur Seite und berät Sie gerne zu
            Ihrem Vorhaben, auch wenn es sich noch in einer frühen Phase
            befindet.
          </p>
          {sendNote}
          <EmailForm
            to={contact.nkrEmail}
            cc={hasInteroperability ? contact.interoperabilityEmail : undefined}
            body={body}
          />
        </>
      ),
    },
    !isBund &&
      hasInteroperability && {
        heading: "Ergebnis an das Digitalcheck Team senden",
        content: (
          <>
            <p>
              Da Ihr Regelungsvorhaben Anforderungen an Interoperabilität
              beinhaltet, unterstützt das Digitalcheck Team Sie dabei, diese
              optimal umzusetzen. Nach dem Erhalt der E-Mail setzt sich das Team
              mit Ihnen in Verbindung, um gemeinsam die weiteren Schritte zu
              planen.
            </p>
            {sendNote}
            <EmailForm to={contact.interoperabilityEmail} body={body} />
          </>
        ),
      },
  ].filter((step) => step !== false);
  // A single step isn't numbered and spans the full width, like the box for "unsure"
  const isSingleStep = steps.length === 1;

  return (
    <div className="breakout space-y-32 print:hidden">
      {steps.map(({ heading, content }, index) => (
        <section
          key={heading}
          className={`bg-kern-darkblue-025 space-y-16 ${isSingleStep ? "breakout" : "rounded-sm px-16 py-32 sm:px-64"}`}
        >
          {!isSingleStep && <p className="kern-preline">Schritt {index + 1}</p>}
          <h2 className="kern-heading-medium">{heading}</h2>
          {content}
        </section>
      ))}
    </div>
  );
}

function Faq({ hasEmail }: { hasEmail: boolean }) {
  const items = [
    hasEmail && {
      question: "Was passiert, wenn ich auf „E-Mail-Programm öffnen“ klicke?",
      answer:
        "In Ihrem E-Mail-Programm öffnet sich eine neue E-Mail. Diese enthält das Vorprüfungs-Ergebnis in Textform mit Ergebnissen zum Digitalbezug und zur EU-Interoperabilität. Sie haben die Möglichkeit, den Text und Empfänger individuell anzupassen und zusätzliche Dokumente anzufügen. Den Zeitpunkt des Versands wählen Sie selbst.",
    },
    {
      question: "Was ist, wenn ich mehrere Regelungen habe?",
      answer:
        "Füllen Sie eine gemeinsame Vorprüfung für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus. So viele wie nötig, so wenige wie möglich.",
    },
  ].filter((item) => item !== false);

  return (
    <div className="space-y-16 print:hidden">
      <h2 className="kern-heading-medium">Häufige Fragen zum Ergebnis</h2>
      <div>
        {items.map(({ question, answer }) => (
          <details key={question} className="kern-accordion">
            <summary className="kern-accordion__header">
              <span className="kern-title">{question}</span>
            </summary>
            <div className="kern-accordion__body">
              <p className="kern-body">{answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

/** The result of the Vorprüfung with the next steps, see getVorpruefungResult */
export default function Ergebnis() {
  // Rendered client-only (no HTML from the build), so the stored data is known
  const data = useStore(wizardStores.vorpruefung.$data);
  const result = getVorpruefungResult(data);
  const isClear = result !== "contradiction" && result !== "unsure";
  // Without a stored Prüfbereich, the Bund is assumed (as in the breadcrumb)
  const isBund = (data.pruefbereich ?? "Bund") === "Bund";
  // Same condition as the e-mail steps in <Steps>
  const hasEmail = isBund || result === "digitalAndInteroperability";

  return (
    <div className="breakout space-y-64">
      {result === "contradiction" && (
        <WarningAlert title="Widerspruch in Ihren Angaben">
          <p className="kern-body">
            Sie haben gewählt, dass Ihr Vorhaben keinen Digitalbezug hat,
            gleichzeitig aber, dass ein Datenaustausch auf EU-Ebene stattfindet.{" "}
            <b>
              Dies ist ein Widerspruch, da ein Datenaustausch auf EU-Ebene einen
              Digitalbezug (digitale Systeme) voraussetzt.
            </b>
          </p>
          <p className="kern-body">
            <b>Beachten Sie in diesem Kontext</b>: Interoperabilität ist die
            Fähigkeit digitaler Systeme, miteinander zu kommunizieren und Daten
            auszutauschen.{" "}
            <b>
              Das heißt, ohne Digitalbezug ist Interoperabilität nicht möglich.
            </b>
          </p>
          <p className="kern-body">
            Haben Sie Fragen? Kontaktieren Sie uns unter <SupportContact />.
          </p>
          <a
            href={assistent_vorpruefung_datenaustausch.path}
            className="kern-link"
          >
            <span
              className="kern-icon kern-icon--arrow-forward"
              aria-hidden="true"
            />
            Frage 3 zum Datenaustausch überprüfen
          </a>
        </WarningAlert>
      )}
      {result === "unsure" && (
        <WarningAlert title="Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.">
          <p className="kern-body">
            Bitte kontaktieren Sie den Digitalcheck-Support unter:{" "}
            <SupportContact /> mit Ihren Fragen. Wir helfen Ihnen, die
            Vorprüfung auszufüllen.
          </p>
        </WarningAlert>
      )}
      {isClear && (
        <>
          <ResultAlert result={result} />
          <Steps result={result} data={data} isBund={isBund} />
        </>
      )}

      <div className="space-y-16">
        <h2 className="kern-heading-medium print:hidden">
          So kommt das Ergebnis zustande – jede Antwort einzeln korrigierbar:
        </h2>
        <ResultTable />
      </div>

      {result === "unsure" && (
        // Full width and flush with the button bar (pb-80 of WizardLayout)
        <section className="breakout bg-kern-darkblue-025 -mb-80 space-y-16">
          <h2 className="kern-heading-medium">
            Sie können auch ohne positive Vorprüfung die Digitaltauglichkeit
            Ihres Regelungsvorhabens sicherstellen.
          </h2>
          <p>
            Wenn digitale Umsetzung für Ihr Regelungsvorhaben wichtig ist,
            finden Sie hier passende Methoden und Werkzeuge. Sie erfahren, wie
            Sie den Prozess darstellen und durchdenken, mit Beteiligten ins
            Gespräch kommen und die fünf Prinzipien anwenden.
          </p>
        </section>
      )}
      {isClear && <Faq hasEmail={hasEmail} />}
    </div>
  );
}
