import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";

const Setting = db.define(
  "setting",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Setting;

(async () => {
  await db.sync();
})();
