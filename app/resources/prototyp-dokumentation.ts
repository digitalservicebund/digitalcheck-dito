import { steps } from "~/resources/content/components/naechste-schritte";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const prototypeDocumentation = {
  start: {
    title: "3. Dokumentieren der Digitaltauglichkeit",
    subtitle:
      "Sie dokumentieren in einem Fragebogen, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben. Und wie Sie diese in Ihr Regelungsvorhaben einfließen lassen.",
    buttonText: "Dokumentation starten",
    summary: {
      title: "Zusammengefasst",
      items: [
        {
          headline: { text: "Beginnen Sie so früh wie möglich" },
          content: `Schicken Sie die begleitende Dokumentation so früh wie möglich an Ihre Ansprechperson im NKR-Sekretariat, **spätestens mit der Einleitung der Ressortabstimmung**. Fügen Sie die Dokumentation des Digitalcheck und Visualisierungen des Umsetzungsprozesses gerne auch der Ressortabstimmung bei, damit Ihre Kolleginnen und Kollegen Ihre Entscheidungen nachvollziehen können.`,
        },
        {
          headline: { text: "Das prüft der Nationale Normenkontrollrat" },
          content: `Der NKR prüft das Regelungsvorhaben auf Möglichkeiten der digitalen Umsetzung auf Basis des von Ihnen durchgeführten Digitalcheck. Das wesentliche Prüfkriterium ist die methodische und inhaltliche Nachvollziehbarkeit. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu.`,
        },
      ],
    },
    nextSteps: {
      title: "So machen Sie weiter",
      items: [
        steps.preCheck.finished,
        steps.methods.finished,
        steps.documentation.finished,
        steps.nkrFinal,
      ],
    },
  },
  nextButton: "Übernehmen & weiter",
  overview: {
    headline: "Übersicht",
    text: dedent`
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      
      Die folgenden Schritte erwarten Sie:
      
      - Schritt 1 
      - Schritt 2
      - Schritt 3
      `,
  },
  metaInfo: {
    headline: "Informationen zum Regelungsvorhaben",
    text: dedent`
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptu.
      `,
    inputTitle: {
      label: "Vorläufiger Arbeitstitel des Vorhabens",
    },
    inputRessort: {
      label: "Ressort",
    },
    inputContact: {
      label: "Ansprechperson im Ressort",
    },
  },
  participation1: {
    headline:
      "Wie haben Sie geprüft, ob die Umsetzung des Regelungsvorhabens den Bedürfnissen der Betroffenen und den Anforderungen in der Umsetzung entsprechen wird?",
    text: dedent`
      Bitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.  

      **Zum Beispiel:** frühzeitige Befragung von Bürgerinnen und Bürgern, Gespräche mit Vollzugsakteurinnen und -akteuren oder Expertinnen und Experten, formelle Beteiligungsverfahren. 
      `,
    textfieldExplanationLabel: "Dokumentieren Sie:",
  },
  participation2: {
    headline:
      "Wie spiegeln sich die Erkenntnisse, die durch die oben genannten Schritte gewonnen wurden, im Regelungsvorhaben wider?",
    text: dedent`
      Bitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die besonders umsetzungsrelevant sind.  
      `,
    textfieldExplanationLabel: "Dokumentieren Sie:",
  },
  principles: {
    radioOptions: ["Ja", "Nein", "Teilweise", "Nicht relevant"],
    textfieldExplanationLabel: "Erklärung:",
    principle1: {
      headline: "Digitale Angebote für alle nutzbar gestalten",
      text: dedent`
        [Prinzip: Digitale Angebote für alle nutzbar gestalten](${ROUTE_FUNDAMENTALS_PRINCIPLES.url})
        
        Viele Bürgerinnen, Bürger und Unternehmen sind an digitale Angebote gewöhnt und bevorzugen diese – sofern die digitale Kommunikation gut umgesetzt ist und ihren Bedürfnissen entspricht. Die Verwaltung kann digitale Daten schneller prüfen, bearbeiten und dokumentieren. Das Angebot sollte dabei immer inklusiv sein und es benötigt ggf. analoge Alternativen.
        
        **So wenden Sie das Prinzip an:** 
  
        - Ermöglichen Sie digitale Kommunikation 
        - Formulieren Sie die Regelung technologieoffen 
        - Denken Sie an Antragsstellung, Bearbeitung und Bescheid 
        - Denken Sie Barrierefreiheit von Anfang an mit 
        - Stellen Sie eine nutzerfreundliche Umsetzung sicher   
      `,
      question: "Ermöglicht das Regelungsvorhaben digitale Angebote für alle?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** „Online-Beratung wird ermöglicht, siehe § 1a (2)“.  
      `,
    },
    principle2: {
      headline: "Datenwiederverwendung benötigt einheitliches Recht",
      text: dedent`
        [Prinzip: Datenwiederverwendung benötigt einheitliches Recht](${ROUTE_FUNDAMENTALS_PRINCIPLES.url})
        
        Normadressatinnen und -adressaten sowie umsetzende Behörden sparen Kosten und Zeit, wenn das Once-Only-Prinzip konsequent angewendet wird – also wenn Daten nur einmal angegeben und dann wiederverwendet werden. Die Grundlage dafür sind harmonisierte Rechtsbegriffe, ein datenschutzkonformer Austausch und die Berücksichtigung etablierter technischer Standards. 
  
        **So wenden Sie das Prinzip an:** 
  
        - Nutzen Sie harmonisierte Rechtsbegriffe 
        - Nutzen Sie existierende Daten 
        - Machen Sie erhobene Daten für andere nutzbar 
        - Nutzen Sie bestehende technische Standards 
        - Suchen Sie frühzeitig den Austausch mit allen Beteiligten    
      `,
      question: "Ermöglicht das Regelungsvorhaben Datenwiederverwendung?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** „Datenstandard festgeschrieben, siehe § 3a, rechtliche Voraussetzung zum Datenaustausch geschaffen, siehe § 3b“   
      `,
    },
    principle3: {
      headline: "Etablierte Technologien ermöglichen effiziente Umsetzung",
      text: dedent`
        [Prinzip: Etablierte Technologien ermöglichen effiziente Umsetzung](${ROUTE_FUNDAMENTALS_PRINCIPLES.url})
        
        Digitale Angebote können schneller bereitgestellt sowie günstiger entwickelt und betrieben werden, wenn sie auf bestehenden Technologien aufbauen. Offene, standardisierte Schnittstellen und Open-Source erhöhen die Sicherheit der Angebote und fördern die Interoperabilität. 

        **So wenden Sie das Prinzip an:** 
        
        - Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen 
        - Bevorzugen Sie Open-Source-Software und offene Spezifikationen  
      `,
      question:
        "Ermöglicht die Regelung die Nutzung von etablierten Technologien, Schnittstellen oder Open Source?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** „Open Source und Basisdienste in § 8 festgeschrieben, werden in der Verordnung definiert“.  
    `,
    },
    principle4: {
      headline: "Automatisierung basiert auf eindeutigen Regelungen",
      text: dedent`
        [Prinzip: Automatisierung basiert auf eindeutigen Regelungen](${ROUTE_FUNDAMENTALS_PRINCIPLES.url})
        
        Logische und verständliche Regelungen und transparente Verfahren erleichtern den Zugang zum Recht und stärken das Vertrauen in den Staat. Einfachheit und verständliche Sprache sind durch die GGO und das Handbuch der Rechtsförmlichkeit vorgeschrieben. 

        Klarheit und Logik bilden die Grundlage für automatisierte Prozesse. Wenn Begriffe eindeutig definiert sowie Entscheidungsstrukturen bestimmt sind, können Regeln und klare Ausnahmen automatisiert werden. Das spart Zeit auf Seiten der Nutzenden und der Verwaltung. Mit diesen Ressourcen können kritischere Einzelfälle bearbeitet oder Normadressatinnen und -adressaten beraten werden. 

        **So wenden Sie das Prinzip an:** 

        - Beachten Sie bestehende Prozesse und Verantwortlichkeiten 
        - Nutzen Sie das Potenzial von Automatisierung 
        - Unterscheiden Sie zwischen genereller Regel, Ausnahmen und Ermessensspielräumen 
        - Schreiben Sie einfach, eindeutig und widerspruchsfrei    
      `,
      question:
        "Ist die Regelung so eindeutig formuliert, dass Automatisierung möglich ist?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** Zum Beispiel: „Ausnahmen klar definiert, siehe § 4; auf bestehenden Prozessen aufgesetzt, siehe Visualisierung im Anhang“.   
    `,
    },
    principle5: {
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
            
            [Mehr Informationen](${ROUTE_FUNDAMENTALS_PRINCIPLES.url})
          `,
      },
      question:
        "Gewährleistet die Regelung Datenschutz und Informationssicherheit?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** „Bedingungen für die Verwendung von Kontaktdaten, siehe § 1a (2)”.  
    `,
    },
  },
  result: {
    title: "Dokumentation abschließen",
    data: {
      title: "Eingaben überprüfen",
      text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`,
    },
  },
};
