import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user/:id?", userController.get);
router.post("/user", userController.create);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

export default router;
