import { Router } from 'express'

import { isErrors } from '../middleware/isErrors'
import { addValidation, editValidation, removeValidation, findOneValidation } from '../validators/api-product'
import multer from '../middleware/multer'
import { isAdmin, isAuthenticated as isAuth } from '../middleware/auth'

import { getAllProducts, findOne, addOne, removeOne, editOne, removeAll } from '../controllers/product'

/*==============================================
                routes
===============================================*/
const router = Router()

router.get('/', getAllProducts)

router.get('/item/:prodId', findOneValidation, isErrors, findOne)

router.post('/add', isAuth, isAdmin, multer.single('file'), addValidation, isErrors, addOne)

router.post('/edit', isAuth, isAdmin, multer.single('file'), editValidation, isErrors, editOne)

router.post('/remove', isAuth, isAdmin, removeValidation, isErrors, removeOne)

router.delete('/removeAll', isAuth, isAdmin, removeAll)

export default router
