import posthog, { PostHogConfig } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect, useState } from "react";

const posthogOptions: Partial<PostHogConfig> = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  ui_host: "https://eu.posthog.com",
  defaults: "2025-05-24",
  persistence: "memory",
};

type PHProviderProps = {
  posthogEnabled?: boolean;
  children: ReactNode;
};

export function PHProvider({ children, posthogEnabled }: PHProviderProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!posthogEnabled) return;

    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, posthogOptions);

    setHydrated(true);

    posthog.capture("my event", { property: "value" });
  }, [posthogEnabled]);

  if (!hydrated || !posthogEnabled) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
