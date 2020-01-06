import { verify } from 'jsonwebtoken'
import { RequestHandler } from 'express'

import { ErrorType } from '../types/error'

import User from '../models/user'

const { JWT_SECRET } = process.env

export const isAuthenticated: RequestHandler = async (req, res, next) => {
	try {
		const getHeader = req.get('Authorization')
		if (!getHeader) throw new ErrorType(500, 'No token provided')
		const token = getHeader.split(' ')[1]
		const decodedToken: any = verify(token, JWT_SECRET!)
		if (!decodedToken) throw new ErrorType(500, 'Not authenticated')
		req.userId = decodedToken.userId
		next()
	} catch (error) {
		next(error)
	}
}

export const isAdmin: RequestHandler = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId)
		if (!user || user.isAdmin !== true) throw new ErrorType(500, 'User not found || not Admin')
		next()
	} catch (error) {
		next(error)
	}
}
