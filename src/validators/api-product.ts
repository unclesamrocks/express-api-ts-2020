import { body, param, sanitizeBody, query } from 'express-validator'
import validator from 'validator'

import Category from '../models/category'

const { isMongoId } = validator

/*==============================================
				category await loop
===============================================*/

const sanitizeCategories = (input: string): any[] => [...new Set(JSON.parse(input))]

const sanitizeQueryCategories = (input: string): any[] => [...new Set(input.split(','))]

const checkCats = async (categoryIdArr: string[]) => {
	try {
		if (categoryIdArr.length === 0) return Promise.resolve()
		for (const categoryId of categoryIdArr) {
			if (!isMongoId(categoryId)) return Promise.reject("Category ID's are not valid MongoID's")
		}
		const catsCount = await Category.countDocuments({
			_id: {
				$in: categoryIdArr
			}
		})
		return categoryIdArr.length === catsCount ? Promise.resolve() : Promise.reject("All or some Category ID's are not valid")
	} catch (error) {
		return Promise.reject(error)
	}
}

/*==============================================
                validation
===============================================*/

export const getValidation = [
	query('categories')
		.optional()
		.customSanitizer(sanitizeQueryCategories)
		.custom(checkCats),
	query(['page', 'limit'])
		.optional()
		.customSanitizer(value => parseInt(value))
		.isInt({ min: 0 })
]

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
		.isURL({ require_host: false, allow_protocol_relative_urls: true }),
	body('categories')
		.optional()
		.customSanitizer(sanitizeCategories)
		.isArray({ min: 1 })
		.custom(checkCats)
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
		.isURL({ require_host: false, allow_protocol_relative_urls: true }),
	body('categories')
		.optional()
		.customSanitizer(sanitizeCategories)
		.isArray({ min: 1 })
		.custom(checkCats)
]

export const removeValidation = body('prodId').isMongoId()

export const findOneValidation = param('prodId').isMongoId()
