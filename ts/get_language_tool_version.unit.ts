import { expect, it } from 'vitest'
import { getLanguageToolVersion } from './get_language_tool_version.js'
import { readPom } from './read_pom.js'

it('get version in pom.xml', () => {
	const version = getLanguageToolVersion(readPom())
	expect(version).toEqual('6.0')
})
