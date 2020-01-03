import express, { Response } from 'express'

import apiRouter from './api'
import authRouter from './auth'

const router = express.Router()

router.use('/api', apiRouter)
router.use('/auth', authRouter)

router.use((_, res: Response) => res.status(404).json({ status: 404, message: '404 - Not found' }))

export default router
