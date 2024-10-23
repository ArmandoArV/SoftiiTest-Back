/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import employeeRouter from "./routes/employee";
import shiftRouter from "./routes/shift";
import paymentRouter from "./routes/payment";
import tipsRouter from "./routes/tips";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(requestLogger);

app.use("/", employeeRouter);
app.use("/", shiftRouter);
app.use("/", paymentRouter);
app.use("/", tipsRouter);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
