import { Meal } from "../meals/meals.model.js"
import { Restaurant } from "../restaurants/restaurant.model.js"
import { Order } from "./orders.model.js"

export class OrderService {

    static async createOrder(data){
        return await Order.create(data)
    }

    static async findOrderById(id){
        return await Order.findOne({
            where: {
                id:id,
                status: "active"
            }
        })
    }

    static async completeOrder(order) {
        return await order.update({status: "completed"})
    }

    static async cancelOrder(order) {
        return await order.update({status: "cancelled"})
    }

    static async findAllOrdersFromUser(id) {
        return await Order.findAll({
            where: {
                userId: id
            },
            include: [
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