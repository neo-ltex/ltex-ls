import { dirname } from 'dirname-filename-esm'
import { createReadStream, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import tmp from 'tmp'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { ctx } from './ctx.js'
import { setupLanguageTool } from './setup_language_tool.js'

let tmpDir: tmp.DirResult

beforeEach(() => {
	tmpDir = tmp.dirSync({ unsafeCleanup: true })
})

afterEach(() => tmpDir.removeCallback())

it('download and extract files to cache dir', async () => {
	ctx.octokit.repos.getLatestRelease = (async () => ({
		data: {
			assets: [
				{
					name: 'LanguageTool-6.0.zip',
					url: 'https://api.github.com/repos/valentjn/languagetool-mirror/releases/assets/95316489',
					browser_download_url:
						'https://github.com/valentjn/languagetool-mirror/releases/download/6.0/LanguageTool-6.0.zip'
				}
			]
		}
	})) as any
	ctx.getCacheDir = () => tmpDir.name
	ctx.fetch = async () =>
		new Response(createReadStream(join(dirname(import.meta), '../fixtures/dummy-language-tool.zip')))

	const { version, dir } = await setupLanguageTool()

	expect(version).toEqual('6.0')

	expect(readdirSync(dir)).toEqual(['dummy.txt'])
	expect(readFileSync(join(dir, 'dummy.txt'), 'utf-8')).toEqual('dummy')
})

it.skip(
	'save to cachedir (live)',
	async () => {
		await setupLanguageTool()
	},
	{ timeout: 60000 }
)
