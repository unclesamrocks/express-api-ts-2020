import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
	email: string
	password: string
	credentials?: {
		firstName?: string
		lastName?: string
		birthDate?: Date
	}
	isAdmin?: boolean
}

const userSchema = new Schema(
	{
		email: { type: String, unique: true, required: true, minlength: 4 },
		password: { type: String, required: true },
		credentials: {
			firstName: { type: String, minlength: 1 },
			lastName: { type: String, minlength: 1 },
			birthDate: { type: Date, min: '1900-01-01' }
		},
		isAdmin: { type: Boolean }
	},
	{ timestamps: true }
)

export default model<IUser>('user', userSchema)
