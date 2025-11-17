import { DownloadLinkButton } from "~/components/Button";
import Heading from "~/components/Heading.tsx";
import Hero from "~/components/Hero";
import InlineNotice from "~/components/InlineNotice";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText.tsx";
import SupportBanner from "~/components/SupportBanner";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { supportBanner } from "~/resources/content/shared/support-banner";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_TEMPLATE_WORD,
} from "~/resources/staticRoutes";
import { DocumentationContinueActions } from "~/routes/dokumentation/DocumentationContinueActions.tsx";

const { start } = digitalDocumentation;

export default function Index() {
  return (
    <>
      <MetaTitle prefix={ROUTE_DOCUMENTATION.title} />
      <Hero title={start.title} subtitle={start.subtitle}>
        <div className="mt-40 space-y-40">
          <DocumentationContinueActions />
          <noscript>
            <InlineNotice
              look="warning"
              heading={
                <Heading tagName="h2">{start.noscript.headline}</Heading>
              }
              className="mb-40"
            >
              <RichText markdown={start.noscript.content} />
            </InlineNotice>
          </noscript>

          <div className="space-y-8">
            <RichText markdown={start.alternative.text} />

            <DownloadLinkButton
              to={ROUTE_DOCUMENTATION_TEMPLATE_WORD.url}
              look="link"
            >
              {start.alternative.buttonText}
            </DownloadLinkButton>
          </div>
        </div>
      </Hero>

      <div className="container my-80 space-y-80">
        <InlineNotice
          look="tips"
          heading={
            <Heading tagName="h2">{start.dataSavingHint.headline}</Heading>
          }
        >
          <RichText markdown={start.dataSavingHint.content} />
        </InlineNotice>
      </div>

      <SupportBanner {...supportBanner} />
    </>
  );
}
