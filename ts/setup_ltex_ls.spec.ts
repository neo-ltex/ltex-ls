import { a } from 'assertron'
import { dirname } from 'dirname-filename-esm'
import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'
import tmp from 'tmp'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { ctx } from './ctx.js'
import { setupLtexLs } from './index.js'

let tmpDir: tmp.DirResult

beforeEach(() => {
	tmpDir = tmp.dirSync({ unsafeCleanup: true })
})

afterEach(() => tmpDir.removeCallback())

it('download and extract files to cache dir for windows', async () => {
	ctx.octokit.repos.listReleases = (async () => ({
		data: [
			{
				name: '16.0.0',
				tag_name: '16.0.0',
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
			},
			{
				name: '16.0.1-alpha.1.nightly.2024-01-22',
				tag_name: 'nightly',
				assets: [
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-linux-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-linux-x64.tar.gz'
					},
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-mac-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-mac-x64.tar.gz'
					},
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-windows-x64.zip',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-windows-x64.zip'
					},
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22.tar.gz'
					}
				]
			},
			{
				name: '15.2.0',
				tag_name: '15.2.0',
				assets: [
					{
						name: 'ltex-ls-15.2.0-linux-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0-linux-x64.tar.gz'
					},
					{
						name: 'ltex-ls-15.2.0-mac-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0-mac-x64.tar.gz'
					},
					{
						name: 'ltex-ls-15.2.0-windows-x64.zip',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0-windows-x64.zip'
					},
					{
						name: 'ltex-ls-15.2.0.tar.gz',
						browser_download_url: 'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0.tar.gz'
					}
				]
			}
		]
	})) as any
	ctx.getCacheDir = () => tmpDir.name
	ctx.fetch = async () =>
		new Response(createReadStream(join(dirname(import.meta), '../fixtures/dummy-ltex-ls-16.0.0-windows-x64.zip')))

	const { version, dir } = await setupLtexLs('windows')

	expect(version).toEqual('16.0.0')
	expect(dir).toEqual(join(tmpDir.name, `ltex-ls-${version}-windows`))
	expect(existsSync(join(tmpDir.name, `ltex-ls-${version}-windows-tmp`))).toBe(false)
})

it('download and extract files to cache dir with tar for linus and macos', async () => {
	ctx.octokit.repos.listReleases = (async () => ({
		data: [
			{
				name: '16.0.0',
				tag_name: '16.0.0',
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
			},
			{
				name: '16.0.1-alpha.1.nightly.2024-01-22',
				tag_name: 'nightly',
				assets: [
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-linux-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-linux-x64.tar.gz'
					},
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-mac-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-mac-x64.tar.gz'
					},
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-windows-x64.zip',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22-windows-x64.zip'
					},
					{
						name: 'ltex-ls-16.0.1-alpha.1.nightly.2024-01-22.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/nightly/ltex-ls-16.0.1-alpha.1.nightly.2024-01-22.tar.gz'
					}
				]
			},
			{
				name: '15.2.0',
				tag_name: '15.2.0',
				assets: [
					{
						name: 'ltex-ls-15.2.0-linux-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0-linux-x64.tar.gz'
					},
					{
						name: 'ltex-ls-15.2.0-mac-x64.tar.gz',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0-mac-x64.tar.gz'
					},
					{
						name: 'ltex-ls-15.2.0-windows-x64.zip',
						browser_download_url:
							'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0-windows-x64.zip'
					},
					{
						name: 'ltex-ls-15.2.0.tar.gz',
						browser_download_url: 'https://github.com/valentjn/ltex-ls/releases/download/15.2.0/ltex-ls-15.2.0.tar.gz'
					}
				]
			}
		]
	})) as any
	ctx.getCacheDir = () => tmpDir.name
	ctx.fetch = async () =>
		new Response(createReadStream(join(dirname(import.meta), '../fixtures/dummy-ltex-ls-16.0.0-linux-x64.tar.gz')))

	const { version, dir } = await setupLtexLs('linux')

	expect(version).toEqual('16.0.0')
	expect(dir).toEqual(join(tmpDir.name, `ltex-ls-${version}-linux`))
	expect(existsSync(join(tmpDir.name, `ltex-ls-${version}-linux-tmp`))).toBe(false)
})

it('asserts release must be found', async () => {
	ctx.octokit.repos.listReleases = (async () => ({
		data: []
	})) as any

	a.throws(setupLtexLs(), (err) => /Unable to find release of/.test(err.message))
})

it('asserts asset must be found', async () => {
	ctx.octokit.repos.listReleases = (async () => ({
		data: [
			{
				name: '16.0.0',
				tag_name: '16.0.0',
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
						name: 'ltex-ls-16.0.0.tar.gz',
						browser_download_url: 'https://github.com/valentjn/ltex-ls/releases/download/16.0.0/ltex-ls-16.0.0.tar.gz'
					}
				]
			}
		]
	})) as any

	a.throws(setupLtexLs('windows'), (err) => /Unable to find asset for platform 'windows'/.test(err.message))
})

it.skip(
	'save to cachedir (live)',
	async () => {
		await setupLtexLs('windows')
	},
	{ timeout: 60000 }
)
