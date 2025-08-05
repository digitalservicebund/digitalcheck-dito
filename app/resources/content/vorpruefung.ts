import { preCheckQuestions } from "~/resources/content/shared/pre-check-questions";
import {
  ROUTE_INTEROPERABILITY,
  ROUTE_PRECHECK,
  ROUTE_PRECHECK_INFO,
  ROUTE_PRECHECK_RESULT,
} from "~/resources/staticRoutes";
import type { TQuestion } from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import { dedent } from "~/utils/dedentMultilineStrings";

export const preCheck = {
  start: {
    title: "1. Vorprüfung: Digitalbezug einschätzen",
    subtitle:
      "Finden Sie in 6 Fragen heraus, ob Sie in Ihrem Regelungsvorhaben Aspekte der digitalen Umsetzung und EU-Anforderungen an Interoperabilität beachten müssen.",
    hints: [
      {
        title: "Was ist Digitalbezug?",
        text: dedent`
          Digitalbezug beschreibt die digitale Umsetzung, wenn ein Prozess nach Inkrafttreten eines Vorhabens zumindest teilweise durch ein IT-System abgebildet wird. Beispiele sind:
          - eine Reihe von Aufgaben mit einem bestimmten Ziel, zum Beispiel das Ausfüllen eines Formulars in ELSTER, um die Steuererklärung einzureichen,
          - die Abfrage von Daten aus einem Register oder
          - das Bereitstellen von Informationen auf einer Website.
        `,
      },
      {
        title: "Was ist Interoperabilität?",
        text: "Die EU-Anforderungen zur Interoperabilität beschreiben die Fähigkeit von Verwaltungen und öffentlichen Einrichtungen innerhalb der EU, effektiv zusammenzuarbeiten und Informationen auszutauschen. Sie ermöglicht, dass digitale öffentliche Dienstleistungen über Länder-, Sektor- und Organisationsgrenzen hinweg bereitgestellt werden können.",
      },
    ],
    buttonText: "Vorprüfung starten",
    summary: {
      tabName: "Zusammengefasst",
      title: "Zusammengefasst",
      items: [
        {
          heading: {
            text: "Beginnen Sie so früh wie möglich",
          },
          content:
            "Führen Sie die Vorprüfung zu Beginn Ihrer Arbeit an einem Regelungsvorhaben durch. Das heißt bevor Sie den Regelungstext formulieren.",
        },
        {
          heading: {
            text: "Warum ist die Vorprüfung relevant für mein Vorhaben?",
          },
          content: dedent`
            - **Digitalisierungsbezug frühzeitig erkennen:** Setzen Sie sich frühzeitig mit Chancen der Digitalisierung auseinander, um den Regelungstext so zu gestalten, dass er die praxisnahe Umsetzung ermöglicht.<br/><br/>
            - **EU-Anforderungen identifizieren:** Im Rahmen der Vorprüfung ermitteln Sie, ob grenzüberschreitende Interoperabilität für Ihr Vorhaben relevant ist. Regelungen, die Interoperabilität fördern, ermöglichen technische Standardisierung, rechtliche Harmonisierung und digitale bürgerzentrierte Dienste innerhalb der EU.<br/><br/>
            - **Rechtliche Grundlage:** Seit Juni 2024 ist es verpflichtend nationale Regelungsvorhaben auf Digitaltauglichkeit zu prüfen. Die Grundlage dafür ist das Onlinezugangsgesetz (OZG) von 2017. Zusätzlich müssen ab Januar 2025 bestimmte Regelungsvorhaben die Anforderungen an Interoperabilität auf EU-Ebene unterstützen. Dies ergibt sich aus der EU-Verordnung [Interoperable Europe Act](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903).<br/><br/>
          `,
        },
      ],
    },
    info: {
      tabName: "Digitalbezug und Interoperabilität",
      title: "Digitalbezug und Interoperabilität",
      text: dedent`
        Digitalbezug und Interoperabilität sind eng miteinander verknüpft. Wenn ein Gesetz oder eine Regelung digitale Prozesse vorsieht, müssen oft technische und organisatorische Standards eingehalten werden. 
        Interoperabilität bedeutet, dass verschiedene öffentliche Institutionen über Ländergrenzen hinweg zusammenarbeiten können.
        <br /><br />
        Wenn ein Vorhaben die EU-Anforderungen für Interoperabilität erfüllen muss, hat es automatisch auch einen Digitalbezug. 
      `,
      image: {
        src: "/images/digital-readiness-meets-interop.svg",
        alt: "Illustration von Datenaustausch zwischen zwei Computer-Systemen mit EU-Flagge, symbolisiert europäische digitale Zusammenarbeit.",
      },
      button: {
        text: "Alles zur Interoperabilität",
        href: ROUTE_INTEROPERABILITY.url,
      },
    },
  },
  faq: {
    tabName: "Häufige Fragen",
    title: "Häufige Fragen",
    items: [
      {
        plausibleEventName: "Content.FAQs.FAQ1",
        headline: "Was ist Interoperabilität im EU-Kontext?",
        content: dedent`
          Interoperabilität bedeutet, dass Verwaltungen und öffentliche Einrichtungen in der EU zusammenarbeiten und Informationen austauschen können. So können digitale Dienstleistungen, wie z. B. das Beantragen von Dokumenten oder der Austausch von Gesundheitsdaten, über Länder- und Organisationsgrenzen hinweg einfach bereitgestellt werden.
          
          Das [European Interoperability Framework (EIF)](https://interoperable-europe.ec.europa.eu/collection/nifo-national-interoperability-framework-observatory/european-interoperability-framework-detail) legt hierfür Standards und Regeln fest, die sicherstellen, dass IT-Systeme in der EU miteinander kompatibel sind. Das macht es für Bürger:innen und Unternehmen leichter, öffentliche Dienste in der gesamten EU zu nutzen.
        `,
      },
      {
        plausibleEventName: "Content.FAQs.FAQ2",
        headline: "Was bedeutet Interoperabilität in meinem Vorhaben?",
        content:
          "Wenn Gesetze und Regelungen die Interoperabilität berücksichtigen, fördern sie die Zusammenarbeit zwischen den EU-Mitgliedsstaaten und ihren Verwaltungen. Einheitliche Standards sorgen dafür, dass digitale Dienste bürgerfreundlich, effizient und sicher sind. Gleichzeitig werden einheitliche Regeln geschaffen, die die grenzüberschreitende Zusammenarbeit in der EU erleichtern und eine harmonische Entwicklung der Rechtsvorschriften fördern.",
      },
      {
        plausibleEventName: "Content.FAQs.FAQ3",
        headline:
          "Welche Rolle spielt der Digitalcheck bei interoperablen Regelungsvorhaben?",
        content: dedent`
          Der Digitalcheck begleitet Sie bei der Erarbeitung für digitaltaugliche und ab Januar 2025 interoperable Regelungsvorhaben. Dieser Auftrag wurde dem Digitalcheck vom BMDS erteilt.
          <br/><br/>
          Wenn Ihr Regelungsvorhaben Anforderungen an Interoperabilität beinhaltet, unterstützen wir Sie dabei, diese optimal umzusetzen. In diesem Fall wird das Digitalcheck-Team automatisch über das Ergebnis informiert, sobald Sie es per E-Mail absenden. Wir setzen uns dann mit Ihnen in Verbindung, um gemeinsam die weiteren Schritte zu planen und umzusetzen. Sollten Sie vorab Fragen haben, können Sie sich jederzeit direkt an uns wenden - telefonisch unter [0151/40 76 78 39](tel:+4915140767839) oder per E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de).
        `,
      },
      {
        plausibleEventName: "Content.FAQs.FAQ4",
        headline: "Was ist Digitalbezug?",
        content: `Digitalbezug im Kontext der Umsetzung bedeutet, dass ein Prozess zumindest teilweise durch ein IT-System abgebildet wird. Beispiele sind:
- eine Reihe von Aufgaben mit einem bestimmten Ziel, zum Beispiel das Ausfüllen eines Formulars in ELSTER, um die Steuererklärung einzureichen,
- die Abfrage von Daten aus einem Register oder
- das Bereitstellen von Informationen auf einer Website.`,
      },
      {
        plausibleEventName: "Content.FAQs.FAQ5",
        headline: "Warum digitaltaugliche Regelungen schreiben?",
        content: dedent`
          **Digitaltaugliche Regelungen sparen Ressourcen**<br/>
          Eine gute digitale Umsetzung spart langfristig Zeit und sorgt dafür, dass Ziel und Wirkung des Vorhabens erreicht werden - aufseiten der Normadressatinnen und Normadressaten und aufseiten der Verwaltung.
          <br/><br/>
          **Relevant für all Regelungsvorhaben**<br/>
          Der Digitalcheck gilt für alle Regelungsvorhaben - Gesetze, Verordnungen und Verwaltungsvorschriften. Es fallen sowohl neue Vorhaben, als auch Änderungen an bestehenden Regelungen darunter.
        `,
      },
      {
        plausibleEventName: "Content.FAQs.FAQ6",
        headline: "Was ist, wenn ich mehrere Regelungen habe?",
        content:
          "Füllen Sie eine gemeinsame Vorprüfung für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus. So viele wie nötig, so wenige wie möglich.",
      },
      {
        plausibleEventName: "Content.FAQs.FAQ7",
        headline: "Kann ich das PDF für die Vorprüfung weiterhin verwenden?",
        content:
          "Sie können weiterhin das PDF-Dokument zur Vorprüfung verwenden, um den digitalen Aspekt Ihres Vorhabens zu bewerten. Bitte beachten Sie jedoch, dass die PDF-Version nicht geeignet ist, um Anforderungen zur Interoperabilität zu identifizieren.",
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
  nav: {
    ariaLabel: "Alle Fragen",
  },
  srHint: {
    before: "Frage ",
    between: " von ",
  },
  questions: [
    {
      ...preCheckQuestions.itSystem,
      question:
        "Muss durch die Regelung ein IT-System angepasst oder neu entwickelt werden?",
      positiveResult: "einer Anpassung oder Neuentwicklung einer IT-Lösung.",
      negativeResult: "keiner Anpassung oder Neuentwicklung einer IT-Lösung.",
      text: "**Praxisbeispiel**: Eine Regelung schreibt vor, dass eine Datenbank potentielle Schadstoffe in Lebensmitteln erfasst. Nun kommen neue Inhaltsstoffe dazu. Oder pro Inhaltsstoff müssen weitere Daten zur langfristigen Schädlichkeit erfasst werden. Dafür muss die Datenbank (das IT-System) angepasst werden.",
      hint: {
        title: "Was ist ein IT-System?",
        text: dedent`
          IT-Systeme sind technische Lösungen, die aus Hardware (wie Computer, Kartenlesegeräte, Router) oder Software (Programme wie ELSTER und Word, Websiten, Apps) bestehen, um Informationen zu speichern, zu verarbeiten und zu übertragen. 
          <br />
          Mit ihnen können Aufgaben ausgeführt werden, wie das Übermitteln der Einkommenssteuererklärung mit ELSTER.
        `,
      },
    },
    {
      ...preCheckQuestions.verpflichtungenFuerBeteiligte,
      question:
        "Entstehen durch die Regelung Mitwirkungspflichten für Akteur:innen?",
      positiveResult: "einer Festlegung von Mitwirkungspflichten für Akteure.",
      negativeResult: "keiner Festlegung von Mitwirkungspflichten für Akteure.",
      text: "**Praxisbeispiel**: Für eine staatliche Förderung ist neben der Land- und Forstwirtschaft nun auch das produzierende Gewerbe berechtigt. Der Anspruch dieser Unternehmen kann nicht nach denselben Kriterien geprüft werden. Die Vorhalte-/Nachweispflichten müssen auf diese Gruppe angepasst werden, dabei müssen die für die Beteiligten üblichen digitalen Möglichkeiten mitgedacht, bzw. geschaffen werden.",
      hint: {
        title: "Wer sind Akteur:innen?",
        text: dedent`
          Akteur:innen sind in diesem Zusammenhang all diejenigen, die an der Umsetzung des Regelungsvorhabens beteiligt sind. Das können sowohl Vollzugsakteur:innen als auch Betroffene sein.
          
          Beispiele für Akteur:innen sind:
          - Bürger:innen, 
          - Einwohnende, 
          - Kommunen, Verwaltungen und Behörden, deren IT- oder Rechtsabteilungen
          - IT-Dienstleistende,
          - Unternehmen und 
          - weitere Organisationen wie z.B. Vereine.
        `,
      },
    },
    {
      ...preCheckQuestions.datenaustausch,
      question:
        "Werden durch die Regelung Daten erhoben, die der Verwaltung möglicherweise bereits vorliegen?",
      positiveResult: "einem Austausch von Daten.",
      negativeResult: "keinem Austausch von Daten.",
      text: "**Praxisbeispiel**: Arbeitnehmende müssen ihr Gehalt in der Einkommenssteuererklärung angeben. Diese Information liegt der Sozialversicherung bereits vor. Eine Wiederverwendung dieser Daten ist bürokratiearm und sollte bei der Erarbeitung der Regelung angestrebt werden.",
      hint: {
        title: "Was ist mit „Daten erheben“ gemeint?",
        text: "Einige Informationen liegen in der Verwaltung bereits vor: Dies können Daten von Bürger:innen, Unternehmen und Organisationen bspw. Vereinen sein. Im besten Fall werden diese Daten automatisiert zwischen den Behörden ausgetauscht.",
      },
    },
    {
      ...preCheckQuestions.kommunikation,
      question:
        "Führt die Regelung zu einer Interaktion zwischen Behörden und Bürger:innen / Unternehmen?",
      positiveResult:
        "einer Interaktion zwischen Behörden und Bürger:innen/Unternehmen.",
      negativeResult:
        "keiner Interaktion zwischen Behörden und Bürger:innen/Unternehmen.",
      text: "**Praxisbeispiel**: Ein Antrag für Steuerentlastung muss gestellt und abgeschickt werden — dies kann digital, ohne händische Unterschrift oder analoge Nachweise geschehen. Es können z.B. Unternehmen, Bürger:innen oder Organisationen den Antrag einreichen.",
    },
    {
      ...preCheckQuestions.automatisierung,
      question:
        "Kann die Umsetzung der Regelung verbessert werden, indem man Schritte automatisiert?",
      positiveResult:
        "einer Verbesserung der Umsetzung der Regelung durch die Automatisierung von Schritten.",
      negativeResult:
        "keiner Verbesserung der Umsetzung der Regelung durch die Automatisierung von Schritten.",
      text: "**Praxisbeispiel**: Durch die automatisierte Auszahlung der Energiepreispauschale entfällt sowohl das Errechnen eines Leistungsanspruchs als auch die manuelle Antragstellung durch Leistungsberechtigte.",
    },
    {
      ...preCheckQuestions.euBezug,
      question:
        "Ist durch die Regelung vorgesehen, dass Daten und Informationen zwischen Verwaltungen von EU-Mitgliedsstaaten ausgetauscht werden?",
      positiveResult:
        "einem Daten- und Informationsaustausch zwischen EU-Mitgliedsstaaten.",
      negativeResult:
        "keinem Daten- und Informationsaustausch zwischen EU-Mitgliedsstaaten.",
      resultHint: {
        positiveResult:
          "**Bitte beachten Sie:** Wenn Ihr Vorhaben keinen Digitalbezug aufweist, können die Anforderungen der Interoperabilität nicht erfüllt werden – selbst dann nicht, wenn ein Daten- und Informationsaustausch zwischen EU-Mitgliedsstaaten stattfindet.",
        unsureResult:
          "**Das können Sie tun:** Kontaktieren Sie uns unter [0151/40 76 78 39](tel:+4915140767839) oder  per E-Mail an [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de). Wir unterstützen Sie gerne bei der Beantwortung dieser Frage.",
      },
      text: "**Praxisbeispiel**: Ein Vorhaben sieht vor, dass Bürger:innen in der EU eine digitale Identitäts-Wallet nutzen können, die von ihrem Heimatstaat ausgestellt wird. Diese Wallet erlaubt es, Identitätsnachweise und Dokumente (z. B. Führerscheine, Berufsqualifikationen) grenzüberschreitend zu verwenden. Damit andere Mitgliedstaaten diese Nachweise anerkennen können, ist ein Austausch von Daten und harmonisierten Standards erforderlich, um deren Echtheit zu überprüfen.",
      hint: {
        title: "Wen betrifft dieser Daten- und Informationsaustausch?",
        text: dedent`
          Daten und Informationen können zwischen den digitalen öffentlichen Diensten in der EU ausgetauscht werden:
          <br />
          - Zwischen Verwaltungen von EU-Mitgliedstaaten, um gemeinsame Aufgaben oder Dienste zu erfüllen.
          - Zwischen EU-Institutionen, etwa bei der Zusammenarbeit zur Umsetzung von EU-Programmen oder Richtlinien.
          - Zwischen EU-Institutionen und nationalen Verwaltungen, z. B. bei der Übermittlung von Informationen oder der Koordination von Maßnahmen auf europäischer Ebene.
        `,
      },
      interoperability: true,
    },
  ].map((question, index, questions) => ({
    // generate list from the questions such that each list has a path, a previous link and a next link
    ...question,
    url: `${ROUTE_PRECHECK.url}/${question.id}`,
    prevLink:
      index === 0
        ? ROUTE_PRECHECK_INFO.url
        : `${ROUTE_PRECHECK.url}/${questions[index - 1].id}`,
    nextLink:
      index === questions.length - 1
        ? ROUTE_PRECHECK_RESULT.url
        : `${ROUTE_PRECHECK.url}/${questions[index + 1].id}`,
  })) as TQuestion[],
};
