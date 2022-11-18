import { readdir, unlink } from "fs/promises"

async function limitFiles(fileName: string) {
	try {
		const dir = "./public/uploads"

		const files = await readdir(dir, { encoding: "utf-8", withFileTypes: true })

		if (files.length > 12) {
			const selected = files.filter((e) => e.name !== fileName)
			unlink(`${dir}/${selected[0].name}`)
		}
	} catch (err) {
		console.error(err)
		throw err
	}
}

export { limitFiles }
