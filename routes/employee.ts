/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/

import { Router } from "express";
import employeeController from "../controller/employeeController";

const routerEmployee = Router();

// Define the routes
routerEmployee.get("/employees", employeeController.getEmployees);
routerEmployee.get("/employees/:id", employeeController.getEmployee);
routerEmployee.post("/employees/add", employeeController.addEmployee);
routerEmployee.put("/employees/update/:id", employeeController.updateEmployee);
routerEmployee.delete(
  "/employees/delete/:id",
  employeeController.deleteEmployee
);
export default routerEmployee;
