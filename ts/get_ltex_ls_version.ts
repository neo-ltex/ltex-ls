import type { Pom } from './read_pom.js'

export function getLtexLsVersion(pom: Pom) {
	return pom.project.version
}