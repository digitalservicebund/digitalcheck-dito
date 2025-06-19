import { Apps, Layers } from "@digitalservicebund/icons";
import { feedbackFormular } from "~/resources/content/shared/feedback-formular";
import { ROUTE_INTEROPERABILITY_SPOC } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const interoperability = {
  headline:
    "EU-Vorgaben zur Interoperabilität: Alles Wichtige für Ihre Regelung im Überblick",
  content:
    "Hier finden Sie kompakt die wichtigsten Informationen zur [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) im Zusammenhang mit dem Digitalcheck.",
  andDigitalReadiness: {
    id: "digitaltauglich",
    headline: "Interoperabilität und Digitaltauglichkeit",
    content: dedent`
        Die EU-Anforderungen an Interoperabilität fördern die Zusammenarbeit und den sicheren Datenaustausch zwischen Verwaltungen und öffentlichen Einrichtungen in Europa. **Jedes Vorhaben, das diese Anforderungen erfüllen muss, hat automatisch Digitalbezug.** Da sich viele Anforderungen der Interoperabilität mit denen der Digitaltauglichkeit überschneiden, wird in Deutschland der bestehenden Digitalcheck um Aspekte der Interoperabilität erweitert.
        <br/><br/>
        Mit Hilfe der **Vorprüfung** können Sie feststellen, ob Ihre Regelung die Anforderungen an Interoperabilität erfüllt.
    `,
    button: "Zur Vorprüfung",
    image: {
      url: "/images/zusammenhang-interoperabilitaet-und-digitaltauglichkeit.png",
      alternativeText: `Interoperabilität wird als großer Kreis dargestellt, der einen kleineren Kreis mit digitaltauglichen Regelungen umschließt. Dies zeigt, dass digitaltaugliche Regelungen ein Teil der Interoperabilität sind.`,
    },
  },
  faq: {
    id: "faq",
    tabName: "Häufige Fragen",
    headline: "Häufig gestellte Fragen",
    content:
      "In diesem Bereich erhalten Sie umfassende Informationen zur Einführung der EU-Vorgaben zur Interoperabilität sowie zum Prozess der Erarbeitung von Interoperabilität in Regelungen. Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns unter: [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder unter [0151/40 76 78 39](tel:+4915140767839).",
    items: [
      {
        headline: "Was sind „transeuropäische digitale öffentliche Dienste“?",
        content: dedent`
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
        content: dedent`
          Interoperabilität und Digitaltauglichkeit sind eng miteinander verwoben. Wenn ein Vorhaben die EU-Anforderungen für Interoperabilität erfüllen muss, hat es automatisch auch einen Digitalbezug. Da sich viele Anforderungen der Interoperabilität mit denen der Digitaltauglichkeit überschneiden, wird in Deutschland der bestehende Digitalcheck um Aspekte der Interoperabilität erweitert.
          
          Bereits heute legen Sie beim Erarbeiten von digitaltauglichen Regelungen die Grundlage für Interoperabilität. Durch das Befolgen der Digitalcheck-Prinzipien tun Sie dies auf technischer und semantischer Ebene, durch die Arbeit mit Visualisierungen auf prozessualer Ebene. Damit erfüllen Sie Anforderungen, die sich auch aus der EU-Verordnung ergeben.
          
          Ob sich für Ihre Regelung Anforderungen aus der EU-Verordnung ergeben, erfahren Sie durch die um Interoperabilität erweiterte [Digitalcheck Vorprüfung](/vorpruefung). Falls sich eine Berichtspflicht an die Europäische Kommission ergibt, unterstützt Sie das Digitalcheck Team dabei, eine Interoperabilitätsbewertung durchzuführen, zu dokumentieren und den Bericht einzureichen.
        `,
      },
      {
        headline:
          "Was bedeutet grenzüberschreitende Interoperabilität und was ist dafür erforderlich?",
        content: dedent`
          Im EU-Kontext bedeutet grenzüberschreitende Interoperabilität, dass öffentliche Stellen der Mitgliedstaaten und der Union digital zusammenarbeiten können. Die Grundlage dafür ist, dass Daten, Informationen und Wissen digital ausgetauscht werden.
          
          Im Ergebnis bedeutet ein hoher Grad an Interoperabilität, dass digitale öffentliche Dienste über Länder- und Sektorgrenzen funktionieren - Bürger:innen und Unternehmen haben eine bessere Nutzendenerfahrung und sparen Zeit und Kosten.
          
          Digitaltaugliche Gesetze, die Interoperabilität unterstützen, legen hierfür die Grundlage. Für Ihre Arbeit an Vorhaben sollte Interoperabilität in unterschiedlichen Dimensionen bewertet werden. Das European Interoperability Framework (EIF) definiert dafür vier Ebenen:
          
          **Rechtliche** Interoperabilität legt die gesetzlichen Grundlagen für den Datenaustausch.
          <br/>**Organisatorische** Interoperabilität beschreibt die für den Datenaustausch notwendigen Geschäftsprozesse.
          <br/>**Semantische** Interoperabilität stellt sicher, dass Daten und Begriffe gleich verstanden werden.
          <br/>**Technische** Interoperabilität beschreibt die erforderlichen technischen Systeme und Standards, die für den Datenaustausch notwendig sind.
          
          ![Die Grafik veranschaulicht die vier Ebenen der Interoperabilität mit Symbolen und kurzen Erklärungen. Die rechtliche Interoperabilität (dunkelblau, Waage-Icon) definiert die gesetzlichen Grundlagen für den Datenaustausch. Die organisatorische Interoperabilität (hellblau, vernetzte Personen) beschreibt die organisatorischen Prozesse. Die semantische Interoperabilität (graublau, Sprechblasen) stellt sicher, dass Daten und Begriffe einheitlich verstanden werden. Die technische Interoperabilität (hellgrau, Zahnräder) umfasst die technischen Systeme und Standards, die für den Datenaustausch erforderlich sind.](/images/ebenen-der-interoperabilitaet.jpg)
          
          Quellen: 
          <br/>[EUR-Lex - Verordnung für ein interoperables Europa EU 2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
          <br/>[European Commission - European Interoperability Framework](https://ec.europa.eu/isa2/eif_en/)
          <br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)
        `,
      },
      {
        headline:
          "Was ist der europäische Interoperabilitätsrahmen (European Interoperability Framework EIF) und was beinhaltet er?",
        content: dedent`
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
        content: dedent`
          Wenn Sie eine Interoperabilitätsbewertung durchführen, stehen Ihnen Unterstützungsmaßnahmen zur Verfügung.
          
          Die [Verordnung für ein interoperables Europa](https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32024R0903) sieht in den Mitgliedstaaten nationale Kontaktstellen vor. Für Deutschland hat das Bundesministerium des Innern und für Heimat das Team vom Digitalcheck mit der Ausführung beauftragt. 
          
          Wir unterstützen Sie derzeit individuell bei der Durchführung einer Interoperabilitätsbewertung für eine interoperable Regelung und bei der Erstellung eines entsprechenden Berichts. Kontaktieren Sie uns jederzeit gerne mit Ihren Anliegen - je früher, desto besser.  Schreiben Sie uns über [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:+4915140767839).
          
          Weitergehende Informationen können Sie hier abrufen:
          
          - Die Mindestanforderungen für die inhaltliche Ausgestaltung des Berichts der Interoperabilitätsbewertung finden Sie im [Anhang der Verordnung](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
          - Detaillierte Leitlinien für die Inhalte der von Interoperabilitätsbewertungen sind in den “[Leitlinien für Interoperabilitätsbewertungen](https://interoperable-europe.ec.europa.eu/sites/default/files/custom-page/attachment/2025-05/DIGIT-2024-00047-00-00-DE-TRA-00.pdf)” aufgeführt
          - [Das Interoperable Europe Framework EIF](https://ec.europa.eu/isa2/sites/default/files/eif_brochure_final.pdf) ist ein Leitfaden für die Umsetzung digitaler öffentlicher Dienste
          - Eine Interoperabilitätsbewertung wird in einem maschinenlesbaren Bericht dokumentiert und veröffentlicht - hierfür stellt der Beirat für ein interoperables Europa ein [Online-Tool zur Verfügung](https://interoperable-europe.ec.europa.eu/collection/assessments) (Registrierung erforderlich)
        `,
      },
      {
        headline:
          "Wie ist der Prozess des Erarbeitens einer Interoperabilitätsbewertung?",
        content: dedent`
          Die Verordnung für ein interoperables Europa empfiehlt, für Interoperabilitätsbewertungen auf bestehenden Verfahren in den Mitgliedstaaten aufzubauen. Für Deutschland hat das Bundesministerium des Innern und für Heimat das Team Digitalcheck mit der Koordinierung entsprechender Maßnahmen beauftragt.
          
          Der Prozess der Ausarbeitung einer Interoperabilitätsbewertung und des Berichts hat Schnittmengen mit dem Prozess des Erarbeitens von digitaltauglichen Regelungen. Zum Beispiel greifen die fünf Prinzipien der Digitaltauglichkeit und die vier Ebenen der Interoperabilität ineinander und auch die Arbeit mit Visualisierungen wird in den Leitlinien empfohlen.
          
          Mit Ihnen zusammen wollen wir den Prozess der Ausarbeitung von Interoperabilitätsbewertungen aufwandsarm und anwendungsfreundlich gestalten. Um mit Ihnen zu lernen, unterstützen wir Sie deshalb bei Interoperabilitätsbewertungen und der Berichterstellung individuell. 
          
          Kontaktieren Sie uns jederzeit gerne mit Ihren Anliegen - je früher, desto besser. Schreiben Sie uns über [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de) oder rufen Sie uns an unter [0151/40 76 78 39](tel:+4915140767839).
        `,
      },
      {
        headline: "Was ist das Ergebnis einer Interoperabilitätsbewertung?",
        content: dedent`
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
        content: dedent`
          - [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
          - [Ressourcen auf dem Interoperable Europe Portal](https://interoperable-europe.ec.europa.eu/): Hier finden sich zusätzliche Informationen, Best Practices und Tools zur Unterstützung bei der Durchführung von Interoperabilitätsbewertungen.
        `,
      },
      {
        title: "Interoperabilitätsbewertungen",
        icon: Layers,
        subtitle:
          "Hier finden Sie die wichtigsten Informationen zu Interoperabilitätsbewertungen.",
        content: dedent`
          - [Interoperabilitätsrahmen](https://interoperable-europe.ec.europa.eu/collection/nifo-national-interoperability-framework-observatory/solution/european-interoperability-framework-eif-toolbox): Rahmenwerk mit Prinzipien zur Erarbeitung von interoperablen Regelungen
          - [Leitlinien für Interoperabilitätsbewertungen](https://interoperable-europe.ec.europa.eu/sites/default/files/custom-page/attachment/2025-05/DIGIT-2024-00047-00-00-DE-TRA-00.pdf): Anleitung zur Bewertung der Interoperabilität in Regelungen
        `,
      },
    ],
  },
  andYourVorhaben: {
    id: "prozess",
    tabName: "Zusammengefasst",
    headline: "Wie beeinflusst Interoperabilität Ihr Vorhaben?",
    content: dedent`
      Die Erarbeitung der Interoperabilität folgt einem ähnlichen Ablauf wie die Erarbeitung der Digitaltauglichkeit. In wenigen Schritten wird sichergestellt, dass Ihr Regelungsvorhaben die erforderlichen Anforderungen erfüllen:
      
      1. **Vorprüfung starten**
          - In der geführten Vorprüfung ermitteln Sie, ob Ihr Regelungsvorhaben einen Digitalbezug hat und ob Interoperabilitätsanforderungen auf EU-Ebene berücksichtigt werden müssen.
      2. **Ergebnis übermitteln**
          - Das Prüfergebnis wird per E-Mail an den Normenkontrollrat gesendet.
          - Falls Interoperabilitätsanforderungen bestehen, schicken Sie die Mail außerdem an das Digitalcheck-Team. Dieses unterstützt Sie bei den weiteren Schritten.
      3. **Erarbeitung der Regelung**
          - Bei Digitalbezug: Eine Schritt-für-Schritt-Anleitung mit Vorlagen und Praxisbeispielen unterstützt die Erarbeitung der Regelung. 
          - Bei Digitalbezug und Interoperabilität: Das Digitalcheck-Team begleitet Sie im Prozess und unterstützt Sie bei der Interoperabilitätsbewertung.
      4. **Dokumentation & Veröffentlichung**
          - Die Dokumentation der Ergebnisse wird an den Normenkontrollrat gesendet und zusätzlich auf dem Interoperable Europe Portal veröffentlicht.
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
    tabName: "Informationen zum Einstieg",
    headline: "Informationen zum Einstieg",
    items: [
      {
        headline: {
          text: "Was ist das Ziel der Verordnung für ein interoperables Europa?",
        },
        content:
          "Das Ziel der [Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903) ist es, digitale öffentliche Dienste zu verbessern. Die Dienste einzelner Mitgliedstaaten sollen miteinander kompatibel sein. Dafür braucht es gemeinsame Standards, um Daten zwischen den Mitgliedstaaten auszutauschen. Um digitale Potentiale und Hindernisse zu berücksichtigen, müssen öffentliche Stellen die Interoperabilität neuer Dienste berücksichtigen.",
        detailsSummary: {
          items: [
            {
              title: "Welche positiven Effekte sollen dadurch erreicht werden?",
              content: dedent`
                Die Vorschriften erleichtern den Datenaustausch und die Wiederverwendung von Lösungen, indem sie bürokratische Hürden abbauen. Dies spart Kosten und Zeit für Bürgerinnen und Bürger, Unternehmen und Verwaltungen.
                <br/><br/>
                Bis 2030 soll eine verbesserte Interoperabilität öffentliche Verwaltungen enger vernetzen und transeuropäische digitale Dienste fördern.
                Wenn für Ihr Vorhaben eine Verpflichtung dazu besteht, Interoperabilität sicherzustellen, begleiten wir Sie durch den Prozess der Bewertung, Dokumentation und der Berichterstellung.
                <br/><br/>
                Quellen:
                <br/>[EUR Lex - Verordnung für ein interoperables Europa (EU 2024/903)](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
                <br/>[Interoperable Europe Portal - FAQs](https://interoperable-europe.ec.europa.eu/interoperable-europe/faqs)
          `,
            },
          ],
        },
      },
      {
        headline: {
          text: "Was sind Interoperabilitätsbewertungen und warum sind sie notwendig?",
        },
        content: dedent`
          Wenn Sie eine Interoperabilitätsbewertung durchführen und den Bericht veröffentlichen, unterstützen Sie damit ein interoperables Europa: 
          - Die Nutzung grenzüberschreitender Daten wird ermöglicht.
          - Die Qualität und Zugänglichkeit digitaler öffentlicher Dienste wird verbessert.
          
          Durch den Prozess der Interoperabilitätsbewertung ermitteln Sie Potenziale und Hindernisse für grenzüberschreitende Zusammenarbeit. Damit legen Sie die Grundlage für Regelungen, die Interoperabilität ermöglichen. Eine Vorgehensweise ganz ähnlich, wie sie es von der Arbeit an digitaltauglichen Regelungen kennen.
        `,
        items: [
          {
            title: "Wie läuft eine Interoperabilitätsbewertung ab?",
            content: dedent`
              Als Bestandteil der Bewertung identifizieren Sie bestehende Lösungen. Lassen sich diese wiederverwenden, werden Kosten und Aufwand in der Umsetzung reduziert.
              Die [Verordnung für ein interoperables Europa]((https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)) definiert im Anhang Mindestanforderungen für die Durchführung einer Interoperabilitätsbewertung, die Details sind in den [Leitlinien für Interoperabilitätsbewertungen](https://interoperable-europe.ec.europa.eu/sites/default/files/custom-page/attachment/2025-05/DIGIT-2024-00047-00-00-DE-TRA-00.pdf) beschrieben.
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
        ],
      },
      {
        headline: {
          text: "Verbindliche Anforderungen: In welchem Fall ist eine Interoperabilitätsbewertung verpflichtend?",
        },
        content: dedent`
          Eine Interoperabilitätsbewertung wird für Regelungen durchgeführt, die sich mit verbindlichen Anforderungen befassen.
          <br/><br/>
          Eine verbindliche Anforderung im Sinne der Verordnung ist eine verpflichtende Regel. Das kann z.B. eine Definition, ein Standard, eine Richtlinie, ein Verbot oder eine Beschränkung sein. Eine exakte Definition finden Sie in der [Verordnung in der Präambel, Erwägungsgrund 18](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903).`,
        items: [
          {
            title: "Welche Kriterien müssen dafür erfüllt sein?",
            content: dedent`
              Die Interoperabilitätsbewertung ist für diese verbindliche Anforderung verpflichtend, wenn die folgenden Kriterien aus den [Leitlinien für Interoperabilitätsbewertungen](https://interoperable-europe.ec.europa.eu/sites/default/files/custom-page/attachment/2025-05/DIGIT-2024-00047-00-00-DE-TRA-00.pdf) erfüllt sind:
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
        ],
      },
    ],
    image: {
      url: "/images/kriterien-interoperabilitaetsbewertung-entscheidungsbaum.png",
      alternativeText:
        "Ein Entscheidungsdiagramm zur Bestimmung der Verpflichtung zur Interoperabilitätsbewertung. Es beginnt mit der Frage, ob es sich um eine verbindliche Anforderung handelt. Je nach Antwort folgen verschiedene Entscheidungsstufen: Offenheit für Änderungen, Verpflichtung, digitale öffentliche Dienstleistungen, betroffene Akteure und Notwendigkeit des Austauschs in Netzwerken oder Informationssystemen. Wenn alle Bedingungen erfüllt sind, führt der Prozess zur verpflichtenden Interoperabilitätsbewertung. Andernfalls ist sie nicht verpflichtend.",
    },
  },
  kontaktstelle: {
    id: "kontaktstelle",
    title:
      "Informieren Sie sich weiter zu den EU-Anforderungen an Interoperabilität ",
    text: "Mehr zum Thema Governance, Kooperation und Nutzung unserer Inhalte finden Sie unter der Nationalen Kontaktstelle für ein interoperables Europa.",
    buttons: [
      {
        text: "Zur Nationalen Kontaktstelle",
        href: ROUTE_INTEROPERABILITY_SPOC.url,
        look: "tertiary" as const,
      },
    ],
  },
  feedbackForm: {
    heading: feedbackFormular.heading,
    trackingEvent: "Feedback Interoperabel Landing Page",
    questions: [
      {
        id: "useful-feedback",
        trackingEvent: "wie-hilfreich", // muss mit dem custom property in Plausible übereinstimmen
        text: "Wie hilfreich waren die Informationen auf der Seite für Sie?",
        options: feedbackFormular.optionsUseful,
      },
    ],
    contact:
      "Schreiben Sie uns eine E-Mail an [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Feedback:%20erarbeiten.digitalcheck.bund.de), wenn wir Sie für Feedback zu unserem Service kontaktieren dürfen.",
    button: feedbackFormular.button,
    success: feedbackFormular.success,
  },
};
