import { ctx } from './ctx.js'

export function getLtexLsVersion() {
	const pom = ctx.readPom()
	return pom.project.version
}
