/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/
import { Router } from "express";
import shiftController from "../controller/shiftController";

const routerShift = Router();

// Define the routes
routerShift.get("/shifts", shiftController.getShifts);
routerShift.get("/shifts/:id", shiftController.getShift);
routerShift.post("/shifts/add", shiftController.addShift);
routerShift.put("/shifts/update/:id", shiftController.updateShift);
routerShift.delete("/shifts/delete/:id", shiftController.deleteShift);

export default routerShift;
