import { dedent } from "~/utils/dedentMultilineStrings";

export const principles = [
  {
    id: "prinzip-digitale-angebote",
    title: "Prinzip: Digitale Angebote",
    headline: "Digitale Angebote für alle nutzbar gestalten",
    details: {
      title: "Was steckt in dem Prinzip?",
      text: dedent`
        Viele Bürgerinnen, Bürger und Unternehmen sind an digitale Angebote gewöhnt und bevorzugen diese – sofern die digitale Kommunikation gut umgesetzt ist und ihren Bedürfnissen entspricht. Die Verwaltung kann digitale Daten schneller prüfen, bearbeiten und dokumentieren. Das Angebot sollte dabei immer inklusiv sein und es benötigt ggf. analoge Alternativen.
        
        **So wenden Sie das Prinzip an:** 
  
        - Ermöglichen Sie digitale Kommunikation 
        - Formulieren Sie die Regelung technologieoffen 
        - Denken Sie an Antragsstellung, Bearbeitung und Bescheid 
        - Denken Sie Barrierefreiheit von Anfang an mit 
        - Stellen Sie eine nutzerfreundliche Umsetzung sicher 
      `,
    },
    question: "Ermöglicht das Regelungsvorhaben digitale Angebote für alle?",
    hint: "Listen Sie alle Paragraphen auf, in denen das Prinzip wichtig ist.",
    example: {
      title: "Beispiel: BVerfGG, § 23a (1)",
      text: dedent`
          Schriftlich einzureichende Anträge und Erklärungen sowie sonstige Schriftsätze und deren Anlagen können nach Maßgabe der folgenden Absätze als elektronische Dokumente beim Bundesverfassungsgericht eingereicht werden.

          **Erklärung:**
          Ermöglicht elektronisches Einreichen der Dokumente.
        `,
    },
  },
  {
    id: "prinzip-datenwiederverwendung",
    title: "Prinzip: Datenwiederverwendung",
    headline: "Datenwiederverwendung benötigt einheitliches Recht",
    details: {
      title: "Was steckt in dem Prinzip?",
      text: dedent`
        Normadressatinnen und -adressaten sowie umsetzende Behörden sparen Kosten und Zeit, wenn das Once-Only-Prinzip konsequent angewendet wird – also wenn Daten nur einmal angegeben und dann wiederverwendet werden. Die Grundlage dafür sind harmonisierte Rechtsbegriffe, ein datenschutzkonformer Austausch und die Berücksichtigung etablierter technischer Standards. 
  
        **So wenden Sie das Prinzip an:** 
  
        - Nutzen Sie harmonisierte Rechtsbegriffe 
        - Nutzen Sie existierende Daten 
        - Machen Sie erhobene Daten für andere nutzbar 
        - Nutzen Sie bestehende technische Standards 
        - Suchen Sie frühzeitig den Austausch mit allen Beteiligten
      `,
    },
    question: "Ermöglicht das Regelungsvorhaben Datenwiederverwendung?",
    hint: "Listen Sie alle Paragraphen auf, in denen das Prinzip wichtig ist.",
    example: {
      title: "Beispiel: § 23a BVerfG (2)",
      text: dedent`
          Das elektronische Dokument muss für die Bearbeitung durch das Bundesverfassungsgericht geeignet sein. Für die Übermittlung und die Eignung zur Bearbeitung durch das Bundesverfassungsgericht gelten die in der Elektronischer-Rechtsverkehr-Verordnung geregelten technischen Rahmenbedingungen des elektronischen Rechtsverkehrs entsprechend.

          **Erklärung:**
          - Begünstigt eine effiziente technische Umsetzung, indem es die Nutzung oder Wiederverwendung eines geeigneten Datenstandards vorschreibt.
          - Verweist mit der Elektronischer-Rechtsverkehr-Verordnung auf eine Regelung, die technische und rechtliche Aspekte zentral steuert.
        `,
    },
  },
  {
    id: "prinzip-etablierte-technologien",
    title: "Prinzip: Etablierte Technologien",
    headline: "Etablierte Technologien ermöglichen effiziente Umsetzung",
    details: {
      title: "Was steckt in dem Prinzip?",
      text: dedent`
        Digitale Angebote können schneller bereitgestellt sowie günstiger entwickelt und betrieben werden, wenn sie auf bestehenden Technologien aufbauen. Offene, standardisierte Schnittstellen und Open-Source erhöhen die Sicherheit der Angebote und fördern die Interoperabilität. 

        **So wenden Sie das Prinzip an:** 
        
        - Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen 
        - Bevorzugen Sie Open-Source-Software und offene Spezifikationen
      `,
    },
    question:
      "Ermöglicht die Regelung die Nutzung von etablierten Technologien, Schnittstellen oder Open Source?",
    hint: "Listen Sie alle Paragraphen auf, in denen das Prinzip wichtig ist.",
    example: {
      title: "Beispiel",
      text: dedent`
          Kein Beispiel vorhanden. Kennen Sie ein gutes Beispiel?
        `,
    },
  },
  {
    id: "prinzip-automatisierung",
    title: "Prinzip: Automatisierung",
    headline: "Automatisierung basiert auf eindeutigen Regelungen",
    details: {
      title: "Was steckt in dem Prinzip?",
      text: dedent`
          Logische und verständliche Regelungen und transparente Verfahren erleichtern den Zugang zum Recht und stärken das Vertrauen in den Staat. Einfachheit und verständliche Sprache sind durch die GGO und das Handbuch der Rechtsförmlichkeit vorgeschrieben. 
  
          Klarheit und Logik bilden die Grundlage für automatisierte Prozesse. Wenn Begriffe eindeutig definiert sowie Entscheidungsstrukturen bestimmt sind, können Regeln und klare Ausnahmen automatisiert werden. Das spart Zeit aufseiten der Nutzenden und der Verwaltung. Mit diesen Ressourcen können kritischere Einzelfälle bearbeitet oder Normadressatinnen und -adressaten beraten werden. 
  
          **So wenden Sie das Prinzip an:** 
  
          - Beachten Sie bestehende Prozesse und Verantwortlichkeiten 
          - Nutzen Sie das Potenzial von Automatisierung 
          - Unterscheiden Sie zwischen genereller Regel, Ausnahmen und Ermessensspielräumen 
          - Schreiben Sie einfach, eindeutig und widerspruchsfrei
        `,
    },
    question:
      "Ist die Regelung so eindeutig formuliert, dass Automatisierung möglich ist?",
    hint: "Listen Sie alle Paragraphen auf, in denen das Prinzip wichtig ist.",
    example: {
      title: "Beispiel: § 66a LuftVG (7)",
      text: dedent`
          Die Übermittlung nach Absatz 6 Satz 1 aus dem Register darf durch Abruf im automatisierten Verfahren an die Polizeien des Bundes und der Länder erfolgen
          1. zur Verfolgung von Straftaten oder
          2. zur Abwehr von Gefahren für die öffentliche Sicherheit,
          
          wenn diese Daten auf andere Weise nicht oder nicht rechtzeitig oder nur mit unverhältnismäßigem Aufwand zu erlangen sind. Die Verantwortung für die Zulässigkeit des einzelnen automatisierten Abrufs trägt die abrufende Stelle. Das Luftfahrt-Bundesamt überprüft die Zulässigkeit des Abrufs nur, wenn dazu Anlass besteht.

          **Erklärung:**
          Führt zur Bereitstellung einer Schnittstelle zum automatisierten Abruf durch eine andere Behörde.
        `,
    },
  },
  {
    id: "prinzip-datenschutz-und-informationssicherheit",
    title: "Prinzip: Datenschutz und Informationssicherheit",
    headline: "Datenschutz und Informationssicherheit schaffen Vertrauen",
    details: {
      title: "Was steckt in dem Prinzip?",
      text: dedent`        
            Alle Menschen haben ein Recht darauf, dass ihre Daten vor unbefugten Zugriffen geschützt werden. Der Schutz personenbezogener Daten ist in der DSGVO geregelt. Informationssicherheit umfasst alle Daten und wird je nach Bereich spezifiziert. 
      
            Eine datenschutzkonforme Regelung erhebt nur das Minimum an Daten. Datensparsamkeit ist einfach umzusetzen und verringert den Erfüllungsaufwand. Wenn weniger Daten vorliegen, müssen auch weniger Informationen geschützt werden. 
      
            Wenn Informationen den ihnen gebührenden Schutz erhalten, schafft das Vertrauen in den Staat. Die Gefahr von Missbrauch und negativen wirtschaftlichen oder sicherheitsrelevanten Konsequenzen wird verringert.
            
            **So wenden sie das Prinzip an**
            - Stellen Sie den Datenschutz sicher 
            - Gewährleisten Sie die Informationssicherheit
          `,
    },
    question:
      "Gewährleistet die Regelung Datenschutz und Informationssicherheit?",
    hint: "Listen Sie alle Paragraphen auf, in denen das Prinzip wichtig ist.",
    example: {
      title: "§ 2 BIPAM–ErrichtungsG (2)",
      text: dedent`
          Das Bundesinstitut nimmt Aufgaben nach Absatz 1, einschließlich der damit verbundenen Verarbeitung 
          personenbezogener Gesundheitsdaten im Umfang der jeweils einschlägigen fachrechtlichen 
          Bestimmungen, insbesondere auf folgenden Gebieten wahr: (...)

          **Erklärung:**
          - Nennt explizit die Verarbeitung personenbezogener Daten als Spezifizierung der Aufgaben von Absatz 1.
          - Konkretisiert die Art der personenbezogenen Daten (Gesundheitsdaten) und verweist darüber hinaus auf die dafür geltenden fachrechtlichen Bestimmungen.
        `,
    },
  },
];
