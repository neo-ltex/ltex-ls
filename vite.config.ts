import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			exclude: ['cjs', 'esm', 'ts/**/*.{system,perf,stress}.ts']
		},
		include: [
			// 'ts/**/*.{system,perf,stress}.ts',
			'ts/**/*.{spec,test,unit,accept,integrate}.ts'
		]
	}
})
