import {
  Check,
  ChevronLeft,
  WarningAmberOutlined,
} from "@digitalservicebund/icons";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  createContext,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import { general } from "~/resources/content/shared/general";
import twMerge from "~/utils/tailwindMerge";

const NavContext = createContext<{
  activeElementUrl?: string;
}>({});

export type NavItemProps = {
  children: string;
  url?: string;
  subItems?: ReactNode;
  disabled?: boolean;
  completed?: boolean;
  error?: boolean;
};

type NavItemsProps = {
  children: ReactNode;
};

type NavProps = {
  children: ReactNode;
  ariaLabel: string;
  activeElementUrl?: string;
  completedElementUrls?: string[];
  errorElementUrls?: string[];
};

/**
 * Recursively scan a React node tree to find elements whose `attr`
 * matches the provided `value`.
 */
const containsMatchingAttr = (
  node: ReactNode | ReactNode[],
  attr: keyof NavItemProps,
  value: string | boolean = true,
): boolean => {
  if (!node) return false;

  if (Array.isArray(node)) {
    return node.some((n) => containsMatchingAttr(n, attr, value));
  }

  if (isValidElement(node)) {
    const props = ((node as ReactElement<unknown>).props ?? {}) as NavItemProps;

    if (props[attr] === value) return true;
    if (containsMatchingAttr(props.children, attr, value)) return true;
    if (containsMatchingAttr(props.subItems, attr, value)) return true;
  }

  return false;
};

function NavItem({
  children,
  url,
  subItems,
  disabled = false,
  completed = false,
  error = false,
}: Readonly<NavItemProps>) {
  const { activeElementUrl } = useContext(NavContext);

  // If any descendant has the active URL, this item should be considered active.
  const hasActiveDescendant = Boolean(
    activeElementUrl && containsMatchingAttr(subItems, "url", activeElementUrl),
  );

  const isActive = Boolean(
    activeElementUrl && (activeElementUrl === url || hasActiveDescendant),
  );

  const hasCompletedDescendant = Boolean(
    containsMatchingAttr(subItems, "completed"),
  );
  const isCompleted = Boolean(
    (!isActive && completed) || hasCompletedDescendant,
  );

  const hasErrorDescendant = Boolean(containsMatchingAttr(subItems, "error"));
  const hasError = Boolean((!isActive && error) || hasErrorDescendant);

  const hoverClasses =
    "hover:border-l-blue-300 hover:bg-blue-300 hover:underline";

  const hoverClassesError =
    "hover:border-l-yellow-300 hover:bg-yellow-300 hover:underline";

  const focusClasses =
    "focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-blue-800";

  const activeClasses =
    "ds-label-02-bold pointer-events-none border-l-blue-800 bg-blue-400";

  const activeErrorClasses =
    "ds-label-02-bold pointer-events-none border-l-yellow-800 bg-yellow-300";

  const activeOpenClasses = "pointer-events-none border-l-blue-400 bg-blue-400";

  const activeOpenErrorClasses =
    "pointer-events-none border-l-yellow-200 bg-yellow-200";

  return (
    <li className={twJoin(url && "border-b border-b-white")}>
      {url ? (
        <Link
          to={url}
          title={
            hasError
              ? `${children} - ${general.a11yMessageError}`
              : isCompleted
                ? `${children} - ${general.a11yMessageCompleted}`
                : children
          }
          aria-current={activeElementUrl === url ? "page" : undefined}
          aria-disabled={disabled || activeElementUrl === url}
          className={twMerge(
            "m-0 flex flex-row items-center gap-8 border-l-4 p-16 text-black",
            hasError
              ? "border-l-yellow-200 bg-yellow-200"
              : "border-l-blue-100",
            hasError ? hoverClassesError : hoverClasses,
            isActive && (hasError ? activeErrorClasses : activeClasses),
            disabled && "pointer-events-none text-gray-800",
            focusClasses,
          )}
        >
          {isCompleted && !hasError && <Check className="shrink-0" />}
          {hasError && <WarningAmberOutlined className="shrink-0" />}
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
              <DisclosureButton
                className={twJoin(
                  "group w-full border-b border-b-white text-left text-black",
                  focusClasses,
                )}
              >
                <span
                  className={twJoin(
                    "flex flex-row justify-between border-l-4 p-16",
                    hasError
                      ? "border-l-yellow-200 bg-yellow-200"
                      : "border-l-blue-100",
                    hasError ? hoverClassesError : hoverClasses,
                    isActive &&
                      !open &&
                      (hasError ? activeErrorClasses : activeClasses),
                    isActive &&
                      open &&
                      (hasError ? activeOpenErrorClasses : activeOpenClasses),
                    hoverClasses,
                  )}
                >
                  <span className="flex flex-row items-center gap-8">
                    {hasError && <WarningAmberOutlined className="shrink-0" />}
                    {children}
                  </span>
                  <ChevronLeft className="w-5 rotate-270 group-data-open:rotate-90" />
                </span>
              </DisclosureButton>

              <DisclosurePanel className="[&_a]:pl-32">
                {subItems}
              </DisclosurePanel>

              {
                // only for correct highlighting of Disclosure Button
                // Also to already set the correct width
                !open && (
                  <div className="pointer-events-none invisible h-0 overflow-hidden [&_a]:pl-32">
                    {subItems}
                  </div>
                )
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
              activeElementUrl="/url2"
              ariaLabel="Label Text"
            >
              <Nav.Items>
                <Nav.Item url="/url1">
                  Navigation Item 1
                </Nav.Item>
                <Nav.Item url="/url2" error>
                  Navigation Item 2
                </Nav.Item>
                <Nav.Item
                  subItems={
                    <Nav.Items>
                      <Nav.Item url="/url3-1" completed>
                        Navigation SubItem 1
                      </Nav.Item>
                      <Nav.Item url="/url3-2" disabled>
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
function Nav({ children, activeElementUrl, ariaLabel }: Readonly<NavProps>) {
  return (
    <NavContext.Provider value={{ activeElementUrl }}>
      <nav aria-label={ariaLabel}>{children}</nav>
    </NavContext.Provider>
  );
}

Nav.Items = NavItems;
Nav.Item = NavItem;

export default Nav;
