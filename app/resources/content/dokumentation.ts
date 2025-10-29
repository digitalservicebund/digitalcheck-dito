import { TipsAndUpdatesOutlined } from "@digitalservicebund/icons";
import { steps } from "~/resources/content/shared/naechste-schritte";
import { ROUTE_DOCUMENTATION_STATIC_WORD } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const documentation = {
  title: "Dokumentieren der Digitaltauglichkeit",
  subtitle:
    "Sie dokumentieren in einem Fragebogen, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben. Und wie Sie diese in Ihr Regelungsvorhaben einfließen lassen.",
  buttons: [
    {
      // NOTE: 70-tage replace pdf with word document
      text: "Dokumentation herunterladen (Word-Datei)",
      href: ROUTE_DOCUMENTATION_STATIC_WORD.url,
    },
  ],
  multipleNotice: {
    headline: "Eine oder mehrere Dokumentationen?",
    content:
      "Füllen Sie eine gemeinsame Dokumentation für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus. So viele wie nötig, so wenige wie möglich.",
  },
  summary: {
    title: "Zusammengefasst",
    items: [
      {
        heading: { text: "Beginnen Sie so früh wie möglich" },
        content:
          "Schicken Sie die begleitende Dokumentation so früh wie möglich an Ihre Ansprechperson im NKR-Sekretariat, **spätestens mit der Einleitung der Ressortabstimmung**. Fügen Sie die Dokumentation des Digitalcheck und Visualisierungen des Umsetzungsprozesses gerne auch der Ressortabstimmung bei, damit Ihre Kolleginnen und Kollegen Ihre Entscheidungen nachvollziehen können.",
      },
      {
        heading: { text: "Das prüft der Nationale Normenkontrollrat" },
        content:
          "Der NKR prüft das Regelungsvorhaben auf Möglichkeiten der digitalen Umsetzung auf Basis des von Ihnen durchgeführten Digitalcheck. Das wesentliche Prüfkriterium ist die methodische und inhaltliche Nachvollziehbarkeit. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu.",
      },
    ],
  },
  nextSteps: {
    title: "So machen Sie weiter",
    items: [
      steps.preCheck.finished,
      steps.methods.finished,
      steps.documentation.finished,
      steps.nkrFinal,
    ],
  },
};

