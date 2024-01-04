import express from 'express';
import { protect, protectAccountOwner, validExistUser, validTokenFromLoggedUser } from "./user.middleware.js"
import {
  createUser,
  login,
  updateProfile,
  deleteUser,
  findUserOrders,
  findeOneOrder,
} from './user.controller.js';

export const router = express.Router();

router.post('/singup', createUser);

router.post('/login', login);

router.use(protect)

router.patch('/:id', validExistUser, protectAccountOwner, updateProfile);

router.delete('/:id', validExistUser, protectAccountOwner, deleteUser);

router.get('/orders', validTokenFromLoggedUser, findUserOrders);

router.get('/orders/:id',validTokenFromLoggedUser, findeOneOrder);
