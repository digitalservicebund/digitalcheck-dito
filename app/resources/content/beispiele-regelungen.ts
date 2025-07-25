import { dedent } from "~/utils/dedentMultilineStrings";

export const examplesRegelungen = {
  subtitle: [
    "Hier finden Sie alles zur Digitaltauglichkeit dieser Regelung.",
    "Inhalt",
  ],
  infoLabels: ["Fassung vom", "Aktuelle Fassung", "Ressort"],
  infoTitle: "Hinweis",
  infoText:
    "Markierte Formulierungen sind gute Beispiele für die Ermöglichung digitaler Umsetzung, trotz ausstehender Verabschiedung.",
  visualisations: {
    tabName: "Visualisierung",
    title: "Visualisierungen",
    subtitle:
      "Diese Visualisierungen haben dem Referat geholfen Digitaltauglichkeit zu erstellen und den Sachverhalt zu kommunizieren.",
    button: "Vergrößern",
    imageInfo: {
      type: "Art der Visualisierung:",
      tool: "Software zur Erstellung:",
      legalArea: "Rechtsbereich:",
      publishedOn: "Veröffentlicht am:",
      law: "Regelung:",
      digitalCheck: "Digitalcheck",
      department: "Ressort:",
    },
  },
  principles: {
    hero: {
      title: "Die Prinzipien im Regelungstext",
      subtitle:
        "Hier finden Sie Regelungsbeispiele zur Anwendung der Prinzipien.",
    },
    prinzipBadge: "Prinzip",
    tabName: "Formulierungen",
    title: "Formulierungen aus der Regelung",
  },
  nkr: {
    tabName: "NKR Stellungnahme",
    title: "NKR Stellungnahme",
    subtitle: "Diese Ausführungen sind der Stellungnahme des NKR entnommen.",
    linkText: "Die ganze Stellungnahme können Sie hier finden: ",
  },
  yourExample: {
    title: "Sie möchten Ihr Beispiel hier sehen?",
    text: dedent`
      Wir nehmen gerne Vorschläge für Beispiele entgegen. Wenn Sie einen digitaltauglichen Regelungstext oder eine Visualisierung haben, nutzen Sie ganz einfach unser Formular. Dort können Sie Beispiele schnell selbst übermitteln.
      [Vorschlag übermitteln](https://docs.google.com/forms/d/1qlGk9fRqxs9QZq6h1nbQ0CRhvoxVv-1I3KVylOyGVhU/edit)
  
      Oder schreiben Sie uns eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Beispiel:%20Digitaltauglichkeit). Wir melden uns zeitnah bei Ihnen.
   `,
  },
};
