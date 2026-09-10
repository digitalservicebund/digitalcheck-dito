/// <reference types="astro/client" />
/// <reference types="unplugin-icons/types/astro" />

interface ImportMetaEnv {
  readonly PUBLIC_STAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
