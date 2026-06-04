/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STAGE: string;
  readonly PUBLIC_POSTHOG_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
