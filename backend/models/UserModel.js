import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensuring email is unique
      validate: {
        notEmpty: true,
        len: [3, 30],
      },
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensuring pin is unique
      validate: {
        notEmpty: true,
        len: [0, 6],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "karyawan"],
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_exp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;

(async () => {
  await db.sync();
})();
