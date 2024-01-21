import { expect, it } from 'vitest'
import pkg from '../package.json' with { type: 'json' }
import { getPackageInfo } from './get_package_info.js'

it('gets version from package.json', () => {
	expect(getPackageInfo().version).toEqual(pkg.version)
})

it('has organization', () => {
	expect(getPackageInfo().organization).toEqual('neo-ltex')
})

it('has repository', () => {
	expect(getPackageInfo().repository).toEqual('ltex-ls')
})
