import { Octokit } from '@octokit/rest'
import cachedir from 'cachedir'
import { dirname } from 'dirname-filename-esm'
import unzip from 'extract-zip'
import isCI from 'is-ci'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { rimrafSync } from 'rimraf'
import { extract } from 'tar'
import { type DirResult } from 'tmp'
import { getLtexLsLatestRelease } from './get_ltex_ls_latest_release.js'
import { readPom, type Pom } from './read_pom.js'

export const _store: {
	appId: string
	ltexLsRelease?: Awaited<ReturnType<typeof getLtexLsLatestRelease>>
	pom?: Pom
	tmpDir?: DirResult
} = {
	appId: 'neo-ltex-ltex-ls'
}

export const ctx = {
	octokit: new Octokit(),
	async getLtexLsLatestRelease() {
		if (_store.ltexLsRelease) return _store.ltexLsRelease
		return (_store.ltexLsRelease = await getLtexLsLatestRelease())
	},
	readPom() {
		if (_store.pom) return _store.pom
		return (_store.pom = readPom())
	},
	clearCacheDir: isCI
		? () => {}
		: () => {
				const dir = cachedir(_store.appId)
				rimrafSync(dir)
		  },
	getCacheDir: isCI
		? () => {
				const dir = join(dirname(import.meta), '../.cache')
				if (!existsSync(dir)) mkdirSync(dir)
				return dir
		  }
		: () => {
				const dir = cachedir(_store.appId)
				if (!existsSync(dir)) mkdirSync(dir)
				return dir
		  },
	fetch,
	extractTar(filePath: string, targetDir: string) {
		if (!existsSync(targetDir)) mkdirSync(targetDir)
		return new Promise<void>((a, r) => {
			extract(
				{
					file: filePath,
					cwd: targetDir
				},
				undefined,
				(err) => {
					if (err) r(err)
					else a()
				}
			)
		})
	},
	unzip(filePath: string, targetDir: string) {
		return unzip(filePath, { dir: targetDir })
	}
}
