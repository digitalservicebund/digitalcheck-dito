import type { TQuestion } from "~/routes/vorpruefung.$questionId/route";
import {
  ROUTE_A11Y,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_STATIC_PDF,
  ROUTE_EXAMPLES,
  ROUTE_GENERAL_INFO,
  ROUTE_INTEROPERABILITY,
  ROUTE_LANDING,
  ROUTE_METHODS,
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_FIVE_PRINCIPLES,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_METHODS_TASKS_PROCESSES,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
  ROUTE_PRECHECK,
  ROUTE_PRINCIPLES,
  ROUTE_PRIVACY,
  ROUTE_RESULT,
  ROUTE_SUPPORT,
  ROUTE_VISUALISATIONS,
  TOOLFINDER,
} from "./staticRoutes";

import {
  Apps,
  DriveFileRenameOutline,
  Layers,
  Source,
} from "@digitalservicebund/icons";
import AdsClickOutlined from "@digitalservicebund/icons/AdsClickOutlined";
import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import CheckCircleOutlined from "@digitalservicebund/icons/CheckCircleOutlined";
import ContactSupportOutlined from "@digitalservicebund/icons/ContactSupportOutlined";
import DrawOutlined from "@digitalservicebund/icons/DrawOutlined";
import FormatListBulletedOutlined from "@digitalservicebund/icons/FormatListBulletedOutlined";
import GroupOutlined from "@digitalservicebund/icons/GroupOutlined";
import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import PlaylistAddCheckOutlined from "@digitalservicebund/icons/PlaylistAddCheckOutlined";
import StickyNote2Outlined from "@digitalservicebund/icons/StickyNote2Outlined";
import SupportOutlined from "@digitalservicebund/icons/SupportOutlined";
import TimerOutlined from "@digitalservicebund/icons/TimerOutlined";

export const siteMeta = {
  title: "Digitalcheck: Digitaltaugliche Regelungen erarbeiten",
  description:
    "Hier erfahren Sie als Legistin oder Legist, was Digitaltauglichkeit für Ihr Regelungsvorhaben bedeutet, wie Sie eine reibungslose Umsetzung des Vorhabens ermöglichen und welche Unterlagen Sie benötigen.",
};

export const header = {
  title: "Digitalcheck",
  contact: {
    msg: "Kontaktieren Sie den Support",
    number: "0151/40 76 78 39",
  },
  underConstruction:
    "Dieses Angebot befindet sich im Aufbau und wird auf Basis Ihrer Rückmeldung weiterentwickelt.",
};

export const general = {
  buttonBack: {
    text: "Zurück",
  },
  tableOfContents: {
    headline: "Inhalt",
  },
};

const stepNKR = {
  headline: {
    text: "Prüfen durch den NKR",
  },
  content: `Der NKR (Nationaler Normenkontrollrat) prüft Ihr Vorhaben hinsichtlich der Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung. Bei Fragen wird der NKR auf Sie zukommen.`,
};
export const steps = {
  preCheck: {
    headline: {
      text: "Vorprüfung: Digitalbezug einschätzen",
    },
    content:
      "Finden Sie heraus, ob Sie in Ihrem Regelungsvorhaben Aspekte der digitalen Umsetzung und EU-Anforderungen an Interoperabilität beachten müssen. Danach entscheidet sich, ob die weiteren Schritte für Sie relevant sind.",
    buttons: [
      {
        text: "Digitalbezug einschätzen",
        href: ROUTE_PRECHECK.url,
      },
    ],
    finished: {
      headline: {
        text: "Abgeschlossene Vorprüfung: Der Digitalbezug wurde eingeschätzt.",
      },
      isDisabled: true,
    },
  },
  methods: {
    headline: {
      text: "Erarbeiten des Regelungsvorhabens",
    },
    content:
      "Nutzen Sie passende Methoden und Werkzeuge, um Digitaltauglichkeit und Interoperabilität in Ihrer Regelung sicherzustellen. Das Digitalcheck-Team steht Ihnen bei der Erarbeitung zur Verfügung.",
    buttons: [
      {
        text: "Zu „Erarbeiten“",
        href: ROUTE_METHODS.url,
        look: "link" as const,
      },
    ],
    finished: {
      headline: {
        text: "Abgeschlossene Erarbeitung eines digitaltauglichen Regelungsvorhabens.",
      },
      isDisabled: true,
    },
  },
  documentation: {
    headline: {
      text: "Dokumentieren des Regelungsvorhabens",
    },
    content: `Dokumentieren Sie in einem Fragebogen, auf welche Aspekte der Digitaltauglichkeit  Sie besonders geachtet haben. Beschreiben Sie wie Sie diese in das Regelungsvorhaben einfließen lassen. Die Erkenntnisse der vorigen Schritte helfen Ihnen beim Ausfüllen.`,
    buttons: [
      {
        text: "Zu „Dokumentieren“",
        href: ROUTE_DOCUMENTATION.url,
        look: "link" as const,
      },
    ],
    finished: {
      headline: {
        text: "Abgeschlossene Dokumentation der Digitaltauglichkeit.",
      },
      isDisabled: true,
    },
  },
  nkr: stepNKR,
  nkrFinal: {
    ...stepNKR,
    content:
      stepNKR.content +
      `<br class="block content-[''] !mb-24" />
Senden Sie die von Ihnen erstellte Dokumentation per E-Mail an folgende Adresse: 
[nkr@bmj.bund.de](mailto:nkr@bmj.bund.de)
<br class="block content-[''] !mb-24" />
Damit ist der Digitalcheck für Sie beendet.`,
  },
};

export const landing = {
  title: "Digitaltaugliche Regelungen erarbeiten",
  subtitle: `Hier erfahren Sie,
  - was Digitaltauglichkeit für Ihr Regelungsvorhaben bedeutet,
  - wie Sie eine reibungslose Umsetzung des Vorhabens ermöglichen,
  - welche Unterlagen Sie benötigen.`,
  list: {
    title: "So gehen Sie vor",
    items: [
      steps.preCheck,
      {
        spacer: {
          text: "Bei positiver Vorprüfung:",
        },
        ...steps.methods,
      },
      steps.documentation,
      steps.nkr,
    ],
  },
  dataNotice: {
    headline: "Ihre Arbeitsstände werden eine Woche lang gespeichert.",
    content:
      "Um in dieser Zeit zu Ihrem alten Arbeitsstand zurückzukehren, nutzen Sie bitte denselben Rechner und Browser.",
  },
  trainings: {
    title: "Beispiele für Digitaltauglichkeit",
    text: `Auf dieser Seite finden Sie Beispiele für digitaltaugliche Regelungsvorhaben. Lassen Sie sich inspirieren durch:
- die Umsetzung der 5 Prinzipien in Regelungstexten durch konkrete Formulierungen
- geeignete Visualisierungen einzelner Sachverhalte und ganzer Regelungsvorhaben`,
    link: {
      text: "Jetzt Beispiele entdecken",
      href: ROUTE_EXAMPLES.url,
      look: "link" as const,
    },
    /*    title: "Schulungsangebote im Herbst",
    text: `In den kommenden Monaten bieten wir 90-minütige Online-Schulungen an zu folgenden Themen:
- **Regelungen digitaltauglich gestalten** – praktische Tipps für den Digitalcheck
- **Visualisieren lernen** – Komplexes einfach darstellen`,
    link: {
      text: "Zu Schulungen anmelden",
      href: ROUTE_SUPPORT.url + "#angebote",
      look: "link" as const,
    },*/
  },
  interoperability: {
    title: "EU-Vorgaben zur Interoperabilität in Regelungen",
    text: `Seit Januar 2025 tritt die [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) in Kraft. Bestimmte Regelungsvorhaben müssen daher die EU-Anforderungen an Interoperabilität erfüllen. Ob und wie die Verordnung Ihr Vorhaben betrifft, erfahren Sie in unserer [Vorprüfung](/vorpruefung) und auf der Übersichtsseite zur Interoperabilität.`,
    link: {
      text: "Übersicht zur Interoperabilität",
      href: ROUTE_INTEROPERABILITY.url,
      look: "link" as const,
    },
  },
  summary: {
    title: "Zusammengefasst",
    items: [
      {
        headline: {
          text: "Was ist Digitaltauglichkeit?",
        },
        content: `Regelungen werden vermehrt digital umgesetzt. Beispiele sind eine Gesetzesänderung, mit der ein Papierantrag durch einen Online-Antrag ersetzt wird oder eine Verordnung, die Änderungen in den IT-Verfahren nachgelagerter Behörden erfordert.
<br class="block content-[''] !mb-24" />
Damit die digitale Umsetzung reibungslos klappt, muss die Regelung digitaltauglich gestaltet sein. Das heißt erstens, dass der digitalen Umsetzung nichts im Wege steht, wie zum Beispiel das persönliche Einreichen von Dokumenten. Zweitens soll aktiv gefördert werden, dass möglichst viele Schritte von Computern durchgeführt oder unterstützt werden.`,
      },
      {
        headline: {
          text: "Digitaltaugliche Regelungen sparen Ressourcen",
        },
        content: `Eine gute digitale Umsetzung spart langfristig Zeit und sorgt dafür, dass Ziel und Wirkung des Vorhabens erreicht werden: auf Seiten der Normadressaten und -adressatinnen und auf Seiten der Verwaltung.`,
      },
      {
        headline: {
          text: "Alle Regelungsvorhaben sind betroffen",
        },
        content: `Der Digitalcheck gilt für alle Regelungsvorhaben (Gesetze, Verordnungen und Verwaltungsvorschriften), sowohl für neue Vorhaben als auch für Änderungen an bestehenden Regelungen.`,
      },
    ],
  },
  links: {
    title: "Weitere Unterstützungsangebote für Ihr Vorhaben",
    subtitle:
      "Nutzen Sie unsere Services die Ihnen dabei helfen digitaltaugliche Regelungen zu schreiben.",
    items: [
      {
        headline: {
          text: "Werkzeuge für Visualisierung",
        },
        label: "Werkzeugfinder",
        icon: DriveFileRenameOutline,
        content: `Finden Sie mit dem Werkzeugfinder die passenden Werkzeuge und Methoden, um Prozesse zu visualisieren.`,
        buttons: [
          {
            text: "Werkzeugfinder nutzen",
            href: TOOLFINDER,
            look: "tertiary" as const,
          },
        ],
      },
      {
        headline: {
          text: "Digitaltaugliche Beispiele",
        },
        label: "Beispielsammlung",
        icon: Source,
        content: `Sehen Sie Beispiele von Regelungen an, die digitaltaugliche Aspekte berücksichtigen und die Prinzipien für Digitaltauglichkeit bedacht haben.`,
        buttons: [
          {
            text: "Beispiele ansehen",
            href: ROUTE_EXAMPLES.url,
            look: "tertiary" as const,
          },
        ],
      },
    ],
  },
  principles: {
    title: "5 Prinzipien für digitaltaugliche Gesetzgebung",
    content: [
      "Prinzip 1: Digitale Kommunikation sicherstellen",
      "Prinzip 2: Wiederverwendung von Daten und Standards ermöglichen",
      "Prinzip 3: Datenschutz und Informationssicherheit gewährleisten",
      "Prinzip 4: Klare Regelungen für eine digitale Ausführung finden",
      "Prinzip 5: Automatisierung ermöglichen",
    ],
    link: {
      text: "Details und Beispiele",
      href: ROUTE_METHODS_FIVE_PRINCIPLES.url,
    },
  },
};

export const supportBanner = {
  feedback: {
    title: "Haben Sie Fragen oder Anmerkungen?",
    text: "Dieser Dienst ist im Aufbau. Wenn Ihnen etwas fehlt oder etwas nicht funktioniert, kontaktieren Sie uns über [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Anmerkungen:%20erarbeiten.digitalcheck.bund.de). Ihr Feedback trägt dazu bei, Informationen und Gestaltung der Webseite für alle Nutzenden zu verbessern.",
  },
  support: {
    title: "Sie haben Gesprächsbedarf zu Ihrem Vorhaben?",
    text: `Bei inhaltlichen Anliegen zu Ihrem Regelungsvorhaben helfen wir Ihnen gerne weiter. Schreiben Sie uns über [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Gesprächsbedarf:%20erarbeiten.digitalcheck.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:+4915140767839).`,
  },
};

