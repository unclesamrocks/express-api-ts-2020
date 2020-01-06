import { Router } from 'express'

import { getCategories, addCategory, editCategory, removeCategory, removeAllCategories } from '../controllers/category'

import { addValidator, editValidator, removeValidator } from '../validators/api-category'

import { isErrors } from '../middleware/isErrors'
import { isAdmin, isAuthenticated } from '../middleware/auth'

const router = Router()

router.get('/', getCategories)

router.post('/add', isAuthenticated, isAdmin, addValidator, isErrors, addCategory)

router.post('/edit', isAuthenticated, isAdmin, editValidator, isErrors, editCategory)

router.delete('/remove/:categoryId', isAuthenticated, isAdmin, removeValidator, removeCategory)

router.delete('/removeAll', isAuthenticated, isAdmin, removeAllCategories)

export default router
