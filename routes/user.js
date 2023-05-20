import express from "express";
import { getMyProfile, loginUser, logout, registerNewUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/mydetails", isAuthenticated ,getMyProfile);

router.post("/register", registerNewUser);

router.post("/login", loginUser);

router.get("/logout",logout)


export default router;