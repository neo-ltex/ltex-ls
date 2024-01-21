import { dirname } from 'dirname-filename-esm'
import { XMLParser } from 'fast-xml-parser'
import fs from 'node:fs'
import path from 'node:path'

export type Pom = {
	project: {
		dependencies: {
			dependency: Array<{
				artifactId: string
				groupId: string
				version: string
			}>
		}
	}
}

export function readPom(): Pom {
	const pomXML = fs.readFileSync(path.join(dirname(import.meta), '../pom.xml'), 'utf-8')
	const parser = new XMLParser({ parseTagValue: false })
	return parser.parse(pomXML)
}
