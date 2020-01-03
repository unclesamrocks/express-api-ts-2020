import { Router } from 'express'

import { register, login } from '../controllers/auth'
import { registerValidator, loginValidator } from '../validators/auth'
import { isErrors } from '../middleware/isErrors'

const router = Router()

router.post('/register', registerValidator, isErrors, register)

router.post('/login', loginValidator, isErrors, login)

export default router
