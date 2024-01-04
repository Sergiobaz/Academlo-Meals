import express from 'express';
import { protect } from '../users/user.middleware.js';
import {
  validExistRestaurant,
  validExistReview,
} from './restaurant.middleware.js';
import { protectAccountOwner, restrictTo } from '../users/user.middleware.js';
import {
  createRestaurant,
  createReview,
  deleteReview,
  getAllRestaurants,
  getOneRestaurant,
  updateReview,
  updateRestaurant,
  deleteRestaurant,
} from './restaurant.controller.js';

export const router = express.Router();

router.route('/').get(getAllRestaurants);

router.get('/:id', getOneRestaurant);

router.use(protect);

router.patch('/:id',restrictTo("admin") , updateRestaurant);

router.delete('/:id',restrictTo("admin") , deleteRestaurant);

router.route('/').post(restrictTo("admin") ,createRestaurant);

router.post('/reviews/:id', validExistRestaurant,restrictTo("admin") , createReview);

router
  .route('/reviews/:restaurantId/:id')
  .delete(
    validExistRestaurant,
    validExistReview,
    protectAccountOwner,
    deleteReview
  )
  .patch(
    validExistRestaurant,
    validExistReview,
    protectAccountOwner,
    updateReview
  );
