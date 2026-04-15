import { Apps, Layers } from "@digitalservicebund/icons";
import { assetPath } from "~/utils/assetPath";
import { dedent } from "~/utils/dedentMultilineStrings";

export const interoperability = {
  headline: "EU-Interoperabilität für ein digital vernetztes Europa",
  content:
    "Hier erfahren Sie, was die Verordnung für ein interoperables Europa (EU) 2024/903 für Ihr Regelungsvorhaben bedeutet und wie sie zu einem vernetzten Europa beiträgt.",
  andDigitalReadiness: {
    id: "digitaltauglich",
    headline: "Vernetzte Verwaltungen für Europa",
    content: dedent`
        Stellen Sie sich ein digitales Europa ohne Grenzen vor. Ziel der [Verordnung für ein interoperables Europa (EU) 2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) ist es, diese Vision Realität werden zu lassen. Bürgerinnen, Bürger und Unternehmen sollen digitale Verwaltungsleistungen nahtlos in allen EU-Ländern nutzen können. Der digitale Datenaustausch über Landes- und Sektorengrenzen hinweg wird zur Norm. Grenzüberschreitende Verwaltungsakte, wie ein Umzug in einen anderen Mitgliedstaat oder die Gründung eines Unternehmens im Ausland, lassen sich so einfach und vollständig online erledigen. Das steigert die Effizienz für alle Beteiligten und schafft einen einheitlichen digitalen Raum.
    `,
    image: {
      url: assetPath(
        "/images/zusammenhang-interoperabilitaet-und-digitaltauglichkeit.png",
      ),
      alternativeText:
        "Interoperabilität wird als großer Kreis dargestellt, der einen kleineren Kreis mit digitaltauglichen Regelungen umschließt. Dies zeigt, dass digitaltaugliche Regelungen ein Teil der Interoperabilität sind.",
    },
  },
  resources: {
    id: "ressourcen",
    headline: "Ressourcen und Links zu Interoperabilität",
    subtitle:
      "Hier finden Sie alle relevanten Links und Ressourcen zu den Anforderungen der EU an Interoperabilität, die für Ihre Regelung relevant sind.",
    groups: [
      {
        title: "Allgemein",
        icon: Apps,
        subtitle:
          "Hier finden Sie die wichtigsten Informationen zu der EU-Verordnung.",
        content: dedent`
          - [Verordnung für ein interoperables Europa (EU) 2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
          - [Ressourcen auf dem Interoperable Europe Portal](https://interoperable-europe.ec.europa.eu/): Hier finden sich zusätzliche Informationen, Best Practices und Tools zur Unterstützung bei der Durchführung von Interoperabilitätsbewertungen.
        `,
      },
      {
        title: "Interoperabilitätsbewertungen",
        icon: Layers,
        subtitle:
          "Hier finden Sie die wichtigsten Informationen zu Interoperabilitätsbewertungen.",
        content: dedent`
          - [Interoperabilitätsrahmen](https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/solution/european-interoperability-framework-eif-toolbox): Rahmenwerk mit Prinzipien zur Erarbeitung von interoperablen Regelungen
          - [Leitlinien für Interoperabilitätsbewertungen](https://interoperable-europe.ec.europa.eu/sites/default/files/custom-page/attachment/2025-05/DIGIT-2024-00047-00-00-DE-TRA-00.pdf): Anleitung zur Bewertung der Interoperabilität in Regelungen
        `,
      },
    ],
  },
};
