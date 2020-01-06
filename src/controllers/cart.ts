import { RequestHandler } from 'express'

import Cart, { Basket } from '../models/cart'
import Product from '../models/product'
import { IProduct } from '../models/product'

import { ErrorType } from '../types/error'

/*==============================================
                helpers
===============================================*/

const updateBasket = (basket: Basket, product: IProduct, operation: 'plus' | 'minus'): Basket | any[] => {
	let isProductIn = false
	const r = basket
		.map(item => {
			if (item.product._id.toString() === product._id.toString()) {
				isProductIn = true
				if (operation === 'plus') {
					item.count = item.count + 1
				} else {
					item.count = item.count - 1
					if (item.count <= 0) return null
				}
			}
			return item
		})
		.filter(item => item !== null)
	if (!isProductIn && operation !== 'minus') r.push({ product: product, count: 1 })
	if (!isProductIn && operation === 'minus') throw new ErrorType(404, 'No such Product in cart!')
	return r
}

/*==============================================
                controllers
===============================================*/

export const getCart: RequestHandler = async (req, res, next) => {
	try {
		const { userId } = req
		const cart = await Cart.findOne({ user: userId })
		res.status(200).json({ message: 'OK', cart: cart })
	} catch (error) {
		next(error)
	}
}

export const addToCart: RequestHandler = async (req, res, next) => {
	try {
		const { userId } = req
		const { productId } = req.body
		const product = await Product.findById(productId)
		if (!product) throw new ErrorType(404, 'No Product found with provided ID')
		let cart = await Cart.findOne({ user: userId }).populate('basket.product', 'price')
		if (!cart) cart = new Cart({ user: userId })
		// first check
		if (!cart.basket.length) cart.basket = [{ product: product, count: 1 }]
		else cart.basket = updateBasket(cart.basket, product, 'plus')
		// second check
		cart.totalPrice = cart.basket.reduce((acc, curr) => acc + curr.product.price * curr.count, 0)
		await cart.save()
		res.status(200).json({ message: 'OK', cart: cart })
	} catch (error) {
		next(error)
	}
}

export const removeFromCart: RequestHandler = async (req, res, next) => {
	try {
		const { userId } = req
		const { productId } = req.body
		const product = await Product.findById(productId)
		if (!product) throw new ErrorType(404, 'No Product found with provided ID')
		let cart = await Cart.findOne({ user: userId }).populate('basket.product', 'price')
		if (!cart || !cart.basket.length) throw new ErrorType(500, 'Cart is empty already!')
		// first check
		else cart.basket = updateBasket(cart.basket, product, 'minus')
		// second check
		if (cart.basket.length === 0) {
			await cart.remove()
			cart = null
		} else {
			cart.totalPrice = cart.basket.reduce((acc, curr) => acc + curr.product.price * curr.count, 0)
			await cart.save()
		}
		res.status(200).json({ message: 'OK', cart: cart })
	} catch (error) {
		next(error)
	}
}

export const removeCart: RequestHandler = async (req, res, next) => {
	try {
		const { userId } = req
		const cart = await Cart.findOne({ user: userId })
		if (!cart) throw new ErrorType(404, "Cart can't be removed because it not exist")
		await cart.remove()
		res.status(200).json({ message: 'OK', cart: null })
	} catch (error) {
		next(error)
	}
}
