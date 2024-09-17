import { CustomError } from "../helpers/CustomError.js";
import Kategori from "../models/KategoriModel.js";
import User from "../models/UserModel.js";
import FileService from "./FileService.js";
import argon2 from "argon2";

class UserService {
  static async login(data) {
    const { username, password } = data;
    const user = await User.findOne({
      where: {
        username: username,
      },
      order: [["id", "DESC"]],
    });
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new CustomError("User tidak ditemukan", 400);
    }

    return user;
  }
  static async getUserAll() {
    const response = await User.findAll({
      attributes: ["id", "uuid", "name", "username", "role"],
    });
    return response;
  }

  static async getUserById(id) {
    const produk = await User.findOne({
      where: {
        id,
      },
      attributes: ["id", "uuid", "name", "username", "role"],
    });

    return produk;
  }

  static async saveUser(data) {
    const hashPassword = await argon2.hash(data.password);
    const user = await User.create({
      name: data.name,
      username: data.username,
      password: hashPassword,
      role: data.role,
    });
    return user;
  }

  static async updateUser(id, data) {
    const hashPassword = await argon2.hash(data.password);
    const user = await User.update(
      {
        name: data.name,
        username: data.username,
        password: hashPassword,
        role: data.role,
      },
      {
        where: {
          id,
        },
      }
    );
    return user;
  }
  static async deleteUser(id) {
    const data = await User.destroy({
      where: {
        id,
      },
    });
    return data;
  }
}

export default UserService;
