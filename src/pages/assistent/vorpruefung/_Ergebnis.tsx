import InputError from "@/components/InputError";
import { assistent_vorpruefung_datenaustausch } from "@/config/routes";
import { contact } from "@/resources/content/shared/contact";
import { mailto } from "@/utils/mailtoHelper";
import type { Pruefbereich } from "@/wizard/pruefbereichSchema";
import { $pruefbereich, wizardStores } from "@/wizard/stores";
import {
  getVorpruefungResult,
  questionNames,
  resultRows,
  type VorpruefungResult,
} from "@/wizard/vorpruefungResult";
import type { Answer } from "@/wizard/vorpruefungSchema";
import { useStore } from "@nanostores/react";
import { useId, useRef, useState, type ReactNode } from "react";
import ResultTable from "./_ResultTable";

type VorpruefungData = ReturnType<typeof wizardStores.vorpruefung.$data.get>;

/** A result without open questions, shown in "Ihr Ergebnis" */
type ClearResult = Exclude<VorpruefungResult, "contradiction" | "unsure">;

const meanings: Record<ClearResult, string> = {
  negative:
    "Sie haben den Digitalcheck erfolgreich abgeschlossen. Es sind keine weiteren Schritte erforderlich.",
  digital:
    "Das bedeutet, dass Sie weitere Schritte unternehmen müssen, um Digitaltauglichkeit in Ihrem Regelungsvorhaben sicherzustellen. Zur EU-Interoperabilität müssen Sie jedoch nichts weiter tun.",
  digitalAndInteroperability:
    "Sie müssen beim Erarbeiten Ihrer Regelung die Digitaltauglichkeit sowie EU-Anforderungen an Interoperabilität sicherstellen.",
};

// Completed by subject and verb, e.g. "Ihr Vorhaben hat" on the page, "Das Vorhaben hat" in the e-mail
const statements = (result: ClearResult) => {
  const hasDigitalbezug = result !== "negative";
  const hasInteroperability = result === "digitalAndInteroperability";
  return [
    {
      isMet: hasDigitalbezug,
      object: hasDigitalbezug ? "einen Digitalbezug" : "keinen Digitalbezug",
    },
    {
      isMet: hasInteroperability,
      object: hasInteroperability
        ? "einen Bezug zur EU-Interoperabilität"
        : "keinen eindeutigen Bezug zur EU-Interoperabilität",
    },
  ];
};

const answerSections: { answer: Answer; heading: string }[] = [
  { answer: "yes", heading: "Zutreffende Aspekte" },
  { answer: "no", heading: "Nicht zutreffende Aspekte" },
  { answer: "unsure", heading: "Noch zu prüfende Aspekte" },
];

const emailBody = (
  result: ClearResult,
  data: VorpruefungData,
  pruefbereich: Pruefbereich,
  title: string,
) =>
  [
    "Guten Tag,",
    `hiermit erhalten Sie das Vorprüfungsergebnis für das Regelungsvorhaben mit dem Arbeitstitel ${title}.`,
    [
      "Einschätzung des Vorhabens:",
      ...statements(result).map(
        ({ object }) => `- Das Vorhaben hat ${object}.`,
      ),
    ].join("\n"),
    ...answerSections.map(({ answer, heading }) => {
      const aspects = questionNames.filter((name) => data[name] === answer);
      if (aspects.length === 0) return "";
      return [
        `${heading}:`,
        ...aspects.map((name) => `- ${resultRows[name].summary}`),
      ].join("\n");
    }),
    "Mit freundlichen Grüßen",
    "*Diese E-Mail wurde automatisch erstellt.*",
  ]
    .filter(Boolean)
    .join("\n\n");

