/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** True when building a static preview (PREVIEW_BUILD=true). Inlined by Vite's `define`. */
  readonly PREVIEW_BUILD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
