import { dirname } from 'dirname-filename-esm'
import path from 'node:path'
import fs from 'node:fs'
import { XMLParser } from 'fast-xml-parser'

export function getLanguageToolVersion() {
	const pomXML = fs.readFileSync(
		path.join(dirname(import.meta), '../pom.xml'),
		'utf-8',
	)
	const parser = new XMLParser({ parseTagValue: false })
	const pom = parser.parse(pomXML)
	const dependencies: Array<{
		artifactId: string
		groupId: string
		version: string
	}> = pom.project.dependencies.dependency
	const langTool = dependencies.find(
		(d) =>
			d.groupId === 'org.languagetool' && d.artifactId === 'languagetool-core',
	)
	return langTool?.version
}
