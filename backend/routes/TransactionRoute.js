import express from "express";
import TransactionController from "../controllers/TransactionController.js";

const router = express.Router();

// router.get("/transaction", TransactionController.getProducts);
// router.get("/produk/:id", TransactionController.getProductById);
router.post("/transaction", TransactionController.saveTransaction);
// router.put("/produk/:id", TransactionController.updateProduct);
// router.delete("/produk/:id", TransactionController.deleteProduct);

export default router;
