/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
