import express from 'express';
import { protect,restrictTo } from '../users/user.middleware.js';
import {
  getAllMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
} from './meals.controller.js';

export const router = express.Router();

router.route('/').get(getAllMeals);

router.get('/:id', getMealById);

router.use(protect);

router.post('/:id',restrictTo("admin") , createMeal);

router.patch('/:id',restrictTo("admin") , updateMeal);

router.delete('/:id',restrictTo("admin") , deleteMeal);
