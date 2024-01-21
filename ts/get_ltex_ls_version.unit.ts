import { expect, it } from 'vitest'
import { readPom } from './read_pom.js'
import { getLtexLsVersion } from './get_ltex_ls_version.js'

it('gets the version from pom', () => {
	const pom = readPom()
	expect(getLtexLsVersion(pom)).toEqual(pom.project.version)
})
