import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js"; // Import your Sequelize instance
import db from "../config/Database.js";

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    no_transaksi: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Automatically set the current date
    },
  },
  {
    tableName: "transactions", // The name of the table
    timestamps: false, // Disable default createdAt and updatedAt timestamps
  }
);

export default Transaction;
(async () => {
  await db.sync();
})();
