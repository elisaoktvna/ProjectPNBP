import express from "express";
import AuthController from "../controllers/AuthController.js";
import { verifyToken } from "./middleware.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/auth/user", verifyToken, AuthController.getAuthUser);

export default router;
