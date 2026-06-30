import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
    alias: {
      react: resolve(__dirname, "node_modules/react"),
      "react-dom": resolve(__dirname, "node_modules/react-dom"),
      "react/jsx-runtime": resolve(
        __dirname,
        "node_modules/react/jsx-runtime",
      ),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./app/test/setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    server: {
      deps: {
        inline: [
          "@testing-library/react",
          "@testing-library/user-event",
          "@testing-library/jest-dom",
        ],
      },
    },
    coverage: {
      provider: "v8",
      include: ["app/hooks/**", "app/routes/**"],
    },
  },
});
