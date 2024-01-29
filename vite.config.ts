import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			exclude: ['cjs', 'esm', 'ts/**/*.{system,perf,stress}.ts']
		},
		include: [
			process.env['TEST_SYSTEM'] ? 'ts/**/*.system.ts' : '',
			process.env['TEST_PERF'] ? 'ts/**/*.perf.ts' : '',
			process.env['TEST_STRESS'] ? 'ts/**/*.stress.ts' : '',
			'ts/**/*.{spec,test,unit,accept,integrate}.ts'
		].filter(Boolean)
	}
})
