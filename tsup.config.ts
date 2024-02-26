import { defineConfig } from 'tsup';

const isDev = process.env.NODE_ENV;

export default defineConfig({
    clean: true,
    entry: ["src/main.ts"],
    format: ["cjs"],
    minify: !isDev,
    target: "esnext",
    outDir: "bin",
    onSuccess: isDev ? "node dist/index.js" : undefined,
});