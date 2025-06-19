import { Link } from "react-router";
import { A11Y_MESSAGE_NEW_WINDOW } from "~/resources/constants";
import { Route } from "~/resources/staticRoutes";
import tailwindMerge from "~/utils/tailwindMerge";
import Heading from "./Heading";
import { openInNewIconElement } from "./openInNewWindow";

export type LinkListProps = {
  header?: string;
  links: (LinkProps | LinkProps[])[];
  className?: string;
};

export type LinkProps = Route & {
  preText?: string;
  openInNewTab?: boolean;
};

const LinkItem = ({ link }: { link: Readonly<LinkProps> }) => (
  <>
    {link?.preText}{" "}
    <Link
      to={link.url}
      className="text-link increase-tap-area"
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noreferrer" : undefined}
      aria-describedby={link.openInNewTab ? A11Y_MESSAGE_NEW_WINDOW : undefined}
    >
      {link.title} {link.openInNewTab && openInNewIconElement}
    </Link>
  </>
);

function LinkList({ header, links, className }: Readonly<LinkListProps>) {
  return (
    <div className={tailwindMerge("ds-stack ds-stack-8", className)}>
      {header && (
        <Heading className="ds-label-section" tagName="h2">
          {header}
        </Heading>
      )}
      <ul className="list-unstyled flex flex-col gap-8">
        {links.map((link) => {
          const subLinks = Array.isArray(link) ? link : [link];
          return (
            <li key={subLinks[0].url}>
              {subLinks.map((subLink) => (
                <LinkItem key={subLink.url} link={subLink} />
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LinkList;
