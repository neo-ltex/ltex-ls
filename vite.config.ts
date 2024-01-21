import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: [
			"**/*.{spec,test,unit,accept,integrate,system,perf,stress}.ts"
		],
		root: './ts'
	}
})