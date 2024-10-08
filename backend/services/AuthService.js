import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { CustomError } from "../helpers/CustomError.js";

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
      return { message: "User tidak ditemukan", status: 400 };
    }

    const token = jwt.sign({ userId: user.id }, "kasuli", {
      expiresIn: "24h",
    });
    return { user, token };
  }

  static async getAuthUser(id) {
    const user = await User.findOne({
      attributes: ["id", "email", "name", "role", "pin"],
      where: {
        id,
      },
      order: [["id", "DESC"]],
    });
    return user;
  }

  // Forgot Password method
  static async forgotPassword(email, pin) {
    const user = await User.findOne({
      where: {
        email,
        pin,
      },
    });

    if (!user) throw new CustomError("User tidak ditemukan", 404);

    const token = jwt.sign({ userId: user.id }, "token_forget_password");

    // Set token_exp to 2 minutes from now
    const tokenExpiration = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.update({
      token,
      token_exp: tokenExpiration,
    });

    return { token };
  }

  // Reset Password method
  static async resetPassword(token, newPassword) {
    console.log(new Date().toLocaleString());
    const user = await User.findOne({
      where: {
        token,
      },
    });

    if (!user) throw new CustomError("User tidak ditemukan", 404);

    // Check if the token is expired
    const isTokenExpired = user.token_exp < new Date();
    if (isTokenExpired) {
      throw new CustomError("Token kedaluwarsa, silakan kirim ulang form", 401);
    }
    const hashPassword = await argon2.hash(newPassword);
    await user.update({
      token: null,
      token_exp: null, // Optionally clear the expiration date
      password: hashPassword,
    });

    return { user };
  }
}

export default AuthService;
