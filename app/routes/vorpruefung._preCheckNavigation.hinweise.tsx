import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import InlineNotice from "~/components/InlineNotice";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { preCheck } from "~/resources/content/vorpruefung";
import { ROUTE_PRECHECK } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

const { questions, generalInfo } = preCheck;
const { headline, text, nextButton, hint } = generalInfo;

export function meta() {
  return constructMetaTitle(ROUTE_PRECHECK.title);
}

export default function GeneralInfo() {
  return (
    <Container className="pt-0">
      <Heading
        text={headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <RichText markdown={text} className="mb-40" />
      <InlineNotice
        look="tips"
        title={hint.title}
        tagName="h2"
        content={hint.text}
      />
      <ButtonContainer
        buttons={[
          {
            id: "generalInfo-next-button",
            text: nextButton,
            href: questions[0].url,
          },
          {
            id: "generalInfo-back-button",
            text: general.buttonBack.text,
            href: ROUTE_PRECHECK.url,
            look: "tertiary",
          },
        ]}
        className="pt-40"
      />
    </Container>
  );
}
