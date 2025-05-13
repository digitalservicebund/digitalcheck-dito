import ContactSupportOutlined from "@digitalservicebund/icons/ContactSupportOutlined";
import GroupOutlined from "@digitalservicebund/icons/GroupOutlined";
import TimerOutlined from "@digitalservicebund/icons/TimerOutlined";
import { feedbackFormular } from "~/resources/content/components/feedback-formular";
import { steps } from "~/resources/content/components/naechste-schritte";
import {
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_METHODS_TASKS_PROCESSES,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
} from "~/resources/staticRoutes";
import { dedent } from "~/utils/dedentMultilineStrings";

export const methods = {
  title: "2. Erarbeiten eines digitaltauglichen Regelungsvorhabens",
  subtitle: dedent`
    Hier finden Sie passende Methoden und Werkzeuge, um Digitaltauglichkeit in Ihrer Regelung sicherzustellen. 
    <br class="block content-[''] mb-24!" />
    Gehen Sie am besten in der vorgeschlagenen Reihenfolge vor.
  `,
  steps: {
    items: [
      {
        spacer: { text: "Der sichere Einstieg in jede Regelung" },
        headline: { text: "Erfassen Sie den Ist-Zustand" },
        text: dedent`
          Ein solides Verständnis über den Ist-Zustand ist ein sinnvoller und sicherer Einstieg. Tauschen Sie sich mit den umsetzenden Akteurinnen und Akteuren aus. Bei dieser Gelegenheit können Sie auch nach Problemen in der aktuellen Praxis fragen.
          Wenn Sie in den Gesprächen nichts Neues mehr erfahren, haben Sie den Status Quo erfasst.
          
          **Ein Austausch über die aktuelle Praxis darf auch während des Entwurfsprozesses stattfinden.**
          
          Mit diesen Informationen sind Sie gut vorbereitet, um  
          - **Anforderungen** für die neue Regelung zu erarbeiten,  
          - **Abstimmungsprozesse** zwischen Bund, Ländern, umsetzenden Behörden und Dienstleistern zu navigieren, 
          - in der **formellen Beteiligung** eine wirkungsvolle Umsetzung zu besprechen.
        `,
      },
      {
        isSubstep: true,
        headline: { text: "2.1. Zuständige Akteurinnen und Akteure auflisten" },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** ca. vier Stunden",
          },
        ],
        text: "Wenn Sie ein Regelungsvorhaben erarbeiten, ist es entscheidend, die **Zuständigkeiten der umsetzenden Akteurinnen und Akteure** zu kennen: Sie sind die Expertinnen und Experten für die digitale, praktische Umsetzung in der Praxis und damit wertvolle Gesprächspartnerinnen und -partner.",
        buttons: [
          {
            text: "Ansprechpersonen finden",
            href: ROUTE_METHODS_RESPONSIBLE_ACTORS.url,
          },
        ],
      },
      {
        isSubstep: true,
        headline: {
          text: "2.2. Aufgaben und Abläufe gemeinsam erfassen",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** ca. sechs Stunden",
          },
          {
            icon: GroupOutlined,
            text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
          },
          {
            icon: ContactSupportOutlined,
            text: "**Support:** Komplexe Abläufen können Sie mit dem Digitalcheck-Support erfassen",
          },
        ],
        text: "Damit Ihre Regelung wirkungsvoll in die Praxis kommt, müssen Sie die **aktuellen Abläufe** verstehen. Holen Sie sich dazu Unterstützung von den Akteurinnen und Akteuren, die Sie im vorigen Schritt identifiziert haben. In diesem Schritt müssen Sie noch nicht auf geplante Neuerungen eingehen. Konzentrieren Sie sich auf den **Status Quo**.",
        buttons: [
          {
            text: "Aufgaben und Abläufe klären",
            href: ROUTE_METHODS_TASKS_PROCESSES.url,
          },
        ],
      },
      {
        isSubstep: true,
        headline: {
          text: "2.3. IT-Systeme gemeinsam erfassen",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** ca. sechs Stunden",
          },
          {
            icon: GroupOutlined,
            text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
          },
          {
            icon: ContactSupportOutlined,
            text: "**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support",
          },
        ],
        text: "Nutzen Sie das Fachwissen der Akteurinnen und Akteure, um die verwendeten IT-Systeme für die im vorigen Schritt identifizierten Abläufe zu erfassen und zu verstehen.",
        buttons: [
          {
            text: "IT-Landschaft verstehen",
            href: ROUTE_METHODS_COLLECT_IT_SYSTEMS.url,
          },
        ],
      },
      {
        spacer: { text: "Praxiswissen einsetzen und Auswirkungen verstehen" },
        headline: { text: "Entwickeln Sie eine digitaltaugliche Regelung" },
        text: "Mit einem guten Verständnis des Ist-Zustandes erarbeiten Sie nun Ihre Regelung. Jetzt geht es darum, Möglichkeiten zur Digitalisierung zu finden und Hindernisse aus dem Weg zu räumen — eine gute digitale Umsetzung spart langfristig Zeit und Geld und erfüllt die heutigen Erwartungen der Betroffenen an den Staat.",
      },
      {
        isSubstep: true,
        headline: {
          text: "2.4. Möglichkeiten und Hindernisse der digitalen Umsetzung identifizieren",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** Richtet sich nach der Komplexität des Vorhabens",
          },
        ],
        text: "Die fünf Prinzipien für digitaltaugliche Gesetzgebung decken unterschiedliche Aspekte der digitalen Umsetzung ab: Nutzen Sie die Erkenntnisse über den Ist-Zustand aus den vorigen Schritten, um mithilfe der Prinzipien die **Möglichkeiten der digitalen Umsetzung auszuschöpfen und Hindernisse zu erkennen**.",
        buttons: [
          {
            text: "Fünf Prinzipien nutzen",
            href: ROUTE_METHODS_PRINCIPLES.url,
          },
        ],
      },
      {
        isSubstep: true,
        headline: {
          text: "2.5. Technische Umsetzbarkeit sicherstellen",
        },
        info: [
          {
            icon: TimerOutlined,
            text: "**Zeit:** Richtet sich nach der Komplexität des Vorhabens",
          },
          {
            icon: GroupOutlined,
            text: "**Kollaborativ:** Arbeiten Sie mit umsetzenden Akteurinnen und Akteuren",
          },
          {
            icon: ContactSupportOutlined,
            text: "**Support:** Eine neutrale Drittmeinung erhalten Sie vom Digitalcheck-Support",
          },
        ],
        text: "In diesem Schritt können Sie die Auswirkungen Ihres Regelungsvorhabens auf bestehende sowie neue Abläufe und IT-Systeme analysieren. Damit stellen Sie die technische Machbarkeit sicher. Greifen Sie dafür auf das Fachwissen der umsetzenden Akteurinnen und Akteure zurück.",
        buttons: [
          {
            text: "IT-Auswirkungen prüfen",
            href: ROUTE_METHODS_TECHNICAL_FEASIBILITY.url,
          },
        ],
      },
      {
        spacer: { text: "Eine digitale, verwaltungsarme Regelung Schreiben" },
        headline: { text: "Verfassen Sie den Regelungsentwurf" },
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
        headline: { text: "Schreiben Sie die Regelung" },
        text: "Nutzen Sie Ihre gewohnten Programme und Arbeitshilfen, um die Regelung zu schreiben — z. B. eNorm und das Handbuch der Rechtsförmigkeit.",
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
