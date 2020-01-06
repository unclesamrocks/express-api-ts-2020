import { RequestHandler } from 'express'

import Category from '../models/category'
import { ErrorType } from '../types/error'

export const getCategories: RequestHandler = async (req, res, next) => {
	try {
		const cats = await Category.find()
		if (!cats) throw new ErrorType(500, 'No categories found!')
		res.status(200).json({ message: 'OK', categories: cats })
	} catch (error) {
		next(error)
	}
}

export const addCategory: RequestHandler = async (req, res, next) => {
	try {
		const { title } = req.body
		const cat = new Category({ title: title })
		await cat.save()
		res.status(200).json({ message: 'OK', category: cat })
	} catch (error) {
		next(error)
	}
}

export const editCategory: RequestHandler = async (req, res, next) => {
	try {
		const { categoryId, title } = req.body
		const cat = await Category.findById(categoryId)
		if (!cat) throw new ErrorType(404, 'No category found with provided ID')
		cat.title = title
		await cat.save()
		res.status(200).json({ message: 'OK', category: cat })
	} catch (error) {
		next(error)
	}
}

export const removeCategory: RequestHandler = async (req, res, next) => {
	try {
		const { categoryId } = req.params
		const cat = await Category.findById(categoryId)
		if (!cat) throw new ErrorType(404, 'No category found with provided ID')
		await cat.remove()
		res.status(200).json({ message: 'OK', categoryId: categoryId })
	} catch (error) {
		next(error)
	}
}

export const removeAllCategories: RequestHandler = async (req, res, next) => {
	try {
		const data = await Category.deleteMany({})
		res.status(200).json({ message: 'OK', deletedCount: data.deletedCount })
	} catch (error) {
		next(error)
	}
}
