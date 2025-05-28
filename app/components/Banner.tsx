import { SettingsSuggestOutlined } from "@digitalservicebund/icons/index";
import { banner } from "~/resources/content/components/banner";
import Badge from "./Badge";
import Container from "./Container";
import RichText from "./RichText";

export default function Banner() {
  return (
    <div aria-label={banner.ariaLabel} className="bg-yellow-300">
      <Container className="relative flex flex-col gap-8 py-24 sm:flex-row sm:py-0">
        <div className="ds-stack ds-stack-8 sm:py-24">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row">
            <h2 className="ds-subhead font-bold">{banner.title}</h2>
            <Badge hint>{banner.titleLabel}</Badge>
          </div>
          <RichText markdown={banner.content} />
        </div>
        <SettingsSuggestOutlined className="mt-0 hidden size-128 fill-yellow-500 sm:block" />
      </Container>
    </div>
  );
}
