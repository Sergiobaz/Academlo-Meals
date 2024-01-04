import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { OrderService } from './orders.service.js';

export const validateIfOrderIsActive = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await OrderService.findOrderById(id);
  if (!order) {
    return next(
      new AppError("The order that you are looking for isn't active!", 400)
    );
  }
  next();
});

export const validAccountOwner = async (req, res, next) => {
  const { id } = req.params;
  const order = await OrderService.findOrderById(id);
  if (order.userId !== req.sessionUser.id) {
    return next(
      new AppError('The order were not placed from this account!', 400)
    );
  }
  next()
};
