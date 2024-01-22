import assert from 'node:assert'
import pkg from '../package.json' with { type: 'json' }

export function getPackageInfo() {
	const { version, ltex } = pkg
	const repositoryUrl = pkg.repository.url
	const m = /github.com\/(.*?)\/(.*)\.git$/.exec(repositoryUrl)
	assert(m, 'could not extract organization, repository from package.json/repository/url')
	const [, organization, repository] = m
	return { version, ltex, organization, repository }
}
