import { IOrder } from './order.interface'
import OrderModel from './order.model'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../users/user.interface'
import ApiError from '../../../errors/ApiError'

//// http://localhost:8000/api/v1/order/create-Order
const createOrder = async (cow: ICow, buyer: IUser): Promise<IOrder> => {
  const createdOrder = await OrderModel.create({ cow, buyer: buyer })

  const result = await createdOrder.save()
  // jodi cow create na hoy
  if (!result) {
    throw new ApiError(400, 'Failed to create Order!')
  }

  return createdOrder
}

// Create a new order
// const newOrder = new OrderModel({
//   cow: foundCow._id,
//   buyer: foundBuyer._id,
// });

// // Save the order
// const savedOrder = await newOrder.save();

// get all order
const getAllOrder = async (): Promise<IOrder[]> => {
  const result = OrderModel.find()
  return result
}

export const OrderService = { createOrder, getAllOrder }

/*
const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateStudentId(academicsemester as IAcademicSemester);

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
  */
/*
  // const session = await OrderModel.startSession();
  // session.startTransaction();
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const { cow, buyer } = req.body
    const foundCow: ICow | null = await CowModel.findById(cow)
    const foundBuyer: IUser | null = await UserModel.findById(buyer)

    if (!foundCow || !foundBuyer) {
      throw new ApiError(400, 'Cow or buyer not found!')
    }

    if (foundBuyer.budget < foundCow.price) {
      throw new ApiError(400, 'Not enough money to buy the cow')
    }
    // const createdOrder = await OrderModel.create(order)
    // console.log('Service:', createOrder)
    // const result = await createdOrder.save()
    // if (!result) {
    //   throw new ApiError(400, 'Failed to create cow!')
    // }
    // return createdOrder
  } catch (error) {
    console.log(error)
  }

  */

/*
  try {
    const { cow, buyer } = req.body

    const foundCow: ICow | null = await CowModel.findById(cow).exec()
    const foundBuyer: IUser | null = await UserModel.findById(buyer).exec()

    if (!foundCow || !foundBuyer) {
      throw new ApiError(400, 'Cow or buyer not found')
    }

    if (foundBuyer.budget < foundCow.price) {
      throw new ApiError(400, 'Not enough money to buy the cow')
    }

    const session = await OrderModel.startSession()
    session.startTransaction()
  } catch (error) {
    throw new ApiError(400, 'Failed to create order')
  }


  =====================================

  //=====================
  try {
    const { cow, buyer } = await createdOrder.save()
    // console.log('result cow:', result.cow, 'result byer', result.buyer)
    // if (!result) {
    //   throw new ApiError(400, 'Failed to create cow!')
    // }

    const foundCow: ICow | null = await CowModel.findById(cow)
    const foundBuyer: IUser | null = await UserModel.findById(buyer)
    console.log('foundCow', foundCow, 'foundByer', foundBuyer)
    if (!foundCow || !foundBuyer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cow or buyer not found')
    }

    if (foundBuyer.budget < foundCow.price) {
      throw new ApiError(400, 'Not enough money to buy the cow')
    }

    const session = await OrderModel.startSession()
    session.startTransaction()
  } catch (error) {
    throw new ApiError(httpStatus.REQUEST_TIMEOUT, 'Failed to create order')
  }

  */
