import { Octokit } from '@octokit/rest'
import cachedir from 'cachedir'
import unzip from 'extract-zip'
import isCI from 'is-ci'
import { existsSync, mkdirSync } from 'node:fs'
import { rimrafSync } from 'rimraf'
import { extract } from 'tar'
import { dirSync, type DirResult } from 'tmp'
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
		? () => {
				if (_store.tmpDir) _store.tmpDir.removeCallback()
		  }
		: () => {
				const dir = cachedir(_store.appId)
				rimrafSync(dir)
		  },
	getCacheDir: isCI
		? () => {
				_store.tmpDir = dirSync()
				return _store.tmpDir.name
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
