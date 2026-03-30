import { Apps, Layers } from "@digitalservicebund/icons";
import { ROUTE_FUNDAMENTALS_DIGITAL_READINESS } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";
import { getTabAnchorLink } from "~/utils/tabs";
import { contact } from "./shared/contact";

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
      url: "/images/zusammenhang-interoperabilitaet-und-digitaltauglichkeit.png",
      alternativeText:
        "Interoperabilität wird als großer Kreis dargestellt, der einen kleineren Kreis mit digitaltauglichen Regelungen umschließt. Dies zeigt, dass digitaltaugliche Regelungen ein Teil der Interoperabilität sind.",
    },
  },
  faq: {
    id: "faq",
    tabName: "Häufige Fragen",
    headline: "Häufig gestellte Fragen",
    content: `In diesem Bereich erhalten Sie umfassende Informationen zur Einführung der EU-Vorgaben zur Interoperabilität sowie zum Prozess der Erarbeitung von Interoperabilität in Regelungen. Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns unter: ${contact.mdMailToLink(contact.interoperabilityEmail, "Supportanfrage: digitalcheck.bund.de")} oder unter ${contact.mdPhoneLink()}.`,
    items: [
      {
        headline: "Was bedeutet grenzüberschreitende Interoperabilität?",
        content: dedent`
          Im EU-Kontext bedeutet grenzüberschreitende Interoperabilität, dass öffentliche Stellen der Mitgliedstaaten und der Union digital zusammenarbeiten können. Die Grundlage dafür ist, dass Daten, Informationen und Wissen digital ausgetauscht werden.
          
          Im Ergebnis bedeutet ein hoher Grad an Interoperabilität, dass digitale öffentliche Dienste über Länder- und Sektorgrenzen funktionieren - Bürgerinnen und Bürger sowie Unternehmen haben eine bessere Nutzendenerfahrung und sparen Zeit und Kosten.
          
          Die Grundlage bilden hierfür [digitaltaugliche Gesetze](${ROUTE_FUNDAMENTALS_DIGITAL_READINESS.url}), die Interoperabilität unterstützen. Für Ihre Arbeit an Vorhaben sollte Interoperabilität in unterschiedlichen Dimensionen bewertet werden. Diese Dimensionen werden im European Interoperability Framework (EIF) definiert.
        `,
      },
      {
        headline: "Wann besteht Interoperabilitäts-Bezug?",
        content: dedent`
          Interoperabilitäts-Bezug ist vorhanden, wenn:

          - eine (neue) [verbindliche Anforderung](${getTabAnchorLink("hintergrund", "verbindliche-anforderungen")}) definiert wird,
          - ein oder mehrere transeuropäische digitale öffentliche Dienste betroffen sind, das heißt
            - eine digitale Umsetzung vorgesehen oder davon betroffen ist
            - ein Austausch von Daten und Informationen zwischen Verwaltungen der EU-Mitgliedstaaten vorgesehen ist
            - die Anforderung von einer öffentlichen Stelle oder einer Einrichtung der Union festgelegt werden.
        `,
      },
      {
        headline: "Was sind „transeuropäische digitale öffentliche Dienste“?",
        content: dedent`
          Transeuropäische digitale öffentliche Dienste sind
          - digitale Dienstleistungen
          - die von öffentlichen Verwaltungen 
          - in verschiedenen europäischen Ländern angeboten 
          - und grenzüberschreitend genutzt werden können.

          Das Hauptziel dieser Dienste ist, es Bürgerinnen und Bürgern, sowie Unternehmen in der EU einfacher zu machen, mit Behörden in anderen Mitgliedsstaaten zu interagieren. Die Dienste sollen die Zusammenarbeit zwischen den nationalen Verwaltungen erleichtern.

          Ereignisse, die für Bürgerinnen und Bürger, sowie Unternehmen in diesem Kontext relevant sind:Geburt, Wohnsitz, Studium, Arbeit, Umzug, Ruhestand, Gründung, Führung und Schließung eines Unternehmens
          _(Nach Single Digital Gateway Verordnung, [Anhang II](https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32018R1724#anx_II))_

          https://eur-lex.europa.eu/eli/reg/2018/1724/oj/eng
        `,
      },
      {
        headline:
          "Ich setze eine EU-Verordnung oder -Richtlinie um, muss ich auch eine Bewertung einreichen?",
        content: dedent`
          Aktuell ist es auch erforderlich, eine Interoperabilitäts-Bewertung einzureichen, wenn Sie eine EU-Verordnung oder EU-Richtlinie umsetzen.
          In dem Fall ist die Bewertung in aller Regel zügig erstellt. Schauen Sie insbesondere auf Anforderungen, die in der Deutschen Umsetzung über die in der EU-Verordnung oder -Richtlinie definierten Inhalte hinausgehen.
        `,
      },
      {
        headline:
          "Wie hängen digitaltaugliche Regelungen und Interoperabilität zusammen?",
        content: dedent`
          Interoperabilität und Digitaltauglichkeit sind eng miteinander verwoben. Wenn ein Vorhaben die EU-Anforderungen für Interoperabilität erfüllen muss, hat es automatisch auch einen Digitalbezug. Da sich viele Anforderungen der Interoperabilität mit denen der Digitaltauglichkeit überschneiden, wird in Deutschland der bestehende Digitalcheck um Aspekte der Interoperabilität erweitert.
          
          Bereits heute legen Sie beim Erarbeiten von digitaltauglichen Regelungen die Grundlage für Interoperabilität. Durch das Befolgen der Digitalcheck-Prinzipien tun Sie dies auf technischer und semantischer Ebene, durch die Arbeit mit Visualisierungen auf prozessualer Ebene. Damit erfüllen Sie Anforderungen, die sich auch aus der EU-Verordnung ergeben.
          
          Ob sich für Ihre Regelung Anforderungen aus der EU-Verordnung ergeben, erfahren Sie durch die um Interoperabilität erweiterte [Digitalcheck-Vorprüfung](/vorpruefung). Falls sich eine Berichtspflicht an die Europäische Kommission ergibt, unterstützt Sie das Digitalcheck-Team dabei, eine Interoperabilitätsbewertung durchzuführen, zu dokumentieren und den Bericht einzureichen.
        `,
      },
      {
        headline:
          "Was ist der europäische Interoperabilitätsrahmen (European Interoperability Framework EIF) und was beinhaltet er?",
        content: dedent`
          Der **Europäische Interoperabilitätsrahmen (EIF)** hilft europäischen öffentlichen Verwaltungen, ihre digitalen Dienste so zu gestalten, dass sie über Ländergrenzen und verschiedene Sektoren hinweg nahtlos zusammenarbeiten. Der EIF eine Art Handbuch, das sicherstellt, dass die digitalen Systeme von Behörden in Deutschland, Frankreich, Polen und anderen EU-Ländern „miteinander sprechen“ können.

          Der [Europäische Interoperabilitäts-Rahmen (EIF)](https://interoperable-europe.ec.europa.eu/collection/iopeu-monitoring/european-interoperability-framework-detail) definiert vier Ebenen der Interoperabilität, die bei der Gesetzgebung berücksichtigt werden müssen. Mehr dazu [hier](${getTabAnchorLink("hintergrund", "vier-ebenen-der-interoperabilitaet")}).
        `,
      },
      {
        headline: "Was kommt bei der Interoperabilitäts-Bewertung auf mich zu?",
        content: dedent`
          Die [Interoperabilitäts-Bewertung](https://interoperable-europe.ec.europa.eu/collection/assessments/submission) ist wie auch die Digitalcheck-Dokumentation ein formeller, letzter Schritt, in dem Sie einige Fragen zu Inhalten der Regelung beantworten. 

          Es geht darum, darzulegen, wie sich Ihre Regelung auf die EU-weite Interoperabilität auswirkt. Der wesentliche Inhalt besteht aus fünf Fragen. Die Bewertung fragt nach sogenannten „[verbindlichen Anforderungen](${getTabAnchorLink("hintergrund", "verbindliche-anforderungen")})“ und prüft deren Einfluss auf die [vier Ebenen der Interoperabilität](${getTabAnchorLink("hintergrund", "vier-ebenen-der-interoperabilitaet")}).

          Wenn Sie weitere Fragen haben, dann kontaktieren Sie uns unter: ${contact.mdMailToLink(contact.interoperabilityEmail)} oder rufen Sie uns an unter ${contact.mdPhoneLink()}.
        `,
      },
      {
        headline: "Was ist das Ergebnis einer Interoperabilitätsbewertung?",
        content: dedent`
          Wie beim Prozess für digitaltaugliche Regelungen ist auch der Prozess für Interoperabilitätstaugliche Regelungen zweiteilig.
          
          Im Rahmen einer Interoperabilitätsbewertung identifizieren Sie Potenziale und Hürden für Interoperabilität. Das Ergebnis dokumentieren Sie in einem Bericht.
          
          Der Bericht wird im EU-Portal hochgeladen und automatisch in maschinenlesbarem Format veröffentlicht. Damit wird Ihr Vorgehen transparent für andere Mitgliedstaaten und Sie tragen dazu bei, dass andere öffentliche Stellen oder Einrichtungen der Union sich in Bezug auf Interoperabilität daran ausrichten können.
        `,
      },
      {
        headline:
          "Welche Art von Unterstützung gibt es für die Durchführung von Interoperabilitätsbewertungen?",
        content: dedent`
          Wenn Sie eine Interoperabilitätsbewertung durchführen, stehen Ihnen Unterstützungsmaßnahmen zur Verfügung.
          
          Die [Verordnung für ein interoperables Europa (EU) 2024/903](https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32024R0903) sieht in den Mitgliedstaaten nationale Kontaktstellen vor. Für Deutschland hat das Bundesministerium für Digitales und Staatsmodernisierung das Team vom Digitalcheck mit der Ausführung beauftragt. 
          
          Wir unterstützen Sie derzeit individuell bei der Durchführung einer Interoperabilitätsbewertung für eine interoperable Regelung und bei der Erstellung eines entsprechenden Berichts. Kontaktieren Sie uns jederzeit gerne mit Ihren Anliegen - je früher, desto besser.  Schreiben Sie uns über ${contact.mdMailToLink(contact.interoperabilityEmail, "Supportanfrage: digitalcheck.bund.de")} oder rufen Sie uns an unter ${contact.mdPhoneLink()}.
          
          Weitergehende Informationen können Sie hier abrufen:
          
          - Die Mindestanforderungen für die inhaltliche Ausgestaltung des Berichts der Interoperabilitätsbewertung finden Sie im [Anhang der Verordnung](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903)
          - Detaillierte Leitlinien für die Inhalte der von Interoperabilitätsbewertungen sind in den “[Leitlinien für Interoperabilitätsbewertungen](https://interoperable-europe.ec.europa.eu/sites/default/files/custom-page/attachment/2025-05/DIGIT-2024-00047-00-00-DE-TRA-00.pdf)” aufgeführt
          - [Das Interoperable Europe Framework EIF](https://ec.europa.eu/isa2/sites/default/files/eif_brochure_final.pdf) ist ein Leitfaden für die Umsetzung digitaler öffentlicher Dienste
          - Eine Interoperabilitätsbewertung wird in einem maschinenlesbaren Bericht dokumentiert und veröffentlicht - hierfür stellt der Beirat für ein interoperables Europa ein [Online-Tool zur Verfügung](https://interoperable-europe.ec.europa.eu/collection/assessments) (Registrierung erforderlich)
        `,
      },
      {
        headline:
          'Was ist eine "Lösung für ein interoperables Europa" und was bringt mir das?',
        content: dedent`
          Eine "Lösung für ein interoperables Europa" (Art. 7 EU 2024/903) ist ein bereits existierender, geprüfter "Standard" für digitale Dienste (wie z. B. der **Standard DCAT-AP**), der offiziell vom Interoperable Europe Board empfohlen wurde.

          Stellen Sie sich diese Lösungen wie **genormte Bauteile** vor. Wenn Sie eine Regelung erarbeiten, die den eu-weiten Austausch von Daten erfordert oder ermöglichen soll, müssen Sie das Rad nicht neu erfinden. Sie nutzen stattdessen eine Lösung, die das EU-Label „Interoperable Europe solution“ trägt.

          - **Beispiel DCAT-AP:** Das ist ein Standard für digitale Metadaten. Dieser Standard wurde entwickelt, um die europaweite Auffindbarkeit und Transparenz von offenen Verwaltungsdaten (Open Data) zu ermöglichen. Er legt fest, wie Informationen über Datensätze (Metadaten) beschrieben werden.

          **Was bringt mir das persönlich im Gesetzgebungsprozss?**

          Wenn Sie eine empfohlene Lösung nutzen, gilt Ihre Pflicht in diesem Punkt als erfüllt. Sie müssen nicht mühsam selbst begründen, warum Ihre IT-Anforderungen europaweit funktionieren – die EU-Empfehlung erledigt das für Sie.

          Da diese Lösungen auf EU-Ebene bereits fachlich und rechtlich geprüft wurden, sinkt das Risiko für Einwände wegen mangelnder EU-Interoperabilität oder Inkompatibilität.

          **Was bringt das für den Vollzug des Gesetzes?**

          Die IT-Umsetzung Ihres Gesetzes wird erheblich günstiger und schneller, da Entwicklungsaufwand für individuelle Schnittstellen entfällt.`,
      },
      {
        headline:
          'Muss ich eine "Lösung für einer interoperables Europa" zwingend vorschreiben?',
        content: dedent`
          Nein. Im Gesetzestext ist keine starre technische Festlegung vorgeschrieben.

          Der Interoperable Europe Act ((EU) 2024/903) strebt jedoch an, dass Rechtssetzung in der Union grenzüberschreitend digitaltauglich ist, bürokratiearm gestaltet ist und für Bürgerinnen einfach funktioniert.

          Um dies zu fördern, wurden für Sie als Legistin zwei Arbeitsschritte eingeführt:

          - **Prüfpflicht:** Sie sind jedoch gesetzlich verpflichtet, empfohlene Lösungen (die Interoperable Europe Solutions) für eine potenzielle Wiederverwendung in Betracht zu ziehen.
          - **Begründungspflicht:** Wenn Sie sich gegen eine markierte „Interoperable Europe Solution“ entscheiden, müssen Sie dies im Rahmen der Interoperabilitätsbewertung begründen.`,
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
