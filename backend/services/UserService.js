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
    const produk = await User.findOne({
      where: {
        id,
      },
      attributes: ["id", "email", "name", "role"],
    });

    return produk;
  }

  static async saveUser(data) {
    const hashPassword = await argon2.hash(data.password);
    const user = await User.create({
      name: data.name,
      email: data.email,
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
        email: data.email,
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
