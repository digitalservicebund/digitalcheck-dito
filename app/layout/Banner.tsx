import { SettingsSuggestOutlined } from "@digitalservicebund/icons";
import Container from "app/components/Container";
import RichText from "app/components/RichText";

export type BannerProps = {
  ariaLabel: string;
  title: string;
  content: string;
};

export default function Banner({
  ariaLabel,
  title,
  content,
}: Readonly<BannerProps>) {
  return (
    <div aria-label={ariaLabel} className="bg-ds-yellow">
      <Container className="relative flex flex-col items-center gap-8 py-24 sm:flex-row sm:py-0">
        <div className="ds-stack ds-stack-8 sm:py-24">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row">
            <h2 className="ds-subhead font-bold">{title}</h2>
          </div>
          <RichText markdown={content} />
        </div>
        <SettingsSuggestOutlined className="mt-0 hidden size-128 fill-yellow-500 sm:block" />
      </Container>
    </div>
  );
}
