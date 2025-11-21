import { FieldValues, FormOpts, useForm } from "@rvf/react";
import type { StandardSchemaV1 } from "node_modules/zod/v4/core/standard-schema";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router";
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

type UseSyncedFormParams<
  SchemaInput extends FieldValues,
  SchemaOutput,
  SubmitResponseData,
  T = FormOpts<SchemaInput, SchemaOutput, SubmitResponseData>["defaultValues"],
> = FormOpts<SchemaInput, SchemaOutput, SubmitResponseData> & {
  currentUrl: string;
  setDataCallback: (data: T) => void;
  nextUrl: string;
  storedData?: T;
  schema: StandardSchemaV1<SchemaInput, SchemaOutput>;
};

export const useSyncedForm = <
  SchemaInput extends FieldValues,
  SchemaOutput,
  SubmitResponseData,
>({
  currentUrl,
  storedData,
  schema,
  defaultValues,
  setDataCallback,
  nextUrl,
}: UseSyncedFormParams<SchemaInput, SchemaOutput, SubmitResponseData>) => {
  const [formTouched, setFormTouched] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    schema,
    defaultValues,
    validationBehaviorConfig: {
      whenSubmitted: "onSubmit",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    onBeforeSubmit: async ({ unvalidatedData }) => {
      if (!storedData) setDataCallback(unvalidatedData);
      // bypass submission
      if (nextUrl) await navigate(nextUrl);
    },
    handleSubmit: async () => {
      if (nextUrl) await navigate(nextUrl);
    },
  });

  useEffect(() => {
    const unsubscribe = form.subscribe.value((val) => {
      setFormTouched(true);
      setDataCallback(val);
    });

    if (storedData && !formTouched) {
      form.resetForm(storedData);
      void form.validate();
    }

    return () => unsubscribe();
  }, [form, formTouched, setDataCallback, currentUrl, storedData]);

  return form;
};

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
        (r): r is PrincipleReasoning => r?.checkbox !== undefined,
      );
    } else {
      reasoning = principleData.reasoning ?? "";
    }

    return {
      ...principleData,
      // @ts-expect-error somehow ts does not pick up the correct type
      reasoning,
    };
  };

  const hasSavedDocumentation =
    !!documentationData.principles ||
    !!documentationData.participation ||
    !!documentationData.policyTitle;

  // trigger a client-side re-render to transition from SSR to CSR
  useEffect(() => {
    getDocumentationData();
  }, []);

  return {
    documentationData,
    findDocumentationDataForUrl,
    hasSavedDocumentation,
  };
};
