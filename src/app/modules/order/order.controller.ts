import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { IOrder } from './order.interface'
import { OrderService } from './order.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import ApiError from '../../../errors/ApiError'
import CowModel from '../cow/cow.model'
import UserModel from '../users/user.model'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../users/user.interface'
import mongoose from 'mongoose'

// create cow

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body
  // let newUserAllData = null;
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const foundCow: ICow | null = await CowModel.findById(cow).session(session)
    console.log('find cow:', foundCow)
    const foundBuyer: IUser | null = await UserModel.findById(buyer).session(
      session
    )

    if (!foundCow || !foundBuyer) {
      res.status(404).json({ message: 'Cow or buyer not found' })
      return
    }

    if (foundBuyer.budget < foundCow.price) {
      res.status(404).json({ message: 'Not enough money to buy the cow' })
      return
    }

    const savedOrder = await OrderService.createOrder(foundCow, foundBuyer)

    await session.commitTransaction()
    session.endSession()

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully!',
      data: savedOrder,
    })
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new ApiError(400, 'Failed to create order')
  }
})

// get all Order===============================================================
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrder()
  //console.log(result)
  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully!',
    data: result,
  })
})
export const OrderController = { createOrder, getAllOrders }

/*
let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

=============================================
 const { cow, buyer } = req.body
  console.log('ID', cow, buyer)
  const foundCow: IOrder | null = await CowModel.findById(cow)
  const foundBuyer: IUser | null = await UserModel.findById(buyer)
  console.log('Found ID', foundCow, foundBuyer)
  if (!foundCow || !foundBuyer) {
    throw new ApiError(400, 'Cow or buyer not found!')
  }

  if (foundBuyer.budget < foundCow.price) {
    throw new ApiError(400, 'Not enough money to buy the cow')
  }

==================================
try {
    const data = req.body
    const { cow, buyer } = data
    console.log('cow:', cow, 'buyer:', buyer)
    const foundCow = await CowModel.findById(cow)
    const foundBuyer = await UserModel.findById(buyer)
    console.log('Found Cow', foundCow, 'Found Buyer', foundBuyer)
    if (!foundCow?._id || !foundBuyer?._id) {
      throw new ApiError(400, 'Cow or buyer not found!')
    }

    if (foundBuyer.budget < foundCow.price) {
      throw new ApiError(400, 'Not enough money to buy the cow')
    }

    try {
      foundCow.label = 'sold out'
      await foundCow.save()

      foundBuyer.budget -= foundCow.price
      await foundBuyer.save()

      const seller: IUser | null = await UserModel.findById(foundCow.seller)
      if (seller) {
        seller.income += foundCow.price
        await seller.save()
      }

      const newOrder: IOrder = new OrderModel({
        cow: foundCow._id,
        buyer: foundBuyer._id,
      })

      const savedOrder = await OrderService.createOrder(newOrder)

      // console.log('Result:', result)
      sendResponse<IOrder>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order created successfully!',
        data: savedOrder,
      })
    } catch (error) {
      console.log(error)

      throw error
    }
    // const result = await OrderService.createOrder(data)
    // console.log('Result:', result)
    // sendResponse<IOrder>(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Order created successfully!',
    //   data: result,
    // })
  } catch (error) {
    throw new ApiError(400, 'Failed to create order')
  }





  =======================================
   //const result = await OrderService.createOrder(data)
  //console.log(result)
  // sendResponse<IOrder>(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'Order created successfully!',
  //   data: result,
  // })
*/
