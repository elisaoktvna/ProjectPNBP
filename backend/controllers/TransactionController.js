import TransactionService from "../services/TransactionService.js";

class TransactionController {
  static async saveTransaction(req, res) {
    try {
      const data = req.body;
      const response = await TransactionService.saveTransaction(data);
      return res.json({ message: "Transaction successfully", data: response });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: error.message });
    }
  }

  static async getTotalPenjualan(req, res) {
    try {
      const response = await TransactionService.getTotalPenjualan();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async getTotalKeuntungan(req, res) {
    try {
      const response = await TransactionService.getTotalKeuntungan();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async getChartData(req, res) {
    try {
      const response = await TransactionService.getChartData();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async getHistory(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const response = await TransactionService.getHistory(startDate, endDate);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default TransactionController;
