import { body, param } from 'express-validator'

/*==============================================
                validation
===============================================*/

export const addValidation = [
	body('title')
		.trim()
		.isString()
		.isLength({ min: 5 }),
	body('price').isFloat({ min: 0, max: Infinity }),
	body('descSmall')
		.optional()
		.isLength({ max: 20 }),
	body('rating')
		.optional()
		.isInt({ min: 1, max: 5 }),
	body('descFull')
		.optional()
		.isLength({ min: 10 }),
	body('imageUrl')
		.optional()
		.isURL({ require_host: false, allow_protocol_relative_urls: true })
]

export const editValidation = [
	body('prodId').isMongoId(),
	body('title')
		.trim()
		.isString()
		.isLength({ min: 5 }),
	body('price').isFloat({ min: 0, max: Infinity }),
	body('descSmall').isLength({ max: 20 }),
	body('rating').isInt({ min: 1, max: 5 }),
	body('descFull').isLength({ min: 10 }),
	body('imageUrl')
		.optional()
		.isURL({ require_host: false, allow_protocol_relative_urls: true })
]

export const removeValidation = body('prodId').isMongoId()

export const findOneValidation = param('prodId').isMongoId()
