import AuthService from "../services/AuthService.js";

class AuthController {
  static async login(req, res) {
    const data = req.body;

    try {
      const response = await AuthService.login(data);
      return res.status(200).json(response);
    } catch (error) {
      
      res.status(500).json({ msg: error.message });
    }
  }
  static async getAuthUser(req, res) {
    const id = req.userId;
    try {
      const response = await AuthService.getAuthUser(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  }
}
export default AuthController;
