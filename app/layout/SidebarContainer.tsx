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
export default function SidebarContainer({
  children,
  sidebar,
}: Readonly<SidebarContainerProps>) {
  return (
    <Container className="lg:pr-0 min-[90rem]:ml-[calc((100vw-59rem)/2)] min-[90rem]:max-w-[72rem]">
      <div className="grid grid-cols-1 gap-y-40 lg:my-40 lg:grid-cols-[1fr_minmax(184px,256px)]">
        <div className="space-y-40 lg:space-y-80">{children}</div>
        <div className="order-first ml-20 lg:sticky lg:top-40 lg:order-none lg:ml-0 lg:max-h-[calc(100vh-80px)] lg:self-start lg:overflow-y-auto lg:px-40">
          {sidebar}
        </div>
      </div>
    </Container>
  );
}
