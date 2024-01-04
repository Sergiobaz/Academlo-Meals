import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealsService } from './meals.service.js';

export const getAllMeals = catchAsync(async (req, res, next) => {
  const allMeals = await MealsService.findAllMeals();
  if (!allMeals) {
    return next(new AppError('There are no meals in our database!', 404));
  }
  return res.status(201).json(allMeals);
});

export const getMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await MealsService.findOneMealById(id);
  if (!meal) {
    return next(new AppError("This meal doesn't exist in our database!", 404));
  }
  return res.status(201).json(meal);
});

export const createMeal = catchAsync(async (req, res, next) => {
  const restaurantId = req.params.id;
  const { name, price } = req.body;
  const meal = await MealsService.createMeal({ name, price, restaurantId });
  return res.status(201).json(meal);
});

export const updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const mealToUpdate = await MealsService.findOneMealById(id);
  if (!mealToUpdate) {
    return next(new AppError("This meal doesn't exist in our database!", 404));
  }
  const updatedMeal = await MealsService.updateMeal(mealToUpdate, {
    name,
    price,
  });
  return res.status(201).json(updatedMeal);
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const mealToDelete = await MealsService.findOneMealById(id);
  if (!mealToDelete) {
    return next(new AppError("This meal doesn't exist in our database!", 404));
  }
  await MealsService.deleteMeal(mealToDelete);
  return res.status(201).json();
});
