import path from 'path'

import { Request, Response, NextFunction, RequestHandler } from 'express'
import { isEmpty } from 'lodash'

import { ErrorType } from '../types/error'
import { copyFile, deleteFile } from '../utils/fs'

import DIRS from '../utils/path'

import Product from '../models/product'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { limit, categories, page } = req.query
		// paging
		const paging: { limit?: number; skip?: number } = {}
		if (limit && page) {
			paging.limit = limit
			paging.skip = page * limit - limit
		}
		// categories
		const query: any = {}
		if (categories) {
			query.category = {}
			query.category.$in = categories
		}
		// query db
		const fetchMongoDBData = () => {
			const prods = Product.find(query)
				.limit(paging.limit || 100)
				.skip(paging.skip || 0)
				.sort({ createdAt: 'desc' })
				.populate('category')
			const count = Product.estimatedDocumentCount()
			const queryCount = isEmpty(query) ? Product.estimatedDocumentCount() : Product.find(query).countDocuments()
			return Promise.all([prods, count, queryCount])
		}
		const [prods, count, queryCount] = await fetchMongoDBData()
		// response
		res.status(200).json({
			message: 'OK!',
			docsCount: count,
			queryCount: queryCount,
			products: prods
		})
	} catch (error) {
		next(error)
	}
}

export const findOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const prod = await Product.findById(req.params.prodId)
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
		// check for img upload
		if (req.body.imageUrl) prod.imageUrl = req.body.imageUrl
		if (req.file) {
			const { filename } = req.file
			prod.imageUrl = `/upload/${filename}`
			await copyFile(path.join(DIRS.TEMP, filename), path.join(DIRS.UPLOAD, filename))
		}
		// ...
		if (req.body.categories) prod.category = req.body.categories
		if (req.body.descSmall) prod.descSmall = req.body.descSmall
		if (req.body.descFull) prod.descFull = req.body.descFull
		if (req.body.rating) prod.rating = req.body.rating
		await prod.save()
		res.status(200).json({ message: 'OK!', product: prod })
	} catch (error) {
		next(error)
		if (req.file) deleteFile(path.join(DIRS.PUBLIC, req.file.filename))
	} finally {
		if (req.file) deleteFile(path.join(DIRS.TEMP, req.file.filename))
	}
}

export const removeOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const prod = await Product.findById(req.body.prodId)
		if (!prod) throw new ErrorType(404, 'No product found with provided ID')
		await prod.remove()
		res.status(200).json({ message: 'OK!', prodId: prod._id })
	} catch (error) {
		next(error)
	}
}

export const editOne = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { prodId, title, price, descSmall, descFull, imageUrl, rating, categories } = req.body
		const prod = await Product.findById(prodId)
		if (!prod) throw new ErrorType(404, 'No product found with provided ID')
		prod.title = title
		prod.price = price
		prod.descSmall = descSmall
		prod.descFull = descFull
		if (categories) prod.category = categories
		// check for img upload
		if (req.file) {
			await deleteFile(path.join(DIRS.PUBLIC, prod.imageUrl!))
			const { filename } = req.file
			await copyFile(path.join(DIRS.TEMP, filename), path.join(DIRS.UPLOAD, filename))
			prod.imageUrl = `/upload/${filename}`
		} else if (imageUrl) {
			if (imageUrl !== prod.imageUrl && /upload/.test(prod.imageUrl!)) {
				await deleteFile(path.join(DIRS.PUBLIC, prod.imageUrl!))
			}
			prod.imageUrl = imageUrl
		}
		// ...
		prod.rating = rating
		await prod.save()
		res.status(200).json({ message: 'OK!', prodId: prod._id, product: prod })
	} catch (error) {
		next(error)
		if (req.file) deleteFile(path.join(DIRS.PUBLIC, req.file.filename))
	} finally {
		if (req.file) deleteFile(path.join(DIRS.TEMP, req.file.filename))
	}
}

export const removeAll: RequestHandler = async (req, res, next) => {
	try {
		const prods = await Product.find()
		for (const prod of prods) {
			if (prod.imageUrl) await deleteFile(path.join(DIRS.PUBLIC, prod.imageUrl))
			await prod.remove()
		}
		res.status(200).json({ message: 'OK' })
	} catch (error) {
		next(error)
	}
}
