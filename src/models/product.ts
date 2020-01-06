import { Schema, model, Document } from 'mongoose'
import { ICategory } from './category'

export interface IProduct extends Document {
	title: string
	price: number
	category?: ICategory[]
	descSmall?: string
	descFull?: string
	imageUrl?: string
	rating?: number
}

const productSchema = new Schema(
	{
		title: { type: String, required: true, minlength: 5 },
		price: { type: Number, min: 0, required: true },
		category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
		descSmall: { type: String, min: 3, max: 20, default: 'Short description' },
		descFull: { type: String, min: 10, default: 'New product general description' },
		imageUrl: { type: String, minlength: 1 },
		rating: { type: Number, min: 1, max: 5 }
	},
	{ timestamps: true }
)

export default model<IProduct>('Product', productSchema)
