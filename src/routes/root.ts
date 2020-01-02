import express, { Request, Response, NextFunction } from 'express'

import { getTime } from '../utils/misc'
import { ErrorType } from '../types/error'

import apiRouter from './api'

const router = express.Router()

router.use('/api', apiRouter)

// error middleware
router.use((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
	if (err.message === 'Validation failed') {
		console.log('[errorMiddleware]', getTime(), err.message)
	} else {
		console.log('[errorMiddleware]', getTime(), err)
	}
	res.status(err.statusCode || 500).json({ message: err.message, data: err.data || null })
})

export default router
