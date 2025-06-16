import { Link } from "react-router";
import Heading from "~/components/Heading";
import { general } from "~/resources/content/shared/general";
import twMerge from "~/utils/tailwindMerge";

export type LinkListBoxProps = {
  links: LinkItem[];
  heading?: string;
  className?: string;
};

export type LinkItem = {
  id: string;
  title: string;
};

export default function LinkListBox({
  heading,
  links,
  className,
}: Readonly<LinkListBoxProps>) {
  return (
    <div className={twMerge("mt-64", className)}>
      <Heading
        tagName="div"
        text={heading ?? general.tableOfContents.headline}
        className="font-bold"
      />
      <ol className="list-unstyled ds-stack ds-stack-8 mt-16">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              to={`#${link.id}`}
              className="underline decoration-1 underline-offset-4"
            >
              ↓ {link.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
