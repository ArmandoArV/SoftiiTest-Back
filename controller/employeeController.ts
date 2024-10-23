import { Request, Response } from "express";
import { IEmployee } from "../interfaces/IEmployee";
import employeeService from "../service/employee.service";

const employeeController = {
  getEmployees: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await employeeService.getEmployees();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getEmployee: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const data = await employeeService.getEmployee(id);
      if (!data) {
        res.status(404).json({ message: "Employee not found" });
        return;
      }

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  addEmployee: async (req: Request, res: Response): Promise<void> => {
    try {
      const newEmployee: IEmployee = req.body;
      const id = await employeeService.addEmployee(newEmployee);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default employeeController;
