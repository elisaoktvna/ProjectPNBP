import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "produk",
  {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "kategori",
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
