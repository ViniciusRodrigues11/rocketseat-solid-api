import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      reporter: ["html"],
      exclude: [
        "src/config",
        "src/repositories/interfaces",
        "src/*.ts",
        "src/@types",
        "src/plugins",
        "src/env",
        "src/utils",
        "prisma",
      ],
    },
    environmentMatchGlobs: [["tests/integration/**/*.test.ts", "prisma"]],
  },
});
