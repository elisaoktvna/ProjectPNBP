import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", UserController.getUser);
router.get("/users/:id", UserController.getUserByid);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
