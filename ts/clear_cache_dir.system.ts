import fs from 'node:fs'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import { _store, ctx } from './ctx.js'
import { clearCacheDir } from './index.js'

it('removes the cache dir completely', () => {
	_store.appId = 'neo-ltex-clear-cache-dir'
	const dir = ctx.getCacheDir()
	fs.writeFileSync(join(dir, 'dummy.txt'), 'dummy')

	clearCacheDir()

	expect(fs.existsSync(dir)).toBe(false)
})
