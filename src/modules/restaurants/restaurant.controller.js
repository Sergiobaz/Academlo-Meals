import { validateCreateRestaurant } from './restaurant.schema.js';
import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { RestaurantService } from './restaurant.service.js';

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, restaurantData } = validateCreateRestaurant(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const restaurant = await RestaurantService.createRestaurant(restaurantData);
  return res.status(201).json(restaurant);
});

export const createReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  const { sessionUser } = req;
  const review = await RestaurantService.createReview({
    userId: sessionUser.id,
    comment,
    restaurantId: id,
    rating,
  });
  return res.status(201).json(review);
});

export const getAllRestaurants = catchAsync(async (req, res, next) => {
  const allRestaurants = await RestaurantService.getRestaurants();
  if (!allRestaurants) {
    return next(AppError('Restaurants not found', 404));
  }
  return res.status(201).json(allRestaurants);
});

export const getOneRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await RestaurantService.getRestaurantById(id);
  if (!restaurant) {
    return next(AppError('Restaurant not found', 404));
  }
  return res.status(201).json(restaurant);
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await RestaurantService.findOneReview(id);
  if (!review) {
    return next(AppError('review not found', 404));
  }
  await RestaurantService.deleteReviewById(review);
  return res.status(201).json();
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const review = await RestaurantService.findOneReview(id);
  if (!review) {
    return next(AppError('review not found', 404));
  }
  const reviewUpdated = await RestaurantService.updateReview(review, {
    comment,
    rating,
  });
  return res.status(201).json(reviewUpdated);
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { id } = req.params;

  const restaurantToUpdate = await RestaurantService.getRestaurantById(id);
  if (!restaurantToUpdate) {
    return next(AppError('restaurant not found', 404));
  }
  const restaurantUpdated = await RestaurantService.updateRestaurant(
    restaurantToUpdate,
    { name, address }
  );
  return res.status(201).json(restaurantUpdated);
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurantToDelete = await RestaurantService.getRestaurantById(id);
  if (!restaurantToDelete) {
    return next(AppError('restaurant not found', 404));
  }
  await RestaurantService.deleteRestaurant(restaurantToDelete);
  return res.status(201).json();
});
