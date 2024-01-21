import assert from 'node:assert'
import { type Pom } from './read_pom.js'

export function getLanguageToolVersion(pom: Pom) {
	const langTool = pom.project.dependencies.dependency.find(
		(d) => d.groupId === 'org.languagetool' && d.artifactId === 'languagetool-core'
	)
	assert(langTool, 'Unable to find org.languagetool > languagetool-core')
	return langTool.version
}
