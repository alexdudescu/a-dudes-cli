import { defineConfig } from 'tsup';

const isDev = process.env.npm_lifecycle_event === 'dev';


export default defineConfig({
    clean: true,
    entry: ["src/main.ts"],
    format: ["esm"],
    minify: !isDev,
    target: "esnext",
    outDir: "bin",
});