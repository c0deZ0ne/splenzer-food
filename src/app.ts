import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/users";
import indexRouter from "./routes/index";
import adminRouter from "./routes/Admin";
import vendorRouter from "./routes/vendor";
import dotenv from "dotenv";
import { db } from "./config";
import cors from "cors";
dotenv.config();

//Sequelize Connection
db.sync()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());

//Router Middleware
app.use("/users", userRouter);
app.use("/", indexRouter);
app.use("/admins", adminRouter);
app.use("/vendors", vendorRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

export default app;
