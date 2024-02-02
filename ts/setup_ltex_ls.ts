import { ok } from 'node:assert'
import { existsSync, renameSync, rmdirSync } from 'node:fs'
import { join } from 'node:path'
import { ctx } from './ctx.js'
import { downloadAsset } from './download_asset.js'
import { getLtexLsVersion } from './get_ltex_ls_version.js'
import type { Platform } from './types.js'

export async function setupLtexLs(platform: Platform | undefined = getCurrentPlatform()) {
	const version = getLtexLsVersion()
	const releases = await ctx.octokit.repos.listReleases({
		owner: 'valentjn',
		repo: 'ltex-ls'
	})
	const release = releases.data.find((r) => r.name === version)

	ok(release, `Unable to find release of ${version}`)

	const assetRegex = new RegExp(`ltex-ls-${release.name}-${platform}`)
	const asset = release.assets.find((a) => assetRegex.test(a.name))
	ok(asset, `Unable to find asset for platform '${platform}'`)

	const cacheDir = ctx.getCacheDir()
	const archivefilePath = join(cacheDir, asset.name)
	if (!existsSync(archivefilePath)) {
		console.info(`Cannot find ltex-ls Archive at '${archivefilePath}', downloading...`)
		await downloadAsset(asset.browser_download_url, archivefilePath)
	}

	const dir = join(cacheDir, `ltex-ls-${release.name}-${platform}`)
	if (!existsSync(dir)) {
		console.info(`Extracting ltex-ls to ${dir}...`)
		platform === 'windows'
			? await ctx.unzip(archivefilePath, `${dir}-tmp`)
			: await ctx.extractTar(archivefilePath, `${dir}-tmp`)
		renameSync(join(`${dir}-tmp`, `ltex-ls-${release.name}`), dir)
		rmdirSync(`${dir}-tmp`)
	}
	return { version: release.name, dir }
}

function getCurrentPlatform() {
	switch (process.platform) {
		case 'win32':
			return 'windows'
		case 'darwin':
			return 'mac'
		default:
			return 'linux'
	}
}
