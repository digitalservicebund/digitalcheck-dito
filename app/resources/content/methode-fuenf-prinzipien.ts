import { DrawOutlined } from "@digitalservicebund/icons";
import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import { HeadingProps } from "~/components/Heading";
import {
  ROUTE_DOWNLOAD_PRINCIPLE_POSTER,
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_METHODS,
  ROUTE_METHODS_TASKS_PROCESSES,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
  ROUTE_SUPPORT,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export type DetailsSummary = {
  title: string;
  items: DetailsSummaryItem[];
};

export type DetailsSummaryItem = {
  title: string;
  text: string;
  questions: string[];
  wordingExample?: string;
};

export const methodsFivePrinciples = {
  title: "Chancen und Hindernisse der digitalen Umsetzung identifizieren",
  subtitle: dedent`
    Die folgenden Prinzipien helfen Ihnen dabei, Chancen der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen. Nutzen Sie die Prinzipien auch, um mit beteiligten Akteurinnen und Akteuren über die Umsetzung zu sprechen.

    Welche Prinzipien besonders wichtig sind und wie Sie diese anwenden, hängt davon ab, worum es in Ihrem Vorhaben geht – und ob Sie ein Gesetz oder eine Verordnung entwerfen. Sie sind sich unsicher oder wollen über Ihre Einordnung reflektieren, dann nutzen Sie gern unsere [vertraulichen Unterstützungs- und Supportangebote](${ROUTE_SUPPORT.url}).
  `,
  buttonText: "Beispiele betrachten",
  wordingExampleTitle: "**Formulierungsbeispiel:**",
  questionsTitle: "**Fragen Sie sich:**",
  contentOverviewTitle: "Inhalt",
  anchor: {
    principle: "Prinzip:",
    instruction:
      "Anleitung: So nutzen Sie die fünf Prinzipien für Ihr Regelungsvorhaben",
  },
  instruction: {
    badge: {
      Icon: DrawOutlined,
      text: "Anleitung",
    },
    title: "So nutzen Sie die fünf Prinzipien für Ihr Regelungsvorhaben",
    items: [
      {
        heading: { text: "Als konkrete Umsetzungstipps" },
        content:
          "Nutzen Sie die Tipps als Inspiration, um in Ihrem Regelungsvorhaben die Möglichkeiten des Digitalen auszuschöpfen und Hindernisse zu erkennen.",
      },
      {
        heading: { text: "Als Überprüfung für den Gesamtprozess" },
        content: `Besonders erkenntnisreich sind die fünf Prinzipien, wenn Sie diese auf eine Skizze des geplanten Umsetzungsprozesses anwenden. Skizzieren Sie Schritt für Schritt die Umsetzung und markieren Sie die Stellen, an denen eines oder mehrere Prinzipien wichtig sind. Mehr Informationen und Anleitung zur Visualisierungen finden Sie auf [visualisieren.digitalcheck.bund.de](${ROUTE_METHODS_TASKS_PROCESSES.url}).`,
      },
      {
        heading: { text: "Als Startpunkt für ihren Regelungstext" },
        content:
          "Nutzen Sie die gesammelten Beispiele als Startpunkt für Ihre Formulierungen. Bauen Sie auf Formulierungen auf, oder lassen Sie sich durch die Wirklogiken Ihrer Kolleginnen und Kollegen inspirieren. Sie finden gute Formulierungen, Einordnungen und deren Kontext im Regelungstext in den Beispielen.",
        link: { url: ROUTE_EXAMPLES.url, text: "Beispiele betrachten" },
      },
    ],
  },
  principles: [
    {
      label: "Prinzip",
      title: "Digitale Angebote für alle nutzbar gestalten",
      icon: ArrowCircleRightOutlined,
      principleNumber: 1,
      content:
        "Viele Bürgerinnen, Bürger und Unternehmen sind an digitale Angebote gewöhnt und bevorzugen diese – sofern die digitale Kommunikation gut umgesetzt ist und ihren Bedürfnissen entspricht. Die Verwaltung kann digitale Daten schneller prüfen, bearbeiten und dokumentieren. Das Angebot sollte dabei immer inklusiv sein und es benötigt gegebenenfalls analoge Alternativen.",
      detailsSummary: {
        title: "So wenden Sie das Prinzip an",
        items: [
          {
            title: "Ermöglichen Sie digitale Kommunikation",
            text: "Bürgerinnen, Bürger und Unternehmen sind digitale Angebote gewöhnt. Nutzerfreundliche, niedrigschwellige Dienste erfüllen ihre Erwartungen und machen ihnen das Leben leichter. Denken Sie auch an Bürgerinnen und Bürger, die keine digitalen Angebote nutzen können oder wollen. Richten Sie Alternativen ein. Für Unternehmen kann digitale Kommunikation vorgeschrieben werden.",
            questions: [
              "Enthält die Regelung Schriftformerfordernisse oder erfordert persönliches Erscheinen?",
              "Kann auf das Einreichen von Dokumenten verzichtet werden? Kann eine Vorlagepflicht durch eine Vorhaltepflicht ersetzt werden?",
              "Bleiben alternative Kommunikationswege – etwa schriftlich, telefonisch oder persönlich – weiterhin möglich?",
            ],
          },
          {
            title: "Formulieren Sie die Regelung technologieoffen",
            text: "Wenn Sie Übertragungswege – wie DE-Mail oder PDF – festlegen, riskieren Sie, dass Ihre Regelung bald nicht mehr dem Stand der Technik entspricht. Andererseits kann die Nutzung etablierter Basisdienste die Umsetzung erleichtern und die Anwendung für Nutzende vereinfachen – im Sinne des Prinzips „[Etablierte Technologien ermöglichen effiziente Umsetzung](#etablierte-technologien-erm-glichen-effiziente-umsetzung)“. Ob das sinnvoll ist, hängt vom konkreten Einzelfall ab.",
            questions: [
              "Können Sie auf die Nennung spezifischer Technologien verzichten?",
              "Können Sie auf etablierte Lösungen – sogenannte Basisdienste – zurückgreifen?",
            ],
            wordingExample:
              "„Der Antrag ist elektronisch oder schriftlich zu stellen.“ oder „Der Antrag ist zu stellen.“",
          },
          {
            title: "Denken Sie an Antragsstellung, Bearbeitung und Bescheid",
            text: "Digitale Angebote erzeugen Daten, die direkt digital weiterverarbeitet werden können. Das spart Zeit, weil Informationen nicht eingescannt oder abgetippt werden müssen. Digitale Oberflächen, die für Nutzende zusätzliche Hilfestellungen und Kontrollen enthalten, erhöhen die Qualität der Daten. Sogenannte Plausibilitätsprüfungen kontrollieren zum Beispiel, ob Ort und Postleitzahl zusammenpassen oder ob ein angegebener Zeitraum antragsberechtigt ist.",
            questions: [
              "Welche Informationen werden von wem an wen übermittelt? Beachtet die Regelung auch verwaltungsinterne Kommunikation oder den Austausch zwischen Behörden und Unternehmen?",
              "Wie können verwaltungsinterne Medienbrüche ausgeräumt oder Prozesse vereinfacht werden? Welche Technologien und Verfahren nutzt die umsetzende Behörde bei der Bearbeitung?",
              "Kann die Datenqualität durch automatische Kontrollen erhöht werden?",
              "Können Daten digital statt analog aufbewahrt werden?",
            ],
          },
          {
            title: "Denken Sie Barrierefreiheit von Anfang an mit",
            text: "Digitale Angebote müssen nach [§ 12 a Behindertengleichstellungsgesetz](https://www.gesetze-im-internet.de/bgg/__12a.html) barrierefrei sein. Barrierefrei bedeutet, dass Menschen mit und ohne Behinderung das Angebot in gleicher Weise nutzen können. Da es viele unterschiedliche Arten von Behinderungen gibt, müssen viele Aspekte beachtet werden. Etwa die Aufbereitung für blinde und sehbehinderte Menschen oder Angebote in deutscher Gebärdensprache oder leichter Sprache.",
            questions: [
              "Welche Regelwerke für die Umsetzung digitaler Barrierefreiheit sind für Ihr Vorhaben relevant? Nutzen Sie dafür beispielsweise den [Standardanforderungskatalog](https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/standardanforderungskatalog/standardanforderungskatalog-node.html).",
              "Haben Sie die Bedürfnisse von Menschen mit unterschiedlichen Arten von Behinderungen berücksichtigt?",
            ],
            wordingExample: `- "Die Beratung erfolgt in einer für den Leistungsberechtigten wahrnehmbaren Form" ([§ 106 Abs. 1 SGB IX](https://www.gesetze-im-internet.de/sgb_9_2018/__106.html)). So eine Formulierung muss in einer Verordnung ausgestaltet werden.
- [...] nach dem Stand der Technik auch die erforderlichen technischen und organisatorischen Verfahren festzulegen oder technischen Voraussetzungen zu schaffen dafür, dass [...] Daten [...] barrierefrei zur Verfügung gestellt und [...] barrierefrei verarbeitet werden können [...] ([§ 354 SGB V](https://www.gesetze-im-internet.de/sgb_5/__354.html))`,
          },
          {
            title: "Stellen Sie eine nutzerfreundliche Umsetzung sicher",
            text: "Barrierearme Angebote sind oft auch nutzerfreundlicher. Darüber hinaus macht eine nutzerzentrierte Entwicklung, die z. B. in kleinen Schritten agiert und Texte in einfacher Sprache oder mehrsprachig gestaltet, ihr Angebot zugänglicher.",
            questions: [
              "Was ist die wichtigste Aufgabe aus Sicht der Nutzenden?",
              "Wenden die umsetzenden Akteurinnen und Akteure den [Servicestandard](https://servicestandard.gov.de/) an? Dieser stellt eine nutzerzentrierte Entwicklung sicher.",
            ],
          },
        ],
      },
      exampleLink: {
        url: ROUTE_EXAMPLES_DIGITAL_COMMUNICATION.url,
        text: "Beispiele betrachten",
      },
    },
    {
      label: "Prinzip",
      title: "Datenwiederverwendung benötigt einheitliches Recht",
      icon: ArrowCircleRightOutlined,
      principleNumber: 2,
      content:
        "Normadressatinnen und -adressaten sowie umsetzende Behörden sparen Kosten und Zeit, wenn das [Once-Only-Prinzip](https://www.cio.bund.de/Webs/CIO/DE/digitale-loesungen/digitale-verwaltung/registermodernisierung/registermodernisierung-node.html) konsequent angewendet wird – also wenn Daten nur einmal angegeben und dann wiederverwendet werden. Die Grundlage dafür sind harmonisierte Rechtsbegriffe, ein datenschutzkonformer Austausch und die Berücksichtigung etablierter technischer Standards.",
      detailsSummary: {
        title: "So wenden Sie das Prinzip an",
        items: [
          {
            title: "Nutzen Sie harmonisierte Rechtsbegriffe",
            text: "Um wiederverwendet zu werden, müssen Daten die gleiche inhaltliche Bedeutung haben, d. h. semantisch interoperabel sein. Dafür müssen die Rechtsbegriffe einheitlich definiert und verwendet werden. Hilfreich für die Umsetzung sind Taxonomien, kontrollierte Vokabulare oder Codelisten.\n\nEs kann nötig sein, Begriffe über Ihren Rechtsbereich hinaus zu harmonisieren, um bestehende Daten zu verwenden. Ist dies nicht möglich, können Sie die Informationen möglicherweise aus verschiedenen Datenpunkten zusammensetzen, etwa das Einkommen aus Gehalt und weiteren Einnahmen.",
            questions: [
              "Definieren Sie Begriffe, die in mehreren Regelungen vorkommen (z. B. „Einkommen“, „Kind“), selbst oder nutzen Sie eine bestehende Definition? Nutzen Sie Codelists oder Vokabulare um eine einheitliche Verwendung sicherzustellen.",
              "Haben diese Begriffe innerhalb und außerhalb Ihres Rechtsbereichs die gleiche Bedeutung? Ist eine übergreifende Harmonisierung nötig?",
              "Haben Sie die Konsistenz zu Regelwerken der EU und von anderen EU-Staaten betrachtet?",
            ],
          },
          {
            title: "Nutzen Sie existierende Daten",
            text: "Überprüfen Sie, ob Daten schon an anderer Stelle zur Verfügung stehen und genutzt werden können. Optimalerweise wird auf die Originaldaten zugegriffen, statt diese zu kopieren. Für einen Datenaustausch zwischen Behörden müssen Sie dann eine geeignete Rechtsgrundlage schaffen.",
            questions: [
              "Können existierende verwaltungsinterne oder öffentliche Daten wiederverwendet werden? Recherchieren Sie u. a. auf [verwaltungsdaten-informationsplattform.de](https://www.verwaltungsdaten-informationsplattform.de/) oder [data.gov.de](https://data.gov.de/).",
              "Genügen die Daten den Anforderungen an Qualität und Aktualität oder sollten Kontrolldaten erhoben werden? Stehen Löschfristen einer Nachnutzung im Wege?",
            ],
          },
          {
            title: "Machen Sie erhobene Daten für andere nutzbar",
            text: "Müssen neue Daten erhoben werden, sollten Sie eine Nachnutzung dieser Daten ermöglichen.",
            questions: [
              "Stehen der Nachnutzung der Daten rechtliche Beschränkungen im Weg? Können erhobene Daten sogar öffentlich geteilt werden?",
              "Wie werden die Daten verwaltet? Sind die Verantwortlichkeiten klar?",
              "Ist ein transeuropäischer Datenaustausch möglich? Gibt es passende Lizenzmodelle?",
            ],
          },
          {
            title: "Nutzen Sie bestehende technische Standards",
            text: "Nutzen Sie geeignete technische Standards, wie z. B. Datenaustauschformate, um den Austausch zwischen IT-Systemen zu begünstigen. Möglicherweise ist es sinnvoll, diese in der Regelung vorzuschreiben.\n\nInformationen zu Standards der öffentlichen Verwaltung erhalten Sie bei der [FITKO](https://www.fitko.de/), auf den Seiten des [XÖV](https://www.xoev.de/) mit zugehörigem [XRepository](https://www.xrepository.de/) und auf der [Verwaltungsdaten-Informationsplattform](https://www.verwaltungsdaten-informationsplattform.de).",
            questions: [
              "Welche Datenformate existieren bereits? Muss gegebenenfalls ein neuer Standard entwickelt oder ein bestehender Standard erweitert werden?",
              "Wurde beachtet, wie die Daten übertragen werden sollen?",
            ],
          },
          {
            title: "Suchen Sie frühzeitig den Austausch mit allen Beteiligten",
            text: "Neben rein technischen Voraussetzungen gilt es auch zu beachten, wie sich organisatorische Aspekte auf die Umsetzung Ihres Vorhabens auswirken. Hier hilft der Austausch mit anderen Beteiligten, wie z. B. den Behörden oder IT-Beauftragten.",
            questions: [
              "Wie viel Vorlauf benötigen beteiligte Unternehmen, um IT-Systeme anzupassen oder umzustellen?",
              "Wie ist die Erfahrung mit existierenden Systemen?",
              "Besteht die Möglichkeit, im Zuge des Vorhabens auch IT-Verfahren zu modernisieren? Wie können alle Beteiligten davon profitieren?",
            ],
          },
        ],
      },
      exampleLink: {
        url: ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS.url,
        text: "Beispiele betrachten",
      },
    },
    {
      label: "Prinzip",
      title: "Etablierte Technologien ermöglichen effiziente Umsetzung",
      icon: ArrowCircleRightOutlined,
      principleNumber: 6,
      content:
        "Digitale Angebote können schneller bereitgestellt sowie günstiger entwickelt und betrieben werden, wenn sie auf bestehenden Technologien aufbauen. Offene, standardisierte Schnittstellen und Open-Source erhöhen die [Sicherheit der Angebote](#datenschutz-und-informationssicherheit-schaffen-vertrauen) und fördern die Interoperabilität.",
      detailsSummary: {
        title: "So wenden Sie das Prinzip an",
        items: [
          {
            title:
              "Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen",
            text: "Lösungen sind u. a. öffentliche Basisdienste, Softwarearchitekturen oder Komponentenbibliotheken. [Eine Übersicht finden Sie im Rahmen des OZG](https://www.digitale-verwaltung.de/Webs/DV/DE/onlinezugangsgesetz/rahmenarchitektur/basisdienste-basiskomponenten/basisdienste-basiskomponenten-node.html). Die Wiederverwendung existierender Lösungen spart Zeit und verringert den Erfüllungsaufwand für Entwicklung und Betrieb. Einheitliche Systeme, wie z. B. ein nationales Postfach, sind für Nutzende oft einfacher zu bedienen und erleichtern die Zusammenarbeit zwischen Behörden.\n\nGestalten Sie die Regelung so, dass Sie die Nutzung dieser Lösungen ermöglichen oder sogar vorschreiben. Sollte es keine etablierte Lösung geben, formulieren Sie die Regelung technologieoffen.",
            questions: [
              "Wie viel Spielraum bzw. Standardisierung brauchen die umsetzenden Akteurinnen und Akteuren? Das hängt auch davon ab, ob Sie an einem Gesetz oder einer Verordnung arbeiten.",
              "Existieren für die beschriebenen digitalen Prozesse bereits etablierte, technische Lösungen? Ermöglicht die Regelung die Nutzung dieser Systeme bzw. den Anschluss an sie?",
              "Sind EU-Vorgaben – wie [eIDAS](https://www.personalausweisportal.de/Webs/PA/DE/verwaltung/eIDAS-verordnung-der-EU/eidas-verordnung-der-eu-node.html) oder [NIS2](https://www.bsi.bund.de/DE/Themen/Regulierte-Wirtschaft/NIS-2-regulierte-Unternehmen/NIS-2-FAQ/FAQ-zu-NIS-2_node.html) – oder [technische Richtlinien des BSI](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/technische-richtlinien_node.html) relevant?",
              "Wurde untersucht, ob bereits [existierende europäische Interoperabilitätslösungen](https://interoperable-europe.ec.europa.eu/solutions) wiederverwendet werden könnten?",
            ],
            wordingExample: dedent`
              - Sie können die Technologie bereits im Gesetz festschreiben und in der Verordnung ausdefinieren. Tauschen Sie sich dafür mit den umsetzenden Akteurinnen und Akteuren aus und nutzen Sie unseren Support.
              - Beispiele für technologieoffene Formulierungen finden Sie z. B. im Handbuch der Rechtsförmlichkeit ([4. Auflage, Teil B, 3.4. Verweisungen auf technische Regeln](https://www.bmj.de/SharedDocs/Publikationen/DE/Fachpublikationen/Handbuch_der_Rechtsfoermlichkeit_4.pdf?__blob=publicationFile&v=1#page=95))`,
          },
          {
            title:
              "Bevorzugen Sie Open-Source-Software und offene Spezifikationen",
            text: "Open-Source bedeutet, dass der Quellcode eines IT-Systems veröffentlicht ist. Offene Spezifikationen beschreiben öffentlich, was ein IT-System genau leistet. Beide stärken Transparenz und Wiederverwendbarkeit (vgl. [Koalitionsvertrag 18. Legislaturperiode](https://www.bundestag.de/resource/blob/194886/696f36f795961df200fb27fb6803d83e/koalitionsvertrag-data.pdf#page=152) oder [Servicestandard](https://servicestandard.gov.de/)). Dies ermöglicht die Nachvollziehbarkeit der technischen Lösung und verhindert die Abhängigkeit von einzelnen Software-Anbietern. Weitere Informationen erhalten Sie beim [Zentrum für digitale Souveränität](https://www.zendis.de/).",
            questions: [
              "Wird der Einsatz von Open-Source-Software ermöglicht und gefördert?",
              "Werden gegebenenfalls bei Neuentwicklung Quelloffenheit und offene Spezifikationen vorgeschrieben?",
            ],
          },
        ],
      },
      exampleLink: {
        url: ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES.url,
        text: "Beispiele betrachten",
      },
    },
    {
      label: "Prinzip",
      icon: ArrowCircleRightOutlined,
      principleNumber: 5,
      title: "Automatisierung basiert auf eindeutigen Regelungen",
      content:
        "Logische und verständliche Regelungen und transparente Verfahren erleichtern den Zugang zum Recht und stärken das Vertrauen in den Staat. Einfachheit und verständliche Sprache sind durch die [GGO](https://www.verwaltungsvorschriften-im-internet.de/bsvwvbund_21072009_O11313012.htm#paragraph42:~:text=Gesetzentw%C3%BCrfe%20m%C3%BCssen%20sprachlich,hat%20empfehlenden%20Charakter.) und das [Handbuch der Rechtsförmlichkeit](https://www.bmj.de/SharedDocs/Publikationen/DE/Fachpublikationen/Handbuch_der_Rechtsfoermlichkeit_4.pdf?__blob=publicationFile&v=1#page=147) vorgeschrieben.\n\nKlarheit und Logik bilden die Grundlage für automatisierte Prozesse. Wenn Begriffe eindeutig definiert sowie Entscheidungsstrukturen bestimmt sind, können Regeln und klare Ausnahmen automatisiert werden. Das spart Zeit auf Seiten der Nutzenden und der Verwaltung. Mit diesen Ressourcen können kritischere Einzelfälle bearbeitet oder Normadressatinnen und -adressaten beraten werden.",
      detailsSummary: {
        title: "So wenden Sie das Prinzip an",
        items: [
          {
            title: "Beachten Sie bestehende Prozesse und Verantwortlichkeiten",
            text: "Um eine effektive Umsetzung zu gewährleisten, sollten existierende Prozesse und Verantwortlichkeiten beachtet und, wenn möglich, angeglichen werden. Dabei helfen Ihnen Visualisierungen.",
            questions: [
              "Gibt es bereits Prozess-Visualisierungen im [FIM-Portal](https://fimportal.de/search?resource=process&page=1&page_size=20), auf denen Sie aufsetzen können?",
              "Haben Sie bestehende Prozesse in Deutschland und anderen EU-Mitgliedsstaaten berücksichtigt?",
              "Bekommt oder verliert eine Behörde Kompetenzen? Wie wirkt sich das aus?",
              "Können bestehende Prozesse vereinfacht werden?",
              "Falls ein Verwaltungsprozess betroffen ist: Lassen sich die Teilschritte in einer chronologischen Reihenfolge abbilden?",
            ],
          },
          {
            title: "Nutzen Sie das Potenzial von Automatisierung",
            text: "Automatisierung wirkt sich besonders effizienzsteigernd auf Prozesse mit großen Bearbeitungsfallzahlen aus, die als gebundene Entscheidungen geregelt werden können.",
            questions: [
              "Wie groß ist die erwartete Fallzahl pro Jahr? Sind in den Behörden genug Ressourcen vorhanden, um z. B. Anträge fristgerecht zu bearbeiten?",
              "Gibt es bereits Vorschläge für Automatisierungspotenziale aus der Umsetzung?",
              "Handelt es sich um eine gebundene Entscheidung?",
              "Erlaubt die Regelung eine automatisierte Fallbearbeitung?",
              "Ist ein komplett antragsloses Verfahren möglich? Beachten Sie hierfür auch das Prinzip „[Datenwiederverwendung benötigt einheitliches Recht](#datenwiederverwendung-ben-tigt-einheitliches-recht)“.",
            ],
          },
          {
            title:
              "Unterscheiden Sie zwischen genereller Regel, Ausnahmen und Ermessensspielräumen",
            text: "Sachverhalte sollten durch das Zusammenspiel von Gesetzen und Verordnungen möglichst abschließend geregelt werden. Finden Sie die Balance zwischen notwendigen Ausnahmen für eine gerechte Regelung, Spielraum in der Umsetzung und klar geregelten Prozessen, die sich gut digitalisieren lassen.",
            questions: [
              "Basieren Entscheidungslogiken auf objektiven Kriterien?",
              "Können Pauschalen die Regelung und Umsetzung vereinfachen?",
              "Wird in der Regelung klar zwischen grundlegender Regel und Ausnahmen unterschieden? Sind die Ausnahmen klar definiert?",
              "Sind Ermessensspielräume nötig? Können für bestimmte Fallgruppen gebundene Entscheidungen festgelegt werden?",
              "Ist trotz verbleibendem Ermessen eine Automatisierung anderer Prozessschritte möglich?",
            ],
          },
          {
            title: "Schreiben Sie einfach, eindeutig und widerspruchsfrei",
            text: "Logische Konsistenz und präzise Sprache sind notwendige Bedingungen für die Automatisierung der Umsetzung. Dass eine Regelung eindeutig formuliert ist, kann auch einen längeren Regelungstext zur Folge haben.",
            questions: [
              "Sind Begriffe und Abläufe eindeutig definiert?",
              "Ist die Regelung möglichst einfach formuliert?",
              "Sind Entscheidungslogiken widerspruchsfrei?",
            ],
          },
        ],
      },
      exampleLink: {
        url: ROUTE_EXAMPLES_AUTOMATION.url,
        text: "Beispiele betrachten",
      },
    },
    {
      label: "Prinzip",
      title: "Datenschutz und Informationssicherheit schaffen Vertrauen",
      icon: ArrowCircleRightOutlined,
      principleNumber: 3,
      content:
        "Alle Menschen haben ein Recht darauf, dass ihre Daten vor unbefugten Zugriffen geschützt werden. Der Schutz personenbezogener Daten ist in der [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de) geregelt. Informationssicherheit umfasst alle Daten und wird je nach Bereich spezifiziert.\n\nEine datenschutzkonforme Regelung erhebt nur das Minimum an Daten. Datensparsamkeit ist einfach umzusetzen und verringert den Erfüllungsaufwand. Wenn weniger Daten vorliegen, müssen auch weniger Informationen geschützt werden.\n\nWenn Informationen den ihnen gebührenden Schutz erhalten, schafft das Vertrauen in den Staat. Die Gefahr von Missbrauch und negativen wirtschaftlichen oder sicherheitsrelevanten Konsequenzen wird verringert.",
      detailsSummary: {
        title: "So wenden Sie das Prinzip an",
        items: [
          {
            title: "Stellen Sie den Datenschutz sicher",
            text: 'Für den Datenschutz sind nur personenbezogene Daten relevant. Um diese zu verarbeiten, muss eine geeignete Rechtsgrundlage existieren. "Datenverarbeitung" umfasst u. a. das Erheben, Speichern, Abfragen, Übermitteln, Verknüpfen oder Löschen von Daten ([s. Art. 4 Abs. 2 DSGVO](https://eur-lex.europa.eu/legal-content/DE/TXT/?qid=1532348683434&uri=CELEX%3A02016R0679-20160504)). Tauschen Sie sich mit Ihren Datenschutzbeauftragten aus oder kontaktieren Sie die [BfDI](https://www.bfdi.bund.de/DE/Home/home_node.html).',
            questions: [
              "Werden personenbezogene Daten verarbeitet? Sind diese besonders schützenswert, etwa Daten zur ethnischen Herkunft oder Gesundheitsdaten?",
              "Werden nur notwendige Daten verarbeitet?",
              "Haben Sie die rechtliche Basis geschaffen, um Daten zu verarbeiten? Ist der Zweck der Datenverarbeitung dargelegt?",
              "Können überholte Datenschutzbedürfnisse abgeschafft werden?",
              "Genügt die Regelung den Anforderungen an den Datenschutz in allen beteiligten Ländern und Institutionen, gegebenenfalls auch in anderen EU-Staaten?",
            ],
          },
          {
            title: "Gewährleisten Sie die Informationssicherheit",
            text: "Informationssicherheit betrifft alle Arten von Daten, vor allem wirtschafts- oder sicherheitsrelevante. Alle Daten müssen sicher gespeichert und übertragen werden. Dies erschwert den missbräuchlichen Zugriff, etwa zum Erschleichen von Leistungen. Folgen Sie den [Empfehlungen des BSI](https://www.bsi.bund.de/DE/Themen/Oeffentliche-Verwaltung/oeffentliche-verwaltung_node.html).",
            questions: [
              "Werden eine geeignete, sichere Datenhaltung und sichere Übertragungswege vorgeschrieben?",
              "Wurden Maßnahmen vorgeschrieben, um Betrugsversuche zu erschweren?",
              "Wurden veraltete Informationssicherheitsbedürfnisse identifiziert und abgeschafft?",
              "Gibt es passende, anerkannte [Nachweise oder Zertifizierungen](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/standards-und-zertifizierung_node.html), z. B. [ISO 27001](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/Zertifizierte-Informationssicherheit/zertifizierte-informationssicherheit.html)?",
            ],
          },
        ],
      },
      exampleLink: {
        url: ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY.url,
        text: "Beispiele betrachten",
      },
    },
  ],
  nextStepMethods: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "2.5. Technische Umsetzbarkeit sicherstellen",
    text: "Analysieren Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende und neue Abläufe und IT-Systeme. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der umsetzenden Akteurinnen und Akteure zurück.",
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
    title:
      "Verfassen Sie den Regelungsentwurf und dokumentieren Sie Ihre Entscheidungen",
    text: "Die gesammelten Erkenntnisse und Ergebnisse helfen Ihnen dabei, Aspekte der Digitaltauglichkeit in Ihrem Regelungsentwurf zu berücksichtigen. Diese Entscheidungen dokumentieren Sie in einem Fragebogen.",
    buttons: [
      {
        text: "Zu „Erarbeiten“",
        look: "tertiary" as const,
        href: ROUTE_METHODS.url + "#verfassen-des-regelungsentwurfes",
      },
    ],
  },
  principlePosterBox: {
    badgeText: "Download",
    heading: "Die Prinzipien als Poster",
    content:
      "Drucken Sie sich das Poster in A4 oder A3 aus, um die Prinzipien für digitaltaugliche Gesetzgebung immer im Blick zu haben.",
    imageUrl: "/images/Poster_5Prinzipien.jpg",
    imageAlt: "Poster der 5 Prinzipien",
    downloadTitle: "Poster herunterladen",
    downloadUrl: ROUTE_DOWNLOAD_PRINCIPLE_POSTER.url,
  },
};

export const getDetailsSummary = (detailsSummary: DetailsSummary) => {
  const items = detailsSummary.items.map((detailsSummaryItem) => {
    const questions = detailsSummaryItem.questions
      .map((question) => `- ${question}`)
      .join("\n");

    const wordingExample = detailsSummaryItem.wordingExample
      ? `\n\n${methodsFivePrinciples.wordingExampleTitle}\n${detailsSummaryItem.wordingExample}`
      : "";

    const content = `${detailsSummaryItem.text}\n\n${methodsFivePrinciples.questionsTitle}\n${questions}${wordingExample}`;

    return { title: detailsSummaryItem.title, content };
  });

  return {
    title: {
      text: detailsSummary.title,
      tagName: "h3",
    } as HeadingProps,
    items,
  };
};
