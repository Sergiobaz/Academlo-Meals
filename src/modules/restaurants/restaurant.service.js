import { Restaurant } from './restaurant.model.js';
import { Review } from './review.model.js';
import { User } from '../users/user.model.js';

export class RestaurantService {
  
  static async createRestaurant(data) {
    return Restaurant.create(data);
  }

  static async findOneRestaurant(id) {
    return Restaurant.findOne({
      where: {
        id: id,
        status: true,
      },
    });
  }

  static async createReview(data) {
    return Review.create(data);
  }

  static async deleteReviewById(review) {
    return review.update({ status: false });
  }

  static async updateReview(review, data) {
    return await review.update(data);
  }

  static async findOneReview(id) {
    return await Review.findOne({
      where: {
        id: id,
        status: true,
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }

  static async getRestaurants() {
    return await Restaurant.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: Review,
        },
      ],
    });
  }

  static async getRestaurantById(id) {
    return await Restaurant.findOne({
      where: {
        status: true,
        id: id,
      },
      include: [
        {
          model: Review,
        },
      ],
    });
  }

  static async updateRestaurant(restaurant, data) {
    return await restaurant.update(data);
  }

  static async deleteRestaurant(restaurant) {
    return await restaurant.update({status: false})
  }

}
