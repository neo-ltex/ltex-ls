import { ctx } from './ctx.js'

export function getLtexLsLatestRelease() {
	return ctx.octokit.rest.repos.getLatestRelease({
		owner: 'valentjn',
		// owner: 'neo-ltex',
		repo: 'ltex-ls'
	})
}
