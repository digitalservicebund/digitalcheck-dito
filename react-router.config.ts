import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  async prerender() {
    return [
      "/zfl",
      "/zfl/begleitungen",
      "/zfl/schulungen",
      "/zfl/impressum",
      "/zfl/datenschutz",
      "/zfl/barrierefreiheit",
    ];
  },
} satisfies Config;
