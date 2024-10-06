import User from "../models/UserModel.js";
import UserService from "./../services/UserService.js";

class UserController {
  static async getUser(req, res) {
    try {
      const data = await UserService.getUserAll();
      return res.status(200).json({ data });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async getUserByid(req, res) {
    const id = req.params.id;
    try {
      const data = await UserService.getUserById(id);
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  static async createUser(req, res) {
    const data = req.body;
    try {
      await UserService.saveUser(data);
      return res.status(201).json({ message: "Register berhasil" });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    const data = req.body;
    const id = req.params.id;
    try {
      await UserService.updateUser(id, data);
      return res.status(201).json({ message: "User berhasil diubah" });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
  static async deleteUser(req, res) {
    const id = req.params.id;
    try {
      await UserService.deleteUser(id);
      return res.status(200).json({ message: "User berhasil dihapus" });
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}
export default UserController;