const feedbackForm = {
  heading: "Ihr Feedback hilft uns weiter!",
  contact:
    "Schreiben Sie uns eine Email an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Feedback:%20erarbeiten.digitalcheck.bund.de), wenn wir Sie für Feedback zu unserem Service kontaktieren dürfen.",
  success: {
    heading: "Vielen Dank für Ihr Feedback!",
    text: "Wir schätzen Ihre Rückmeldung sehr und werden sie in unsere Verbesserungen einfließen lassen.",
  },
  button: "Feedback absenden",
  optionsSimple: [
    { label: "Sehr schwierig", value: 1 },
    { label: "Schwierig", value: 2 },
    { label: "Moderat", value: 3 },
    { label: "Einfach", value: 4 },
    { label: "Sehr einfach", value: 5 },
  ],
  optionsUseful: [
    { label: "Nicht hilfreich", value: 1 },
    { label: "Wenig hilfreich", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Hilfreich", value: 4 },
    { label: "Sehr hilfreich", value: 5 },
  ],
};

export const interviewBanner = {
  title: "Wir suchen Gesprächspartner und Gesprächspartnerinnen!",
  text: `Um diese Seite weiterzuentwickeln, suchen wir nach Personen, die uns in einem 45-minütigen Gespräch Feedback geben. Schreiben Sie uns gerne eine E-Mail und wir melden uns bei Ihnen: [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Gesprächspartner:%20erarbeiten.digitalcheck.bund.de).`,
};

export const preCheck = {
  start: {
    title: "1. Vorprüfung: Digitalbezug einschätzen",
    subtitle:
      "Finden Sie in 6 Fragen heraus, ob Sie in Ihrem Regelungsvorhaben Aspekte der digitalen Umsetzung und EU-Anforderungen an Interoperabilität beachten müssen.",
    hints: [
      {
        title: "Was ist Digitalbezug?",
        text: `Digitalbezug beschreibt die digitale Umsetzung, wenn ein Prozess nach Inkrafttreten eines Vorhabens zumindest teilweise durch ein IT-System abgebildet wird. Beispiele sind:
- eine Reihe von Aufgaben mit einem bestimmten Ziel, zum Beispiel das Ausfüllen eines Formulars in ELSTER, um die Steuererklärung einzureichen,
- die Abfrage von Daten aus einem Register oder
- das Bereitstellen von Informationen auf einer Website.`,
      },
      {
        title: "Was ist Interoperabilität?",
        text: `Die EU-Anforderungen zur Interoperabilität beschreiben die Fähigkeit von Verwaltungen und öffentlichen Einrichtungen innerhalb der EU, effektiv zusammenzuarbeiten und Informationen auszutauschen. Sie ermöglicht, dass digitale öffentliche Dienstleistungen über Länder-, Sektor- und Organisationsgrenzen hinweg bereitgestellt werden können.`,
      },
    ],
    buttonText: "Vorprüfung starten",
    summary: {
      title: "Zusammengefasst",
      items: [
        {
          headline: {
            text: "Beginnen Sie so früh wie möglich",
          },
          content:
            "Führen Sie die Vorprüfung zu Beginn Ihrer Arbeit an einem Regelungsvorhaben durch. Das heißt bevor Sie den Regelungstext formulieren.",
        },
        {
          headline: {
            text: "Warum ist die Vorprüfung relevant für mein Vorhaben?",
          },
          content: `
- **Digitalisierungsbezug frühzeitig erkennen:** Setzen Sie sich frühzeitig mit Chancen der Digitalisierung auseinander, um den Regelungstext so zu gestalten, dass er die praxisnahe Umsetzung ermöglicht.<br/><br/>
- **EU-Anforderungen identifizieren:** Im Rahmen der Vorprüfung ermitteln Sie, ob grenzüberschreitende Interoperabilität für Ihr Vorhaben relevant ist. Regelungen die  Interoperabilität fördern, ermöglichen technische Standardisierung, rechtliche Harmonisierung und digitale bürgerzentrierte Dienste innerhalb der EU.<br/><br/>
- **Rechtliche Grundlage:** Seit Juni 2024 ist es verpflichtend nationale Regelungsvorhaben auf Digitaltauglichkeit zu prüfen. Die Grundlage dafür ist das Onlinezugangsgesetz (OZG) von 2017. Zusätzlich müssen ab Januar 2025 bestimmte Regelungsvorhaben die Anforderungen an Interoperabilität auf EU-Ebene unterstützen. Dies ergibt sich aus der EU-Verordnung [Interoperable Europe Act](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903).<br/><br/>
          `,
        },
      ],
    },
    info: {
      title: "Digitalbezug und Interoperabilität",
      text: `Digitalbezug und Interoperabilität sind eng miteinander verknüpft. Wenn ein Gesetz oder eine Regelung digitale Prozesse vorsieht, müssen oft technische und organisatorische Standards eingehalten werden. 
Interoperabilität bedeutet, dass verschiedene öffentliche Institutionen über Ländergrenzen hinweg zusammenarbeiten können.
<br /><br />
Wenn ein Vorhaben die EU-Anforderungen für Interoperabilität erfüllen muss, hat es automatisch auch einen Digitalbezug. 
      `,
      image: {
        src: "/images/digital-readiness-meets-interop.svg",
        alt: `Illustration von Datenaustausch zwischen zwei Computer-Systemen mit EU-Flagge, symbolisiert europäische digitale Zusammenarbeit.`,
      },
      button: {
        text: "Alles zur Interoperabilität",
        href: ROUTE_INTEROPERABILITY.url,
      },
    },
  },
  faq: {
    title: "Häufige Fragen",
    items: [
      {
        headline: "Was ist Interoperabilität im EU-Kontext?",
        content: `Interoperabilität bedeutet, dass Verwaltungen und öffentliche Einrichtungen in der EU zusammenarbeiten und Informationen austauschen können. So können digitale Dienstleistungen, wie z. B. das Beantragen von Dokumenten oder der Austausch von Gesundheitsdaten, über Länder- und Organisationsgrenzen hinweg einfach bereitgestellt werden.

Das [European Interoperability Framework (EIF)](https://interoperable-europe.ec.europa.eu/collection/nifo-national-interoperability-framework-observatory/european-interoperability-framework-detail) legt hierfür Standards und Regeln fest, die sicherstellen, dass IT-Systeme in der EU miteinander kompatibel sind. Das macht es für Bürger:innen und Unternehmen leichter, öffentliche Dienste in der gesamten EU zu nutzen.
        `,
      },
      {
        headline: "Was bedeutet Interoperabilität in meinem Vorhaben?",
        content: `Wenn Gesetze und Regelungen die Interoperabilität berücksichtigen, fördern sie die Zusammenarbeit zwischen den EU-Mitgliedsstaaten und ihren Verwaltungen. Einheitliche Standards sorgen dafür, dass digitale Dienste bürgerfreundlich, effizient und sicher sind. Gleichzeitig werden einheitliche Regeln geschaffen, die die grenzüberschreitende Zusammenarbeit in der EU erleichtern und eine harmonische Entwicklung der Rechtsvorschriften fördern.`,
      },
      {
        headline:
          "Welche Rolle spielt der Digitalcheck bei interoperablen Regelungsvorhaben?",
        content: `Der Digitalcheck begleitet Sie bei der Erarbeitung für digitaltaugliche und ab Januar 2025 interoperable Regelungsvorhaben. Dieser Auftrag wurde dem Digitalcheck vom BMI erteilt.
        <br/><br/>
Wenn Ihr Regelungsvorhaben Anforderungen an Interoperabilität beinhaltet, unterstützen wir Sie dabei, diese optimal umzusetzen. In diesem Fall wird das Digitalcheck-Team automatisch über das Ergebnis informiert, sobald Sie es per E-Mail absenden. Wir setzen uns dann mit Ihnen in Verbindung, um gemeinsam die weiteren Schritte zu planen und umzusetzen. Sollten Sie vorab Fragen haben, können Sie sich jederzeit direkt an uns wenden - telefonisch unter [0151/40 76 78 39](tel:+4915140767839) oder per E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de).`,
      },
      {
        headline: "Was ist Digitalbezug?",
        content: `Digitalbezug im Kontext der Umsetzung bedeutet, dass ein Prozess zumindest teilweise durch ein IT-System abgebildet wird. Beispiele sind:
- eine Reihe von Aufgaben mit einem bestimmten Ziel, zum Beispiel das Ausfüllen eines Formulars in ELSTER, um die Steuererklärung einzureichen,
- die Abfrage von Daten aus einem Register oder
- das Bereitstellen von Informationen auf einer Website.`,
      },
      {
        headline: "Warum digitaltaugliche Regelungen schreiben?",
        content: `**Digitaltaugliche Regelungen sparen Ressourcen**<br/>
Eine gute digitale Umsetzung spart langfristig Zeit und sorgt dafür, dass Ziel und Wirkung des Vorhabens erreicht werden - auf Seiten der Normadressaten und -adressatinnen und auf Seiten der Verwaltung.
<br/><br/>
**Relevant für all Regelungsvorhaben**<br/>
Der Digitalcheck gilt für alle Regelungsvorhaben - Gesetze, Verordnungen und Verwaltungsvorschriften. Es fallen sowohl neue Vorhaben, als auch Änderungen an bestehenden Regelungen darunter.`,
      },
      {
        headline: "Was ist, wenn ich mehrere Regelungen habe?",
        content: `Füllen Sie eine gemeinsame Vorprüfung für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus. So viele wie nötig, so wenige wie möglich.`,
      },
      {
        headline: "Kann ich das PDF für die Vorprüfung weiterhin verwenden?",
        content: `Sie können weiterhin das PDF-Dokument zur Vorprüfung verwenden, um den digitalen Aspekt Ihres Vorhabens zu bewerten. Bitte beachten Sie jedoch, dass die PDF-Version nicht geeignet ist, um Anforderungen zur Interoperabilität zu identifizieren.`,
      },
    ],
  },
  nextButton: "Übernehmen & weiter",
  answerOptions: {
    yes: "Ja",
    no: "Nein",
    unsure: "Ich bin unsicher",
  },
  generalInfo: {
    headline: "Allgemeine Hinweise",
    text: "Alle Fragen beziehen sich auch auf die **Umsetzung** nach Inkrafttreten des Regelungsvorhabens.",
    hint: {
      title: "Eine oder mehrere Vorprüfungen?",
      text: "Füllen Sie eine gemeinsame Vorprüfung für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus. So viele wie nötig, so wenige wie möglich.",
    },
    nextButton: "Okay & weiter",
  },
  questions: [
    {
      id: "it-system",
      title: "IT-System",
      question:
        "Muss durch die Regelung ein IT-System angepasst oder neu entwickelt werden?",
      positiveResult: "einer Anpassung oder Neuentwicklung einer IT-Lösung.",
      negativeResult: "keiner Anpassung oder Neuentwicklung einer IT-Lösung.",
      text: "**Praxisbeispiel**: Eine Regelung schreibt vor, dass eine Datenbank potentielle Schadstoffe in Lebensmitteln erfasst. Nun kommen neue Inhaltsstoffe dazu. Oder pro Inhaltsstoff müssen weitere Daten zur langfristigen Schädlichkeit erfasst werden. Dafür muss die Datenbank (das IT-System) angepasst werden.",
      hint: {
        title: "Was ist ein IT-System?",
        text: `IT-Systeme sind technische Lösungen, die aus Hardware (wie Computer, Kartenlesegeräte, Router) oder Software (Programme wie ELSTER und Word, Websiten, Apps) bestehen, um Informationen zu speichern, zu verarbeiten und zu übertragen. 
      <br />
      Mit ihnen können Aufgaben ausgeführt werden, wie das Übermitteln der Einkommenssteuererklärung mit ELSTER.`,
      },
    },
    {
      id: "verpflichtungen-fuer-beteiligte",
      title: "Verpflichtungen für Beteiligte",
      question:
        "Entstehen durch die Regelung Mitwirkungspflichten für Akteur:innen?",
      positiveResult: "einer Festlegung von Mitwirkungspflichten für Akteure.",
      negativeResult: "keiner Festlegung von Mitwirkungspflichten für Akteure.",
      text: "**Praxisbeispiel**: Für eine staatliche Förderung ist neben der Land- und Forstwirtschaft nun auch das produzierende Gewerbe berechtigt. Der Anspruch dieser Unternehmen kann nicht nach denselben Kriterien geprüft werden. Die Vorhalte-/Nachweispflichten müssen auf diese Gruppe angepasst werden, dabei müssen die für die Beteiligten üblichen digitalen Möglichkeiten mitgedacht, bzw. geschaffen werden.",
      hint: {
        title: "Wer sind Akteur:innen?",
        text: `Akteur:innen sind in diesem Zusammenhang all diejenigen, die an der Umsetzung des Regelungsvorhabens beteiligt sind. Das können sowohl Vollzugsakteur:innen als auch Betroffene sein.

Beispiele für Akteur:innen sind:
- Bürger:innen, 
- Einwohnende, 
- Kommunen, Verwaltungen und Behörden, deren IT- oder Rechtsabteilungen
- IT-Dienstleistende,
- Unternehmen und 
- weitere Organisationen wie z.B. Vereine.`,
      },
    },
    {
      id: "datenaustausch",
      title: "Datenaustausch",
      question:
        "Werden durch die Regelung Daten erhoben, die der Verwaltung möglicherweise bereits vorliegen?",
      positiveResult: "einem Austausch von Daten.",
      negativeResult: "keinem Austausch von Daten.",
      text: "**Praxisbeispiel**: Arbeitnehmende müssen ihr Gehalt in der Einkommenssteuererklärung angeben. Diese Information liegt der Sozialversicherung bereits vor. Eine Wiederverwendung dieser Daten ist bürokratiearm und sollte bei der Erarbeitung der Regelung angestrebt werden.",
      hint: {
        title: "Was ist mit „Daten erheben“ gemeint?",
        text: `Einige Informationen liegen in der Verwaltung bereits vor: Dies können Daten von Bürger:innen, Unternehmen und Organisationen bspw. Vereinen sein. Im besten Fall werden diese Daten automatisiert zwischen den Behörden ausgetauscht.`,
      },
    },
    {
      id: "kommunikation",
      title: "Digitale Kommunikation",
      question:
        "Führt die Regelung zu einer Interaktion zwischen Behörden und Bürger:innen / Unternehmen?",
      positiveResult:
        "einer Interaktion zwischen Behörden und Bürger:innen/Unternehmen.",
      negativeResult:
        "keiner Interaktion zwischen Behörden und Bürger:innen/Unternehmen.",
      text: "**Praxisbeispiel**: Ein Antrag für Steuerentlastung muss gestellt und abgeschickt werden — dies kann digital, ohne händische Unterschrift oder analoge Nachweise geschehen. Es können z.B. Unternehmen, Bürger:innen oder Organisationen den Antrag einreichen.",
    },
    {
      id: "automatisierung",
      title: "Automatisierung",
      question:
        "Kann die Umsetzung der Regelung verbessert werden, indem man Schritte automatisiert?",
      positiveResult:
        "einer Verbesserung der Umsetzung der Regelung durch die Automatisierung von Schritten.",
      negativeResult:
        "keiner Verbesserung der Umsetzung der Regelung durch die Automatisierung von Schritten.",
      text: "**Praxisbeispiel**: Durch die automatisierte Auszahlung der Energiepreispauschale entfällt sowohl das Errechnen eines Leistungsanspruchs als auch die manuelle Antragstellung durch Leistungsberechtigte.",
    },
    {
      id: "eu-bezug",
      title: "EU-Bezug",
      question:
        "Ist durch die Regelung vorgesehen, dass Daten und Informationen zwischen Verwaltungen von EU-Mitgliedsstaaten ausgetauscht werden?",
      positiveResult:
        "einem Daten- und Informationsaustausch zwischen EU-Mitgliedsstaaten.",
      negativeResult:
        "keinem Daten- und Informationsaustausch zwischen EU-Mitgliedsstaaten.",
      resultHint: {
        positiveResult: `**Bitte beachten Sie:** Wenn Ihr Vorhaben keinen Digitalbezug aufweist, können die Anforderungen der Interoperabilität nicht erfüllt werden – selbst dann nicht, wenn ein Daten- und Informationsaustausch zwischen EU-Mitgliedsstaaten stattfindet.`,
        unsureResult: `**Das können Sie tun:** Kontaktieren Sie uns unter [0151/40 76 78 39](tel:+4915140767839) oder  per E-Mail an [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de). Wir unterstützen Sie gerne bei der Beantwortung dieser Frage.`,
      },
      text: "**Praxisbeispiel**: Ein Vorhaben sieht vor, dass Bürger:innen in der EU eine digitale Identitäts-Wallet nutzen können, die von ihrem Heimatstaat ausgestellt wird. Diese Wallet erlaubt es, Identitätsnachweise und Dokumente (z. B. Führerscheine, Berufsqualifikationen) grenzüberschreitend zu verwenden. Damit andere Mitgliedstaaten diese Nachweise anerkennen können, ist ein Austausch von Daten und harmonisierten Standards erforderlich, um deren Echtheit zu überprüfen.",
      hint: {
        title: "Wen betrifft dieser Daten- und Informationsaustausch?",
        text: `Daten und Informationen können zwischen den digitalen öffentlichen Diensten in der EU ausgetauscht werden:
      <br />
- Zwischen Verwaltungen von EU-Mitgliedstaaten, um gemeinsame Aufgaben oder Dienste zu erfüllen.
- Zwischen EU-Institutionen, etwa bei der Zusammenarbeit zur Umsetzung von EU-Programmen oder Richtlinien.
- Zwischen EU-Institutionen und nationalen Verwaltungen, z. B. bei der Übermittlung von Informationen oder der Koordination von Maßnahmen auf europäischer Ebene.`,
      },
      interoperability: true,
    },
  ].map((question, index, questions) => ({
    // generate list from the questions such that each list has a path, a previous link and a next link
    ...question,
    url: `${ROUTE_PRECHECK.url}/${question.id}`,
    prevLink:
      index === 0
        ? ROUTE_GENERAL_INFO.url
        : `${ROUTE_PRECHECK.url}/${questions[index - 1].id}`,
    nextLink:
      index === questions.length - 1
        ? ROUTE_RESULT.url
        : `${ROUTE_PRECHECK.url}/${questions[index + 1].id}`,
  })) as TQuestion[],

  result: {
    title: "Ergebnis der Vorprüfung",
    reasoningIntro: {
      digital: {
        sure: "In Bezug auf **digitale Aspekte** führt ihr Regelungsvorhaben zu...",
        unsure:
          "In Bezug auf **digitale Aspekte** ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
      },
      interoperability: {
        sure: "In Bezug auf **Interoperabilität** führt ihr Regelungsvorhaben zu...",
        unsure:
          "In Bezug auf **Interoperabilität** ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
      },
    },
    positive: {
      title: "Das Regelungsvorhaben hat einen **Digitalbezug** und ",
      actionButton: {
        text: "Vorprüfung herunterladen",
      },
      nextSteps: {
        title: "So machen Sie weiter",
        steps: [
          steps.preCheck.finished,
          {
            ...steps.methods,
          },
          steps.documentation,
          steps.nkrFinal,
        ],
      },
    },
    unsure: {
      title: "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      hint: "Bitte kontaktieren Sie den Digitalcheck-Support unter: [0151/40 76 78 39](tel:+4915140767839) oder schreiben Sie uns eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) mit Ihren Fragen. Wir helfen Ihnen, die Vorprüfung auszufüllen.",
      actionButton: {
        text: "Vorprüfung wiederholen",
        href: ROUTE_PRECHECK.url,
      },
      nextStep: {
        title:
          "Sie können auch ohne positive Vorprüfung die Digitaltauglichkeit Ihres Regelungsvorhabens sicherstellen.",
        text: "Wenn digitale Umsetzung für Ihr Regelungsvorhaben wichtig ist, finden Sie hier passende Methoden und Werkzeuge. Sie erfahren, wie Sie den Prozess darstellen und durchdenken, mit Beteiligten ins Gespräch kommen und die fünf Prinzipien anwenden.",
        link: {
          text: "Zu „Erarbeiten“",
          href: ROUTE_METHODS.url,
        },
      },
    },
    negative: {
      title: "Das Regelungsvorhaben hat **keinen Digitalbezug** und ",
      nextSteps: {
        title: "So machen Sie weiter",
        steps: [steps.preCheck.finished, steps.nkrFinal],
      },
    },
    interoperability: {
      info: {
        title: "Erfahren Sie mehr über Interoperabilität",
        content:
          "Was bedeutet Interoperabilität für Regelungen, und wie beeinflusst sie deren Erarbeitung? Auf unserer Übersichtsseite finden Sie alle wichtigen Informationen dazu.",
        button: {
          text: "Mehr zu Interoperabilität",
          href: ROUTE_INTEROPERABILITY.url,
          look: "link" as const,
        },
      },
      positive: {
        title: "enthält Anforderungen der **Interoperabilität**.",
      },
      negative: {
        title: "**keine** Anforderungen der **Interoperabilität**.",
      },
      unsure: {
        title: "**keine eindeutigen** Anforderungen der **Interoperabilität**.",
      },
    },
    form: {
      formLegend: "Vorprüfung senden",
      instructions: `Wir erstellen für Sie eine E-Mail mit dem Ergebnis der Vorprüfung, die sich in Ihrem E-Mail-Programm öffnet. Diese können Sie anschließend an den Nationalen Normenkontrollrat (NKR), das Digitalcheck-Team und an Ihre eigene E-Mail-Adresse senden. Geben Sie Ihre eigene E-Mail-Adresse an, um sich diese als **Teil der Dokumentation** zu schicken.
      <br/><br/>
- Falls Ihr Vorhaben Interoperabilitäts-Anforderungen erfüllt, lassen Sie das Digitalcheck-Team bitte im Kopie-Feld der E-Mail. Wir erhalten somit das Vorprüfungsergebnisses in Kopie und kontaktieren Sie für die nächsten Schritte. Bei Fragen können Sie uns auch direkt unter [0151/40 76 78 39](tel:+4915140767839) erreichen.<br/><br/> 
- Je früher und tiefer Sie sich mit dem NKR über den Digitalbezug Ihres Regelungsvorhabens austauschen, desto schneller wird die Prüfung abgeschlossen.`,
      emailLabel: "Ihre E-Mail Adresse (optional)",
      policyTitleLabel: "Vorläufiger Arbeitstitel des Vorhabens",
      policyTitleRequired: "Bitte geben Sie einen Titel für Ihr Vorhaben an.",
      policyTitleTooLong:
        "Bitte wählen Sie einen kürzeren Titel (100 Zeichen) und ergänzen Sie diesen gegebenenfalls direkt in der resultierenden E-Mail.",
      precheckAnswersRequired: "Bitte geben Sie die Vorprüfung-Antworten an",
      reasonLabel: "Begründung",
      reasonRequired:
        "Bitte geben Sie eine Begründung für den fehlenden Digitalbezug an.",
      reasonLong:
        "Achtung, Ihre Begründung ist sehr lang. Möglicherweise sehen Sie in dem PDF nicht den gesamten Text. Sie können ihn aber vollständig kopieren, es gehen keine Inhalte verloren.",
      reasonTooLong:
        "Bitte geben Sie eine kürzere Begründung ein (500 Zeichen) und ergänzen Sie diese gegebenenfalls direkt in der resultierenden E-Mail.",
      emailClientHint: {
        title: "Ihr Email-Programm wird geöffnet...",
        text: "Dies kann je nach Anwendung einen Moment dauern. Sie können diesen Hinweis jederzeit schließen, sobald sich Ihr E-Mail-Programm geöffnet hat. Sollte sich Ihr E-Mail Programm nicht öffnen, kontaktieren Sie uns unter [0151/40 76 78 39](tel:+4915140767839) oder per E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de).",
      },
      faqs: {
        title: "Häufige Fragen zum Senden der Vorprüfung",
        details: [
          {
            label: "Was passiert, wenn ich auf „E-Mail erstellen“ klicke?",
            text: "In Ihrem E-Mail-Programm öffnet sich eine neue E-Mail. Diese enthält das Vorprüfungs-Ergebnis in Textform mit Ergebnissen zum Digitalbezug und EU-Interoperabilität. Sie haben die Möglichkeit, den Text und Empfänger individuell anzupassen und zusätzliche Dokumente anzufügen. Den Zeitpunkt des Versands wählen Sie selbst.",
          },
          {
            label: "Wie wird das Ergebnis der Vorprüfung dokumentiert?",
            text: `Wenn Sie das Ergebnis für Ihre Dokumentation benötigen, schicken Sie das Ergebnis per E-Mail an sich selbst und ggf. an Ihre Kolleg:innen. Es gibt zwei Möglichkeiten, die E-Mail zu verakten:

**Manuell über Outlook:**
- Klicken Sie in Outlook auf „Drucken“.
- Wählen Sie „Speichern als PDF“ und speichern Sie die Datei ab.
- Fügen Sie das PDF anschließend in Ihr E-Akten-System ein.

**Direkte Veraktung:**
- Nutzen Sie, falls vorhanden, die direkte Veraktungsfunktion in Outlook.
`,
          },
          {
            label: "Warum die Vorprüfung an den NKR schicken?",
            text: "Erfahrungswerte zeigen, dass ein frühzeitiger Austausch mit dem NKR oder dem DigitalService das Erarbeiten für Sie vereinfacht und die Prüfung beschleunigt. So können Sie von den Erfahrungen in anderen Vorhaben profitieren – wenn Sie dies wünschen.",
          },
        ],
      },
      downloadPdfButton: {
        text: "Als PDF-Datei herunterladen",
      },
      sendEmailButton: {
        text: "E-Mail erstellen",
      },
      emailTemplate: {
        toNkr: "nkr@bmj.bund.de",
        toDC: "interoperabel@digitalservice.bund.de",
        subject: "Digitalcheck Vorprüfung",
        bodyBefore: `Guten Tag,

hiermit erhalten Sie das Ergebnis Ihrer Vorprüfung:`,
        bodyAfter: `Mit freundlichen Grüßen

*Diese E-Mail wurde automatisch erstellt.*
`,
      },
      downloadStarted: "Vorprüfung wird heruntergeladen",
    },
    print: {
      titlePrefix: "Ihr Vorhaben: ",
    },
  },
};

