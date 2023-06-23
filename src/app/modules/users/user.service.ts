import httpStatus from 'http-status'
// Bussiness logic
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import UserModel from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await UserModel.create(user)
  // jodi user create na hoy
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Field to create user!')
  }
  return createdUser
  //http://localhost:8000/api/v1/users/create-user
}

// get all cow
const getAllUsers = async (): Promise<IUser[]> => {
  return UserModel.find()
}

// sigle user
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await UserModel.findOne({ _id: id })
  return result
}

// edit
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const find_id = await UserModel.findOne({ _id: id })
  if (!find_id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }
  const result = await UserModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}
//delete

//

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
}
