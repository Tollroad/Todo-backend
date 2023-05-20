import jwt from "jsonwebtoken";
import { Logins } from "../models/user.js";


export const isAuthenticated = async (req,res,next) => {
    const token = req.cookies.token;

    if(!token)
    {
      return res.status(404).json({
        success:false,
        message:"Login First"
      })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await Logins.findById(decoded._id);
    next();
}