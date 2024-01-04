import express from "express"
import { router as userRouter } from "../modules/users/user.route.js"
import { router as mealRouter } from "../modules/meals/meals.route.js"
import { router as restaurantRouter } from "../modules/restaurants/restaurant.route.js"
import { router as orderRouter } from "../modules/orders/orders.route.js"

export const router = express.Router()

router.use("/users", userRouter)
router.use("/meals", mealRouter)
router.use("/restaurants", restaurantRouter)
router.use("/orders", orderRouter)

