import { it } from 'vitest'
import { createCompletionLists } from './create_completion_lists.js'

it(
	'create completion list',
	async () => {
		await createCompletionLists()
	},
	{ timeout: 60000 }
)
