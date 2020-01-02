import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
	email: string
	password: string
	credentials?: {
		name?: string
		surname?: string
		birthDate?: Date
	}
}

const userSchema = new Schema(
	{
		email: { type: String, unique: true, required: true, minlength: 4 },
		password: { type: String, required: true },
		credentials: {
			name: { type: String, minlength: 1 },
			surname: { type: String, minlength: 1 },
			birthDate: { type: Date, min: '1900-01-01' }
		}
	},
	{ timestamps: true }
)

export default model<IUser>('product', userSchema)
