import user from "./routes/user.js";
import login from "./routes/login.js";
import express from "express";

const router = express.Router();

router.use(user);
router.use(login);

export default router;
