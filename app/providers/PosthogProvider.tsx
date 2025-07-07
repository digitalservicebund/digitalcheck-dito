// app/provider.tsx
import posthog, { PostHogConfig } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect, useState } from "react";

const posthogOptions: Partial<PostHogConfig> = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
  persistence: "memory",
};

type PHProviderProps = {
  trackingDisabled?: boolean;
  children: ReactNode;
};

export function PHProvider({ children, trackingDisabled }: PHProviderProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (trackingDisabled) return;

    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, posthogOptions);

    setHydrated(true);
  }, [trackingDisabled]);

  if (!hydrated || trackingDisabled) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
