import express, { Response } from 'express'

import apiRouter from './api'

const router = express.Router()

router.use('/api', apiRouter)

router.use((_, res: Response) => res.status(404).json({ message: '404 - Not found' }))

export default router
