import Container from "~/components/Container";
import InfoBox from "~/components/InfoBox.tsx";
import RichText from "~/components/RichText.tsx";

export type SupportBannerProps = {
  title: string;
  text: string;
};

export default function SupportBanner({
  title,
  text,
}: Readonly<SupportBannerProps>) {
  return (
    <aside className="bg-blue-300" aria-labelledby="support-banner-heading">
      <Container className="ds-stack ds-stack-16">
        <InfoBox
          heading={{
            tagName: "h2",
            look: "ds-subhead font-bold",
            text: title,
            id: "support-banner-heading",
          }}
        >
          <RichText markdown={text} />
        </InfoBox>
      </Container>
    </aside>
  );
}
