import { a } from 'assertron'
import { it } from 'vitest'
import { getLtexLsDownloadUrl } from './get_ltex_ls_download_url.js'
import { getLtexLsVersion } from './get_ltex_ls_version.js'
import { ctx } from './ctx.js'

it('gets url by platform', async () => {
	ctx.getLtexLsLatestRelease = async () =>
		({
			data: {
				assets: [
					{
						name: 'ltex-ls-16.0.0-linux-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/16.0.0/ltex-ls-16.0.0-linux-x64.tar.gz'
					},
					{
						name: 'ltex-ls-16.0.0-mac-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/16.0.0/ltex-ls-16.0.0-mac-x64.tar.gz'
					},
					{
						name: 'ltex-ls-16.0.0-windows-x64.zip',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/16.0.0/ltex-ls-16.0.0-windows-x64.zip'
					},
					{
						name: 'ltex-ls-16.0.0.tar.gz',
						browser_download_url: 'https://github.com/valentjn/ltex-ls/releases/download/16.0.0/ltex-ls-16.0.0.tar.gz'
					}
				]
			}
		}) as any
	const w = await getLtexLsDownloadUrl('windows')
	const l = await getLtexLsDownloadUrl('linux')
	const m = await getLtexLsDownloadUrl('mac')

	const version = getLtexLsVersion()

	a.satisfies(w, new RegExp(`ltex-ls\/releases\/download\/16.0.0\/ltex-ls-${version}-windows-x64.zip`))
	a.satisfies(l, new RegExp(`ltex-ls\/releases\/download\/16.0.0\/ltex-ls-${version}-linux-x64.tar.gz`))
	a.satisfies(m, new RegExp(`ltex-ls\/releases\/download\/16.0.0\/ltex-ls-${version}-mac-x64.tar.gz`))
})
