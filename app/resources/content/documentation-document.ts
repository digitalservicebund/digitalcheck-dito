import { dedent } from "~/utils/dedentMultilineStrings";
import { contact } from "./shared/contact";

export const documentationDocument = {
  filename: "Dokumentation_der_Digitaltauglichkeit.docx",
  placeholder: "Hier ausfüllen",
  placeholderOptional: "Hier ausfüllen (falls relevant)",
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
      - **Senden** Sie die von Ihnen erstellte Dokumentation als PDF per E-Mail an folgende Adresse: ${contact.mdMailToLink(contact.nkrEmail)}. Der NKR (Nationaler Normenkontrollrat) prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird der NKR auf Sie zukommen.
      - **Bei Interoperabilitätsbezug** senden Sie eine Kopie der E-Mail mit der PDF-Datei an ${contact.mdMailToLink(contact.interoperabilityEmail)}.
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
      content: `Rufen Sie uns an: ${contact.mdPhoneLink()} oder schreiben Sie uns unter: ${contact.mdMailToLink(contact.email)}.`,
    },
  },
  brandenburg: {
    nextSteps: {
      heading: "Das ist jetzt zu tun",
      instructions: dedent`
        - **Speichern** Sie die Dokumentation als **PDF**
        - **Senden** Sie die von Ihnen erstellte Dokumentation als PDF per E-Mail an folgende Adresse: [zbr@mdj.brandenburg.de](mailto:zbr@mdj.brandenburg.de). Die Zentralstelle bessere Rechtsetzung prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird die Zentralstelle bessere Rechtsetzung auf Sie zukommen.
        - **Visuelle Darstellungen** und Skizzen sind gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.
        - Damit ist der Digitalcheck für Sie beendet.
      `,
      zbrInfo: {
        heading:
          "Gut zu wissen: Das prüft die Zentralstelle bessere Rechtsetzung",
        content:
          "Die Zentralstelle bessere Rechtsetzung prüft das Regelungsvorhaben auf Möglichkeiten der digitalen Umsetzung. Die Basis ist der von Ihnen durchgeführte Digitalcheck. Das wesentliche Prüfkriterium ist die methodische und inhaltliche Nachvollziehbarkeit. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson in der Zentralstelle bessere Rechtsetzung auf Sie zu.",
      },
      support: {
        heading: "Sie haben Fragen oder benötigen Unterstützung?",
        content:
          "Schreiben Sie uns unter: [zbr@mdj.brandenburg.de](mailto:zbr@mdj.brandenburg.de).",
      },
    },
  },
};
