/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024
*/

import { ITip } from "../interfaces/ITip";
import { Request, Response } from "express";
import tipService from "../service/tips.service";

const tipsController = {
  getTips: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await tipService.getTips();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getTip: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const data = await tipService.getTip(id);
      if (!data) {
        res.status(404).json({ message: "Tip not found" });
        return;
      }

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  addTip: async (req: Request, res: Response): Promise<void> => {
    try {
      const newTip: ITip = req.body;
      const id = await tipService.addTip(newTip);
      res.status(201).json({
        message: "Tip added successfully",
        id: id,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTip: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const tip: ITip = req.body;
      await tipService.updateTip(id, tip);
      res.json({ message: "Tip with ID " + id + " updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTip: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      await tipService.deleteTip(id);
      res.json({ message: "Tip with ID " + id + " deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  distributeTips: async (req: Request, res: Response): Promise<void> => {
    const { shiftId, totalTips, employeeCount } = req.body;

    try {
      if (totalTips <= 0) {
        res.status(400).json({ message: "Invalid total tips value" });
        return;
      }

      switch (employeeCount) {
        case 0:
          await tipService.handleUndividedTips(shiftId, totalTips);
          res.status(200).json({ message: "Tips handled without division" });
          break;

        default:
          await tipService.distributeTips(shiftId, totalTips, employeeCount);
          res.status(200).json({ message: "Tips distributed successfully" });
          break;
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default tipsController;
