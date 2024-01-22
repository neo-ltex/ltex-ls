import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ctx } from './ctx.js'

export async function downloadLanguageTool() {
	const release = await ctx.octokit.repos.getLatestRelease({
		owner: 'valentjn',
		repo: 'languagetool-mirror'
	})
	const asset = release.data.assets[0]
	assert(asset, `Release ${release.data.tag_name} does not have LanguageTool asset`)

	const r = await ctx.fetch(asset.browser_download_url)

	assert(r.ok)
	assert(r.body)

	const dir = ctx.getCacheDir()

	const filePath = path.join(dir, asset.name)
	const fileStream = fs.createWriteStream(filePath, { flags: 'wx' })
	await finished(Readable.fromWeb(r.body).pipe(fileStream))
	return filePath
}
