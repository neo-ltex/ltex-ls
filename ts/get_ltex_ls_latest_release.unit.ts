import { a } from 'assertron'
import { it } from 'vitest'
import { getLtexLsLatestRelease } from './get_ltex_ls_latest_release.js'

it('gets latest release of ltex-ls', async () => {
	const release = await getLtexLsLatestRelease()
	a.satisfies(release, {
		status: 200,
		url: /ltex-ls\/releases\/latest$/
	})
})
