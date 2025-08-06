import { steps } from "~/resources/content/shared/naechste-schritte";
import {
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methods = {
  title: "Erarbeiten eines digitaltauglichen Regelungsvorhabens",
  subtitle: dedent`
    Hier finden Sie passende Methoden und Werkzeuge, um Digitaltauglichkeit in Ihrer Regelung sicherzustellen. 

    Gehen Sie am besten in der vorgeschlagenen Reihenfolge vor.
  `,
  steps: {
    items: [
      {
        headline: { text: "Erfassen des Status Quo" },
        text: dedent`
          Ein solides Verständnis über den Ist-Zustand ist ein sinnvoller und sicherer Einstieg. Tauschen Sie sich mit den umsetzenden Akteurinnen und Akteuren aus. Bei dieser Gelegenheit können Sie auch nach Problemen in der aktuellen Praxis fragen.
          Wenn Sie in den Gesprächen nichts Neues mehr erfahren, haben Sie den Status Quo erfasst.
          
          **Ein Austausch über die aktuelle Praxis darf auch während des Entwurfsprozesses stattfinden.**
        `,
      },
      {
        isSubstep: true,
        label: { text: "Visualisierung" },
        headline: {
          text: "Visualisieren Sie die aktuellen Abläufe",
        },
        info: [],
        text: "Damit Ihre Regelung wirkungsvoll in die Praxis kommt, müssen Sie die aktuellen Abläufe verstehen. In diesem Schritt müssen Sie noch nicht auf geplante Neuerungen eingehen. Konzentrieren Sie sich auf den Status Quo.",
        buttons: [
          {
            text: "Anleitung zur Visualisierung",
            href: ROUTE_METHODS_TASKS_PROCESSES.url,
          },
        ],
      },
      {
        headline: { text: "Entwickeln von Digitaltauglichkeit" },
        text: "Mit einem guten Verständnis des Ist-Zustandes erarbeiten Sie nun Ihre Regelung. Jetzt geht es darum, Möglichkeiten zur Digitalisierung zu finden und Hindernisse aus dem Weg zu räumen –  eine gute digitale Umsetzung spart langfristig Zeit und Geld und erfüllt die heutigen Erwartungen der Betroffenen an den Staat.",
      },
      {
        isSubstep: true,
        label: { text: "5 Prinzipien" },
        headline: {
          text: "Finden Sie konkrete Möglichkeiten der Digitalisierung",
        },
        text: "Mit den fünf Prinzipien für Digitaltaugliche Gesetzgebung bekommen Sie auch konkrete Hinweise darauf, worauf Sie achten müssen.",
        buttons: [
          {
            text: "Prinzipien nutzen",
            href: ROUTE_METHODS_PRINCIPLES.url,
          },
        ],
      },
      {
        headline: { text: "Verfassen des Regelungsentwurfes" },
        text: dedent`
          Nun folgt der gewohnte Schreibprozess sowie die formelle Beteiligung, Abstimmungen im Haus und zwischen den Ressorts. 
          
          Die Erkenntnisse und Ergebnisse aus den vorigen Schritten helfen Ihnen dabei,  
          - Ihren **Regelungstext zu strukturieren**, insbesondere in Abschnitten, die die Umsetzung betreffen,
          - in der **Gesetzesbegründung** auf Probleme im Ist-Zustand einzugehen,
          - den **Umsetzungsprozess einfach besprechbar** zu machen in Abstimmungen anhand von Visualisierungen.
        `,
      },
      {
        isSubstep: true,
        label: { text: "Textarbeit" },
        headline: { text: "Schreiben Sie die Regelung" },
        text: dedent`
          Nutzen Sie die gewonnen Ideen, um die Regelung zu schreiben. Dafür nehmen Sie ganz einfach Ihre gewohnten Programme und Arbeitshilfen – z. B. eNorm und das Handbuch der Rechtsförmlichkeit.
        `,
      },
    ],
  },
  nextSteps: {
    title: "So machen Sie weiter",
    items: [
      steps.preCheck.finished,
      steps.methods.finished,
      steps.documentation,
      steps.nkr,
    ],
  },
  furtherMethods: {
    heading: "Weitere Methoden, die Sie nutzen können",
    content:
      "Diese Methoden haben wir aus der Reihenfolge rausgelöst. Sie können Sie zu jeder Zeit einsetzen.",
  },
  itSystems: {
    badge: "Systemverständnis",
    heading: "IT-Systeme gemeinsam erfassen",
    content:
      "Nutzen Sie das Fachwissen der Akteurinnen und Akteure, um die verwendeten IT-Systeme für die Abläufe zu erfassen und zu verstehen.",
    buttons: [
      {
        text: "IT-Landschaft verstehen",
        href: ROUTE_METHODS_COLLECT_IT_SYSTEMS.url,
      },
    ],
  },
  technicalFeasibility: {
    badge: "Expertengespräch",
    heading: "Technische Umsetzbarkeit sicherstellen",
    content:
      "Analysieren Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende sowie neue Abläufe und IT-Systeme. Damit stellen Sie die technische Machbarkeit sicher.",
    buttons: [
      {
        text: "IT-Auswirkungen prüfen",
        href: ROUTE_METHODS_TECHNICAL_FEASIBILITY.url,
      },
    ],
  },
};
