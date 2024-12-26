import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Kategori = db.define(
  "categories",

  {
    name: DataTypes.STRING(50),

    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Kategori;

(async () => {
  await db.sync();
})();
