import { User } from "./user.model.js";
import { Order } from "../orders/orders.model.js"
import { Meal } from "../meals/meals.model.js";
import { Restaurant } from "../restaurants/restaurant.model.js";



export class UserService {

    static async create(data) {
        return await User.create(data)
    }

    static async findOneByEmail(email) {
        return await User.findOne({
            where: {
                email: email,
                status: true
            }
        })
    }

    static async findOne(id) {
        return await User.findOne({
            where: {
                id: id,
                status: true
            }
        })
    }

    static async update(user, data){
        return await user.update(data)
    }

    static async delete(user) {
        return await user.update({ status: false });
      }

    static async findOrderByUserId(id) {
        return await Order.findAll({
            where: {
                userId: id
            }, include: [
                {
                    model: Meal,
                    include: [
                        {
                            model: Restaurant
                        }
                    ]
                }
            ]
        })
    }

    static async findOneOrder(id){
        return await Order.findOne({
            where: {
                id: id
            }, include: [
                {
                    model: Meal,
                    include: [
                        {
                            model: Restaurant
                        }
                    ]
                }
            ]
        })
    }

}