import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../config/plugins/encripted-password.plugin.js';
import generateJWT from '../../config/plugins/generate-jwt.plugin.js';
import { Order } from '../orders/orders.model.js';
import { UserService } from './user.service.js';

export const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await UserService.create({ name, email, password, role });

  if (!user) {
    return;
  }

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserService.findOneByEmail(email);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const isPasswordOk = await verifyPassword(password, user.password);

  if (!isPasswordOk) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.findOne(id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  const userUpdated = await UserService.update(user, req.body);

  return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await UserService.delete(user);

  return res.status(204).json();
});

export const findUserOrders = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser
  const orders = await UserService.findOrderByUserId(id) 
  if(!orders) {
    return next(new AppError('This user did not place any orders!', 404));
  }
  return res.status(201).json(orders)
});

export const findeOneOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const order = await UserService.findOneOrder(id)
  if(!order) {
    return next(new AppError('Order not found', 404));
  }
  return res.status(201).json(order)
});
