import { FormApi } from "@rvf/react-router";
import { useEffect } from "react";
import {
  createOrUpdateDocumentationStep,
  DocumentationField,
  getDocumentationStep,
} from "./documentationDataService";

type UseDataSyncArgs<T> = {
  currentUrl: string;
  form: FormApi<T>;
  defaultValues: T;
};

export const useDataSync = <T>({
  currentUrl,
  form,
  defaultValues,
}: UseDataSyncArgs<T>) => {
  useEffect(() => {
    if (!form.dirty()) {
      const documentationStepData = getDocumentationStep(currentUrl);

      if (documentationStepData === null) {
        form.resetForm(defaultValues);
      } else {
        form.resetForm(documentationStepData.items as T);
      }

      form.setDirty(true);
    }

    const unsubscribe = form.subscribe.value((formValues) => {
      createOrUpdateDocumentationStep(
        currentUrl,
        formValues as DocumentationField,
      );
    });

    return () => unsubscribe();
  }, [currentUrl, form, defaultValues]);
};
