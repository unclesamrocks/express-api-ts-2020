import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import { getTime } from './utils/misc'
import { ErrorType } from './types/error'
import DIRS from './utils/path'

import rootRouter from './routes/root'

const { MONGO_URI } = process.env

/*==============================================
                app
===============================================*/
const app = express()

app.use(cors())
app.use(json())

app.use(express.static(DIRS.PUBLIC))

app.use(rootRouter)

/*==============================================
                error middleware
===============================================*/
app.use((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
	if (err.message === 'Validation failed') {
		console.log('[errorMiddleware]', getTime(), err.message)
	} else if (err.name === 'SyntaxError') {
		console.log('[errorMiddleware][SyntaxError]', getTime(), err.message)
	} else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
		console.log('[errorMiddleware][JWT][Error]', getTime(), err.message)
	} else {
		console.log('[errorMiddleware]', getTime(), err)
	}
	res.status(err.statusCode || 500).json({ message: err.message, data: err.data || null })
})

/*==============================================
                init
===============================================*/

const PORT = 8080

const init = async () => {
	try {
		await mongoose.connect(MONGO_URI!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		app.listen(PORT)
		console.log(`[App] Started! http://localhost:${PORT}`)
	} catch (error) {
		console.log('[App][Error]', error)
	}
}

init()
