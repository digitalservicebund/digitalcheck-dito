import { dedent } from "~/utils/dedentMultilineStrings";

export const documentationDocument = {
  introduction: {
    title: "Dokumentation der Digitaltauglichkeit",
    exportDate: "Export erstellt am",
    projectTitle: {
      heading: "Titel des Regelungsvorhabens",
    },
    participationFormats: {
      heading: "Beteiligungsformate",
      question1:
        "Entspricht die Umsetzung des Regelungsvorhabens den Bedürfnissen der Betroffenen? Wie haben Sie das überprüft?",
      question2:
        "Wie spiegeln sich die Erkenntnisse, die durch die oben genannten Schritte gewonnen wurde, im Regelungsvorhaben wider?",
    },
  },
  principle: {
    implementationQuestion:
      "Lässt sich das Vorhaben im Sinne des Prinzips umsetzen?",
  },
  aspect: {
    paragraphsLabel: "Paragrafen",
    explanationLabel: "Erläuterung",
  },
  nextSteps: {
    heading: "Das ist jetzt zu tun",
    instructions: dedent`
      - **Speichern** Sie die Dokumentation als **PDF**
      - **Senden** Sie die von Ihnen erstellte Dokumentation als PDF per E-Mail an folgende Adresse: [nkr@bmj.bund.de](mailto:nkr@bmj.bund.de). Der NKR (Nationaler Normenkontrollrat) prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird der NKR auf Sie zukommen.
      - **Bei Interoperabilitätsbezug** senden Sie eine Kopie der E-Mail mit der PDF-Datei an [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de).
      - **Visuelle Darstellungen** und Skizzen sind vom NKR gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.
      - Damit ist der Digitalcheck für Sie beendet.
    `,
    nkrInfo: {
      heading: "Gut zu wissen: Das prüft der Nationale Normenkontrollrat",
      content:
        "Der NKR prüft das Regelungsvorhaben auf Möglichkeiten der digitalen Umsetzung. Die Basis ist der von Ihnen durchgeführte Digitalcheck. Das wesentliche Prüfkriterium ist die methodische und inhaltliche Nachvollziehbarkeit. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu. ",
    },
    support: {
      heading: "Sie haben Fragen oder benötigen Unterstützung? ",
      content:
        "Rufen Sie uns an: 0151 4076 7839 oder schreiben Sie uns unter: [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de).",
    },
  },
};
