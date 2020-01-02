import { Router } from 'express'

import { isErrors } from '../middleware/isErrors'
import { addValidation, editValidation, removeValidation, findOneValidation } from '../validators/api-product'
import multer from '../middleware/multer'

import { getAllProducts, findOne, addOne, removeOne, editOne, removeAll } from '../controllers/product'

/*==============================================
                routes
===============================================*/
const router = Router()

router.get('/', getAllProducts)

router.get('/item/:prodId', findOneValidation, isErrors, findOne)

router.post('/add', multer.single('file'), addValidation, isErrors, addOne)

router.post('/edit', multer.single('file'), editValidation, isErrors, editOne)

router.post('/remove', removeValidation, isErrors, removeOne)

router.delete('/removeAll', removeAll)

export default router
