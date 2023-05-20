import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    description: {
      type:String,
      required:true
    },
    isCompleted: {
      type:Boolean,
      default:false,
    },
    createdAt:{
      type:Date,
      default:Date.now,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Logins",
        required:true,
    }
  });
  
 export const tasks = mongoose.model("tasks", Schema); 