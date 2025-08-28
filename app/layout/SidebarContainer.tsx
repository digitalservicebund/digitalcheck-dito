import React from "react";
import Container from "~/components/Container";

type SidebarContainerProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

/**
 * Layout component that augments the standard Container with a sidebar that sits to its side.
 * On narrow screens, the sidebar content is positioned on top.
 */
export function SidebarContainer({
  children,
  sidebar,
}: Readonly<SidebarContainerProps>) {
  return (
    <Container className="sm:pr-0 2xl:ml-[calc((100vw-59rem)/2)] 2xl:max-w-[72rem]">
      <div className="grid grid-cols-1 gap-y-40 sm:grid-cols-[1fr_minmax(184px,256px)] md:my-40">
        <div className="space-y-40 md:space-y-80">{children}</div>
        <div className="order-first ml-20 sm:sticky sm:top-40 sm:order-none sm:ml-0 sm:max-h-[calc(100vh-80px)] sm:self-start sm:overflow-y-auto sm:px-40">
          {sidebar}
        </div>
      </div>
    </Container>
  );
}

export default SidebarContainer;
