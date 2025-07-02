import { feedbackFormular } from "~/resources/content/shared/feedback-formular";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const prototypeDocumentation = {
  start: {
    title: "3. Digitaltauglichkeit dokumentieren",
    subtitle:
      "Die Dokumentation der Digitaltauglichkeit ist ein formeller, letzter Schritt. Sie dokumentieren, auf welche Aspekte der Digitaltauglichkeit Sie besonders geachtet haben, und wie sie ins Regelungsvorhaben eingeflossen sind.",
    hints: [
      {
        title: "So funktioniert es",
        text: "Dieses Online Formular führt Sie durch die fünf Prinzipien der Digitaltauglichkeit. Daraus wird die Dokumentation für den Nationalen Normenkontrollrat (NKR) generiert. Diese können Sie dann als PDF-Datei herunterladen, ablegen und schlussendlich beim NKR einreichen.",
      },
      {
        title: "Vertraulich und nur für Sie zugänglich",
        text: "Was sie eintragen, bleibt vertraulich. Ihre Eingaben werden nur genutzt, um die PDF-Datei zu erstellen. Ihre Daten werden **nicht gespeichert** oder weitergegeben. Niemand sonst kann darauf zugreifen.",
      },
      {
        title: "Nur ein Vorgang zur selben Zeit",
        text: "Sie können nur an einer Dokumentation zur selben Zeit arbeiten. Parallele Vorgänge sind momentan nicht möglich. Schließen Sie eine Dokumentation bitte vollständig ab, bevor Sie die nächste beginnen. Ihre Daten werden nicht dauerhaft gespeichert.",
      },
    ],
    multipleNotice: {
      headline: "Eine oder mehrere Dokumentationen?",
      content:
        "Füllen Sie eine gemeinsame Dokumentation für alle inhaltlich zusammenhängenden Regelungen eines Vorhabens aus. So viele wie nötig, so wenige wie möglich. Bitte beachten Sie, dass parallele Vorgänge momentan nicht möglich sind.",
    },
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
      Tragen Sie den Titel des Regelungsvorhaben bzw. den Namen der Regelung ein. 

      Sie können nur an einer Dokumentation zur selben Zeit arbeiten. Parallele Vorgänge sind momentan nicht möglich. Schließen Sie eine Dokumentation bitte vollständig ab, bevor Sie die nächste beginnen. Ihre Daten werden nicht dauerhaft gespeichert.
    `,
    inputTitle: {
      label: "Titel des Regelungsvorhabens",
    },
  },
  participation: {
    headline: "Praxistaugliche Umsetzung",
    textIntro: dedent`
      Ihr Regelungsvorhaben soll den Bedürfnissen der Betroffenen entsprechen. Die Anforderungen der umsetzenden Akteurinnen und Akteure sollen Sie ebenfalls berücksichtigen. Dafür müssen Sie sich mit den Beteiligten austauschen.
      
      Bitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.  

      **Zum Beispiel:** frühzeitige Befragung von Bürgerinnen und Bürgern, Gespräche mit Vollzugsakteurinnen und -akteuren oder Expertinnen und Experten, formelle Beteiligungsverfahren. 
      `,
    textfieldParticipationLabel: "Austauschformate:",
    textResults: dedent`
      Was haben Sie aus dem Austausch mit den Beteiligten mitgenommen? 
      Bitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden. 
      Paragrafen, die besonders umsetzungsrelevant sind, können Sie kopieren und hier einfügen.
      
      **Zum Beispiel:**
      Aus Gesprächen mit Mitarbeitenden der Hauptzollämter gelernt: Das aktuelle, papierbasierte Antragsverfahren wird unter großem Aufwand am Laufen gehalten. Angesichts einer erwarteten Vervielfachung der Antragszahlen würde dies zu einer drohenden Überlastung führen. 
      Auf Basis dieser Erkenntnis wurde entschieden, eine Online-Antragspflicht zwei Jahre früher als geplant einzuführen, um die Bearbeitung zu digitalisieren, manuelle Schritte zu reduzieren und die Prüfenden zu entlasten. 
      Für Details lesen Sie gerne den <a href="https://digitalservice.bund.de/blog/aktuelles-beispiel-fuer-digitaltaugliche-regelungen-das-stromsteuerrecht" target="_blank">Blog-Artikel</a>.
    `,
    textfieldResultsLabel: "Eingearbeitete Erkenntnisse:",
  },
  principles: {
    radioOptions: ["Ja", "Teilweise", "Nein", "Nicht relevant"],
    textfieldExplanationLabel: "Erklärung:",
    inputs: {
      paragraph: {
        label: "Referenz (Paragraphen oder Artikel):",
      },
      text: {
        label: "Entsprechender Regelungstext hier einfügen:",
      },
      explanation: {
        label: "Erklärung:",
      },
    },
    principle1: {
      id: "prinzip-1",
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
        
        <a href="${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#digitale-angebote-f-r-alle-nutzbar-gestalten" target="_blank">Mehr Informationen</a>
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
    principle2: {
      id: "prinzip-2",
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
        
        <a href="${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#datenwiederverwendung-ben-tigt-einheitliches-recht" target="_blank">Mehr Informationen</a>    
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
    principle3: {
      id: "prinzip-3",
      headline: "Etablierte Technologien ermöglichen effiziente Umsetzung",
      details: {
        title: "Was steckt in dem Prinzip?",
        text: dedent`
        Digitale Angebote können schneller bereitgestellt sowie günstiger entwickelt und betrieben werden, wenn sie auf bestehenden Technologien aufbauen. Offene, standardisierte Schnittstellen und Open-Source erhöhen die Sicherheit der Angebote und fördern die Interoperabilität. 

        **So wenden Sie das Prinzip an:** 
        
        - Ermöglichen Sie die Nutzung etablierter, öffentlicher Lösungen 
        - Bevorzugen Sie Open-Source-Software und offene Spezifikationen
        
        <a href="${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#etablierte-technologien-erm-glichen-effiziente-umsetzung" target="_blank">Mehr Informationen</a>  
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
    principle4: {
      id: "prinzip-4",
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
          
          <a href="${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#automatisierung-basiert-auf-eindeutigen-regelungen" target="_blank">Mehr Informationen</a>    
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
    principle5: {
      id: "prinzip-5",
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
            
            <a href="${ROUTE_FUNDAMENTALS_PRINCIPLES.url}#datenschutz-und-informationssicherheit-schaffen-vertrauen" target="_blank">Mehr Informationen</a>
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
  },
  result: {
    title: "Dokumentation abschließen",
    data: {
      title: "Eingaben überprüfen",
      text: `Bitte überprüfen Sie nachfolgend alle Eingaben auf ihre Richtigkeit und Vollständigkeit.`,
      dummyOverview: dedent`
        ### Informationen zum Regelungsvorhaben
         
        **Vorläufiger Arbeitstitel des Vorhabens:** Elektronischer Rechtsverkehr mit dem Bundesverfassungsgericht – BVerfGG
        <br/><br/>
        [Bearbeiten](/prototyp/dokumentation/meta)
        <br/><br/>
        ### Praxistaugliche Umsetzung
        
        **Austauschformate:** Umfragen und Einzelgespräche mit Akteurinnen und Akteuren, formelles Beteiligungsverfahren
        <br/><br/>
        **Eingearbeitete Erkenntnisse:** Durch die Gespräche wurde herausgefunden, dass eine ausschließlich digitale 
        Übertragung vorgeschrieben werden kann.
        <br/><br/>
        [Bearbeiten](/prototyp/dokumentation/beteiligung)
        <br/><br/>
        ### Prinzip: Digitale Angebote für alle nutzbar gestalten
        
        **Erfüllt:** Ja
        <br/><br/>
        **§ 23a BVerfGG (1)** 
        
        Schriftlich einzureichende Anträge und Erklärungen sowie sonstige Schriftsätze und deren 
        Anlagen können nach Maßgabe der folgenden Absätze als elektronische Dokumente beim Bundesverfassungsgericht 
        eingereicht werden.
        <br/><br/>
        **Erklärung:** Ermöglicht elektronisches Einreichen der Dokumente.
        <br/><br/>
        **§ 23b BVerfGG (1)**
        
        Soweit die handschriftliche Unterzeichnung durch den Richter, den Rechtspfleger oder den Urkundsbeamten der 
        Geschäftsstelle vorgeschrieben ist, genügt dieser Form die Aufzeichnung als elektronisches Dokument, wenn 
        die verantwortenden Personen am Ende des Dokuments ihren Namen hinzufügen und das Dokument mit einer 
        qualifizierten elektronischen Signatur versehen. Der in Satz 1 genannten Form genügt auch ein elektronisches 
        Dokument, in welches das handschriftlich unterzeichnete Schriftstück gemäß § 23e Absatz 2 Satz 4 übertragen 
        worden ist.
        <br/><br/>
        **Erklärung:** Verhindert einen Medienbruch und erhöht die Nutzerfreundlichkeit durch das Ermöglichen von 
        Alternativen zur handschriftlichen Unterzeichnung.
        <br/><br/>
        [Bearbeiten](/prototyp/dokumentation/prinzip-1)
        <br/><br/>
        ### Prinzip: Datenwiederverwendung benötigt einheitliches Recht
        
        **Erfüllt:** Ja
        <br/><br/>
        **§ 23a BVerfGG (2)**
        
        Das elektronische Dokument muss für die Bearbeitung durch das Bundesverfassungsgericht geeignet sein. 
        Für die Übermittlung und die Eignung zur Bearbeitung durch das Bundesverfassungsgericht gelten die in 
        der Elektronischer-Rechtsverkehr-Verordnung geregelten technischen Rahmenbedingungen des elektronischen 
        Rechtsverkehrs entsprechend.
        <br/><br/>
        **Erklärung:** Begünstigt eine effiziente technische Umsetzung, indem es die Nutzung oder Wiederverwendung 
        eines geeigneten Datenstandards vorschreibt.
        <br/><br/>
        Verweist mit der Elektronischer-Rechtsverkehr-Verordnung auf eine Regelung, die technische und rechtliche 
        Aspekte zentral steuert.
        <br/><br/>
        [Bearbeiten](/prototyp/dokumentation/prinzip-2)
        <br/><br/>
        ### Prinzip: Etablierte Technologien ermöglichen effiziente Umsetzung
        
        **Erfüllt:** Nicht relevant
        <br/><br/>
        [Bearbeiten](/prototyp/dokumentation/prinzip-3)
        <br/><br/>
        ### Prinzip: Automatisierung basiert auf eindeutigen Regelungen
        
        **Erfüllt:** Ja
        <br/><br/>
        **§ 23a BVerfGG (5)**
        
        Ein elektronisches Dokument ist eingegangen, sobald es auf der für den Empfang bestimmten Einrichtung 
        des Bundesverfassungsgerichts gespeichert ist. Dem Absender ist eine automatisierte Bestätigung über den 
        Zeitpunkt des Eingangs zu erteilen.
        <br/><br/>
        **Erklärung:** Entlastet die Verwaltung durch automatische Bestätigungen; eine Funktionalität, die von 
        Nutzenden erwartet wird.
        <br/><br/>
        [Bearbeiten](/prototyp/dokumentation/prinzip-4)
        <br/><br/>
        ### Prinzip: Datenschutz und Informationssicherheit schaffen Vertrauen
        
        **Erfüllt:** Ja
        <br/><br/>
        **§ 23a BVerfGG(3)**
        
        Das elektronische Dokument muss mit einer qualifizierten elektronischen Signatur der verantwortenden 
        Person versehen sein oder von der verantwortenden Person signiert und auf einem sicheren 
        Übermittlungsweg eingereicht werden.
        <br/><br/>
        **Erklärung:** Steigert den Schutz vor Fälschungen durch Verwendung eines geeigneten kryptografischen 
        Verfahrens (qualifizierte elektronische Signatur).
        <br/><br/>
        Führt zu erhöhter Informationssicherheit durch die Nutzung eines sicheren Übermittlungsweges (siehe Absatz 3). 
        Dies schützt die Daten vor Veränderung und unerlaubter Einsicht während der Übertragung.
        <br/><br/>
        [Bearbeiten](/prototyp/dokumentation/prinzip-5)
      `,
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
          {
            label: "Kann ich die Dokumentation später überarbeiten?",
            text: "Ihre Eingaben in diesem Formular werden nicht dauerhaft gespeichert. Wenn Sie die Inhalte überarbeiten wollen, können Sie den aktuellen Stand aus der PDF-Datei kopieren und ins Formular einfügen.",
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
          text: "Die Dokumentation ist einfach zu nutzen.",
          options: [
            { label: "Ich stimme gar nicht zu", value: 1 },
            { label: "Schwierig", value: 2 },
            { label: "Moderat", value: 3 },
            { label: "Einfach", value: 4 },
            { label: "Ich stimme voll und ganz zu", value: 5 },
          ],
        },
        {
          id: "simple-feedback",
          trackingEvent: "wie-einfach",
          text: "Die Dokumentation ist hilfreich für das Erarbeiten meines Regelungsvorhabens.",
          options: [
            { label: "Ich stimme gar nicht zu", value: 1 },
            { label: "Schwierig", value: 2 },
            { label: "Moderat", value: 3 },
            { label: "Einfach", value: 4 },
            { label: "Ich stimme voll und ganz zu", value: 5 },
          ],
        },
        {
          id: "simple-feedback",
          trackingEvent: "wie-einfach",
          text: "Die Dokumentation ist hilfreich für die Umsetzung meines Regelungsvorhabens.",
          options: [
            { label: "Ich stimme gar nicht zu", value: 1 },
            { label: "Schwierig", value: 2 },
            { label: "Moderat", value: 3 },
            { label: "Einfach", value: 4 },
            { label: "Ich stimme voll und ganz zu", value: 5 },
          ],
        },
      ],
      contact:
        "Schreiben Sie uns eine E-Mail an [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de?subject=Feedback:%20erarbeiten.digitalcheck.bund.de), wenn wir Sie für Feedback zu unserem Service kontaktieren dürfen.",
      button: feedbackFormular.button,
      success: feedbackFormular.success,
    },
  },
};
