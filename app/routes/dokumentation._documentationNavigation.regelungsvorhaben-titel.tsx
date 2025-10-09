import { useForm } from "@rvf/react-router";
import { useNavigate, useOutletContext } from "react-router";
import { z } from "zod";
import Heading from "~/components/Heading";
import InputNew from "~/components/InputNew";
import MetaTitle from "~/components/Meta";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { ROUTE_DOCUMENTATION_TITLE } from "~/resources/staticRoutes";
import { useDataSync } from "~/routes/dokumentation/documentationDataServiceHook";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

const { info } = digitalDocumentation;

const schema = z.object({
  title: z.string().min(1, { message: info.inputTitle.error }),
});

export default function DocumentationInfo() {
  const navigate = useNavigate();
  const { currentUrl, nextRoute, previousRoute } =
    useOutletContext<NavigationContext>();

  const form = useForm({
    schema: schema,
    defaultValues: {
      title: "",
    },
    validationBehaviorConfig: {
      whenSubmitted: "onChange",
      whenTouched: "onSubmit",
      initial: "onSubmit",
    },
    handleSubmit: async () => {
      await navigate(nextRoute.url);
    },
  });

  useDataSync({
    currentUrl,
    form,
    defaultValues: {
      title: "",
    },
  });

  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION_TITLE.title} />
      <Heading
        text={info.headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-40"
      />
      <form {...form.getFormProps()} className="space-y-40">
        <fieldset>
          <InputNew scope={form.scope("title")}>
            {info.inputTitle.label}
          </InputNew>
        </fieldset>

        <DocumentationActions previousRoute={previousRoute.url} submit />
      </form>
    </>
  );
}
