import { Router } from 'express'
import { body } from 'express-validator'
import validator from 'validator'

import { isErrors } from '../middleware/isErrors'

import { getAllProducts, findOne, addOne } from '../controllers/product'

const { isURL } = validator
/*==============================================
                validation
===============================================*/

const validation = [
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

/*==============================================
                routes
===============================================*/
const router = Router()

router.get('/', getAllProducts)

router.post('/findOne', findOne)

router.post('/addOne', validation, isErrors, addOne)

export default router
