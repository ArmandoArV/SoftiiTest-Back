/*
  Made by: Armando Arredondo Valle
  Date: 22/10/2024

*/
import { Router } from "express";
import paymentController from "../controller/paymentController";

const paymentRouter = Router();

// Define the routes
paymentRouter.get("/payment-methods", paymentController.getPaymentMethods);
paymentRouter.get("/payment-methods/:id", paymentController.getPaymentMethod);
paymentRouter.post("/payment-methods/add", paymentController.addPaymentMethod);
paymentRouter.put(
  "/payment-methods/update/:id",
  paymentController.updatePaymentMethod
);
paymentRouter.delete(
  "/payment-methods/delete/:id",
  paymentController.deletePaymentMethod
);


export default paymentRouter;