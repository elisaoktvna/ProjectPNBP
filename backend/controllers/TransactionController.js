import TransactionService from "../services/TransactionService.js";

class TransactionController {
  static async saveTransaction(req, res) {
    try {
      const data = req.body;
      await TransactionService.saveTransaction(data);
      return res.json({ msg: "Transaction successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async getTotalPenjualan(req, res) {
    try {
      const response = await TransactionService.getTotalPenjualan();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getTotalKeuntungan(req, res) {
    try {
      const response = await TransactionService.getTotalKeuntungan();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getChartData(req, res) {
    try {
      const response = await TransactionService.getChartData();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}

export default TransactionController;
