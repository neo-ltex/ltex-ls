import assert from 'node:assert'
import { ctx } from './ctx.js'
import { getLtexLsVersion } from './get_ltex_ls_version.js'
import type { Architecture, Platform } from './types.js'

export async function getLtexLsDownloadUrl(platform: Platform, arch: Architecture = 'x64') {
	const version = getLtexLsVersion()
	const regex = new RegExp(`ltex-ls-${version}-${platform}-${arch}`)

	const release = await ctx.getLtexLsLatestRelease()
	const assets = release.data.assets
	const asset = assets.find((a) => regex.test(a.name))
	assert(asset, `Unable to find release asset of ${regex.source}`)
	return asset.browser_download_url
}
