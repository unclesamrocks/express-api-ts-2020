import fs from 'fs'

export const deleteFile = (path: string) => {
	return new Promise((res, rej) => {
		fs.unlink(path, err => {
			if (err && err.code !== 'ENOENT') rej(err)
			else res()
		})
	})
}

export const copyFile = (from: string, to: string) => {
	return new Promise((res, rej) => {
		fs.copyFile(from, to, err => {
			if (err) rej(err)
			else res()
		})
	})
}
