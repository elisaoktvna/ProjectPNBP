import SettingService from "../services/SettingService.js";

class SettingController {
  static async all(req, res) {
    try {
      const response = await SettingService.all();
      return res.json({ message: "Transaction successfully", data: response });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.message });
    }
  }
  static async handleUpdate(req, res) {
    try {
      const images = req.files;
      const data = req.body;
      const response = await SettingService.updateSetting(1, images, data);
      return res.json({ message: "Transaction successfully", data: response });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.message });
    }
  }
}

export default SettingController;
