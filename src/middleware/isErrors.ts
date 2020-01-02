import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { ErrorType } from '../types/error'

export const isErrors = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			// pass error to error middleware
			const error = new ErrorType(422, 'Validation failed')
			error.data = errors.array()
			throw error
		}
		next()
	} catch (error) {
		next(error)
	}
}
