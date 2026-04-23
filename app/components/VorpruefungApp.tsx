"use client";
import { preCheck } from "~/resources/content/vorpruefung";
import {
  ROUTE_PRECHECK_INFO,
  ROUTE_PRECHECK_RESULT,
} from "~/resources/staticRoutes";
import PreCheckNavigation from "~/routes/vorpruefung._preCheckNavigation";
import QuestionPage from "~/routes/vorpruefung._preCheckNavigation.$questionId";
import HinweisePage from "~/routes/vorpruefung._preCheckNavigation.hinweise";
import ErgebnisPage from "~/routes/vorpruefung.ergebnis/route";

const { questions } = preCheck;

function getCurrentPath(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export default function VorpruefungApp() {
  const path = getCurrentPath();

  if (path === ROUTE_PRECHECK_RESULT.url || path.endsWith("/ergebnis")) {
    return <ErgebnisPage />;
  }

  if (path === ROUTE_PRECHECK_INFO.url || path.endsWith("/hinweise")) {
    return (
      <PreCheckNavigation>
        <HinweisePage />
      </PreCheckNavigation>
    );
  }

  const pathSegments = path.split("/").filter(Boolean);
  const questionId = pathSegments[pathSegments.length - 1];
  const question = questions.find((q) => q.id === questionId);

  if (question) {
    return (
      <PreCheckNavigation>
        <QuestionPage questionId={questionId} />
      </PreCheckNavigation>
    );
  }

  return null;
}
