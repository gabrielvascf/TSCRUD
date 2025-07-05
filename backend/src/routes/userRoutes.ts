import { Router } from "express";
import {
  listUsers,
  createUser,
  updateUserStatus,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get("/", listUsers);
router.post("/", createUser);
router.put("/:username/status", updateUserStatus);

export default router;
