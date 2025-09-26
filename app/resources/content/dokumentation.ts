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
    title: "Digitaltauglichkeit dokumentieren",
    subtitle:
      "Die Dokumentation der Digitaltauglichkeit ist ein formeller, letzter Schritt. Sie dokumentieren, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben, und wie sie ins Regelungsvorhaben eingeflossen sind.",
    hints: [
      {
        title: "So funktioniert es",
        text: "Dieses Online Formular führt Sie durch die fünf Prinzipien der Digitaltauglichkeit. Daraus wird die Dokumentation für den Nationalen Normenkontrollrat (NKR) generiert. Diese können Sie dann als PDF-Datei herunterladen, ablegen und schlussendlich beim NKR einreichen.",
      },
      {
        title: "Vertraulich und nur für Sie zugänglich",
        text: "Was sie eintragen, bleibt vertraulich. Ihre Eingaben werden nur genutzt, um die PDF-Datei zu erstellen. Ihre Daten werden **nicht gespeichert** oder weitergegeben. Niemand sonst kann darauf zugreifen.",
      },
      {
        title: "Nur ein Vorgang zur selben Zeit",
        text:
          "Sie können nur an einer Dokumentation zur selben Zeit arbeiten und Ihre Daten werden nicht dauerhaft gespeichert. " +
          "Wenn Sie einen Zwischenstand speichern möchten, können Sie die Dokumentation jederzeit als auslesbare PDF-Datei herunterladen. Sie können diese somit zu einem späteren Zeitpunkt wieder hochladen, um an der Dokumentation weiterzuarbeiten.",
      },
    ],
    buttonText: "Dokumentation starten",
    alternative: {
      text: "**Alternativ** können Sie die Dokumentation auch als Word-Datei herunterladen und ausfüllen.",
      buttonText: "Word-Datei herunterladen",
    },
    multipleNotice: {
      headline: "Eine oder mehrere Dokumentationen?",
      content:
        "Füllen Sie eine gemeinsame Dokumentation für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus. So viele wie nötig, so wenige wie möglich. Bitte beachten Sie, dass parallele Vorgänge momentan nicht möglich sind.",
    },
    summary: {
      title: "Hinweise",
      items: [
        {
          heading: { text: "Beginnen Sie so früh wie möglich" },
          content:
            "Schicken Sie die begleitende Dokumentation so früh wie möglich an Ihre Ansprechperson im NKR-Sekretariat, **spätestens mit der Einleitung der Ressortabstimmung**. Fügen Sie die Dokumentation des Digitalcheck und Visualisierungen des Umsetzungsprozesses gerne auch der Ressortabstimmung bei, damit Ihre Kolleginnen und Kollegen Ihre Entscheidungen nachvollziehen können.",
        },
        {
          heading: { text: "Das prüft der Nationale Normenkontrollrat" },
          content:
            "Der NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine **digital- und praxistaugliche Umsetzung** der Regelung. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu.",
        },
      ],
    },
  },
  info: {
    headline: "Informationen zum Regelungsvorhaben",
    text: dedent`
      Tragen Sie den Titel des Regelungsvorhaben bzw. den Namen der Regelung ein. 

      Sie können nur an einer Dokumentation zur selben Zeit arbeiten. Parallele Vorgänge sind momentan nicht möglich. Schließen Sie eine Dokumentation bitte vollständig ab, bevor Sie die nächste beginnen. Ihre Daten werden nicht dauerhaft gespeichert.
    `,
    inputTitle: {
      label: "Titel des Regelungsvorhabens",
    },
  },
  navigation: {
    ariaLabel: "Seitennavigation",
    principles: "Prinzipien",
  },
  participation: {
    headline: "Praxistaugliche Umsetzung",
    textIntro: dedent`
      Ihr Regelungsvorhaben soll den Bedürfnissen der Betroffenen entsprechen. Die Anforderungen der umsetzenden Akteurinnen und Akteure sollen Sie ebenfalls berücksichtigen. Dafür müssen Sie sich mit den Beteiligten austauschen.
      
      Bitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.  

      **Zum Beispiel:** frühzeitige Befragung von Bürgerinnen und Bürgern, Gespräche mit Vollzugsakteurinnen und -akteuren oder Expertinnen und Experten, formelle Beteiligungsverfahren. 
      `,
    textFieldParticipationLabel: "Austauschformate:",
    textResults: dedent`
      Was haben Sie aus dem Austausch mit den Beteiligten mitgenommen? 
      Bitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden. 
      Paragrafen, die besonders umsetzungsrelevant sind, können Sie kopieren und hier einfügen.
      
      **Zum Beispiel:**
      Aus Gesprächen mit Mitarbeitenden der Hauptzollämter gelernt: Das aktuelle, papierbasierte Antragsverfahren wird unter großem Aufwand am Laufen gehalten. Angesichts einer erwarteten Vervielfachung der Antragszahlen würde dies zu einer drohenden Überlastung führen. 
      Auf Basis dieser Erkenntnis wurde entschieden, eine Online-Antragspflicht zwei Jahre früher als geplant einzuführen, um die Bearbeitung zu digitalisieren, manuelle Schritte zu reduzieren und die Prüfenden zu entlasten. 
      Für Details lesen Sie gerne den <a href="https://digitalservice.bund.de/blog/aktuelles-beispiel-fuer-digitaltaugliche-regelungen-das-stromsteuerrecht" target="_blank">Blog-Artikel</a>.
    `,
    textFieldResultsLabel: "Eingearbeitete Erkenntnisse:",
  },
  principlePages: {
    radioOptions: ["Ja", "Teilweise", "Nein", "Nicht relevant"],
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
  },
  send: {
    headline: "Absenden",
    text: "Hier entsteht die Absenden-Seite der Dokumentation.",
  },
};
