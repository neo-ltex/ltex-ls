import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			exclude: ['cjs', 'esm']
		},
		include: ['ts/**/*.{spec,test,unit,accept,integrate,system,perf,stress}.ts']
	}
})
