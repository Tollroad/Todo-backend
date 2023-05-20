import express from "express";
import { deleteTask, getAllTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/allTasks", isAuthenticated, getAllTasks);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;
