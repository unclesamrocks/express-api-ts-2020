import { Router } from 'express'
import { body } from 'express-validator'
import validator from 'validator'

import { isErrors } from '../middleware/isErrors'

import { getAllProducts, findOne, addOne, removeOne, editOne } from '../controllers/product'

const { isURL } = validator
/*==============================================
                validation
===============================================*/

const addValidation = [
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

const editValidation = [
	body('prodId').isMongoId(),
	body('title')
		.trim()
		.isString()
		.isLength({ min: 5 }),
	body('price').isFloat({ min: 0, max: Infinity }),
	body('descSmall').isLength({ max: 20 }),
	body('rating').isInt({ min: 1, max: 5 }),
	body('descFull').isLength({ min: 10 }),
	body('imageUrl').isURL({ require_host: false, allow_protocol_relative_urls: true })
]

const removeValidation = body('prodId').isMongoId()

/*==============================================
                routes
===============================================*/
const router = Router()

router.get('/', getAllProducts)

router.get('/item/:prodId', findOne)

router.post('/add', addValidation, isErrors, addOne)

router.post('/edit', editValidation, isErrors, editOne)

router.post('/remove', removeValidation, isErrors, removeOne)

export default router
