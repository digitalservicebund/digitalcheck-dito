import { Link } from "react-router";
import { openInNewIconElement } from "~/components/openInNewWindow";
import { footer } from "~/resources/content/components/footer";
import tailwindMerge from "~/utils/tailwindMerge";
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

const LinkList = ({
  header,
  links,
  className,
  listClassName,
}: {
  header?: string;
  links: LinkProps[];
  className?: string;
  listClassName?: string;
}) => (
  <section className={tailwindMerge("ds-stack ds-stack-8", className)}>
    {header && <h2 className="ds-label-03-reg uppercase">{header}</h2>}
    <ul
      className={tailwindMerge(
        "list-unstyled flex flex-col gap-8",
        listClassName,
      )}
    >
      {links.map((link) => (
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
      ))}
    </ul>
  </section>
);

export default function Footer() {
  return (
    <footer
      className="ds-body-02-reg w-full leading-snug print:hidden"
      aria-label="Seitenfußbereich"
    >
      <Container className="ds-stack ds-stack-32 sm:ds-stack-40 sm:px-16">
        <div className="grid grid-cols-1 gap-32 sm:grid-cols-3 sm:grid-rows-2">
          <LinkList
            header={footer.top.supportOffer.title}
            links={footer.top.supportOffer.links}
            className="row-span-2"
          />
          <LinkList
            header={footer.top.stepByStep.title}
            links={footer.top.stepByStep.links}
            className="row-span-2"
          />
          <LinkList
            header={footer.top.basics.title}
            links={footer.top.basics.links}
          />
          <LinkList
            header={footer.top.examples.title}
            links={footer.top.examples.links}
          />
        </div>

        <LinkList
          links={footer.middle.links}
          listClassName="ds-footer-ul-w-seperator flex-row flex-wrap"
        />

        <hr className="mt-16 w-full border-t-[2px] border-blue-300" />

        <div className="space-y-16 sm:flex sm:gap-48">
          <Image
            url="/logo/bmi-logo.png"
            width={120}
            alternativeText="Logo des Bundesministerium des Innern und für Heimat"
          />
          <LinkList links={footer.bottom.links} />
        </div>
      </Container>
    </footer>
  );
}
