import { dirname } from 'dirname-filename-esm'
import { execa } from 'execa'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileSync } from 'tmp'
import { setupLanguageTool, type LanguageTool } from './setup_language_tool.js'

export async function createCompletionLists() {
	const langTool = await setupLanguageTool()
	const targetDirPath = join(dirname(import.meta), '..', 'src', 'main', 'resources')

	return Promise.allSettled(
		langTool.dictionaries
			// In other languages, dictionaries are either missing (e.g., French), very large (e.g., Breton),
			// or don't have a delimiter between the entries (e.g., Italian)
			.filter((dict) => dict.language.startsWith('de-') || dict.language.startsWith('en-'))
			.map((dict) => createCompletionList(langTool, dict, targetDirPath))
	)
}

async function createCompletionList(
	langTool: {
		version: string
		dir: string
		jarPath: string
	},
	dict: LanguageTool['dictionaries'][0],
	targetDirPath: string
) {
	console.info(`Creating completion list for language '${dict.language}'...`)

	const tmpFile = fileSync()

	await execa('java', [
		'-cp',
		langTool.jarPath,
		'org.languagetool.tools.DictionaryExporter',
		'-i',
		dict.dictFilePath,
		'-info',
		dict.infoFilePath,
		'-o',
		tmpFile.name
	])

	const targetFilePath = join(targetDirPath, `completionList.${dict.language}.txt`)
	const dictText = readFileSync(tmpFile.name, 'utf-8')
	writeFileSync(
		targetFilePath,
		dictText
			.split('\n')
			// Do not know why do we need to do this
			.slice(1)
			.filter((_, i) => !(i % 2))
			// This removes the extra ` A\t` on each line.
			// TODO: understand the data structure
			// https://github.com/languagetool-org/languagetool/blob/master/languagetool-tools/src/main/java/org/languagetool/tools/DictionaryExporter.java
			.map((l) => l.slice(2))
			.join('\n')
	)
	tmpFile.removeCallback()
}
