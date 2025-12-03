import Image from "app/components/Image";
import { Link } from "react-router";
import { OpenInNewIcon } from "~/components/OpenInNewIcon.tsx";
import tailwindMerge from "~/utils/tailwindMerge";
import { ZFL_EMAIL, ZFL_PHONE } from "../constants";
import {
  ROUTE_ZFL_A11Y,
  ROUTE_ZFL_BEGLEITUNGEN,
  ROUTE_ZFL_IMPRINT,
  ROUTE_ZFL_PRIVACY,
  ROUTE_ZFL_TRAININGS,
} from "../routes";

type LinkProps = {
  preText?: string;
  postText?: string;
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
    >
      <span className="flex items-center">
        {link.text} {link.openInNewTab && <OpenInNewIcon />}
      </span>
    </Link>
    {link?.postText && <> {link.postText}</>}
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
      id="footer"
      className="ds-label-03-reg flex w-full flex-row justify-center border-t-2 border-blue-300 leading-snug text-gray-900 print:hidden"
      aria-label="Seitenfußbereich"
    >
      <div className="w-full max-w-6xl space-y-32 px-16 py-40 sm:space-y-40">
        <nav
          className="grid grid-cols-1 items-end justify-between gap-32 sm:grid-cols-[repeat(3,_minmax(0,_18rem))] sm:grid-rows-2"
          aria-label="Schnellübersicht"
        >
          <LinkList
            header="Unterstützungsangebote"
            links={[
              [
                {
                  preText: "Support:",
                  text: ZFL_PHONE.display,
                  url: ZFL_PHONE.url,
                },
                {
                  preText: " oder",
                  text: ZFL_EMAIL.display,
                  url: ZFL_EMAIL.url,
                },
              ],
              {
                text: ROUTE_ZFL_BEGLEITUNGEN.title,
                url: ROUTE_ZFL_BEGLEITUNGEN.url(),
              },
              {
                text: ROUTE_ZFL_TRAININGS.title,
                url: ROUTE_ZFL_TRAININGS.url(),
              },
            ]}
            className="row-span-2"
          />
          <LinkList
            header=""
            links={[
              {
                text: ROUTE_ZFL_IMPRINT.title,
                url: ROUTE_ZFL_IMPRINT.url(),
              },
              {
                text: ROUTE_ZFL_PRIVACY.title,
                url: ROUTE_ZFL_PRIVACY.url(),
              },
              {
                text: ROUTE_ZFL_A11Y.title,
                url: ROUTE_ZFL_A11Y.url(),
              },
            ]}
            className="row-span-2"
          />
        </nav>

        <hr className="mt-16 w-full border-t-2 border-blue-300" />

        <nav aria-label="Externe Verlinkungen" className="space-y-40">
          <div className="space-y-16 sm:flex sm:flex-row sm:items-center sm:gap-48 sm:space-y-0">
            <Image
              url="/logo/bmds-logo.png"
              width={120}
              alternativeText="Logo des Bundesministerium für Digitales und Staatsmodernisierung"
            />

            <div className="max-w-2xl space-y-8">
              <h3 className="ds-label-03-bold">Federführung</h3>
              <LinkList
                links={[
                  {
                    preText:
                      "Das Zentrum für Legistik entsteht im Auftrag des ",
                    text: "Bundesministerium für Digitales und Staatsmodernisierung",
                    url: "https://bmds.bund.de/",
                  },
                ]}
              />
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
}
