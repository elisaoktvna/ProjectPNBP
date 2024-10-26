import express from "express";
import UserController from "../controllers/UserController.js";
import { verifyToken } from "./middleware.js";

const router = express.Router();

router.get("/users", verifyToken, UserController.getUser);
router.get("/users/:id", verifyToken, UserController.getUserByid);
router.post("/users", verifyToken, UserController.createUser);
router.put("/users/:id", verifyToken, UserController.updateUser);
router.delete("/users/:id", verifyToken, UserController.deleteUser);

export default router;
