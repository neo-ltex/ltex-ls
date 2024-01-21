import { Octokit } from '@octokit/rest'

const octokit = new Octokit()

export function getLtexLsLatestRelease() {
	return octokit.rest.repos.getLatestRelease({
		owner: 'valentjn',
		// owner: 'neo-ltex',
		repo: 'ltex-ls'
	})
}
