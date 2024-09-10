import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
import Transaction from "./TransactionModel.js"; // Import the Transaction model
import Product from "./ProductModel.js"; // Import the Product model
import db from "../config/Database.js";

const TransactionDetail = sequelize.define(
  "TransactionDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Transaction,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "transaction_details", // Name of the table
    timestamps: false, // Disable default timestamps
  }
);

export default TransactionDetail;
(async () => {
  await db.sync();
})();
