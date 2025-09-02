import { twJoin } from "tailwind-merge";
import ButtonContainer from "~/components/ButtonContainer";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import InfoBoxList from "~/components/InfoBoxList";
import InlineNotice from "~/components/InlineNotice";
import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText.tsx";
import SupportBanner from "~/components/SupportBanner";
import { documentation } from "~/resources/content/dokumentation";
import { supportBanner } from "~/resources/content/shared/support-banner";
import { ROUTE_DOCUMENTATION } from "~/resources/staticRoutes";
import constructMetaTitle from "~/utils/metaTitle";

export function meta() {
  return constructMetaTitle(ROUTE_DOCUMENTATION.title);
}

export const handle = {
  hasProgressBar: true,
};

export default function Index() {
  return (
    <>
      <Hero title={documentation.title} subtitle={documentation.subtitle}>
        <ButtonContainer className="mt-48" buttons={documentation.buttons} />
      </Hero>

      <Container className="max-sm:p-0!">
        <InlineNotice
          look="warning"
          title={documentation.multipleNotice.headline}
          tagName="h2"
          content={documentation.multipleNotice.content}
        />
      </Container>
      <Container>
        <InfoBoxList
          heading={{ text: documentation.summary.title }}
          items={documentation.summary.items}
          separator
        />
      </Container>
      <Container className="mb-80 space-y-32 pb-0">
        <h2>{documentation.nextSteps.title}</h2>
        <NumberedList>
          {documentation.nextSteps.items.map((item) => (
            <NumberedList.Item
              key={item.headline.text}
              className={twJoin(
                "space-y-16",
                item.isDisabled && "text-gray-800",
              )}
            >
              <p className={"ds-heading-03-reg"}>{item.headline.text}</p>
              {"content" in item && (
                <RichText markdown={item.content as string} />
              )}
            </NumberedList.Item>
          ))}
        </NumberedList>
      </Container>
      <SupportBanner {...supportBanner} />
    </>
  );
}
