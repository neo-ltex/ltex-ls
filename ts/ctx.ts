import { getLtexLsLatestRelease } from './get_ltex_ls_latest_release.js'
import { readPom, type Pom } from './read_pom.js'

export const _store: {
	ltexLsRelease?: Awaited<ReturnType<typeof getLtexLsLatestRelease>>,
	pom?: Pom
} = {}

export const ctx = {
	async getLtexLsLatestRelease() {
		if (_store.ltexLsRelease) return _store.ltexLsRelease
		return (_store.ltexLsRelease = await getLtexLsLatestRelease())
	},
	readPom() {
		if (_store.pom) return _store.pom
		return (_store.pom = readPom())
	}
}
