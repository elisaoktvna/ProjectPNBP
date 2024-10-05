import { CustomError } from "../helpers/CustomError.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
class AuthService {
  // Login method
  static async login(data) {
    const { email, password } = data;
    const user = await User.findOne({
      where: {
        email: email,
      },
      order: [["id", "DESC"]],
    });
    if (!user || !(await argon2.verify(user.password, password))) {
      throw new CustomError("User tidak ditemukan", 400);
    }

    const token = jwt.sign({ userId: user.id }, "kasuli", {
      expiresIn: "24h",
    });
    return { user, token };
  }
  static async getAuthUser(id) {
    const user = await User.findOne({
      attributes: ["id", "email", "name", "role"],
      where: {
        id,
      },
      order: [["id", "DESC"]],
    });
    return user;
  }

  // Forgot Password method
  static async forgotPassword(email) {
    return { message: "Email reset password telah dikirim." };
  }

  // Reset Password method
  static async resetPassword(token, newPassword) {
    return { message: "Password berhasil direset." };
  }
}

export default AuthService;
