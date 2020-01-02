import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import rootRouter from './routes/root'

const { MONGO_URI } = process.env

const app = express()

app.use(cors())
app.use(json())

app.use(rootRouter)

const PORT = 8080

const init = async () => {
	try {
		await mongoose.connect(MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
		app.listen(PORT)
		console.log(`[App] Started! http://localhost:${PORT}`)
	} catch (error) {
		console.log('[App]', error)
	}
}

init()
