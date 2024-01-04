import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealsService } from '../meals/meals.service.js';
import { OrderService } from './orders.service.js';

export const createOrder = catchAsync(async (req, res, next) => {
  const userId = req.sessionUser.id;
  const { mealId, quantity } = req.body;
  const meal = await MealsService.findOneMealById(mealId);
  if (!meal) {
    return next(new AppError("This meal doesn't exist in our database!", 404));
  }
  const totalPrice = meal.price * quantity;
  const order = await OrderService.createOrder({
    mealId,
    userId,
    totalPrice,
    quantity,
  });
  return res.status(201).json(order);
});

export const getAllOrdesFromUser = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const orders = await OrderService.findAllOrdersFromUser(id);
  if (!orders) {
    return next(new AppError('This user did not place any orders', 404));
  }
  return res.status(201).json(orders);
});

export const completeOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const orderToUpdate = await OrderService.findOrderById(id);
  if (!orderToUpdate) {
    return next(new AppError("This order doesn't exist in our database!", 404));
  }
  const orderUpdated = await OrderService.completeOrder(orderToUpdate);
  return res.status(201).json(orderUpdated);
});

export const cancelOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const orderToCancel = await OrderService.findOrderById(id);
  if (!orderToCancel) {
    return next(new AppError("This order doesn't exist in our database!", 404));
  }
  const orderCancelled = await OrderService.cancelOrder(orderToCancel);
  return res.status(201).json(orderCancelled);
});
