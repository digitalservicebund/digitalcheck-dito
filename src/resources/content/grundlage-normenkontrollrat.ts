import { dokumentation, vorpruefung } from "@/config/routes";
import { dedent } from "@/utils/dedentMultilineStrings";
import { ZFL_BASE_URL, ZFL_PATH_VISUALISIERUNGEN } from "../constants";

export const fundamentalsNKR = {
  title:
    "Die Rolle des Nationalen Normenkontrollrats im Rahmen des Digitalcheck",
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
    items: [
      dedent`
        Ergebnis der [Vorprüfung](${vorpruefung.path}) als E-Mail
        - **Inhalt:**<br />Einschätzung zur Digitaltauglichkeit des Vorhabens
        - **Relevanz für den NKR:**<br />frühe Kenntnisnahme der zu überprüfenden Vorhaben
        `,
      dedent`
        [Dokumentation](${dokumentation.path}) der Digitaltauglichkeit
        - **Inhalt:**<br />Dokumentation der Digitaltauglichkeit, etwa durch die Nutzung der Prinzipien digitaltauglicher Gesetzgebung und von Visualisierungen
        - **Relevanz für den NKR:**<br />Prüfung, inwieweit die Digitalisierung bei der Erarbeitung von Ihres Vorhabes mitgedacht wird.
        `,
      dedent`
        Ihr Regelungsvorhaben
        - **Inhalt:**<br />Regelungstext für die Ressortabstimmung
        - **Relevanz für den NKR:**<br />Prüfung der Vorhaben auf digitale Umsetzbarkeit und Erfüllungsaufwand
        `,
    ],
  },
  visualization: {
    infoBox1: {
      heading: "Visualisierung für bessere Gesetzgebung",
      content: dedent`
        Visualisierungen sind ein wichtiger Bestandteil der **Dokumentation**. Sie machen Abläufe und Prozesse von Regelungen nachvollziehbar und zeigen, wie gut diese digital umsetzbar sind.
        
        Auch wenn Visualisierungen nicht verpflichtend sind, **erleichtern und beschleunigen** sie die NKR-Prüfung Ihres Vorhabens.

        [Mehr zu Visualisierungen](${ZFL_BASE_URL + ZFL_PATH_VISUALISIERUNGEN})
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
};
