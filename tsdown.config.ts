import { defineConfig } from 'tsdown'

export default defineConfig({
	dts: true,
	entry: ['src/v*/**/!(*.test).ts'],
	// @remarks `minify` still in alpha
	// https://tsdown.dev/options/minification
	minify: {
		// compress: true,
		// mangle: true,
		removeWhitespace: true,
	},
	outDir: 'dist',
	outputOptions: {
		preserveModulesRoot: 'src',
	},
	platform: 'neutral',
	unbundle: true,
	external: [/^node:/],
})
