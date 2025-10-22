import { useEffect, useSyncExternalStore } from "react";
import {
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import {
  Participation,
  PolicyTitle,
  Principle,
  PrincipleReasoning,
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

    let reasoning: string | PrincipleReasoning[];

    if (Array.isArray(principleData.reasoning)) {
      reasoning = principleData.reasoning?.filter(
        (r): r is PrincipleReasoning =>
          r !== undefined && r.checkbox !== undefined,
      );
    } else {
      reasoning = principleData.reasoning || "";
    }

    return {
      ...principleData,
      // @ts-expect-error somehow ts does not pic up the correct type
      reasoning,
    };
  };

  useEffect(() => {
    getDocumentationData();
  }, []);

  return { documentationData, findDocumentationDataForUrl };
};
