import { ok } from 'node:assert'
import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { finished } from 'node:stream/promises'
import { ctx } from './ctx.js'

export async function downloadAsset(url: string, zipfilePath: string) {
	const r = await ctx.fetch(url)

	ok(r.ok)
	ok(r.body)

	const fileStream = createWriteStream(zipfilePath, { flags: 'wx' })
	await finished(Readable.fromWeb(r.body).pipe(fileStream))
}
