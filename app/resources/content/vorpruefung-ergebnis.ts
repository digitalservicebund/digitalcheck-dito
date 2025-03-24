import { steps } from "~/resources/content/components/naechste-schritte";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const preCheckResult = {
  title: "Ergebnis der Vorprüfung",
  reasoningIntro: {
    digital: {
      sure: "In Bezug auf **digitale Aspekte** führt ihr Regelungsvorhaben zu...",
      unsure:
        "In Bezug auf **digitale Aspekte** ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
    },
    interoperability: {
      sure: "In Bezug auf **Interoperabilität** führt ihr Regelungsvorhaben zu...",
      unsure:
        "In Bezug auf **Interoperabilität** ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
    },
  },
  positive: {
    title: "Das Regelungsvorhaben hat einen **Digitalbezug** und ",
    actionButton: {
      text: "Vorprüfung herunterladen",
    },
    nextSteps: {
      title: "So machen Sie weiter",
      steps: [
        steps.preCheck.finished,
        {
          ...steps.methods,
        },
        steps.documentation,
        steps.nkrFinal,
      ],
    },
  },
  unsure: {
    title: "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
    hint: "Bitte kontaktieren Sie den Digitalcheck-Support unter: [0151/40 76 78 39](tel:+4915140767839) oder schreiben Sie uns eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) mit Ihren Fragen. Wir helfen Ihnen, die Vorprüfung auszufüllen.",
    actionButton: {
      text: "Vorprüfung wiederholen",
      href: ROUTE_PRECHECK.url,
    },
    nextStep: {
      title:
        "Sie können auch ohne positive Vorprüfung die Digitaltauglichkeit Ihres Regelungsvorhabens sicherstellen.",
      text: "Wenn digitale Umsetzung für Ihr Regelungsvorhaben wichtig ist, finden Sie hier passende Methoden und Werkzeuge. Sie erfahren, wie Sie den Prozess darstellen und durchdenken, mit Beteiligten ins Gespräch kommen und die fünf Prinzipien anwenden.",
      link: {
        text: "Zu „Erarbeiten“",
        href: ROUTE_METHODS.url,
      },
    },
  },
  negative: {
    title: "Das Regelungsvorhaben hat **keinen Digitalbezug** und ",
    nextSteps: {
      title: "So machen Sie weiter",
      steps: [steps.preCheck.finished, steps.nkrFinal],
    },
  },
  interoperability: {
    info: {
      title: "Erfahren Sie mehr über Interoperabilität",
      content:
        "Was bedeutet Interoperabilität für Regelungen, und wie beeinflusst sie deren Erarbeitung? Auf unserer Übersichtsseite finden Sie alle wichtigen Informationen dazu.",
      button: {
        text: "Mehr zu Interoperabilität",
        href: ROUTE_INTEROPERABILITY.url,
        look: "link" as const,
      },
    },
    positive: {
      title: "enthält Anforderungen der **Interoperabilität**.",
    },
    negative: {
      title: "**keine** Anforderungen der **Interoperabilität**.",
    },
    unsure: {
      title: "**keine eindeutigen** Anforderungen der **Interoperabilität**.",
    },
  },
  form: {
    formLegend: "Vorprüfung senden",
    instructions: dedent`
      Wir erstellen für Sie eine E-Mail mit dem Ergebnis der Vorprüfung, die sich in Ihrem E-Mail-Programm öffnet. Diese können Sie anschließend an den Nationalen Normenkontrollrat (NKR), das Digitalcheck-Team und an Ihre eigene E-Mail-Adresse senden. Geben Sie Ihre eigene E-Mail-Adresse an, um sich diese als **Teil der Dokumentation** zu schicken.
      <br/><br/>
      - Falls Ihr Vorhaben Interoperabilitäts-Anforderungen erfüllt, lassen Sie das Digitalcheck-Team bitte im Kopie-Feld der E-Mail. Wir erhalten somit das Vorprüfungsergebnisses in Kopie und kontaktieren Sie für die nächsten Schritte. Bei Fragen können Sie uns auch direkt unter [0151/40 76 78 39](tel:+4915140767839) erreichen.<br/><br/> 
      - Je früher und tiefer Sie sich mit dem NKR über den Digitalbezug Ihres Regelungsvorhabens austauschen, desto schneller wird die Prüfung abgeschlossen.
    `,
    emailLabel: "Ihre E-Mail Adresse (optional)",
    policyTitleLabel: "Vorläufiger Arbeitstitel des Vorhabens",
    policyTitleRequired: "Bitte geben Sie einen Titel für Ihr Vorhaben an.",
    policyTitleTooLong:
      "Bitte wählen Sie einen kürzeren Titel (100 Zeichen) und ergänzen Sie diesen gegebenenfalls direkt in der resultierenden E-Mail.",
    precheckAnswersRequired: "Bitte geben Sie die Vorprüfung-Antworten an",
    reasonLabel: "Begründung",
    reasonRequired:
      "Bitte geben Sie eine Begründung für den fehlenden Digitalbezug an.",
    reasonLong:
      "Achtung, Ihre Begründung ist sehr lang. Möglicherweise sehen Sie in dem PDF nicht den gesamten Text. Sie können ihn aber vollständig kopieren, es gehen keine Inhalte verloren.",
    reasonTooLong:
      "Bitte geben Sie eine kürzere Begründung ein (500 Zeichen) und ergänzen Sie diese gegebenenfalls direkt in der resultierenden E-Mail.",
    emailClientHint: {
      title: "Ihr Email-Programm wird geöffnet...",
      text: "Dies kann je nach Anwendung einen Moment dauern. Sie können diesen Hinweis jederzeit schließen, sobald sich Ihr E-Mail-Programm geöffnet hat. Sollte sich Ihr E-Mail Programm nicht öffnen, kontaktieren Sie uns unter [0151/40 76 78 39](tel:+4915140767839) oder per E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de).",
    },
    faqs: {
      title: "Häufige Fragen zum Senden der Vorprüfung",
      details: [
        {
          label: "Was passiert, wenn ich auf „E-Mail erstellen“ klicke?",
          text: "In Ihrem E-Mail-Programm öffnet sich eine neue E-Mail. Diese enthält das Vorprüfungs-Ergebnis in Textform mit Ergebnissen zum Digitalbezug und EU-Interoperabilität. Sie haben die Möglichkeit, den Text und Empfänger individuell anzupassen und zusätzliche Dokumente anzufügen. Den Zeitpunkt des Versands wählen Sie selbst.",
        },
        {
          label: "Wie wird das Ergebnis der Vorprüfung dokumentiert?",
          text: dedent`
            Wenn Sie das Ergebnis für Ihre Dokumentation benötigen, schicken Sie das Ergebnis per E-Mail an sich selbst und ggf. an Ihre Kolleg:innen. Es gibt zwei Möglichkeiten, die E-Mail zu verakten:
            
            **Manuell über Outlook:**
            - Klicken Sie in Outlook auf „Drucken“.
            - Wählen Sie „Speichern als PDF“ und speichern Sie die Datei ab.
            - Fügen Sie das PDF anschließend in Ihr E-Akten-System ein.
            
            **Direkte Veraktung:**
            - Nutzen Sie, falls vorhanden, die direkte Veraktungsfunktion in Outlook.
          `,
        },
        {
          label: "Warum die Vorprüfung an den NKR schicken?",
          text: "Erfahrungswerte zeigen, dass ein frühzeitiger Austausch mit dem NKR oder dem DigitalService das Erarbeiten für Sie vereinfacht und die Prüfung beschleunigt. So können Sie von den Erfahrungen in anderen Vorhaben profitieren – wenn Sie dies wünschen.",
        },
      ],
    },
    downloadPdfButton: {
      text: "Als PDF-Datei herunterladen",
    },
    sendEmailButton: {
      text: "E-Mail erstellen",
    },
    emailTemplate: {
      toNkr: "nkr@bmj.bund.de",
      toDC: "interoperabel@digitalservice.bund.de",
      subject: "Digitalcheck Vorprüfung",
      bodyBefore: dedent`
        Guten Tag,
        
        hiermit erhalten Sie das Ergebnis Ihrer Vorprüfung:
      `,
      bodyAfter: dedent`
        Mit freundlichen Grüßen
        
        *Diese E-Mail wurde automatisch erstellt.*
      `,
    },
    downloadStarted: "Vorprüfung wird heruntergeladen",
  },
  print: {
    titlePrefix: "Ihr Vorhaben: ",
  },
};
