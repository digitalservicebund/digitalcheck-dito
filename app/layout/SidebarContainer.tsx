import React from "react";

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
    <div className="lg:breakout-grid-toc max-lg:container max-lg:flex max-lg:flex-col">
      {children}
      <div className="toc order-first pt-40 mix-blend-multiply lg:sticky lg:top-0 lg:order-0 lg:row-1 lg:max-h-[calc(100vh-80px)] lg:self-start lg:overflow-y-auto lg:py-40 lg:pr-20 lg:pl-20">
        {sidebar}
      </div>
    </div>
  );
}
