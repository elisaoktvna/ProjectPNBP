import { Sequelize } from "sequelize";
import { CustomError } from "../helpers/CustomError.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";

class UserService {
  static async getUserAll() {
    const response = await User.findAll({
      attributes: ["id", "email", "name", "role"],
    });
    return response;
  }

  static async getUserById(id) {
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: ["id", "email", "name", "role"],
    });
    if (!user) {
      throw new CustomError("User tidak ditemukan", 404);
    }
    return user;
  }

  static async saveUser(data) {
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      throw new CustomError(
        "User dengan email " + data.email + " sudah ada",
        409
      );
    }
    const hashPassword = await argon2.hash(data.password);
    return await User.create({
      name: data.name,
      email: data.email,
      password: hashPassword,
      role: data.role,
      pin: Math.floor(100000 + Math.random() * 900000).toString(),
    });
  }

  static async updateUser(id, data) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new CustomError("User tidak ditemukan", 404);
    }
    const userEmail = await User.findOne({
      where: {
        email: data.email,
        id: {
          [Sequelize.Op.ne]: id,
        },
      },
    });
    if (userEmail) {
      throw new CustomError(
        "User dengan email " + data.email + " sudah ada",
        409
      );
    }

    return await User.update(
      {
        name: data.name,
        email: data.email,
        role: data.role,
      },
      {
        where: {
          id,
        },
      }
    );
  }
  static async deleteUser(id) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new CustomError("User tidak ditemukan", 404);
    }
    return await User.destroy({
      where: {
        id,
      },
    });
  }
}

export default UserService;
