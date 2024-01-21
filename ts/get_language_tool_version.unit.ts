import { expect, it } from 'vitest'
import { getLanguageToolVersion } from './get_language_tool_version.js'

it('get version in pom.xml', () => {
	const version = getLanguageToolVersion()
	expect(version).toEqual('6.0')
})
