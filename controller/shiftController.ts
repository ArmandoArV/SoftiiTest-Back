/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/
import { Request, Response } from "express";
import { IShift } from "../interfaces/IShift";
import shiftService from "../service/shift.service";

const shiftController = {
  getShifts: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await shiftService.getShifts();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getShift: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const data = await shiftService.getShift(id);
      if (!data) {
        res.status(404).json({ message: "Shift not found" });
        return;
      }

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  addShift: async (req: Request, res: Response): Promise<void> => {
    try {
      const newShift: IShift = req.body;
      const id = await shiftService.addShift(newShift);
      res.status(201).json({
        message: "Shift added successfully",
        id: id,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateShift: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const shift: IShift = req.body;
      await shiftService.updateShift(id, shift);
      res.json({ message: "Shift with ID " + id + " updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteShift: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      await shiftService.deleteShift(id);
      res.json({ message: "Shift with ID " + id + " deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default shiftController;