/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BF_API_KEY: string
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 