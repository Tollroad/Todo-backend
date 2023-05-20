import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

 const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((c) => {
      console.log("database is connected");
    })
    .catch((e) => {
      console.log("error");
    });
};


export default connectDb;