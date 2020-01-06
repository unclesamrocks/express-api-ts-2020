import { Router } from 'express'

import { getCart, removeCart, addToCart, removeFromCart } from '../controllers/cart'

import { isAuthenticated } from '../middleware/auth'
import { editValidator } from '../validators/api-cart'
import { isErrors } from '../middleware/isErrors'

const router = Router()

router.get('/', isAuthenticated, getCart)

router.post('/add', isAuthenticated, editValidator, isErrors, addToCart)

router.post('/remove', isAuthenticated, editValidator, isErrors, removeFromCart)

router.delete('/removeCart', isAuthenticated, removeCart)

export default router
