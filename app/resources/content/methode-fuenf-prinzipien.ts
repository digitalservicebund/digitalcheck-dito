import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import {
  ROUTE_LANDING,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
} from "~/resources/staticRoutes";

export const methodsFivePrinciples = {
  title: "Fünf Prinzipien für digitaltaugliche Gesetzgebung",
  buttonText: "Beispiele betrachten",
  principles: [
    {
      label: "Prinzip",
      title: "Digitale Angebote für alle",
      description:
        "Bürgerinnen und Bürger, Mitarbeitende in Unternehmen und der Verwaltung sind an digitale Kommunikation gewöhnt und bevorzugen diese – sofern sie gut umgesetzt ist und ihren Bedürfnissen entspricht. Normadressat:innen können sie schnell und einfach nutzen, und auch die Verwaltung kann die Daten schneller bearbeiten, prüfen und dokumentieren. Digitale Kommunikation sollte dabei immer inklusiv sein und ggf. benötigt es analoge Alternativen.",
      implementation: [
        {
          action: "Ermöglichen Sie digitale Kommunikation",
          description:
            "Bürgerinnen und Bürger sind digitale Angebote gewohnt. Nutzerfreundliche, niedrigschwellige Dienste erfüllen ihre Erwartungen und machen ihnen das Leben leichter.",
          questions: [
            "Enthält die Regelung Schriftformerfordernisse oder erfordert persönliches Erscheinen?",
            "Können Vorlage- durch Vorhaltepflichten ersetzt werden?",
            "Wie werden die Informationen weiterverarbeitet?",
          ],
        },
        {
          action: "Formulieren Sie die Regelung technologieoffen",
          description:
            "Bestimmte Technologien können schnell nicht mehr dem Stand der Technik entsprechen und so nicht weiter genutzt werden. Andererseits kann es die Umsetzung erleichtern und zur einfacheren Nutzung führen, auf etablierte Basisdienste zurückzugreifen.",
          questions: [
            "Haben Sie spezifische Technologien festgeschrieben?",
            "Können Sie auf etablierte Lösungen zurückgreifen, sogenannte Basisdienste (s. Prinzip „Effiziente Umsetzung mit etablierten Technologien“)?",
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
            "Können verwaltungsinterne Medienbrüche ausgeräumt werden? Welche Technologien und Verfahren nutzt die umsetzenden Behörden?",
            "Kann die Datenqualität durch automatische Kontrollen erhöht werden?",
          ],
        },
        {
          action:
            "Denken Sie Barrierefreiheit und Nutzerfreundlichkeit von Anfang an mit",
          description:
            "Digitale Angebote lassen sich durch einfache Sprache, Mehrsprachigkeit oder andere Maßnahmen für Barrierefreiheit stärker auf die Bedürfnisse der Menschen zuschneiden. Denken Sie auch an die Bürgerinnen und Bürger, die keine digitalen Angebote nutzen können oder wollen. Richten Sie Alternativen ein. Für Unternehmen kann digitale Kommunikation vorgeschrieben werden.",
          questions: [
            "Kann weiterhin anderweitig (schriftlich, telefonisch, persönlich) kommuniziert werden?",
            "Wenden die umsetzenden Akteure den Servicestandard an? Dieser stellt eine nutzerzentrierte Entwicklung sicher.",
          ],
          wording:
            "„Die Beratung erfolgt in einer für den Leistungsberechtigten wahrnehmbaren Form“ (§106 Abs. 1 SGB IX)",
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Rechtliche Konsistenz ermöglicht Datenwiederverwendung",
      description:
        "Daten wiederzuverwenden vermeidet Fehler und spart Zeit und Kosten auf Seiten der Normadressat:innen und umsetzenden Behörden. Die Grundlage dafür sind harmonisierte Rechtsbegriffe, ein datenschutz-konformer Austausch sowie technische Standards.",
      implementation: [
        {
          action: "Nutzen Sie harmonisierte Rechtsbegriffe",
          description:
            "Damit Daten wiederverwendet werden können, müssen sie die gleiche, inhaltliche Bedeutung haben, d.h. semantisch interoperabel sein. Dafür müssen die verwendeten Rechtsbegriffe harmonisch, d.h. einheitlich, verwendet werden. Möglicherweise müssen Sie die Begriffe sogar über einen Rechtsbereich hinaus harmonisieren. Hilfreich für die Umsetzung sind Taxonomien, kontrollierten Vokabularien, oder Thesauri.",
          questions: [
            "Benutzen Sie innerhalb ihres Vorhabens Begriffe die einer Definition benötigen, wie z.B. „Einkommen“ oder „Kind“? Definieren Sie diese selbst oder nutzen sie ein bereits existierende Definition?",
            "Haben diese Begriffe innerhalb und außerhalb ihres Rechtsbereichs die gleiche Bedeutung? Ist eine übergreifende Harmonisierung nötig?",
            "Haben Sie ggf. auch die Konsistenz zu anderen EU-Regelwerken betrachtet?",
          ],
        },
        {
          action: "Stellen Sie die Wiederverwendung von Daten sicher",
          description:
            "Bevor Daten neu erhoben werden, sollten Sie überprüfen, ob diese schon an anderer Stelle zur Verfügung stehen und genutzt werden können. Für einen möglichen Datenaustausch zwischen Behörden muss dann eine geeignete Rechtsgrundlage geschaffen werden. Müssen neue Daten erhoben werden, sollten Überlegungen angestellt werden, wie man Hürden für eine spätere Wiederverwendung der Daten abbaut.",
          questions: [
            "Welche Daten existieren schon in der Verwaltung und können wiederverwendet werden? Können öffentliche Daten verwendet werden? Recherchieren Sie auf verwaltungsdaten-informationsplattform.de oder GovData.de.",
            "Genügen die Daten Anforderungen an Qualität und Aktualität oder sollten Kontrolldaten erhoben werden?",
            "Sind die Voraussetzungen des Datenschutzes beachtet? Nutzen Sie frühzeitig Kontakt zu entsprechenden Behörde oder Ansprechpersonen im Haus.",
            "Stehen der transeuropäischen (Nach-)nutzung der Daten rechtliche Beschränkungen im Weg? Gibt es klare, passende Lizenzmodelle?",
          ],
        },
        {
          action: "Nutzen Sie bestehende technische Standards",
          description:
            "Nutzen Sie geeignete technische Standards, wie z.B. Datenaustauschformate, um den Austausch zwischen IT-Systemen zu begünstigen. Möglicherweise ist es sinnvoll, diese in der Regelung vorzuschreiben.",
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
            "Schreiben Sie die Nutzung etablierter, öffentlicher Technologien vor",
          description:
            "Diese Technologien sind z.B. öffentliche Basisdienste, Softwarearchitekturen oder Komponentenbibliotheken umfassen. Ihre Wiederverwendung spart Zeit und verringert den Erfüllungsaufwand für Entwicklung und Betrieb. Darüberhinaus verbessert die Nutzung einheitlicher Systeme die Zusammenarbeit zwischen Behörden und vertraute Benutzeroberflächen vereinfachen die Bedienung.",
          questions: [
            "Existieren für die beschriebenen digitalen Prozesse bereits etablierte, technische Lösungen? Werden diese genutzt bzw. ermöglicht das Gesetz den einfachen Anschluss an bereits vorhandene digitale Systeme?",
            "Werden europäische Standards wie eIDAS beachtet?",
            "Wurde untersucht, ob bereits existierende europäische Interoperabilitätslösungen wiederverwendet werden könnten?",
          ],
        },
        {
          action:
            "Bevorzugen Sie Open-Source-Software und offene Spezifikationen",
          description:
            "Wo möglich, sollten Open-Source-Software und offenen Spezifikationen bevorzugt werden oder neue Technologien quelloffen entwickelt werden, um Transparenz und Wiederverwendbarkeit zu stärken. Dies ermöglicht die Nachvollziehbarkeit einer Lösung und verhindert “Lock-in” Effekte.",
          questions: [
            "Wird der Einsatz von Open-Source ermöglicht und gefördert?",
            "Wird ggf. bei Neuentwicklung quelloffenheit vorgeschrieben?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Eindeutige Regelungen und Automatisierung",
      description:
        "Logische und verständliche Regelungen und transparente Verfahren erleichtern den Zugang zum Recht und stärken das Vertrauen in den Staat. Sie bilden die Grundlage für (teil-)automatisierte Prozesse. Einmal abgestimmt und aufgesetzt, sparen einheitliche Rechtsbegriffe, klare Entscheidungsstrukturen und die dadurch ermöglichte (Teil-)Automatisierung Zeit und Geld auf Seiten der Normadressaten und der Verwaltung. Diese Ressourcen können genutzt werden, um kritischere Einzelfälle zu bearbeiten oder Normadressat:innen zu beraten.",
      implementation: [
        {
          action: "Schreiben Sie einfach, eindeutig und konsistent",
          description:
            "Logische Konsistenz und präzise Sprache ist eine notwendige Bedingung für die Automatisierung. Dass eine Regelung eindeutig ist, kann auch einen längeren Regelungstext bedeuten.",
          questions: [
            "Falls ein Verwaltungsprozess betroffen ist: Lassen sich die Teilschritte in einer chronologische Reihenfolge abbilden?",
            "Basieren Entscheidungslogiken auf objektiven Kriterien basieren? Sind sie widerspruchsfrei?",
          ],
        },
        {
          action:
            "Verzichten Sie möglichst auf Ausnahmen und Ermessensspielraum",
          description:
            "Es sollte möglichst auf Ausnahmen und Ermessensspielräume verzichtet werden, außer diese führen zu einer gerechteren Regelung. ",
          questions: [
            "Wird in der Regelung klar zwischen grundlegender Regel und Ausnahmen unterschieden?",
            "Sind verbleibende Ermessensspielräume unabdingbar?",
            "Ist trotz Ermessensspielräumen noch eine Teilautomatisierung einiger Prozessschritte möglich?",
            "Können Pauschalen die Regelung und Umsetzung vereinfachen?",
            "Sind in den umsetzenden Behörden genug Ressourcen vorhanden, um z.B. Anträge fristgerecht zu bearbeiten?",
          ],
        },
        {
          action: "Beachten Sie bestehende Prozesse und Verantwortlichkeiten",
          description:
            "Um eine effektive Umsetzung zu gewährleisten, sollten existierende Prozesse und Verantwortlichkeiten beachtet werden.",
          questions: [
            "Führt die verbindliche Anforderung zur Angleichung von Verwaltungsprozessen oder Verantwortlichkeiten?",
            "Bekommt eine Behörde mehr/weniger Kompetenzen und wie wirkt sich das aus?",
          ],
        },
        {
          action: "Ermöglichen Sie Automatisierung",
          description:
            "Für eine automatische Bearbeitung muss eine geeignete Rechtsgrundlage geschaffen werden. Geeignete Anwendungsfälle, bei denen Automatisierung vor allem möglich gemacht werden sollte, sind gebundene Entscheidungen und Prozesse mit großen Bearbeitungsfallzahlen.",
          questions: [
            "Handelt es sich um eine gebundene Entscheidung?",
            "Wie groß ist die erwartete Fallzahl pro Jahr?",
            "Erlaubt die Regelung eine automatisierte Fallbearbeitung? Ist ein komplett antragloses Verfahren möglich?",
            "Sind Anforderungen an den Datenschutz eingehalten?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Datenschutz und Informationssicherheit schaffen Vertrauen",
      description:
        "Wenn personenbezogene Daten und andere Informationen den ihnen gebührenden Schutz erhalten, schafft das Vertrauen in den Staat. Außerdem wird so die Gefahr von Missbrauch und negativen wirtschaftlichen oder sicherheitsrelevaten Konsequenzen verringert.",
      implementation: [
        {
          action: "Gewährleisten Sie den Datenschutz",
          description:
            "Für den Datenschutz sind nur personenbezogene Daten relevant. Um sie zu erheben und zu verarbeiten, muss eine geeignete Rechtsgrundlage existieren. Wenn Ihre Regelung datensparsam ist, also möglichst wenig Daten erhebt, wird sie den Anforderungen des Datenschutzes gerecht und der Erfüllungsaufwand verringert.",
          questions: [
            "Werden personenbezogene Daten erhoben bzw. ausgetauscht? Sind diese besonders schützenswert, etwa Daten zur ethnischen Herkunft oder Gesundheitsdaten?",
            "Werden nur notwendige Daten erhoben bzw. ausgetauscht?",
            "Haben Sie die rechtliche Basis geschaffen, um Daten zu erheben, bzw. auszutauschen? Ist der Zweck der Datenerhebung dargelegt?",
            "Werden veraltete Datenschutzbedürfnisse identifiziert und abgeschafft?",
            "Genügt die Regelung den Anforderungen an den Datenschutz in allen beteiligten Ländern und Institutionen, ggf. auch auf EU-Ebene?",
          ],
        },
        {
          action: "Stellen Sie die Informationssicherheit sicher",
          description:
            "Informationssicherheit betrifft alle Daten, vor allem wirtschafts- oder sicherheitsrelevante. Alle Daten müssen sicher gespeichert und übertragen werden. Hier sollten Empfehlungen des BSI befolgt werden. Dies erschwert den missbräuchlichen Zugriff, etwa zum Erschleichen von Leistungen.",
          questions: [
            "Werden eine geeignete, sichere Datenhaltung und sichere Übertragungswege vorgeschrieben?",
            "Wurden Mittel vorgeschrieben, um Betrugsversuche zu erschweren?",
            "Wurden veraltete Informationssicherheitsbedürfnisse identifiziert und abgeschafft?",
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
