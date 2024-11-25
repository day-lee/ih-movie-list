interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_APP_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
