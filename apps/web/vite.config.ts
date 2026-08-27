import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		tanstackStart(),
		nitro({ preset: "node-server" }),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	],
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		port: 3001,
	},
});
