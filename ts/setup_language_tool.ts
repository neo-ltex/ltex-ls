import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ctx } from './ctx.js'

export async function setupLanguageTool() {
	const release = await ctx.octokit.repos.getLatestRelease({
		owner: 'valentjn',
		repo: 'languagetool-mirror'
	})
	const asset = release.data.assets[0]
	assert(asset, `Release ${release.data.tag_name} does not have LanguageTool asset`)
	const m = /LanguageTool-(.*).zip/.exec(asset.name)
	assert(m, `Asset name does not confirm to 'LanguageTool-<version>.zip': ${asset.name}`)
	const version = m[1]

	const cacheDir = ctx.getCacheDir()
	const zipfilePath = path.join(cacheDir, asset.name)
	if (!fs.existsSync(zipfilePath)) {
		const r = await ctx.fetch(asset.browser_download_url)

		assert(r.ok)
		assert(r.body)

		const fileStream = fs.createWriteStream(zipfilePath, { flags: 'wx' })
		await finished(Readable.fromWeb(r.body).pipe(fileStream))
	}

	// The zip file is warped in this dir.
	// extract to `dir` will create this `extractDir`
	const dir = path.join(cacheDir, `LanguageTool-${version}`)
	if (!fs.existsSync(dir)) {
		console.log('extract', zipfilePath, cacheDir)
		await ctx.unzip(zipfilePath, cacheDir)
	}

	return { version, dir }
}
