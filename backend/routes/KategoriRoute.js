import express from "express";
import KategoriController from "../controllers/KategoriController.js";

const router = express.Router();

router.get("/kategori", KategoriController.getKategori);
router.get("/kategori/:id", KategoriController.getKategoriById);
router.post("/kategori", KategoriController.saveKategori);
router.put("/kategori/:id", KategoriController.updateKategori);
router.delete("/kategori/:id", KategoriController.deleteKategori);

export default router;
