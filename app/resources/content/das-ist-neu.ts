import {
  ROUTE_DOCUMENTATION_STATIC_WORD,
  ROUTE_FUNDAMENTALS_DIGITAL_READINESS,
  ROUTE_FUNDAMENTALS_NKR,
  ROUTE_INTEROPERABILITY_SPOC,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_VISUALIZE,
  ROUTE_METHODS_VISUALIZE_FLOWCHARTS,
  ROUTE_VERSION_HISTORY,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const news = {
  title: "Das ist neu",
  subtitle: dedent`
      Das Digitalcheck Angebot wird kontinuierlich weiterentwickelt. Bedürfnisse und Rückmeldungen von Nutzenden werden kurzfristig einbearbeitet. Auch geänderte und neue rechtliche Anforderungen führen zu Anpassungen. Unten finden Sie eine chronologische Übersicht der Ergänzungen und Änderungen auf der Website.
      
      Haben Sie Anregungen oder Wünsche? Kontaktieren Sie uns jederzeit gerne unter [0151/40 76 78 39](tel:+4915140767839) oder [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20digitalcheck.bund.de).
  `,
  items: [
    {
      badge: {
        text: "12.09.2025",
      },
      content: `Anleitungs-Seite für Flussdiagramme: Video bei Schritt 5 ergänzt: Entstehen eines Flussdiagramms. [Hier ansehen](${ROUTE_METHODS_VISUALIZE_FLOWCHARTS.url}#video-anleitung)`,
    },
    {
      badge: {
        text: "12.09.2025",
      },
      content: dedent`
        - Neuer Hinweis auf Ergebnisseite der Vorprüfung, wenn
          - die Angaben der Vorprüfung ergeben: Kein Digitalbezug
          - bei der Frage zur Interoperabilität aber angegeben wird: Datenaustausch findet statt
        - dann Anzeige eines Hinweises, Ergebnis ist in Bezug auf Datenaustausch (einmal ja / einmal nein) widersprüchlich ist + Aufruf, sich beim Support zu melden
      `,
    },
    {
      badge: {
        text: "11.09.2025",
      },
      content: "Darstellung der Progress-Bar an Style der Startseite angepasst",
    },
    {
      headline: {
        text: "Anleitungs-Seite für Flussdiagramme überarbeitet",
      },
      badge: {
        text: "04.09.2025",
      },
      content: dedent`
        - Einstieg in Methode vereinfacht (Erklärung zur Methode ergänzt)
        - Verständlichkeit der Inhalte verbessert
        - Navigation innerhalb der Seite verbessert: Buttons “nächster Schritt“ + vertikale Navigations-Element auf rechter Seite
        
        [Hier ansehen](${ROUTE_METHODS_VISUALIZE_FLOWCHARTS.url})
      `,
    },
    {
      badge: {
        text: "01.09.2025",
      },
      content: dedent`
        Neuer Hinweis in Fragestrecke der Vorprüfung, wenn
        - die Angaben der Vorprüfung ergeben: Kein Digitalbezug
        - bei der Interop-Frage aber angegeben wird: Datenaustausch findet statt
        
        Dann Anzeige eines Hinweises, Ergebnis ist in Bezug auf Datenaustausch (einmal ja / einmal nein) widersprüchlich ist. Wir lassen die - theoretisch mögliche - Kombination aber weiterhin als Ergebnis zu.
      `,
    },
    {
      badge: {
        text: "26.08.2025",
      },
      content: dedent`
        - [digitalcheck.bund.de](https://digitalcheck.bund.de/) führt jetzt zur Digitalcheck Website und nicht mehr zur 
        [Digitale Verwaltung Projektseite](https://www.digitale-verwaltung.de/Webs/DV/DE/transformation/digitalcheck/digitalcheck-node.html)
        - Startseite URL: Fourth-Level-Domain entfernt
          - vorher: erarbeiten.digitalcheck.bund.de → leitet jetzt weiter zu:
          - neu: digitalcheck.bund.de
        - Link zu [Digitale Verwaltung Projektseite](https://www.digitale-verwaltung.de/Webs/DV/DE/transformation/digitalcheck/digitalcheck-node.html) im Footer ergänzt
        - Neue [Einstiegseite / Landingpage für Visualisierungen](${ROUTE_METHODS_VISUALIZE.url}) gelauncht 
        - [NKR Infoseite](${ROUTE_FUNDAMENTALS_NKR.url}) aktualisiert 
      `,
    },
    {
      badge: {
        text: "14.08.2025",
      },
      content: dedent`
        - Prinzipien-Seite
          - für jedes Prinzip ein Beispiel ergänzt
          - wenn sinnvoll: für Aspekte je ein Beispiel ergänzt
          - Kontextinfo “Warum ist dieses Beispiel gut“ näher an Regelungsbeispiel-Text platziert
        
        [hier ansehen](${ROUTE_METHODS_PRINCIPLES.url})
      `,
    },
    {
      badge: {
        text: "05.08.2025",
      },
      content: dedent`
        - Neue [Startseite](/)
        - Neue Grundlagen-Seite: Was ist [Digitaltauglichkeit](${ROUTE_FUNDAMENTALS_DIGITAL_READINESS.url})?
        - Neue Grundlagen-Seite: [NKR und Digitalcheck](${ROUTE_FUNDAMENTALS_NKR.url})
        - Neue [Dokumentation als Word-Datei v1.5.1](${ROUTE_DOCUMENTATION_STATIC_WORD.url}) aktualisiert auf Digitalcheck Website, Github und DV
        - Beispiele sind wieder im Footer verlinkt
        - [Nationale Kontaktstelle-Seite](${ROUTE_INTEROPERABILITY_SPOC.url}): Zeitleiste neu sortiert (Aktuelles oben)
        - Versionsverlauf: Das PDF auf Digitale Verwaltung ist auf die Digitalcheck Website umgezogen und hat sich dabei in eine [Webpage](${ROUTE_VERSION_HISTORY.url}) verwandelt
        - Der Methodenfahrplan in Grundlagen ist entfernt
      `,
    },
    {
      headline: {
        text: "V1.5.1",
      },
      badge: {
        text: "31.07.2025",
      },
      content: dedent`
        Kleine Anpassungen an Formatierung und Formulierungen an der Dokumentation, um das Dokument besser lesbar und verständlicher zu machen.

        **Dokumentation:**
        - Fragestellungen zu den Prinzipien „Digitale Angebote für alle nutzbar gestalten“ und „Datenwiederverwendung benötigt einheitliches Recht“ überarbeitet
        - Hinweis zur Vorprüfung ergänzt
        - Bereiche für Antworten zwecks besserer Lesbarkeit mit Rahmen versehen
      `,
    },
    {
      headline: {
        text: "Beispiele-Seite wieder online",
      },
      badge: {
        text: "12.06.2025",
      },
      content:
        "Die Beispiele wurden an die überarbeiteten Prinzipien angepasst und die Beispiel-Seite wieder online genommen.",
    },
    {
      headline: {
        text: "V1.5",
      },
      badge: {
        text: "02.06.2025",
      },
      content: dedent`
        Die fünf Prinzipien für digitaltaugliche Gesetzgebung wurden neu strukturiert und um Aspekte der vier Ebenen für Interoperabilität (EU 2024/903) ergänzt.
        
        Aufgrund des 70-Tage Zeitplans der neuen Bundesregierung wurden der Methodenfahrplan und die Dokumentation für diesen begrenzten Zeitraum vereinfacht und gekürzt.
        
        - **Einstiegsseite:**
          - Hinweis-Banner ergänzt
        - **Fünf Prinzipien Unterseite:**
          - Aktualisiert und erweitert
        - **Methodenfahrplan:**
          - Gekürzt auf Visualisierung und Arbeit mit den neuen Prinzipien
        - **Dokumentation:**
          - Fünf Prinzipien aktualisiert
          - Word statt PDF
        - **Beispiele-Seite:**
          - Übergangsweise offline, bis die Beispiele an die überarbeiteten Prinzipien angepasst sind.
      `,
    },
    {
      headline: {
        text: "V1.4",
      },
      badge: {
        text: "10.01.2025",
      },
      content: dedent`
        Die Inhalte der Vorprüfung wurden um Anforderungen erweitert, die sich aus der Verordnung für ein interoperables Europa (EU 2024/903) ergeben.

        - **Einstiegsseite:**
          - Allgemeine Informationen zur EU-Verordnung ergänzt
          - Bereich mit Fragen und Antworten zu den Themen Interoperabilität und zum Digitalcheck hinzugefügt
        - **Fragestrecke:**
          - Frage zur Bestimmung des Interoperabilitäts-Bezugs und Beispiel hinzugefügt
        - **Ergebnisseite:**
          - Ergebnis der Vorprüfung wird als E-Mail an den NKR und bei Interoperabilitätsbezug zusätzlich an die nationale Kontaktstelle beim Digitalcheck-Team gesendet
          - Geänderte Dokumentation über Veraktungs-Option im E-Mail Programm
      `,
    },
    {
      headline: {
        text: "V1.3",
      },
      badge: {
        text: "21.05.2024",
      },
      content: dedent`
        - Basierend auf Feedback, Evaluation und Rückmeldungen **sprachliche Anpassungen und Ausführungen eingearbeitet** (Bsp: Regelungsvorhaben anstatt Regelung, um den Sinnzusammenhang herzustellen; Umsetzung anstatt Vollzug, um die breitere Bedeutung der Digitaltauglichkeit klar herauszustellen).
        - **Links und Verweise aktualisiert** (Bsp: digitalcheck.bund.de).
        - **In einzelne Dokumente aufgeteilt:** Vorprüfung, Prinzipienposter: 5 Prinzipien für digitaltaugliche Gesetzgebung, Hilfestellungen und begleitende Dokumentation sind jetzt als einzelne Dokumente als Download verfügbar.
      `,
    },
    {
      headline: {
        text: "V1.2",
      },
      badge: {
        text: "30.06.2023",
      },
      content: dedent`
        - Sprachliche Anpassungen und Ausführungen.
        - Der Digitalcheck läuft nun in zwei statt drei Schritten ab. Dabei fällt kein Schritt weg, sondern die beiden letzten Schritte wurden kombiniert.
        - Die Dokumentation leistet jetzt verbesserte Hilfestellung und begleitet die Erarbeitung digitaltauglicher Regelungen. Der Name ist geändert zu ›begleitender Dokumentation‹.
        - Detaillierte Anleitungen zu Prozess-Visualisierungen werden bereitgestellt.
        - Die fünf Prinzipien für digitaltaugliche Gesetze stehen auf einem A4 Poster bereit.
        - Während der begleitenden Methoden werden immer wieder Kurzzusammenfassungen und Tipps herausgestellt, um den Lesefluss zu verbessern und wichtige Punkte stets zur Hand zu geben.
      `,
    },
    {
      headline: {
        text: "V1.1",
      },
      badge: {
        text: "27.01.2023",
      },
      content: dedent`
        - Das PDF ist jetzt barrierefrei/barrierearm.
        - Das Vorblatt enthält jetzt einen Hinweis auf die Übergangsregelung.
        - Neben dem Komplettpaket werden die ausfüllbaren Dokumente (Vorprüfung, Dokumentation und Arbeitsblatt) zusätzlich gesondert zum Download bereitgestellt. Das ermöglicht ein schnelleres Bearbeiten des Digitalchecks bei wiederholter Nutzung.
      `,
    },
    {
      headline: {
        text: "V1.0",
      },
      badge: {
        text: "27.12.2022",
      },
      content: dedent`
        - Das PDF ist jetzt interaktiv ausfüllbar.
        - Alle Dokumente werden in einem Paket bereitgestellt
      `,
    },
    {
      headline: {
        text: "V0.9",
      },
      badge: {
        text: "18.11.2022",
      },
      content: "Erste Version",
    },
  ],
};
