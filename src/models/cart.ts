import { Schema, model, Document } from 'mongoose'
import { IProduct } from './product'

export interface ICart extends Document {
	basket: {
		product: IProduct
		count: number
	}[]
}

const cartSchema = new Schema(
	{
		basket: [
			{
				product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				count: { type: Number, min: 0, required: true, default: 1 }
			}
		]
	},
	{ timestamps: true }
)

export default model<ICart>('Cart', cartSchema)
