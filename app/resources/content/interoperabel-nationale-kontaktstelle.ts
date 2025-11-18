import {
  ROUTE_INTEROPERABILITY,
  ROUTE_LANDING,
  ROUTE_METHODS_PRINCIPLES,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const spoc = {
  headline: "Nationale Kontaktstelle für ein interoperables Europa",
  content: dedent`
    Digitale Verwaltung europaweit ohne Grenzen: Die europäische Interoperabilitätsverordnung 
    und der Digitalcheck sind die Grundlage. 

    Sie befinden sich auf der Informationsseite der deutschen nationalen Kontaktstelle (2024/903 Art. 17).
    Gemeinsam mit der deutschen Verwaltung setzen wir die europäische Interoperabilitätsverordnung 2024/903 um, für vernetzte, bürgernahe, digitale und effiziente Verwaltungsleistungen.
  `,
  landscape: {
    id: "landschaft",
    tabName: "Überblick",
    headline: "Nationale Umsetzung der EU-Interoperabilitätsverordnung",
    content: dedent`
      Seit Anfang 2025 muss die Verordnung für ein interoperables Europa ([2024/903](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R0903)) in den EU Mitgliedstaaten verpflichtend umgesetzt werden.
      Damit sind alle öffentlichen Einrichtungen in Europa, also EU-Institutionen, ihre Mitgliedstaaten und auch deren Bundesländer und Kommunen, verpflichtet Interoperabilitätsbewertungen durchzuführen. 

      Diese Bewertungen sind erforderlich, bevor neue oder geänderte verbindliche Anforderungen beschlossen werden, um einen nahtlosen Datenaustausch zwischen Behörden sicherzustellen und den grenzüberschreitenden Zugang zu digitalen Verwaltungsleistungen in der EU zu ermöglichen.

      In Deutschland bettet sich diese Anforderung in die föderale Zusammenarbeit wie folgt ein:
    `,
    image: {
      url: "/images/prozess-nationale-kontaktstelle.png",
      alternativeText:
        "Netzwerkdiagramm, das die Interaktionen verschiedener deutscher und EU-Behörden im Kontext der EU-Interoperabilitätsverordnung zeigt. Es verdeutlicht, wie Akteurinnen und Akteure wie der IT-Planungsrat, die Nationale Kontaktstelle, das BMDS und die EU-Kommission bei der Umsetzung, Koordination und dem Reporting zusammenarbeiten.",
    },
    contentAfter: {
      headline: "Rechtliche Grundlage",
      content: dedent`
      Das Organigramm zeigt die Interaktionen der Organisationen und Behörden in Deutschland und der EU im Kontext der Verordnung (EU) 2024/903.`,
      infobox: {
        detailsSummary: {
          title: "Beteiligte Organisationen und Behörden",
          content: dedent`
                  - **Bundesländer & Kommunen:** Ausgangspunkt, mit dem Hinweis auf die dezentrale Umsetzung durch das Bundesangebot.
                  - **IT-Planungsrat:** Koordiniert und empfiehlt die Integration von IT-Strategien.
                  - **Nationale Kontaktstelle:** Zentraler Ansprechpartner für Informationsaustausch und Koordination.
                  - **Bundesministerium für Digitales und Staatsmodernisierung  :** Verantwortlich für die Integration in den Digitalcheck.
                  - **EU-Kommission:** Beteiligte an der Weiterentwicklung und Reportings. 
                  - **27 EU-Staaten mit Kontaktstellen:** Nationale Kontaktstellen für Informationsaustausch.`,
        },
      },
      outro:
        "Deutschland integriert die Anforderungen der Verordnung (EU) 2024/903 in den Digitalcheck und folgt damit den Empfehlungen der EU. Somit werden Ressourcen effizient genutzt und Doppelstrukturen verhindert. Die nationale Kontaktstelle ist beim Digitalcheck-Team angesiedelt.",
    },
  },
  responsibilities: {
    id: "aufgaben",
    headline: "Aufgaben der nationalen Kontaktstelle (2024/903 Art. 17)",
    content: dedent`
      Als Nationale Kontaktstelle sind wir die zentrale Anlaufstelle in Deutschland zur Umsetzung der EU-Verordnung zur Interoperabilität (EU) 2024/903. Wir unterstützen Mitarbeitende der öffentlichen Verwaltung dabei, die Interoperabilität von digitalen Systemen zu fördern, um eine vernetzte und bürgernahe Verwaltung in ganz Europa zu ermöglichen.
      
      **Unterstützung der Verwaltung** 
      Wir stellen die Methodik für die Interoperabilitätsbewertung bereit und unterstützen bei der Durchführung. Ein wichtiger Aspekt ist die Integration dieser Anforderungen in den bestehenden Digitalcheck. 
      Dabei unterstützen wir Sie im gesamten Prozess: 
        - bei der Klärung von Fragen zur Interoperabilität
        - beim Ausfüllen der Bewertung 
        - und insbesondere beim Identifizieren sogenannter "verbindlicher Anforderungen" und deren Auswirkungen auf die vier Ebenen der Interoperabilität.
      
      **Ansprechpartner** 
        Wir sind Ansprechpartner für verschiedene Akteure, darunter andere nationale Kontaktstellen, die Bundesländer, den IT-Planungsrat, die FITKO, sowie interessierte Personen und umsetzende Akteure.
      
      **Austausch und Weiterentwicklung auf deutscher und europäischer Ebene**
      Wir nehmen aktiv an Diskussionen auf europäischer Ebene teil, mit dem zuständigen Referat im Bundesministerium für Digitalisierung und Staatsmodernisierung sind wir Teil der Arbeitsgruppe "Interoperable Europe" und informieren auf diesem Wege das Interoperable Europe Board. Unsere Aufgabe ist es auch, die Nachnutzung von Lösungen zu fördern, Hilfestellung bei der Umsetzung von Interoperabilitätsanforderungen zu leisten und das Thema in der Verwaltung zu repräsentieren, indem wir bewährte Verfahren, sogenannte Best Practices, teilen.
      
      **Bereitstellung von Informationen und Austauschformaten** 
      Wir stellen Wissen bereit und bereiten das Thema verständlich auf. Dazu zählen Schulungen (https://digitalcheck.bund.de/unterstuetzung#angebote) und verschiedene Unterstützungsangebote (https://digitalcheck.bund.de/unterstuetzung).

      **Förderung von Nachnutzung, Kooperation und Zusammenarbeit:**
      Wir stellen gute Beispiele bereit, unterstützen bei der Nachnutzung und fördern sektorenübergreifende Zusammenarbeit.
        
      Falls Sie mit Ihrem Land kooperieren wollen, melden Sie sich bei uns.
    `,
  },
  timeline: {
    id: "verlauf",
    headline: "Aktueller Stand der Integration in den Digitalcheck",
    items: [
      {
        headline: {
          text: "Methoden für Digitaltauglichkeit und Interoperabilität",
        },
        badge: {
          text: "Aktuell",
        },
        content: dedent`
          Die inhaltlichen Schnittmengen zwischen dem Erarbeitungsprozess für digitaltaugliche Regelungen und dem Interoperabilitäts-Assessment sind identifiziert und analysiert. Der daraus entstandene Prozess wird in den Digitalcheck-Kontaktpunkten umgesetzt. Darauf aufbauend passen wir die Erarbeitungsmethoden an. Ziel ist es, den gesamten Entwicklungsprozess effizienter und zielgerichteter zu gestalten.
        `,
        image: {
          url: "/images/synthese-prozess-digitalcheck-und-interoperabilitaet.png",
          alternativeText:
            "Die Abbildung zeigt ein strukturiertes Vorgehensmodell für den Digitalcheck und die Interoperabilitätsbewertung. Das Vorgehen des Digitalchecks und der Interoperabilitätsbewertung wird in einem neuen Prozess zusammengefasst. Er umfasst drei Hauptbereiche: Zunächst werden Akteurinnen und Akteure identifiziert, bestehende Prozesse visualisiert und neue Prozesse entwickelt. Danach werden rechtliche Rahmenbedingungen untersucht, digitale Chancen analysiert und Anforderungen definiert. Schließlich erfolgt die Umsetzung, die Nutzung bestehender oder die Entwicklung neuer Lösungen, bevor alles dokumentiert wird. Durch die visuelle Darstellung wird der neue, gebündelte Ansatz im Prozess verdeutlicht.",
        },
      },
      {
        headline: {
          text: "Über 100 Teilnehmende in acht Online-Workshops",
        },
        badge: {
          text: "03.07.2025",
        },
        content: dedent`
          In den Schulungen „Visualisieren – komplexes einfach darstellen“ und “Regelungen digitaltauglich und interoperabel gestalten“ haben die Teilnehmenden erfahren, wie sie den Digitalcheck als frühzeitig Denkwerkzeug nutzen können, um Gesetze besser und umsetzbarer zu gestalten.  
        `,
      },
      {
        headline: {
          text: "Integration in die Abläufe des IT-Planungsrats",
        },
        badge: {
          text: "25.06.2025",
        },
        content: dedent`
          Die Bedeutung des IEA für das föderale IT-Architekturboard sowie Unterstützungsmöglichkeiten durch die Nationale Kontaktstelle wurden vorgestellt. 
        `,
        image: {
          url: "/images/interoperabilitaet-it-planungsrat.png",
          alternativeText:
            "Die Abbildung zeigt ein strukturiertes Vorgehensmodell für die Interoperabilitätsbewertung. Alle Steckbriefe werden von der FITKO überprüft, die letztendliche Entscheidung trifft der IT-Planungsrat. Die Dokumentation bei Interoperabilitätsbezug muss bei der EU-Kommission eingereicht werden. Die Nationale Kontaktstelle steht während des gesamten Prozesses unterstützend zur Verfügung.",
        },
      },
      {
        headline: {
          text: "Die 5 Prinzipien für digitaltaugliche Regelungen sind überarbeitet",
        },
        badge: {
          text: "15.05.2025",
        },
        content: dedent`
          Die [5 Prinzipien für digitaltaugliche Gesetzgebung](${ROUTE_METHODS_PRINCIPLES.url}) sind überarbeitet und entsprechen sowohl den Anforderungen der Digitaltauglichkeit als auch der Interoperabilität. 
        `,
      },
      {
        headline: {
          text: "Verordnung tritt in Kraft und erste Änderungen sind im Digitalcheck umgesetzt:",
        },
        badge: {
          text: "10.01.2025",
        },
        content: dedent`
          - **Vorprüfung:** Berücksichtigt nun neben dem Digitalbezug auch die europäische Interoperabilität.
          - Das Ergebnis der Vorprüfung wird automatisch per E-Mail versendet:
            - Bei Digitalbezug an den NKR.
            - Bei zusätzlichem Interoperabilitäts-Bezug auch an die nationale Kontaktstelle beim Digitalcheck-Team.
          - Bereitstellung einer [Informationsseite](${ROUTE_INTEROPERABILITY.url}) zum Thema Interoperabilität für Legistinnen und Legisten.
        `,
      },
      {
        headline: {
          text: "Verordnung für ein interoperables Europa wird vom europäischen Parlament verabschiedet",
        },
        badge: {
          text: "13.03.2024",
        },
      },
    ],
  },
  states: {
    id: "landesebene",
    tabName: "Digitalcheck nachnutzen",
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
          "Der Digitalcheck wird laufend iterativ an Bedürfnisse von Legistinnen und Legisten ausgerichtet und an Anforderungen aus der Verordnung für ein interoperables Europa angepasst. Im Rahmen einer Kooperation informieren wir Sie laufend über neue Erkenntnisse, Rahmenbedingungen und geplante Änderungen.",
      },
    ],
  },
  contact: {
    id: "kontakt",
    tabName: "Service & Kontakt",
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

          **Rufen Sie uns an:** 0151 4076 7839  
          Schreiben Sie uns - egal ob Legist oder Institution:  
          interoperabel@digitalservice.bund.de

          Weitere Online-Angebote des Digitalcheck für Legist:innen:  
          [https://digitalcheck.bund.de/](${ROUTE_LANDING.url})

          Für weitere Inhalte zur Interoperabilität:  
          [https://digitalcheck.bund.de/interoperabel/](${ROUTE_INTEROPERABILITY.url})
        `,
      },
    ],
  },
};
