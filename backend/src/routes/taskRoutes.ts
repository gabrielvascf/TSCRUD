import { Router } from "express";
import {
  getTarefas,
  createTarefa,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.get("/", getTarefas);
router.post("/", createTarefa);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
