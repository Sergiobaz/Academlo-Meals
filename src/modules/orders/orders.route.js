import express from "express"
import { protect } from "../users/user.middleware.js"
import { validateIfOrderIsActive, validAccountOwner } from "./orders.middleware.js"
import { createOrder,
    getAllOrdesFromUser,
    completeOrder,
    cancelOrder } from "./orders.controller.js"

export const router = express.Router()

router.use(protect)

router.route("/").post(createOrder)

router.get("/me", getAllOrdesFromUser)

router.patch("/:id",validateIfOrderIsActive,validAccountOwner , completeOrder)

router.delete("/:id",validateIfOrderIsActive,validAccountOwner , cancelOrder)