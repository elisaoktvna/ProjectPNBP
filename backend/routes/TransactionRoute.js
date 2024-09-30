import express from "express";
import TransactionController from "../controllers/TransactionController.js";

const router = express.Router();

// router.get("/transaction", TransactionController.getProducts);
// router.get("/produk/:id", TransactionController.getProductById);
router.post("/transaction", TransactionController.saveTransaction);
router.get("/getTotalPenjualan", TransactionController.getTotalPenjualan);
router.get("/getTotalKeuntungan", TransactionController.getTotalKeuntungan);
router.get("/getChartData", TransactionController.getChartData);
// router.put("/produk/:id", TransactionController.updateProduct);
// router.delete("/produk/:id", TransactionController.deleteProduct);

export default router;
