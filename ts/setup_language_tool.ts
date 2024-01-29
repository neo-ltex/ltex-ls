import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'
import { ctx } from './ctx.js'
import { downloadAsset } from './download_asset.js'

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
		console.info(`Cannot find LanguageTool Archive at '${zipfilePath}', downloading...`)
		await downloadAsset(asset, zipfilePath)
	}

	// The zip file is warped in this dir.
	// extract to `dir` will create this `extractDir`
	const dir = path.join(cacheDir, `LanguageTool-${version}`)
	if (!fs.existsSync(dir)) {
		console.info(`Extracting LanguageTool to ${dir}...`)
		await ctx.unzip(zipfilePath, cacheDir)
		fs.rmSync(zipfilePath)
	}
	const jarPath = path.join(dir, 'languagetool.jar')
	const dictionaries = searchForDictionaries(dir)

	return { version, dir, jarPath, dictionaries }
}

export type LanguageTool = Awaited<ReturnType<typeof setupLanguageTool>>

function searchForDictionaries(dir: string) {
	const resDir = path.join(dir, 'org', 'languagetool', 'resource')
	return fs
		.readdirSync(resDir)
		.map((d) => path.join(resDir, d, 'hunspell'))
		.filter((p) => fs.existsSync(p) && fs.statSync(p).isDirectory())
		.flatMap((d) => fs.readdirSync(d).map((f) => path.join(d, f)))
		.filter((p) => {
			if (!fs.statSync(p).isFile() || path.extname(p) !== '.dict') return false

			const i = `${p.slice(0, -5)}.info`
			return fs.existsSync(i) && fs.statSync(i).isFile()
		})
		.map((dictFilePath) => {
			const dir = path.dirname(dictFilePath)
			const filePath = dictFilePath.slice(0, -5)
			const infoFilePath = `${filePath}.info`
			const filename = path.basename(dictFilePath)
			const language = filename.slice(0, -5).replace('_', '-')
			return { dir, language, dictFilePath, infoFilePath }
		})
}
