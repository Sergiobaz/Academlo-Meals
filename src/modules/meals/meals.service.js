import { Restaurant } from "../restaurants/restaurant.model.js"
import { Meal } from "./meals.model.js"

export class MealsService {


    static async createMeal(data) {
        return Meal.create(data)
    }

    static async findAllMeals() {
        return Meal.findAll({
            where: {
                status: true
            },
            include: [
                {
                    model: Restaurant
                }
            ]
        })
    }

    static async findOneMealById(id) {
        return Meal.findOne({
            where: {
                status: true,
                id: id
            },
            include: [
                {
                    model: Restaurant
                }
            ]
        })
    }

    static async updateMeal(meal, data) {
        return await meal.update(data)
    }

    static async deleteMeal(meal) {
        return await meal.update({ status: false })
    }

}