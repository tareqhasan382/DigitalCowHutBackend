import express from 'express'
import { CowController } from './cow.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidation } from './cow.validation'
// import validateRequest from '../../middlewares/validateRequest'
//export const UserValidation = { createUserZodSchema }

const router = express.Router()
//get all cow
router.get('/get-cows', CowController.getAllCow),
  router.get('/:id', CowController.getSingleCow),
  router.patch('/:id', CowController.updateCow),
  router.delete('/:id', CowController.deletedCow),
  //post cow
  router.post(
    '/create-cow',
    validateRequest(CowValidation.createCowZodSchema),
    CowController.createCow
  )

export const CowRoute = router
//validateRequest(UserValidation.createUserZodSchema),
//UserController.createUser
