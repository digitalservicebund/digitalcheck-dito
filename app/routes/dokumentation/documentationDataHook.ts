import { useEffect, useSyncExternalStore } from "react";
import {
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import {
  Participation,
  PolicyTitle,
  Principle,
} from "./documentationDataSchema";
import {
  getDocumentationData,
  getDocumentationDataServerSnapshot,
  getDocumentationDataSnapshot,
  subscribeToDocumentationData,
} from "./documentationDataService";

export const useDocumentationData = () => {
  const documentationData = useSyncExternalStore(
    subscribeToDocumentationData,
    getDocumentationDataSnapshot,
    getDocumentationDataServerSnapshot,
  );

  const findDocumentationDataForUrl = (
    url: string,
  ): PolicyTitle | Participation | Principle | undefined => {
    if (url === ROUTE_DOCUMENTATION_TITLE.url)
      return documentationData.policyTitle;
    else if (url === ROUTE_DOCUMENTATION_PARTICIPATION.url)
      return documentationData.participation;

    const principleData = documentationData.principles?.find(
      ({ id }) => id === url,
    );

    if (!principleData) return undefined;

    const reasoning = principleData.reasoning?.filter(
      ({ checkbox }) => checkbox !== undefined,
    );

    return {
      ...principleData,
      reasoning: reasoning
        ? reasoning.length > 0
          ? reasoning
          : undefined
        : undefined,
    };
  };

  useEffect(() => {
    getDocumentationData();
  }, []);

  return { documentationData, findDocumentationDataForUrl };
};
