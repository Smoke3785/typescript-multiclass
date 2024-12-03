import type { Options } from "tsup";
const env = process.env.NODE_ENV;

export const tsup: Options = {
  outDir: env === "production" ? "dist" : "lib",
  entryPoints: ["src/index.ts"],
  minify: env === "production",
  watch: env === "development",
  skipNodeModulesBundle: true,
  tsconfig: "tsconfig.json",
  sourcemap: env === "prod", // source map is only available in prod
  entry: ["src/**/*.ts"],
  format: ["cjs", "esm"], // generate cjs and esm files
  target: "es2020",
  splitting: true,
  bundle: true, // This must be true, or path aliases break
  clean: true, // rimraf disr
  dts: true, // generate dts file for main module
};
