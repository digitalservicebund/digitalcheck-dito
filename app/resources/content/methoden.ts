import { feedbackFormular } from "~/resources/content/components/feedback-formular";
import { steps } from "~/resources/content/components/naechste-schritte";
import {
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_TASKS_PROCESSES,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methods = {
  title: "Erarbeiten eines digitaltauglichen Regelungsvorhabens",
  subtitle: dedent`
    Hier finden Sie passende Methoden und Werkzeuge, um Digitaltauglichkeit in Ihrer Regelung sicherzustellen. 
    <br class="block content-[''] mb-24!" />
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
      // NOTE: 70-tage tmp removed
      // {
      //   isSubstep: true,
      //   headline: { text: "2.1. Zuständige Akteurinnen und Akteure auflisten" },
      //   info: [
      //     {
      //       icon: TimerOutlined,
      //       text: "**Zeit:** ca. vier Stunden",
      //     },
      //   ],
      //   text: "Wenn Sie ein Regelungsvorhaben erarbeiten, ist es entscheidend, die **Zuständigkeiten der umsetzenden Akteurinnen und Akteure** zu kennen: Sie sind die Expertinnen und Experten für die digitale, praktische Umsetzung in der Praxis und damit wertvolle Gesprächspartnerinnen und -partner.",
      //   buttons: [
      //     {
      //       text: "Ansprechpersonen finden",
      //       href: ROUTE_METHODS_RESPONSIBLE_ACTORS.url,
      //     },
      //   ],
      // },
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
      // NOTE: 70-tage tmp removed
      // {
      //   isSubstep: true,
      //   headline: {
      //     text: "2.3. IT-Systeme gemeinsam erfassen",
      //   },
      //   info: [
      //     {
      //       icon: TimerOutlined,
      //       text: "**Zeit:** ca. sechs Stunden",
      //     },
      //     {
      //       icon: GroupOutlined,
      //       text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
      //     },
      //     {
      //       icon: ContactSupportOutlined,
      //       text: "**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support",
      //     },
      //   ],
      //   text: "Nutzen Sie das Fachwissen der Akteurinnen und Akteure, um die verwendeten IT-Systeme für die im vorigen Schritt identifizierten Abläufe zu erfassen und zu verstehen.",
      //   buttons: [
      //     {
      //       text: "IT-Landschaft verstehen",
      //       href: ROUTE_METHODS_COLLECT_IT_SYSTEMS.url,
      //     },
      //   ],
      // },
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
      // NOTE: 70-tage tmp removed
      // {
      //   isSubstep: true,
      //   headline: {
      //     text: "2.5. Technische Umsetzbarkeit sicherstellen",
      //   },
      //   info: [
      //     {
      //       icon: TimerOutlined,
      //       text: "**Zeit:** Richtet sich nach der Komplexität des Vorhabens",
      //     },
      //     {
      //       icon: GroupOutlined,
      //       text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
      //     },
      //     {
      //       icon: ContactSupportOutlined,
      //       text: "**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support",
      //     },
      //   ],
      //   text: "In diesem Schritt können Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende sowie neue Abläufe und IT-Systeme analysieren. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der umsetzenden Akteurinnen und Akteure zurück.",
      //   buttons: [
      //     {
      //       text: "IT-Auswirkungen prüfen",
      //       href: ROUTE_METHODS_TECHNICAL_FEASIBILITY.url,
      //     },
      //   ],
      // },
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
          Nutzen Sie die gewonnen Ideen, um die Regelung zu schreiben. Dafür nehmen Sie ganz einfach Ihre gewohnten Programme und Arbeitshilfen – z. B. eNorm und das Handbuch der Rechtsförmigkeit.
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
  feedbackForm: {
    heading: feedbackFormular.heading,
    trackingEvent: "Feedback Methoden",
    questions: [
      {
        id: "simple-feedback",
        trackingEvent: "wie-einfach", // muss mit dem custom property in Plausible übereinstimmen
        text: "Wie einfach war es für Sie, unseren Dienst „Digitaltaugliche Regelungen erarbeiten“ zu nutzen?",
        options: feedbackFormular.optionsSimple,
      },
      {
        id: "useful-feedback",
        trackingEvent: "wie-hilfreich", // muss mit dem custom property in Plausible übereinstimmen
        text: "Wie hilfreich fanden Sie die angebotenen Methoden und Werkzeuge für das Erarbeiten ihres Regelungsvorhaben?",
        options: feedbackFormular.optionsUseful,
      },
    ],
    contact: feedbackFormular.contact,
    button: feedbackFormular.button,
    success: feedbackFormular.success,
  },
};
