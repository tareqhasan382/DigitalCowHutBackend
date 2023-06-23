import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
//export const UserValidation = { createUserZodSchema }
const router = express.Router()

// get single cow  getSingleCow
//get all user
router.get('/:id', UserController.getSingleUser),
  router.get('/get-users', UserController.getAllUser),
  router.patch('/:id', UserController.updateUser),
  // http://localhost:8000/api/v1/users/get-all-users
  //post user
  router.post(
    '/create-user',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  )
// http://localhost:8000/api/v1/users/create-user
export const UserRoute = router
