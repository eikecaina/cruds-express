import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
    createOrderService,
    deleteOrderService,
    // deleteOrderService,
    getOrdersService,
    updateOrderService,
} from "../services/ordersService";
import { Order } from "../models/repository/orderRepository";

export const ordersStore: Order[] = [];

export const createOrderController = (req: Request, res: Response) => {
    const {
        items,
        status,
        paymentMethod,
        shippingAddress,
        createdAt,
        updatedAt,
        totalAmount,
        userId,
        totalItems,
    } = req.body;
    const id = uuidv4();
    const newOrder = createOrderService(ordersStore, {
        id,
        items,
        status,
        paymentMethod,
        shippingAddress,
        createdAt,
        updatedAt,
        totalAmount,
        userId,
        totalItems,
    });

    return res.json({
        message: `Order ${id} created!`,
        order: newOrder,
    });
};

export const getOrdersController = (req: Request, res: Response) => {
    const orders = getOrdersService(ordersStore);
    return res.json({ message: "Lista de orders", orders });
};

export const updateOrderController =
    (orders: Order[]) => (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const {
            items,
            status,
            paymentMethod,
            shippingAddress,
            createdAt,
            updatedAt,
            totalAmount,
            userId,
            totalItems,
        } = req.body;
        const productIndex = orders.findIndex((p) => p.id === id);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Order not found" });
        }

        const updatedOrder = updateOrderService(orders, {
            id,
            items,
            status,
            paymentMethod,
            shippingAddress,
            createdAt,
            updatedAt,
            totalAmount,
            userId,
            totalItems,
        });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(updatedOrder);
    };

export const deleteOrderController =
    (orders: Order[]) => (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const deleted = deleteOrderService(orders, id);

        if (!deleted) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.json({
            message: `Order with id ${id} deleted!`,
        });
    };
