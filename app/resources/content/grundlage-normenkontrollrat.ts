import {
  FactCheckTwoTone,
  FileCopyTwoTone,
  InsertDriveFileTwoTone,
} from "@digitalservicebund/icons/index";
import { dedent } from "~/utils/dedentMultilineStrings";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_PRECHECK,
} from "../staticRoutes";

export const fundamentalsNKR = {
  title:
    "Die Rolle des Nationalen Normenkontrollrats im Rahmen des Digitalcheck ",
  subtitle:
    "Alles zu den Aufgaben und der Vorgehensweise des Nationalen Normenkontrollrats (NKR) im Kontext des Digitalcheck",
  summary: {
    items: [
      {
        heading: {
          text: "Was sind die Aufgaben des NKR im Rahmen des Digitalcheck?",
        },
        content: dedent`
          Der NKR hat den [gesetzlichen Auftrag](https://www.gesetze-im-internet.de/nkrg/__4.html), sicherzustellen, dass Digitalisierung bei der Ausarbeitung von Gesetzesentwürfen berücksichtigt wird.
          
          Seit April 2023 fließen die Ergebnisse und Bewertungen des Digitalchecks in die Stellungnahmen des NKR ein und sind [öffentlich einsehbar](https://www.normenkontrollrat.bund.de/Webs/NKR/DE/veroeffentlichungen/nkr-stellungnahmen/nkr-stellungnahmen_node.html).
          
          **Beachten Sie:** 
          - Der NKR prüft die Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung, jedoch nicht die Erfüllung von Anforderungen der EU-Interoperabilität nach der EU-Verordnung. 
          - Es erfolgt nicht zu jedem Regelungsvorhaben eine Stellungnahme des NKR.
          
          Bei weiteren Fragen wenden Sie sich bitte an die [zuständigen Ansprechpartnerinnen und Ansprechpartner](https://www.normenkontrollrat.bund.de/Webs/NKR/DE/der-nkr/sekretariat/sekretariat_node.html) in Ihrem Haus.
        `,
      },
      {
        heading: {
          text: "Relevante Dokumente für den NKR",
        },
        content: dedent`
          Der Digitalcheck unterstützt die Bundesministerien dabei, bereits in der frühen Phase eines Regelungsvorhabens den Digitalbezug zu identifizieren und anschließend die Digitaltauglichkeit sicherzustellen. Zum Einsatz kommen dabei unter anderem Prinzipien für digitaltaugliche Regelungen sowie Visualisierungen zur Umsetzung.
        `,
      },
    ],
  },
  NKRConsiderations: {
    title: "Der NKR **betrachtet unter anderem** in diesem Kontext:",
    items: [
      {
        icon: FactCheckTwoTone,
        content: dedent`
          Ergebnis der [Vorprüfung](${ROUTE_PRECHECK.url}) als E-Mail
          - **Inhalt:**<br />Einschätzung zur Digitaltauglichkeit des Vorhabens
          - **Relevanz für den NKR:**<br />frühe Kenntnisnahme der zu überprüfenden Vorhaben
        `,
      },
      {
        icon: InsertDriveFileTwoTone,
        content: dedent`
          [Dokumentation](${ROUTE_DOCUMENTATION.url}) der Digitaltauglichkeit
          - **Inhalt:**<br />Dokumentation der Digitaltauglichkeit, etwa durch die Nutzung der Prinzipien digitaltauglicher Gesetzgebung und von Visualisierungen
          - **Relevanz für den NKR:**<br />Prüfung, inwieweit die Digitalisierung bei der Erarbeitung von Ihres Vorhabes mitgedacht wird.
        `,
      },
      {
        icon: FileCopyTwoTone,
        content: dedent`
          Ihr Regelungsvorhaben
          - **Inhalt:**<br />Regelungstext für die Ressortabstimmung
          - **Relevanz für den NKR:**<br />Prüfung der Vorhaben auf digitale Umsetzbarkeit und Erfüllungsaufwand
        `,
      },
    ],
  },
  visualization: {
    infoBox1: {
      heading: "Visualisierung für bessere Gesetzgebung",
      content: dedent`
        Visualisierungen sind ein wichtiger Bestandteil der **Dokumentation**. Sie machen Abläufe und Prozesse von Regelungen nachvollziehbar und zeigen, wie gut diese digital umsetzbar sind.
        
        Auch wenn Visualisierungen nicht verpflichtend sind, **erleichtern und beschleunigen** sie die NKR-Prüfung Ihres Vorhabens.

        [Mehr zu Visualisierungen](${ROUTE_EXAMPLES_VISUALISATIONS.url})
      `,
    },
    infoBox2: {
      heading:
        "Leitfragen und Kriterien für eine ideale Visualisierung Ihres Vorhabens:",
      content: dedent`
        - Hilft die Visualisierung dabei, den Regelungsinhalt **besser zu verstehen**?
        - Ist die Visualisierung **verständlich und lesbar**? 
        - Sind die **Quellen** der Visualisierung korrekt **angegeben**? 
      `,
    },
  },
  // Still needed?
  policyMaking: {
    heading: {
      text: "Wie funktioniert der Digitalcheck als Prozessbegleitung bei Ihrer Regelungsarbeit?",
    },
    content:
      "Der Digitalcheck begleitet Sie in den unterschiedlichen Phasen Ihrer Regelungsarbeit mit passenden Methoden und Werkzeugen, um Digitaltauglichkeit herzustellen.",
  },
  phases: {
    heading: {
      text: "So setzen Sie den Digitalcheck in den Phasen Ihres Vorhabens ein",
    },
    content:
      "Die untenstehende Service Landschaft bildet den Entstehungsprozess ab, den Gesetze von der Interessensermittlung bis zum Vollzug durchlaufen. Sie zeigt, wann und wie der Digitalcheck in den unterschiedlichen Phasen zum Einsatz kommt. Der Fokus liegt dabei auf der ministeriellen Gesetzesvorbereitung bis zur Kabinettvorlage.",
  },
  phasesImage: {
    img: {
      url: "/images/ablaufdiagramm-v3-deutsch.jpg",
      alternativeText:
        "Flussdiagramm, das drei Pfade nach einer Vorprüfung zum Digitalbezug zeigt: 1. Kein Digitalbezug: Ergebnis-E-Mail. 2. Digitalbezug: E-Mail, Anleitung, Dokumentation, Prüfung. 3. Digitalbezug & Interoperabilität: E-Mail an zwei Stellen, Anleitung mit Support, Dokumentation, Bereitstellung auf EU-Portal.",
      caption: dedent`
        Digitalcheck Service Landschaft:  
        Sie zeigt, wie der Digitalcheck in die Phasen des Regelungsentwurfs integriert ist.
      `,
    },
    plausibleEventName: "Content.Process+Vis",
  },
};