function SupportContact() {
  return (
    <>
      <a href={contact.phone}>{contact.phoneDisplay}</a> oder per E-Mail an{" "}
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
        <h2 className="kern-title">Ergebnis Ihrer Vorprüfung</h2>
      </div>
      <div className="kern-alert__body space-y-16">
        <ul className="list-unstyled space-y-8">
          {statements(result).map(({ isMet, object }) => (
            <li key={object} className="kern-body flex items-center gap-8">
              <span
                className={`kern-icon bg-kern-feedback-info ${isMet ? "kern-icon--success" : "kern-icon--close"}`}
                aria-hidden="true"
              />
              <span>
                Ihr Vorhaben hat <b>{object}</b>.
              </span>
            </li>
          ))}
        </ul>
        <div>
          <b>Was bedeutet das für Ihr Vorhaben?</b>
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
  const titleInput = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  // Only validated on opening the e-mail, cleared again once a title is entered
  const [hasError, setHasError] = useState(false);
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
              Arbeitstitel des Vorhabens
            </label>
            <input
              ref={titleInput}
              type="text"
              id={`${id}-title`}
              className={`kern-form-input__input bg-white ${hasError ? "kern-form-input__input--error" : ""}`}
              value={title}
              aria-invalid={hasError || undefined}
              aria-errormessage={hasError ? `${id}-title-error` : undefined}
              onChange={(event) => {
                setTitle(event.target.value);
                if (event.target.value.trim()) setHasError(false);
              }}
            />
            {hasError && (
              <InputError id={`${id}-title-error`}>
                Bitte geben Sie den Arbeitstitel des Vorhabens an.
              </InputError>
            )}
          </div>
          <div className="flex flex-wrap gap-16">
            <a
              href={mailto(to, subject, body(title), cc)}
              className="kern-btn kern-btn--primary link-unstyled"
              onClick={(event) => {
                if (title.trim()) return;
                // Without a title, the e-mail program isn't opened
                event.preventDefault();
                setHasError(true);
                titleInput.current?.focus();
              }}
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
              <span className="kern-label">E-Mail-Text anzeigen</span>
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
                Bei Interoperabilitätsbezug erhält das Digitalcheck-Team
                automatisch eine Kopie.
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
  pruefbereich,
}: {
  result: ClearResult;
  data: VorpruefungData;
  pruefbereich: Pruefbereich;
}) {
  const isBund = pruefbereich === "Bund";
  const hasInteroperability = result === "digitalAndInteroperability";
  const body = (title: string) => emailBody(result, data, pruefbereich, title);
  const sendNote = (
    <p>
      Wenn Sie auf „E-Mail-Programm öffnen“ klicken, öffnet sich eine
      vorausgefüllte E-Mail in Ihrem Programm. Sie prüfen und versenden die
      Nachricht anschließend selbst.
    </p>
  );

  const steps = [
    {
      heading: "Ergebnis herunterladen",
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
      heading: "Ergebnis an den NKR senden",
      content: (
        <>
          <p>
            Der Normenkontrollrat berät und unterstützt Sie bereits in der
            frühen Phase Ihres Vorhabens.
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
              Ihr Vorhaben enthält EU-Anforderungen an Interoperabilität. Das
              Team des Digitalcheck Bund unterstützt Sie gerne dabei, diese
              optimal umzusetzen.
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
        "In Ihrem E-Mail-Programm öffnet sich eine neue E-Mail. Diese enthält das Ergebnis der Vorprüfung zum Digitalbezug und zur EU-Interoperabilität in Textform. Sie können den Text und Empfänger anpassen und weitere Unterlagen hinzufügen. Anschließend versenden Sie die E-Mail selbst.",
    },
    {
      question: "Was ist, wenn ich mehrere Regelungen habe?",
      answer:
        "Wenn Ihr Vorhaben mehrere Regelungen umfasst, die inhaltlich zusammenhängen, reicht eine gemeinsame Vorprüfung aus.",
    },
  ].filter((item) => item !== false);

  return (
    <div className="space-y-16 print:hidden">
      <h2 className="kern-heading-medium">Häufige Fragen</h2>
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
  const pruefbereich = useStore($pruefbereich) ?? "Bund";
  const isBund = pruefbereich === "Bund";
  // Same condition as the e-mail steps in <Steps>
  const hasEmail = isBund || result === "digitalAndInteroperability";

  return (
    <div className="breakout space-y-48 sm:space-y-64 print:[&_.kern-icon]:[print-color-adjust:exact]">
      {result === "contradiction" && (
        <WarningAlert title="Widersprüchliche Angaben – bitte prüfen">
          <ul className="kern-body space-y-8">
            <li>
              Ihre Angabe in Frage 3 (Datenaustausch):
              <ul>
                <li>
                  Datenaustausch <b>findet nicht statt</b>
                </li>
              </ul>
            </li>
            <li>
              Ihre Angabe in Frage 6 (Datenaustausch mit EU-Bezug):
              <ul>
                <li>
                  Datenaustausch <b>findet statt</b>
                </li>
              </ul>
            </li>
          </ul>
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
        <WarningAlert title="Sie haben mehrere Fragen mit „Ich bin unsicher“ beantwortet">
          <p className="kern-body">
            Bitte kontaktieren Sie das Digitalcheck-Team unter{" "}
            <SupportContact />. Wir helfen Ihnen, die Vorprüfung abzuschließen.
          </p>
        </WarningAlert>
      )}
      {isClear && (
        <>
          <ResultAlert result={result} />
          <Steps result={result} data={data} pruefbereich={pruefbereich} />
        </>
      )}

      <div className="space-y-16">
        <h2 className="kern-heading-medium print:hidden">
          Übersicht Ihrer Antworten
        </h2>
        <ResultTable />
      </div>

      {result === "unsure" && (
        <section className="breakout bg-kern-darkblue-025 space-y-16">
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
