import { useCallback, useEffect } from "react";
import { Outlet, useLoaderData, useOutletContext } from "react-router";
import { getAnswersFromCookie } from "~/utils/cookies.server";
import type { Route } from "./+types/route";
import { usePreCheckData } from "./preCheckDataHook";
import {
  createOrUpdatePreCheckData,
  initialPreCheckData,
} from "./preCheckDataService";

// Helper for cookies
const getCookie = (name: string) => {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
};

const removeCookie = (name: string) => {
  if (getCookie(name)) {
    document.cookie = `${name}=;path=/;domain=${window.location.hostname};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

export const handle = {
  hasProgressBar: true, // enable progress bar for all child routes
};

export async function loader({ request }: Route.LoaderArgs) {
  const { answers } = await getAnswersFromCookie(request);
  return {
    answers,
  };
}

export default function Vorpruefung() {
  const { answers } = useLoaderData<typeof loader>();
  const { hasData } = usePreCheckData();

  const handleOldCookieData = useCallback(() => {
    if (!answers) return;
    if (hasData) return;

    const oldAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    createOrUpdatePreCheckData({
      ...initialPreCheckData,
      answers: oldAnswers,
    });
    removeCookie("user-answers");
  }, [answers, hasData]);

  useEffect(() => {
    handleOldCookieData();
  }, [handleOldCookieData]);

  // Sets the meta title for all child pages
  // We need to pass the Outlet context to the child routes for the feature flags to work
  return <Outlet context={useOutletContext()} />;
}
