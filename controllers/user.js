import bcrypt from "bcrypt";
import { Logins } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import errorhandler from "../middlewares/error.js";

export const registerNewUser = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    let findUser = await Logins.findOne({ email });

    if (findUser) {
      return next(new errorhandler("User Already registered", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    findUser = await Logins.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(findUser, res, "registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Logins.findOne({ email }).select("+password");

    if (!user) {
      return next(new errorhandler("Invalid email and Password", 400));
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new errorhandler("Invalid email and Password", 400));
    } else {
      sendCookie(user, res, `welcome ${user.name}`, 200);
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res,next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax": "none",
        secure: process.env.NODE_ENV === "Development" ? false : true, 
      })
      .json({
        message: "logout successful",
      });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res,next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
