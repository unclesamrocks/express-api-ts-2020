import { Schema, model, Document } from 'mongoose'

export interface IProduct extends Document {
	title: string
	price: number
	descSmall?: string
	descFull?: string
	imageUrl?: string
	rating?: number
}

const productSchema = new Schema(
	{
		title: { type: String, required: true, minlength: 5 },
		price: { type: Number, min: 0, required: true },
		descSmall: { type: String, min: 3, max: 20, default: 'Short description' },
		descFull: { type: String, min: 10, default: 'New product general description' },
		imageUrl: { type: String, minlength: 1 },
		rating: { type: Number, min: 1, max: 5 }
	},
	{ timestamps: true }
)

export default model<IProduct>('product', productSchema)
