import {
  ROUTE_INTEROPERABILITY,
  ROUTE_LANDING,
  ROUTE_METHODS_FIVE_PRINCIPLES,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const spoc = {
  headline: "Nationale Kontaktstelle für ein interoperables Europa",
  content: dedent`
    Digitale Verwaltung europaweit ohne Grenzen: Die europäische Interoperabilitätsverordnung 
    und der Digitalcheck sind die Grundlage. 
    <br/><br/>
    Sie befinden sich auf der Informationsseite der 
    Deutschen nationalen Kontaktstelle(2024/903 Art. 17). Gemeinsam mit der deutschen Verwaltung setzen wir 
    die EU-Verordnung 2024/903 um – für vernetzte, bürgernahe, digitale und effiziente Verwaltungsleistungen.
  `,
  landscape: {
    id: "landschaft",
    headline: "Nationale Umsetzung der EU Interoperabilitätsverordnung",
    content: dedent`
      Seit Anfang 2025 muss die Verordnung für ein interoperables Europa ([2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903)) in den EU Mitgliedsstaaten verpflichtend umgesetzt werden.
      Damit sind alle öffentlichen Einrichtungen in Europa, also EU-Institutionen, ihre Mitgliedsstaaten und auch deren Bundesländer und Kommunen, verpflichtet Interoperabilitätsbewertungen durchzuführen. 
      <br/><br/>
      Diese Bewertungen sind erforderlich, bevor neue oder geänderte verbindliche Anforderungen beschlossen werden, um einen nahtlosen Datenaustausch zwischen Behörden sicherzustellen und den grenzüberschreitenden Zugang zu digitalen Verwaltungsleistungen in der EU zu ermöglichen.
      <br/><br/>
      In Deutschland bettet sich diese Anforderung in die föderale Zusammenarbeit wie folgt ein:
    `,
    image: {
      url: "/images/prozess-nationale.kontaktstelle.png",
      alternativeText: `Der Prozess beginnt mit einer geführten Vorprüfung auf Digitalbezug und Anforderungen an Interoperabilität. Daraus ergeben sich drei mögliche Ergebnisse mit unterschiedlichen Prozessschritten: Bei dem Ergebnis "kein Digitalbezug" ist der Erarbeitungsprozess abgeschlossen und wird dem Normenkontrollrat zur Prüfung übermittelt. Bei dem Ergebnis "Digitalbezug" wird das Ergebnis per E-Mail an den Normenkontrollrat gesendet, gefolgt von einer Schritt-für-Schritt-Anleitung und der Dokumentation der Erstellung des Digitalbezugs, die abschließend vom Normenkontrollrat geprüft wird. Für das Ergebnis " Digitalbezug & Anforderungen an die Interoperabilität" wird das Ergebnis per E-Mail an den Normenkontrollrat und das Digitalcheck-Team gesendet, gefolgt von einer Schritt-für-Schritt-Anleitung mit Unterstützung durch das Digitalcheck-Team, der Dokumentation der Erstellung des Digitalbezugs und der Bewertung der Interoperabilität. Die Dokumentation wird anschließend auf dem Interoperable Europe Portal zur Verfügung gestellt.`,
    },
    contentAfter: {
      headline: "Rechtliche Grundlage",
      content:
        "Deutschland integriert die Anforderungen des IEA in den Digitalcheck und folgt damit den Empfehlungen der EU. Somit werden Ressourcen effizient genutzt und Doppelstrukturen verhindert. Die nationale Kontaktstelle ist beim Digitalcheck-Team angesiedelt.",
    },
  },
  responsibilities: {
    id: "aufgaben",
    headline: "Aufgaben der nationalen Kontaktstelle (2024/903 Art. 17)",
    content: dedent`
      Das Digitalcheck-Team übernimmt die Rolle der Nationale Kontaktstelle, wie sie in der Verordnung 
      für ein interoperables Europa vorgesehen ist und dient als zentraler Ansprechpartner 
      für die Koordination und Umsetzung von Interoperabilitätsmaßnahmen in Deutschland.
      
      - **Unterstützung bei Interoperabilitätsbewertungen:** 
      
        Bereitstellung einer praxistauglichen Methodik und Beratung für öffentliche Stellen bei der Durchführung von Interoperabilitätsbewertungen
      - **Prozessintegration:** 

        Verknüpfung von Digitalcheck und Interoperabilitätsbewertung zu einem konsistenten, gemeinsamen Verfahren
      - **Zentrale Anlaufstelle für:** 
        - Behörden auf Bundes-, Landes- und kommunaler Ebene
        - Interessierte Akteurinnen und Akteure
        - Nationale Kontaktstellen anderer EU-Mitgliedstaaten
      - **Förderung von Nachnutzung, Kooperation und Zusammenarbeit:**
        - Bereitstellung von guten Beispielen
        - Unterstützung bei der Umsetzung von Interoperabilitätsanforderungen
      - **Bereitstellung von Informationen und Austauschformaten:**
      
        Aufbau von Wissen, Vernetzung und Unterstützung auf nationaler Ebene
    `,
  },
  timeline: {
    id: "verlauf",
    headline: "Was ist der aktuelle Stand der Integration in den Digitalcheck?",
    items: [
      {
        headline: {
          text: "13.03.2024: Verordnung für ein interoperables Europa wird vom europäischen Parlament verabschiedet",
        },
      },
      {
        headline: {
          text: "10.01.2025: Verordnung tritt in Kraft und erste Änderungen sind im Digitalcheck umgesetzt:",
        },
        content: dedent`
          - **Vorprüfung:** Berücksichtigt nun neben dem Digitalbezug auch die europäische Interoperabilität.
          - Das Ergebnis der Vorprüfung wird automatisch per E-Mail versendet:
            - Bei Digitalbezug an den NKR.
            - Bei zusätzlichem Interoperabilitäts-Bezug auch an die nationale Kontaktstelle beim Digitalcheck-Team.
          - Bereitstellung einer [Informationsseite](${ROUTE_INTEROPERABILITY.url}) zum Thema Interoperabilität für Legistinnen und Legisten
        `,
      },
      {
        headline: {
          text: "Aktuell: Konzeption der Zusammenführung vom Erarbeiten-Prozess und Interoperabilitätsbewertung",
        },
        content: dedent`
          **Verzahnung der Prozesse**
          - Zunächst wurden die inhaltlichen Schnittmengen zwischen dem Erarbeitungsprozess für digitaltaugliche Regelungen und dem Interoperabilitäts-Assessment identifiziert und analysiert. Darauf aufbauend wird ein synthetisierter Prozess erstellt. Dieser wird jetzt in den Digitalcheck Kontaktpunkten kontinuierlich umgesetzt.
          
          **Überarbeitung der Prinzipien für digitaltaugliche Regelungen**
          - Basierend auf den Erkenntnissen aus dem Vergleich wurden die bestehenden Prinzipien  der Digitaltauglichkeit überarbeitet. Ziel war es, diese Prinzipien so anzupassen, dass sie sowohl den Anforderungen der Digitaltauglichkeit als auch der Interoperabilität gerecht werden.
        `,
      },
      {
        headline: {
          text: "Nächste Schritte für die Erarbeitung",
        },
        content: dedent`
          **Entwicklung angepasster Prinzipien und Methoden**
          - Derzeit entwickeln wir die [5 Prinzipien für Digitaltaugliche Gesetzgebung](${ROUTE_METHODS_FIVE_PRINCIPLES.url}) weiter. Zunkünftig werden diese die vier Interoperabilitätsebenen noch konkreter Herausstellen. Darauf aufbauend werden wir die Erarbeitungsmethoden anpassen. Ziel ist es, den gesamten Entwicklungsprozess effizienter und zielgerichteter zu gestalten.
        `,
        image: {
          url: "/images/synthese-prozess-digitalcheck-und-interoperabilitaet.png",
          alternativeText:
            "Die Abbildung zeigt ein strukturiertes Vorgehensmodell für den Digitalcheck und die Interoperabilitätsbewertung. Das Vorgehen des Digitalchecks und der Interoperabilitätsbewertung wird in einem neuen Prozess zusammengefasst. Er umfasst drei Hauptbereiche: Zunächst werden Akteure identifiziert, bestehende Prozesse visualisiert und neue Prozesse entwickelt. Danach werden rechtliche Rahmenbedingungen untersucht, digitale Chancen analysiert und Anforderungen definiert. Schließlich erfolgt die Umsetzung, die Nutzung bestehender oder die Entwicklung neuer Lösungen, bevor alles dokumentiert wird. Durch die visuelle Darstellung wird der neue, gebündelte Ansatz im Prozess verdeutlicht.",
        },
      },
    ],
  },
  states: {
    id: "landesebene",
    headline:
      "Den Digitalcheck mit Interoperabilitätsanforderungen auf Landesebene nutzen",
    sections: [
      {
        headline: "Aufwände minimieren durch Nachnutzung oder Kooperation",
        content:
          "Durch die Nachnutzung können Sie initiale und laufende Aufwände für eine Umsetzung der Interoperabilitätsanforderungen minimieren, indem Sie Inhalte, Visualisierungen oder sogar Softwarecode übernehmen. Falls Sie mit Ihrem Land kooperieren wollen, melden Sie sich bei uns, unsere Kontaktdaten finden Sie unten.",
      },
      {
        headline: "Kontinuierliche Weiterentwicklung",
        content:
          "Der Digitalcheck wird laufend iterativ an Bedürfnisse von Legistinnen und Legisten ausgerichtet und an Anforderungen aus der Verordnung für eine interoperables Europa angepasst. Im Rahmen einer Kooperation informieren wir Sie laufend über neue Erkenntnisse, Rahmenbedingungen und geplante Änderungen.",
      },
    ],
  },
  contact: {
    id: "kontakt",
    headline: "Service und Kontakt",
    sections: [
      {
        headline: "Sie brauchen Unterstützung?",
        content: dedent`
          Als nationale Kontaktstelle gemäß Art. 17 der Verordnung (EU) 2024/903 unterstützen wir:
          - Behörden auf Bundes-, Landes- und kommunaler Ebene
          - Interessierte Akteurinnen und Akteure
          - Nationale Kontaktstellen anderer EU-Mitgliedstaaten
        `,
      },
      {
        headline:
          "Sie sind an der Nachnutzung, Zusammenarbeit oder Kooperation mit dem Digitalcheck interessiert?",
        content: dedent`
          Wir begleiten Sie gerne bei der konkreten Umsetzung – mit Wissen, Praxiserfahrung aus anderen Regelungsvorhaben und konkreten Ideen zur Gestaltung in Ihrem Anwendungsfall.
          <br/><br/>
          **Rufen Sie uns an:** 0151 4076 7839  
          Schreiben Sie uns - egal ob Legist oder Institution:  
          interoperabel@digitalservice.bund.de
          <br/><br/>
          Weitere Online-Angebote des Digitalcheck für Legist:innen:  
          [https://erarbeiten.digitalcheck.bund.de/](${ROUTE_LANDING.url})
          <br/><br/>
          Für weitere Inhalte zur Interoperabilität:  
          [https://erarbeiten.digitalcheck.bund.de/interoperabel/](${ROUTE_INTEROPERABILITY.url})
        `,
      },
    ],
  },
};
