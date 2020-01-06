import { Router } from 'express'

import apiProduct from './api-product'

const router = Router()

router.use('/products', apiProduct)

// router.use('/cart', apiCart)
// router.use('/category', apiCategory)

export default router
