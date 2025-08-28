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
  return <ol className={twMerge(className, "space-y-16")}>{children}</ol>;
}

function Item({
  children,
  href,
}: Readonly<React.PropsWithChildren<{ href: string }>>) {
  return (
    <li className={"ds-link-02-reg data-active:ds-link-02-bold no-underline"}>
      <a href={href}>{children}</a>
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
          const sidebarLiElement = navRef.current?.querySelector(
            `li a[href="#${id}"]`,
          )?.parentElement;

          if (entry.isIntersecting) {
            sidebarLiElement?.setAttribute("data-active", "true");
          } else {
            sidebarLiElement?.removeAttribute("data-active");
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
  }, []);

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
