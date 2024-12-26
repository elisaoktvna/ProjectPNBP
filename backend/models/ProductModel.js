import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "products",
  {
    name: DataTypes.STRING(50),
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Product;
(async () => {
  await db.sync();
})();
