import AuthService from "../services/AuthService.js";

class AuthController {
  static async login(req, res) {
    const data = req.body;

    try {
      const response = await AuthService.login(data);
      return res.status(response.status || 200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getAuthUser(req, res) {
    const id = req.userId;
    try {
      const response = await AuthService.getAuthUser(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  static async forgetPassword(req, res) {
    const email = req.body.email;
    const pin = req.body.pin;
    try {
      const data = await AuthService.forgotPassword(email, pin);
      return res.status(200).json({ data });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  static async resetPassword(req, res) {
    const password = req.body.password;
    const token = req.body.token;
    try {
      const data = await AuthService.resetPassword(token, password);
      return res.status(200).json({ data });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}
export default AuthController;
