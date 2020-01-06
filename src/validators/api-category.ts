import { body, param } from 'express-validator'

export const addValidator = [
	body('title')
		.trim()
		.isString()
		.isLength({ min: 3 })
]

export const editValidator = [
	body('title')
		.trim()
		.isString()
		.isLength({ min: 3 }),
	body('categoryId').isMongoId()
]

export const removeValidator = [
	param('categoryId')
		.trim()
		.isMongoId()
]
