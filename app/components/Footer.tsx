import { Link } from "react-router";
import { openInNewIconElement } from "~/components/openInNewWindow";
import { footer } from "~/resources/content/components/footer";
import { A11Y_MESSAGE_NEW_WINDOW } from "./Aria";
import Container from "./Container";
import Image from "./Image";

type LinkProps = {
  preText?: string;
  url: string;
  text: string;
  openInNewTab?: boolean;
  wrap?: boolean;
};

export default function Footer() {
  // const linksMiddleIndex = Math.ceil(links.length / 2);
  // const linksFirstColumn: typeof links = links.slice(0, linksMiddleIndex);
  // const linksSecondColumn: typeof links = links.slice(linksMiddleIndex);

  const renderLink = (link: LinkProps) => (
    <li key={link.url}>
      {link?.preText}{" "}
      <Link
        to={link.url}
        // alle bekommen wrap
        className={`text-link increase-tap-area ${link.wrap ? "" : "whitespace-nowrap"}`}
        target={link.openInNewTab ? "_blank" : undefined}
        rel={link.openInNewTab ? "noreferrer" : undefined}
        aria-describedby={
          link.openInNewTab ? A11Y_MESSAGE_NEW_WINDOW : undefined
        }
      >
        {link.text} {link.openInNewTab && openInNewIconElement}
      </Link>
    </li>
  );

  return (
    <footer
      className="ds-body-02-reg w-full leading-snug print:hidden"
      aria-label="Seitenfußbereich"
    >
      <Container className="sm:px-16">
        <div className="flex flex-col justify-stretch gap-y-32 sm:gap-y-40">
          <div className="flex flex-col gap-32 sm:grid sm:grid-cols-3">
            <div className="flex flex-col gap-8">
              <h2 className="ds-label-03-reg uppercase">
                {footer.top.supportOffer.title}
              </h2>
              <ul className="list-unstyled flex flex-col gap-8">
                {footer.top.supportOffer.links.map(renderLink)}
              </ul>
            </div>

            <div className="flex flex-col gap-8">
              <h2 className="ds-label-03-reg uppercase">
                {footer.top.stepByStep.title}
              </h2>
              <ul className="list-unstyled flex flex-col gap-8">
                {footer.top.stepByStep.links.map(renderLink)}
              </ul>
            </div>

            <div className="flex flex-col gap-32">
              <div className="flex flex-col gap-8">
                <h2 className="ds-label-03-reg uppercase">
                  {footer.top.basics.title}
                </h2>
                <ul className="list-unstyled flex flex-col gap-8">
                  {footer.top.basics.links.map(renderLink)}
                </ul>
              </div>

              <div className="flex flex-col gap-8">
                <h2 className="ds-label-03-reg uppercase">
                  {footer.top.examples.title}
                </h2>
                <ul className="list-unstyled flex flex-col gap-8">
                  {footer.top.examples.links.map(renderLink)}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <ul className="list-unstyled ds-footer-ul-w-seperator flex flex-row flex-wrap gap-8">
              {footer.middle.links.map(renderLink)}
            </ul>

            <hr className="mt-16 w-full border-t-[2px] border-blue-300" />
          </div>

          <div className="flex flex-col gap-16 sm:flex-row sm:gap-48">
            <Image
              url="/logo/bmi-logo.png"
              width={120}
              alternativeText="Logo des Bundesministerium des Innern und für Heimat"
            />
            <div>
              <ul className="list-unstyled flex flex-row flex-wrap gap-8">
                {footer.bottom.links.map(renderLink)}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
