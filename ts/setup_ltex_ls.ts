import { ok } from 'node:assert'
import { existsSync, renameSync, rmdirSync } from 'node:fs'
import { join } from 'node:path'
import { ctx } from './ctx.js'
import { downloadAsset } from './download_asset.js'
import { getPackageInfo } from './get_package_info.js'

export async function setupLtexLs(platform: 'windows' | 'mac' | 'linux' | undefined = getCurrentPlatform()) {
	const { version, ltex } = getPackageInfo()
	const releases = await ctx.octokit.repos.listReleases({
		owner: 'valentjn',
		repo: 'ltex-ls'
	})
	const release = releases.data.find((r) => r.name === version) ?? releases.data.find((r) => r.name === ltex.version)

	ok(release, `Unable to find release of ${version}${ltex?.version ?? ''}`)

	const assetRegex = new RegExp(`ltex-ls-${release.name}-${platform}`)
	const asset = release.assets.find((a) => assetRegex.test(a.name))
	ok(asset, `Unable to find asset for platform '${platform}'`)

	const cacheDir = ctx.getCacheDir()
	const zipfilePath = join(cacheDir, asset.name)
	if (!existsSync(zipfilePath)) {
		console.info(`Cannot find ltex-ls Archive at '${zipfilePath}', downloading...`)
		await downloadAsset(asset, zipfilePath)
	}

	const dir = join(cacheDir, `ltex-ls-${release.name}-${platform}`)
	if (!existsSync(dir)) {
		console.info(`Extracting ltex-ls to ${dir}...`)
		platform === 'windows' ? await ctx.unzip(zipfilePath, `${dir}-tmp`)
		: await ctx.extractTar(zipfilePath, `${dir}-tmp`)
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
