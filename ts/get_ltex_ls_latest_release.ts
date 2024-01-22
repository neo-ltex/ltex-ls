import { ctx } from './ctx.js'

export function getLtexLsLatestRelease() {
	console.info('Fetching latest ltex-ls release from GitHub')
	return ctx.octokit.rest.repos.getLatestRelease({
		owner: 'valentjn',
		// owner: 'neo-ltex',
		repo: 'ltex-ls'
	})
}
