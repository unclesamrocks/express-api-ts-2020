import { Router } from 'express'

import apiProduct from './api-product'
import apiUser from './api-user'

const router = Router()

router.use('/products', apiProduct)
router.use('/auth', apiUser)

export default router
