import express from 'express'
import { OrderController } from './order.controller'
import validateRequest from '../../middlewares/validateRequest'
import { OrderValidation } from './order.validation'

const router = express.Router()
router.get('/get-all-order', OrderController.getAllOrders),
  //post cow
  router.post(
    '/create-Order',
    validateRequest(OrderValidation.createOrderZodSchema),
    OrderController.createOrder
  )

export const OrderRoute = router
// router.post(
//   '/create-cow',
//   validateRequest(CowValidation.createCowZodSchema),
//   CowController.createCow
// )
