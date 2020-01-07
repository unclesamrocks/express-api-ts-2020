import { RequestHandler } from 'express'
import { hash, compare } from 'bcryptjs'
import { sign as jwtSign } from 'jsonwebtoken'

import User from '../models/user'
import { ErrorType } from '../types/error'

import { JWT_SECRET } from '../utils/process.env'

export const register: RequestHandler = async (req, res, next) => {
	try {
		const { email, password, credentials } = req.body
		const hashedPass = await hash(password, 12)
		const user = new User({ email: email, password: hashedPass })
		if (credentials) {
			user.credentials = {}
			if (credentials.firstName) user.credentials.firstName = credentials.firstName
			if (credentials.lastName) user.credentials.lastName = credentials.lastName
			if (credentials.birthDate) user.credentials.birthDate = credentials.birthDate
		}
		await user.save()
		res.status(201).json({ message: 'OK', user: user })
	} catch (error) {
		next(error)
	}
}

export const login: RequestHandler = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email: email })
		if (!user) throw new ErrorType(500, 'No user found')
		const isPassMatch = await compare(password, user.password)
		if (!isPassMatch) throw new ErrorType(500, 'Invalid password')
		const token = jwtSign({ userId: user._id.toString(), email: user.email }, JWT_SECRET!, { expiresIn: '1h' })
		res.status(200).json({ message: 'OK', token: token, userId: user._id.toString() })
	} catch (error) {
		next(error)
	}
}
