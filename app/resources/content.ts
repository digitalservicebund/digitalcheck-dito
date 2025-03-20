import type { TQuestion } from "~/routes/vorpruefung.$questionId/route";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_STATIC_PDF,
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
  ROUTE_RESULT,
  ROUTE_SUPPORT,
  ROUTE_VISUALISATIONS,
} from "./staticRoutes";

import ArrowCircleRightOutlined from "@digitalservicebund/icons/ArrowCircleRightOutlined";
import ContactSupportOutlined from "@digitalservicebund/icons/ContactSupportOutlined";
import DrawOutlined from "@digitalservicebund/icons/DrawOutlined";
import GroupOutlined from "@digitalservicebund/icons/GroupOutlined";
import LightbulbOutlined from "@digitalservicebund/icons/LightbulbOutlined";
import StickyNote2Outlined from "@digitalservicebund/icons/StickyNote2Outlined";
import SupportOutlined from "@digitalservicebund/icons/SupportOutlined";
import TimerOutlined from "@digitalservicebund/icons/TimerOutlined";

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

import privacyContent from "app/resources/content/datenschutz.toml";
import imprintContent from "app/resources/content/impressum.toml";
import interoperabilityContent from "app/resources/content/interoperabel.toml";
import supportContent from "app/resources/content/support.toml";
import visualisationsContent from "app/resources/content/visualisierungen.toml";
import accessibilityContent from "~/resources/content/barrierefreiheit.toml";
import regulationsContent from "~/resources/content/beispiele.toml";
import globalContent from "~/resources/content/global.toml";
import headerContent from "~/resources/content/header.toml";
import interviewBannerContent from "~/resources/content/interviewBanner.toml";
import metaContent from "~/resources/content/meta.toml";
import landingContent from "~/resources/content/startseite.toml";
export const interoperability: Interoperabel = interoperabilityContent;
export const visualisations: Visualisierungen = visualisationsContent;
export const accessibility: Barrierefreiheit = accessibilityContent;
export const privacy: Datenschutz = privacyContent;
export const imprint: Impressum = imprintContent;
export const support: Support = supportContent;
export const global: Global = globalContent;
export const header: Header = headerContent;
export const siteMeta: Meta = metaContent;
export const landing: Startseite = landingContent;
export const interviewBanner: InterviewBanner = interviewBannerContent;
export const regulations: Beispiele = regulationsContent;
