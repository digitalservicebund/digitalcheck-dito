import {
  FactCheckOutlined,
  ManageSearchOutlined,
} from "@digitalservicebund/icons";
import { ROUTE_DOCUMENTATION, ROUTE_PRECHECK } from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const fundamentalsNKR = {
  title:
    "Die Rolle des Nationalen Normenkontrollrat im Rahmen des Digitalcheck ",
  subtitle:
    "Alles zu den Aufgaben und der Vorgehensweise des Nationalen Normenkontrollrat (NKR) im Kontext des Digitalcheck",
  summary: {
    items: [
      {
        heading: {
          text: "Was sind die Aufgaben des NKR im Rahmen des Digitalcheck?",
        },
        content: dedent`
          Der NKR hat den [gesetzlichen Auftrag](https://www.gesetze-im-internet.de/nkrg/__4.html), sicherzustellen, dass Digitalisierung bei der Ausarbeitung von Gesetzentwürfen berücksichtigt wurde.
          <br/><br/>
          
          Seit April 2023 fließen die Ergebnisse und Bewertungen des Digitalchecks in die Stellungnahmen des NKR ein und sind [öffentlich einsehbar](https://www.normenkontrollrat.bund.de/Webs/NKR/DE/veroeffentlichungen/nkr-stellungnahmen/nkr-stellungnahmen_node.html).
          <br/><br/>
          
          **Beachten Sie:** 
          - Der NKR prüft die Berücksichtigung der Prinzipien digitaltauglicher Gesetzgebung, jedoch nicht die Erfüllung von Anforderungen der EU-Interoperabilität nach der EU Verordnung. 
          - Es erfolgt nicht zu jedem Regelungsvorhaben eine Stellungnahme des NKR.
          <br/>
          
          Bei weiteren Fragen wenden Sie sich bitte an die [zuständigen Ansprechpartnerinnen und Ansprechpartner](https://www.normenkontrollrat.bund.de/Webs/NKR/DE/der-nkr/sekretariat/sekretariat_node.html) in Ihrem Haus.
        `,
        visual: {
          Icon: ManageSearchOutlined,
        },
      },
      {
        heading: {
          text: "Relevante Dokumente für den NKR",
        },
        content: dedent`
          Der Digitalcheck unterstützt die Bundesministerien dabei, bereits in der frühen Phase eines Regelungsvorhabens den Digitalbezug zu identifizieren und anschließend die Digitaltauglichkeit sicherzustellen. Zum Einsatz kommen dabei unter anderem Prinzipien für digitaltaugliche Regelungen sowie Visualisierungen zur Umsetzung.
          <br/><br/>
          
          Der NKR **betrachtet** in diesem Kontext:
          <br/><br/>
          
          - Ergebnis der [Vorprüfung](${ROUTE_PRECHECK.url}) als E-Mail
            - **Inhalt:** Einschätzung zur Digitaltauglichkeit des Vorhabens
            - **Relevanz für den NKR:** frühe Kenntnisnahme der zu überprüfenden Vorhaben
          <br/>
          
          - [Dokumentation der Digitaltauglichkeit](${ROUTE_DOCUMENTATION.url}) 
            - **Inhalt:** Dokumentation der Digitaltauglichkeit, etwa durch die Nutzung der Prinzipien digitaltauglicher Gesetzgebung und von Visualisierungen
            - **Relevanz für den NKR:** Prüfung inwieweit die Digitalisierung bei der Erarbeitung von Ihres Vorhabens mitgedacht wurde.
        `,
        visual: {
          Icon: FactCheckOutlined,
        },
      },
    ],
  },
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
