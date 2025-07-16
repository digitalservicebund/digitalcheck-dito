import posthog, { PostHogConfig } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect, useState } from "react";

const posthogOptions: Partial<PostHogConfig> = {
  api_host: "/ph-relay",
  ui_host: "https://eu.posthog.com",
  defaults: "2025-05-24",
  persistence: "memory",
};

type PHProviderProps = {
  children: ReactNode;
  posthogEnabled?: boolean;
  posthogKey?: string;
};

export function PHProvider({
  children,
  posthogEnabled,
  posthogKey,
}: PHProviderProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!posthogEnabled || !posthogKey) return;

    posthog.init(posthogKey, posthogOptions);

    setHydrated(true);

    posthog.capture("my event", { property: "value" });
  }, [posthogEnabled]);

  if (!hydrated || !posthogEnabled) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
