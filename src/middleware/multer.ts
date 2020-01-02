import multer, { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

import DIRS from '../utils/path'

const storage = diskStorage({
	destination: (req, file, cb) => cb(null, DIRS.TEMP),
	filename: (req, file, cb) => cb(null, `${file.originalname.split('.').shift()}-${uuidv4()}.${file.originalname.split('.').pop()}`)
})

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/svg+xml' ||
		file.mimetype === 'application/pdf'
	) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

export default upload
