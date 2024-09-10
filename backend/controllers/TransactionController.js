import TransactionService from "../services/TransactionService.js";

class TransactionController {
  static async saveTransaction(req, res) {
    try {
      const data = req.body;
      await TransactionService.saveTransaction(data);
      return res.json({ msg: "Transaction successfully" });
    } catch (error) {
      return res.status(error.code).json({ msg: error.message });
    }
  }
}

export default TransactionController;
