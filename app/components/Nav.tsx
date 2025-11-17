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
  activeElementUrl?: string,
): boolean => {
  if (!node) return false;

  if (Array.isArray(node)) {
    return node.some((n) =>
      containsMatchingAttr(n, attr, value, activeElementUrl),
    );
  }

  if (isValidElement(node)) {
    const props = ((node as ReactElement<unknown>).props ?? {}) as NavItemProps;

    const isActiveNode = props.url === activeElementUrl;

    if (props[attr] === value) return !isActiveNode;
    if (containsMatchingAttr(props.children, attr, value, activeElementUrl))
      return true;
    if (containsMatchingAttr(props.subItems, attr, value, activeElementUrl))
      return true;
  }

  return false;
};

const classes = {
  hover: "hover:border-l-blue-300 hover:bg-blue-300 hover:underline",
  hoverError: "hover:border-l-yellow-300 hover:bg-yellow-300 hover:underline",
  focus:
    "focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-blue-800",
  active: "ds-label-02-bold pointer-events-none border-l-blue-800 bg-blue-400",
  activeError:
    "ds-label-02-bold pointer-events-none border-l-yellow-800 bg-yellow-300",
  activeOpen: "pointer-events-none border-l-blue-400 bg-blue-400",
  activeOpenError: "pointer-events-none border-l-yellow-200 bg-yellow-200",
};

function NavItemLink({
  children,
  completed,
  currentPage: isCurrentPage,
  disabled,
  url,
  error,
}: Readonly<{
  url: string;
  error: NavItemProps["error"];
  children: string;
  completed: boolean;
  currentPage: boolean;
  disabled: boolean | undefined;
}>) {
  function getTitle() {
    if (error) {
      return `${children} - ${general.a11yMessageError}`;
    }
    if (completed) {
      return `${children} - ${general.a11yMessageCompleted}`;
    }
    return children;
  }

  const statusElements = (
    <>
      {completed && !error && <Check className="shrink-0" />}
      {error && <WarningAmberOutlined className="shrink-0" />}
    </>
  );

  const wrapperClasses = "border-b border-b-white";
  const baseClasses =
    "m-0 flex flex-row items-center gap-8 border-l-4 p-16 text-black";

  if (disabled) {
    return (
      <li className={wrapperClasses}>
        <div
          className={twMerge(baseClasses, "border-l-transparent text-gray-800")}
          aria-disabled
        >
          {statusElements}
          {children}
        </div>
      </li>
    );
  }

  if (isCurrentPage) {
    return (
      <li className={wrapperClasses}>
        <div
          aria-current="page"
          className={twMerge(
            baseClasses,
            "border-l-blue-100",
            classes.hover,
            classes.active,
            classes.focus,
          )}
        >
          {/* don't show status elements for the current page */}
          {children}
        </div>
      </li>
    );
  }

  return (
    <li className={wrapperClasses}>
      <Link
        to={url}
        title={getTitle()}
        className={twMerge(
          baseClasses,
          error ? "border-l-yellow-200 bg-yellow-200" : "border-l-blue-100",
          error ? classes.hoverError : classes.hover,
          classes.focus,
        )}
      >
        {statusElements}
        {children}
      </Link>
    </li>
  );
}

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

  const hasErrorDescendant = Boolean(
    containsMatchingAttr(subItems, "error", true, activeElementUrl),
  );
  const hasError = Boolean((!isActive && error) || hasErrorDescendant);

  if (url) {
    const isCurrentPage = activeElementUrl === url;

    return (
      <NavItemLink
        url={url}
        error={error}
        completed={isCompleted}
        currentPage={isCurrentPage}
        disabled={disabled}
      >
        {children}
      </NavItemLink>
    );
  }
  // if no url is given, it's a subitem, so we render a disclosure button with the subitems inside
  return (
    <li>
      {/* key forces remount when isActive toggles, so defaultOpen can reflect the active state*/}
      <Disclosure key={String(isActive)} defaultOpen={isActive}>
        {({ open }) => (
          <>
            <DisclosureButton
              className={twJoin(
                "group w-full border-b border-b-white text-left text-black",
                classes.focus,
              )}
              aria-invalid={hasError}
            >
              <span
                className={twJoin(
                  "flex flex-row justify-between border-l-4 p-16",
                  hasError
                    ? "border-l-yellow-200 bg-yellow-200"
                    : "border-l-blue-100",
                  hasError ? classes.hoverError : classes.hover,
                  isActive &&
                    !open &&
                    (hasError ? classes.activeError : classes.active),
                  isActive &&
                    open &&
                    (hasError ? classes.activeOpenError : classes.activeOpen),
                  classes.hover,
                )}
              >
                <span className="flex h-24 flex-row items-center gap-8">
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
