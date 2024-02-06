import { dirname } from 'dirname-filename-esm'
import { join} from 'node:path'
import  {existsSync}from 'node:fs'
import { setupJava } from './setup_java.js'
import { setupLtexLs } from './setup_ltex_ls.js'
import type { Architecture, Platform } from './types.js'

export async function createBinaryArchive(platform: Platform, arch: Architecture = 'x64') {
	console.info(`Processing platform/arch '${platform}/${arch}'...`)

	const targetDirPath = join(dirname(import.meta), '..', 'target')
	const ltex = await setupLtexLs(platform)
	const archiveformat = platform === 'windows' ? 'zip' : 'gztar'
	const archiveFilename = `ltex-ls-${ltex.version}-${platform}-${arch}${platform==='windows'? '.zip': '.tar.gz'}`
	const archivePath = join(targetDirPath, archiveFilename)
	if(existsSync(archivePath)) {
		console.info(`Archive 'target/${archiveFilename}' already exists, skipping...`)
		return
	}

	const {createDistribution} = await setupJava(platform, arch)
	await createDistribution(archivePath)
}