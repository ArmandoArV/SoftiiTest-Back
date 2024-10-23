import tipsController from "../controller/tipsController";
import { Router } from "express";

const tipsRouter = Router();

// Define the routes
tipsRouter.get("/tips", tipsController.getTips);
tipsRouter.get("/tips/:id", tipsController.getTip);
tipsRouter.post("/tips/add", tipsController.addTip);
tipsRouter.put("/tips/update/:id", tipsController.updateTip);
tipsRouter.delete("/tips/delete/:id", tipsController.deleteTip);
tipsRouter.post("/tips/distribute", tipsController.distributeTips);

export default tipsRouter;
