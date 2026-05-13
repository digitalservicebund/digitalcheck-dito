interface ImportMetaEnv {
  readonly PUBLIC_STAGE: string;
  readonly BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
