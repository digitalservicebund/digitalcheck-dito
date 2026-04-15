import type { Config } from "@react-router/dev/config";
import { isPreview } from "./app/utils/preview";
import { previewConfig } from "./react-router-preview.config";

const defaultConfig = {
  ssr: true,
} satisfies Config;

export default isPreview ? previewConfig : defaultConfig;
