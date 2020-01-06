import { Schema, model, Document } from 'mongoose'
import { IProduct } from './product'

export type Basket = {
	product: IProduct
	count: number
}[]

export interface ICart extends Document {
	user: string
	basket: Basket | []
	totalPrice: number
}

const cartSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		basket: [
			{
				product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				count: { type: Number, min: 0, required: true, default: 1 }
			}
		],
		totalPrice: { type: Number, required: true, default: 0, min: 0 }
	},
	{ timestamps: true }
)

export default model<ICart>('Cart', cartSchema)
