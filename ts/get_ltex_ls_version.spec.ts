import { expect, it } from 'vitest'
import { getLtexLsVersion } from './index.js'
import { readPom } from './read_pom.js'

it('gets the version from pom', () => {
	const pom = readPom()
	expect(getLtexLsVersion()).toEqual(pom.project.version)
})
