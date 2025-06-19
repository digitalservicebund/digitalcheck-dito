import { steps } from "~/resources/content/shared/naechste-schritte";
import { ROUTE_DOCUMENTATION_STATIC_PDF } from "~/resources/staticRoutes";

export const documentation = {
  title: "3. Dokumentieren der Digitaltauglichkeit",
  subtitle: `Sie dokumentieren in einem Fragebogen, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben. Und wie Sie diese in Ihr Regelungsvorhaben einfließen lassen.`,
  buttons: [
    {
      // NOTE: 70-tage replace pdf with word document
      text: "Dokumentation herunterladen (Word-Datei)",
      href: ROUTE_DOCUMENTATION_STATIC_PDF.url,
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
        heading: "Beginnen Sie so früh wie möglich",
        content: `Schicken Sie die begleitende Dokumentation so früh wie möglich an Ihre Ansprechperson im NKR-Sekretariat, **spätestens mit der Einleitung der Ressortabstimmung**. Fügen Sie die Dokumentation des Digitalcheck und Visualisierungen des Umsetzungsprozesses gerne auch der Ressortabstimmung bei, damit Ihre Kolleginnen und Kollegen Ihre Entscheidungen nachvollziehen können.`,
      },
      {
        heading: "Das prüft der Nationale Normenkontrollrat",
        content: `Der NKR prüft das Regelungsvorhaben auf Möglichkeiten der digitalen Umsetzung auf Basis des von Ihnen durchgeführten Digitalcheck. Das wesentliche Prüfkriterium ist die methodische und inhaltliche Nachvollziehbarkeit. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu.`,
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
