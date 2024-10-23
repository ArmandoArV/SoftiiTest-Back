/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/
import { Router } from "express";
import shiftController from "../controller/shiftController";

const shiftRouter = Router();

// Define the routes
shiftRouter.get("/shifts", shiftController.getShifts);
shiftRouter.get("/shifts/:id", shiftController.getShift);
shiftRouter.post("/shifts/add", shiftController.addShift);
shiftRouter.put("/shifts/update/:id", shiftController.updateShift);
shiftRouter.delete("/shifts/delete/:id", shiftController.deleteShift);

export default shiftRouter;
