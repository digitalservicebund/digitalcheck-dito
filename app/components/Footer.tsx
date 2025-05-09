import { Link } from "react-router";
import { openInNewIconElement } from "~/components/openInNewWindow";
import { A11Y_MESSAGE_NEW_WINDOW } from "./Aria";
import Container from "./Container";
import Image from "./Image";

type LinkProps = {
  preText?: string;
  url: string;
  text: string;
  openInNewTab?: boolean;
};

type FooterProps = {
  links: LinkProps[];
};

export default function Footer({ links }: Readonly<FooterProps>) {
  const linksMiddleIndex = Math.ceil(links.length / 2);
  const linksFirstColumn: typeof links = links.slice(0, linksMiddleIndex);
  const linksSecondColumn: typeof links = links.slice(linksMiddleIndex);

  const renderLink = (link: LinkProps) => (
    <li key={link.url}>
      {link?.preText}{" "}
      <Link
        to={link.url}
        className="text-link increase-tap-area whitespace-nowrap"
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

  const renderLinks = (links: LinkProps[]) => (
    <ul className="list-unstyled ds-stack ds-stack-16" key={links[0]?.url}>
      {links.map(renderLink)}
    </ul>
  );

  return (
    <footer
      className="w-full text-base leading-snug print:hidden"
      aria-label="Seitenfußbereich"
    >
      <Container className="sm:px-16">
        <div className="flex flex-wrap items-start justify-between gap-y-32">
          <div className="flex flex-col-reverse gap-16 sm:flex-row">
            <Image
              url="/logo/bmi-logo.png"
              width={120}
              alternativeText="Logo des Bundesministerium des Innern und für Heimat"
            />
            <div>
              {renderLinks([
                {
                  preText: "Ein Onlinedienst der",
                  text: "DigitalService GmbH des Bundes",
                  url: "https://digitalservice.bund.de/",
                  openInNewTab: true,
                },
                {
                  preText: "Im Auftrag des",
                  text: "Bundesministerium des Innern und für Heimat",
                  url: "https://www.bmi.bund.de/",
                  openInNewTab: true,
                },
              ])}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {renderLinks(linksFirstColumn)}
            {renderLinks(linksSecondColumn)}
          </div>
        </div>
      </Container>
    </footer>
  );
}
