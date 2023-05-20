import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
      type:String,
      required:true,
    },
    email: {
      type:String,
      required:true,
      unique:true
    },
    password: {
      required:true,
      type:String,
      select:false,
    },
    createdAt:{
      type:Date,
      default:Date.now,
    }
  });
  
 export const Logins = mongoose.model("Logins", Schema); 