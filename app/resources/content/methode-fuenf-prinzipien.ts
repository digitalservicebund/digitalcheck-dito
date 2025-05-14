import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import {
  ROUTE_LANDING,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
} from "~/resources/staticRoutes";

export const methodsFivePrinciples = {
  title: "Chancen und Hindernisse der digitalen Umsetzung identifizieren",
  subTitle:
    "Die folgenden Prinzipien helfen Ihnen dabei, Chancen der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen. Nutzen Sie die Prinzipien auch, um mit beteiligten Akteurinnen und Akteuren über die Umsetzung zu sprechen.\n\nWelche Prinzipien besonders wichtig sind und wie Sie diese anwenden, hängt vom Inhalt Ihres Vorhabens ab und davon, ob es sich um ein Gesetz oder eine Verordnung handelt.",
  buttonText: "Beispiele betrachten",
  principles: [
    {
      label: "Prinzip",
      title: "Digitale Angebote für alle",
      description:
        "Viele Bürgerinnen, Bürger und Unternehmen sind an digitale Kommunikation gewöhnt und bevorzugen diese – sofern sie gut umgesetzt ist und ihren Bedürfnissen entspricht. Auch die Verwaltung kann digitale Daten schneller prüfen, bearbeiten und dokumentieren. Digitale Kommunikation sollte dabei immer inklusiv sein und braucht ggf. analoge Alternativen.",
      implementation: [
        {
          action: "Ermöglichen Sie digitale Kommunikation",
          description:
            "Bürgerinnen und Bürger sind digitale Angebote gewohnt. Nutzerfreundliche, niedrigschwellige Dienste erfüllen ihre Erwartungen und machen ihnen das Leben leichter. Denken Sie auch an Bürgerinnen und Bürger, die keine digitalen Angebote nutzen können oder wollen. Richten Sie Alternativen ein. Für Unternehmen kann digitale Kommunikation vorgeschrieben werden.",
          questions: [
            "Enthält die Regelung Schriftformerfordernisse oder erfordert persönliches Erscheinen?",
            "Kann auf das Einreichen von Dokumenten verzichtet werden? Kann eine Vorlagepflicht durch eine Vorhaltepflicht ersetzt werden?",
            "Kann weiterhin anderweitig (schriftlich, telefonisch, persönlich) kommuniziert werden?",
          ],
        },
        {
          action: "Formulieren Sie die Regelung technologieoffen",
          description:
            "Wenn Sie Übertragungswege – wie DE-Mail oder PDF – festlegen, riskieren Sie, dass Ihre Regelung bald nicht mehr dem Stand der Technik entspricht. Andererseits kann es die Umsetzung erleichtern und zur einfacheren Nutzung führen, auf etablierte Basisdienste zurückzugreifen (Prinzip Effiziente Umsetzung mit etablierten Technologien). Hier kommt es auf den Einzelfall an.",
          questions: [
            "Können Sie auf die Nennung spezifischer Technologien verzichten?",
            "Können Sie auf etablierte Lösungen zurückgreifen, sogenannte Basisdienste?",
          ],
          wording:
            '"Der Antrag ist elektronisch oder schriftlich zu stellen." oder "Der Antrag ist zu stellen".',
        },
        {
          action: "Denken Sie an Antragsstellung, Bearbeitung und Bescheid",
          description:
            "Digitale Angebote erzeugen Daten, die direkt digital weiterverarbeitet werden können. Das spart Zeit, weil Informationen nicht eingescannt oder abgetippt werden müssen. Digitale Oberflächen, die für Nutzende zusätzliche Hilfestellungen und Fehlerkontrollen enthalten, erhöhen die Qualität der Daten. Sogenannte Plausibilitätsprüfungen kontrollieren zum Beispiel, ob Ort und Postleitzahl zusammenpassen oder ob ein angegebener Zeitraum antragsberechtigt ist.",
          questions: [
            "Wer übermittelt Informationen wie an wen? Beachtet die Regelung auch verwaltungsinterne Kommunikation oder den Austausch zwischen Behörden und Unternehmen?",
            "Wie können verwaltungsinterne Medienbrüche ausgeräumt oder Prozesse vereinfacht werden? Welche Technologien und Verfahren nutzt die umsetzende Behörde bei der Bearbeitung?",
            "Kann die Datenqualität durch automatische Kontrollen erhöht werden?",
            "Können Daten digital statt analog aufbewahrt werden?",
          ],
        },
        {
          action: "Denken Sie Barrierefreiheit von Anfang an mit",
          description:
            "Digitale Angebote müssen nach § 12 a Behindertengleichstellungsgesetz barrierefrei sein. Barrierefrei bedeutet, dass Menschen mit und ohne Behinderung das Angebot in gleicher Weise nutzen können. Da es viele unterschiedliche Arten von Behinderungen gibt, müssen viele Aspekte beachtet werden. Etwa die Aufbereitung für blinde und sehbehinderte Menschen oder Angebote in Deutscher Gebärdensprache oder Leichter Sprache.",
          questions: [
            "Welche Regelwerke für die Umsetzung digitaler Barrierefreiheit sind für Ihr Vorhaben relevant? Nutzen Sie dafür beispielsweise den Standardanforderungskatalog.",
            "Haben Sie die Bedürfnisse von Menschen mit unterschiedlichen Arten von Behinderungen berücksichtigt?",
          ],
          wording:
            '"Die Beratung erfolgt in einer für den Leistungsberechtigten wahrnehmbaren Form" (§ 106 Abs. 1 SGB IX). So eine Formulierung muss in einer Verordnung ausdefiniert werden.',
        },
        {
          action: "Stellen Sie eine nutzerfreundliche Umsetzung sicher",
          description:
            "Barrierearme Angebote sind oft auch nutzerfreundlicher. Darüber hinaus macht eine nutzerzentrierte Entwicklung, die z. B. in kleinen Schritten agiert und Texte in einfacher Sprache oder mehrsprachig gestaltet, ihr Angebot zugänglicher.",
          questions: [
            "Was ist die wichtigste Aufgabe aus Sicht der Nutzenden?",
            "Wenden die umsetzenden Akteure den Servicestandard an? Dieser stellt eine nutzerzentrierte Entwicklung sicher.",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Datenwiederverwendung durch einheitliches Recht",
      description:
        "Normadressatinnen und -adressaten sowie umsetzende Behörden sparen Kosten und Zeit, wenn das Once-Only-Prinzip konsequent angewendet wird – also wenn Daten nur einmal angegeben und dann wiederverwendet werden. Die Grundlage dafür sind harmonisierte Rechtsbegriffe, ein datenschutzkonformer Austausch und die Berücksichtigung etablierter technischer Standards.",
      implementation: [
        {
          action: "Nutzen Sie harmonisierte Rechtsbegriffe",
          description:
            "Um wiederverwendet zu werden, müssen Daten die gleiche inhaltliche Bedeutung haben, d. h. semantisch interoperabel sein. Dafür müssen die Rechtsbegriffe einheitlich definiert und verwendet werden. Hilfreich für die Umsetzung sind Taxonomien, kontrollierte Vokabulare oder Thesauri.",
          questions: [
            'Definieren Sie Begriffe, die in mehreren Regelungen vorkommen – wie z. B. "Einkommen" oder "Kind" –, selbst oder nutzen Sie eine bestehende Definition? Nutzen Sie Codelists, Vokabulare oder ähnliches, um eine einheitliche Verwendung sicherzustellen.',
            "Haben diese Begriffe innerhalb und außerhalb Ihres Rechtsbereichs die gleiche Bedeutung? Ist eine übergreifende Harmonisierung nötig?",
            "Haben Sie die Konsistenz zu Regelwerken der EU und von anderen EU-Staaten betrachtet?",
          ],
        },
        {
          action: "Nutzen Sie existierende Daten",
          description:
            "Überprüfen Sie, ob Daten schon an anderer Stelle zur Verfügung stehen und genutzt werden können. Optimalerweise wird auf die Originaldaten zugegriffen, statt diese zu kopieren. Für einen Datenaustausch zwischen Behörden müssen Sie dann eine geeignete Rechtsgrundlage schaffen.",
          questions: [
            "Können existierende verwaltungsinterne oder öffentliche Daten wiederverwendet werden? Recherchieren Sie u. a. auf verwaltungsdaten-informationsplattform.de oder GovData.de.",
            "Genügen die Daten den Anforderungen an Qualität und Aktualität oder sollten Kontrolldaten erhoben werden? Stehen Löschfristen einer Nachnutzung im Wege?",
          ],
        },
        {
          action: "Machen Sie erhobene Daten für andere nutzbar",
          description:
            "Müssen neue Daten erhoben werden, sollten Sie eine Nachnutzung dieser Daten ermöglichen.",
          questions: [
            "Stehen der Nachnutzung der Daten rechtliche Beschränkungen im Weg? Können erhobene Daten sogar öffentlich geteilt werden?",
            "Wie werden die Daten verwaltet? Sind die Verantwortlichkeiten klar?",
            "Ist ein transeuropäischer Datenaustausch möglich? Gibt es passende Lizenzmodelle?",
          ],
        },
        {
          action: "Nutzen Sie bestehende technische Standards",
          description:
            "Nutzen Sie geeignete technische Standards, wie z. B. Datenaustauschformate, um den Austausch zwischen IT-Systemen zu begünstigen. Möglicherweise ist es sinnvoll, diese in der Regelung vorzuschreiben.",
          questions: [
            "Welche Datenformate existieren bereits? Muss ein neuer Standard entwickelt werden?",
            "Wurde beachtet, wie die Daten übertragen werden sollen?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Etablierte Technologien ermöglichen effiziente Umsetzung",
      description:
        "Digitale Angebote können schneller bereitgestellt und günstiger entwickelt und betrieben werden, wenn sie auf bestehenden Technologien aufbauen. Offene, standardisierte Schnittstellen und Open-Source erhöhen die Sicherheit der Angebote und fördern die Interoperabilität.",
      implementation: [
        {
          action:
            "Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen",
          description:
            "Lösungen sind u. a. öffentliche Basisdienste, Softwarearchitekturen oder Komponentenbibliotheken. Eine Übersicht finden Sie im Rahmen des OZG. Die Wiederverwendung existierender Lösungen spart Zeit und verringert den Erfüllungsaufwand für Entwicklung und Betrieb. Einheitliche Systeme, wie z. B. ein nationales Postfach, sind für Nutzende oft einfacher zu bedienen und erleichtern die Zusammenarbeit zwischen Behörden.",
          questions: [
            "Wie viel Vorlauf brauchen beteiligte Unternehmen, um IT-Systeme anzupassen oder umzustellen?",
            "Wie ist die Erfahrung mit existierenden Systemen? Bietet es sich an, im selben Zug IT-Verfahren zu modernisieren? Wie können alle Beteiligten davon profitieren?",
          ],
        },
        {
          action:
            "Bevorzugen Sie Open-Source-Software und offene Spezifikationen",
          description:
            "Open-Source bedeutet, dass der Quellcode eines IT-Systems veröffentlicht ist. Offene Spezifikationen beschreiben öffentlich, was ein IT-System genau leistet. Beide stärken Transparenz und Wiederverwendbarkeit (vgl. Koalitionsvertrag 18. Legislaturperiode oder Servicestandard). Dies ermöglicht die Nachvollziehbarkeit der technischen Lösung und verhindert die Abhängigkeit von einzelnen Software-Anbietern. Weitere Informationen erhalten Sie beim Zentrum für digitale Souveränität.",
          questions: [
            "Wird der Einsatz von Open-Source-Software ermöglicht und gefördert?",
            "Werden ggf. bei Neuentwicklung Quelloffenheit und offene Spezifikationen vorgeschrieben?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Automatisierung braucht eindeutige Regelungen",
      description:
        "Logische und verständliche Regelungen und transparente Verfahren erleichtern den Zugang zum Recht und stärken das Vertrauen in den Staat. Einfachheit und verständliche Sprache sind durch die GGO und das Handbuch der Rechtsförmlichkeit vorgeschrieben.\n\nKlarheit und Logik bilden die Grundlage für automatisierte Prozesse. Wenn Begriffe eindeutig definiert sowie Entscheidungsstrukturen bestimmt sind, können Regeln und klare Ausnahmen automatisiert werden. Das spart Zeit auf Seiten der Nutzenden und der Verwaltung. Mit diesen Ressourcen können kritischere Einzelfälle bearbeitet oder Normadressatinnen und -adressaten beraten werden.",
      implementation: [
        {
          action: "Beachten Sie bestehende Prozesse und Verantwortlichkeiten",
          description:
            "Um eine effektive Umsetzung zu gewährleisten, sollten existierende Prozesse und Verantwortlichkeiten beachtet und, wenn möglich, angeglichen werden. Dabei helfen Ihnen Visualisierungen.",
          questions: [
            "Gibt es bereits Prozess-Visualisierungen im FIM-Portal, auf denen Sie aufsetzen können?",
            "Haben Sie bestehende Prozesse in Deutschland und anderen EU-Mitgliedsstaaten berücksichtigt?",
            "Bekommt oder verliert eine Behörde Kompetenzen? Wie wirkt sich das aus?",
            "Können bestehende Prozesse vereinfacht werden?",
            "Falls ein Verwaltungsprozess betroffen ist: Lassen sich die Teilschritte in einer chronologischen Reihenfolge abbilden?",
          ],
        },
        {
          action: "Nutzen Sie das Potenzial von Automatisierung",
          description:
            "Automatisierung wirkt sich besonders effizienzsteigernd auf Prozesse mit großen Bearbeitungsfallzahlen aus, die als gebundene Entscheidungen geregelt werden können.",
          questions: [
            "Wie groß ist die erwartete Fallzahl pro Jahr? Sind in den Behörden genug Ressourcen vorhanden, um z. B. Anträge fristgerecht zu bearbeiten?",
            "Gibt es bereits Vorschläge für Automatisierungspotenziale aus der Umsetzung?",
            "Handelt es sich um eine gebundene Entscheidung?",
            "Erlaubt die Regelung eine automatisierte Fallbearbeitung?",
            "Ist ein komplett antragsloses Verfahren möglich? Beachten Sie hierfür auch das Prinzip Datenwiederverwendung durch einheitliches Recht.",
          ],
        },
        {
          action:
            "Unterscheiden Sie zwischen genereller Regel, Ausnahmen und Ermessensspielräumen",
          description:
            "Sachverhalte sollten durch das Zusammenspiel von Gesetzen und Verordnungen möglichst abschließend geregelt werden. Finden Sie die Balance zwischen notwendigen Ausnahmen für eine gerechte Regelung, Spielraum in der Umsetzung und klar geregelten Prozessen, die sich gut digitalisieren lassen.",
          questions: [
            "Basieren Entscheidungslogiken auf objektiven Kriterien?",
            "Können Pauschalen die Regelung und Umsetzung vereinfachen?",
            "Wird in der Regelung klar zwischen grundlegender Regel und Ausnahmen unterschieden? Sind die Ausnahmen klar definiert?",
            "Sind Ermessensspielräume nötig? Ist trotz Ermessensspielräumen eine Automatisierung anderer Prozessschritte möglich?",
            "Ist es möglich für Ermessensspielräume Fallgruppen in Richtlinien o. ä. zu definieren?",
          ],
        },
        {
          action: "Schreiben Sie einfach, eindeutig und widerspruchsfrei",
          description:
            "Logische Konsistenz und präzise Sprache sind notwendige Bedingungen für die Automatisierung der Umsetzung. Dass eine Regelung eindeutig formuliert ist, kann auch einen längeren Regelungstext zur Folge haben.",
          questions: [
            "Sind Begriffe und Abläufe eindeutig definiert?",
            "Ist die Regelung möglichst einfach formuliert?",
            "Sind Entscheidungslogiken widerspruchsfrei?",
          ],
        },
      ],
    },
    {
      label: "Prinzip",
      title: "Datenschutz und Informationssicherheit schaffen Vertrauen",
      description:
        "Alle Menschen haben ein Recht darauf, dass ihre Daten vor unbefugten Zugriffen geschützt werden. Der Schutz personenbezogener Daten ist in der DSGVO geregelt. Informationssicherheit umfasst alle Daten und wird je nach Bereich spezifiziert.\n\nEine datenschutzkonforme Regelung erhebt nur das Minimum an Daten. Datensparsamkeit ist einfach umzusetzen und verringert den Erfüllungsaufwand. Wenn weniger Daten vorliegen, müssen auch weniger Informationen geschützt werden.\n\nWenn Informationen den ihnen gebührenden Schutz erhalten, schafft das Vertrauen in den Staat. Die Gefahr von Missbrauch und negativen wirtschaftlichen oder sicherheitsrelevanten Konsequenzen wird verringert.",
      implementation: [
        {
          action: "Gewährleisten Sie den Datenschutz",
          description:
            'Für den Datenschutz sind nur personenbezogene Daten relevant. Um diese zu verarbeiten, muss eine geeignete Rechtsgrundlage existieren. "Datenverarbeitung" umfasst u. a. das Erheben, Speichern, Abfragen, Übermitteln, Verknüpfen oder Löschen von Daten (s. Art. 4 Abs. 2 DSGVO). Tauschen Sie sich mit Ihren Datenschutzbeauftragten aus.',
          questions: [
            "Werden personenbezogene Daten verarbeitet? Sind diese besonders schützenswert, etwa Daten zur ethnischen Herkunft oder Gesundheitsdaten?",
            "Werden nur notwendige Daten verarbeitet?",
            "Haben Sie die rechtliche Basis geschaffen, um Daten zu verarbeiten? Ist der Zweck der Datenverarbeitung dargelegt?",
            "Können überholte Datenschutzbedürfnisse abgeschafft werden?",
            "Genügt die Regelung den Anforderungen an den Datenschutz in allen beteiligten Ländern und Institutionen, ggf. auch in anderen EU-Staaten?",
          ],
        },
        {
          action: "Stellen Sie die Informationssicherheit sicher",
          description:
            "Informationssicherheit betrifft alle Arten von Daten, vor allem wirtschafts- oder sicherheitsrelevante. Alle Daten müssen sicher gespeichert und übertragen werden. Dies erschwert den missbräuchlichen Zugriff, etwa zum Erschleichen von Leistungen. Folgen Sie den Empfehlungen des BSI.",
          questions: [
            "Werden eine geeignete, sichere Datenhaltung und sichere Übertragungswege vorgeschrieben?",
            "Wurden Maßnahmen vorgeschrieben, um Betrugsversuche zu erschweren?",
            "Wurden veraltete Informationssicherheitsbedürfnisse identifiziert und abgeschafft?",
            "Gibt es passende, anerkannte Nachweise oder Zertifizierungen, z. B. ISO 27001?",
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
