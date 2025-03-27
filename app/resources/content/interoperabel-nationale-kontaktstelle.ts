import { ROUTE_INTEROPERABILITY } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const spoc = {
  headline: "Nationale Kontaktstelle für ein interoperables Europa",
  content: dedent`
    Digitale Verwaltung europaweit ohne Grenzen: Die europäische Interoperabilitätsverordnung 
    und der Digitalcheck sind die Grundlage. 
    <br/><br/>
    Sie befinden sich auf der Informationsseite der 
    Deutschen nationalen Kontaktstelle(2024/903 Art. 17) - gemeinsam setzen wir den 
    Interoperabilitätsakt für die deutsche Verwaltung um, für vernetzte, bürgernahe, 
    digitale und effiziente Verwaltungsleistungen. 
    <br/><br/>
    Sie haben inhaltliche Fragen, dann besuchen Sie uns [hier](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32024R0903).
  `,
  landscape: {
    id: "landschaft",
    headline: "Übersicht über die europäische Interoperabilitäts-Landschaft",
    content: dedent`
      Seit Anfang 2025 ist die Verordnung für ein interoperables Europa bindend.
      Damit sind alle öffentlichen Einrichtungen in Europa, also die EU, ihre Mitgliedsländer und auch deren Bundesländer, verpflichtet diese umzusetzen.
      <br/><br/>
      In Deutschland bettet sich diese Anforderung in die föderale Zusammenarbeit wie folgt ein:
    `,
    image: {
      url: "/images/prozess-vorpruefung-mit-interoperabilitaet.jpg",
      alternativeText: `Der Prozess beginnt mit einer geführten Vorprüfung auf Digitalbezug und Anforderungen an Interoperabilität. Daraus ergeben sich drei mögliche Ergebnisse mit unterschiedlichen Prozessschritten: Bei dem Ergebnis "kein Digitalbezug" ist der Erarbeitungsprozess abgeschlossen und wird dem Normenkontrollrat zur Prüfung übermittelt. Bei dem Ergebnis "Digitalbezug" wird das Ergebnis per E-Mail an den Normenkontrollrat gesendet, gefolgt von einer Schritt-für-Schritt-Anleitung und der Dokumentation der Erstellung des Digitalbezugs, die abschließend vom Normenkontrollrat geprüft wird. Für das Ergebnis " Digitalbezug & Anforderungen an die Interoperabilität" wird das Ergebnis per E-Mail an den Normenkontrollrat und das Digitalcheck-Team gesendet, gefolgt von einer Schritt-für-Schritt-Anleitung mit Unterstützung durch das Digitalcheck-Team, der Dokumentation der Erstellung des Digitalbezugs und der Bewertung der Interoperabilität. Die Dokumentation wird anschließend auf dem Interoperable Europe Portal zur Verfügung gestellt.`,
    },
    contentAfter: {
      headline: "Rechtliche Grundlage",
      content:
        "Deutschland integriert die Anforderungen des IEA in den Digitalcheck und folgt damit den Empfehlungen der EU. Somit werden Ressourcen effizient genutzt und Doppelstrukturen verhindert. Somit ist die nationale Kontaktstelle im Digitalcheck-Team im BMI und DigitalService angesiedelt.",
    },
  },
  responsibilities: {
    id: "aufgaben",
    headline: "Aufgaben der nationalen Kontaktstelle (2024/903 Art. 17):",
    content: dedent`
      Das Digitalcheck-Team übernimmt die Rolle der Nationale Kontaktstelle, wie sie in der Verordnung 
      für ein interoperables Europa vorgesehen ist und dient als zentraler Ansprechpartner 
      für die Koordination und Umsetzung von Interoperabilitätsmaßnahmen in Deutschland.
      
      - Bereitstellung der Methodik und Unterstützung der Durchführung von Interoperabilitätsbewertungen
      - Integration von Digitalcheck und Interoperabilitätsbewertung zu einem geeinten Prozess
      - Ansprechperson für:
        - andere nationale Kontaktstellen
        - Bundesländer
        - IT-Planungsrat (& FITKO)
        - Interessierte
        - Umsetzenden Akteure
      - Teilnahme an Austauschen und Weiterentwicklung auf europäischer Ebene
        - Informieren des Interoperable Europe Boards
        - Teil der Interoperable Europe Arbeitsgruppe
      - Anregung der Nachnutzung, Angebot zur Kooperation und Hilfestellung bei der Umsetzung von den Interoperabilitätsanforderungen
      - Repräsentation des Themas in der Verwaltung
      - Gute Beispiele teilen
    `,
  },
  timeline: {
    id: "verlauf",
    headline: "Was ist der jetzige Stand des Digitalchecks?",
    items: [
      {
        headline: {
          text: "Verordnung für ein interoperables Europa tritt in Kraft",
        },
      },
      {
        headline: {
          text: "Verordnung tritt in Kraft und erste Änderungen im Digitalcheck umgesetzt:",
        },
        content: dedent`
          - Der Digitalcheck berücksichtigt nun neben dem Digitalbezug auch die Interoperabilität.
          - Das Ergebnis der Vorprüfung wird automatisch per E-Mail versendet:
            - Bei Digitalbezug an den NKR.
            - Bei zusätzlichem Interoperabilitäts-Bezug an das Digitalcheck-Team und den NKR.
        `,
      },
      {
        headline: {
          text: "Konzeption: Zusammenführung vom Erarbeiten-Prozess und Interoperabilitätsbewertung",
        },
        content: dedent`
          **Verzahnung der Prozesse**
          - Zunächst wurden die inhaltlichen Schnittmengen zwischen dem Erarbeitungsprozess für digitaltaugliche Regelungen und dem Interoperabilitäts-Assessment identifiziert und analysiert. Darauf aufbauend wird ein synthetisierter Prozess erstellt. Dieser wird jetzt in den Kontaktpunkten kontinuierlich umgesetzt.
          
          **Überarbeitung der Prinzipien für digitaltaugliche Regelungen**
          - Basierend auf den Erkenntnissen aus dem Vergleich wurden die bestehenden Prinzipien  der Digitaltauglichkeit überarbeitet. Ziel war es, diese Prinzipien so anzupassen, dass sie sowohl den Anforderungen der Digitaltauglichkeit als auch der Interoperabilität gerecht werden.
        `,
      },
      {
        headline: {
          text: "Nächste Schritte für die Erarbeitung",
        },
        content: dedent`
          **Entwicklung neuer Prinzipien und Methoden**
          - Derzeit entwickeln wir neue Vorschläge für Prinzipien und Methoden, die eine Integration von Prinzipien der Digitaltauglichkeit und Ebenen der Interoperabilität ermöglichen. Ziel ist es, den gesamten Entwicklungsprozess effizienter und zielgerichteter für Regelungsvorhaben zu gestalten.
          
          ![TODO](/images/synthese-prozess-digitalcheck-und-interoperabilitaet.png)
        `,
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
          "Durch die Nachnutzung können Sie initiale und laufende Aufwände für eine Umsetzung der Interoperabilitätsanforderungen minimieren, indem Sie Inhalte, Visualisierungen oder sogar Softwarecode übernehmen. Falls Sie mit Ihrem Land kooperieren wollen, melden Sie sich bei uns, Kontaktdaten finden Sie unten.",
      },
      {
        headline: "Kontinuierliche Weiterentwicklung",
        content:
          "Der Digitalcheck wird laufend iterativ an Bedürfnisse von Legist:innen ausgerichtet und an Anforderungen aus der Verordnung für eine interoperables Europa angepasst. Im Rahmen einer Kooperation informieren wir Sie laufend über neue Erkenntnisse, Rahmenbedingungen und geplante Änderungen.",
      },
      {
        headline: "Unterstützung für die konkrete Umsetzung",
        content: dedent`
          Wie kann ein Nachnutzung in Ihrem Fall ausgestaltet werden? Wir vom Digitalcheck Team 
          teilen unsere Erkenntnisse und Erfahrungen mit anderen Bundesländern gerne mit Ihnen:
          <br/><br/>
          Rufen Sie uns an: [0151/40 76 78 39](tel:+4915140767839)
          
          Schreiben Sie uns: [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Supportanfrage:%20Nationale%20Kontaktstelle)
        `,
      },
    ],
  },
  contact: {
    id: "kontakt",
    headline: "Service und Kontakt",
    content: dedent`
      Als nationalen Kontaktstelle gemäß 2024/903 Art. 17 unterstützen wir:
      
      - Andere nationale Kontaktstellen
      - Bundesländer
      - IT-Planungsrat & FITKO
      - Interessierte
      - Umsetzenden Akteure
      <br/>
      
      Rufen Sie uns an: [0151/40 76 78 39](tel:+4915140767839)
      
      Schreiben Sie uns - egal ob als Legist:innen oder Institution:<br/>
      [interoperabel@digitalservice.bund.de](mailto:interoperabel@digitalservice.bund.de?subject=Anfrage:%20Nationale%20Kontaktstelle)
      <br/><br/>
      Weitere Online-Angebote des Digitalcheck für Legist:innen:<br/>
      [https://erarbeiten.digitalcheck.bund.de/](/)
      <br/><br/>
      Für Interoperabilitätsthemen:<br/>
      [https://erarbeiten.digitalcheck.bund.de/interoperabel](${ROUTE_INTEROPERABILITY.url})
    `,
  },
};
