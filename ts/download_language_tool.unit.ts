import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import tmp from 'tmp'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { ctx } from './ctx.js'
import { downloadLanguageTool } from './download_language_tool.js'

let tmpDir: tmp.DirResult

beforeEach(() => {
	tmpDir = tmp.dirSync({ unsafeCleanup: true })
})

afterEach(() => tmpDir.removeCallback())

it('save file to cachedir', async () => {
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
	ctx.fetch = async () => new Response('dummy')

	const r = await downloadLanguageTool()

	const filename = join(tmpDir.name, 'LanguageTool-6.0.zip')
	expect(r).toEqual(filename)
	expect(readFileSync(filename, 'utf-8')).toEqual('dummy')
})
