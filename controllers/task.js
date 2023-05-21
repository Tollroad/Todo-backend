import errorhandler from "../middlewares/error.js";
import { tasks } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

  await tasks.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "task added successfully",
  });
  } catch (error) {
    next(error)
  }
};

export const getAllTasks = async (req, res,next) => {
 try {
  const checkId = req.user._id;

  const allTasks = await tasks.find({ user: checkId });

  res.status(200).json({
    success: true,
    allTasks,
  });
 } catch (error) {
  next(error)
 }
};

export const updateTask = async (req, res,next) => {
  try {
    const task = await tasks.findById(req.params.id);
  if (!task) {
    return next(new errorhandler("Invalid Id",404));
  } 

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "task updated",
  });
  } catch (error) {
    next(error)
  }
};

export const deleteTask = async (req, res,next) => {
  try {
    const task = await tasks.findById(req.params.id);

  if (!task) {
    return next(new errorhandler("task not found",404));
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "task deleted",
  });
  } catch (error) {
    next(error)
  }
};
