import { marked, Marked, type Renderer, type Tokens } from "marked";
import { getDownloadableExtensionName } from "~/utils/fileExtensionUtils";
import twMerge from "~/utils/tailwindMerge";
import { isExternalUrl } from "~/utils/utilFunctions";
import { dowloadIconString } from "./downloadIcon";
import { openInNewIconString } from "./OpenInNewIcon.tsx";

export type RichTextProps = {
  markdown: string;
  className?: string;
  rendererOptions?: Partial<Renderer>;
  tagName?: string;
};

const RichText = ({
  markdown,
  className,
  rendererOptions,
  tagName = "div",
  ...props
}: RichTextProps) => {
  const Tag = tagName as keyof React.JSX.IntrinsicElements;
  const extension = {
    useNewRenderer: true,
    renderer: {
      link(token: Tokens.Link) {
        const { href } = token;
        // render the link with the default renderer or a renderer that has overridden it
        const linkHtml = marked.parseInline(token.raw) as string;

        // Force external links to open in a new window
        if (isExternalUrl(href)) {
          return linkHtml
            .replace(/^<a /, '<a target="_blank" class="group"')
            .replace(
              `>${token.text}<`,
              `>${token.text}${openInNewIconString}<`,
            );
        }

        const ext = getDownloadableExtensionName(href);

        // Force the browser to download links to PDF/Excel files
        if (ext) {
          return linkHtml
            .replace(
              /^<a /,
              `<a download title="${token.text} (${ext}-Datei)" class="group inline-flex items-center" `,
            )
            .replace(`>${token.text}<`, `>${token.text}${dowloadIconString}<`);
        }

        return linkHtml;
      },
      ...rendererOptions,
    },
  };

  const newMarked = new Marked(extension);
  const html = newMarked.parse(markdown);

  return html ? (
    <Tag
      {...props}
      className={twMerge("[&_a]:text-link space-y-8", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : null;
};

export default RichText;
