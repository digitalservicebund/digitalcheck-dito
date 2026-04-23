import { type FieldValues, type FormOpts, useForm } from "@rvf/react";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import { useEffect, useState } from "react";
import { useNavigate } from "~/utils/routerCompat";

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
    onBeforeSubmit: ({ unvalidatedData }) => {
      if (!storedData) setDataCallback(unvalidatedData);
      // bypass submission
      if (nextUrl) navigate(nextUrl);
    },
    handleSubmit: () => {
      if (nextUrl) navigate(nextUrl);
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
