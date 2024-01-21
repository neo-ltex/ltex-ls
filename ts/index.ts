import { Octokit } from '@octokit/rest'

const octokit = new Octokit()

const latestRelease = await octokit.rest.repos.getLatestRelease({
	owner: 'neo-ltex',
	repo: 'languagetool-mirror'
})

console.log(latestRelease)