import { createBinaryArchive } from '../create_binary_archive.js'

(async () => {
	await createBinaryArchive('windows')
	await createBinaryArchive('linux')
	await createBinaryArchive('mac')
})()