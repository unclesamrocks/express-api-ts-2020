import { ErrorType } from '../types/error'

export const { JWT_SECRET, MONGO_URI } = process.env

if (!MONGO_URI || !JWT_SECRET) {
	throw new ErrorType(500, 'Please add ".env" file to root folder with required parameters')
}
