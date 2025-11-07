import { posthog, PostHogConfig } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect } from "react";
import { POSTHOG_PROXY, POSTHOG_UI_HOST } from "~/utils/constants";

const posthogOptions: Partial<PostHogConfig> = {
  api_host: POSTHOG_PROXY,
  ui_host: POSTHOG_UI_HOST,
  defaults: "2025-05-24",
  persistence: "memory",
  cookieless_mode: "always",
  enable_heatmaps: true,
  capture_dead_clicks: true,
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
}: Readonly<PHProviderProps>) {
  useEffect(() => {
    if (!posthogEnabled || !posthogKey) return;
    posthog.init(posthogKey, posthogOptions);
  }, [posthogEnabled, posthogKey]);

  if (!posthogEnabled) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
