import express from "express";
import KategoriController from "../controllers/KategoriController.js";
import { verifyToken } from "./middleware.js";

const router = express.Router();

router.get("/kategori", verifyToken, KategoriController.getKategori);
router.get("/kategori/:id", verifyToken, KategoriController.getKategoriById);
router.post("/kategori", verifyToken, KategoriController.saveKategori);
router.put("/kategori/:id", verifyToken, KategoriController.updateKategori);
router.delete("/kategori/:id", verifyToken, KategoriController.deleteKategori);

export default router;
