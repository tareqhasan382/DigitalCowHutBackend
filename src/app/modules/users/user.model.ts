import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      required: true,
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const UserModel = model<IUser, IUserModel>('User', userSchema)

export default UserModel
