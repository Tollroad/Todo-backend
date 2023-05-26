import jwt from "jsonwebtoken";

export const sendCookie = (findUser,res,message,statusCode=200)=>{
    const token = jwt.sign({
        _id:findUser._id
      },process.env.JWT_SECRET
      )
    
      res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:1000*60*10,
        sameSite:process.env.NODE_ENV === "development" ? "lax": "none",
        secure:process.env.NODE_ENV === "development" ? false : true, 
      }).json({
        success:true,
        message:message
      })
};