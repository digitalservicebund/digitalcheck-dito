import {
  GradingOutlined,
  HistoryToggleOffOutlined,
  WidgetsOutlined,
} from "@digitalservicebund/icons";
import { dedent } from "~/utils/dedentMultilineStrings";

export const fundamentalsDigitalReadiness = {
  title: "Ihr Weg zur Digitaltauglichkeit",
  subtitle:
    "Erfahren Sie hier, was Digitaltauglichkeit für Ihr Vorhaben bedeutet, welche Vorteile sie bietet, welche Vorhaben betroffen sind und wie sich der Digitalcheck nahtlos in die Phasen Ihres Regelungsentwurfs einfügt.",
  summary: {
    title: "Zusammengefasst",
    items: [
      {
        heading: {
          text: "Was ist Digitaltauglichkeit? ",
        },
        content: dedent`
          Regelungen werden vermehrt digital umgesetzt. Beispiele sind eine Gesetzesänderung, mit der ein Papierantrag durch einen Online-Antrag ersetzt wird oder eine Verordnung, die Änderungen in den IT-Verfahren nachgelagerter Behörden erfordert.  
          Damit die digitale Umsetzung reibungslos klappt, muss die Regelung digitaltauglich gestaltet sein. Das heißt erstens, dass der digitalen Umsetzung nichts im Wege steht, wie zum Beispiel das persönliche Einreichen von Dokumenten. Zweitens soll aktiv gefördert werden, dass möglichst viele Schritte von Computern durchgeführt oder unterstützt werden.
        `,
        visual: {
          Icon: WidgetsOutlined,
        },
      },
      {
        heading: {
          text: "Digitaltaugliche Regelungen sparen Ressourcen",
        },
        content:
          "Eine gute digitale Umsetzung spart langfristig Zeit und sorgt dafür, dass Ziel und Wirkung des Vorhabens erreicht werden: aufseiten der Normadressatinnen und Normadressaten und aufseiten der Verwaltung.",
        visual: {
          Icon: HistoryToggleOffOutlined,
        },
      },
      {
        heading: {
          text: "Alle Regelungsvorhaben sind betroffen",
        },
        content:
          "Der Digitalcheck gilt für alle Regelungsvorhaben (Gesetze, Verordnungen und Verwaltungsvorschriften), sowohl für neue Vorhaben als auch für Änderungen an bestehenden Regelungen.",
        visual: {
          Icon: GradingOutlined,
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
