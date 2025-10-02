import React, { useEffect, useRef } from "react";
import twMerge from "~/utils/tailwindMerge";

export type TableOfContentsInteractiveProps = {
  selector: string;
  title: React.ReactNode;
  children: React.ReactNode;
};

function List({
  children,
  className,
}: Readonly<React.PropsWithChildren<{ className?: string }>>) {
  return <ol className={twMerge("space-y-16 pl-16", className)}>{children}</ol>;
}

export type ItemProps = {
  href: string;
  title: string;
  after?: React.ReactNode;
  numbered?: boolean;
};

function Item({ title, href, after, numbered }: Readonly<ItemProps>) {
  const numberClass = numbered && "before:content-[counter(list-item)'._'] ";

  return (
    <li className="group my-2">
      <a
        href={href}
        className={twMerge(
          "ds-link-02-reg block cursor-pointer border-l-4 border-transparent p-8 text-blue-800 no-underline hover:bg-blue-300 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-800 data-active:border-l-blue-800 data-active:bg-blue-200 data-active:hover:bg-blue-300",
          numberClass,
        )}
      >
        {title}
      </a>

      {after}
    </li>
  );
}

/**
 * A table of contents component that highlights the currently active section.
 * @param selector A CSS selector that determines which elements will be observed.
 */
function TableOfContentsInteractive({
  selector,
  title,
  children,
}: Readonly<TableOfContentsInteractiveProps>) {
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const sidebarAnchorElement = navRef.current?.querySelector(
            `li a[href="#${id}"]`,
          );

          if (entry.isIntersecting) {
            sidebarAnchorElement?.setAttribute("data-active", "true");
          } else {
            sidebarAnchorElement?.removeAttribute("data-active");
          }
        });
      },
      { rootMargin: "-25%" },
    );

    // Track all sections and list items that have an `id` applied
    document.querySelectorAll(selector).forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [selector]);

  return (
    <nav ref={navRef} aria-labelledby="toc-label" className="space-y-16">
      <div id="toc-label" className="ds-label-01-bold">
        {title}
      </div>
      {children}
    </nav>
  );
}

TableOfContentsInteractive.Item = Item;
TableOfContentsInteractive.List = List;

export default TableOfContentsInteractive;
