import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import routerEmployee from "./routes/employee";
import routerShift from "./routes/shift";

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

app.use("/", routerEmployee);
app.use("/", routerShift);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
