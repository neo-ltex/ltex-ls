import assert from 'node:assert'
import { ctx } from './ctx.js'
import { getLtexLsVersion } from './get_ltex_ls_version.js'

export async function getLtexLsDownloadUrl(platform: 'windows' | 'linux' | 'mac', arch: 'x64' = 'x64') {
	const pom = ctx.readPom()
	const version = getLtexLsVersion(pom)
	const regex = new RegExp(`ltex-ls-${version}-${platform}-${arch}`)

	const release = await ctx.getLtexLsLatestRelease()
	const assets = release.data.assets
	const asset = assets.find((a) => regex.test(a.name))
	assert(asset, `Unable to find release asset of ${regex.source}`)
	return asset.browser_download_url
}
