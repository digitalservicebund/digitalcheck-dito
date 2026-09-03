import { dedent } from "@/utils/dedentMultilineStrings";
import { contact } from "./shared/contact";

export const digitalDocumentation = {
  start: {
    title: "Dokumentation der Digitaltauglichkeit und EU-Interoperabilität",
    subtitle:
      "Die Dokumentation der Digitaltauglichkeit und ggf. EU-Interoperabilität (nach Verordnung (EU) 2024/903) ist ein formeller, letzter Schritt. Sie dokumentieren, auf welche Aspekte Sie besonders geachtet haben und wie diese ins Regelungsvorhaben eingeflossen sind, damit digitale Potenziale genutzt werden und europaweite Interoperabilität gelingen kann.",
    actions: {
      startInitial: {
        buttonText: "Dokumentation starten",
      },
      resume: {
        buttonText: "Dokumentation fortsetzen",
      },
      startOver: {
        buttonText: "Neue Dokumentation beginnen",
      },
    },
    startOverDialog: {
      title: "Neue Dokumentation beginnen",
      bodyMarkdown:
        "Mit einer neuen Dokumentation werden die Daten der begonnenen Dokumentation **gelöscht**. Diese können nicht wieder hergestellt werden.",
      actions: {
        confirm: "Neu beginnen",
      },
    },
    alternative: {
      text: "**Alternativ** können Sie die Dokumentation als Word-Datei herunterladen und bearbeiten. Folgen Sie dann den Anweisungen in der Datei.",
      buttonText: "Word-Vorlage herunterladen (.docx)",
    },
    noscript: {
      headline: "Erlauben Sie die Nutzung von JavaScript",
      content: dedent`
        Um die Dokumentation zu starten, müssen Sie Ihrem Browser die Nutzung von JavaScript erlauben. Das ist nötig, damit die Seite Ihre Daten zwischenspeichern kann.
        
        **So geht es:** Suchen Sie in den Einstellungen Ihres Browsers nach JavaScript und erlauben Sie die Nutzung.
      `,
    },
  },
  info: {
    headline: "Tragen Sie Daten zu Ihrem Regelungsvorhaben ein",
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
  },
  principlePages: {
    radioOptions: ["Ja, gänzlich oder teilweise", "Nein", "Nicht relevant"],
    errors: {
      answerError: "Bitte wählen Sie eine Option aus.",
    },
  },
  summary: {
    headline: "Prüfen Sie Ihre Angaben",
    text: "Bevor Sie die Dokumentation abschließen und zum NKR senden, prüfen Sie bitte Ihre Angaben und ändern Sie diese bei Bedarf.",
    buttonEdit: {
      text: "Bearbeiten",
      ariaLabelSuffix: " bearbeiten",
    },
    warnings: {
      missing: "Sie haben diesen Punkt noch nicht bearbeitet.",
      incomplete: "Sie haben diesen Punkt noch nicht vollständig bearbeitet.",
    },
  },
  finish: {
    heading: {
      text: "Dokumentation abschließen",
    },
    download: {
      heading: "Dokumentation herunterladen",
      content:
        "Laden Sie die ausgefüllte Dokumentation herunter, um sie abzustimmen oder an Ihre Prüfstelle zu senden.",
      contentNoPruefstelle: (_bundesland = "Ihr Bundesland") => dedent`
        Laden Sie Ihre Dokumentation zur weiteren Verwendung herunter.
      `,
      buttonText: "Word-Datei herunterladen (.docx)",
    },
    send: {
      heading: "Fertige Dokumentation an Prüfstelle senden",
      content: (nkrMail: string) => dedent`
        Senden Sie die Dokumentation als PDF per E-Mail an den Nationalen Normenkontrollrat (NKR): ${contact.mdMailToLink(nkrMail)}.

        - **Visualisierungen** und Skizzen sind gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.
        - Bei **Interoperabilitätsbezug** senden Sie eine Kopie der E-Mail mit der Dokumentation an ${contact.mdMailToLink(contact.interoperabilityEmail)}.

        Der NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine digital- und praxistaugliche Umsetzung.`,
      contentBundesland: (pruefstelleMail: string) => dedent`
        Senden Sie die Dokumentation als PDF per E-Mail an Ihre zuständige Prüfstelle: ${contact.mdMailToLink(pruefstelleMail)}.

        **Zudem sind Visualisierungen** und Skizzen gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.`,
    },
    done: "Damit ist der Digitalcheck für Sie beendet.",
  },
  actions: {
    saveDraft: {
      title: "Zwischenstand herunterladen (.docx)",
    },
    savingTip: "Ihre Daten werden automatisch im Browser gespeichert.",
  },
};
