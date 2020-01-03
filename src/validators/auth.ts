import { body } from 'express-validator'

import User from '../models/user'

export const registerValidator = [
	body('email')
		.isEmail()
		.custom(value => {
			return User.findOne({ email: value }).then(user => {
				if (user) return Promise.reject('Email already in use')
				else return true
			})
		}),
	body('password').isLength({ min: 6 }),
	body('credentials').optional(),
	body('credentials.firstName')
		.optional()
		.isLength({ min: 1 }),
	body('credentials.lastName')
		.optional()
		.isLength({ min: 1 }),
	body('credentials.birthDate')
		.optional()
		.custom(value => new Date(value) > new Date('1900-01-01'))
]

export const loginValidator = [body('email').isEmail(), body('password').isLength({ min: 6 })]
