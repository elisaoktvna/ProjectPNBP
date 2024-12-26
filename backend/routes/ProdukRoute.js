import express from "express";
import ProductController from "../controllers/ProdukController.js";
import { verifyToken } from "./middleware.js";

const router = express.Router();

router.get("/produk", verifyToken, ProductController.getProducts);
router.get(
  "/produkTerlaris",
  // verifyToken,
  ProductController.getProductsTerlaris
);
router.get("/produk/:id", verifyToken, ProductController.getProductById);
router.post("/produk", verifyToken, ProductController.saveProduct);
router.put("/produk/:id", verifyToken, ProductController.updateProduct);
router.delete("/produk/:id", verifyToken, ProductController.deleteProduct);

export default router;
