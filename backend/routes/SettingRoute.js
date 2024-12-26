import express from "express";
import { verifyToken } from "./middleware.js";
import SettingController from "../controllers/SettingController.js";

const router = express.Router();

router.post("/setting", verifyToken, SettingController.handleUpdate);
router.get("/setting", verifyToken, SettingController.all);

export default router;
