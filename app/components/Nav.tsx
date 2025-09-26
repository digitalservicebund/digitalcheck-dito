import { Check, ChevronLeft } from "@digitalservicebund/icons";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";

const NavContext = createContext<{
  activeElementUrl?: string;
  completedElementUrls?: string[];
}>({});

export type NavItemProps = {
  children: string;
  url?: string;
  subItems?: ReactNode;
  disabled?: boolean;
};

type NavItemsProps = {
  children: ReactNode;
};

type NavProps = {
  children: ReactNode;
  ariaLabel: string;
  activeElementUrl?: string;
  completedElementUrls?: string[];
};

/**
 * Recursively scan a React node tree to find elements whose `url`
 * matches the provided predicate.
 */
function containsMatchingUrl(
  node: ReactNode,
  predicate: (url: string) => boolean,
): boolean {
  if (!node) return false;

  if (Array.isArray(node)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return node.some((n) => containsMatchingUrl(n, predicate));
  }

  if (React.isValidElement(node)) {
    const element = node as ReactElement<unknown>;
    const props = (element.props ?? {}) as {
      url?: string;
      children?: ReactNode;
      subItems?: ReactNode;
    };

    if (typeof props.url === "string" && predicate(props.url)) {
      return true;
    }

    if (containsMatchingUrl(props.children, predicate)) return true;
    if (containsMatchingUrl(props.subItems, predicate)) return true;

    return false;
  }

  return false;
}

function NavItem({
  children,
  url,
  subItems,
  disabled = false,
}: Readonly<NavItemProps>) {
  const { activeElementUrl, completedElementUrls } = useContext(NavContext);

  // If any descendant has the active URL, this item should be considered active.
  const hasActiveDescendant = Boolean(
    activeElementUrl &&
      containsMatchingUrl(subItems, (u) => u === activeElementUrl),
  );

  const isActive = Boolean(
    activeElementUrl && (activeElementUrl === url || hasActiveDescendant),
  );

  // Completed detection: either this item's url is completed or any descendant is completed.
  const hasCompletedDescendant = Boolean(
    completedElementUrls &&
      containsMatchingUrl(subItems, (u) => completedElementUrls.includes(u)),
  );
  const isCompleted = Boolean(
    completedElementUrls &&
      (url ? completedElementUrls.includes(url) : hasCompletedDescendant),
  );

  const hoverClasses =
    "hover:border-l-blue-300 hover:bg-blue-300 hover:underline";

  return (
    <li className={twJoin(url && "border-b border-b-white")}>
      {url ? (
        <Link
          to={url}
          aria-label={isCompleted ? `${children} - completed` : children}
          aria-current={activeElementUrl === url ? "page" : undefined}
          aria-disabled={disabled || activeElementUrl === url}
          className={twJoin(
            "m-0 flex flex-row items-center gap-4 border-l-4 p-16",
            hoverClasses,
            isActive
              ? "ds-label-02-bold pointer-events-none border-l-blue-800 bg-blue-300"
              : "border-l-blue-100",
            disabled && "pointer-events-none text-gray-800",
          )}
        >
          {isCompleted && <Check className="shrink-0" />}
          <span
            title={children}
            className="after:ds-label-02-bold after:invisible after:block after:h-0 after:content-[attr(title)]"
          >
            {children}
          </span>
        </Link>
      ) : (
        // key forces remount when isActive toggles, so defaultOpen can reflect the active state
        <Disclosure key={String(isActive)} defaultOpen={isActive}>
          {({ open }) => (
            <>
              <DisclosureButton className="group w-full border-b border-b-white text-left">
                <span
                  className={twJoin(
                    "flex flex-row justify-between border-l-4 p-16",
                    hoverClasses,
                    isActive
                      ? open
                        ? "border-l-blue-300 bg-blue-300"
                        : "border-l-blue-800 bg-blue-300"
                      : "border-l-blue-100",
                  )}
                >
                  {children}
                  <ChevronLeft className="w-5 rotate-270 group-data-open:rotate-90" />
                </span>
              </DisclosureButton>

              <DisclosurePanel>{subItems}</DisclosurePanel>

              {
                // only for screen reader and correct highlighting of Disclosure Button
                // Also to already set the correct width
                !open && <div className="h-0 overflow-hidden">{subItems}</div>
              }
            </>
          )}
        </Disclosure>
      )}
    </li>
  );
}

function NavItems({ children }: Readonly<NavItemsProps>) {
  return (
    <ul className="ds-label-02-reg list-none space-y-0 bg-blue-100 p-0">
      {children}
    </ul>
  );
}

/**
 * @description Navigation Menu
 * 
 * @example <Nav
              activeElementUrl={url2}
              ariaLabel="Label Text"
              completedElementUrls={[url1]}
            >
              <Nav.Items>
                <Nav.Item url={url1}>
                  Navigation Item 1
                </Nav.Item>
                <Nav.Item url={url2}>
                  Navigation Item 2
                </Nav.Item>
                <Nav.Item
                  subItems={
                    <Nav.Items>
                      <Nav.Item url={url3_1}>
                        Navigation SubItem 1
                      </Nav.Item>
                      <Nav.Item url={url3_2}>
                        Navigation SubItem 2
                      </Nav.Item>
                    </Nav.Items>
                  }
                >
                  Navigation Item 3 with SubItems
                </Nav.Item>
              </Nav.Items>
            </Nav>
 *
 */
function Nav({
  children,
  activeElementUrl,
  completedElementUrls,
  ariaLabel,
}: Readonly<NavProps>) {
  return (
    <NavContext.Provider value={{ activeElementUrl, completedElementUrls }}>
      <nav aria-label={ariaLabel}>{children}</nav>
    </NavContext.Provider>
  );
}

Nav.Items = NavItems;
Nav.Item = NavItem;

export default Nav;
