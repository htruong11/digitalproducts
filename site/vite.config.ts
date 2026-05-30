import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const siteRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = fileURLToPath(new URL("../dist", import.meta.url));

export default defineConfig({
  root: siteRoot,
  base: "/digitalproducts/",
  build: {
    outDir: outputDir,
    emptyOutDir: true,
  },
});
