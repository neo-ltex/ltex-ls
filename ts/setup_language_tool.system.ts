import { it } from 'vitest'
import { setupLanguageTool } from './setup_language_tool.js'

it(
	'save to cachedir (live)',
	async () => {
		const { dir, jarPath, version } = await setupLanguageTool()
		console.info(`language tools root dir: ${dir}
version: ${version}
jar file: ${jarPath}`)
	},
	{ timeout: 60000 }
)