export const methods = {
  title: "2. Erarbeiten eines digitaltauglichen Regelungsvorhabens",
  subtitle: `Hier finden Sie passende Methoden und Werkzeuge, um Digitaltauglichkeit in Ihrer Regelung sicherzustellen. 
<br class="block content-[''] !mb-24" />
Gehen Sie am besten in der vorgeschlagenen Reihenfolge vor.`,
  steps: {
    items: [
      {
        spacer: { text: "Der sichere Einstieg in jede Regelung" },
        headline: { text: "Erfassen Sie den Ist-Zustand" },
        text: `Ein solides Verständnis über den Ist-Zustand ist ein sinnvoller und sicherer Einstieg. Tauschen Sie sich mit den umsetzenden Akteurinnen und Akteuren aus. Bei dieser Gelegenheit können Sie auch nach Problemen in der aktuellen Praxis fragen.
Wenn Sie in den Gesprächen nichts Neues mehr erfahren, haben Sie den Status Quo erfasst.

**Ein Austausch über die aktuelle Praxis darf auch während des Entwurfsprozesses stattfinden.**

Mit diesen Informationen sind Sie gut vorbereitet, um  
- **Anforderungen** für die neue Regelung zu erarbeiten,  
- **Abstimmungsprozesse** zwischen Bund, Ländern, umsetzenden Behörden und Dienstleistern zu navigieren, 
- in der **formellen Beteiligung** eine wirkungsvolle Umsetzung zu besprechen.`,
      },
      {
        isSubstep: true,
        headline: { text: "2.1. Zuständige Akteurinnen und Akteure auflisten" },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** ca. vier Stunden",
          },
        ],
        text: "Wenn Sie ein Regelungsvorhaben erarbeiten, ist es entscheidend, die **Zuständigkeiten der umsetzenden Akteurinnen und Akteure** zu kennen: Sie sind die Expertinnen und Experten für die digitale, praktische Umsetzung in der Praxis und damit wertvolle Gesprächspartnerinnen und -partner.",
        buttons: [
          {
            text: "Ansprechpersonen finden",
            href: ROUTE_METHODS_RESPONSIBLE_ACTORS.url,
          },
        ],
      },
      {
        isSubstep: true,
        headline: {
          text: "2.2. Aufgaben und Abläufe gemeinsam erfassen",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** ca. sechs Stunden",
          },
          {
            icon: GroupOutlined,
            text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
          },
          {
            icon: ContactSupportOutlined,
            text: "**Support:** Komplexe Abläufen können Sie mit dem Digitalcheck-Support erfassen",
          },
        ],
        text: "Damit Ihre Regelung wirkungsvoll in die Praxis kommt, müssen Sie die **aktuellen Abläufe** verstehen. Holen Sie sich dazu Unterstützung von den Akteurinnen und Akteuren, die Sie im vorigen Schritt identifiziert haben. In diesem Schritt müssen Sie noch nicht auf geplante Neuerungen eingehen. Konzentrieren Sie sich auf den **Status Quo**.",
        buttons: [
          {
            text: "Aufgaben und Abläufe klären",
            href: ROUTE_METHODS_TASKS_PROCESSES.url,
          },
        ],
      },
      {
        isSubstep: true,
        headline: {
          text: "2.3. IT-Systeme gemeinsam erfassen",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** ca. sechs Stunden",
          },
          {
            icon: GroupOutlined,
            text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
          },
          {
            icon: ContactSupportOutlined,
            text: "**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support",
          },
        ],
        text: "Nutzen Sie das Fachwissen der Akteurinnen und Akteure, um die verwendeten IT-Systeme für die im vorigen Schritt identifizierten Abläufe zu erfassen und zu verstehen.",
        buttons: [
          {
            text: "IT-Landschaft verstehen",
            href: ROUTE_METHODS_COLLECT_IT_SYSTEMS.url,
          },
        ],
      },
      {
        spacer: { text: "Praxiswissen einsetzen und Auswirkungen verstehen" },
        headline: { text: "Entwickeln Sie eine digitaltaugliche Regelung" },
        text: "Mit einem guten Verständnis des Ist-Zustandes erarbeiten Sie nun Ihre Regelung. Jetzt geht es darum, Möglichkeiten zur Digitalisierung zu finden und Hindernisse aus dem Weg zu räumen — eine gute digitale Umsetzung spart langfristig Zeit und Geld und erfüllt die heutigen Erwartungen der Betroffenen an den Staat.",
      },
      {
        isSubstep: true,
        headline: {
          text: "2.4. Möglichkeiten und Hindernisse der digitalen Umsetzung identifizieren",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** Richtet sich nach der Komplexität des Vorhabens",
          },
        ],
        text: "Die fünf Prinzipien für digitaltaugliche Gesetzgebung decken unterschiedliche Aspekte der digitalen Umsetzung ab: Nutzen Sie die Erkenntnisse über den Ist-Zustand aus den vorigen Schritten, um mithilfe der Prinzipien die **Möglichkeiten der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen**.",
        buttons: [
          {
            text: "Fünf Prinzipien nutzen",
            href: ROUTE_METHODS_FIVE_PRINCIPLES.url,
          },
        ],
      },
      {
        isSubstep: true,
        headline: {
          text: "2.5. Technische Umsetzbarkeit sicherstellen",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** Richtet sich nach der Komplexität des Vorhabens",
          },
          {
            icon: GroupOutlined,
            text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
          },
          {
            icon: ContactSupportOutlined,
            text: "**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support",
          },
        ],
        text: "In diesem Schritt können Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende sowie neue Abläufe und IT-Systeme analysieren. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der umsetzenden Akteurinnen und Akteure zurück.",
        buttons: [
          {
            text: "IT-Auswirkungen prüfen",
            href: ROUTE_METHODS_TECHNICAL_FEASIBILITY.url,
          },
        ],
      },
      {
        spacer: { text: "Eine digitale, verwaltungsarme Regelung Schreiben" },
        headline: { text: "Verfassen Sie den Regelungsentwurf" },
        text: `Nun folgt der gewohnte Schreibprozess sowie die formelle Beteiligung, Abstimmungen im Haus und zwischen den Ressorts. 

Die Erkenntnisse und Ergebnisse aus den vorigen Schritten helfen Ihnen dabei,  
- Ihren **Regelungstext zu strukturieren**, insbesondere in Abschnitten, die die Umsetzung betreffen,
- in der **Gesetzesbegründung** auf Probleme im Ist-Zustand einzugehen,
- den **Umsetzungsprozess einfach besprechbar** zu machen in Abstimmungen anhand von Visualisierungen.`,
      },
      {
        isSubstep: true,
        headline: { text: "Schreiben Sie die Regelung" },
        text: "Nutzen Sie Ihre gewohnten Programme und Arbeitshilfen, um die Regelung zu schreiben — z. B. eNorm und das Handbuch der Rechtsförmigkeit.",
      },
    ],
  },
  nextSteps: {
    title: "So machen Sie weiter",
    items: [
      steps.preCheck.finished,
      steps.methods.finished,
      steps.documentation,
      steps.nkr,
    ],
  },
  feedbackForm: {
    heading: feedbackForm.heading,
    trackingEvent: "Feedback Methoden",
    questions: [
      {
        id: "simple-feedback",
        trackingEvent: "wie-einfach", // muss mit dem custom property in Plausible übereinstimmen
        text: "Wie einfach war es für Sie, unseren Dienst „Digitaltaugliche Regelungen erarbeiten“ zu nutzen?",
        options: feedbackForm.optionsSimple,
      },
      {
        id: "useful-feedback",
        trackingEvent: "wie-hilfreich", // muss mit dem custom property in Plausible übereinstimmen
        text: "Wie hilfreich fanden Sie die angebotenen Methoden und Werkzeuge für das Erarbeiten ihres Regelungsvorhaben?",
        options: feedbackForm.optionsUseful,
      },
    ],
    contact: feedbackForm.contact,
    button: feedbackForm.button,
    success: feedbackForm.success,
  },
};

export const digitalSuitability = {
  title: "Beispiele für Digitaltauglichkeit",
  subtitle:
    "Hier finden Sie Beispiele für digitaltaugliche Regelungen, sowie aus deren Erarbeitungsprozess. " +
    "Lassen Sie sich inspirieren, wie in Regelungsvorhaben Digitaltauglichkeit beachtet wurde.",
  paragraphs: {
    explanation: "Warum ist das gut?",
  },
  boxItems: [
    {
      title: "Die 5 Prinzipien im Regelungstext",
      content: `Die 5 Prinzipien für Digitaltaugliche Gesetzgebung dienen Ihnen als Inspiration und gemeinsame Sprache für die Erarbeitung und Begleitung der Regelungsarbeit. Sie geben Anhaltspunkte wie Ihnen Digitalisierung beim Design der Wirklogik Ihrer Regelung helfen kann.
      <br class="block content-[''] !mb-24" />
      Hier finden Sie Formulierungen, wie Ihre Kolleginnen und Kollegen die Prinzipien für Digitaltaugliche Gesetzgebung genutzt haben um den Regelungstext digitaltauglich zu formulieren.`,
      buttons: [
        {
          text: "Zu den Prinzipien",
          href: ROUTE_PRINCIPLES.url,
        },
      ],
    },
    {
      title: "Visualisierungen",
      content: `Visualisierungen helfen, komplexe Sachverhalte zu strukturieren und dadurch schneller und intuitiver erfassbar zu machen – Zusammenhänge werden sichtbar und Möglichkeiten der Digitalisierung können einfach identifiziert werden.
      <br class="block content-[''] !mb-24" />
      Hier finden Sie Visualisierungen, welche Legistinnen und Legisten beim Erarbeiten der Digitaltauglichkeit geholfen haben und veröffentlicht wurden.`,
      buttons: [
        {
          text: "Zu den Visualisierungen",
          href: ROUTE_VISUALISATIONS.url,
        },
      ],
    },

    // {
    //   title: "NKR-Stellungnahmen",
    //   content: `Der Nationalen Normenkontrollrat prüft die Digitaltauglichkeit von Regelungsvorhaben. In seiner Stellungnahme finden sich zum Beispiel weiter Vorschläge oder Hinweise auf Bereiche die noch nicht Digitaltauglich sind. Außerdem weißt er auf gute digitale Wirklogiken hin.
    //   <br class="block content-[''] !mb-24" />
    //   Hier finden Sie Regelungen mit einer Stellungnahme vom Nationalen Normenkontrollrat.`,
    //   buttons: [
    //     {
    //       text: "Zu den Stellungnahmen",
    //     },
    //   ],
    // },
    // {
    //   title: "Digitaltaugliche Regelungen",
    //   content: `Nach der Novelle ist vor der Novelle. Hier finden sie Regelungen mit Digitalbezug und deren Umsetzung der Digitaltauglichkeit ggf. mit Visualisierung. Dies kann Ihnen als Absprungspunkt für Ihre nächste Regelung dienen.
    //   <br class="block content-[''] !mb-24" />
    //   Hier finden Sie eine Auswahl von Regelungen mit Digitalbezug.`,
    //   buttons: [
    //     {
    //       text: "Zu den Regelungen",
    //     },
    //   ],
    // },
  ],
};

