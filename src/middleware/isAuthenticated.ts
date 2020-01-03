import { verify } from 'jsonwebtoken'
import { RequestHandler } from 'express'

import { ErrorType } from '../types/error'

const { JWT_SECRET } = process.env

export const isAuthenticated: RequestHandler = async (req, res, next) => {
	try {
		const getHeader = req.get('Authorization')
		if (!getHeader) throw new ErrorType(500, 'No token provided')
		const token = getHeader.split(' ')[1]
		const decodedToken: any = verify(token, JWT_SECRET!)
		if (!decodedToken) throw new ErrorType(500, 'not authenticated')
		req.userId = decodedToken.userId
		next()
	} catch (error) {
		next(error)
	}
}
