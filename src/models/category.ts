import { Schema, model, Document } from 'mongoose'

export interface ICategory extends Document {
	title: string
}

const categorySchema = new Schema(
	{
		title: { type: String, required: true, unique: true, minlength: 3 }
	},
	{ timestamps: true }
)

export default model<ICategory>('Category', categorySchema)
