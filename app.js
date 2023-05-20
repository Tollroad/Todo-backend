import express from "express";
import UserRouter from "./routes/user.js"
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js"
import { error } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

//using routes
app.use("/api/v1/users",UserRouter);
app.use("/api/v1/tasks",taskRouter);


app.get("/", (req, res) => {
  res.send("send send");
});

// using error middleware
app.use(error);