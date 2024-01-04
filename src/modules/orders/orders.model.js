import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";



export const Order = sequelize.define( "orders", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "meal_id"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "total_price"
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("active", "cancelled", "completed"),
        allowNull: false,
        defaultValue: "active"
    }
})