import { Router } from "express";
import employeeController from "../controller/employeeController";

const routerEmployee = Router();

// Define the routes
routerEmployee.get("/employees", employeeController.getEmployees);
routerEmployee.get("/employees/:id", employeeController.getEmployee);
routerEmployee.post("/employees/add", employeeController.addEmployee);

export default routerEmployee;
