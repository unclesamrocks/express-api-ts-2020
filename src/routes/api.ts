import { Router } from 'express'

import apiProduct from './api-product'
import apiCategory from './api-category'
import apiCart from './api-cart'

const router = Router()

router.use('/products', apiProduct)
router.use('/category', apiCategory)
router.use('/cart', apiCart)

export default router
