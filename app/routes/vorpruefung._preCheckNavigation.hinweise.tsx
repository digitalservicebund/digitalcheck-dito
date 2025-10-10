import Button from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import Heading from "~/components/Heading";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { preCheck } from "~/resources/content/vorpruefung";
import { ROUTE_PRECHECK, ROUTE_PRECHECK_INFO } from "~/resources/staticRoutes";

const { questions, generalInfo } = preCheck;
const { headline, text, nextButton, hint } = generalInfo;

export default function GeneralInfo() {
  return (
    <>
      <MetaTitle prefix={ROUTE_PRECHECK_INFO.title} />
      <Heading
        text={headline}
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <div className="space-y-40">
        <RichText markdown={text} />
        <InlineNotice
          look="tips"
          heading={<Heading tagName="h2">{hint.title}</Heading>}
        >
          <RichText markdown={hint.text} />
        </InlineNotice>
        <ButtonContainer>
          <Button id={"generalInfo-next-button"} href={questions[0].url}>
            {nextButton}
          </Button>
          <Button
            id={"generalInfo-back-button"}
            href={ROUTE_PRECHECK.url}
            look={"tertiary"}
          >
            {general.buttonBack.text}
          </Button>
        </ButtonContainer>
      </div>
    </>
  );
}