export const documentation = {
  title: "3. Dokumentieren der Digitaltauglichkeit",
  subtitle: `Sie dokumentieren in einem Fragebogen, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben. Und wie Sie diese in Ihr Regelungsvorhaben einfließen lassen.`,
  buttons: [
    {
      text: "Dokumentation herunterladen (PDF-Datei)",
      href: ROUTE_DOCUMENTATION_STATIC_PDF.url,
    },
    {
      text: "Zurück",
      href: ROUTE_LANDING.url,
      look: "tertiary" as const,
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
        headline: { text: "Beginnen Sie so früh wie möglich" },
        content: `Schicken Sie die begleitende Dokumentation so früh wie möglich an Ihre Ansprechperson im NKR-Sekretariat, **spätestens mit der Einleitung der Ressortabstimmung**. Fügen Sie die Dokumentation des Digitalcheck und Visualisierungen des Umsetzungsprozesses gerne auch der Ressortabstimmung bei, damit Ihre Kolleginnen und Kollegen Ihre Entscheidungen nachvollziehen können.`,
      },
      {
        headline: { text: "Das prüft der Nationale Normenkontrollrat" },
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

export const responsibleActors = {
  title: "2.1. Zuständige Akteurinnen und Akteure auflisten",
  subtitle: `Wenn Sie ein Regelungsvorhaben erarbeiten, ist es entscheidend, die **Zuständigkeiten der umsetzenden Akteurinnen und Akteure** zu kennen: Sie sind die Expertinnen und Experten für die digitale, praktische Umsetzung in der Praxis und damit wertvolle Gesprächspartnerinnen und -partner.`,
  guidance: `**Zeit:** ca. vier Stunden`,
  accordion: {
    title:
      "Was ist zu tun, wenn Länder oder Kommunen für die Umsetzung zuständig sind?",
    text: "Wenn Länder und Kommunen für die Umsetzung zuständig ist, legen die Gesetze auf Bundesebene die Grundlage für eine reibungslose Umsetzung. Sicherlich stehen Sie bereits inhaltlich mit den entsprechenden Vertreterinnen und Vertretern im Austausch, z. B. mit den Landesministerien. Für die digitale Umsetzung sollten Sie zusätzlich das Gespräch mit denen suchen, die die aktuellen Arbeitsabläufe, Prozesse und Systeme kennen. Das funktioniert am besten in bilateralen Gesprächen, die die formellen Beteiligungsformate ergänzen.",
  },
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "Finden Sie konstruktive Gesprächspartnerinnen und -&shy;partner",
    text: `Beginnen Sie mit der Kontaktaufnahme oben in der Hierarchie, lassen Sie ggf. über Ihre Referats- und (Unter-)abteilungsleitung den Kontakt herstellen. Fragen Sie nach den Fachexpertinnen und -experten auf Arbeitsebene, hier steckt in der Regel das tiefste Praxiswissen.
<br class="block content-[''] !mb-24" />
- **Kommunen:** Bitten Sie Ansprechpersonen auf Landesebene um Kontakte und nutzen Sie  das gesammelte Wissen in den Kommunalen Spitzenverbänden. 
- **Behörden und Träger:** Nutzen Sie die offiziellen Wege der Häuser.
- **Unternehmen, Sozialpartner, weitere Organisationen:** Fragen Sie in Spitzenverbänden nach Ansprechpersonen für Ihren konkreten Anwendungsfall. 
<br class="block content-[''] !mb-24" />

Wenn Sie keine persönlichen Kontakte nutzen können, greifen sie auf Organigramme oder interne Datenbanken zu, z. B. das X500-Verzeichnis.`,
  },
  boxes: [
    {
      image: {
        src: "/images/ebenen-auswaehlen-und-ansprechpersonen-sammeln.png",
        alt: `Eine Excel-Tabelle mit dem Titel "Beteiligte Ebenen auswählen und Ansprechpersonen sammeln für [ARBEITSTITEL]" enthält Spalten für Name, Zuständigkeit, Akteursgruppe, Kontaktdaten und Bemerkungen. Der erste Eintrag listet als Beispiel "Maria Muster" als Referentin für das Statistische Bundesamt, zugehörig zur Akteursgruppe "Bund" mit ihren Kontaktdaten.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Beteiligte Ebenen auswählen und Ansprechpersonen sammeln",
      text: `Die Excelvorlage hilft Ihnen, die beteiligten Ebenen auszuwählen, Zuständigkeiten zu klären und hilfreiche Ansprechpersonen zu sammeln.`,
      buttons: [
        {
          text: "Vorlage herunterladen (xlsx-Datei)",
          href: "/download/Vorlage - Zuständige Akteurinnen und Akteure.xlsx",
        },
      ],
    },
  ],
  tip: {
    label: "Tipps",
    icon: LightbulbOutlined,
    title: "Gespräche über die aktuelle Umsetzungspraxis",
    text: `- **Keine Sorge vor falscher Kontaktaufnahme:** Es kann nichts passieren, außer dass man Sie an die richtige Ansprechperson verweist.
- **Persönliche Gespräche statt Schriftverkehr:** Bitten Sie um persönliche Gespräche bei der Kontaktaufnahme. Schriftlicher Austausch lädt zu Missverständnissen ein.  
- **Der Austausch über den Ist-Stand ist sicher:** Nur Mut bei der Ansprache, über die aktuelle Umsetzung dürfen Sie immer sprechen.`,
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "2.2. Aufgaben und Abläufe gemeinsam erfassen",
    text: `Damit Ihre Regelung wirkungsvoll in die Praxis kommt, müssen Sie die **aktuellen Rahmenbedingungen** verstehen. Holen Sie sich dazu Unterstützung von den Akteurinnen und Akteuren, die Sie identifiziert haben. Sie müssen noch nicht auf geplante Neuerungen eingehen. Konzentrieren Sie sich auf den **Status Quo**.`,
    buttons: [
      {
        text: "Aufgaben und Abläufe klären",
        look: "tertiary" as const,
        href: ROUTE_METHODS_TASKS_PROCESSES.url,
      },
    ],
  },
};

export const tasksProcesses = {
  title: "2.2. Aufgaben und Abläufe gemeinsam erfassen",
  subtitle: `Damit Ihre Regelung wirkungsvoll in die Praxis kommt, müssen Sie die **aktuellen Abläufe** verstehen. Holen Sie sich dazu Unterstützung von den Akteurinnen und Akteuren, die Sie im vorigen Schritt identifiziert haben. In diesem Schritt müssen Sie noch nicht auf geplante Neuerungen eingehen. Konzentrieren Sie sich auf den **Status Quo**.`,
  guidance: `**Zeit:** ca. sechs Stunden

**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren zusammen

**Support:** Komplexe Abläufe können Sie mit dem Digitalcheck-Support erfassen`,
  accordion: {
    title:
      "Was ist zu tun, wenn Länder oder Kommunen für die Umsetzung zuständig sind?",
    text: "Wenn Länder und Kommunen für die Umsetzung zuständig ist, legen die Gesetze auf Bundesebene die Grundlage für eine reibungslose Umsetzung. Sicherlich stehen Sie bereits inhaltlich mit den entsprechenden Vertreterinnen und Vertretern im Austausch, z. B. mit den Landesministerien. Für die digitale Umsetzung sollten Sie zusätzlich das Gespräch mit denen suchen, die die aktuellen Arbeitsabläufe, Prozesse und Systeme kennen. Das funktioniert am besten in bilateralen Gesprächen, die die formellen Beteiligungsformate ergänzen.",
  },
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "Erfassen Sie die aktuellen Abläufe",
    text: `Listen Sie auf, welche Schritte und Aufgaben aktuell erfüllt werden, damit das Ziel des Vorhabens erreicht wird, und wie diese im Zusammenhang stehen. Tun Sie dies im Team: Die Diskussion ist ebenso wertvoll wie das Ergebnis.

Der Überblick lohnt sich auch bei scheinbar einfachen Abläufen: 
- Fehlende Verbindungen oder unerwartete Abhängigkeiten werden sichtbar.
- Sie erfahren, auf welchen bestehenden Abläufen Sie aufbauen können.

Die Frage, die Sie sich und Ihren Ansprechpersonen stellen können, lautet: „Wer will was wann von wem?“`,
  },
  boxes: [
    {
      image: {
        src: "/images/einfache-ablaeufe-und-aufgaben-erfassen.png",
        alt: `Ein Flussdiagramm mit dem Titel „Beispielprozess-Ablauf ‚Einkommensteuer-Erklärung durchführen‘“. Auf der linken Seite ist ein gezeichnetes Gebäude und daneben ein Figur, sie sind als „Akteurin oder Akteur“ beschriftet. Als Beispiel steht darunter „Finanzämter“. Diese senden Daten zur zentralen Speicherung und Auswertung, dargestellt durch einen Pfeil, der mit „Arbeitsprozess“ beschriftet ist. Rechts steht noch einmal das Gebäude mit der Person daneben, beschriftet als „Adressatin oder Adressat“. Als Beispiel ist „Bundeszentralamt für Steuern“ eingetragen.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Einfache Abläufe und Aufgaben erfassen",
      text: `1. Sammeln Sie [Akteurinnen und Akteure](${ROUTE_METHODS_RESPONSIBLE_ACTORS.url}), die an der Umsetzung beteiligt sind, und tragen Sie diese auf der linken Seite ein. („Wer“)
2. Rechts tragen Sie die Adressatinnen und Adressaten ein. („von wem“)
3. In die Mitte schreiben Sie die verbindenden Aufgaben. („will wann was“)

Die Vorlage dient der Orientierung und kann angepasst werden. Ein Beispiel: Adressatinnen und Adressaten, die einen Antrag stellen, können auf der linken Seite stehen, die entsprechende Behörde steht dann rechts.`,
      buttons: [
        {
          text: "Vorlage herunterladen (xlsx-Datei)",
          href: "/download/Vorlage - Einfache Abläufe und Aufgaben erfassen.xlsx",
        },
      ],
    },
    {
      image: {
        src: "/images/rulemap.jpg",
        alt: `Ein Flussdiagramm mit der Überschrift „Rulemap § 9b 2023“. Es zeigt die verschiedenen Bedingungen, unter denen eine Steuerentlastung gewährt wird, und ihre Abhängigkeiten.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Komplexe Abläufe visualisieren",
      text: `Jedes Verwaltungshandeln hat einen Anfang und ein Ende. **Flussdiagramme** sind deshalb besonders geeignet, denn sie bilden Prozesse als aufeinanderfolgende Schritte ab. Man sieht, wer welchen Teil des Prozesses übernimmt und Verantwortlichkeiten wechseln.

Am schnellsten sind Sie, wenn Sie eine **Papierskizze** machen, bevor Sie am Computer arbeiten. Sie werden einige Anläufe verwerfen, das ist normal und hilfreich. **Wichtig ist das Verständnis, nicht die Ästhetik.**

Für die **digitale Ausarbeitung** eigenen sich Conceptboard, draw.io oder Microsoft PowerPoint. Fragen Sie nach geeigneten Programmen und Ansprechpersonen, zum Beispiel Kolleginnen und Kollegen oder in der Z-Abteilung.

**Vorlagen**

→ [Download PowerPoint-Vorlage mit Schritt-für-Schritt-Anleitung](/documents/Anleitung_Flussdiagramm_erstellen.pptx)  
→ [Conceptboard-Vorlage](https://bmas.de.conceptboard.com/board/qh33-xcny-usde-7nc6-82cy) zum Kopieren, Sie können einen Gast-Zugang anlegen.`,
      buttons: [
        {
          text: "Beispiele ansehen",
          href: ROUTE_VISUALISATIONS.url,
        },
      ],
    },
  ],
  tip: {
    label: "Tipps",
    icon: LightbulbOutlined,
    title: "Wertschätzende und zielorientierte Kommunikation",
    text: `
- **Hürden und Anforderungen wertschätzen:** Sicherlich werden bei den Gesprächen auch Wünsche und Anforderungen an neue Abläufe auftauchen. Wahrscheinlich werden Sie nicht alle umsetzen können. Bedanken Sie sich für den Input, kommunizieren Sie, was nicht eingearbeitet wird und erläutern Sie die Gründe.
- **Regelungsziel im Fokus:** Interessenkonflikte treten in den Hintergrund, wenn das Regelungsziel im Sinne der Normadressaten im Mittelpunkt steht — dahinter kann sich meistens vereint werden.`,
  },
  support: {
    label: "Unterstützungsangebot",
    icon: SupportOutlined,
    title: "Visualisierungen gemeinsam erstellen",
    text: `Der Digitalcheck-Support unterstützt Sie bei der Visualsierung von Abläufen. Wir helfen Ihnen gerne, insbesondere bei komplexen Abläufen. 

Für ein einstündiges Videotelefonat, schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.`,
    buttons: [
      {
        text: "Termin buchen",
        look: "tertiary" as const,
        href: ROUTE_SUPPORT.url,
      },
    ],
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title: "2.3. IT-Systeme erfassen",
    text: `Nutzen Sie das Fachwissen der Akteurinnen und Akteure, um die verwendete IT-Infrastruktur für die identifizierten Abläufe zu erfassen und zu verstehen.`,
    buttons: [
      {
        text: "IT-Landschaft verstehen",
        look: "tertiary" as const,
        href: ROUTE_METHODS_COLLECT_IT_SYSTEMS.url,
      },
    ],
  },
};

export const collectITSystems = {
  title: "2.3. IT-Systeme gemeinsam erfassen",
  subtitle: `Nutzen Sie das Fachwissen der zuständigen Akteurinnen und Akteure, um die verwendete IT-Infrastruktur für die im vorigen Schritt identifizierten Abläufe zu erfassen und zu verstehen.`,
  guidance: `**Zeit:** ca. sechs Stunden

**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren

**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support`,
  accordion: {
    title:
      "Was ist zu tun, wenn Länder oder Kommunen für die Umsetzung zuständig sind?",
    text: "Wenn Länder und Kommunen für die Umsetzung zuständig ist, legen die Gesetze auf Bundesebene die Grundlage für eine reibungslose Umsetzung. Sicherlich stehen Sie bereits inhaltlich mit den entsprechenden Vertreterinnen und Vertretern im Austausch, z. B. mit den Landesministerien. Für die digitale Umsetzung sollten Sie zusätzlich das Gespräch mit denen suchen, die die **aktuellen Arbeitsabläufe, Prozesse und Systeme kennen. Das funktioniert am besten in bilateralen Gesprächen, die die formellen Beteiligungsformate ergänzen.",
  },
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "So erfassen Sie die IT-Systeme",
    text: `Dokumentieren Sie die verwendeten IT-Systeme mit ihren Funktionalitäten, Schnittstellen und Anforderungen. 
<br class="block content-[''] !mb-24" />
Ein Überblick über die IT-Landschaft hilft Ihnen dabei, 
- alle relevanten Aspekte aufzuschlüsseln und potenziell blinde Flecken zu identifizieren,
- auf bestehende Standards und Prozesse aufzusetzen,
- oder Potenzial für Vereinheitlichung zu nutzen.`,
  },
  boxes: [
    {
      image: {
        src: "/images/it-systeme-erfassen.png",
        alt: `Eine Excel-Tabelle mit dem Titel „IT-Systeme erfassen für [ARBEITSTITEL]“, die Spalten sind Name des IT-Systems, Funktionalitäten, Nutzende, Schnittstellen und Zuständigkeit. Als Beispiel ist ELSTER eingetragen, das zur Übermittlung der Steuererklärung von Bürgerinnen und Bürgern oder Unternehmen zu den Sachbearbeiterinnen und Sachbearbeitern der Finanzämter dienst. Es gibt unter Anderem eine Schnittstelle zu einem IT-System für Kapitalertragssteuer und Kirchensteuer. Für die Entwicklung ist das Bayerische Landesamt für Steuern zuständig.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "IT-Systeme erfassen",
      text: `Nutzen Sie die Vorlage, um die IT-Systeme systematisch und detailliert zu dokumentieren. Sie müssen nicht selbst über das Wissen verfügen: Fragen Sie die zuständigen Akteurinnen und Akteure und ziehen Sie ggf. neutrale IT-Expertise hinzu.`,
      buttons: [
        {
          text: "Vorlage herunterladen (xlsx-Datei)",
          href: "/download/Vorlage - IT-Systeme erfassen.xlsx",
        },
      ],
    },
  ],
  support: {
    label: "Unterstützungsangebot",
    icon: SupportOutlined,
    title: "IT-Wissen einfach erklärt",
    text: `Der Digitalcheck-Support unterstützt Sie mit kostenloser IT-Beratung, um Erkenntnisse zu erläutern und für Ihre Regelung zu nutzen, z. B. durch IT-Hintergrundwissen zu Schnittstellen. Jede Frage ist berechtigt – jede verstandene Antwort wird die Regelung digitaltauglicher machen. 

Für ein einstündiges Videotelefonat schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.`,
    buttons: [
      {
        text: "Termin buchen",
        look: "tertiary" as const,
        href: ROUTE_SUPPORT.url,
      },
    ],
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title:
      "2.4. Möglichkeiten und Hindernisse der digitalen Umsetzung identifizieren",
    text: `Mit einem guten Verständnis des Ist-Zustandes erarbeiten Sie nun Ihre Regelung. Die fünf Prinzipien für digitaltaugliche Gesetzgebung decken unterschiedliche Aspekte der digitalen Umsetzung ab: Nutzen Sie die Erkenntnisse über den Ist-Zustand, um mithilfe der Prinzipien die **Möglichkeiten der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen.**`,
    buttons: [
      {
        text: "Fünf Prinzipien nutzen",
        look: "tertiary" as const,
        href: ROUTE_METHODS_FIVE_PRINCIPLES.url,
      },
    ],
  },
};

export const fivePrinciples = {
  title: "Fünf Prinzipien für digitaltaugliche Gesetzgebung",
  buttonText: "Beispiele betrachten",
  principles: [
    {
      label: "Anleitung",
      icon: DrawOutlined,
      title: "So nutzen Sie die fünf Prinzipien für Ihr Regelungsvorhaben",
      content: `### Als konkrete Umsetzungstipps

Nutzen Sie die Tipps als Inspiration, um in Ihrem Regelungsvorhaben die Möglichkeiten des Digitalen auszuschöpfen und Hindernisse zu erkennen.
<br class="block content-[''] !mb-48" />
### Als Checkliste für den Gesamtprozess

Besonders erkenntnisreich sind die fünf Prinzipien, wenn Sie diese auf eine Skizze des geplanten Umsetzungsprozesses anwenden. Skizzieren Sie Schritt für Schritt die Umsetzung und markieren Sie die Stellen, an denen eines oder mehrere Prinzipien wichtig sind. Mehr Infos zu Visualisierungen finden Sie auf [visualisieren.digitalcheck.bund.de](https://visualisieren.digitalcheck.bund.de).
<br class="block content-[''] !mb-48" />
### Als Startpunkt für ihren Regelungstext

Nutzen Sie die gesammelten Beispiele als Startpunkt für Ihre Formulierungen. Bauen Sie auf Formulierungen auf, oder lassen Sie sich durch die Wirklogiken Ihrer Kolleginnen und Kollegen inspirieren. Sie finden gute Formulierungen, Einordnungen und deren Kontext im Regelungstext auf:
      `,
    },
    {
      label: "Prinzip 1",
      title: "Digitale Kommunikation sicherstellen",
      content: `### Darum ist das wichtig

Bürgerinnen und Bürger, Mitarbeitende in Unternehmen, weiteren Organisationen und der Verwaltung sind meist an digitale Kommunikation gewöhnt. In der Verwaltung und den Behörden erlaubt eine durchgehend digitale Dokumentation, Bearbeitung und ggf. Prüfung eine effizientere Bearbeitung.
<br class="block content-[''] !mb-24" />
Digitale Kommunikation sollte immer bedarfsorientiert und inklusiv sein — in bestimmten Fällen kann z. B. ergänzend auch die Schriftform sinnvoll sein, sofern eine digitale Weiterverarbeitung sichergestellt ist.
<br class="block content-[''] !mb-48" />
### Tipps für Ihr Regelungsvorhaben

- Wählen Sie Formulierungen, die den Einsatz von unterschiedlichen Medien, Technologien und Verfahren ermöglichen.
- Sollten Sie technologische Lösungen festschreiben, ermöglichen Sie den Einsatz von offenen Technologien, so sorgen Sie für Transparenz und Wiederverwendbarkeit.
- Ersetzen oder ergänzen Sie Schriftformerfordernisse und analoge Nachweispflichten. Prüfen Sie etwa, ob die Textform ausreichend ist und ermöglichen Sie die digitale Bearbeitung.
- Vermeiden Sie Medienbrüche. Diese können z. B. durch visuelle Darstellung des Vollzugs, wie Flussdiagramme, erkennbar werden.
- Erfüllen Sie Anforderungen der Barrierefreiheit und beachten Sie die Bedarfe unterschiedlicher Personengruppen.`,
    },
    {
      label: "Prinzip 2",
      title: "Wiederverwendung von Daten und Standards ermöglichen",
      content: `### Darum ist das wichtig

Häufig sind Daten von Personen oder Organisationen in verschiedenen Prozessen relevant. Das heißt, dass die Daten, die für Ihr Regelungsvorhaben benötigt werden, an anderer Stelle bereits vorliegen könnten. Sie sollten wiederverwendet werden, damit Bürgerinnen und Bürger oder Unternehmen Daten kein weiteres Mal angeben müssen und Verfahren vereinfacht werden. Auch die Wiederverwendung von Open-Source-Software, Standards oder sogar einzelner Design- oder Software-Komponenten vereinfacht Verfahren und spart Ressourcen.
<br class="block content-[''] !mb-48" />
### Tipps für Ihr Regelungsvorhaben

Recherchieren Sie für Ihr Regelungsvorhaben relevante bestehende Standards, Komponenten, Richtlinien, Verfahren zur Datenerfassung, Datenaustauschverfahren (Once-Only-Prinzip) sowie Register und weitere Quellen. Erste Anhaltspunkte finden Sie zum Beispiel auf:
- der Verwaltungsdaten-Informationsplattform: [verwaltungsdaten-informationsplattform.de](https://verwaltungsdaten-informationsplattform.de)
- der Registerlandkarte: [registerlandkarte.de](https://registerlandkarte.de)
- der Open-Source-Plattform der Verwaltung: [opencode.de](https://opencode.de)`,
    },
    {
      label: "Prinzip 3",
      title: "Datenschutz und Informationssicherheit gewährleisten",
      content: `### Darum ist das wichtig

Datenschutz und Informationssicherheit sind zentrale Voraussetzungen für praxistaugliche Digitalisierung — frühzeitig mitgedacht können Bedürfnisse von Betroffenen auf einfache Weise mit Daten- und Informationssicherheit vereinbart werden. Das Regelungsvorhaben soll eine datenschutzkonforme Umsetzung ermöglichen: Vor der Erhebung von Daten muss definiert werden, welche Daten zu welchem Zweck benötigt und wie sie geschützt werden.
<br class="block content-[''] !mb-48" />
### Tipps für Ihr Regelungsvorhaben

- Beteiligen Sie frühzeitig Expertinnen und Experten für Datenschutz und Informationssicherheit, um datenschutzkonforme Regelungen zu schreiben. Anhaltspunkte dafür geben auch geltende Richtlinien und Ausführungsbestimmungen z.B. vom BSI.
- Schaffen Sie die Rechtsgrundlage, um alle benötigten Daten zu erfassen und zu verarbeiten.
- Berücksichtigen Sie die finanziellen und personellen Ressourcen, die für die Umsetzung der Vorgaben der Informationssicherheit nötig sind.`,
    },
    {
      label: "Prinzip 4",
      title: "Klare Regelungen für eine digitale Ausführung finden",
      content: `### Darum ist das wichtig

Durch eindeutige und klare Formulierungen können die Regelungen verständlich dargestellt und die digitale Umsetzung erleichtert werden. Komplizierte, schwer verständliche Regelungskonstrukte erschweren eine digitale Ausführung.
<br class="block content-[''] !mb-48" />
### Tipps für Ihr Regelungsvorhaben

- Formulieren Sie die Texte Ihres Regelungsvorhaben so, dass es in der Umsetzung in Aufgaben und chronologische Schritte übersetzt werden kann.
- Formulieren Sie klare Entscheidungsstrukturen. Nutzen Sie dafür eindeutige Kriterien und eine kohärente und logische Systematik. Ausnahmen sind klar gekennzeichnet. Testen Sie die Verständlichkeit mit den Personen, die an der Umsetzung beteiligt sind.
- Versuchen Sie, Rechtsbegriffe zu harmonisieren. Verwenden Sie definierte Rechtsbegriffe aus Ihrem Rechtsbereich. Auslegungen verhindern eine einheitliche Umsetzung.`,
    },
    {
      label: "Prinzip 5",
      title: "Automatisierung ermöglichen",
      content: `### Darum ist das wichtig

Digitale Lösungen zu erstellen, ist zunächst aufwändig. Die „Duplikation“ oder Skalierung kostet jedoch (fast) nichts. Daher ist es personell und wirtschaftlich sinnvoll, sich wiederholende Schritte, Prozesse oder Vorgehen zu automatisieren. Ein Regelungsvorhaben, das Ermessensspielraum lässt, kann nicht vollständig automatisiert werden: Soweit es dem Regelungsziel dient, sollte darauf verzichtet werden. Dadurch entstehen zeitliche und finanzielle Freiräume für Fälle, die eine gesonderte Auseinandersetzung benötigen.
<br class="block content-[''] !mb-48" />
### Tipps für Ihr Regelungsvorhaben

- Schaffen Sie die rechtlichen Möglichkeiten für automatisierte und/oder antragslose Verfahren. Prüfen Sie z. B. die Möglichkeit von Pauschalen.
- Formulieren Sie klare Entscheidungsstrukturen. Nutzen Sie dafür eindeutige Kriterien und eine kohärente und logische Systematik. Beziehen Sie IT-Expertise mit ein.
- Versuchen Sie, Rechtsbegriffe zu harmonisieren. Verwenden Sie definierte Rechtsbegriffe aus Ihrem Rechtsbereich. Auslegungen verhindern die vollständige Automatisierung von Umsetzungsprozessen.`,
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

export const technicalFeasibility = {
  title: "2.5. Technische Umsetzbarkeit sicherstellen",
  subtitle: `Analysieren Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende und neue Abläufe und IT-Systeme. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der zuständigen Akteurinnen und Akteure zurück und holen Sie sich Hilfe von neutralen IT-Expertinnen und -Experten.`,
  guidance: `**Zeit:** Richtet sich nach der Komplexität des Vorhabens

**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren.

**Support:** Sie können sich vom Digitalcheck-Support unterstützen lassen.`,
  content: {
    label: "Anleitung",
    icon: DrawOutlined,
    title: "Verstehen Sie die Auswirkungen auf IT-Systeme",
    text: `Vergleichen Sie gemeinsam mit den [zuständigen Akteurinnen und Akteuren](${ROUTE_METHODS_RESPONSIBLE_ACTORS.url}) das geplante Vorhaben mit den Möglichkeiten der bestehenden IT-Systeme. Überprüfen Sie die Informationen mithilfe neutraler IT-Expertinnen und -Experten. 

So erfahren Sie
- welche IT-Systeme für Ihr Vorhaben verwendet werden können
- und an welchen Stellen Änderungen nötig sind.
<br class="block content-[''] !mb-24" />

<h3 class="ds-subhead font-bold">Sie müssen nicht alles allein bewältigen</h3>

Bei kleinen Fragen rufen Sie den Digitalcheck-Support an unter  [0151/40 76 78 39](tel:+4915140767839).
Für ein unterstützendes, einstündiges Videotelefonat schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.`,
    buttons: [
      {
        text: "Termin buchen",
        look: "tertiary" as const,
        href: ROUTE_SUPPORT.url,
      },
    ],
  },
  boxes: [
    {
      image: {
        src: "/images/aspekte-technischer-umsetzbarkeit.png",
        alt: `Ein Dokument mit der Überschrift „Gesprächsleitfaden technische Umsetzbarkeit“. Darunter ist ein Kasten zu sehen, in dem steht „Welche Verbindungen oder Daten müssen angepasst werde?“. Vom Kasten führt ein Pfeil nach unten an dem steht „Fertig? Weiter zum nächsten Punkt“. Rechts vom Kasten stehen erläuternde Fragen und Beispiele.`,
      },
      label: "Vorlage",
      icon: StickyNote2Outlined,
      title: "Gesprächsleitfaden: Aspekte technischer Umsetzbarkeit",
      text: `Besprechen Sie die Fragen im Schaubild gemeinsam mit den IT-Expertinnen und Experten in der Umsetzung. Multidisziplinäre Zusammenarbeit ist hier der Schlüssel.

Das PDF ist barrierearm/barrierefrei.`,
      buttons: [
        {
          text: "Vorlage herunterladen (PDF-Datei)",
          href: "/documents/Schaubild Aspekte Technischer Umsetzbarkeit.pdf",
        },
      ],
    },
  ],
  tip: {
    label: "Tipps",
    icon: LightbulbOutlined,
    title: "Gespräche über IT-Anpassungen",
    text: `- **Aufwand verstehen:** Fragen Sie nach dem Aufwand für IT-Anpassungen. Lassen Sie sich die Details erklären, bis Sie die Aufwände nachvollziehen können. So werden Sie selbst sprechfähig.
- **Fokus auf das Regelungsziel:** Gehen Sie konstruktiv und mit dem Regelungsziel im Fokus in Gespräche. Veränderungen in der IT bedeuten organisatorischen und finanziellen Aufwand, was die Lösungsfindung erschweren kann.`,
  },
  support: {
    label: "Unterstützungsangebot",
    icon: SupportOutlined,
    title: "Die technische Umsetzung gemeinsam durchdenken",
    text: `Wenn die technischen Anforderungen zu komplex werden, unterstützt Sie der Digitalcheck-Support. Wir helfen als neutraler Akteur dabei
- die **technische Umsetzung** im Detail zu durchdenken und Nutzerfreundlichkeit, Datenverwendung und IT-Sicherheit zu beachten,
- als **neutrale Moderation** in Gesprächen mit zuständigen Akteurinnen und Akteuren, um potenzielle Interessenkonflikte durch Fachlichkeit zu entschärfen,
- **Erkenntnisse visuell aufzubereiten** – das ist die beste Grundlage für interne und externe Beteiligungsprozesse – und
- die **Aussagen externer Dienstleister** zu reflektieren: Wirtschaftlichkeit kann eine Motivation für aufwändige Lösungen sein.
<br class="block content-[''] !mb-24" />

Für ein einstündiges Videotelefonat schreiben Sie eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder buchen Sie direkt einen Termin.`,
    buttons: [
      {
        text: "Termin buchen",
        look: "tertiary" as const,
        href: ROUTE_SUPPORT.url,
      },
    ],
  },
  nextStep: {
    label: "So geht es weiter:",
    icon: ArrowCircleRightOutlined,
    title:
      "Verfassen Sie den Regelungsentwurf und dokumentieren Sie Ihre Entscheidungen",
    text: `Die gesammelten Erkenntnisse und Ergebnisse helfen Ihnen dabei, Aspekte der Digitaltauglichkeit in Ihrem Regelungsentwurf zu berücksichtigen. Diese Entscheidungen dokumentieren Sie in einem Fragebogen.`,
    buttons: [
      {
        text: "Zu „Erarbeiten“",
        look: "tertiary" as const,
        href: ROUTE_METHODS.url,
      },
    ],
  },
};

export const support = {
  title: "Hilfe für digitaltaugliche Regelungsvorhaben",
  subtitle:
    "Nutzen Sie unsere digitale Expertise, um Ihr Regelungsvorhaben digitaltauglich zu gestalten und den Digitalcheck erfolgreich zu erfüllen.",
  socialProof: {
    text: `Wir, die Digital-Expert:innen des DigitalService,<br class="sm:max-lg:hidden" /> haben bereits über <span class="text-[65px] -top-[11px] h-[30px] inline-block relative overflow-visible align-top">70</span> **Regelungsvorhaben** unterstützt.`,

    image: {
      src: "/images/support.png",
      alt: `Ein Flussdiagramm mit der Überschrift „Rulemap § 9b 2023“. Es zeigt die verschiedenen Bedingungen, unter denen eine Steuerentlastung gewährt wird, und ihre Abhängigkeiten.`,
    },
    testimonials: [
      {
        quote:
          "Die gründliche Analyse von Vollzugsprozessen hat uns geholfen, das Zusammenspiel zwischen den Regelungen und der Administration besser zu verstehen und so den digitalen Vollzug zu gestalten. Die gemeinsame Arbeit mit dem Team des DigitalService war intensiv, hat uns im Ergebnis jedoch viel Zeit für weitere Absprachen gespart.",
        position: "Projektpartnerin",
        ministry: "im Bundesministerium der Finanzen",
      },
    ],
  },
  supportWhat: {
    title: "So unterstützen wir Sie",
    subtitle:
      "Legistinnen und Legisten stehen oft vor der Herausforderung, Regelungen unter erheblichem Zeitdruck erarbeiten zu müssen. Genau hier kommen wir ins Spiel: Wir unterstützen Sie in jeder Phase des Vorhabens und sorgen dafür, dass Ihr Vorhaben eine einfache und wirkungsorientierte Umsetzung, unter Ausschöpfung der digitalen Möglichkeiten zum Nutzen aller Beteiligten ermöglicht.",
    supportTypes: [
      {
        icon: DrawOutlined,
        title: "Visualisierungen erstellen",
        text: "Wir erstellen in wenigen Tagen eine Visualisierung für Sie — hilfreich bei Abstimmungen im Haus, zwischen Ressorts oder mit dem NKR.",
      },
      {
        icon: PlaylistAddCheckOutlined,
        title: "Schnelle Hilfe für den Digitalcheck",
        text: "Wir erklären, welche Schritte es gibt, welche Dokumente Sie wann benötigen und schätzen den Digitalbezug mit Ihnen ein (Vorprüfung ausfüllen).",
      },
      {
        icon: AdsClickOutlined,
        title: "Digitales Potential ausschöpfen",
        text: "Wir unterstützen Sie dabei die digitalen Potentiale Ihres Vorhabens auszuschöpfen, zu verbessern oder neu zu gestalten.",
      },
    ],
  },
  supportHow: {
    title: "So erhalten Sie Hilfe",
    supportTypes: [
      {
        title: "Schnelle Hilfe erhalten Sie per Telefon oder E-Mail",
        text: "Sie können uns für dringende Anliegen unter [0151/40 76 78 39](tel:+4915140767839) anrufen oder uns eine E-Mail senden. Wir beantworten Ihnen alle wichtigen Fragen zum Vorgehen und Anwenden des Digitalchecks sowie allgemeine Fragen rund um das Erarbeiten digitaltauglicher Regelungen.",
        buttons: [
          {
            text: "E-Mail senden",
            look: "tertiary" as const,
            href: "mailto:digitalcheck@digitalservice.bund.de?subject=Unterstützungsangebote:%20erarbeiten.digitalcheck.bund.de",
          },
        ],
      },
      {
        title: "Beratung erhalten Sie in einem 45-minütigem Gespräch",
        text: "In einem (Video)-Telefonat können wir gemeinsam herausfinden, welche Unterstützungsangebote für Sie hilfreich sind.",
        iframe:
          "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2HGvpOvw8vZemiLWGWvL65j3FdQUTeyxGvh1QX-6JlwNwFdZo6wTI5isd6TJsv0duH3-9nD1QX?gv=true",
        buttons: [
          {
            text: "Termin buchen",
            look: "tertiary" as const,
          },
        ],
      },
    ],
  },
  supportOfferings: {
    title: "Unsere Unterstützungsangebote",
    text: "Nach einem erstem Austausch finden wir gemeinsam die richtige Unterstützung für Ihre Herausforderung und Ihren Zeitplan.",
    tabs: [
      {
        title: "Schnelle Hilfe",
        offerings: [
          {
            title: "Digitalbezug einschätzen lassen",
            text: `Wir unterstützen Sie, den Digitalbezug Ihres Verfahrens einzuschätzen, indem wir die Vorprüfung gemeinsam durchgehen. 
<br class="block content-[''] !mb-32" />
Je nach Ziel Ihres Vorhabens und Grad des Digitalbezugs, variiert der Zeitaufwand, den Sie für die Erarbeitung digitaler Aspekte einplanen sollten. 
<br class="block content-[''] !mb-32" />
**Beispiele für einen starken Digitalbezug: Prozess/Dienstleistung/Interaktion neu aufsetzen**

z. B. bei folgenden Zielen einer Regelung:

- Voraussetzungen für eine Digitalisierung schaffen
- bestehenden Umsetzungsprozesse verbessern oder neu aufsetzen
<br class="block content-[''] !mb-24" />

**Beispiele für einen leichten bis mittleren Digitalbezug: bestehenden Prozess anpassen**

z. B. bei folgenden Zielen einer Regelung:

- Anpassungen von Nachweispflichten
- Anpassungen von Pauschalen`,
            sellingPoints: "Ihr Vorteil auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Zeitaufwand",
                text: `- **Fachreferat:** 1-2 Stunden
- **DigitalService-Team:** 1-2 Stunden`,
              },
              {
                icon: CheckCircleOutlined,
                title: "Was sie bekommen",
                text: `- Expert:innen-Einschätzung zum Digitalbezug des Regelungsverfahrens: Grundlage für Planung des Regelungsvorhabens
- richtige Ansprechperson im NKR-Sekretariat`,
              },
            ],
          },
          {
            title: "IT-Wissen einfach erklärt",
            text: `Im geschützten Rahmen eines Gesprächs beantworten unsere Expert:innen Ihnen alle **Fragen zur IT**. 
<br class="block content-[''] !mb-32" />
Jede Frage ist berechtigt — jede verstandene Antwort wird die Regelung digitaltauglicher machen.  
<br class="block content-[''] !mb-32" />
Beispiele für Fragen:

- Was ist eine Schnittstelle?
- Wie unterscheiden sich Vertrauensniveaus?
- Welchen Datenstandard sollte das Antragsformular berücksichtigen?`,
            sellingPoints: "Ihr Vorteil auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Zeitaufwand",
                text: `- **Fachreferat:** 1-2 Stunden
- **DigitalService-Team:** 1-2 Stunden`,
              },
              {
                icon: CheckCircleOutlined,
                title: "Was sie bekommen",
                text: `- besseres Verständnis der digitalen Aspekte der Regelung
- Sicherheit in Abstimmungen mit umsetzenden Akteuren`,
              },
            ],
          },
        ],
      },
      {
        title: "Umfangreiche Beratung",
        offerings: [
          {
            title: "Visualisierungen erstellen",
            text: `Wir erstellen Visualisierungen für Sie oder digitalisieren Ihre Papier-und-Stift-Skizzen.
<br class="block content-[''] !mb-32" />
Ein Bild sagt mehr als tausend Worte — genauso helfen Visualisierungen bei Abstimmungen im Haus, zwischen Ressorts oder mit dem NKR.
<br class="block content-[''] !mb-32" />
Die Art der Visualisierung richtet sich nach Ihren Anforderungen:

- **Antragsstrecke oder ein Datenfluss im Detail verstehen**, visualisiert als Flussdiagramm
- **beteiligte Akteure identifizieren**, visualisiert als Flussdiagramm
- **Logik und Struktur des Regelungstextes prüfen**, visualisiert als Entscheidungsbaum
- Überblick über das Verfahren geben zur **Kommunikation im Haus, mit dem NKR oder zwischen Ressorts**, visualisiert als Schaubild`,
            sellingPoints: "Ihr Vorteil auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Zeitaufwand",
                text: `- **Fachreferat:** einige Stunden für gemeinsame Arbeitssitzungen
- **DigitalService-Team:** 1-5 Tage`,
              },
              {
                icon: CheckCircleOutlined,
                title: "Was sie bekommen",
                text: `- tieferes Verständnis der digitaler Aspekte der Regelung
- eine Visualisierung, die die Prüfung durch den NKR informiert`,
              },
            ],
            examples: [
              {
                image: {
                  src: "/images/rulemap.jpg",
                  alt: `Eine Rulemap mit der Überschrift „Rulemap § 9b 2023“. Es zeigt die verschiedenen Bedingungen, unter denen eine Steuerentlastung gewährt wird, und ihre Abhängigkeiten.`,
                },
                text: "**Beispiel-Visualisierung:** [Gesetz zur Modernisierung und zum Bürokratieabbau im Strom- und Energiesteuerrecht](https://dserver.bundestag.de/btd/20/123/2012351.pdf) (Seite 110 ff.)",
              },
            ],
          },
          {
            title: "Digitale Umsetzung erarbeiten",
            text: `Wenn die technischen Anforderungen komplex werden, helfen wir als neutraler Akteur dabei, die **technische Umsetzung** im Detail zu durchdenken und Nutzerfreundlichkeit, Datenverwendung und IT-Sicherheit zu beachten. 
<br class="block content-[''] !mb-32" />
Maßnahmen, die wir z. B. für Sie erledigen:

- Durchführung von **Beteiligungsformaten mit umsetzenden Akteuren und Normadressaten**, z. B. moderierte Gespräche mit nachgelagerten Behörden
- Erstellung von **Visualisierungen** und Stakeholder Maps
- Klärung von **Fragen zur technischen Umsetzung**
- **Analyse von Rahmenbedingungen** für eine reibungslose Umsetzung, z. B. durch die Evaluation bestehender IT-Verfahren`,
            sellingPoints: "Ihr Vorteil auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Zeitaufwand",
                text: `- **Fachreferat:** 5+ Tage für gemeinsame Arbeitssitzungen
- **DigitalService-Team:** 4+ Wochen`,
              },
              {
                icon: CheckCircleOutlined,
                title: "Was sie bekommen",
                text: `- Antworten auf Fragen zur digitalen Umsetzung der Regelung
- Material, Wissen und Argumente für Abstimmungen und Beteiligungen`,
              },
              {
                icon: FormatListBulletedOutlined,
                title: "Voraussetzungen",
                text: `- Regelungsverfahren befindet sich in frühem Stadium: Vorbereitung des Regelungstextes
- inhaltliche Zusammenarbeit mit umsetzenden Akteur:innen ist möglich`,
              },
            ],
            examples: [
              {
                text: "Lesen Sie sich das Beispiel durch: [„Begleitung des Stromsteuergesetz“](https://digitalservice.bund.de/blog/aktuelles-beispiel-fuer-digitaltaugliche-regelungen-das-stromsteuerrecht)",
              },
            ],
          },
        ],
      },
      {
        title: "Online-Schulungen",
        offerings: [
          {
            title:
              "Regelungen digitaltauglich gestalten – praktische Tipps für den Digitalcheck",
            text: `Fast alles, was wir heutzutage in der Verwaltung tun, hat einen Daten- oder Digitalbezug. Regelungsvorhaben sind daher die zentrale Voraussetzung für digitale Leistungen und Prozesse und schaffen die Grundlage für einen digitalen Staat.
<br class="block content-[''] !mb-32" />
In dieser Online-Schulung erfahren Sie, wie Sie Regelungen so formulieren, dass Sie den **Digitalcheck erfolgreich bestehen**. Wir zeigen an **Beispielen**, wie Sie Ihre Regelungen digitaltauglich schreiben können. Anhand der fünf bewährten **Prinzipien für Digitaltauglichkeit** erläutern wir, wie Sie Begriffe und Konzepte wie Automatisierung und Standardisierung optimal nutzen, um Ihre Vorhaben fit für die digitale Zukunft zu machen.
<br class="block content-[''] !mb-32" />
Das Angebot richtet sich an alle, die in den Bundesministerien Regelungen erarbeiten. Vorkenntnisse sind nicht erforderlich.`,
            button: {
              text: "Per E-Mail anmelden",
              href: encodeURI(
                `mailto:digitalcheck@digitalservice.bund.de?subject=[Digitalcheck Schulung] Anmeldung digitaltaugliche Regelungen&body=Guten Tag,

ich möchte mich gerne für die Online-Schulung anmelden:

Regelungen digitaltauglich gestalten – praktische Tipps für den Digitalcheck

am

[Wunsch-Datum einfügen]

Mit freundlichen Grüßen`,
              ),
              look: "tertiary" as const,
            },
            sellingPoints: "Alle Informationen auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Nächste Termine",
                text:
                  "Wir planen bald neue Termine für Schulungen in 2025. Schreiben Sie uns eine E-Mail und wir setzen Sie auf die Warteliste.\n" +
                  "Sie können sich bis dahin das [Schulungsmaterial ansehen](https://github.com/digitalservicebund/digitalcheck-content/tree/main/src/online-schulungen).",
              },
              /*                text: `
- **Donnerstag, 14. November,**<br class="max-md:hidden"> 10:30–12:00 Uhr
- **Dienstag, 19. November,**<br class="max-md:hidden"> 13:00–14:30 Uhr
- **Donnerstag, 28. November,**<br class="max-md:hidden"> 11:00–12:30 Uhr`,
              },
              {
                icon: CheckCircleOutlined,
                title: "Was Sie bekommen",
                text: `
- Tipps für einen erfolgreichen Digitalcheck
- Beispiele für digitaltaugliche Formulierungen
- Einführung zum Anwenden der Prinzipien für Digitaltauglichkeit`,
              },*/
            ],
          },
          {
            title: "Visualisierungen – Komplexes einfach darstellen",
            text: `Digitaltaugliche Regelungen müssen von Beginn an aus der Umsetzungsperspektive gedacht werden. Visualisierungsmethoden bieten dafür wertvolle Unterstützung: Mit ihrer Hilfe lassen sich einzelne **Prozessschritte, Zielgruppen und beteiligte Akteure** darstellen. **Mögliche Hindernisse** für eine digitale Umsetzung werden sicht- und bearbeitbar.
<br class="block content-[''] !mb-32" />
In unserer interaktiven Online-Schulung erfahren Sie, wie Sie Visualisierungen gezielt für Ihr Regelungsvorhaben nutzen können. Anhand konkreter Beispiele lernen Sie, **eigene Visualisierungen zu erstellen** und so komplexe Vorhaben klar und verständlich zu präsentieren.
<br class="block content-[''] !mb-32" />
Das Angebot richtet sich an alle, die in den Bundesministerien Regelungen erarbeiten. Vorkenntnisse sind nicht erforderlich.`,
            button: {
              text: "Per E-Mail anmelden",
              href: encodeURI(
                `mailto:digitalcheck@digitalservice.bund.de?subject=[Digitalcheck Schulung] Anmeldung Visualisierungen&body=Guten Tag,

ich möchte mich gerne für die Online-Schulung anmelden:

Visualisierungen – Komplexes einfach darstellen

am

[Wunsch-Datum einfügen]

Mit freundlichen Grüßen`,
              ),
              look: "tertiary" as const,
            },
            sellingPoints: "Alle Informationen auf einen Blick",
            details: [
              {
                icon: TimerOutlined,
                title: "Nächste Termine",
                text:
                  "Wir planen bald neue Termine für Schulungen in 2025. Schreiben Sie uns eine E-Mail und wir setzen Sie auf die Warteliste.\n" +
                  "Sie können sich bis dahin das [Schulungsmaterial ansehen](https://github.com/digitalservicebund/digitalcheck-content/tree/main/src/online-schulungen).",
              },
              /*              {
                icon: TimerOutlined,
                title: "Nächste Termine",
                text: `
- **Mittwoch, 13. November,**<br class="max-md:hidden"> 13:00–14:30 Uhr
- **Freitag, 15. November,**<br class="max-md:hidden"> 10:00–11:30 Uhr
- **Donnerstag, 21. November,**<br class="max-md:hidden"> 09:00–10:30 Uhr`,
              },
              {
                icon: CheckCircleOutlined,
                title: "Was Sie bekommen",
                text: `
- verschiedene Arten von Visualisierungen kennenlernen
- Übung selbst Visualisierungen zu erstellen`,
              },*/
            ],
          },
        ],
      },
    ],
  },
};

export const imprint = {
  title: "Impressum",
  content: `## Das Internetangebot wird herausgegeben vom

Bundesministerium des Innern und für Heimat (BMI)<br />
Alt-Moabit 140<br />
10557 Berlin<br />
Telefon: [+49 30 18681-0](tel:+4930186810)<br />
Fax: [+49 30 18681-12926](tel:+49301868112926)<br />
E-Mail: [poststelle@bmi.bund.de](mailto:poststelle@bmi.bund.de)<br />
DE-Mail: [poststelle@bmi-bund.de-mail.de](mailto:poststelle@bmi-bund.de-mail.de)
<br class="block content-[''] !mb-24" />

### Weitere Kontaktmöglichkeiten

**Redaktionsleitung**<br />
Abteilung DV (Digitale Verwaltung; Steuerung OZG)<br />
Referat DV I 3 — Digitale Verwaltungstransformation; Digitalcheck<br />
Verantwortlich: Dany Homilius (Referatsleiterin DV I 3)<br />
E-Mail: [DVI3@bmi.bund.de](mailto:DVI3@bmi.bund.de) 
<br class="block content-[''] !mb-24" />

### Realisierung, Design, Hosting

DigitalService GmbH des Bundes<br />
Frau Anja Theurer<br />
Prinzessinnenstraße 8-14<br />
10969 Berlin<br />
E-Mail: [hallo@digitalservice.bund.de](mailto:hallo@digitalservice.bund.de)
<br class="block content-[''] !mb-24" />

### Datenschutz

Erfahren Sie mehr hierzu in der [Datenschutzerklärung](${ROUTE_PRIVACY.url})
<br class="block content-[''] !mb-24" />

### Barrierefreiheit

Erfahren Sie mehr hierzu in der [Barrierefreiheitserklärung](${ROUTE_A11Y.url})`,
};

export const privacy = {
  title: "Datenschutzerklärung",
  content: `## 1. Grundlagen
<br />

### 1.1 Verantwortlicher und Datenschutzbeauftragte/r

Verantwortlich für die Verarbeitung von personenbezogenen Daten im Rahmen der Bereitstellung der Website [erarbeiten.digitalcheck.bund.de](https://erarbeiten.digitalcheck.bund.de) ist das Bundesministerium des Innern und für Heimat (BMI).
Bundesministerium des Innern und für Heimat (BMI)

Alt-Moabit 140<br />
10557 Berlin<br />
Tel.: [030 / 18 681-0](tel:+4930186810)<br />
Fax: [030 / 18 681-12926](tel:+49301868112926)<br />
E-Mail: [poststelle@bmi.bund.de](mailto:poststelle@bmi.bund.de)

Bei Fragen zum Datenschutz und zu dieser Datenschutzerklärung erreichen Sie die bzw. den Datenschutzbeauftragte/n des BMI unter:

Beauftragte/r für den Datenschutz im BMI (BDS)<br />
Alt-Moabit 140<br />
10557 Berlin<br />
Tel.: [030 / 18 681-0](tel:+4930186810)<br />
E-Mail: [bds@bmi.bund.de](mailto:bds@bmi.bund.de)<br />
<br class="block content-[''] !mb-24" />

### 1.2 Personenbezogene Daten

Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt — insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten und/oder zu einer Online-Kennung — identifiziert werden kann.
<br class="block content-[''] !mb-24" />

### 1.3 Auftragsverarbeiter

DigitalService GmbH des Bundes<br />
Prinzessinnenstraße 8-14<br />
10969 Berlin<br />

DigitalService ist eine Bundes GmbH. Die Bundesrepublik Deutschland — vertreten durch das Bundesministerium des Innern und für Heimat — hält 100 Prozent der Anteile der GmbH. Mit dem Auftragsverarbeiter wurde eine Vereinbarung gemäß Art. 28 DSGVO geschlossen.

**Datenschutzbeauftragter des Auftragsverarbeiters**

Des Weiteren können Sie datenschutzrechtliche Fragen auch an den Datenschutzbeauftragten des DigitalService richten. Diesen erreichen Sie unter folgender Adresse:

E-Mail: [datenschutz@digitalservice.bund.de](mailto:datenschutz@digitalservice.bund.de)
<br class="block content-[''] !mb-48" />

## 2. Verarbeitung personenbezogener Daten im Zusammenhang mit der Nutzung der Website und Rechtsgrundlagen
<br />

### 2.1 Besuch dieser Seite

Zur Verbesserung und Analyse des Nutzendenverhaltens setzen wir ein Produkt-Analyse-Tool (plausible.io) ein, das uns anonym erhobene Daten über die Nutzung unserer Website liefert. Dies hilft uns, das Nutzendenverhalten zu verstehen und unsere Inhalte und Dienstleistungen kontinuierlich zu verbessern. Der Diensteanbieter plausible erhebt die IP-Adresse und wandelt diese sofort in ein anonymisiertes Format um. Ab diesem Zeitpunkt werden keine personenbezogenen Daten mehr verarbeitet.
Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von plausible: [https://plausible.io/data-policy](https://plausible.io/data-policy)

Folgende Daten werden für die Analyse verarbeitet:

**Standortdaten**
- IP-Adresse

**Daten zum Nutzungsverhalten**
- Besuchte Seiten
- Klickverhalten
- Zeitpunkt des Besuchs

**Technische Daten**
- Browser und Browserversion
- Gerätetyp
- Betriebssystem des Geräts

**Verlaufsdaten**
- Verweisende Seite (von welcher Seite sind Sie auf diese Seite gekommen)
<br />

Um die Stabilität (Fehlerkorrektur) und Sicherheit des Angebotes zu gewährleisten sowie um das BSI bei der Abwehr von Gefahren für die Kommunikationstechnik des Bundes zu unterstützen, werden die Daten automatisch in sogenannte Logfiles (technische Protokolldateien) geschrieben und dort angelehnt an § 5 BSIG für eine Dauer von 90 Tagen aufbewahrt. Danach werden sie automatisch gelöscht. Der Zugriff ist durch technische und organisatorische Maßnahmen nur einem festgelegten und nachvollziehbaren Kreis von entsprechend angewiesenen Administratorinnen und Administratoren möglich. 

Der Datenverkehr zwischen Ihrem Webbrowser und den Servern des Dienstes erfolgt über eine verschlüsselte HTTPS-Verbindung. HTTPS ist eine gesicherte Variante des Verbindungsprotokolls (HTTP), mit dem Webbrowser und Server Daten (bspw.: Ihre Eingaben) über das Internet austauschen, um zu verhindern, dass unbefugte Dritte von diesen Kenntnis erhalten. 

Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. e) DSGVO i.V.m. § 3 BDSG. Die Datenverarbeitung dient der zielgerichteten und ausgewogenen Öffentlichkeitsarbeit sowie dem Schutz der IT-Infrastruktur des Bundes. Die damit verbundene Verarbeitung Ihrer Daten beim Besuch der Seite geschieht zu diesem Zweck. Für die Erfüllung dieser Verarbeitungszwecke ist die Verarbeitung der genannten personenbezogenen Daten erforderlich. 
<br class="block content-[''] !mb-24" />

### 2.2 Kontaktaufnahme
Die Verarbeitung personenbezogener Daten erfolgt in Abhängigkeit des Kontaktweges. Hierbei kann zwischen Kontaktaufnahme per E-Mail, per Kontaktformular oder Telefon unterschieden werden.  Die Verarbeitung der Daten ist zur Wahrnehmung unserer Aufgaben erforderlich (Art. 6 Abs. 1 UAbs. 1 lit. e) DSGVO in Verbindung mit § 3 BDSG). Nähere Details zur Verarbeitung Ihrer Daten im Falle der Kontaktaufnahme mit dem BMI entnehmen Sie bitte der allgemeinen [Datenschutzerklärung](https://www.bmi.bund.de/DE/service/datenschutz/datenschutz_node.htm) des BMI.

#### 2.2.1 Kontaktaufnahme - E-Mail
Bei Anfragen an die Kontakt-E-Mail-Adresse [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de) werden durch den Auftragsverarbeiter ausschließlich solche Daten verarbeitet, die notwendig sind, um mit Ihnen zu kommunizieren. Hierzu gehören insbesondere jene personenbezogenen Informationen (z. B. Name, Vorname, Anschrift, E-Mail-Adresse usw.), die unmittelbar von Ihnen übersandt werden. Die Löschung der personenbezogenen Daten erfolgt sechs Monate nach dem Zugang der letzten E-Mail. 

#### 2.2.2 Kontaktaufnahme - Kontaktformular / Terminbuchungsformular
Bei Anfragen über ein Kontaktformular oder Terminbuchungsformular werden durch den Auftragsverarbeiter ausschließlich solche Daten verarbeitet, die notwendig sind, um mit Ihnen zu kommunizieren oder einen Termin zu vereinbaren. Hierzu gehören insbesondere jene personenbezogenen Informationen (z.B. Name, Vorname, E-Mail-Adresse usw.), die unmittelbar von Ihnen eingegeben und übersandt werden. Die Löschung der personenbezogenen Daten erfolgt sechs Monate nach dem Zugang der letzten E-Mail.

#### 2.2.3 Kontaktaufnahme - Telefon
Bei Anrufen an die Telefonnummer des Digitalcheck Teams werden durch den Auftragsverarbeiter ausschließlich solche Daten verarbeitet, die notwendig sind, um mit Ihnen zu kommunizieren. Hierzu gehören insbesondere jene personenbezogenen Informationen (z. B. Name, Vorname, Anschrift, E-Mail-Adresse usw.), die unmittelbar von Ihnen genannt oder übersandt werden. 

### 2.3 Technischer Cookie (über die Session) zur Zwischenspeicherung der Antworten in der Vorprüfung

Bei Nutzung des Services wird ein technischer Cookie verwendet welcher in einer Zeichenkette die Antworten (Ja / Nein / Vielleicht) zwischenspeichert. Diese werden dafür verwendet, ein zurückgehen in der Navigation zu unterstützen. Der Cookie ist kurzlebig und wird mit Saisonende oder spätestens nach sieben Tagen gelöscht. Im Cookie werden keine personenbezogenen Daten gespeichert oder verarbeitet.

**Name:** user-answers
<br />
**Wert:** Zeichenkette/Hash<br />
**Löschfrist:** Session, spätestens nach 7 Tagen.<br />
**Funktionen:**
- Cookie um die Antworten der Vorprüfung zwischenzuspeichern und so ein zurückgehen durch die Fragen zu ermöglichen,
- um die Antworten in eine PDF zu schreiben,
- beinhaltet keine personenbezogenen Daten,
- basiert nicht auf IP oder anderen auf tatsächlichen Nutzer zurückverfolgbaren Informationen,
- Gültigkeit endet mit Ablauf der Sitzung, spätestens nach 7 Tagen.
<br class="block content-[''] !mb-48" />

## 3. Datenempfänger

Das BMI setzt im Rahmen einer Auftragsverarbeitung die DigitalService GmbH des Bundes als Dienstleister ein. Mit diesem Dienstleister wurde ein Vertrag gemäß Artikel 28 Abs. 3 DSGVO geschlossen; datenschutzrechtlich verantwortlich ist das BMI. 

Darüber hinaus kann es im Einzelfall zur Weitergabe von Daten an Dritte kommen, soweit wir hierzu rechtlich verpflichtet sind oder dies zur Abwehr einer Gefahr für die öffentliche Sicherheit, zur Verfolgung von Straftaten oder zur Abwehr von Angriffen auf unsere IT-Infrastrukturen erforderlich ist. Eine Weitergabe in anderen Fällen erfolgt nicht. Eine Zusammenführung dieser Daten mit anderen Datenquellen zum Beispiel zum Anlegen von Nutzerprofilen erfolgt durch das BMI nicht.
<br class="block content-[''] !mb-48" />

## 4. Werden personenbezogene Daten an Dritte weitergegeben?

Personenbezogene Daten werden ausschließlich in Deutschland verarbeitet und nicht an Dritte weitergeleitet. 
<br class="block content-[''] !mb-48" />

## 5. Maßnahmen zur Einhaltung der Datensicherheit

Wir ergreifen umfangreiche Maßnahmen, um die Sicherheit Ihrer Daten zu gewährleisten und unbefugten Zugriff zu verhindern. Hier sind einige der Schritte, die wir unternehmen:

**a.** Sicherheit der Übertragung und Speicherung: Die von Ihnen übermittelten Daten werden per HTTPS verschlüsselt an uns übermittelt und auf verschlüsselten Festplatten gespeichert. Dadurch wird sichergestellt, dass Ihre Informationen während der Übertragung und Speicherung geschützt sind.

**b.** Zugriffskontrollen: Wir verwenden strikte Zugriffskontrollen, um sicherzustellen, dass nur autorisierte Personen Zugriff auf die Systeme und Daten haben. Dies umfasst die Verwendung von sicheren Authentifizierungsmethoden und Berechtigungsverwaltungssystemen.

**c.** Überwachung und Auditing: Unsere Systeme werden kontinuierlich überwacht, um verdächtige Aktivitäten zu erkennen und zu verhindern. Wir führen auch regelmäßige interne & externe Audits durch, um sicherzustellen, dass alle Sicherheitsvorkehrungen ordnungsgemäß funktionstüchtig sind.

**d.** Schulung der Mitarbeiter: Unsere Mitarbeiter werden regelmäßig zu Datenschutz- und Sicherheitsrichtlinien geschult, um sicherzustellen, dass sie die erforderlichen Maßnahmen ergreifen, um die Vertraulichkeit der Daten zu wahren.

Im Rahmen der Verwendung des Dienstes Plausible wurden weitere Maßnahmen zur Sicherheit der personenbezogenen Daten getroffen:

- Speichern der Daten auf Servern in Deutschland
- Beschränkte Zugriffsrechte auf die Daten
- Anonymisierung von IP-Adressen
- Wir sammeln nur Datenpunkte, die relevant sind für die weitere Produktentwicklung im Sinne der Nutzerfreundlichkeit und Erweiterung von Funktionen
<br class="block content-[''] !mb-48" />

## 6. Ihre Rechte

Sie haben gegenüber dem Verantwortlichen folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:

- **Recht auf Auskunft, Art. 15 DSGVO**<br />
Mit dem Recht auf Auskunft erhält der Betroffene eine umfassende Einsicht in die ihn angehenden Daten und einige andere wichtige Kriterien wie beispielsweise die Verarbeitungszwecke oder die Dauer der Speicherung. Es gelten die in § 34 BDSG geregelten Ausnahmen von diesem Recht.

- **Recht auf Berichtigung, Art. 16 DSGVO**<br />
Das Recht auf Berichtigung beinhaltet die Möglichkeit für den Betroffenen, unrichtige oder unvollständige ihn angehende personenbezogene Daten korrigieren zu lassen.

- **Recht auf Löschung, Art. 17 DSGVO**<br />
Das Recht auf Löschung beinhaltet die Möglichkeit für den Betroffenen, Daten beim Verantwortlichen löschen zu lassen. Dies ist allerdings nur dann möglich, wenn die ihn angehenden personenbezogenen Daten nicht mehr notwendig sind, rechtswidrig verarbeitet werden oder eine diesbezügliche Einwilligung widerrufen wurde. Es gelten die in § 35 BDSG geregelten Ausnahmen von diesem Recht.

- **Recht auf Einschränkung der Verarbeitung, Art. 18 DSGVO**<br />
Das Recht auf Einschränkung der Verarbeitung beinhaltet die Möglichkeit für den Betroffenen, eine weitere Verarbeitung der ihn angehenden personenbezogenen Daten vorerst zu verhindern. Eine Einschränkung tritt vor allem in der Prüfungsphase anderer Rechtewahrnehmungen durch den Betroffenen ein.

- **Recht auf Datenübertragbarkeit, Art. 20 DSGVO**<br />
Das Recht auf Datenübertragbarkeit beinhaltet die Möglichkeit für den Betroffenen, die ihn angehenden personenbezogenen Daten in einem gängigen, maschinenlesbaren Format vom Verantwortlichen zu erhalten, um sie ggf. an einen anderen Verantwortlichen weiterleiten zu lassen. Gemäß Art. 20 Abs. 3 Satz 2 DSGVO steht dieses Recht aber dann nicht zur Verfügung, wenn die Datenverarbeitung der Wahrnehmung öffentlicher Aufgaben dient.

- **Recht auf Widerruf der Einwilligung, Art.7 Abs.3 DSGVO**<br />
Soweit die Verarbeitung der personenbezogenen Daten auf Grundlage einer Einwilligung erfolgt, kann der Betroffene diese jederzeit für den entsprechenden Zweck widerrufen. Die Rechtmäßigkeit der Verarbeitung aufgrund der getätigten Einwilligung bleibt bis zum Eingang des Widerrufs unberührt.

- **Recht auf Widerspruch gegen die Erhebung, Verarbeitung und bzw. oder Nutzung, Art. 21 DSGVO**<br />
Das Recht auf Widerspruch beinhaltet die Möglichkeit, für Betroffene in einer besonderen Situation der weiteren Verarbeitung ihrer personenbezogenen Daten zu widersprechen, soweit diese durch die Wahrnehmung öffentlicher Aufgaben oder öffentlicher sowie privater Interessen rechtfertigt ist. Es gelten die in § 36 BDSG geregelten Ausnahmen von diesem Recht.

Zur Ausübung der vorgenannten Rechte können Sie sich schriftlich an die unter Ziffer 1.1 genannten Stellen wenden.

Ihnen steht zudem gemäß Art. 77 DSGVO ein Beschwerderecht bei der datenschutzrechtlichen Aufsichtsbehörde, dem [Bundesbeauftragten für den Datenschutz und die Informationsfreiheit](https://www.bfdi.bund.de/DE/Home/home_node.html), Graurheindorfer Str. 153, 53117 Bonn zu.`,
};

export const accessibility = {
  title: "Erklärung zur Barrierefreiheit",
  content: `*Informationen über die Zugänglichkeit dieser Webseiten gemäß § 12 Behindertengleichstellungsgesetz (BGG) sowie über diesbezügliche Kontaktmöglichkeiten.*
<br class="block content-[''] !mb-24" />

Das Bundesministerium des Innern, für Bau und Heimat (BMI) ist bemüht, seine Webseite [erarbeiten.digitalcheck.bund.de](https://erarbeiten.digitalcheck.bund.de) so weit wie möglich barrierefrei zu gestalten. Rechtsgrundlage sind das Behindertengleichstellungsgesetz (BGG), die Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) und die harmonisierte europäische Norm EN 301 549 in ihrer jeweils gültigen Fassung.

Im Rahmen eines internen Tests wurde jedoch festgestellt, dass der Webauftritt noch keine vollständige Barrierefreiheit gewährleistet. Das BMI arbeitet dementsprechend mit Nachdruck daran, die barrierefreie Gestaltung seiner Webseite weiter zu verbessern.

Diese Erklärung wurde am 11. Juli 2024 erstellt.
<br class="block content-[''] !mb-48" />

## Welche Bereiche sind nicht barrierefrei?

Teilbereiche, die nicht barrierefrei sind:

- Externe Links können nicht immer barrierefrei angeboten werden, da sie auf Inhalte oder Ressourcen außerhalb des aktuellen Angebots verweisen, auf die wir keinen direkten Einfluss haben.
- Anderssprachige Abschnitte und Wörter sind nicht immer technisch als solche gekennzeichnet, was zu unverständlicher Aussprache in Vorlese-Software führen kann.
- An einzelnen Stellen wird ein \`<br/>\` benutzt diese werden noch entfernt.
<br class="block content-[''] !mb-48" />

## Barriere melden! Hinweise zur Barrierefreiheit

Sind Ihnen weitere Mängel beim barrierefreien Zugang zu Inhalten von [erarbeiten.digitalcheck.bund.de](https://erarbeiten.digitalcheck.bund.de) aufgefallen? Dann können Sie sich gern bei uns melden:

**Bundesministerium des Innern und Heimat (BMI)**<br />
Alt Moabit 140<br />
10557 Berlin<br />
Telefon: [03018 681-0](tel:+4930186810)<br />
Telefax: [03018 681 - 12926](tel:+49301868112926)<br />
E-Mail: [DVI3@bmi.bund.de](mailto:DVI3@bmi.bund.de)
<br class="block content-[''] !mb-48" />

## Schlichtungsverfahren

Wenn auch nach Ihrem Hinweis an den oben genannten Kontakt keine zufriedenstellende Lösung gefunden wurde, können Sie sich an die Schlichtungsstelle nach § 16 BGG wenden. Die Schlichtungsstelle BGG hat die Aufgabe, bei Konflikten zum Thema Barrierefreiheit zwischen Menschen mit Behinderungen und öffentlichen Stellen des Bundes eine außergerichtliche Streitbeilegung zu unterstützen. Dabei geht es nicht darum, Gewinner oder Verlierer zu finden. Vielmehr ist es das Ziel, mit Hilfe der Schlichtungsstelle gemeinsam und außergerichtlich eine Lösung für ein Problem zu finden. Das Schlichtungsverfahren ist kostenlos. Es muss kein Rechtsbeistand eingeschaltet werden.
Auf der Internetseite der Schlichtungsstelle finden Sie alle Informationen zum Schlichtungsverfahren. Dort können Sie nachlesen, wie ein Schlichtungsverfahren abläuft und wie Sie den Antrag auf Schlichtung stellen. Sie können den Antrag dort auch in Leichter Sprache oder in Deutscher Gebärdensprache stellen.

Sie erreichen die Schlichtungsstelle unter folgender Adresse:

**Schlichtungsstelle nach dem Behindertengleichstellungsgesetz bei dem Beauftragten der Bundesregierung für die Belange von Menschen mit Behinderungen**<br />
Mauerstraße 53<br />
10117 Berlin<br />
Telefon: [030 18 527-2805](tel:+4930185272805)<br />
Fax: [030 18 527-2901](tel:+4930185272901)<br />
E-Mail: [info@schlichtungsstelle-bgg.de](mailto:info@schlichtungsstelle-bgg.de)<br />
Internet: [www.schlichtungsstelle-bgg.de](https://www.schlichtungsstelle-bgg.de)`,
};

export const regulations = {
  subtitle: [
    "Hier finden Sie alles zur Digitaltauglichkeit dieser Regelung.",
    "Inhalt",
  ],
  infoLabels: ["Fassung vom", "Aktuelle Fassung", "Ressort"],
  infoTitle: "Hinweis",
  infoText:
    "Markierte Formulierungen sind gute Beispiele für die Ermöglichung digitaler Umsetzung, trotz ausstehender Verabschiedung.",
  visualisations: {
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
    title: "Formulierungen aus der Regelung",
    subtitle:
      "So hat das Referat in der Dokumentation die Digitaltauglichkeit in die Regelung geschrieben",
  },
  nkr: {
    title: "NKR Stellungnahme",
    subtitle: "Diese Ausführungen sind der Stellungnahme des NKR entnommen.",
    linkText: "Die ganze Stellungnahme können Sie hier finden: ",
  },
  yourRegulation: {
    title: "Sie möchten Ihr Beispiel hier sehen?",
    text: "Wir nehmen gerne Vorschläge für Beispiele entgegen. Wenn Sie einen digitaltauglichen Regelungstext oder eine Visualisierung haben, schreiben Sie uns eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Beispiel:%20Digitaltauglichkeit). Wir melden uns zeitnah bei Ihnen.",
  },
};

export const visualisations = {
  title: "Beispiele für Visualisierungen",
  subtitle:
    "Hier finden Sie Visualisierungen, welche Legistinnen und Legisten beim Erarbeiten der Digitaltauglichkeit geholfen haben und veröffentlicht wurden.",
};

export const interoperability = {
  headline:
    "EU-Vorgaben zur Interoperabilität: Alles Wichtige für Ihre Regelung im Überblick",
  content:
    "Hier finden Sie kompakt die wichtigsten Informationen zur [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) im Zusammenhang mit dem Digitalcheck.",
  andDigitalReadiness: {
    id: "digitaltauglich",
    headline: "Interoperabilität und Digitaltauglichkeit",
    content: `Die EU-Anforderungen an Interoperabilität fördern die Zusammenarbeit und den sicheren Datenaustausch zwischen Verwaltungen und öffentlichen Einrichtungen in Europa. **Jedes Vorhaben, das diese Anforderungen erfüllen muss, hat automatisch Digitalbezug.** Da sich viele Anforderungen der Interoperabilität mit denen der Digitaltauglichkeit überschneiden, wird in Deutschland der bestehenden Digitalcheck um Aspekte der Interoperabilität erweitert.
<br/><br/>
Mit Hilfe der **Vorprüfung** können Sie feststellen, ob Ihre Regelung die Anforderungen an Interoperabilität erfüllt.
      `,
    button: "Zur Vorprüfung",
    image: {
      url: "/images/zusammenhang-interoperabilitaet-und-digitaltauglichkeit.png",
      alternativeText: `Interoperabilität wird als großer Kreis dargestellt, der einen kleineren Kreis mit Digitaltaugliche Regelungen umschließt. Dies zeigt, dass digitaltaugliche Regelungen ein Teil der Interoperabilität sind.`,
    },
  },
  faq: {
    id: "faq",
    headline: "Häufig gestellte Fragen",
    content:
      "In diesem Bereich erhalten Sie umfassende Informationen zur Einführung der EU-Vorgaben zur Interoperabilität sowie zum Prozess der Erarbeitung von Interoperabilität in Regelungen. Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns unter: [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder unter [0151/40 76 78 39](tel:+4915140767839).",
    items: [
      {
        headline: "Was sind „transeuropäische digitale öffentliche Dienste“?",
        content: `
Transeuropäische digitale öffentliche Dienste sind 
- digitale Dienste, 
- die von Einrichtungen der Union oder öffentlichen Stellen 
  - füreinander oder 
  - für natürliche oder juristische Personen in der Union erbracht werden und 
- eine grenzüberschreitende Interaktion 
  - zwischen den Mitgliedstaaten, 
  - zwischen Mitgliedstaaten und Einrichtungen der Union oder 
  - zwischen Einrichtungen der Union
- über deren Netz- und Informationssysteme erfordern.

Beispiele für solche transeuropäischen digitalen öffentlichen Dienste sind Dienste, die durch grenzüberschreitenden Datenaustausch z.B. Folgendes ermöglichen:
- gegenseitige Anerkennung von akademischen Diplomen oder beruflichen Qualifikationen
- Austausch von Fahrzeugdaten für die Straßenverkehrssicherheit 
- Zugang zu Daten der sozialen Sicherheit und des Gesundheitswesens 
- den Zugang zu Single-Window-Systemen
- den Austausch von Informationen im Zusammenhang mit Steuern, Zöllen, der Akkreditierung öffentlicher Ausschreibungen, digitalen Führerscheinen oder Handelsregistern 

Zu den transeuropäischen digitalen öffentlichen Diensten gehören im Allgemeinen alle Dienste, die das „Once-Only“-Prinzip für den Zugang und den Austausch grenzüberschreitender Daten anwenden. Auch jeder Dienst, der die europäische Brieftasche für die digitale Identität (EUDI-Wallet) nutzt, kann als transeuropäischer digitaler öffentlicher Dienst betrachtet werden, da er automatisch einen grenzüberschreitenden Datenaustausch mit sich bringt.

Quellen:
<br/>[EUR-Lex - Verordnung für ein interoperables Europa EU 2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
<br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)

        `,
      },
      {
        headline:
          "Wie hängen digitaltaugliche Regelungen und Interoperabilität zusammen?",
        content: `
Interoperabilität und Digitaltauglichkeit sind eng miteinander verwoben. Wenn ein Vorhaben die EU-Anforderungen für Interoperabilität erfüllen muss, hat es automatisch auch einen Digitalbezug. Da sich viele Anforderungen der Interoperabilität mit denen der Digitaltauglichkeit überschneiden, wird in Deutschland der bestehenden Digitalcheck um Aspekte der Interoperabilität erweitert.

Bereits heute legen Sie beim Erarbeiten von digitaltauglichen Regelungen die Grundlage für Interoperabilität. Durch das Befolgen der Digitalcheck Prinzipien tun Sie dies auf technischer und semantischer Ebene, durch die Arbeit mit Visualisierungen auf prozessualer Ebene. Damit erfüllen Sie Anforderungen, die sich auch aus der EU-Verordnung ergeben.

Ob sich für Ihre Regelung Anforderungen aus der EU-Verordnung ergeben, erfahren Sie durch die um Interoperabilität erweiterte [Digitalcheck Vorprüfung](/vorpruefung). Falls sich eine Berichtspflicht an die Europäische Kommission ergibt, unterstützt Sie das Digitalcheck Team dabei, eine Interoperabilitätsbewertung durchzuführen, zu dokumentieren und den Bericht einzureichen.
        `,
      },
      {
        headline:
          "Was bedeutet grenzüberschreitende Interoperabilität und was ist dafür erforderlich?",
        content: `
Im EU-Kontext bedeutet grenzüberschreitende Interoperabilität, dass öffentliche Stellen der Mitgliedstaaten und der Union digital zusammenarbeiten können. Die Grundlage dafür ist, dass Daten, Informationen und Wissen digital ausgetauscht werden.

Im Ergebnis bedeutet ein hoher Grad an Interoperabilität, dass digitale öffentliche Dienste über Länder- und Sektorgrenzen funktionieren - Bürger:innen und Unternehmen haben eine bessere Nutzendenerfahrung und sparen Zeit und Kosten.

Digitaltaugliche Gesetze, die Interoperabilität unterstützen, legen hierfür die Grundlage. Für Ihre Arbeit an Vorhaben sollte Interoperabilität in unterschiedlichen Dimensionen bewertet werden. Das European Interoperability Framework (EIF) definiert dafür vier Ebenen:

**Rechtliche** Interoperabilität legt die gesetzlichen Grundlagen für den Datenaustausch.
<br/>**Organisatorische** Interoperabilität beschreibt die für den Datenaustausch notwendigen Geschäftsprozesse.
<br/>**Semantische** Interoperabilität stellt sicher, dass Daten und Begriffe gleich verstanden werden.
<br/>**Technische** Interoperabilität beschreibt die erforderlichen technischen Systeme und Standards, die für den Datenaustausch notwendig sind.

![Die Grafik veranschaulicht die vier Ebenen der Interoperabilität mit Symbolen und kurzen Erklärungen. Die rechtliche Interoperabilität (dunkelblau, Waage-Icon) definiert die gesetzlichen Grundlagen für den Datenaustausch. Die organisatorische Interoperabilität (hellblau, vernetzte Personen) beschreibt die organisatorischen Prozesse. Die semantische Interoperabilität (graublau, Sprechblasen) stellt sicher, dass Daten und Begriffe einheitlich verstanden werden. Die technische Interoperabilität (hellgrau, Zahnräder) umfasst die technischen Systeme und Standards, die für den Datenaustausch erforderlich sind.](images/ebenen-der-interoperabilitaet.jpg)

Quellen: 
<br/>[EUR-Lex - Verordnung für ein interoperables Europa EU 2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
<br/>[European Commission - European Interoperability Framework](https://ec.europa.eu/isa2/eif_en/)
<br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)
        `,
      },
      {
        headline:
          "Was ist der europäische Interoperabilitätsrahmen (European Interoperability Framework EIF) und was beinhaltet er?",
        content: `
Falls die [Digitalcheck Vorprüfung](/vorpruefung) für Ihr Vorhaben einen Bezug zu Interoperabilität ergeben hat, so wird das European Interoperability Framework (EIF) relevant. Das EIF ist ein Leitfaden für die Umsetzung digitaler öffentlicher Dienste.

Das EIF beinhaltet:
- Einen organisatorischen Rahmen für die Koordinierung von Aktivitäten der Verwaltung
- Ein konzeptionelles Modell für Konzeption, Entwicklung und Betrieb von öffentlichen Diensten von der lokalen bis zur EU-Ebene
- Praktische Instrumente in Form einer Reihe von umsetzbaren Empfehlungen

Ein Kerninhalt des EIF ist die Unterteilung von Interoperabilität in vier Ebenen:
- Rechtliche Interoperabilität definiert die rechtlichen Grundlagen eines Datenaustauschs
- Organisatorische Interoperabilität beschreibt die für den Datenaustausch notwendigen Geschäftsprozesse
- Semantische Interoperabilität stellt sicher, dass Daten und Begriffe gleich verstanden werden
- Technische Interoperabilität beschreibt die erforderlichen technischen Systeme und Standards, die für den Datenaustausch notwendig sind

Die Inhalte des EIF begleiten Sie insbesondere bei der Durchführung von Interoperabilitätsbewertungen. Auch bei der Entwicklung von speziellen oder nationalen Interoperabilitätsrahmen sollte das EIF berücksichtigt werden.

Quellen: 
<br/>[European Commission - European Interoperability Framework](https://ec.europa.eu/isa2/eif_en/)
<br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)
        `,
      },
      {
        headline:
          "Welche Art von Unterstützung gibt es für die Durchführung von Interoperabilitätsbewertungen?",
        content: `
Wenn Sie eine Interoperabilitätsbewertung durchführen, stehen Ihnen Unterstützungsmaßnahmen zur Verfügung.

Die [Verordnung für ein interoperables Europa](https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32024R0903) sieht in den Mitgliedstaaten nationale Kontaktstellen vor. Für Deutschland hat das Bundesministerium des Innern und für Heimat das Team vom Digitalcheck mit der Ausführung beauftragt. 

Wir unterstützen Sie derzeit individuell bei der Durchführung einer Interoperabilitätsbewertung für eine interoperable Regelung und bei der Erstellung eines entsprechenden Berichts. Kontaktieren Sie uns jederzeit gerne mit Ihren Anliegen - je früher, desto besser.  Schreiben Sie uns über [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:+4915140767839).

Weitergehende Informationen können Sie hier abrufen:

- Die Mindestanforderungen für die inhaltliche Ausgestaltung des Berichts der Interoperabilitätsbewertung finden Sie im [Anhang der Verordnung](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
- Detaillierte Leitlinien für die Inhalte der von Interoperabilitätsbewertungen sind in den “[Guidelines for interoperability assessments](https://interoperable-europe.ec.europa.eu/collection/assessments/assessment-guidelines)” aufgeführt
- [Das Interoperable Europe Framework EIF](https://ec.europa.eu/isa2/sites/default/files/eif_brochure_final.pdf) ist ein Leitfaden für die Umsetzung digitaler öffentlicher Dienste
- Eine Interoperabilitätsbewertung wird in einem maschinenlesbarem Bericht dokumentiert und veröffentlicht - hierfür stellt der Beirat für ein interoperables Europa ein [Online-Tool zur Verfügung](https://interoperable-europe.ec.europa.eu/collection/assessments) (Registrierung erforderlich)
        `,
      },
      {
        headline:
          "Wie ist der Prozess des Erarbeitens einer Interoperabilitätsbewertung?",
        content: `
Die Verordnung für ein interoperables Europa empfiehlt, für Interoperabilitätsbewertungen auf bestehenden Verfahren in den Mitgliedstaaten aufzubauen. Für Deutschland hat das Bundesministerium des Innern und für Heimat das Team Digitalcheck mit der Koordinierung entsprechender Maßnahmen beauftragt.

Der Prozess der Ausarbeitung einer Interoperabilitätsbewertung und des Berichts hat Schnittmengen mit dem Prozess des Erarbeitens von digitaltauglichen Regelungen. Zum Beispiel greifen die fünf Prinzipien der Digitaltauglichkeit und die vier Ebenen der Interoperabilität ineinander und auch die Arbeit mit Visualisierungen wird in den Leitlinien empfohlen.

Mit Ihnen zusammen wollen wir den Prozess der Ausarbeitung von Interoperabilitätsbewertungen aufwandsarm und anwendungsfreundlich gestalten. Um mit Ihnen zu lernen, unterstützen wir Sie deshalb bei Interoperabilitätsbewertungen und der Berichterstellung individuell. 

Kontaktieren Sie uns jederzeit gerne mit Ihren Anliegen - je früher, desto besser. Schreiben Sie uns über [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:+4915140767839).
        `,
      },
      {
        headline: "Was ist das Ergebnis einer Interoperabilitätsbewertung?",
        content: `
Wie beim Prozess für digitaltaugliche Regelungen ist auch der Prozess für Interoperabilitätstaugliche Regelungen zweiteilig.

Im Rahmen einer Interoperabilitätsbewertung identifizieren Sie Potentiale und Hürden für Interoperabilität. Das Ergebnis dokumentieren Sie in einem Bericht.

Der Bericht wird im EU-Portal hochgeladen und automatisch in maschinenlesbarem Format veröffentlicht. Damit wird Ihr Vorgehen transparent für andere Mitgliedstaaten und Sie tragen dazu bei, dass andere öffentliche Stellen oder Einrichtungen der Union sich in Bezug auf Interoperabilität daran ausrichten können.
        `,
      },
    ],
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
        content: `- [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
- [Ressourcen auf dem Interoperable Europe Portal](https://interoperable-europe.ec.europa.eu/): Hier finden sich zusätzliche Informationen, Best Practices und Tools zur Unterstützung bei der Durchführung von Interoperabilitätsbewertungen.`,
      },
      {
        title: "Interoperabilitätsbewertungen",
        icon: Layers,
        subtitle:
          "Hier finden Sie die wichtigsten Informationen zu Interoperabilitätsbewertungen.",
        content: `- [Interoperabilitätsrahmen](https://interoperable-europe.ec.europa.eu/collection/nifo-national-interoperability-framework-observatory/solution/european-interoperability-framework-eif-toolbox): Rahmenwerk mit Prinzipien zur Erarbeitung von interoperablen Regelungen
- [Richtlinien Interoperabilitätsbewertungen](https://interoperable-europe.ec.europa.eu/collection/assessments/assessment-guidelines): Anleitung zur Bewertung der Interoperabilität in Regelungen `,
      },
    ],
  },
  andPolicyMaking: {
    id: "prozess",
    headline: "Wie beeinflusst Interoperabilität Ihr Vorhaben?",
    content: `Die Erarbeitung der Interoperabilität folgt einem ähnlichen Ablauf wie die Erarbeitung der Digitaltauglichkeit. In wenigen Schritten wird sichergestellt, dass Ihr Regelungsvorhaben die erforderlichen Anforderungen erfüllen:

1. **Vorprüfung starten**
    - In der geführten Vorprüfung ermitteln Sie, ob Ihr Regelungsvorhaben einen Digitalbezug hat und ob Interoperabilitätsanforderungen auf EU-Ebene berücksichtigt werden müssen.
2. **Ergebnis übermitteln**
    - Das Prüfergebnis wird per E-Mail an den Normenkontrollrat gesendet.
    - Falls Interoperabilitätsanforderungen bestehen, schicken Sie die Mail außerdem an das Digitalcheck-Team. Dieses unterstützt Sie bei den weiteren Schritten.
3. **Erarbeitung der Regelung**
    - Bei Digitalbezug: Eine Schritt-für-Schritt-Anleitung mit Vorlagen und Praxisbeispielen unterstützt die Erarbeitung der Regelung. 
    - Bei Digitalbezug und Interoperabilität: Das Digitalcheck-Team begleitet Sie im Prozess und unterstützt Sie bei der Interoperabilitätsbewertung.
4. **Dokumentation & Veröffentlichung**
    - Die Dokumentation der Ergebnisse werden an den Normenkontrollrat gesendet und zusätzlich auf dem Interoperable Europe Portal veröffentlicht.
`,
    image: {
      url: "/images/prozess-vorpruefung-mit-interoperabilitaet.jpg",
      alternativeText: `Der Prozess beginnt mit einer geführten Vorprüfung auf Digitalbezug und Anforderungen an Interoperabilität. Daraus ergeben sich drei mögliche Ergebnisse mit unterschiedlichen Prozessschritten: Bei dem Ergebnis "kein Digitalbezug" ist der Erarbeitungsprozess abgeschlossen und wird dem Normenkontrollrat zur Prüfung übermittelt. Bei dem Ergebnis "Digitalbezug" wird das Ergebnis per E-Mail an den Normenkontrollrat gesendet, gefolgt von einer Schritt-für-Schritt-Anleitung und der Dokumentation der Erstellung des Digitalbezugs, die abschließend vom Normenkontrollrat geprüft wird. Für das Ergebnis " Digitalbezug & Anforderungen an die Interoperabilität" wird das Ergebnis per E-Mail an den Normenkontrollrat und das Digitalcheck-Team gesendet, gefolgt von einer Schritt-für-Schritt-Anleitung mit Unterstützung durch das Digitalcheck-Team, der Dokumentation der Erstellung des Digitalbezugs und der Bewertung der Interoperabilität. Die Dokumentation wird anschließend auf dem Interoperable Europe Portal zur Verfügung gestellt.`,
    },
    law: {
      headline: "Rechtliche Grundlage",
      content:
        "Seit Anfang 2023 ist es auf Grundlage des NKRG §4 Abs. 3 verpflichtend, nationale Regelungsvorhaben auf Digitaltauglichkeit zu prüfen. Ob sich Anforderungen an Interoperabilität auf EU-Ebene ergeben, ist in der [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) geregelt, die ab Januar 2025 rechtlich verpflichtend ist.",
    },
  },
  info: {
    id: "info",
    headline: "Informationen zum Einstieg",
    items: [
      {
        headline: {
          text: "Was ist das Ziel der Verordnung für ein interoperables Europa?",
        },
        content:
          "Das Ziel der [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) ist es, digitale öffentliche Dienste zu verbessern. Die Dienste einzelner Mitgliedsstaaten sollen miteinander kompatibel sein. Dafür braucht es gemeinsame Standards, um Daten zwischen den Mitgliedsstaaten auszutauschen. Um digitale Potentiale und Hindernisse zu berücksichtigen, müssen öffentliche Stellen die Interoperabilität neuer Dienste berücksichtigen.",
        detailsSummary: {
          title: "Welche positiven Effekte sollen dadurch erreicht werden?",
          content: `Die Vorschriften erleichtern den Datenaustausch und die Wiederverwendung von Lösungen, indem sie bürokratische Hürden abbauen. Dies spart Kosten und Zeit für Bürgerinnen und Bürger, Unternehmen und Verwaltungen.
<br/><br/>
Bis 2030 soll eine verbesserte Interoperabilität öffentliche Verwaltungen enger vernetzen und transeuropäische digitale Dienste fördern.
Wenn für Ihr Vorhaben eine Verpflichtung dazu besteht, Interoperabilität sicherzustellen, begleiten wir Sie durch den Prozess der Bewertung, Dokumentation und der Berichterstellung.
<br/><br/>
Quellen:
<br/>[EUR Lex - Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
<br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)`,
        },
      },
      {
        headline: {
          text: "Was sind Interoperabilitätsbewertungen und warum sind sie notwendig?",
        },
        content: `Wenn Sie eine Interoperabilitätsbewertung durchführen und den Bericht veröffentlichen, unterstützen Sie damit ein interoperables Europa: 
- Die Nutzung grenzüberschreitender Daten wird ermöglicht.
- Die Qualität und Zugänglichkeit digitaler öffentlicher Dienste wird verbessert.

Durch den Prozess der Interoperabilitätsbewertung ermitteln Sie Potenziale und Hindernisse für grenzüberschreitende Zusammenarbeit. Damit legen Sie die Grundlage für Regelungen, die Interoperabilität ermöglichen. Eine Vorgehensweise ganz ähnlich, wie sie es von der Arbeit an digitaltauglichen Regelungen kennen.
        `,
        detailsSummary: {
          title: "Wie läuft eine Interoperabilitätsbewertung ab?",
          content: `Als Bestandteil der Bewertung identifizieren Sie bestehende Lösungen. Lassen sich diese wiederverwenden, werden Kosten und Aufwand in der Umsetzung reduziert.
Die [Verordnung für ein interoperables Europa]((https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)) definiert im Anhang Mindestanforderungen für die Durchführung einer Interoperabilitätsbewertung, die Details sind in den [Guidelines for interoperability assessments](https://interoperable-europe.ec.europa.eu/collection/assessments/assessment-guidelines) beschrieben.
<br/><br/>
Durch die [Digitalcheck Vorprüfung](/vorpruefung) identifizieren Sie bereits heute, ob Interoperabilität bei der Erarbeitung Ihrer Regelung eine Rolle spielt. Falls sich daraus eine Berichtspflicht an die Europäische Kommission ergibt, unterstützt Sie das Digitalcheck Team dabei, eine Interoperabilitätsbewertung durchzuführen, zu dokumentieren und den Bericht einzureichen.
<br/><br/>
Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns unter: [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder unter  0151 / 40 76 78 39. 
<br/><br/>
Weitere Quellen:
<br/>[European Commission - European Interoperability Framework](https://ec.europa.eu/isa2/eif_en/)
<br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)
`,
        },
      },
      {
        headline: {
          text: "Verbindliche Anforderungen: In welchem Fall ist eine Interoperabilitätsbewertung verpflichtend?",
        },
        content: `Eine Interoperabilitätsbewertung wird für Regelungen durchgeführt, die sich mit verbindlichen Anforderung befassen.
<br/><br/>
Eine verbindliche Anforderung im Sinne der Verordnung ist eine verpflichtende Regel. Das kann z.B. eine Definition, ein Standard, eine Richtlinie, ein Verbot oder eine Beschränkung sein. Eine exakte Definition finden Sie in der [Verordnung in der Präambel, Erwägungsgrund 18](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903).`,
        detailsSummary: {
          title: "Welche Kriterien müssen dafür erfüllt sein?",
          content: `Die Interoperabilitätsbewertung ist für diese verbindliche Anforderung verpflichtend, wenn die folgenden Kriterien aus den [Guidelines for interoperability assessments](https://interoperable-europe.ec.europa.eu/collection/assessments/assessment-guidelines) erfüllt sind:
1. Die Regelung sieht eine digitale Umsetzung vor.
2. Die Regelung sieht den Austausch von Daten und Informationen zwischen Verwaltungen der EU-Mitgliedstaaten vor.
3. Es wurde für die verbindliche Anforderung noch keine Interoperabilitätsbewertung durchgeführt. Dies können Sie im [EU-Portal](https://interoperable-europe.ec.europa.eu/collection/assessments) prüfen.

Falls sich eine Berichtspflicht an die Europäische Kommission ergibt, dann unterstützt Sie das Digitalcheck Team dabei, die Interoperabilitätsbewertung durchzuführen, sie zu dokumentieren und den Bericht einzureichen. 
<br/><br/>
Weitere Quellen:
<br/>[European Commission - European Interoperability Framework](https://ec.europa.eu/isa2/eif_en/)
<br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)
`,
        },
      },
    ],
    image: {
      url: "/images/kriterien-interoperabilitaetsbewertung-entscheidungsbaum.png",
      alternativeText:
        "Ein Entscheidungsdiagramm zur Bestimmung der Verpflichtung zur Interoperabilitätsbewertung. Es beginnt mit der Frage, ob es sich um eine verbindliche Anforderung handelt. Je nach Antwort folgen verschiedene Entscheidungsstufen: Offenheit für Änderungen, Verpflichtung, digitale öffentliche Dienstleistungen, betroffene Akteure und Notwendigkeit des Austauschs in Netzwerken oder Informationssystemen. Wenn alle Bedingungen erfüllt sind, führt der Prozess zur verpflichtenden Interoperabilitätsbewertung. Andernfalls ist sie nicht verpflichtend.",
    },
  },
  feedbackForm: {
    heading: feedbackForm.heading,
    trackingEvent: "Feedback Interoperabel Landing Page",
    questions: [
      {
        id: "useful-feedback",
        trackingEvent: "wie-hilfreich", // muss mit dem custom property in Plausible übereinstimmen
        text: "Wie hilfreich waren die Informationen auf der Seite für Sie?",
        options: feedbackForm.optionsUseful,
      },
    ],
    contact:
      "Schreiben Sie uns eine Email an [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Feedback:%20erarbeiten.digitalcheck.bund.de), wenn wir Sie für Feedback zu unserem Service kontaktieren dürfen.",
    button: feedbackForm.button,
    success: feedbackForm.success,
  },
};