export const digitalDocumentation = {
  start: {
    title: "Dokumentation der Digitaltauglichkeit",
    subtitle:
      "Die Dokumentation der Digitaltauglichkeit ist ein formeller, letzter Schritt. Sie dokumentieren, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben, und wie sie ins Regelungsvorhaben eingeflossen sind.",
    buttonText: "Dokumentation starten",
    alternative: {
      text: "**Alternativ** können Sie die Dokumentation als Word-Datei herunterladen und bearbeiten. Folgen Sie dann den Anweisungen in der Datei.",
      buttonText: "Word-Vorlage herunterladen (.docx)",
    },
    description: {
      title: "So funktioniert es",
      items: [
        {
          title: "Starten Sie die Dokumentation online",
          content:
            "Alternativ können Sie die Dokumentation als Word-Datei herunterladen und bearbeiten. Folgen Sie dann den Anweisungen in der Datei.",
        },
        {
          title: "Beantworten Sie Fragen in der angeleiteten Dokumentation",
          content: dedent`
          Der Kern der Dokumentation sind die fünf Prinzipien für digitaltaugliche Gesetzgebung. Diese kennen Sie bereits aus Prozessschritt 2 – Digitaltauglichkeit erarbeiten.

          Während des gesamten Prozesses werden Ihre Daten vertraulich behandelt. Nur Sie können sie sehen.`,
        },
        {
          title: "Senden Sie die ausgefüllte Dokumentation an den NKR",
        },
      ],
    },
    noscript: {
      headline: "Erlauben Sie die Nutzung von JavaScript",
      content: dedent`
        Um die Dokumentation zu starten, müssen Sie Ihrem Browser die Nutzung von JavaScript erlauben. Das ist nötig, damit die Seite Ihre Daten zwischenspeichern kann.
        
        **So geht es:** Suchen Sie in den Einstellungen Ihres Browsers nach JavaScript und erlauben Sie die Nutzung.
      `,
    },
    dataSavingHint: {
      headline: "Hinweise zur Zwischenspeicherung Ihrer Daten",
      content: dedent`
        Ihre Daten bleiben unbegrenzt in der Sitzung gespeichert, es sei denn:
        - Sie beenden die Dokumentation.
        - Ihr SINA-Rechner löscht sie (prüfen Sie Ihre Einstellungen).
        - Sie löschen die Daten manuell.
      `,
    },
    tips: {
      title: "Tipps",
      items: [
        {
          heading: {
            text: "Füllen Sie eine Dokumentation für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus.",
          },
          content:
            "Ganz nach dem Prinzip: so viele wie nötig, so wenige wie möglich. Damit sparen Sie sich Zeit und der NKR kann Zusammenhänge besser erkennen.",
          visual: { type: "icon" as const, Icon: TipsAndUpdatesOutlined },
        },
        {
          heading: { text: "Holen Sie sich eine zweite Meinung ein" },
          content:
            "Sie müssen nicht alleine an der Dokumentation arbeiten. Laden Sie das fertige Dokument oder einen Zwischenstand als Word-Dokument herunter und senden Sie es an eine Kollegin oder einen Kollegen.",
          visual: { type: "icon" as const, Icon: TipsAndUpdatesOutlined },
        },
        {
          heading: { text: "Nehmen Sie Ihre Visualisierung als Grundlage" },
          content: dedent`
            Wenn Sie in Ihrer Visualisierung die Fünf Prinzipien bereits angewendet haben, können Sie diese Punkte als Ausgangslage für die Beantwortung der Fragen nutzen.

            Senden Sie die Visualisierung zum Schluss mit an den NKR.`,
          visual: { type: "icon" as const, Icon: TipsAndUpdatesOutlined },
        },
      ],
    },
    faq: {
      title: "Häufige Fragen",
      questions: [
        {
          title: "Muss ich eine Dokumentation für meine Regelungsart machen?",
          content: "",
        },
        {
          title:
            "Soll ich pro Vorhaben eine oder mehrere Dokumentationen ausfüllen?",
          content: "",
        },
        {
          title: "Wie gehe ich mit Mantelgesetzen um?",
          content: "",
        },
        {
          title: "Muss ich die Dokumentation online ausfüllen?",
          content: "",
        },
        {
          title: "Was passiert mit meinen Daten?",
          content: "",
        },
        {
          title: "Wie lange werden meine Daten gespeichert?",
          content: "",
        },
        {
          title: "Kann ich mehrere Dokumentationen gleichzeitig bearbeiten?",
          content: "",
        },
        {
          title: "Kann ich mit jemandem zusammen daran arbeiten?",
          content: "",
        },
        {
          title: "Was prüft der Nationale Normenkontrollrat (NKR)?",
          content: "",
        },
        {
          title: "Sind Visualisierungen verpflichtend?",
          content: "",
        },
      ],
    },
  },
  info: {
    headline: "Tragen Sie den Titel Ihres Regelungsvorhaben ein",
    inputTitle: {
      label: "Titel des Regelungsvorhabens",
      error: "Bitte geben Sie einen Titel ein.",
    },
  },
  navigation: {
    ariaLabel: "Seitennavigation",
    principles: "Prinzipien",
  },
  participation: {
    headline: "Auswirkungen auf Betroffene und an der Umsetzung Beteiligte",
    textIntro:
      "Ihr Regelungsvorhaben sollte sowohl den Bedürfnissen der Betroffenen als auch den Anforderungen der Umsetzung (z. B. in Behörden) gerecht werden.",
    formats: {
      heading:
        "Entspricht die Umsetzung des Regelungsvorhabens den Bedürfnissen der Betroffenen? Wie haben Sie das überprüft?",
      content:
        "**Zum Beispiel:** frühzeitige Befragung von Bürgerinnen und Bürgern, Gespräche mit Vollzugsakteurinnen und -akteuren oder Expertinnen und Experten, formelle Beteiligungsverfahren.",
      textField: {
        label: "Antwort",
        description:
          "Bitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.",
        placeholder: dedent`
          - Interviews mit Bürgerinnen und Bürgern
          - ...
        `,
        errorMessage: "Bitte geben Sie eine Antwort.",
      },
    },
    results: {
      heading:
        "Wie spiegeln sich die Erkenntnisse, die durch die oben genannten Schritte gewonnen wurden, im Regelungsvorhaben wider?",
      textField: {
        label: "Antwort",
        description:
          "Bitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die besonders umsetzungsrelevant sind.",
        errorMessage: "Bitte geben Sie eine Antwort.",
      },
    },
    tip: {
      heading: "Ihre eingegebenen Angaben werden in der Session gespeichert.",
      content:
        "Sie können Ihre Angaben als Word Dokument herunterladen und zu einem späteren Zeitpunkt vervollständigen.",
    },
  },
  principlePages: {
    badge: "Prinzipien",
    moreButton: "Mehr dazu",
    moreInfoButton: "Mehr erfahren",
    radioOptions: ["Ja, gänzlich oder teilweise", "Nein", "Nicht relevant"],
    textFieldExplanationLabel: "Erklärung:",
    textFieldNegativeReasoningLabel: "Begründung:",
    buttonAdd: "Weitere Referenz hinzufügen",
    buttonRemove: "Referenz entfernen",
    inputs: {
      paragraph: {
        label: "Referenz (Paragraphen oder Artikel):",
      },
      text: {
        label: "Entsprechender Regelungstext hier einfügen:",
      },
      explanation: {
        label: "Erklärung:",
      },
    },
    positivePrinciple: {
      title: "Erläuterung angeben",
      description: dedent`
        Bitte wählen Sie, auf welchen **Schwerpunkt** dieses Prinzips Ihr Vorhaben zutrifft.
        Zu jedem Schwerpunkt finden Sie eine kurze Beschreibung, wenn Sie ihn auswählen.
        Falls keiner zutrifft, wählen Sie **„Eigene Erklärung hinzufügen“**.
        
        Sie können Ihre Angaben als Word Dokument exportieren und später in der Word Datei Ihre Dokumentation fortführen.`,
      actions: {
        addOwnExplanation: {
          title: "Eigene Erklärung hinzufügen",
        },
      },
    },
    negativePrinciple: {
      title: "Erläuterung angeben",
      description: dedent`
        Bitte erläutern Sie, warum das Prinzip “Digitale Angebote für alle nutzbar gestalten” **nicht** auf Ihr Vorhaben zutrifft.

        Sie können Ihre Angaben als Word Dokument exportieren und später in der Word Datei Ihre Dokumentation fortführen.`,
      label: "Begründung",
      placeholder:
        "Begründung warum das Prinzip nicht auf Ihr Regelungsvorhaben zutrifft.",
    },
    irrelevantPrinciple: {
      title: "Erläuterung angeben",
      description: dedent`
        Bitte erläutern Sie, warum das Prinzip “Digitale Angebote für alle nutzbar gestalten” **nicht relevant** für Ihr Vorhaben ist.

        Sie können Ihre Angaben als Word Dokument exportieren und später in der Word Datei Ihre Dokumentation fortführen.`,
      label: "Begründung",
      placeholder:
        "Begründung warum das Prinzip nicht relevant für Ihr Regelungsvorhaben ist.",
    },
    storageHint: {
      title: "Ihre eingegebenen Angaben werden in der Session gespeichert.",
      content:
        "Sie können Ihre Angaben als Word Dokument herunterladen und zu einem späteren Zeitpunkt vervollständigen.",
    },
    explanationFields: {
      title: "Ihre Erläuterung",
      ownExplanationTitle: "Eigener Punkt",
      ownExplanationDescription:
        "Beschreiben Sie, wie Sie in Ihren Vorhaben das Prinzip “Digitale Angebote für alle nutzbar gestalten” umgesetzt haben.",
      paragraphInput: {
        label: "Paragrafen",
        description:
          "Paragrafen, in denen sich das Regelungsvorhaben auf den ausgewählten Schwerpunkt bezieht.",
      },
      reasoningInput: {
        label: "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
        placeholder:
          "Begründung und/oder Ausschnitt aus Ihrer Regelung als Kopie (Paragraf)",
      },
      deleteButton: "Erläuterung löschen",
    },
    dialog: {
      deleteButton: "Löschen bestätigen",
      cancelButton: "Abbrechen",
      title: "Erläuterung löschen",
      description: dedent`
        Die Erläuterung wird entfernt und das Eingabefeld zurückgesetzt. 
        
        Sie können jederzeit eine neue Erläuterung eintragen.`,
    },
    errors: {
      answerError: "Bitte wählen Sie eine Option aus.",
      reasoningError: "Bitte geben Sie mindestens eine Erläuterung an.",
      errorHint: "Bitte beachten Sie den oberen Hinweis.",
      paragraphsError: "Bitte geben Sie einen Paragrafen an.",
      reasonError: "Bitte geben Sie eine Begründung an.",
    },
  },
  summary: {
    headline: "Prüfen Sie Ihre Angaben",
    text: "Bevor Sie die Dokumentation abschließen und zum NKR senden, prüfen Sie bitte Ihre Angaben und ändern Sie sie bei Bedarf.",
    buttonEdit: {
      text: "Bearbeiten",
      ariaLabelSuffix: " bearbeiten",
    },
    buttonEditNow: {
      text: "Jetzt bearbeiten",
      ariaLabelSuffix: "jetzt bearbeiten",
    },
    principleBadge: "Prinzip",
    principleAnswerTitle:
      "Lässt sich das Vorhaben im Sinne des Prinzips umsetzen?",
    answerPrefix: "Antwort",
    paragraphsPrefix: "Paragrafen",
    reasonPrefix: "Begründung",
    explanationHeading: "Erläuterung",
    warnings: {
      missing: "Sie haben diesen Punkt noch nicht bearbeitet.",
      incomplete: "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
    },
  },
  finish: {
    heading: {
      text: "Dokumentation abschließen",
      markdown:
        "Jetzt laden Sie die ausgefüllte Dokumentation herunter und senden sie an den NKR. Optional können Sie sie vorher zur Abstimmung verschicken.",
    },
    download: {
      heading: "Dokumentation herunterladen",
      content:
        "Laden Sie die ausgefüllte Dokumentation herunter, um sie abzustimmen oder an den NKR zu senden.",
      buttonText: "Word-Datei herunterladen (.docx)",
    },
    send: {
      heading: "Fertige Dokumentation an den NKR senden",
      content: dedent`
        - Senden Sie die Dokumentation **als PDF per E-Mail** an folgende Adresse: [nkr@bmj.bund.de](mailto:nkr@bmj.bund.de). Der NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine digital- und praxistaugliche Umsetzung.
        - Bei **Interoperabilitätsbezug** senden Sie eine Kopie der E-Mail mit der Dokumentation an [interoperabel@digitalservice.bund.de]().
        - **Visualisierungen** und Skizzen sind vom NKR gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.`,
    },
    done: "Damit ist der Digitalcheck für Sie beendet.",
  },
  actions: {
    saveDraft: {
      title: "Zwischenstand speichern (.docx)",
    },
  },
};
