import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import {
  ROUTE_LANDING,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methodsFivePrinciples = {
  title: "Fünf Prinzipien für digitaltaugliche Gesetzgebung",
  buttonText: "Beispiele betrachten",
  principles: [
    {
      label: "Prinzip",
      title: "Digitale Angebote für alle",
      description:
        "Bürgerinnen und Bürger, Mitarbeitende in Unternehmen und der Verwaltung sind an digitale Kommunikation gewöhnt und bevorzugen sie – sofern Sie gut umgesetzt ist und ihren Bedürfnissen entspricht. Normadressaten können sie schnell und einfach  nutzen, und auch die Verwaltung kann die Daten schneller bearbeiten, prüfen und dokumentieren. Digitale Kommunikation sollte dabei immer inklusiv sein und ggf. analoge Alternativen bereitstellen.",
      implementation: [
        {
          action: "Ermöglichen Sie digitale Kommunikation",
          description:
            "Bürger:innen sind digitale Angebote gewohnt. Nutzerfreundliche, niedrigschwellige Dienste erfüllen ihre Erwartungen und machen ihnen das Leben leichter.",
          questions: [
            "Enthält die Regelung Schriftformerfordernisse oder erfordert persönliches Erscheinen?",
            "Können Vorlage- durch Vorhaltepflichten ersetzt werden?",
          ],
        },
        {
          action: "Formulieren Sie die Regelung technologieoffen",
          description:
            "Bestimmte Technologien können schnell nicht mehr dem Stand der Technik entsprechen und so nicht weiter genutzt werden. Andererseits kann es die Umsetzung erleichtern und zur einfacheren Nutzung führen, auf etablierte Basisdienste zurückzugreifen.",
          questions: [
            "Haben Sie spezifische Technologien festgeschrieben?",
            "Können Sie auf etablierte Infrastruktur zurückgreifen, sogenannte Basisdienste?",
          ],
          wording:
            "„Der Antrag ist elektronisch oder schriftlich zu stellen“, oder „Der Antrag ist zu stellen“.",
        },
        {
          action: "Denken Sie über die digitale Antragstellung hinaus",
          description:
            "Digitale Kommunikation führt zu Daten, die direkt digital weiterverarbeitet werden können. Das spart Zeit, weil Informationen nicht eingescannt oder abgetippt werden müssen. Digitale Oberflächen, die zusätzliche Hilfestellungen und Fehlerkontrollen enthalten, erhöhen die Qualität der Daten.",
          questions: [
            "Wer übermittelt im Zuge der Regelung Informationen wie an wen? Beachtet die Regelung auch Kommunikation zwischen Behörden oder Unternehmen?",
            "Können verwaltungsinterne Medienbrüche ausgeräumt werden? Welche Technologien und Verfahren nutzt die umsetzende Behörde?",
            "Kann die Datenqualität durch automatische Kontrollen erhöht werden?",
          ],
        },
        {
          action:
            "Denken Sie Barrierefreiheit und Nutzerfreundlichkeit von Anfang an mit",
          description:
            "Digitale Angebote lassen sich durch einfache Sprache, Mehrsprachigkeit oder andere Maßnahmen für Barrierefreiheit stärker auf die Bedürfnisse der Menschen zuschneiden. Denken Sie auch an die Bürger:innen, die keine digitalen Angebote nutzen können oder wollen. Richten Sie Alternativen ein. Für Unternehmen kann digitale Kommunikation vorgeschrieben werden.",
          questions: [
            "Kann weiterhin anderweitig (schriftlich, telefonisch, persönlich) kommuniziert werden?",
          ],
          wording:
            "„Die Beratung erfolgt in einer für den Leistungsberechtigten wahrnehmbaren Form“ (§106 Abs. 1 SGB IX)",
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Daten wiederverwenden mit Hilfe rechtlicher Konsistenz",
      description:
        "Daten wiederzuverwenden vermeidet Fehler und spart Zeit und Kosten auf Seiten der Normadressanten und umsetzenden Behörden. Die Grundlage dafür sind harmonisierte Rechtsbegriffe, ein datenschutz-konformer Austausch, sowie technische Standards.",
      implementation: [
        {
          action: "Nutzen Sie harmonisierte Rechtsbegriffe",
          description:
            "Damit Daten wiederverwendet werden können, müssen sie die gleiche, inhaltliche Bedeutung haben, d.h. semantisch interoperabel sein. Dafür müssen die verwendeten Rechtsbegriffe harmonisch, d.h. einheitlich, verwendet werden. Möglicherweise müssen Sie die Begriffe sogar über einen Rechtsbereich hinaus harmonisieren. Hilfreich sind Taxonomien, kontrollierten Vokabularien, oder Thesauri.",
          questions: [
            "Gibt es für Ihren Rechtsbegriffe definierte Begriffe, auf die Sie zurückgegriffen haben, wie z.B. „Einkommen“ oder „Kind“?",
            "Haben Sie verwendete Begriffe innerhalb ihres Vorhabens definiert?",
            "Werden diese Begriffe außerhalb Ihres Rechtsbereich anders genutzt? Ist eine übergreifende Harmonisierung möglich?",
            "Haben Sie ggf. auch die Konsistenz zu anderen EU-Regelwerken betrachtet?",
          ],
        },
        {
          action: "Nutzen Sie bestehende Daten",
          description:
            "Bevor gesetzliche Regelungen das Erheben neuer Daten erfordern, sollten Sie überprüfen, ob diese schon an anderer Stelle zur Verfügung stehen und genutzt werden können.",
          questions: [
            "Welche Daten existieren schon in der Verwaltung und können wiederverwendet werden? Können öffentliche Daten verwendet werden? Recherchieren Sie auf verwaltungsdaten-informationsplattform.de oder GovData.de.",
            "Genügen die Daten Anforderungen an Qualität und Aktualität oder sollten Kontrolldaten erhoben werden?",
          ],
        },
        {
          action: "Nutzen Sie bestehende technische Standards",
          description:
            "Nutzen Sie geeignete technische Standards, wie z.B. Datenaustauschformate. Möglicherweise ist es sinnvoll, diese in der Regelung vorzuschreiben.",
          questions: [
            "Welche Standards für die Daten existieren bereits oder muss ggf. ein neuer entwickelt werden?",
            "Wurde beachtet, wie die Daten übertragen werden sollen?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Effiziente Umsetzung mit etablierten Technologien",
      description:
        "Digitale Angebote können schneller bereitgestellt und günstiger entwickelt und betrieben werden, wenn auf Bestehendes aufgebaut wird. Offene, standardisierte Schnittstellen und Open-Source erhöhen die Sicherheit der Angebote und fördern die Interoperabilität.",
      implementation: [
        {
          action:
            "Schreiben Sie die Nutzung etablierter, öffentlicher Technologien vor.",
          description:
            "Diese Technologien sind z.B. öffentliche Basisdienste, Softwarearchitekturen oder Komponentenbibliotheken umfassen. Ihre Wiederverwendung spart Zeit und verringert den Erfüllungsaufwand für Entwicklung und Betrieb. Darüberhinaus verbessert die Nutzung einheitlicher Systeme die Zusammenarbeit zwischen Behörden und vertraute Benutzeroberflächen vereinfachen die Bedienung.",
          questions: [
            "Existieren für die beschriebenen digitalen Prozesse bereits etablierte, technische Lösungen und werden diese genutzt bzw. ermöglicht das Gesetz den einfachen Anschluss an bereits vorhandene digitale Systeme?",
            "Können Vorlage- durch Vorhaltepflichten ersetzt werden?",
          ],
        },
        {
          action:
            "Bevorzugen Sie Open-Source-Software und offene Spezifikationen",
          description:
            "Wo möglich, sollten Open-Source-Software und offenen Spezifikationen bevorzugt werden oder neue Technologien quelloffen entwickelt werden, um Transparenz und Wiederverwendbarkeit zu stärken.",
          questions: [
            "Wird der Einsatz von Open-Source ermöglicht und gefördert?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Automatisierung mit eindeutigen Regelungen ermöglichen",
      description:
        "Die Vorteile von automatisierten Prozessen liegen auf der Hand: Einmal aufgesetzt, sparen sie Zeit und Geld auf Seiten der Normadressat:innen und der Verwaltung. Diese Ressourcen können genutzt werden, um Einzelfälle zu bearbeiten. Logische und verständliche Regelungen und transparente Verfahren erleichtern außerdem den Zugang zum Recht und stärken das Vertrauen in den Staat.",
      implementation: [
        {
          action: "Schreiben Sie einfach, eindeutig und konsistent",
          description:
            "Dass eine Regelung eindeutig ist, kann auch einen längeren Regelungstext bedeuten.",
          questions: [
            "Falls ein Verwaltungsprozess betroffen ist: Lassen sich die Teilschritte in einer chronologische Reihenfolge abbilden?",
            "Basieren Entscheidungslogiken auf objektiven Kriterien basieren? Sind sie widerspruchsfrei?",
          ],
        },
        {
          action:
            "Verzichten Sie möglichst auf Ausnahmen und Ermessensspielraum",
          description:
            "Geeignete Anwendungsfälle, bei denen Automatisierung vor allem möglich gemacht werden sollte, sind gebundene Entscheidungen und Prozesse mit großen Bearbeitungsfallzahlen. Es sollte möglichst auf Ausnahmen verzichtet werden, außer diese führen zu einer gerechteren Regelung. ",
          questions: [
            "Ist es möglich, Pauschalen zu nutzen?",
            "Wird in der Regelung klar zwischen grundlegender Regel und Ausnahmen unterschieden?",
            "Ist trotz Ermessensspielräumen noch eine Teilautomatisierung möglich? Welche Prozess-Schritte lassen sich trotzdem automatisieren?",
            "Sind in den umsetzenden Behörden genug Ressourcen vorhanden, um z.B. Anträge fristgerecht zu bearbeiten?",
          ],
        },
        {
          action: "Beachten Sie bestehende Prozesse und Verantwortlichkeiten",
          description: "Einleitung",
          questions: [
            "Führt die verbindliche Anforderung zur Angleichung von Verwaltungsprozessen oder Verantwortlichkeiten?",
            "Bekommt eine Behörde mehr/weniger Kompetenzen und wie wirkt sich das aus?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Vertrauen schaffen durch Datenschutz & Informationssicherheit",
      description:
        "Wenn personenbezogene Daten und andere Informationen den ihnen gebührenden Schutz erhalten, schafft das Vertrauen in den Staat. Außerdem wird so die Gefahr von Missbrauch und negativen wirtschaftlichen oder sicherheitsrelevaten Konsequenzen verringert.",
      implementation: [
        {
          action: "Gewährleisten Sie den Datenschutz",
          description: dedent`
            Für den Datenschutz sind nur personenbezogene Daten relevant. Für deren Erhebung und Verarbeitung muss eine geeignete Rechtsgrundlage existieren. Ein besonderes Augenmerk sollte hier auf die Verarbeitung sensibler Daten wie ethnischer Herkunft oder Gesundheitsdaten gelegt werden.
            
            Durch Datensparsamkeit wird die Regelung nicht nur den Anforderungen des Datenschutzes gerecht, sondern auch der Erfüllungsaufwand auf Seiten der Normadressaten als auch für die umsetzenden Akteure verringert.`,
          questions: [
            "Werden personenbezogene Daten erhoben bzw. ausgetauscht? Sind diese besonders schützenswert?",
            "Werden nur die absolut notwendigen Daten erhoben bzw. ausgetauscht?",
            "Gibt es für die Erhebung/den Austausch/die Verarbeitung die notwendige rechtliche Basis? Legt diese den Zweck der Datenerhebung dar?",
          ],
        },
        {
          action: "Stellen Sie die Informationssicherheit sicher",
          description:
            "Informationssicherheit betrifft alle Daten, vor allem aber solche mit Wirtschafts- oder Sicherheitsrelevanz. Alle Daten müssen sicher gespeichert und übertragen werden, hier sollten unter anderem Empfehlungen des BSI befolgt werden. Die Umsetzung geeigneter Informationsarchitekturen erschwert den mißbräuchlichen Zugriff und z.B. das betrügerische Erschleichen von Leistungen.",
          questions: [
            "Wurden Mittel vorgeschrieben, um Betrugsversuche zu erschweren?",
          ],
        },
      ],
    },
  ],
  nextStepMethods: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "2.5. Technische Umsetzbarkeit sicherstellen",
    text: `Analysieren Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende und neue Abläufe und IT-Systeme. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der umsetzenden Akteurinnen und Akteure zurück.`,
    buttons: [
      {
        look: "tertiary" as const,
        text: "IT-Auswirkungen prüfen",
        href: ROUTE_METHODS_TECHNICAL_FEASIBILITY.url,
      },
    ],
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "Vorprüfung: Digitalbezug einschätzen",
    text: `Finden Sie heraus, ob Sie in Ihrem Regelungsvorhaben auf Aspekte der digitalen Umsetzung achten müssen. Danach entscheidet sich, ob die weiteren Schritte für Sie relevant sind.`,
    buttons: [
      {
        text: "Digitalbezug einschätzen",
        href: ROUTE_LANDING.url,
        look: "tertiary" as const,
      },
    ],
  },
};
