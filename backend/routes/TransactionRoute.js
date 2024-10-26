import express from "express";
import TransactionController from "../controllers/TransactionController.js";
import { verifyToken } from "./middleware.js";

const router = express.Router();

// router.get("/transaction", TransactionController.getProducts);
// router.get("/produk/:id", TransactionController.getProductById);
router.post("/transaction", verifyToken, TransactionController.saveTransaction);
router.get(
  "/getTotalPenjualan",
  verifyToken,
  TransactionController.getTotalPenjualan
);
router.get(
  "/getTotalKeuntungan",
  verifyToken,
  TransactionController.getTotalKeuntungan
);
router.get("/getChartData", verifyToken, TransactionController.getChartData);
router.get("/getHistory", verifyToken, TransactionController.getHistory);
// router.put("/produk/:id",verifyToken, TransactionController.updateProduct);
// router.delete("/produk/:id",verifyToken, TransactionController.deleteProduct);

export default router;
