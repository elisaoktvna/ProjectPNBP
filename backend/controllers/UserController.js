import User from "../models/UserModel.js";
import argon2 from "argon2";
import UserService from "./../services/UserService.js";

class UserController {
  static async login(req, res) {
    const data = req.body;
    try {
      const response = await UserService.login(data);
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async getUser(req, res) {
    try {
      const response = await UserService.getUserAll();
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async getUserByid(req, res) {
    try {
      const response = await User.findOne({
        attributes: ["uuid", "name", "username", "role"],
        where: {
          uuid: req.params.id,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async createUser(req, res) {
    const data = req.body;
    if (data.password !== data.confPassword)
      return res
        .status(400)
        .json({ msg: "password dan confirm password tidak cocok" });
    try {
      await UserService.saveUser(data);
      return res.status(201).json({ msg: "Register berhasil" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async updateUser(req, res) {
    const data = req.body;
    const id = req.params.id;
    if (data.password !== data.confPassword)
      return res.status(400)``.json({
        msg: "password dan confirm password tidak cocok",
      });
    try {
      await UserService.updateUser(id, data);
      return res.status(201).json({ msg: "User updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async deleteUser(req, res) {
    const id = req.params.id;
    const user = await UserService.getProdukById(id);
    if (!user) return res.status(404).json({ msg: "no data found" });
    try {
      await UserService.deleteProduk(id);
      return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}
export default UserController;
