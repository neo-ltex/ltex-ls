import { ok } from 'node:assert'
import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ctx } from './ctx.js'

export async function downloadAsset(asset: { name: string; browser_download_url: string }, zipfilePath: string) {
	const r = await ctx.fetch(asset.browser_download_url)

	ok(r.ok)
	ok(r.body)

	const fileStream = createWriteStream(zipfilePath, { flags: 'wx' })
	await finished(Readable.fromWeb(r.body).pipe(fileStream))
}
