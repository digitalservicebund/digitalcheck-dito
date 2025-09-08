import {
  ROUTE_INTEROPERABILITY,
  ROUTE_LANDING,
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
        "Netzwerkdiagramm, das die Interaktionen verschiedener deutscher und EU-Behörden im Kontext der EU-Interoperabilitätsverordnung zeigt. Es verdeutlicht, wie Akteure wie der IT-Planungsrat, die Nationale Kontaktstelle, das BMDS und die EU-Kommission bei der Umsetzung, Koordination und dem Reporting zusammenarbeiten.",
    },
    contentAfter: {
      headline: "Rechtliche Grundlage",
      content: dedent`
      Das Organigramm zeigt die Interaktionen der Organisationen und Behörden in Deutschland und der EU im Kontext der Verordnung (EU) 2024/903.`,
      infobox: {
        detailsSummary: {
          items: [
            {
              title: "Beteiligte Organisationen und Behörden",
              content: dedent`
                  - **Bundesländer & Kommunen:** Ausgangspunkt, mit dem Hinweis auf die dezentrale Umsetzung durch das Bundesangebot.
                  - **IT-Planungsrat:** Koordiniert und empfiehlt die Integration von IT-Strategien.
                  - **Nationale Kontaktstelle:** Zentraler Ansprechpartner für Informationsaustausch und Koordination.
                  - **Bundesministerium für Digitales und Staatsmodernisierung  :** Verantwortlich für die Integration in den Digitalcheck.
                  - **EU-Kommission:** Beteiligte an der Weiterentwicklung und Reportings. 
                  - **EU-Interoperabilitätsbeirat:** EU-weite Zusammenarbeit, vertreten durch Markus Richter (Bundes-CIO).
                  - **27 EU-Staaten mit Kontaktstellen:** Nationale Kontaktstellen für Informationsaustausch.`,
            },
          ],
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
      Das Digitalcheck-Team übernimmt die Rolle der Nationalen Kontaktstelle, wie sie in der Verordnung 
      für ein interoperables Europa vorgesehen ist und dient als zentraler Ansprechpartner 
      für die Koordination und Umsetzung von Interoperabilitätsmaßnahmen in Deutschland.
      
      - **Zentrale Anlaufstelle für:** 
        - Behörden auf Bundes-, Landes- und kommunaler Ebene
        - Interessierte Akteurinnen und Akteure
        - Nationale Kontaktstellen anderer EU-Mitgliedstaaten
      
      - **Unterstützung bei Interoperabilitätsbewertungen:** 
      
        Bereitstellung einer praxistauglichen Methodik und Beratung für öffentliche Stellen bei der Durchführung von Interoperabilitätsbewertungen
      - **Bereitstellung von Informationen und Austauschformaten:**
      
        Aufbau von Wissen, Vernetzung und Unterstützung auf nationaler Ebene
      - **Prozessintegration:** 

        Verknüpfung von Digitalcheck und Interoperabilitätsbewertung zu einem konsistenten, gemeinsamen Verfahren

      - **Förderung von Nachnutzung, Kooperation und Zusammenarbeit:**
        - Bereitstellung von guten Beispielen
        - Unterstützung bei der Umsetzung von Interoperabilitätsanforderungen
        
      Falls Sie mit Ihrem Land kooperieren wollen, melden Sie sich bei uns. Unsere Kontaktdaten finden Sie unten.
    `,
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
