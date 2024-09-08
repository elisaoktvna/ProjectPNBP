import express from "express";
import {
    getKategori,
    getKategoriById,
    saveKategori,
    updateKategori,
    deleteKategori
} from "../controllers/KategoriController.js";

const router = express.Router();

router.get('/kategori', getKategori);
router.get('/kategori/:id', getKategoriById);
router.post('/kategori', saveKategori);
router.patch('/kategori/:id', updateKategori);
router.delete('/kategori/:id', deleteKategori);

export default router;
