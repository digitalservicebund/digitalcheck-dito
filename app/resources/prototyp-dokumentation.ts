import { feedbackFormular } from "~/resources/content/components/feedback-formular";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const prototypeDocumentation = {
  start: {
    title: "3. Digitaltauglichkeit dokumentieren",
    subtitle:
      "Die Dokumentation der Digitaltauglichkeit ist ein formeller, letzter Schritt. Sie dokumentieren, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben, und wie sie ins Regelungsvorhaben eingeflossen sind.",
    hints: [
      {
        title: "Die Dokumentation können Sie als PDF-Datei herunterladen",
        text: "Sie können die Dokumentation am Ende als **PDF-Datei herunterladen** und per Mail an den Nationalen Normenkontrollrat (NKR) senden.",
      },
      {
        title: "Vertraulich und nur für Sie zugänglich",
        text: "Was sie eintragen, bleibt vertraulich. Ihre Eingaben werden nur genutzt, um die PDF-Datei zu erstellen. Ihre Daten werden **nicht gespeichert** oder weitergegeben. Niemand sonst kann darauf zugreifen.",
      },
      {
        title: "Nur ein Vorgang zur selben Zeit",
        text: "Sie können nur an einer Dokumentation zur selben Zeit arbeiten. Parallele Vorgänge sind momentan nicht möglich. Schließen Sie eine Dokumentation bitte vollständig ab, bevor Sie die nächste beginnen.",
      },
    ],
    buttonText: "Dokumentation starten",
    timeInvest: "**Zeitaufwand:** Was denkst du?",
    summary: {
      title: "Hinweise",
      items: [
        {
          headline: { text: "Beginnen Sie so früh wie möglich" },
          content: `Schicken Sie die begleitende Dokumentation so früh wie möglich an Ihre Ansprechperson im NKR-Sekretariat, **spätestens mit der Einleitung der Ressortabstimmung**. Fügen Sie die Dokumentation des Digitalcheck und Visualisierungen des Umsetzungsprozesses gerne auch der Ressortabstimmung bei, damit Ihre Kolleginnen und Kollegen Ihre Entscheidungen nachvollziehen können.`,
        },
        {
          headline: { text: "Das prüft der Nationale Normenkontrollrat" },
          content: `Der NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine **digital- und praxistaugliche Umsetzung** der Regelung. Sein Prüfergebnis veröffentlicht er gegebenenfalls in seinen Stellungnahmen. Wenn Sie eine Visualisierung angefertigt haben und Sie der Veröffentlichung zustimmen, kann diese an die Stellungnahme angehängt werden. Bei Fragen oder Anregungen kommt Ihre Ansprechperson im NKR-Sekretariat auf Sie zu.`,
        },
      ],
    },
  },
  nextButton: "Übernehmen & weiter",
  metaInfo: {
    headline: "Informationen zum Regelungsvorhaben",
    text: dedent`
      Tragen Sie den vorläufigen Arbeitstitel des Vorhabens ein. 

      Sie können nur an einer Dokumentation zur selben Zeit arbeiten. Parallele Vorgänge sind momentan nicht möglich. Schließen Sie eine Dokumentation bitte vollständig ab, bevor Sie die nächste beginnen.
    `,
    inputTitle: {
      label: "Vorläufiger Arbeitstitel des Vorhabens",
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
        
        [Mehr Informationen](${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#digitale-angebote-f-r-alle-nutzbar-gestalten)
      `,
      },
      question: "Ermöglicht das Regelungsvorhaben digitale Angebote für alle?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** „Online-Beratung wird ermöglicht, siehe § 1a (2)“.  
      `,
    },
    principle2: {
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
        
        [Mehr Informationen](${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#datenwiederverwendung-ben-tigt-einheitliches-recht)    
      `,
      },
      question: "Ermöglicht das Regelungsvorhaben Datenwiederverwendung?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** „Datenstandard festgeschrieben, siehe § 3a, rechtliche Voraussetzung zum Datenaustausch geschaffen, siehe § 3b“   
      `,
    },
    principle3: {
      headline: "Etablierte Technologien ermöglichen effiziente Umsetzung",
      details: {
        title: "Was steckt in dem Prinzip?",
        text: dedent`
        Digitale Angebote können schneller bereitgestellt sowie günstiger entwickelt und betrieben werden, wenn sie auf bestehenden Technologien aufbauen. Offene, standardisierte Schnittstellen und Open-Source erhöhen die Sicherheit der Angebote und fördern die Interoperabilität. 

        **So wenden Sie das Prinzip an:** 
        
        - Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen 
        - Bevorzugen Sie Open-Source-Software und offene Spezifikationen
        
        [Mehr Informationen](${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#etablierte-technologien-erm-glichen-effiziente-umsetzung)  
      `,
      },
      question:
        "Ermöglicht die Regelung die Nutzung von etablierten Technologien, Schnittstellen oder Open Source?",
      hint: dedent`
        Tragen Sie zwei bis drei Stichpunkte ein. Verweisen Sie auf die jeweiligen Paragrafen und ggf. auch auf andere anwendbare Regelungen.  
  
        **Zum Beispiel:** „Open Source und Basisdienste in § 8 festgeschrieben, werden in der Verordnung definiert“.  
    `,
    },
    principle4: {
      headline: "Automatisierung basiert auf eindeutigen Regelungen",
      details: {
        title: "Was steckt in dem Prinzip?",
        text: dedent`
          Logische und verständliche Regelungen und transparente Verfahren erleichtern den Zugang zum Recht und stärken das Vertrauen in den Staat. Einfachheit und verständliche Sprache sind durch die GGO und das Handbuch der Rechtsförmlichkeit vorgeschrieben. 
  
          Klarheit und Logik bilden die Grundlage für automatisierte Prozesse. Wenn Begriffe eindeutig definiert sowie Entscheidungsstrukturen bestimmt sind, können Regeln und klare Ausnahmen automatisiert werden. Das spart Zeit auf Seiten der Nutzenden und der Verwaltung. Mit diesen Ressourcen können kritischere Einzelfälle bearbeitet oder Normadressatinnen und -adressaten beraten werden. 
  
          **So wenden Sie das Prinzip an:** 
  
          - Beachten Sie bestehende Prozesse und Verantwortlichkeiten 
          - Nutzen Sie das Potenzial von Automatisierung 
          - Unterscheiden Sie zwischen genereller Regel, Ausnahmen und Ermessensspielräumen 
          - Schreiben Sie einfach, eindeutig und widerspruchsfrei
          
          [Mehr Informationen](${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#automatisierung-basiert-auf-eindeutigen-regelungen)    
      `,
      },
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
            
            [Mehr Informationen](${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#datenschutz-und-informationssicherheit-schaffen-vertrauen)
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
    title: "Dokumentation prüfen und senden",
    data: {
      title: "Eingaben überprüfen",
      text: `Bitte überprüfen Sie nachfolgend alle Eingaben auf ihre Richtigkeit und Vollständigkeit.`,
      buttonDownload: "Dokumentation herunterladen (PDF-Datei)",
      buttonBack: "Zurück zum Bearbeiten",
    },
    form: {
      formLegend: "Dokumentation an den NKR senden",
      instructions: dedent`
        - Laden Sie die Dokumentation als PDF-Datei herunter.
        - Senden Sie die **PDF-Datei per E-Mail** an folgende Adresse: nkr@bmj.bund.de. Der NKR prüft die methodische und inhaltliche Nachvollziehbarkeit. Bei Fragen wird der NKR auf Sie zukommen. Das Ziel ist eine **digital- und praxistaugliche Umsetzung**.
        - Bei Interoperabilitätsbezug senden Sie eine Kopie der E-Mail mit der PDF-Datei an interoperabel@digitalservice.bund.de 
        - Visuelle Darstellungen und Skizzen sind vom NKR gern gesehen. Hängen Sie diese formlos als PDF oder als Screenshot an.
        - Damit ist der Digitalcheck für Sie beendet.
      `,
      emailClientHint: {
        title: "Ihr Email-Programm wird geöffnet...",
        text: "Dies kann je nach Anwendung einen Moment dauern. Sie können diesen Hinweis jederzeit schließen, sobald sich Ihr E-Mail-Programm geöffnet hat. Sollte sich Ihr E-Mail Programm nicht öffnen, kontaktieren Sie uns unter [0151/40 76 78 39](tel:+4915140767839) oder per E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Supportanfrage:%20erarbeiten.digitalcheck.bund.de).",
      },
      faqs: {
        title: "Häufige Fragen",
        details: [
          {
            label: "Was passiert, wenn ich auf „E-Mail erstellen“ klicke?",
            text: "In Ihrem E-Mail-Programm öffnet sich eine neue E-Mail, die automatisch an den NKR adressiert ist. Sie haben die Möglichkeit, den Text und Empfänger individuell anzupassen. Bitte hängen sie selbst die Dokumentation und ggf. Visualisierungen als PDF-Dateien an. Den Zeitpunkt des Versands wählen Sie selbst.",
          },
          {
            label: "Werden meine Eingaben vertraulich behandelt?",
            text: "Was sie eingetragen haben, bleibt vertraulich. Ihre Eingaben werden nur genutzt, um die PDF-Datei zu erstellen. Ihre Daten werden nicht gespeichert oder weitergegeben. Niemand sonst kann darauf zugreifen.",
          },
        ],
      },
      copyAddressButton: {
        text: "Empfängeradresse kopieren",
        textCopied: "Adresse kopiert!",
      },
      sendEmailButton: {
        text: "E-Mail erstellen",
      },
      emailTemplate: {
        toNkr: "nkr@bmj.bund.de",
        toDC: "inter operabel@digitalservice.bund.de",
        subject: "Digitalcheck Dokumentation",
        body: dedent`
          Guten Tag,
          
          anbei erhalten Sie die Digitalcheck Dokumentation zu meinem Regelungsvorhaben.
          
          Mit freundlichen Grüßen
          
          *Diese E-Mail wurde automatisch erstellt.*
        `,
      },
      downloadStarted: "Dokumentation wird heruntergeladen",
    },
    feedbackForm: {
      heading: feedbackFormular.heading,
      trackingEvent: "Feedback Dokumentation Abschluss",
      questions: [
        {
          id: "simple-feedback",
          trackingEvent: "wie-einfach",
          text: "Wie einfach oder schwierig war der Prozess der Dokumentation für Sie?",
          options: feedbackFormular.optionsSimple,
        },
      ],
      contact:
        "Schreiben Sie uns eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Feedback:%20erarbeiten.digitalcheck.bund.de), wenn wir Sie für Feedback zu unserem Service kontaktieren dürfen.",
      button: feedbackFormular.button,
      success: feedbackFormular.success,
    },
  },
};
