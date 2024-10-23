/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/

import { Router } from "express";
import employeeController from "../controller/employeeController";

const employeeRouter = Router();

// Define the routes
employeeRouter.get("/employees", employeeController.getEmployees);
employeeRouter.get("/employees/:id", employeeController.getEmployee);
employeeRouter.post("/employees/add", employeeController.addEmployee);
employeeRouter.put("/employees/update/:id", employeeController.updateEmployee);
employeeRouter.delete(
  "/employees/delete/:id",
  employeeController.deleteEmployee
);
export default employeeRouter;
