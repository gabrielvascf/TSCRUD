import { Router } from "express";
import {
  login,
  register,
  changePassword,
  recoverPassword,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/login", login);
router.post("/register", register);
router.post("/change-password", authMiddleware, changePassword);
router.post("/recover-password", recoverPassword);

export default router;
