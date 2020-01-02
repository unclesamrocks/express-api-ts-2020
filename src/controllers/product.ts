import { Request, Response, NextFunction } from 'express'
import { ErrorType } from '../types/error'

import Product from '../models/product'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const prods = await Product.find().limit(100)
		const count = await Product.estimatedDocumentCount()
		res.status(200).json({
			message: 'OK!',
			docsCount: count,
			products: prods
		})
	} catch (error) {
		next(error)
	}
}

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const prod = await Product.findById(req.body.prodId)
		if (!prod) throw new ErrorType(404, 'No product found with this ID')
		res.status(200).json({ message: 'OK!', product: prod })
	} catch (error) {
		next(error)
	}
}

export const addOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const prod = new Product({ title: req.body.title })
		if (req.body.price) prod.price = req.body.price
		if (req.body.imageUrl) prod.imageUrl = req.body.imageUrl
		if (req.body.descSmall) prod.descSmall = req.body.descSmall
		if (req.body.descFull) prod.descFull = req.body.descFull
		if (req.body.rating) prod.rating = req.body.rating
		await prod.save()
		res.status(200).json({ message: 'OK!', product: prod })
	} catch (error) {
		next(error)
	}
}