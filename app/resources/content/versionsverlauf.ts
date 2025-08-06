import { dedent } from "~/utils/dedentMultilineStrings";

export const versionHistory = {
  title: "Versionsverlauf",
  subtitle:
    "Hier können Sie alle Änderungen an den Versionen des Digitalchecks nachvollziehen.",
  items: [
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
      content: dedent`
        - Erste Version
      `,
    },
  ],
};
