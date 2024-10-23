/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/
import { IPaymentMethod } from "../interfaces/IPaymentMethod";
import { Request, Response } from "express";
import paymentService from "../service/payment.service";

const paymentController = {
  getPaymentMethods: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await paymentService.getPaymentMethods();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getPaymentMethod: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const data = await paymentService.getPaymentMethod(id);
      if (!data) {
        res.status(404).json({ message: "Payment method not found" });
        return;
      }

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  addPaymentMethod: async (req: Request, res: Response): Promise<void> => {
    try {
      const newPaymentMethod: IPaymentMethod = req.body;
      const id = await paymentService.addPaymentMethod(newPaymentMethod);
      res.status(201).json({
        message: "Payment method added successfully",
        id: id,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePaymentMethod: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      const paymentMethod: IPaymentMethod = req.body;
      await paymentService.updatePaymentMethod(id, paymentMethod);
      res.json({ message: "Payment method with ID " + id + " updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePaymentMethod: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
      }

      await paymentService.deletePaymentMethod(id);
      res.json({ message: "Payment method with ID " + id + " deleted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default paymentController;