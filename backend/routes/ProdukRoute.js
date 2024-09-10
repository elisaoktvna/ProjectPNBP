import express from "express";
import ProductController from "../controllers/ProdukController.js";

const router = express.Router();

router.get("/produk", ProductController.getProducts);
router.get("/produk/:id", ProductController.getProductById);
router.post("/produk", ProductController.saveProduct);
router.put("/produk/:id", ProductController.updateProduct);
router.delete("/produk/:id", ProductController.deleteProduct);

export default router;
