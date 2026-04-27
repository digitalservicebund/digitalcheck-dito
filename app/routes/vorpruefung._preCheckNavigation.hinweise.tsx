import { vorpruefung } from "@/config/routes";
import { LinkButton } from "~/components/Button.tsx";
import ButtonContainer from "~/components/ButtonContainer";
import Heading from "~/components/Heading";
import InlineNotice from "~/components/InlineNotice";
import RichText from "~/components/RichText";
import { general } from "~/resources/content/shared/general";
import { preCheck } from "~/resources/content/vorpruefung";

const { questions, generalInfo } = preCheck;
const { headline, text, nextButton, hint } = generalInfo;

export default function GeneralInfo() {
  return (
    <>
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
          <LinkButton id={"generalInfo-next-button"} to={questions[0].path}>
            {nextButton}
          </LinkButton>
          <LinkButton
            id={"generalInfo-back-button"}
            to={vorpruefung.path}
            look={"tertiary"}
          >
            {general.buttonBack.text}
          </LinkButton>
        </ButtonContainer>
      </div>
    </>
  );
}
