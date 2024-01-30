import cachedir from 'cachedir'
import fs from 'node:fs'
import { expect, it } from 'vitest'
import { _store, ctx } from './ctx.js'

it('create cachedir', () => {
	_store.appId = 'some-dummy-app'
	const dir = cachedir(_store.appId)
	if (fs.existsSync(dir)) fs.rmdirSync(dir)

	const r = ctx.getCacheDir()
	expect(r).toMatch(/some-dummy-app$/)
	expect(fs.existsSync(r)).toBe(true)
})
