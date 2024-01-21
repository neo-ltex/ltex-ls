import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['ts/**/*.{spec,test,unit,accept,integrate,system,perf,stress}.ts']
	}
})
