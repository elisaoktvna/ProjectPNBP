import express from "express";
import AuthController from "../controllers/AuthController.js";
import { verifyToken } from "./middleware.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/auth/user", verifyToken, AuthController.getAuthUser);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPassword);

export default router;
