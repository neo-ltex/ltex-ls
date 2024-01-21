import { a } from 'assertron'
import { it } from 'vitest'
import { ctx } from './ctx.js'
import { getLtexLsDownloadUrl } from './get_ltex_ls_download_url.js'
import { getLtexLsVersion } from './get_ltex_ls_version.js'

it('gets url by platform', async () => {
	const w = await getLtexLsDownloadUrl('windows')
	const l = await getLtexLsDownloadUrl('linux')
	const m = await getLtexLsDownloadUrl('mac')

	const version = getLtexLsVersion( ctx.readPom())

	a.satisfies(w, new RegExp(`ltex-ls\/releases\/download\/16.0.0\/ltex-ls-${version}-windows-x64.zip`))
	a.satisfies(l, new RegExp(`ltex-ls\/releases\/download\/16.0.0\/ltex-ls-${version}-linux-x64.tar.gz`))
	a.satisfies(m, new RegExp(`ltex-ls\/releases\/download\/16.0.0\/ltex-ls-${version}-mac-x64.tar.gz`))
})