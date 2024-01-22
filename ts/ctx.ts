import { Octokit } from '@octokit/rest'
import cachedir from 'cachedir'
import fs from 'node:fs'
import { getLtexLsLatestRelease } from './get_ltex_ls_latest_release.js'
import { readPom, type Pom } from './read_pom.js'

export const _store: {
	appId: string,
	ltexLsRelease?: Awaited<ReturnType<typeof getLtexLsLatestRelease>>
	pom?: Pom
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
	getCacheDir() {
		const dir = cachedir(_store.appId)
		if (!fs.existsSync(dir)) fs.mkdirSync(dir)
		return dir
	},
	fetch
}
