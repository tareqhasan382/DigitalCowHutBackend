import httpStatus from 'http-status'

// Database logic

import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'
import { UserService } from './user.service'
import { Request, Response } from 'express'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  //     const data = req.body
  const result = await UserService.createUser(data)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})

// get all user
const getAllUser = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers()
  res.send(users)
}

// get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.getSingleUser(id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  })
})

// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await UserService.updateUser(id, updatedData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  })
})

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
}
