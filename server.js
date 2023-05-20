import {app} from "./app.js";
import connectDb from "./data/database.js";

connectDb();

app.listen(5000, () => {
    console.log(`server is working on ${process.env.PORT} in ${process.env.NODE_ENV} mode` );
  });
  