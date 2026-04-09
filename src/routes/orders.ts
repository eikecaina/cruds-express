import { Router } from "express";
import {
    createOrderController,
    deleteOrderController,
    getOrdersController,
    ordersStore,
    updateOrderController,
} from "../controllers/ordersController";

const ordersRouter = Router();

ordersRouter.get("/", getOrdersController);

ordersRouter.post("/", createOrderController);

ordersRouter.put("/:id", updateOrderController(ordersStore));

ordersRouter.delete("/:id", deleteOrderController(ordersStore));

export default ordersRouter;
