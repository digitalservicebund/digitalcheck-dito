import Image from "app/components/Image";
import { Link } from "react-router";
import { openInNewIconElement } from "~/components/openInNewWindow";
import { A11Y_MESSAGE_NEW_WINDOW } from "~/resources/constants";
import { footer } from "~/resources/content/shared/footer";
import tailwindMerge from "~/utils/tailwindMerge";

type LinkProps = {
  preText?: string;
  url: string;
  text: string;
  openInNewTab?: boolean;
};

const FooterLink = ({ link }: { link: LinkProps }) => (
  <>
    {link?.preText}{" "}
    <Link
      to={link.url}
      className="text-link increase-tap-area"
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noreferrer" : undefined}
      aria-describedby={link.openInNewTab ? A11Y_MESSAGE_NEW_WINDOW : undefined}
    >
      {link.text} {link.openInNewTab && openInNewIconElement}
    </Link>
  </>
);

const LinkList = ({
  header,
  links,
  className,
}: {
  header?: string;
  links: (LinkProps | LinkProps[])[];
  className?: string;
}) => (
  <div className={tailwindMerge("ds-stack ds-stack-8", className)}>
    {header && <h2 className="ds-label-section">{header}</h2>}
    <ul className="list-unstyled flex flex-col gap-8">
      {links.map((link) => {
        const subLinks = Array.isArray(link) ? link : [link];
        return (
          <li key={subLinks[0].url}>
            {subLinks.map((subLink) => (
              <FooterLink key={subLink.url} link={subLink} />
            ))}
          </li>
        );
      })}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer
      className="ds-label-03-reg flex w-full flex-row justify-center border-t-2 border-blue-300 leading-snug text-gray-900 print:hidden"
      aria-label={footer.navLabel}
    >
      <div className="ds-stack ds-stack-32 sm:ds-stack-40 w-full max-w-6xl px-16 py-40">
        <nav
          className="grid grid-cols-1 justify-between gap-32 sm:grid-cols-[repeat(3,_minmax(0,_18rem))] sm:grid-rows-2"
          aria-label={footer.top.navLabel}
        >
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
          {/* <LinkList
            header={footer.top.examples.title}
            links={footer.top.examples.links}
          /> */}
        </nav>

        <nav aria-label={footer.middle.navLabel}>
          <ul className="list-unstyled flex flex-row flex-wrap gap-8">
            {footer.middle.links.map((link) => (
              <li
                key={link.url}
                className="after:ml-8 after:inline-block after:content-['•'] last:after:content-['']"
              >
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <hr className="mt-16 w-full border-t-2 border-blue-300" />

        <div className="space-y-16 sm:flex sm:gap-48">
          <Image
            url="/logo/bmds-logo.png"
            width={120}
            alternativeText="Logo des Bundesministerium für Digitales und Staatsmodernisierung"
          />
          <nav aria-label={footer.bottom.navLabel}>
            <LinkList links={footer.bottom.links} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
