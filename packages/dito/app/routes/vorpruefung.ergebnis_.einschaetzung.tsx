import Box from "@digitalcheck/shared/components/Box";
import Button from "@digitalcheck/shared/components/Button";
import ButtonContainer from "@digitalcheck/shared/components/ButtonContainer";
import Container from "@digitalcheck/shared/components/Container";
import Input from "@digitalcheck/shared/components/Input";
import Download from "@digitalservicebund/icons/Download";
import { MetaFunction } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { assessment, siteMeta } from "resources/content";
import { PATH_ASSESSMENT_PDF, PATH_RESULT } from "resources/staticRoutes";
import { z } from "zod";

export const meta: MetaFunction = () => {
  return [{ title: `${assessment.title} — ${siteMeta.title}` }];
};

const validator = withZod(
  z.object({
    title: z
      .string()
      .min(1, { message: assessment.form.policyTitleRequired })
      .max(500, { message: assessment.form.policyTitleTooLong }),
  }),
);

export default function Assessment() {
  const form = useForm({
    validator,
    method: "post",
    action: PATH_ASSESSMENT_PDF,
    reloadDocument: true,
  });

  return (
    <>
      <Container paddingBottom="0">
        <Box
          heading={{
            tagName: "h1",
            text: assessment.title,
            look: "ds-heading-02-reg",
          }}
          content={{
            markdown: assessment.subtitle,
          }}
        ></Box>
      </Container>
      <Container paddingBottom="48">
        <form {...form.getFormProps()}>
          <Input
            name="title"
            label={assessment.form.policyTitleLabel}
            error={form.error("title")}
          />
          <br />
          <ButtonContainer>
            <Button
              id="assessment-back-button"
              text="Zurück"
              href={PATH_RESULT}
              look="tertiary"
            ></Button>
            <Button
              id="assessment-download-button"
              text={assessment.form.downloadPdfButton.text}
              type="submit"
              look="primary"
              iconLeft={<Download />}
            ></Button>
          </ButtonContainer>
        </form>
      </Container>
    </>
  );
}
